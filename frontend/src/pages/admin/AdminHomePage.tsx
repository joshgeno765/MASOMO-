import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getLeads, getInsights, runDigestNow } from '../../lib/api'
import { Lead, LEAD_STATUS_LABELS, LEAD_STATUS_COLORS, LEAD_STATUS_DOT, LeadStatus, CounselorInsights } from '../../types'
import { useAuth } from '../../context/AuthContext'

const DASHBOARD_PHOTOS = [
  '/images/team/team-2-thumb.webp',
  '/images/seminars/seminar-6-thumb.webp',
  '/images/team/graduation-1-thumb.webp',
]

function monthPaceMessage(current: number, target: number): string {
  const now = new Date()
  const dayOfMonth = now.getDate()
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
  const expectedByNow = (dayOfMonth / daysInMonth) * target
  if (current >= target) return '🎉 Goal reached this month!'
  if (current >= expectedByNow) return "You're on pace to hit your goal."
  const remaining = target - current
  const daysLeft = daysInMonth - dayOfMonth
  return `${remaining} more to go, ${daysLeft} day${daysLeft === 1 ? '' : 's'} left this month.`
}

function GoalBar({ label, current, target }: { label: string; current: number; target: number }) {
  const pct = Math.min(100, Math.round((current / target) * 100))
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm text-gray-700">{label}</span>
        <span className="text-sm font-semibold text-navy">{current}/{target}</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-brand-gold rounded-full transition-all" style={{ width: `${pct}%` }} />
      </div>
      <p className="text-xs text-gray-500 mt-1">{monthPaceMessage(current, target)}</p>
    </div>
  )
}

