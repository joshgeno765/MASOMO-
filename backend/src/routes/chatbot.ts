import { Router, Request, Response } from 'express'
import { rateLimit } from 'express-rate-limit'
import { z } from 'zod'
import Anthropic from '@anthropic-ai/sdk'

const router = Router()

const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null

// Stricter than the global /api limiter — each message costs money, so cap hard per IP.
const chatbotLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, error: 'Too many messages. Please try again later or WhatsApp us.' },
})

const messageSchema = z.object({
  message: z.string().min(1).max(1000),
  history: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string().max(2000),
  })).max(12).optional(),
  language: z.enum(['en', 'fr']).default('en'),
})

const SYSTEM_PROMPT = `You are the friendly support assistant on masomonow.com, the website for Masomo Now — an international education consultancy (the Francophone Africa division of ELIMU International Education Connections) helping Francophone African students (from countries including Rwanda, DR Congo, Djibouti, Cameroon, Senegal, Côte d'Ivoire, Mali, Burkina Faso, Gabon, Togo) study abroad in Canada, the United States, Ireland, Germany, and Poland.

What you can help with: general questions about the application process, English/French proficiency tests (IELTS, TOEFL, Duolingo, TEF, TCF, DELF, DALF), study permits, the Francophone Minority Communities (FMC) Student Pilot for studying in French outside Quebec, post-graduation work permits, typical costs, and pointing users to the right page on the site:
- /pathway-finder — a 6-question quiz that matches students to a real country/school
- /cost-calculator — estimates tuition + living costs by country and program length
- /programs — search partner schools by field of study
- /destinations — full list of partner countries and schools
- /fmc-pilot — details on the FMC Student Pilot
- /resources — articles on visas, budgeting, and life abroad
- /consultation — book a free consultation with a counselor

Rules:
- Keep answers short (2-4 sentences) and conversational, like a helpful chat, not an essay.
- Never state definitive legal/immigration conclusions about a specific person's case (e.g. "you will get approved") — give general guidance and always point to booking a free consultation for anything specific to their situation.
- If asked something outside education consulting / study-abroad topics, politely redirect to what you can help with.
- If you don't know something specific (exact current fees, processing times, this-week's news), say so honestly and suggest booking a consultation or messaging on WhatsApp instead of guessing.
- Respond in ${'{{LANGUAGE}}'} unless the user is clearly writing in the other language, in which case match them.`

router.post('/message', chatbotLimiter, async (req: Request, res: Response) => {
  if (!anthropic) {
    return res.status(503).json({ success: false, error: 'Chat is temporarily unavailable. Please WhatsApp us or book a consultation instead.' })
  }

  try {
    const { message, history, language } = messageSchema.parse(req.body)

    const languageName = language === 'fr' ? 'French' : 'English'
    const system = SYSTEM_PROMPT.replace('{{LANGUAGE}}', languageName)

    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 400,
      system,
      messages: [
        ...(history ?? []).map((m) => ({ role: m.role, content: m.content })),
        { role: 'user' as const, content: message },
      ],
    })

    const reply = response.content.find((b) => b.type === 'text')?.text
      ?? "Sorry, I couldn't come up with a reply — please try again or WhatsApp us."

    return res.json({ success: true, data: { reply } })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: 'Invalid message' })
    }
    console.error('Chatbot error:', error)
    return res.status(500).json({ success: false, error: 'Something went wrong. Please try again or WhatsApp us.' })
  }
})

export default router
