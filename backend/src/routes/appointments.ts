import { Router, Request, Response } from 'express'
import { z } from 'zod'
import prisma from '../lib/prisma'
import { requireAuth } from '../middleware/auth'
import { sendNewAppointmentEmail } from '../lib/email'

const router = Router()

const APPOINTMENT_STATUSES = ['SCHEDULED', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'NO_SHOW'] as const
type AppointmentStatus = typeof APPOINTMENT_STATUSES[number]

const createAppointmentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(7, 'Invalid phone number'),
  country: z.string().optional(),
  destinationInterest: z.string().min(1, 'Destination is required'),
  scheduledAt: z.string().datetime({ message: 'Invalid date/time' }),
  notes: z.string().optional(),
})

const updateAppointmentSchema = z.object({
  scheduledAt: z.string().datetime().optional(),
  status: z.enum(APPOINTMENT_STATUSES).optional(),
  counselorId: z.number().optional(),
  notes: z.string().optional(),
})

// ── POST /api/appointments — public: book a consultation ─────────────────────
router.post('/', async (req: Request, res: Response) => {
  try {
    const validated = createAppointmentSchema.parse(req.body)

    let lead = await prisma.lead.findFirst({ where: { email: validated.email } })
    if (!lead) {
      lead = await prisma.lead.create({
        data: {
          name: validated.name,
          email: validated.email,
          phone: validated.phone,
          country: validated.country,
          destinationInterest: validated.destinationInterest,
          status: 'CONSULTATION_SCHEDULED',
        },
      })
    } else if (['NEW', 'CONTACTED'].includes(lead.status)) {
      lead = await prisma.lead.update({ where: { id: lead.id }, data: { status: 'CONSULTATION_SCHEDULED' } })
    }

    const appointment = await prisma.appointment.create({
      data: {
        leadId: lead.id,
        scheduledAt: new Date(validated.scheduledAt),
        type: 'INITIAL_CONSULTATION',
        destination: validated.destinationInterest,
        notes: validated.notes,
      },
    })

    await prisma.auditLog.create({
      data: {
        leadId: lead.id,
        action: 'APPOINTMENT_BOOKED',
        newValue: JSON.stringify(appointment),
        performedBy: 'public_form',
      },
    })

    sendNewAppointmentEmail({ ...validated, scheduledAt: appointment.scheduledAt }).catch((err) =>
      console.error('Email failed:', err)
    )

    return res.status(201).json({
      success: true,
      data: appointment,
      message: 'Consultation booked. We will send a confirmation shortly.',
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: 'Validation failed', details: error.errors })
    }
    console.error('Create appointment error:', error)
    return res.status(500).json({ success: false, error: 'Failed to book consultation' })
  }
})

// ── GET /api/appointments — admin/counselor only ──────────────────────────────
router.get('/', requireAuth, async (req: Request, res: Response) => {
  try {
    const { status, page = '1', limit = '50' } = req.query

    const where: Record<string, unknown> = {}
    if (status && APPOINTMENT_STATUSES.includes(status as AppointmentStatus)) {
      where.status = status
    }

    const pageNum = parseInt(page as string)
    const limitNum = parseInt(limit as string)
    const skip = (pageNum - 1) * limitNum

    const [appointments, total] = await Promise.all([
      prisma.appointment.findMany({
        where,
        include: { lead: true, student: true, counselor: true },
        orderBy: { scheduledAt: 'asc' },
        skip,
        take: limitNum,
      }),
      prisma.appointment.count({ where }),
    ])

    return res.json({
      success: true,
      data: appointments,
      meta: { total, page: pageNum, limit: limitNum, pages: Math.ceil(total / limitNum) },
    })
  } catch (error) {
    console.error('List appointments error:', error)
    return res.status(500).json({ success: false, error: 'Failed to fetch appointments' })
  }
})

// ── PATCH /api/appointments/:id — admin/counselor only ────────────────────────
router.patch('/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    const validated = updateAppointmentSchema.parse(req.body)

    const existing = await prisma.appointment.findUnique({ where: { id } })
    if (!existing) return res.status(404).json({ success: false, error: 'Appointment not found' })

    const updated = await prisma.appointment.update({
      where: { id },
      data: {
        ...(validated.scheduledAt && { scheduledAt: new Date(validated.scheduledAt) }),
        ...(validated.status && { status: validated.status }),
        ...(validated.counselorId !== undefined && { counselorId: validated.counselorId }),
        ...(validated.notes !== undefined && { notes: validated.notes }),
      },
    })

    return res.json({ success: true, data: updated, message: 'Appointment updated successfully' })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: 'Validation failed', details: error.errors })
    }
    return res.status(500).json({ success: false, error: 'Failed to update appointment' })
  }
})

export default router
