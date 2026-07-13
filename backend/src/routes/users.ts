import { Router, Request, Response } from 'express'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import prisma from '../lib/prisma'
import { requireAuth, requireRole } from '../middleware/auth'

const router = Router()

const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['ADMIN', 'COUNSELOR']),
})

// GET /api/users — list all users
router.get('/', requireAuth, requireRole('ADMIN'), async (_req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, email: true, role: true, isActive: true, createdAt: true },
      orderBy: { createdAt: 'asc' },
    })
    return res.json({ success: true, data: users })
  } catch {
    return res.status(500).json({ success: false, error: 'Failed to fetch users' })
  }
})

// POST /api/users — create a new counselor/admin account
router.post('/', requireAuth, requireRole('ADMIN'), async (req: Request, res: Response) => {
  try {
    const { email, password, role } = createUserSchema.parse(req.body)

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return res.status(409).json({ success: false, error: 'An account with that email already exists' })
    }

    const hashed = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: { email, password: hashed, role, mustChangePassword: true },
      select: { id: true, email: true, role: true, isActive: true, createdAt: true },
    })

    return res.status(201).json({ success: true, data: user })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: error.errors[0].message })
    }
    return res.status(500).json({ success: false, error: 'Failed to create user' })
  }
})

// PATCH /api/users/:id — toggle active status
router.patch('/:id', requireAuth, requireRole('ADMIN'), async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    const { isActive } = z.object({ isActive: z.boolean() }).parse(req.body)

    const user = await prisma.user.update({
      where: { id },
      data: { isActive },
      select: { id: true, email: true, role: true, isActive: true },
    })

    return res.json({ success: true, data: user })
  } catch {
    return res.status(500).json({ success: false, error: 'Failed to update user' })
  }
})

export default router
