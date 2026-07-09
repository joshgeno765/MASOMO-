import { Router, Request, Response } from 'express'
import { z } from 'zod'
import prisma from '../lib/prisma'
import { requireAuth } from '../middleware/auth'
import { sendNewPathwayResultEmail } from '../lib/email'

const router = Router()

const quizAnswersSchema = z.object({
  homeCountry: z.string().min(1),
  languagePreference: z.enum(['French', 'English', 'Both / Not sure']),
  fieldOfInterest: z.enum(['Technical / Trades', 'Business & Management', 'University / Academic', 'Not sure yet']),
  budget: z.enum(['Most affordable option', 'Budget flexible', 'Not sure']),
  timeline: z.enum(['As soon as possible', 'Within the next year', 'Just exploring']),
})

const matchedResultSchema = z.object({
  country: z.string().min(1),
  schools: z.array(z.string()),
  isFmcPathway: z.boolean(),
})

const createPathwayFinderSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(7, 'Invalid phone number'),
  country: z.string().optional(),
  destinationInterest: z.string().min(1, 'Destination is required'),
  message: z.string().optional(),
  quizAnswers: quizAnswersSchema,
  matchedResult: matchedResultSchema,
})

// ── POST /api/pathway-finder — public: submit pathway-finder result ──────────
router.post('/', async (req: Request, res: Response) => {
  try {
    const validated = createPathwayFinderSchema.parse(req.body)
    const quizAnswers = JSON.stringify({ answers: validated.quizAnswers, result: validated.matchedResult })

    let lead = await prisma.lead.findFirst({ where: { email: validated.email } })
    if (!lead) {
      lead = await prisma.lead.create({
        data: {
          name: validated.name,
          email: validated.email,
          phone: validated.phone,
          country: validated.country,
          destinationInterest: validated.destinationInterest,
          message: validated.message,
          quizAnswers,
          status: 'NEW',
        },
      })
    } else {
      lead = await prisma.lead.update({
        where: { id: lead.id },
        data: { destinationInterest: validated.destinationInterest, quizAnswers },
      })
    }

    await prisma.auditLog.create({
      data: {
        leadId: lead.id,
        action: 'PATHWAY_FINDER_COMPLETED',
        newValue: JSON.stringify(lead),
        performedBy: 'public_form',
      },
    })

    sendNewPathwayResultEmail({
      name: validated.name,
      email: validated.email,
      phone: validated.phone,
      country: validated.country,
      destinationInterest: validated.destinationInterest,
      quizAnswers: validated.quizAnswers,
    }).catch((err) => console.error('Email failed:', err))

    return res.status(201).json({
      success: true,
      data: lead,
      message: 'Thanks — a counselor will follow up on your matched pathway shortly.',
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: 'Validation failed', details: error.errors })
    }
    console.error('Create pathway-finder lead error:', error)
    return res.status(500).json({ success: false, error: 'Failed to save your result' })
  }
})

// ── GET /api/pathway-finder — admin/counselor only (leads with quiz data) ────
router.get('/', requireAuth, async (req: Request, res: Response) => {
  try {
    const leads = await prisma.lead.findMany({
      where: { quizAnswers: { not: null } },
      orderBy: { createdAt: 'desc' },
    })
    return res.json({ success: true, data: leads })
  } catch (error) {
    console.error('List pathway-finder leads error:', error)
    return res.status(500).json({ success: false, error: 'Failed to fetch pathway-finder leads' })
  }
})

export default router
