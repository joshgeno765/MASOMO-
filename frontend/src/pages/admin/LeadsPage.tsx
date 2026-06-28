import { useState, useEffect, useCallback } from 'react'
import toast from 'react-hot-toast'
import { getLeads, updateLead } from '../../lib/api'
import { Lead, LeadStatus, LEAD_STATUS_LABELS, LEAD_STATUS_COLORS, LEAD_STATUS_DOT } from '../../types'

const ALL_STATUSES: LeadStatus[] = ['NEW', 'CONTACTED', 'CONSULTATION_SCHEDULED', 'APPLICATION_STARTED', 'CONVERTED', 'CLOSED']

function StatusLabel({ status }: { status: LeadStatus }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${LEAD_STATUS_COLORS[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${LEAD_STATUS_DOT[status]}`} />
      {LEAD_STATUS_LABELS[status]}
    </span>
  )
}

function LeadModal({ lead, onClose, onSave }: {
  lead: Lead
  onClose: () => void
  onSave: (id: number, data: Partial<Lead>) => Promise<void>
}) {
  const [status, setStatus] = useState<LeadStatus>(lead.status)
  const [notes, setNotes] = useState(lead.notes ?? '')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      await onSave(lead.id, { status, notes })
      toast.success('Saved')
      onClose()
    } catch {
      toast.error('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-lg w-full max-w-lg border border-gray-200" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-start justify-between">
          <div>
            <h2 className="font-semibold text-navy">{lead.name}</h2>
            <p className="text-gray-400 text-sm">{lead.email} · {lead.phone}</p>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-gray-500 text-lg leading-none mt-0.5">✕</button>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            {[
              { label: 'Country', value: lead.country || '—' },
              { label: 'Destination', value: lead.destinationInterest },
              { label: 'Submitted', value: new Date(lead.createdAt).toLocaleDateString() },
              { label: 'Updated', value: new Date(lead.updatedAt).toLocaleDateString() },
            ].map((f) => (
              <div key={f.label}>
                <div className="text-xs text-gray-400 mb-0.5">{f.label}</div>
                <div className="font-medium text-navy">{f.value}</div>
              </div>
            ))}
          </div>

          {lead.message && (
            <div className="border-l-2 border-gray-200 pl-3">
              <div className="text-xs text-gray-400 mb-1">Message</div>
              <p className="text-sm text-gray-600">{lead.message}</p>
            </div>
          )}

          {/* Status */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as LeadStatus)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-navy bg-white"
            >
              {ALL_STATUSES.map((s) => (
                <option key={s} value={s}>{LEAD_STATUS_LABELS[s]}</option>
              ))}
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Add counselor notes..."
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-navy resize-none"
            />
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex gap-3 justify-end">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-500 hover:text-gray-800 transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2 bg-navy hover:bg-navy-mid text-white text-sm font-semibold rounded transition-colors disabled:opacity-60"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [total, setTotal] = useState(0)
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'ALL'>('ALL')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [counts, setCounts] = useState<Record<string, number>>({})

  const fetchLeads = useCallback(async () => {
    setLoading(true)
    try {
      const res = await getLeads({
        ...(statusFilter !== 'ALL' && { status: statusFilter }),
        ...(search && { search }),
      })
      setLeads(res.data ?? [])
      setTotal(res.meta?.total ?? 0)
      if (res.meta?.counts) {
        const map: Record<string, number> = {}
        res.meta.counts.forEach((c) => { map[c.status] = c._count.id })
        setCounts(map)
      }
    } catch {
      toast.error('Failed to load leads')
    } finally {
      setLoading(false)
    }
  }, [statusFilter, search])

  useEffect(() => { fetchLeads() }, [fetchLeads])

  const handleSave = async (id: number, data: Partial<Lead>) => {
    await updateLead(id, data)
    await fetchLeads()
  }

  const totalCount = Object.values(counts).reduce((a, b) => a + b, 0)

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-serif text-2xl text-navy">Leads</h1>
        <p className="text-gray-400 text-sm mt-1">{total} total</p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-1 mb-5 border-b border-gray-200 pb-0">
        {(['ALL', ...ALL_STATUSES] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-3 py-2 text-sm transition-colors border-b-2 -mb-px ${
              statusFilter === s
                ? 'border-navy text-navy font-semibold'
                : 'border-transparent text-gray-400 hover:text-gray-700'
            }`}
          >
            {s === 'ALL' ? `All (${totalCount})` : `${LEAD_STATUS_LABELS[s]} (${counts[s] ?? 0})`}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-5">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email or phone..."
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-navy w-full max-w-xs transition-colors"
        />
      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {loading ? (
          <div className="text-center py-12 text-gray-400 text-sm bg-white">Loading...</div>
        ) : leads.length === 0 ? (
          <div className="text-center py-12 text-gray-400 text-sm bg-white">No leads found</div>
        ) : (
          <table className="w-full text-sm bg-white">
            <thead className="border-b border-gray-200">
              <tr>
                {['Name', 'Contact', 'Country', 'Destination', 'Status', 'Date', ''].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, i) => (
                <tr key={lead.id} className={`hover:bg-gray-50 transition-colors ${i < leads.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <td className="px-4 py-3 font-semibold text-navy">{lead.name}</td>
                  <td className="px-4 py-3 text-gray-500">
                    <div>{lead.email}</div>
                    <div className="text-xs text-gray-400">{lead.phone}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{lead.country || '—'}</td>
                  <td className="px-4 py-3 text-gray-600 max-w-[140px] truncate">{lead.destinationInterest}</td>
                  <td className="px-4 py-3"><StatusLabel status={lead.status} /></td>
                  <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSelectedLead(lead)}
                      className="text-xs text-gray-400 hover:text-navy transition-colors"
                    >
                      Open
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selectedLead && (
        <LeadModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onSave={handleSave}
        />
      )}
    </div>
  )
}
