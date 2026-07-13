import PhotoHero from '../components/ui/PhotoHero'
import Button from '../components/ui/Button'
import { OFFICES } from '../data/offices'

export default function ContactPage() {
  return (
    <>
      <PhotoHero
        image="/images/seminars/seminar-2.webp"
        alt="Masomo Now / ELIMU education symposium in Nairobi, Kenya"
        eyebrow="Get in Touch"
        title="Contact Us"
        subtitle="Reach the Masomo Now / ELIMU office nearest you, or book a free consultation with one of our advisors."
        quote="If you think you're too small to create change, you've never spent a night in a tent with a mosquito."
      />

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {OFFICES.map((o) => (
              <div key={o.city} className="border-2 border-navy/10 rounded-xl p-6">
                <div className="text-3xl mb-2">{o.flag}</div>
                <h3 className="font-bold text-navy text-lg">{o.city}</h3>
                <p className="text-sm text-gray-500 mb-4">{o.country}</p>
                <a href={`mailto:${o.email}`} className="block text-sm text-brand-blue hover:underline mb-1 break-all">{o.email}</a>
                <a href={`tel:${o.phone.replace(/[^\d+]/g, '')}`} className="block text-sm text-gray-600 hover:text-navy">{o.phone}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-navy text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl text-white mb-3">Prefer to Talk It Through?</h2>
          <p className="text-white/70 mb-8">Book a free consultation and one of our advisors will call you directly.</p>
          <Button to="/consultation" variant="primary">Book Free Consultation</Button>
        </div>
      </section>
    </>
  )
}
