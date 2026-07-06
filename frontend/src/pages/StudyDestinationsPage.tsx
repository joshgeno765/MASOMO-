import { Link } from 'react-router-dom'

interface School {
  name: string
  type: string
  city: string
  photo: string | null
  website: string
}

const destinations = [
  {
    flag: '🇮🇪',
    name: 'Ireland',
    tagline: 'English-speaking gateway to the European Union',
    facts: [
      { label: 'Partner Schools', value: '2' },
      { label: 'Post-Study Work', value: '2 years (Stamp 1G)' },
      { label: 'Language', value: 'English' },
      { label: 'Location', value: 'Dublin' },
    ],
    schools: [
      { name: 'DCU — Dublin City University', type: 'Public Research University', city: 'Dublin', photo: '/images/schools/dcu.jpg', website: 'https://www.dcu.ie' },
      { name: 'Griffith College', type: 'Private College', city: 'Dublin', photo: '/images/schools/griffith.jpg', website: 'https://www.griffith.ie' },
    ] as School[],
    desc: 'Ireland is one of the only English-speaking countries in the EU, making it a strategic choice for African students seeking a globally recognised degree with access to European job markets. Dublin is home to the European headquarters of Google, Meta, and Apple.',
    pros: ['English-language EU country', '2-year post-study work permit (Stamp 1G)', 'Access to European job market', 'World-class tech and business sector', 'Welcoming to international students'],
    link: '/consultation',
    linkLabel: 'Enquire About Ireland →',
  },
  {
    flag: '🇩🇪',
    name: 'Germany',
    tagline: "Europe's largest economy — English programs available",
    facts: [
      { label: 'Partner Schools', value: '3' },
      { label: 'Post-Study Work', value: '18 months (Job Seeker Visa)' },
      { label: 'Language', value: 'English programs available' },
      { label: 'Location', value: 'Berlin & other cities' },
    ],
    schools: [
      { name: 'CBS International Business School', type: 'Private University of Applied Sciences', city: 'Cologne', photo: '/images/schools/cbs.jpg', website: 'https://www.cbs.de/en' },
      { name: 'BSBI — Berlin School of Business & Innovation', type: 'Private Institution', city: 'Berlin', photo: '/images/schools/bsbi.jpg', website: 'https://www.berlinsbi.com' },
      { name: 'Gisma University of Applied Sciences', type: 'Private University of Applied Sciences', city: 'Berlin / Potsdam', photo: null, website: 'https://www.gisma.com' },
    ] as School[],
    desc: 'Germany is Europe\'s strongest economy and a top destination for international students. Our three partner institutions offer fully English-taught business and management programs, making Germany accessible without needing to learn German first.',
    pros: ['3 partner institutions in major cities', '18-month job seeker visa after graduation', 'Strong engineering & business job market', 'English-taught programs available', 'Central EU location'],
    link: '/consultation',
    linkLabel: 'Enquire About Germany →',
  },
  {
    flag: '🇵🇱',
    name: 'Poland',
    tagline: 'Affordable European education in Warsaw',
    facts: [
      { label: 'Partner Schools', value: '1' },
      { label: 'Post-Study Work', value: '1 year' },
      { label: 'Language', value: 'English programs available' },
      { label: 'Location', value: 'Warsaw' },
    ],
    schools: [
      { name: 'Vistula University', type: 'Private University', city: 'Warsaw', photo: '/images/schools/vistula.jpg', website: 'https://vistula.edu.pl/en' },
    ] as School[],
    desc: 'Poland offers EU-recognised degrees at significantly lower tuition fees and living costs than Western Europe. Vistula University in Warsaw is one of Poland\'s most internationally active institutions, with a strong track record of enrolling students from Africa.',
    pros: ['Among the most affordable EU tuitions', 'Lower cost of living vs. Western Europe', 'EU-recognised degrees', 'English-taught programs', 'Growing economy and job market'],
    link: '/consultation',
    linkLabel: 'Enquire About Poland →',
  },
  {
    flag: '🇺🇸',
    name: 'United States',
    tagline: 'A community-college pathway into the Seattle tech corridor',
    facts: [
      { label: 'Partner Schools', value: '2' },
      { label: 'Post-Study Work', value: 'OPT — 12 months (+24 for STEM)' },
      { label: 'Language', value: 'English' },
      { label: 'Location', value: 'Kirkland & Seattle, WA' },
    ],
    schools: [
      { name: 'Lake Washington Institute of Technology', type: 'Public Technical College', city: 'Kirkland, WA', photo: '/images/schools/lwtech.jpg', website: 'https://www.lwtech.edu' },
      { name: 'Seattle Colleges', type: 'Public Community College District', city: 'Seattle, WA', photo: '/images/schools/seattle-colleges.jpg', website: 'https://www.seattlecolleges.edu' },
    ] as School[],
    desc: 'Our two Washington State partners sit minutes from downtown Seattle — home to Amazon, Microsoft, and one of the world\'s busiest tech job markets. Both offer accredited two-year degrees and certificates, with clear transfer pathways into four-year bachelor\'s programs, at a fraction of the cost of direct university enrollment.',
    pros: ['Direct pathway into the Seattle tech corridor', 'Lower tuition than direct 4-year enrollment', 'Clear transfer pathways to bachelor\'s degrees', 'OPT work authorization after graduation', 'No TOEFL/IELTS required at LWTech (free placement test)'],
    link: '/consultation',
    linkLabel: 'Enquire About the United States →',
  },
]

