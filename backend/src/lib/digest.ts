import prisma from './prisma'
import { sendDailyDigestEmail } from './email'

const DIGEST_HOUR_UTC = 6

function msUntilNextRun(hourUtc: number): number {
  const now = new Date()
  const next = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), hourUtc, 0, 0, 0))
  if (next.getTime() <= now.getTime()) {
    next.setUTCDate(next.getUTCDate() + 1)
  }
  return next.getTime() - now.getTime()
}

export async function runDigest(): Promise<void> {
  try {
    const lastRun = await prisma.digestRun.findFirst({ orderBy: { lastRunAt: 'desc' } })
    const since = lastRun?.lastRunAt ?? new Date(Date.now() - 24 * 60 * 60 * 1000)
    const now = new Date()

    const [newLeads, newAppointments] = await Promise.all([
      prisma.lead.findMany({ where: { createdAt: { gte: since, lt: now } }, orderBy: { createdAt: 'asc' } }),
      prisma.appointment.findMany({
        where: { createdAt: { gte: since, lt: now } },
        orderBy: { createdAt: 'asc' },
        include: { lead: true },
      }),
    ])

    if (newLeads.length > 0 || newAppointments.length > 0) {
      await sendDailyDigestEmail({ since, until: now, leads: newLeads, appointments: newAppointments })
    } else {
      console.log(`Daily digest: no new activity ${since.toISOString()}–${now.toISOString()}, skipping send`)
    }

    await prisma.digestRun.create({
      data: { lastRunAt: now, newLeadsCount: newLeads.length, newAppointmentsCount: newAppointments.length },
    })
  } catch (err) {
    console.error('Daily digest run failed:', err)
    // Deliberately do not write a DigestRun row on failure — tomorrow's `since`
    // then naturally reaches back to the last successful run instead of
    // silently losing a window's leads from the digest.
  }
}

function scheduleNext(): void {
  setTimeout(() => { runDigest().finally(scheduleNext) }, msUntilNextRun(DIGEST_HOUR_UTC))
}

export async function startDigestScheduler(): Promise<void> {
  const lastRun = await prisma.digestRun.findFirst({ orderBy: { lastRunAt: 'desc' } })
  const hoursSinceLastRun = lastRun ? (Date.now() - lastRun.lastRunAt.getTime()) / 3_600_000 : Infinity

  // Catch-up: if the process was down across an entire digest window (extended
  // outage or a redeploy straddling DIGEST_HOUR_UTC), send immediately on boot
  // instead of silently waiting up to another 24h.
  if (hoursSinceLastRun > 25) {
    await runDigest()
  }
  scheduleNext()
}
