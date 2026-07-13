import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

const prisma = new PrismaClient()

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL || 'admin@masomonow.com'

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    console.log(`Admin user already exists: ${email} (password left unchanged)`)
    return
  }

  const password = process.env.SEED_ADMIN_PASSWORD || crypto.randomBytes(9).toString('base64').replace(/[+/=]/g, '')
  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.user.create({
    data: { email, password: hashedPassword, role: 'ADMIN', mustChangePassword: true },
  })

  console.log(`Admin user created: ${email}`)
  if (!process.env.SEED_ADMIN_PASSWORD) {
    console.log(`Temporary password (save this now — it will not be shown again): ${password}`)
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
