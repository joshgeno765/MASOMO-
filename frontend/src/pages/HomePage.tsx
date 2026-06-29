import { Link } from 'react-router-dom'

const services = [
  { title: 'University Selection', desc: 'We match you with institutions that fit your academic background, career goals, and budget — including FMC-eligible French-language schools in Canada.' },
  { title: 'Application Management', desc: 'We prepare, review, and submit your applications — tracking every status update until you have an offer letter.' },
  {
    title: 'Visa & Study Permit',
    desc: 'Our Regulated Canadian Immigration Consultants (RCICs), licensed by the College of Immigration and Citizenship Consultants (CICC), guide you through Canadian study permits — including the FMC pathway — as well as UK and Australian visas.',
    link: 'https://rcic.link/r731358',
    linkLabel: 'Verify our RCIC credentials →',
  },
  { title: 'SOP & Essay Writing', desc: 'Strong personal statements get admissions. We help you craft compelling essays that reflect your authentic story — in French or English.' },
  { title: 'Pre-Departure Support', desc: 'Accommodation, insurance, flights, and orientation — we prepare you for day one so landing abroad isn\'t a shock.' },
  { title: 'Post-Arrival Support', desc: 'Settling in, opening a bank account, finding part-time work — we stay with you after you land.' },
]

const destinations = [
  { flag: '🇨🇦', name: 'Canada', unis: '120+ universities', fmc: true, to: '/fmc-pilot' },
  { flag: '🇬🇧', name: 'United Kingdom', unis: '130+ universities', fmc: false, to: '/destinations' },
  { flag: '🇦🇺', name: 'Australia', unis: '40+ universities', fmc: false, to: '/destinations' },
  { flag: '🇺🇸', name: 'United States', unis: '4,000+ institutions', fmc: false, to: '/destinations' },
  { flag: '🇳🇿', name: 'New Zealand', unis: '8 universities', fmc: false, to: '/destinations' },
]

const testimonials = [
  { name: 'Amara M.', dest: 'BCIT, British Columbia', quote: 'Masomo Now made what seemed impossible feel completely manageable. From my BCIT application to my study permit — every step was guided. I\'m now in Vancouver.' },
  { name: 'Claudette U.', dest: 'Université de Moncton, NB', quote: 'En tant que Rwandaise francophone, le programme pilote FMC était parfait pour moi. L\'équipe de Masomo Now à Kigali m\'a guidée du début à la fin.' },
  { name: 'Jean-Pierre M.', dest: 'Collège Boréal, Ontario', quote: 'I came from DRC and didn\'t think studying in Canada was possible. Masomo Now found the FMC pilot for me — now I\'m studying in French in Ontario.' },
]

export default function HomePage() {
  return (
    <>
      {/* FMC banner */}
      <div className="bg-brand-gold text-navy text-center py-2.5 px-4 text-sm font-semibold">
        Francophone students from Rwanda, DRC & Djibouti may qualify for Canada's FMC Student Pilot —{' '}
        <Link to="/fmc-pilot" className="underline font-bold hover:text-navy/70">Learn more</Link>
      </div>

      {/* Hero */}
      <section className="bg-navy py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6 max-w-2xl">
            Study and work<br />
            abroad, without the guesswork
          </h1>
          <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-xl">
            We guide students from Rwanda, DR Congo, and Djibouti through every step — from choosing the right university to landing on campus in Canada, UK, Australia and beyond.
          </p>
          <div className="flex gap-3 flex-wrap">
            <Link to="/contact" className="btn-primary">Get Free Consultation</Link>
            <Link to="/fmc-pilot" className="btn-outline">FMC Pilot Program</Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl text-navy mb-12">How we help you get there</h2>
          <div className="grid md:grid-cols-3 gap-x-10 gap-y-8">
            {services.map((s) => (
              <div key={s.title} className="border-t border-gray-200 pt-5">
                <h3 className="font-bold text-navy mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
                {'link' in s && (
                  <a
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-brand-blue text-xs font-bold hover:underline"
                  >
                    {s.linkLabel}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FMC Spotlight */}
      <section className="py-16 px-6 bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="border-l-4 border-brand-gold pl-6 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-3">Featured Pathway</p>
            <h2 className="font-serif text-2xl text-navy mb-3">
              FMC Student Pilot — Canada
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-5">
              A dedicated Canadian immigration pathway for francophone students from Rwanda, DR Congo, and Djibouti. Study at French-language institutions across Canada with priority processing and a clear route to permanent residence.
            </p>
            <Link to="/fmc-pilot" className="text-brand-blue text-sm font-bold hover:underline">
              Learn about the FMC Pilot →
            </Link>
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl text-navy mb-10">Where we send students</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {destinations.map((d) => (
              <Link
                key={d.name}
                to={d.to}
                className="border border-gray-200 rounded-lg p-4 hover:border-navy transition-colors"
              >
                <div className="text-3xl mb-2">{d.flag}</div>
                <div className="font-semibold text-navy text-sm">{d.name}</div>
                <div className="text-gray-400 text-xs mt-0.5">{d.unis}</div>
                {d.fmc && <div className="text-xs text-brand-gold font-bold mt-1.5">FMC eligible</div>}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl text-navy mb-12">From our students</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {testimonials.map((t) => (
              <div key={t.name}>
                <p className="text-gray-700 text-sm leading-relaxed italic mb-5">"{t.quote}"</p>
                <div className="font-semibold text-navy text-sm">{t.name}</div>
                <div className="text-gray-400 text-xs mt-0.5">{t.dest}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-navy">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl text-white mb-3">Ready to start?</h2>
          <p className="text-white/70 mb-8 text-base">
            Book a free 30-minute consultation with one of our Rwanda-based counselors.
          </p>
          <Link to="/contact" className="btn-primary">Book Free Consultation</Link>
        </div>
      </section>
    </>
  )
}
