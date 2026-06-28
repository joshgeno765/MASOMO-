import { useState } from 'react'
import toast from 'react-hot-toast'
import { submitInquiry } from '../lib/api'
import { InquiryFormData } from '../types'

const EMPTY_FORM: InquiryFormData = {
  name: '',
  email: '',
  phone: '',
  country: '',
  destinationInterest: '',
  message: '',
}

export default function ContactPage() {
  const [form, setForm] = useState<InquiryFormData>(EMPTY_FORM)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim()) return toast.error('Please enter your full name')
    if (!form.email.includes('@')) return toast.error('Please enter a valid email')
    if (!form.phone.trim()) return toast.error('Please enter your phone number')
    if (!form.destinationInterest) return toast.error('Please select a study destination')

    setLoading(true)
    try {
      await submitInquiry(form)
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
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">
            Let's talk about your future
          </h1>
          <p className="text-white/70 text-lg">
            Submit an inquiry — our Rwanda team will respond within 24 hours.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-14">

          {/* Contact info */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="font-bold text-navy text-lg mb-5">Get in touch</h2>
              <div className="space-y-5">
                <div className="border-t border-gray-200 pt-4">
                  <div className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-1">Email</div>
                  <div className="font-semibold text-navy">info@masomonow.com</div>
                  <div className="text-gray-500 text-sm mt-0.5">Replies within 24 hours</div>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-1">Rwanda Office</div>
                  <div className="font-semibold text-navy">+250 700 000 000</div>
                  <div className="text-gray-500 text-sm mt-0.5">Mon–Fri, 8am–6pm CAT</div>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-1">Location</div>
                  <div className="font-semibold text-navy">Kigali, Rwanda</div>
                  <div className="text-gray-500 text-sm mt-0.5">Also serving DRC & Djibouti</div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-3">Consultation Slots</div>
              <div className="text-sm text-gray-600 leading-relaxed space-y-1">
                <div>Mon / Wed / Fri — 9am to 12pm CAT</div>
                <div>Tue / Thu — 2pm to 5pm CAT</div>
                <div>Saturday — 10am to 1pm CAT</div>
              </div>
              <div className="text-xs text-gray-400 mt-3">CAT = Central Africa Time (Kigali)</div>
            </div>

            <button
              onClick={() => toast.success('Opening WhatsApp...')}
              className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold py-3 rounded-lg transition-colors text-sm"
            >
              Chat on WhatsApp
            </button>
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
                <h3 className="font-serif text-2xl text-navy mb-2">Inquiry received</h3>
                <p className="text-gray-600 mb-6">
                  Thank you, <strong>{form.name}</strong>. A Masomo Now counselor will contact you at <strong>{form.email}</strong> within 24 hours.
                </p>
                <button
                  onClick={() => { setForm(EMPTY_FORM); setSubmitted(false) }}
                  className="btn-primary"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <>
                <h2 className="font-bold text-navy text-lg mb-6">Send an Inquiry</h2>
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
                      <option>Canada — FMC Pilot (French programs)</option>
                      <option>Canada — Regular pathway</option>
                      <option>United Kingdom</option>
                      <option>Australia</option>
                      <option>United States</option>
                      <option>New Zealand</option>
                      <option>Not sure — need guidance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message</label>
                    <textarea
                      name="message"
                      value={form.message}
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
                    {loading ? 'Submitting...' : 'Send Inquiry →'}
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
