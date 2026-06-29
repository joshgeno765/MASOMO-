const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
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
  console.log('Admin user ready: admin@masomonow.com')
}

main()
  .catch((e) => { console.error('Seed failed:', e); process.exit(1) })
  .finally(() => prisma.$disconnect())
