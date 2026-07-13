import prisma from './prisma'

const CONVERSION_TARGET = 10
const CONSULTATION_TARGET = 15
const RESPONSE_TARGET_HOURS = 48
const STALE_DAYS_THRESHOLD = 5

function monthRange(date = new Date()): { start: Date; end: Date } {
  const start = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1))
  const end = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 1))
  return { start, end }
}

export interface CounselorInsights {
  monthLabel: string
  conversions: { current: number; target: number }
  consultationsBooked: { current: number; target: number }
  avgResponseHours: { current: number | null; target: number }
  staleLeads: Array<{ id: number; name: string; daysSinceUpdate: number }>
}

export async function getInsightsForUser(userId: number, role: string): Promise<CounselorInsights> {
  const { start, end } = monthRange()
  const isCounselor = role === 'COUNSELOR'

  const conversions = await prisma.auditLog.count({
    where: {
      action: 'STATUS_CHANGED',
      newValue: 'CONVERTED',
      createdAt: { gte: start, lt: end },
      ...(isCounselor ? { lead: { assignedCounselorId: userId } } : {}),
    },
  })

  const consultationsBooked = await prisma.appointment.count({
    where: {
      createdAt: { gte: start, lt: end },
      ...(isCounselor ? { lead: { assignedCounselorId: userId } } : {}),
    },
  })

  const contactedLogs = await prisma.auditLog.findMany({
    where: {
      action: 'STATUS_CHANGED',
      newValue: 'CONTACTED',
      createdAt: { gte: start, lt: end },
      ...(isCounselor ? { lead: { assignedCounselorId: userId } } : {}),
    },
    include: { lead: true },
  })
  const responseHours = contactedLogs
    .map((log) => (log.lead ? (log.createdAt.getTime() - log.lead.createdAt.getTime()) / 3_600_000 : null))
    .filter((h): h is number => h !== null)
  const avgResponseHours = responseHours.length
    ? Math.round((responseHours.reduce((a, b) => a + b, 0) / responseHours.length) * 10) / 10
    : null

  const staleThreshold = new Date(Date.now() - STALE_DAYS_THRESHOLD * 24 * 60 * 60 * 1000)
  const staleLeadsRaw = await prisma.lead.findMany({
    where: {
      status: { in: ['NEW', 'CONTACTED', 'CONSULTATION_SCHEDULED'] },
      updatedAt: { lt: staleThreshold },
      ...(isCounselor ? { assignedCounselorId: userId } : {}),
    },
    orderBy: { updatedAt: 'asc' },
    take: 5,
  })

  return {
    monthLabel: start.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    conversions: { current: conversions, target: CONVERSION_TARGET },
    consultationsBooked: { current: consultationsBooked, target: CONSULTATION_TARGET },
    avgResponseHours: { current: avgResponseHours, target: RESPONSE_TARGET_HOURS },
    staleLeads: staleLeadsRaw.map((l) => ({
      id: l.id,
      name: l.name,
      daysSinceUpdate: Math.floor((Date.now() - l.updatedAt.getTime()) / (24 * 60 * 60 * 1000)),
    })),
  }
}

export async function getTeamProgress(): Promise<Array<{ email: string; conversions: number }>> {
  const { start, end } = monthRange()
  const counselors = await prisma.user.findMany({
    where: { role: 'COUNSELOR', isActive: true },
    select: { id: true, email: true },
  })

  const results = await Promise.all(
    counselors.map(async (c) => {
      const conversions = await prisma.auditLog.count({
        where: {
          action: 'STATUS_CHANGED',
          newValue: 'CONVERTED',
          createdAt: { gte: start, lt: end },
          lead: { assignedCounselorId: c.id },
        },
      })
      return { email: c.email, conversions }
    })
  )

  return results.sort((a, b) => b.conversions - a.conversions)
}
