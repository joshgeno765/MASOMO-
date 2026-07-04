import { Link } from 'react-router-dom'

const universities = [
  {
    flag: '🇮🇪',
    country: 'Ireland',
    name: 'DCU — Dublin City University',
    type: 'Public Research University',
    city: 'Dublin',
    desc: 'One of Ireland\'s leading research universities, with strong ties to Dublin\'s tech and business sector.',
  },
  {
    flag: '🇮🇪',
    country: 'Ireland',
    name: 'Griffith College',
    type: 'Private College',
    city: 'Dublin',
    desc: 'A private third-level college known for flexible programs in business, law, and computing.',
  },
  {
    flag: '🇩🇪',
    country: 'Germany',
    name: 'CBS — University of Applied Sciences',
    type: 'Private University of Applied Sciences',
    city: 'Cologne',
    desc: 'Business-focused university of applied sciences offering fully English-taught programs.',
  },
  {
    flag: '🇩🇪',
    country: 'Germany',
    name: 'BSBI — Berlin School of Business & Innovation',
    type: 'Private Institution',
    city: 'Berlin',
    desc: 'International student body with programs designed around Berlin\'s startup and innovation economy.',
  },
  {
    flag: '🇩🇪',
    country: 'Germany',
    name: 'Gisma University of Applied Sciences',
    type: 'Private University of Applied Sciences',
    city: 'Berlin / Potsdam',
    desc: 'Career-focused business and management degrees taught entirely in English.',
  },
  {
    flag: '🇵🇱',
    country: 'Poland',
    name: 'Vistula University',
    type: 'Private University',
    city: 'Warsaw',
    desc: 'One of Poland\'s most internationally active institutions, with a strong track record enrolling African students.',
  },
]

export default function UniversitiesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4 max-w-xl">
            Our partner universities
          </h1>
          <p className="text-white/70 text-lg max-w-xl">
            Institutions we work with directly to place students from Rwanda, DR Congo, and Djibouti.
          </p>
        </div>
      </section>

      {/* Universities grid */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {universities.map((u) => (
            <div key={u.name} className="border-t-2 border-brand-gold pt-5">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{u.flag}</span>
                <span className="text-xs font-bold uppercase tracking-wide text-gray-400">{u.country}</span>
              </div>
              <h3 className="font-serif text-lg text-navy mb-1">{u.name}</h3>
              <div className="text-xs text-gray-400 mb-3">{u.type} · {u.city}</div>
              <p className="text-sm text-gray-600 leading-relaxed">{u.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-navy">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl text-white mb-3">Not sure which university fits you?</h2>
          <p className="text-white/70 mb-8">Our Rwanda-based counselors will match you to a program based on your grades, budget, and goals.</p>
          <Link to="/consultation" className="btn-primary">Book Free Consultation</Link>
        </div>
      </section>
    </>
  )
}
