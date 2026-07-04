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

function minSelectableDate(): string {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().slice(0, 10)
}

function formatHour(hour: number): string {
  const period = hour >= 12 ? 'PM' : 'AM'
  const h12 = hour % 12 === 0 ? 12 : hour % 12
  return `${h12}:00 ${period}`
}

export default function ConsultationPage() {
  const [form, setForm] = useState<ConsultationFormData>(EMPTY_FORM)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

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

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value)
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
          <p className="text-white/70 text-lg max-w-xl">
            Pick a date and time that works for you — a Rwanda-based counselor will call you to talk through your options.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-14">

          {/* Slot info */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="font-bold text-navy text-lg mb-5">Available slots</h2>
              <div className="space-y-5">
                <div className="border-t border-gray-200 pt-4">
                  <div className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-1">Mon / Wed / Fri</div>
                  <div className="font-semibold text-navy">9am – 12pm CAT</div>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-1">Tue / Thu</div>
                  <div className="font-semibold text-navy">2pm – 5pm CAT</div>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-1">Saturday</div>
                  <div className="font-semibold text-navy">10am – 1pm CAT</div>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-4">CAT = Central Africa Time (Kigali). Closed Sundays.</p>
            </div>

            <a
              href="https://wa.me/17788468953"
              className="block w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold py-3 rounded-lg transition-colors text-sm text-center"
            >
              Prefer to chat now? WhatsApp us
            </a>
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            {submitted ? (
              <div className="py-10 text-center">
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
              <>
                <h2 className="font-bold text-navy text-lg mb-6">Your Details</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email <span className="text-red-500">*</span></label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@email.com"
                        className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone <span className="text-red-500">*</span></label>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+250 700 000 000"
                        className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Country</label>
                      <select
                        name="country"
                        value={form.country}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all bg-white"
                      >
                        <option value="">Select country</option>
                        <option>Rwanda</option>
                        <option>DR Congo</option>
                        <option>Djibouti</option>
                        <option>Kenya</option>
                        <option>Uganda</option>
                        <option>Tanzania</option>
                        <option>Cameroon</option>
                        <option>Senegal</option>
                        <option>Côte d'Ivoire</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Study Destination <span className="text-red-500">*</span></label>
                    <select
                      name="destinationInterest"
                      value={form.destinationInterest}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all bg-white"
                    >
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

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Preferred Date <span className="text-red-500">*</span></label>
                      <input
                        type="date"
                        min={minSelectableDate()}
                        value={date}
                        onChange={handleDateChange}
                        className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Preferred Time <span className="text-red-500">*</span></label>
                      <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        disabled={!date || !window}
                        className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all bg-white disabled:bg-gray-50 disabled:text-gray-400"
                      >
                        <option value="">{date && !window ? 'Closed on Sundays' : 'Select time'}</option>
                        {timeOptions.map((h) => (
                          <option key={h} value={h}>{formatHour(parseInt(h))} CAT</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Anything we should know?</label>
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell us about your education background and goals..."
                      className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-navy hover:bg-brand-blue text-white font-bold py-3.5 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Booking...' : 'Book Consultation →'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
