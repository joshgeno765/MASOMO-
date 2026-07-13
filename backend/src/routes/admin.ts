import { Router, Request, Response } from 'express'
import { requireAuth, requireRole } from '../middleware/auth'
import { runDigest } from '../lib/digest'

const router = Router()

// POST /api/admin/run-digest — admin only, fires the daily digest email on demand
router.post('/run-digest', requireAuth, requireRole('ADMIN'), async (_req: Request, res: Response) => {
  try {
    await runDigest()
    return res.json({ success: true, message: 'Digest run complete' })
  } catch (error) {
    console.error('Manual digest run failed:', error)
    return res.status(500).json({ success: false, error: 'Failed to run digest' })
  }
})

export default router
