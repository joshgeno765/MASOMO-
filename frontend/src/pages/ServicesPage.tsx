import { Link } from 'react-router-dom'
import PhotoHero from '../components/ui/PhotoHero'
import IconFeatureRow from '../components/ui/IconFeatureRow'

const services = [
  { icon: '🗣️', photo: '/images/seminars/seminar-2-thumb.webp', title: 'Free Consultation & Counseling', description: 'A one-on-one session with a Rwanda-based counselor to understand your goals, budget, and academic background before recommending a path.' },
  { icon: '🎓', photo: '/images/schools/dcu-thumb.webp', title: 'University & Program Selection', description: 'We match you to partner institutions in Ireland, Germany, and Poland — or the Canadian FMC Student Pilot — based on what genuinely fits you.' },
  { icon: '📄', photo: '/images/seminars/seminar-4-thumb.webp', title: 'Application Support', description: 'Help preparing transcripts, statements of purpose, recommendation letters, and every document your chosen institution requires.' },
  { icon: '🛂', photo: '/images/schools/vistula-thumb.webp', title: 'Visa & Immigration Support', description: 'Backed by a licensed immigration team (RCIC), we guide you through study permit and visa applications step by step.' },
  { icon: '🧳', photo: '/images/seminars/seminar-5-thumb.webp', title: 'Pre-Departure Orientation', description: 'Practical guidance on housing, banking, travel, and what to expect before you leave home.' },
  { icon: '🏡', photo: '/images/schools/bcit-thumb.webp', title: 'Post-Arrival Settlement', description: 'We stay with you after arrival — from airport pickup coordination to connecting you with the local student community.' },
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
      />

      <IconFeatureRow title="What we help with" columns={3} features={services} />

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
