import { Router, Request, Response } from 'express'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../lib/prisma'
import { requireAuth } from '../middleware/auth'

const router = Router()

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8, 'New password must be at least 8 characters'),
})

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = loginSchema.parse(req.body)

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(401).json({ success: false, error: 'No account found with that email' })
    }
    if (!user.isActive) {
      return res.status(401).json({ success: false, error: 'Account is inactive' })
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return res.status(401).json({ success: false, error: 'Incorrect password' })
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'dev-secret',
      { expiresIn: '24h' }
    )

    return res.json({
      success: true,
      data: {
        token,
        user: { id: user.id, email: user.email, role: user.role, mustChangePassword: user.mustChangePassword },
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: 'Invalid email or password format' })
    }
    console.error('Login error:', error)
    return res.status(500).json({ success: false, error: 'Login failed' })
  }
})

// GET /api/auth/me — verify current session
router.get('/me', requireAuth, async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: { id: true, email: true, role: true, isActive: true, mustChangePassword: true },
    })
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' })
    }
    return res.json({ success: true, data: user })
  } catch {
    return res.status(500).json({ success: false, error: 'Failed to fetch user' })
  }
})

// POST /api/auth/change-password — self-service, also clears the forced-change flag
router.post('/change-password', requireAuth, async (req: Request, res: Response) => {
  try {
    const { currentPassword, newPassword } = changePasswordSchema.parse(req.body)

    const user = await prisma.user.findUnique({ where: { id: req.user!.id } })
    if (!user) return res.status(404).json({ success: false, error: 'User not found' })

    const valid = await bcrypt.compare(currentPassword, user.password)
    if (!valid) return res.status(401).json({ success: false, error: 'Current password is incorrect' })

    const hashed = await bcrypt.hash(newPassword, 10)
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashed, mustChangePassword: false },
    })

    return res.json({ success: true, message: 'Password updated successfully' })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: error.errors[0].message })
    }
    return res.status(500).json({ success: false, error: 'Failed to change password' })
  }
})

export default router
