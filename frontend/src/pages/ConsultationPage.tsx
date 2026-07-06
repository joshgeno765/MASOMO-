import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { bookConsultation } from '../lib/api'
import { ConsultationFormData } from '../types'

// Matches the slots listed on the Contact page (CAT = Central Africa Time, Kigali)
const SLOT_WINDOWS: Record<number, { start: number; end: number } | null> = {
  0: null, // Sunday — closed
  1: { start: 9, end: 12 }, // Monday
  2: { start: 14, end: 17 }, // Tuesday
  3: { start: 9, end: 12 }, // Wednesday
  4: { start: 14, end: 17 }, // Thursday
  5: { start: 9, end: 12 }, // Friday
  6: { start: 10, end: 13 }, // Saturday
}

const EMPTY_FORM: ConsultationFormData = {
  name: '',
  email: '',
  phone: '',
  country: '',
  destinationInterest: '',
  scheduledAt: '',
  notes: '',
}

function formatHour(hour: number): string {
  const period = hour >= 12 ? 'PM' : 'AM'
  const h12 = hour % 12 === 0 ? 12 : hour % 12
  return `${h12}:00 ${period}`
}

function toDateKey(d: Date): string {
  return d.toISOString().slice(0, 10)
}

function FloatingField({ label, name, value, onChange, type = 'text', required }: {
  label: string; name: string; value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string; required?: boolean
}) {
  const [focused, setFocused] = useState(false)
  const floated = focused || value.length > 0
  return (
    <div className="relative">
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        className="peer w-full border border-gray-300 rounded-xl px-4 pt-5 pb-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
      />
      <label
        className={`absolute left-4 transition-all pointer-events-none text-gray-400 ${
          floated ? 'top-1.5 text-[10px] font-semibold uppercase tracking-wide' : 'top-3.5 text-sm'
        }`}
      >
        {label}{required && ' *'}
      </label>
    </div>
  )
}

function weekDays(offsetWeeks: number): Date[] {
  const today = new Date()
  const monday = new Date(today)
  const dayOfWeek = today.getDay()
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
  monday.setDate(today.getDate() + diffToMonday + offsetWeeks * 7)
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    return d
  })
}

function isPastOrToday(d: Date): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return d <= today
}

