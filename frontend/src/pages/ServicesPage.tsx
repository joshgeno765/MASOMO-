import { Link } from 'react-router-dom'

const services = [
  {
    num: '1',
    title: 'Free Consultation & Counseling',
    desc: 'A one-on-one session with a Rwanda-based counselor to understand your goals, budget, and academic background before recommending a path.',
  },
  {
    num: '2',
    title: 'University & Program Selection',
    desc: 'We match you to partner institutions in Ireland, Germany, and Poland — or the Canadian FMC Student Pilot — based on what genuinely fits you.',
  },
  {
    num: '3',
    title: 'Application Support',
    desc: 'Help preparing transcripts, statements of purpose, recommendation letters, and every document your chosen institution requires.',
  },
  {
    num: '4',
    title: 'Visa & Immigration Support',
    desc: 'Backed by a licensed immigration team (RCIC), we guide you through study permit and visa applications step by step.',
  },
  {
    num: '5',
    title: 'Pre-Departure Orientation',
    desc: 'Practical guidance on housing, banking, travel, and what to expect before you leave home.',
  },
  {
    num: '6',
    title: 'Post-Arrival Settlement',
    desc: 'We stay with you after arrival — from airport pickup coordination to connecting you with the local student community.',
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4 max-w-xl">
            End-to-end support, every step
          </h1>
          <p className="text-white/70 text-lg max-w-xl">
            From your first inquiry to settling into life abroad — here's exactly how Masomo Now helps.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
          {services.map((s) => (
            <div key={s.num} className="border-t border-gray-200 pt-5">
              <div className="text-brand-gold font-bold text-sm mb-3">Step {s.num}</div>
              <h3 className="font-bold text-navy text-lg mb-2">{s.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-navy">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl text-white mb-3">Ready to get started?</h2>
          <p className="text-white/70 mb-8">Book a free consultation and we'll tell you exactly what your next step should be.</p>
          <Link to="/consultation" className="btn-primary">Book Free Consultation</Link>
        </div>
      </section>
    </>
  )
}
