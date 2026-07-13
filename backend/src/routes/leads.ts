import { Router, Request, Response } from 'express'
import { z } from 'zod'
import prisma from '../lib/prisma'
import { requireAuth } from '../middleware/auth'
import { sendNewLeadEmail } from '../lib/email'
import { toCsv } from '../lib/csv'
import { getInsightsForUser, getTeamProgress } from '../lib/insights'

const router = Router()

const LEAD_STATUSES = ['NEW', 'CONTACTED', 'CONSULTATION_SCHEDULED', 'APPLICATION_STARTED', 'CONVERTED', 'CLOSED'] as const
type LeadStatus = typeof LEAD_STATUSES[number]

const createLeadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(7, 'Invalid phone number'),
  country: z.string().optional(),
  destinationInterest: z.string().min(1, 'Destination is required'),
  message: z.string().optional(),
})

const updateLeadSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(7).optional(),
  country: z.string().optional(),
  destinationInterest: z.string().optional(),
  message: z.string().optional(),
  status: z.enum(LEAD_STATUSES).optional(),
  notes: z.string().optional(),
  assignedCounselorId: z.number().nullable().optional(),
})

// ── POST /api/leads — public: create lead from inquiry form ──────────────────
router.post('/', async (req: Request, res: Response) => {
  try {
    const validated = createLeadSchema.parse(req.body)

    const lead = await prisma.lead.create({
      data: { ...validated, status: 'NEW' },
    })

    await prisma.auditLog.create({
      data: {
        leadId: lead.id,
        action: 'LEAD_CREATED',
        newValue: JSON.stringify(lead),
        performedBy: 'public_form',
      },
    })

    // Fire-and-forget — never block the student's form response
    sendNewLeadEmail(lead).catch((err) => console.error('Email failed:', err))

    return res.status(201).json({
      success: true,
      data: lead,
      message: 'Inquiry submitted successfully. We will be in touch within 24 hours.',
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: 'Validation failed', details: error.errors })
    }
    console.error('Create lead error:', error)
    return res.status(500).json({ success: false, error: 'Failed to submit inquiry' })
  }
})

// ── GET /api/leads — admin/counselor only ────────────────────────────────────
router.get('/', requireAuth, async (req: Request, res: Response) => {
  try {
    const { status, search, page = '1', limit = '50' } = req.query

    const where: Record<string, unknown> = {}

    if (req.user?.role === 'COUNSELOR') {
      where.assignedCounselorId = req.user.id
    }

    if (status && LEAD_STATUSES.includes(status as LeadStatus)) {
      where.status = status
    }

    if (search && typeof search === 'string') {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
        { phone: { contains: search } },
      ]
    }

    const pageNum = parseInt(page as string)
    const limitNum = parseInt(limit as string)
    const skip = (pageNum - 1) * limitNum

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({ where, orderBy: { createdAt: 'desc' }, skip, take: limitNum }),
      prisma.lead.count({ where }),
    ])

    // Summary counts per status, and per destination — scoped to the same assignment
    // restriction as the list itself (a counselor's dashboard reflects their own leads)
    const roleWhere = req.user?.role === 'COUNSELOR' ? { assignedCounselorId: req.user.id } : {}
    const [counts, byDestination] = await Promise.all([
      prisma.lead.groupBy({ by: ['status'], where: roleWhere, _count: { id: true } }),
      prisma.lead.groupBy({ by: ['destinationInterest'], where: roleWhere, _count: { id: true }, orderBy: { _count: { id: 'desc' } } }),
    ])

    return res.json({
      success: true,
      data: leads,
      meta: { total, page: pageNum, limit: limitNum, pages: Math.ceil(total / limitNum), counts, byDestination },
    })
  } catch (error) {
    console.error('List leads error:', error)
    return res.status(500).json({ success: false, error: 'Failed to fetch leads' })
  }
})

// ── GET /api/leads/export — admin/counselor only — must sit before /:id ──────
router.get('/export', requireAuth, async (req: Request, res: Response) => {
  try {
    const { status, search } = req.query

    const where: Record<string, unknown> = {}

    if (req.user?.role === 'COUNSELOR') {
      where.assignedCounselorId = req.user.id
    }

    if (status && LEAD_STATUSES.includes(status as LeadStatus)) {
      where.status = status
    }

    if (search && typeof search === 'string') {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
        { phone: { contains: search } },
      ]
    }

    const leads = await prisma.lead.findMany({ where, orderBy: { createdAt: 'desc' } })

    const counselorIds = [...new Set(leads.map((l) => l.assignedCounselorId).filter((id): id is number => id != null))]
    const counselors = counselorIds.length
      ? await prisma.user.findMany({ where: { id: { in: counselorIds } }, select: { id: true, email: true } })
      : []
    const emailById = new Map(counselors.map((c) => [c.id, c.email]))

    const csv = toCsv(
      ['Lead ID', 'Name', 'Email', 'Phone', 'Country', 'Destination Interest', 'Status', 'Assigned Counselor', 'Created Date', 'Last Updated', 'Notes', 'Original Message'],
      leads.map((l) => [
        l.id, l.name, l.email, l.phone, l.country ?? '', l.destinationInterest, l.status,
        l.assignedCounselorId != null ? (emailById.get(l.assignedCounselorId) ?? '') : 'Unassigned',
        l.createdAt.toISOString().slice(0, 10), l.updatedAt.toISOString().slice(0, 10),
        l.notes ?? '', l.message ?? '',
      ])
    )

    const filename = `leads-${new Date().toISOString().slice(0, 10)}.csv`
    res.setHeader('Content-Type', 'text/csv; charset=utf-8')
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
    return res.status(200).send(csv)
  } catch (error) {
    console.error('Export leads error:', error)
    return res.status(500).json({ success: false, error: 'Failed to export leads' })
  }
})

