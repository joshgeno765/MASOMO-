import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  const hashedPassword = await bcrypt.hash('Admin@Masomo2025', 10)

  await prisma.user.upsert({
    where: { email: 'admin@masomonow.com' },
    update: { password: hashedPassword },
    create: {
      email: 'admin@masomonow.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  console.log('✅ Database seeded successfully!')
  console.log('   Admin account: admin@masomonow.com')
  console.log('   Password: Admin@Masomo2025')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
