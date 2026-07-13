import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getLeads } from '../../lib/api'
import { Lead, LEAD_STATUS_LABELS, LEAD_STATUS_COLORS, LEAD_STATUS_DOT, LeadStatus } from '../../types'
import { useAuth } from '../../context/AuthContext'

export default function AdminHomePage() {
  const { user } = useAuth()
  const [leads, setLeads] = useState<Lead[]>([])
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [byDestination, setByDestination] = useState<{ destination: string; count: number }[]>([])
  const [loading, setLoading] = useState(true)

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
  }, [])

  const total = Object.values(counts).reduce((a, b) => a + b, 0)
  const converted = counts['CONVERTED'] ?? 0
  const conversionRate = total > 0 ? Math.round((converted / total) * 100) : 0

  return (
    <div className="p-8 max-w-6xl">
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-serif text-2xl text-navy">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">{user?.email}</p>
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
