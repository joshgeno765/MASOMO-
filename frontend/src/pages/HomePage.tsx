import { Link } from 'react-router-dom'

const testimonials = [
  { name: 'Amara M.', dest: 'BCIT, British Columbia', quote: 'Masomo Now made what seemed impossible feel completely manageable. From my BCIT application to my study permit — every step was guided. I\'m now in Vancouver.' },
  { name: 'Claudette U.', dest: 'Université de Moncton, NB', quote: 'En tant que Rwandaise francophone, le programme pilote FMC était parfait pour moi. L\'équipe de Masomo Now à Kigali m\'a guidée du début à la fin.' },
  { name: 'Jean-Pierre M.', dest: 'Collège Boréal, Ontario', quote: 'I came from DRC and didn\'t think studying in Canada was possible. Masomo Now found the FMC pilot for me — now I\'m studying in French in Ontario.' },
]

const seminarPreview = [
  '/images/seminars/seminar-3.jpg',
  '/images/seminars/seminar-2.jpg',
  '/images/seminars/seminar-5.jpg',
]

export default function HomePage() {
  return (
    <>
      <div className="bg-brand-gold text-navy text-center py-2.5 px-4 text-sm font-semibold">
        Francophone students from Rwanda, DRC & Djibouti may qualify for Canada's FMC Student Pilot —{' '}
        <Link to="/fmc-pilot" className="underline font-bold hover:text-navy/70">Learn more</Link>
      </div>

      {/* Hero — full-bleed photo */}
      <section className="relative overflow-hidden">
        <img
          src="/images/seminars/seminar-3.jpg"
          alt="A Masomo Now / ELIMU seminar with students in Kenya"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/50" />
        <div className="relative max-w-2xl mx-auto md:mx-0 md:ml-[10%] py-24 px-6">
          <h1 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-6">
            Study and work abroad, without guesswork
          </h1>
          <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-xl">
            We guide students from Rwanda, DR Congo, and Djibouti through every step — from choosing the right university to landing on campus.
          </p>
          <Link to="/consultation" className="bg-brand-gold hover:bg-brand-gold-light text-navy font-bold px-6 py-3 rounded-full transition-colors inline-block">Get Free Consultation</Link>
        </div>
      </section>

      {/* Why Masomo Now — RCIC + Francophone/FMC */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <span className="inline-block text-xs font-bold uppercase tracking-wide text-brand-gold bg-brand-gold/10 px-2.5 py-1 rounded-full mb-4">RCIC Licensed</span>
            <h2 className="font-serif text-2xl text-navy mb-3">Licensed visa &amp; study permit support</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our Regulated Canadian Immigration Consultants (RCICs), licensed by the College of Immigration and Citizenship Consultants (CICC), guide you through Canadian study permits — including the FMC pathway — as well as UK and Australian visas.
            </p>
            <a href="https://rcic.link/r731358" target="_blank" rel="noopener noreferrer" className="text-brand-blue text-sm font-bold hover:underline">Verify our RCIC credentials →</a>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <span className="inline-block text-xs font-bold uppercase tracking-wide text-brand-gold bg-brand-gold/10 px-2.5 py-1 rounded-full mb-4">Featured Pathway</span>
            <h2 className="font-serif text-2xl text-navy mb-3">FMC Student Pilot — Canada</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              A dedicated Canadian immigration pathway for francophone students from Rwanda, DR Congo, and Djibouti. Study at French-language institutions across Canada with priority processing and a clear route to permanent residence.
            </p>
            <Link to="/fmc-pilot" className="text-brand-blue text-sm font-bold hover:underline">Learn about the FMC Pilot →</Link>
          </div>
        </div>
      </section>

      {/* Seminars teaser — real photos from the field */}
      <section className="py-20 px-6 bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="grid grid-cols-3 gap-2">
            {seminarPreview.map((src, i) => (
              <img
                key={src}
                src={src}
                alt="Masomo Now / ELIMU seminar with students in Kenya"
                className={`w-full h-40 object-cover rounded-lg ${i === 1 ? 'mt-6' : ''}`}
              />
            ))}
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-3">On the ground</p>
            <h2 className="font-serif text-3xl text-navy mb-4">We show up in person, not just online</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our counselors run in-person seminars in schools and community halls across East Africa — walking students through real pathways abroad face to face, alongside partners like Northern Lights College.
            </p>
            <Link to="/about#seminars" className="text-brand-blue text-sm font-bold hover:underline">See our recent seminars →</Link>
          </div>
        </div>
      </section>

      {/* Recent students */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl text-navy mb-10">Recent students</h2>
          <div className="flex gap-5 overflow-x-auto pb-2">
            {testimonials.map((t) => (
              <div key={t.name} className="flex-shrink-0 w-80 bg-white border border-gray-200 rounded-2xl p-6">
                <p className="text-gray-700 text-sm leading-relaxed italic mb-5">"{t.quote}"</p>
                <div className="font-semibold text-navy text-sm">{t.name}</div>
                <div className="text-gray-400 text-xs mt-0.5">{t.dest}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