// ── GET /api/leads/insights — admin/counselor only — must sit before /:id ────
router.get('/insights', requireAuth, async (req: Request, res: Response) => {
  try {
    const insights = await getInsightsForUser(req.user!.id, req.user!.role)
    const teamProgress = req.user?.role === 'ADMIN' ? await getTeamProgress() : undefined
    return res.json({ success: true, data: { ...insights, teamProgress } })
  } catch (error) {
    console.error('Insights error:', error)
    return res.status(500).json({ success: false, error: 'Failed to load insights' })
  }
})

// ── GET /api/leads/:id — admin/counselor only ────────────────────────────────
router.get('/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    const lead = await prisma.lead.findUnique({
      where: { id },
      include: { appointments: true, auditLogs: { orderBy: { createdAt: 'desc' }, take: 20 } },
    })
    if (!lead) return res.status(404).json({ success: false, error: 'Lead not found' })
    if (req.user?.role === 'COUNSELOR' && lead.assignedCounselorId !== req.user.id) {
      return res.status(403).json({ success: false, error: 'Forbidden' })
    }
    return res.json({ success: true, data: lead })
  } catch {
    return res.status(500).json({ success: false, error: 'Failed to fetch lead' })
  }
})

// ── PATCH /api/leads/:id — admin/counselor only ──────────────────────────────
router.patch('/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    const validated = updateLeadSchema.parse(req.body)

    const existing = await prisma.lead.findUnique({ where: { id } })
    if (!existing) return res.status(404).json({ success: false, error: 'Lead not found' })

    if (req.user?.role === 'COUNSELOR') {
      if (existing.assignedCounselorId !== req.user.id) {
        return res.status(403).json({ success: false, error: 'Forbidden' })
      }
      if (validated.assignedCounselorId !== undefined) {
        return res.status(403).json({ success: false, error: 'Only administrators can reassign leads' })
      }
    }

    const updated = await prisma.lead.update({
      where: { id },
      data: {
        ...(validated.name && { name: validated.name }),
        ...(validated.email && { email: validated.email }),
        ...(validated.phone && { phone: validated.phone }),
        ...(validated.country !== undefined && { country: validated.country }),
        ...(validated.destinationInterest && { destinationInterest: validated.destinationInterest }),
        ...(validated.message !== undefined && { message: validated.message }),
        ...(validated.status && { status: validated.status }),
        ...(validated.notes !== undefined && { notes: validated.notes }),
        ...(validated.assignedCounselorId !== undefined && { assignedCounselorId: validated.assignedCounselorId }),
      },
    })

    if (validated.status && validated.status !== existing.status) {
      await prisma.auditLog.create({
        data: {
          leadId: id,
          action: 'STATUS_CHANGED',
          oldValue: existing.status,
          newValue: validated.status,
          performedBy: req.user?.email ?? 'admin',
        },
      })
    }

    return res.json({ success: true, data: updated, message: 'Lead updated successfully' })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: 'Validation failed', details: error.errors })
    }
    return res.status(500).json({ success: false, error: 'Failed to update lead' })
  }
})

// ── DELETE /api/leads/:id — admin only (soft close) ──────────────────────────
router.delete('/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)

    if (req.user?.role === 'COUNSELOR') {
      const existing = await prisma.lead.findUnique({ where: { id } })
      if (!existing || existing.assignedCounselorId !== req.user.id) {
        return res.status(403).json({ success: false, error: 'Forbidden' })
      }
    }

    await prisma.lead.update({ where: { id }, data: { status: 'CLOSED' } })
    await prisma.auditLog.create({
      data: { leadId: id, action: 'LEAD_CLOSED', performedBy: req.user?.email ?? 'admin' },
    })
    return res.json({ success: true, message: 'Lead closed successfully' })
  } catch {
    return res.status(500).json({ success: false, error: 'Failed to close lead' })
  }
})

export default router
