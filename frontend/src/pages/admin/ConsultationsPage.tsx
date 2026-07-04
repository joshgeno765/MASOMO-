import { useState, useEffect, useCallback } from 'react'
import toast from 'react-hot-toast'
import { getAppointments, updateAppointment } from '../../lib/api'
import { AppointmentWithLead, AppointmentStatus } from '../../types'

const ALL_STATUSES: AppointmentStatus[] = ['SCHEDULED', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'NO_SHOW']

const STATUS_LABELS: Record<AppointmentStatus, string> = {
  SCHEDULED: 'Scheduled',
  CONFIRMED: 'Confirmed',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
  NO_SHOW: 'No Show',
}

const STATUS_COLORS: Record<AppointmentStatus, string> = {
  SCHEDULED: 'text-blue-600',
  CONFIRMED: 'text-purple-600',
  COMPLETED: 'text-green-600',
  CANCELLED: 'text-gray-400',
  NO_SHOW: 'text-red-500',
}

const STATUS_DOT: Record<AppointmentStatus, string> = {
  SCHEDULED: 'bg-blue-500',
  CONFIRMED: 'bg-purple-500',
  COMPLETED: 'bg-green-500',
  CANCELLED: 'bg-gray-400',
  NO_SHOW: 'bg-red-500',
}

function StatusLabel({ status }: { status: AppointmentStatus }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${STATUS_COLORS[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${STATUS_DOT[status]}`} />
      {STATUS_LABELS[status]}
    </span>
  )
}

function whatsappLink(phone: string): string {
  const digits = phone.replace(/[^0-9]/g, '')
  return `https://wa.me/${digits}`
}

function AppointmentModal({ appointment, onClose, onSave }: {
  appointment: AppointmentWithLead
  onClose: () => void
  onSave: (id: number, data: Partial<AppointmentWithLead>) => Promise<void>
}) {
  const [status, setStatus] = useState<AppointmentStatus>(appointment.status)
  const [notes, setNotes] = useState(appointment.notes ?? '')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      await onSave(appointment.id, { status, notes })
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
            <h2 className="font-semibold text-navy">{appointment.lead?.name ?? 'Unknown'}</h2>
            <p className="text-gray-400 text-sm">{appointment.lead?.email} · {appointment.lead?.phone}</p>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-gray-500 text-lg leading-none mt-0.5">✕</button>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            {[
              { label: 'Destination', value: appointment.destination || '—' },
              { label: 'Duration', value: `${appointment.duration} min` },
              { label: 'Scheduled for', value: new Date(appointment.scheduledAt).toLocaleString() },
              { label: 'Booked on', value: new Date(appointment.createdAt).toLocaleDateString() },
            ].map((f) => (
              <div key={f.label}>
                <div className="text-xs text-gray-400 mb-0.5">{f.label}</div>
                <div className="font-medium text-navy">{f.value}</div>
              </div>
            ))}
          </div>

          {appointment.lead?.message && (
            <div className="border-l-2 border-gray-200 pl-3">
              <div className="text-xs text-gray-400 mb-1">Original inquiry</div>
              <p className="text-sm text-gray-600">{appointment.lead.message}</p>
            </div>
          )}

          {/* Status */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as AppointmentStatus)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-navy bg-white"
            >
              {ALL_STATUSES.map((s) => (
                <option key={s} value={s}>{STATUS_LABELS[s]}</option>
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

          {appointment.lead?.phone && (
            <a
              href={whatsappLink(appointment.lead.phone)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#25D366] hover:underline"
            >
              WhatsApp {appointment.lead.name} →
            </a>
          )}
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

export default function ConsultationsPage() {
  const [appointments, setAppointments] = useState<AppointmentWithLead[]>([])
  const [total, setTotal] = useState(0)
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | 'ALL'>('ALL')
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<AppointmentWithLead | null>(null)

  const fetchAppointments = useCallback(async () => {
    setLoading(true)
    try {
      const res = await getAppointments({
        ...(statusFilter !== 'ALL' && { status: statusFilter }),
      })
      setAppointments(res.data ?? [])
      setTotal(res.meta?.total ?? 0)
    } catch {
      toast.error('Failed to load consultations')
    } finally {
      setLoading(false)
    }
  }, [statusFilter])

  useEffect(() => { fetchAppointments() }, [fetchAppointments])

  const handleSave = async (id: number, data: Partial<AppointmentWithLead>) => {
    await updateAppointment(id, data)
    await fetchAppointments()
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-serif text-2xl text-navy">Consultations</h1>
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
            {s === 'ALL' ? 'All' : STATUS_LABELS[s]}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {loading ? (
          <div className="text-center py-12 text-gray-400 text-sm bg-white">Loading...</div>
        ) : appointments.length === 0 ? (
          <div className="text-center py-12 text-gray-400 text-sm bg-white">No consultations found</div>
        ) : (
          <table className="w-full text-sm bg-white">
            <thead className="border-b border-gray-200">
              <tr>
                {['Name', 'Contact', 'Destination', 'Scheduled For', 'Status', ''].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {appointments.map((a, i) => (
                <tr key={a.id} className={`hover:bg-gray-50 transition-colors ${i < appointments.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <td className="px-4 py-3 font-semibold text-navy">{a.lead?.name ?? '—'}</td>
                  <td className="px-4 py-3 text-gray-500">
                    <div>{a.lead?.email}</div>
                    <div className="text-xs text-gray-400">{a.lead?.phone}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-600 max-w-[140px] truncate">{a.destination || '—'}</td>
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{new Date(a.scheduledAt).toLocaleString()}</td>
                  <td className="px-4 py-3"><StatusLabel status={a.status} /></td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSelected(a)}
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

      {selected && (
        <AppointmentModal
          appointment={selected}
          onClose={() => setSelected(null)}
          onSave={handleSave}
        />
      )}
    </div>
  )
}