export default function ConsultationPage() {
  const [form, setForm] = useState<ConsultationFormData>(EMPTY_FORM)
  const [weekOffset, setWeekOffset] = useState(0)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const days = useMemo(() => weekDays(weekOffset), [weekOffset])

  const window = useMemo(() => {
    if (!date) return null
    const day = new Date(`${date}T00:00:00`).getDay()
    return SLOT_WINDOWS[day]
  }, [date])

  const timeOptions = useMemo(() => {
    if (!window) return []
    const opts: string[] = []
    for (let h = window.start; h < window.end; h++) opts.push(String(h).padStart(2, '0'))
    return opts
  }, [window])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSelectDay = (d: Date) => {
    setDate(toDateKey(d))
    setTime('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim()) return toast.error('Please enter your full name')
    if (!form.email.includes('@')) return toast.error('Please enter a valid email')
    if (!form.phone.trim()) return toast.error('Please enter your phone number')
    if (!form.destinationInterest) return toast.error('Please select a study destination')
    if (!date) return toast.error('Please choose a date')
    if (!window) return toast.error('We are closed on Sundays — please choose another date')
    if (!time) return toast.error('Please choose a time slot')

    const scheduledAt = new Date(`${date}T${time}:00:00`).toISOString()

    setLoading(true)
    try {
      await bookConsultation({ ...form, scheduledAt })
      setSubmitted(true)
    } catch {
      toast.error('Something went wrong. Please try again or WhatsApp us.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4 max-w-xl">
            Book your free consultation
          </h1>
          <p className="text-white/70 text-lg max-w-xl mb-6">
            Pick a date and time that works for you — a Rwanda-based counselor will call you to talk through your options.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-white/60">
            <span>info@masomonow.com</span>
            <span>+1 778 846 8953</span>
            <span>Kigali, Rwanda — also serving DRC &amp; Djibouti</span>
          </div>
        </div>
      </section>

      {/* App-style card */}
      <section className="py-16 px-6">
        <div className="max-w-xl mx-auto bg-white border border-gray-200 rounded-3xl shadow-sm p-8">
          {submitted ? (
            <div className="py-6 text-center">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl text-navy mb-2">Consultation booked</h3>
              <p className="text-gray-600 mb-6">
                Thank you, <strong>{form.name}</strong>. We'll confirm your slot by email at <strong>{form.email}</strong> shortly.
              </p>
              <button
                onClick={() => { setForm(EMPTY_FORM); setDate(''); setTime(''); setSubmitted(false) }}
                className="btn-primary"
              >
                Book Another Consultation
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <FloatingField label="Full Name" name="name" value={form.name} onChange={handleChange} required />
              <FloatingField label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
              <FloatingField label="Phone" name="phone" value={form.phone} onChange={handleChange} required />

              <div>
                <select name="country" value={form.country} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all bg-white text-gray-700">
                  <option value="">Select country</option>
                  <option>Rwanda</option><option>DR Congo</option><option>Djibouti</option>
                  <option>Kenya</option><option>Uganda</option><option>Tanzania</option>
                  <option>Cameroon</option><option>Senegal</option><option>Côte d'Ivoire</option><option>Other</option>
                </select>
              </div>

              <div>
                <select name="destinationInterest" value={form.destinationInterest} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all bg-white text-gray-700">
                  <option value="">Where would you like to study?</option>
                  <option>Ireland — DCU (Dublin City University)</option>
                  <option>Ireland — Griffith College</option>
                  <option>Germany — CBS University of Applied Sciences</option>
                  <option>Germany — BSBI (Berlin School of Business & Innovation)</option>
                  <option>Germany — Gisma University of Applied Sciences</option>
                  <option>Poland — Vistula University</option>
                  <option>Canada — FMC Student Pilot</option>
                  <option>Not sure — need guidance</option>
                </select>
              </div>

              {/* Segmented control */}
              <div>
                <div className="flex bg-gray-100 rounded-full p-1 mb-4">
                  {[0, 1].map((w) => (
                    <button
                      type="button"
                      key={w}
                      onClick={() => { setWeekOffset(w); setDate(''); setTime('') }}
                      className={`flex-1 py-2 rounded-full text-sm font-semibold transition-colors ${
                        weekOffset === w ? 'bg-navy text-white' : 'text-gray-500'
                      }`}
                    >
                      {w === 0 ? 'This Week' : 'Next Week'}
                    </button>
                  ))}
                </div>

                {/* Day chips */}
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {days.map((d) => {
                    const key = toDateKey(d)
                    const disabled = isPastOrToday(d) || SLOT_WINDOWS[d.getDay()] === null
                    const isSelected = key === date
                    return (
                      <button
                        type="button"
                        key={key}
                        disabled={disabled}
                        onClick={() => handleSelectDay(d)}
                        className={`flex-shrink-0 w-14 py-2.5 rounded-xl text-center transition-colors ${
                          isSelected ? 'bg-navy text-white'
                          : disabled ? 'bg-gray-50 text-gray-300 cursor-not-allowed'
                          : 'bg-gray-100 text-gray-700 hover:bg-brand-gold/20'
                        }`}
                      >
                        <div className="text-[10px] font-semibold uppercase">{d.toLocaleDateString(undefined, { weekday: 'short' })}</div>
                        <div className="text-sm font-bold">{d.getDate()}</div>
                      </button>
                    )
                  })}
                </div>

                {/* Time chips */}
                {date && (
                  <div className="mt-4">
                    {!window ? (
                      <p className="text-sm text-gray-400">Closed Sundays — pick another day.</p>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {timeOptions.map((h) => (
                          <button
                            type="button"
                            key={h}
                            onClick={() => setTime(h)}
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                              time === h ? 'bg-navy text-white border-navy' : 'border-gray-300 text-gray-600 hover:border-navy'
                            }`}
                          >
                            {formatHour(parseInt(h))}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <textarea name="notes" value={form.notes} onChange={handleChange} rows={3}
                placeholder="Anything we should know?"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all resize-none" />

              <button type="submit" disabled={loading}
                className="w-full bg-navy hover:bg-brand-blue text-white font-bold py-3.5 rounded-full transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                {loading ? 'Booking...' : 'Book Consultation →'}
              </button>

              <a href="https://wa.me/17788468953" className="block text-center text-sm font-semibold text-[#25D366] hover:underline">
                Prefer to chat now? WhatsApp us
              </a>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
