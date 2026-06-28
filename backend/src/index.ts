import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import { rateLimit } from 'express-rate-limit'

import leadsRouter from './routes/leads'
import authRouter from './routes/auth'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// ── Security middleware ───────────────────────────────────────────────────────
app.use(helmet())
const allowedOrigins = [
  'http://localhost:5173',
  'https://masomojoshua.netlify.app',
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
app.listen(PORT, () => {
  console.log(`\n🚀 Masomo Now API running on http://localhost:${PORT}`)
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`   Health check: http://localhost:${PORT}/health\n`)
})

export default app
