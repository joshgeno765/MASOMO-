import { useState } from 'react'
import { Link } from 'react-router-dom'

const services = [
  { title: 'Free Consultation & Counseling', desc: 'A one-on-one session with a Rwanda-based counselor to understand your goals, budget, and academic background before recommending a path.' },
  { title: 'University & Program Selection', desc: 'We match you to partner institutions in Ireland, Germany, and Poland — or the Canadian FMC Student Pilot — based on what genuinely fits you.' },
  { title: 'Application Support', desc: 'Help preparing transcripts, statements of purpose, recommendation letters, and every document your chosen institution requires.' },
  { title: 'Visa & Immigration Support', desc: 'Backed by a licensed immigration team (RCIC), we guide you through study permit and visa applications step by step.' },
  { title: 'Pre-Departure Orientation', desc: 'Practical guidance on housing, banking, travel, and what to expect before you leave home.' },
  { title: 'Post-Arrival Settlement', desc: 'We stay with you after arrival — from airport pickup coordination to connecting you with the local student community.' },
]

export default function ServicesPage() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <>
      {/* Hero */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl text-navy mb-5">
            End-to-end support, every step
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed">
            From your first inquiry to settling into life abroad — here's exactly how Masomo Now helps.
          </p>
        </div>
      </section>

      {/* Accordion */}
      <section className="pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-2 border-t border-gray-200 pt-6">How we help</h2>
          <div className="divide-y divide-gray-200">
            {services.map((s, i) => {
              const isOpen = open === i
              return (
                <div key={s.title}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between text-left py-5"
                  >
                    <span className="font-serif text-xl text-navy">{s.title}</span>
                    <span className="text-gray-300 text-xl leading-none flex-shrink-0 ml-4">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <p className="text-gray-500 leading-relaxed pb-6 max-w-lg">{s.desc}</p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 px-6">
        <div className="max-w-2xl mx-auto text-center border-t border-gray-200 pt-14">
          <h2 className="font-serif text-2xl text-navy mb-3">Ready to get started?</h2>
          <p className="text-gray-500 mb-6">Book a free consultation and we'll tell you exactly what your next step should be.</p>
          <Link to="/consultation" className="text-sm font-bold text-navy border-b border-navy pb-0.5">Book Free Consultation →</Link>
        </div>
      </section>
    </>
  )
}
