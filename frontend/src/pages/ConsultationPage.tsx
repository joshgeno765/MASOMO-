import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { bookConsultation } from '../lib/api'
import { ConsultationFormData } from '../types'
import FloatingField from '../components/ui/FloatingField'
import Button from '../components/ui/Button'
import PhotoHero from '../components/ui/PhotoHero'

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

const DESTINATION_OPTIONS = [
  'Ireland — DCU (Dublin City University)',
  'Ireland — Griffith College',
  'Germany — CBS University of Applied Sciences',
  'Germany — BSBI (Berlin School of Business & Innovation)',
  'Germany — Gisma University of Applied Sciences',
  'Poland — Vistula University',
  'USA — Lake Washington Institute of Technology',
  'USA — Seattle Colleges',
  'Canada — FMC Student Pilot',
  'Canada — BCIT',
  'Canada — TRU (Thompson Rivers University)',
  'Canada — University of Lethbridge',
  'Canada — Northern Lights College',
  'Canada — North Island College',
  'Not sure — need guidance',
]

// The country cards/links elsewhere on the site pass the country's display name
// (matching destinations.ts), which doesn't always match this dropdown's own
// abbreviations (e.g. "United States" here vs "USA" in DESTINATION_OPTIONS).
const DESTINATION_PARAM_PREFIX: Record<string, string> = {
  'Canada': 'Canada',
  'United States': 'USA',
  'Ireland': 'Ireland',
  'Germany': 'Germany',
  'Poland': 'Poland',
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
  const [searchParams] = useSearchParams()
  const [form, setForm] = useState<ConsultationFormData>(EMPTY_FORM)
  const [weekOffset, setWeekOffset] = useState(0)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const destination = searchParams.get('destination')
    if (!destination) return
    const prefix = DESTINATION_PARAM_PREFIX[destination]
    if (!prefix) return
    const match = DESTINATION_OPTIONS.find((o) => o.startsWith(`${prefix} —`))
    if (match) setForm((prev) => ({ ...prev, destinationInterest: match }))
  }, [searchParams])

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
      <PhotoHero
        image="/images/seminars/seminar-2.webp"
        alt="Masomo Now / ELIMU education symposium in Nairobi, Kenya"
        eyebrow="Book a Consultation"
        title="Book your free consultation"
        subtitle="Pick a date and time that works for you — one of our counselors will call you to talk through your options."
        height="min-h-[380px]"
      >
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-white/60">
          <span>info@masomonow.com</span>
          <span>+250 793 412 612</span>
        </div>
      </PhotoHero>

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
                  {DESTINATION_OPTIONS.map((o) => (<option key={o}>{o}</option>))}
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
                      <p className="text-sm text-gray-500">Closed Sundays — pick another day.</p>
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

              <Button type="submit" fullWidth loading={loading}>
                {loading ? 'Booking...' : 'Book Consultation →'}
              </Button>

              <p className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500 text-center">
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Submitted securely over HTTPS. By booking, you agree to our{' '}
                <Link to="/privacy" className="underline hover:text-navy">Privacy Policy</Link>.
              </p>

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
