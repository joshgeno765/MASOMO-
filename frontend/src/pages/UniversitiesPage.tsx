import { useState } from 'react'
import { Link } from 'react-router-dom'

interface School {
  flag: string
  country: string
  name: string
  type: string
  city: string
  photo: string | null
  website: string
  facts: string[]
}

const schools: School[] = [
  {
    flag: '🇮🇪', country: 'Ireland', name: 'DCU — Dublin City University', type: 'Public Research University', city: 'Dublin',
    photo: '/images/schools/dcu.jpg', website: 'https://www.dcu.ie',
    facts: ['20,000+ students, incl. 3,800+ international from 90+ countries', '96% graduate employment rate — #1 in Ireland', 'Five faculties: Business, Engineering & Computing, Science & Health, Humanities, Education'],
  },
  {
    flag: '🇮🇪', country: 'Ireland', name: 'Griffith College', type: 'Private College', city: 'Dublin',
    photo: '/images/schools/griffith.jpg', website: 'https://www.griffith.ie',
    facts: ["Ireland's largest independent third-level college, founded 1974", '~8,000 students, incl. 1,400+ from 77+ countries', 'Business, law, journalism, computing & design programs'],
  },
  {
    flag: '🇩🇪', country: 'Germany', name: 'CBS International Business School', type: 'Private University of Applied Sciences', city: 'Cologne',
    photo: '/images/schools/cbs.jpg', website: 'https://www.cbs.de/en',
    facts: ['Founded 1993, part of the Klett Group', 'First German university with IACBE accreditation', '~3,000 students from 75+ nations, 130+ partner universities'],
  },
  {
    flag: '🇩🇪', country: 'Germany', name: 'BSBI — Berlin School of Business & Innovation', type: 'Private Institution', city: 'Berlin',
    photo: '/images/schools/bsbi.jpg', website: 'https://www.berlinsbi.com',
    facts: ['Campuses in Berlin, Hamburg, Paris & Barcelona', 'Recognised UN PRME Champion 2024–25', 'English-taught, entrepreneurship-focused business programs'],
  },
  {
    flag: '🇩🇪', country: 'Germany', name: 'Gisma University of Applied Sciences', type: 'Private University of Applied Sciences', city: 'Berlin / Potsdam',
    photo: null, website: 'https://www.gisma.com',
    facts: ['Founded 1999; campuses in Potsdam & Berlin', 'Rare triple accreditation: AMBA, BGA and CIM', 'Double-degree option with Kingston University London'],
  },
  {
    flag: '🇵🇱', country: 'Poland', name: 'Vistula University', type: 'Private University', city: 'Warsaw',
    photo: '/images/schools/vistula.jpg', website: 'https://vistula.edu.pl/en',
    facts: ['Founded 1991, campus in Ursynów, Warsaw', '12,000+ students from 100+ nationalities', 'ACCA, CIMA & CEEMAN accredited programs'],
  },
  {
    flag: '🇺🇸', country: 'United States', name: 'Lake Washington Institute of Technology', type: 'Public Technical College', city: 'Kirkland, WA',
    photo: '/images/schools/lwtech.jpg', website: 'https://www.lwtech.edu',
    facts: ['15 miles from downtown Seattle, on Lake Washington', '100+ degrees & certificates across 44 fields', 'STEM-designated programs qualify for extended OPT'],
  },
  {
    flag: '🇺🇸', country: 'United States', name: 'Seattle Colleges', type: 'Public Community College District', city: 'Seattle, WA',
    photo: '/images/schools/seattle-colleges.jpg', website: 'https://www.seattlecolleges.edu',
    facts: ["Washington State's largest community college district", 'North, Central & South Seattle Colleges — 1,000+ intl. students/year', 'All 3 colleges ranked Top 40 "Leading Associate\'s Institutions"'],
  },
]

function FlipCard({ s }: { s: School }) {
  const [revealed, setRevealed] = useState(false)
  return (
    <div className="group relative w-full aspect-[4/3] border-2 border-navy rounded-xl overflow-hidden hover:border-brand-gold transition-colors md:[perspective:1000px]">
      {/* Front */}
      <button
        onClick={() => setRevealed(true)}
        className={`absolute inset-0 w-full text-left transition-opacity duration-200 md:opacity-100 md:pointer-events-auto md:group-hover:opacity-0 md:group-hover:pointer-events-none ${revealed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        {s.photo ? (
          <>
            <img src={s.photo} alt={`${s.name}, ${s.city}`} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/20" />
          </>
        ) : (
          <div className="absolute inset-0 bg-navy" />
        )}
        <div className="relative h-full flex flex-col items-center justify-center gap-3 p-6">
          <span className="text-5xl">{s.flag}</span>
          <h3 className="font-serif text-lg text-white text-center">{s.name}</h3>
          <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">{s.country}</span>
          <span className="text-[11px] text-white/60 md:hidden mt-2">Tap for details</span>
        </div>
      </button>
      {/* Back */}
      <div className={`absolute inset-0 bg-brand-gold p-5 flex flex-col justify-center transition-opacity duration-200 md:opacity-0 md:pointer-events-none md:group-hover:opacity-100 md:group-hover:pointer-events-auto ${revealed ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <button onClick={() => setRevealed(false)} className="absolute top-2 right-3 text-navy/50 hover:text-navy md:hidden text-lg leading-none">✕</button>
        <div className="text-xs font-bold uppercase tracking-wide text-navy/60 mb-2">{s.type} · {s.city}</div>
        <ul className="space-y-1 mb-3">
          {s.facts.map((f) => (
            <li key={f} className="text-xs text-navy leading-snug flex gap-1.5">
              <span className="font-bold flex-shrink-0">—</span>{f}
            </li>
          ))}
        </ul>
        <a
          href={s.website}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-xs font-bold text-navy border-b border-navy w-fit hover:border-b-2"
        >
          Visit official website ↗
        </a>
      </div>
    </div>
  )
}

export default function UniversitiesPage() {
  return (
    <>
      {/* Hero — full-bleed photo */}
      <section className="relative overflow-hidden">
        <img src="/images/stock/ireland-campus.jpg" alt="Trinity College, Dublin" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-navy/85" />
        <div className="relative max-w-4xl mx-auto text-center py-24 px-6">
          <h1 className="font-serif text-5xl md:text-6xl text-white leading-tight mb-6">
            Our <span className="text-brand-gold">partner</span> universities
          </h1>
          <p className="text-white/80 text-xl max-w-xl mx-auto">
            Institutions we work with directly to place students from Rwanda, DR Congo, and Djibouti.
          </p>
        </div>
      </section>

      {/* Flip card grid */}
      <section className="py-16 px-6 bg-brand-gold-light/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schools.map((s) => (<FlipCard key={s.name} s={s} />))}
          </div>
          <p className="text-xs text-gray-400 mt-8 text-center">
            Campus photography courtesy of Wikimedia Commons contributors (CC BY-SA / public domain).
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-navy">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-4xl text-white mb-4">Not sure which university fits you?</h2>
          <p className="text-white/70 text-lg mb-8">Our Rwanda-based counselors will match you to a program based on your grades, budget, and goals.</p>
          <Link to="/consultation" className="inline-block bg-brand-gold hover:bg-brand-gold-light text-navy font-extrabold px-8 py-4 rounded-lg transition-colors text-lg">
            Book Free Consultation
          </Link>
        </div>
      </section>
    </>
  )
}
