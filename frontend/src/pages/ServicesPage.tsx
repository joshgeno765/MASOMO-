import { Link } from 'react-router-dom'
import PhotoHero from '../components/ui/PhotoHero'
import IconFeatureRow from '../components/ui/IconFeatureRow'

const services = [
  { icon: '💬', photo: '/images/seminars/seminar-2-thumb.webp', title: 'Free Consultation', description: 'Understand your options with a personalized one-on-one session.' },
  { icon: '🎓', photo: '/images/schools/dcu-thumb.webp', title: 'University Selection', description: 'Find the institution and program that best fits your goals.' },
  { icon: '📄', photo: '/images/seminars/seminar-4-thumb.webp', title: 'Application Support', description: 'Complete your application with confidence.' },
  { icon: '🛂', photo: '/images/schools/vistula-thumb.webp', title: 'Visa Assistance', description: 'Professional guidance through every stage of your study permit application.' },
  { icon: '✈️', photo: '/images/seminars/seminar-5-thumb.webp', title: 'Pre-Departure Support', description: 'Prepare for travel, accommodation, banking, and student life.' },
  { icon: '🏠', photo: '/images/schools/bcit-thumb.webp', title: 'Arrival Support', description: 'Helping you settle into your new country successfully.' },
]

const process = [
  { num: '1', title: 'Consultation' },
  { num: '2', title: 'Choose a School' },
  { num: '3', title: 'Submit Applications' },
  { num: '4', title: 'Receive Admission' },
  { num: '5', title: 'Apply for Visa' },
  { num: '6', title: 'Travel' },
  { num: '7', title: 'Arrive' },
]

const faqs = [
  { q: 'Do I need IELTS?', a: 'It depends on the institution — most accept IELTS, TOEFL, PTE, or Duolingo, and several of our partner schools also offer in-house English preparation programs if you don\'t have a qualifying score yet.' },
  { q: 'Can I transfer universities?', a: 'Yes — several of our partner institutions offer University Transfer (UT) programs that let you complete initial credits before transferring into a full degree.' },
  { q: 'How long does the process take?', a: 'Timelines vary by destination and season, but most students move from first consultation to a study permit decision within 3 to 6 months. We\'ll give you a realistic timeline for your chosen program during your consultation.' },
]

export default function ServicesPage() {
  return (
    <>
      <PhotoHero
        image="/images/seminars/seminar-1.webp"
        alt="A Masomo Now counselor following up with a student after a seminar"
        eyebrow="Services"
        title="End-to-end support, every step"
        subtitle="From your first inquiry to settling into life abroad — here's exactly how Masomo Now helps."
        quote="The worst thing that can happen to you is not failing to fulfill your dreams — the worst is not dreaming at all."
      />

      <IconFeatureRow title="What we help with" columns={3} features={services} />

      {/* Our Process */}
      <section className="py-16 px-6 bg-gray-50 border-y border-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl text-navy mb-10">Our Process</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-6">
            {process.map((p) => (
              <div key={p.num} className="border-t-2 border-brand-gold pt-4">
                <div className="text-brand-gold-dark font-bold text-sm mb-2">{p.num}</div>
                <div className="font-semibold text-navy text-sm">{p.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl text-navy mb-8">Frequently Asked Questions</h2>
          <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
            {faqs.map((f, i) => (
              <details key={f.q} open={i === 0} className="py-5 group">
                <summary className="flex items-center justify-between font-bold text-navy cursor-pointer">
                  {f.q}
                  <svg className="chev w-5 h-5 text-brand-gold transition-transform flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                  </svg>
                </summary>
                <p className="text-gray-600 mt-3 text-[15px] leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 pt-8 px-6">
        <div className="max-w-2xl mx-auto text-center border-t border-gray-200 pt-14">
          <h2 className="font-serif text-2xl text-navy mb-3">Ready to get started?</h2>
          <p className="text-gray-500 mb-6">Book a free consultation and we'll tell you exactly what your next step should be.</p>
          <Link to="/consultation" className="text-sm font-bold text-navy border-b border-navy pb-0.5">Book Free Consultation →</Link>
        </div>
      </section>
    </>
  )
}