export default function AdminHomePage() {
  const { user } = useAuth()
  const [leads, setLeads] = useState<Lead[]>([])
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [byDestination, setByDestination] = useState<{ destination: string; count: number }[]>([])
  const [loading, setLoading] = useState(true)
  const [sendingDigest, setSendingDigest] = useState(false)
  const [insights, setInsights] = useState<CounselorInsights | null>(null)

  const handleSendDigest = async () => {
    setSendingDigest(true)
    try {
      await runDigestNow()
      toast.success('Digest sent (if there was new activity to report)')
    } catch {
      toast.error('Failed to run digest')
    } finally {
      setSendingDigest(false)
    }
  }

  useEffect(() => {
    getLeads({} as never)
      .then((res) => {
        setLeads(res.data?.slice(0, 6) ?? [])
        if (res.meta?.counts) {
          const map: Record<string, number> = {}
          res.meta.counts.forEach((c) => { map[c.status] = c._count.id })
          setCounts(map)
        }
        if (res.meta?.byDestination) {
          setByDestination(
            res.meta.byDestination
              .map((d) => ({ destination: d.destinationInterest, count: d._count.id }))
              .slice(0, 6)
          )
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))

    getInsights().then((res) => setInsights(res.data ?? null)).catch(() => {})
  }, [])

  const total = Object.values(counts).reduce((a, b) => a + b, 0)
  const converted = counts['CONVERTED'] ?? 0
  const conversionRate = total > 0 ? Math.round((converted / total) * 100) : 0

  return (
    <div className="p-8 max-w-6xl">
      {/* Header */}
      <div className="mb-10 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl text-navy">
            {user?.firstName ? `Welcome back, ${user.firstName}` : 'Dashboard'}
          </h1>
          <p className="text-gray-500 text-sm mt-1">{user?.email}</p>
        </div>
        {user?.role === 'ADMIN' && (
          <button
            type="button"
            onClick={handleSendDigest}
            disabled={sendingDigest}
            className="flex-shrink-0 border border-gray-300 text-gray-600 hover:border-navy hover:text-navy px-4 py-2 rounded text-sm font-semibold transition-colors disabled:opacity-60"
          >
            {sendingDigest ? 'Sending...' : 'Send digest now'}
          </button>
        )}
      </div>

      {/* Metrics row */}
      <div className="grid grid-cols-5 gap-0 border border-gray-200 rounded-lg overflow-hidden mb-10">
        {[
          { label: 'Total', value: loading ? '—' : total },
          { label: 'New', value: loading ? '—' : counts['NEW'] ?? 0 },
          { label: 'Consultation', value: loading ? '—' : counts['CONSULTATION_SCHEDULED'] ?? 0 },
          { label: 'Converted', value: loading ? '—' : converted },
          { label: 'Conversion Rate', value: loading ? '—' : `${conversionRate}%` },
        ].map((m, i) => (
          <div key={m.label} className={`px-6 py-5 bg-white ${i < 4 ? 'border-r border-gray-200' : ''}`}>
            <div className="text-2xl font-bold text-navy">{m.value}</div>
            <div className="text-xs text-gray-500 mt-1">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Photo strip */}
      <div className="grid grid-cols-3 gap-3 mb-10 h-28">
        {DASHBOARD_PHOTOS.map((src) => (
          <div key={src} className="rounded-lg overflow-hidden">
            <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
          </div>
        ))}
      </div>

      {/* Goals + Recommendations */}
      {insights && (
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div>
            <h2 className="font-semibold text-navy text-sm mb-4">Your Goals — {insights.monthLabel}</h2>
            <div className="border border-gray-200 rounded-lg p-5 bg-white space-y-5">
              <GoalBar label="Conversions" current={insights.conversions.current} target={insights.conversions.target} />
              <GoalBar label="Consultations Booked" current={insights.consultationsBooked.current} target={insights.consultationsBooked.target} />
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-700">Avg. Response Time</span>
                  <span className={`text-sm font-semibold ${
                    insights.avgResponseHours.current === null ? 'text-gray-400'
                    : insights.avgResponseHours.current <= insights.avgResponseHours.target ? 'text-green-600' : 'text-amber-600'
                  }`}>
                    {insights.avgResponseHours.current === null ? 'No data yet' : `${insights.avgResponseHours.current} hrs`}
                  </span>
                </div>
                <p className="text-xs text-gray-500">Goal: within {insights.avgResponseHours.target} hrs of a lead coming in</p>
              </div>

              {insights.teamProgress && insights.teamProgress.length > 0 && (
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Team This Month</p>
                  <div className="space-y-1.5">
                    {insights.teamProgress.map((t) => (
                      <div key={t.email} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 truncate pr-2">{t.email}</span>
                        <span className="font-semibold text-navy flex-shrink-0">{t.conversions} conversions</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <h2 className="font-semibold text-navy text-sm mb-4">Recommendations</h2>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              {insights.staleLeads.length === 0 ? (
                <div className="px-5 py-6 text-gray-500 text-sm bg-white">You're all caught up — no leads need follow-up right now.</div>
              ) : (
                insights.staleLeads.map((l, i) => (
                  <div key={l.id} className={`flex items-center justify-between px-4 py-3 bg-white ${i < insights.staleLeads.length - 1 ? 'border-b border-gray-100' : ''}`}>
                    <div>
                      <div className="text-sm font-semibold text-navy">{l.name}</div>
                      <div className="text-xs text-gray-500">Quiet for {l.daysSinceUpdate} day{l.daysSinceUpdate === 1 ? '' : 's'}</div>
                    </div>
                    <Link to="/admin/leads" className="text-xs font-semibold text-brand-blue hover:underline flex-shrink-0">Follow up →</Link>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-8">
        {/* Pipeline */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-navy text-sm">Pipeline</h2>
            <Link to="/admin/leads" className="text-xs text-brand-blue hover:underline">View all</Link>
          </div>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            {(['NEW', 'CONTACTED', 'CONSULTATION_SCHEDULED', 'APPLICATION_STARTED', 'CONVERTED'] as LeadStatus[]).map((s, i, arr) => (
              <div key={s} className={`flex items-center justify-between px-4 py-3 bg-white ${i < arr.length - 1 ? 'border-b border-gray-100' : ''}`}>
                <div className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${LEAD_STATUS_DOT[s]}`} />
                  <span className="text-sm text-gray-700">{LEAD_STATUS_LABELS[s]}</span>
                </div>
                <span className="font-semibold text-navy text-sm">{counts[s] ?? 0}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Leads by destination */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-navy text-sm">Leads by Destination</h2>
          </div>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            {loading ? (
              <div className="px-4 py-6 text-gray-500 text-sm bg-white">Loading...</div>
            ) : byDestination.length === 0 ? (
              <div className="px-4 py-6 text-gray-500 text-sm bg-white">No leads yet</div>
            ) : (
              byDestination.map((d, i) => (
                <div key={d.destination} className={`flex items-center justify-between px-4 py-3 bg-white ${i < byDestination.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <span className="text-sm text-gray-700 truncate pr-2">{d.destination}</span>
                  <span className="font-semibold text-navy text-sm flex-shrink-0">{d.count}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent leads */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-navy text-sm">Recent Leads</h2>
            <Link to="/admin/leads" className="text-xs text-brand-blue hover:underline">View all</Link>
          </div>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            {loading ? (
              <div className="px-4 py-6 text-gray-500 text-sm bg-white">Loading...</div>
            ) : leads.length === 0 ? (
              <div className="px-4 py-6 text-gray-500 text-sm bg-white">No leads yet</div>
            ) : (
              leads.map((lead, i) => (
                <div key={lead.id} className={`flex items-center justify-between px-4 py-3 bg-white ${i < leads.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <div>
                    <div className="text-sm font-semibold text-navy">{lead.name}</div>
                    <div className="text-xs text-gray-500">{lead.destinationInterest}</div>
                  </div>
                  <div className={`flex items-center gap-1.5 ${LEAD_STATUS_COLORS[lead.status]}`}>
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${LEAD_STATUS_DOT[lead.status]}`} />
                    <span className="text-xs">{LEAD_STATUS_LABELS[lead.status]}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
