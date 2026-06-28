import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
prisma.lead.deleteMany()
  .then((r) => { console.log(`Deleted ${r.count} leads`); return prisma.$disconnect() })
  .catch(console.error)
