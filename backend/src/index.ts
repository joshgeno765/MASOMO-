import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import { rateLimit } from 'express-rate-limit'

import leadsRouter from './routes/leads'
import authRouter from './routes/auth'
import usersRouter from './routes/users'
import appointmentsRouter from './routes/appointments'
import pathwayFinderRouter from './routes/pathwayFinder'

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

app.use('/api/auth', authRouter)
app.use('/api/leads', leadsRouter)
app.use('/api/users', usersRouter)
app.use('/api/appointments', appointmentsRouter)
app.use('/api/pathway-finder', pathwayFinderRouter)

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
// Migrations and the initial admin account are handled by railway.json's
// startCommand (prisma migrate deploy && node prisma/seed.js) before this
// process even starts — doing it again here used to silently overwrite
// admin@masomonow.com's password back to a hardcoded default on every boot.
app.listen(PORT, () => {
  console.log(`Masomo Now API running on port ${PORT}`)
})

export default app
