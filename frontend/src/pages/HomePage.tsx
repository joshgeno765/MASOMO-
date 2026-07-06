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
  { flag: '🇨🇦', name: 'Canada', detail: 'FMC Pilot pathway', fmc: true, to: '/fmc-pilot' },
  { flag: '🇮🇪', name: 'Ireland', detail: 'DCU · Griffith College', fmc: false, to: '/destinations' },
  { flag: '🇩🇪', name: 'Germany', detail: 'CBS · BSBI · Gisma', fmc: false, to: '/destinations' },
  { flag: '🇵🇱', name: 'Poland', detail: 'Vistula University', fmc: false, to: '/destinations' },
]

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

      {/* Hero — full-bleed photo, split content */}
      <section className="relative overflow-hidden">
        <img
          src="/images/stock/students-group.jpg"
          alt="Students collaborating on their study-abroad applications"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/40" />
        <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center py-24 px-6">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-6">
              Study and work abroad, without guesswork
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-xl">
              We guide students from Rwanda, DR Congo, and Djibouti through every step — from choosing the right university to landing on campus in Ireland, Germany, Poland, or Canada.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link to="/consultation" className="bg-brand-gold hover:bg-brand-gold-light text-navy font-bold px-6 py-3 rounded-full transition-colors">Get Free Consultation</Link>
              <Link to="/fmc-pilot" className="border border-white/30 text-white font-bold px-6 py-3 rounded-full hover:bg-white/10 transition-colors">FMC Pilot Program</Link>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 justify-start md:justify-end">
            {destinations.map((d) => (
              <Link key={d.name} to={d.to} className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-full px-4 py-2 text-sm text-white flex items-center gap-2 transition-colors backdrop-blur-sm">
                <span>{d.flag}</span>{d.name}
                {d.fmc && <span className="text-brand-gold text-xs font-bold">FMC</span>}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services — alternating rows */}
      <section>
        {services.map((s, i) => {
          const isRCIC = s.title === 'Visa & Study Permit'
          return (
            <div key={s.title} className={`px-6 py-10 ${i % 2 === 1 ? 'bg-gray-50' : 'bg-white'}`}>
              <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center gap-4 md:gap-10">
                <div className="md:w-56 flex-shrink-0">
                  {isRCIC && <span className="inline-block text-xs font-bold uppercase tracking-wide text-brand-gold bg-brand-gold/10 px-2.5 py-1 rounded-full mb-1">RCIC Licensed</span>}
                  <h3 className="font-serif text-xl text-navy">{s.title}</h3>
                </div>
                <div className="flex-1">
                  <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
                  {'link' in s && (
                    <a href={s.link} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-brand-blue text-xs font-bold hover:underline">{s.linkLabel}</a>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </section>

      {/* FMC Spotlight */}
      <section className="py-16 px-6 bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="border-l-4 border-brand-gold pl-6 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-3">Featured Pathway</p>
            <h2 className="font-serif text-2xl text-navy mb-3">FMC Student Pilot — Canada</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-5">
              A dedicated Canadian immigration pathway for francophone students from Rwanda, DR Congo, and Djibouti. Study at French-language institutions across Canada with priority processing and a clear route to permanent residence.
            </p>
            <Link to="/fmc-pilot" className="text-brand-blue text-sm font-bold hover:underline">Learn about the FMC Pilot →</Link>
          </div>
        </div>
      </section>

      {/* Seminars teaser — real photos from the field */}
      <section className="py-20 px-6">
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
              Our counselors run in-person seminars in schools and community halls across East Africa — walking students through real pathways to Canada, Ireland, Germany, and Poland face to face, alongside partners like Northern Lights College.
            </p>
            <Link to="/about#seminars" className="text-brand-blue text-sm font-bold hover:underline">See our recent seminars →</Link>
          </div>
        </div>
      </section>

      {/* Testimonials — horizontal scroll cards */}
      <section className="py-20 px-6 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl text-navy mb-10">From our students</h2>
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

      {/* CTA — full-bleed photo */}
      <section className="relative overflow-hidden py-20 px-6">
        <img src="/images/stock/graduation.jpg" alt="Graduates celebrating" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-navy/85" />
        <div className="relative max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl text-white mb-3">Ready to start?</h2>
          <p className="text-white/70 mb-8 text-base">Book a free 30-minute consultation with one of our Rwanda-based counselors.</p>
          <Link to="/consultation" className="bg-brand-gold hover:bg-brand-gold-light text-navy font-bold px-8 py-3.5 rounded-full transition-colors inline-block">Book Free Consultation</Link>
        </div>
      </section>
    </>
  )
}
