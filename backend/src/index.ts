import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import { execSync } from 'child_process'
import { rateLimit } from 'express-rate-limit'

import bcrypt from 'bcryptjs'
import leadsRouter from './routes/leads'
import authRouter from './routes/auth'
import prisma from './lib/prisma'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// ── Security middleware ───────────────────────────────────────────────────────
app.use(helmet())
const allowedOrigins = [
  'http://localhost:5173',
  'https://masomojoshua.netlify.app',
  'https://masomonow.com',
  'https://www.masomonow.com',
  process.env.FRONTEND_URL,
].filter(Boolean) as string[]

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error(`CORS: origin ${origin} not allowed`))
    }
  },
  credentials: true,
}))
app.use(express.json())

// Rate limit all API routes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { success: false, error: 'Too many requests. Please try again later.' },
})
app.use('/api', limiter)

// ── Routes ───────────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'Masomo Now API', version: '1.0.0' })
})

// Temporary diagnostic endpoint — shows DB state without exposing sensitive data
app.get('/debug', async (_req, res) => {
  try {
    const userCount = await prisma.user.count()
    const admin = await prisma.user.findUnique({
      where: { email: 'admin@masomonow.com' },
      select: { id: true, email: true, role: true, isActive: true, createdAt: true },
    })
    res.json({ db: 'connected', userCount, admin: admin ?? 'NOT FOUND' })
  } catch (e) {
    res.status(500).json({ db: 'error', error: String(e) })
  }
})

app.use('/api/auth', authRouter)
app.use('/api/leads', leadsRouter)

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' })
})

// Global error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled error:', err)
  res.status(500).json({ success: false, error: 'Internal server error' })
})

// ── Start ─────────────────────────────────────────────────────────────────────
async function start() {
  // 1. Run database migrations (creates tables if they don't exist)
  try {
    execSync('./node_modules/.bin/prisma migrate deploy', { stdio: 'inherit' })
    console.log('Database migrations applied')
  } catch (e) {
    console.error('Migration failed:', e)
    // Do not exit — tables may already exist from a previous run
  }

  // 2. Ensure admin account always exists with the correct password
  try {
    const hash = await bcrypt.hash('Admin@Masomo2025', 10)
    await prisma.user.upsert({
      where: { email: 'admin@masomonow.com' },
      update: { password: hash },
      create: { email: 'admin@masomonow.com', password: hash, role: 'ADMIN' },
    })
    console.log('Admin account ready')
  } catch (e) {
    console.error('Failed to create admin user:', e)
  }

  app.listen(PORT, () => {
    console.log(`Masomo Now API running on port ${PORT}`)
  })
}

start()

export default app