function SchoolCard({ s }: { s: School }) {
  return (
    <div className="relative h-40 rounded-lg overflow-hidden border border-gray-200">
      {s.photo ? (
        <>
          <img src={s.photo} alt={`${s.name}, ${s.city}`} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/40 to-transparent" />
        </>
      ) : (
        <div className="absolute inset-0 bg-navy" />
      )}
      <div className="relative h-full flex flex-col justify-end p-3">
        <div className="font-semibold text-white text-sm leading-tight">{s.name}</div>
        <div className="text-[11px] text-white/60 mb-1.5">{s.type} · {s.city}</div>
        <a
          href={s.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] font-bold text-brand-gold-light w-fit border-b border-brand-gold-light/50 hover:border-brand-gold-light"
        >
          Visit official website ↗
        </a>
      </div>
    </div>
  )
}

export default function StudyDestinationsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4 max-w-xl">
            Where will you study abroad?
          </h1>
          <p className="text-white/70 text-lg max-w-xl">
            We work with students from Rwanda, DR Congo, and Djibouti to secure admission at top institutions across five countries.
          </p>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto space-y-0 divide-y divide-gray-200">
          {destinations.map((d) => (
            <div key={d.name} className="py-12">
              {/* Header */}
              <div className="flex items-start gap-5 mb-8">
                <span className="text-4xl">{d.flag}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="font-serif text-2xl text-navy">{d.name}</h2>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">{d.tagline}</p>
                </div>
                <Link
                  to={d.link}
                  className="hidden md:inline-flex text-sm font-bold text-brand-blue hover:underline"
                >
                  {d.linkLabel}
                </Link>
              </div>

              {/* Partner school photo cards */}
              <div className={`grid gap-4 mb-10 ${d.schools.length >= 3 ? 'md:grid-cols-3' : d.schools.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-1 max-w-sm'}`}>
                {d.schools.map((s) => (<SchoolCard key={s.name} s={s} />))}
              </div>

              {/* Body */}
              <div className="grid md:grid-cols-3 gap-10">
                {/* Key facts */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Key Facts</h3>
                  <div className="space-y-2.5">
                    {d.facts.map((f) => (
                      <div key={f.label} className="flex justify-between gap-4 border-b border-gray-100 pb-2.5">
                        <span className="text-sm text-gray-500">{f.label}</span>
                        <span className="text-sm font-semibold text-navy text-right">{f.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Overview</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{d.desc}</p>
                </div>

                {/* Pros */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Why {d.name}</h3>
                  <ul className="space-y-2">
                    {d.pros.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-brand-gold mt-0.5 flex-shrink-0 font-bold">—</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Mobile CTA */}
              <div className="md:hidden mt-6">
                <Link to={d.link} className="text-sm font-bold text-brand-blue hover:underline">
                  {d.linkLabel}
                </Link>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 text-center mt-4 max-w-6xl mx-auto">
          Campus photography courtesy of Wikimedia Commons contributors (CC BY-SA / public domain).
        </p>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-navy">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl text-white mb-3">Not sure which country is right for you?</h2>
          <p className="text-white/70 mb-8">Our Rwanda-based counselors will help you choose based on your goals, budget, and language preference.</p>
          <Link to="/consultation" className="btn-primary">Book Free Consultation</Link>
        </div>
      </section>
    </>
  )
}
