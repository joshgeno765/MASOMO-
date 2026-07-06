import { useState } from 'react'
import { Link } from 'react-router-dom'

const universities = [
  { flag: '🇮🇪', country: 'Ireland', name: 'DCU — Dublin City University', type: 'Public Research University', city: 'Dublin', photo: '/images/stock/ireland-campus.jpg',
    desc: 'One of Ireland\'s leading research universities, with strong ties to Dublin\'s tech and business sector.' },
  { flag: '🇮🇪', country: 'Ireland', name: 'Griffith College', type: 'Private College', city: 'Dublin', photo: '/images/stock/ireland-campus.jpg',
    desc: 'A private third-level college known for flexible programs in business, law, and computing.' },
  { flag: '🇩🇪', country: 'Germany', name: 'CBS — University of Applied Sciences', type: 'Private University of Applied Sciences', city: 'Cologne', photo: '/images/stock/germany-campus.jpg',
    desc: 'Business-focused university of applied sciences offering fully English-taught programs.' },
  { flag: '🇩🇪', country: 'Germany', name: 'BSBI — Berlin School of Business & Innovation', type: 'Private Institution', city: 'Berlin', photo: '/images/stock/germany-campus.jpg',
    desc: 'International student body with programs designed around Berlin\'s startup and innovation economy.' },
  { flag: '🇩🇪', country: 'Germany', name: 'Gisma University of Applied Sciences', type: 'Private University of Applied Sciences', city: 'Berlin / Potsdam', photo: '/images/stock/germany-campus.jpg',
    desc: 'Career-focused business and management degrees taught entirely in English.' },
  { flag: '🇵🇱', country: 'Poland', name: 'Vistula University', type: 'Private University', city: 'Warsaw', photo: '/images/stock/poland-campus.jpg',
    desc: 'One of Poland\'s most internationally active institutions, with a strong track record enrolling African students.' },
]

function FlipCard({ u }: { u: typeof universities[number] }) {
  const [revealed, setRevealed] = useState(false)
  return (
    <button
      onClick={() => setRevealed((r) => !r)}
      className="group relative w-full aspect-[4/3] border-2 border-navy rounded-xl overflow-hidden text-left hover:border-brand-gold transition-colors md:[perspective:1000px]"
    >
      {/* Front */}
      <div className={`absolute inset-0 transition-opacity duration-200 md:group-hover:opacity-0 ${revealed ? 'opacity-0' : 'opacity-100'}`}>
        <img src={u.photo} alt={`${u.city}, ${u.country}`} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/20" />
        <div className="relative h-full flex flex-col items-center justify-center gap-3 p-6">
          <span className="text-5xl">{u.flag}</span>
          <h3 className="font-serif text-lg text-white text-center">{u.name}</h3>
          <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">{u.country}</span>
          <span className="text-[11px] text-white/60 md:hidden mt-2">Tap for details</span>
        </div>
      </div>
      {/* Back */}
      <div className={`absolute inset-0 bg-brand-gold p-6 flex flex-col justify-center transition-opacity duration-200 md:opacity-0 md:group-hover:opacity-100 ${revealed ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-xs font-bold uppercase tracking-wide text-navy/60 mb-1">{u.type} · {u.city}</div>
        <p className="text-sm text-navy leading-relaxed font-medium">{u.desc}</p>
      </div>
    </button>
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
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {universities.map((u) => (<FlipCard key={u.name} u={u} />))}
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
