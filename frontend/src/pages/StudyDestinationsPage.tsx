import { Link } from 'react-router-dom'

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
      { name: 'DCU — Dublin City University', type: 'Public Research University' },
      { name: 'Griffith College', type: 'Private College' },
    ],
    desc: 'Ireland is one of the only English-speaking countries in the EU, making it a strategic choice for African students seeking a globally recognised degree with access to European job markets. Dublin is home to the European headquarters of Google, Meta, and Apple.',
    pros: ['English-language EU country', '2-year post-study work permit (Stamp 1G)', 'Access to European job market', 'World-class tech and business sector', 'Welcoming to international students'],
    link: '/contact',
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
      { name: 'CBS — University of Applied Sciences', type: 'Private University of Applied Sciences' },
      { name: 'BSBI — Berlin School of Business & Innovation', type: 'Private Institution' },
      { name: 'Gisma University of Applied Sciences', type: 'Private University of Applied Sciences' },
    ],
    desc: 'Germany is Europe\'s strongest economy and a top destination for international students. Our three partner institutions offer fully English-taught business and management programs, making Germany accessible without needing to learn German first.',
    pros: ['3 partner institutions in major cities', '18-month job seeker visa after graduation', 'Strong engineering & business job market', 'English-taught programs available', 'Central EU location'],
    link: '/contact',
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
      { name: 'Vistula University', type: 'Private University — Warsaw' },
    ],
    desc: 'Poland offers EU-recognised degrees at significantly lower tuition fees and living costs than Western Europe. Vistula University in Warsaw is one of Poland\'s most internationally active institutions, with a strong track record of enrolling students from Africa.',
    pros: ['Among the most affordable EU tuitions', 'Lower cost of living vs. Western Europe', 'EU-recognised degrees', 'English-taught programs', 'Growing economy and job market'],
    link: '/contact',
    linkLabel: 'Enquire About Poland →',
  },
]

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

              {/* Body */}
              <div className="grid md:grid-cols-3 gap-10">
                {/* Key facts + Partner Schools */}
                <div className="space-y-6">
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
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Partner Schools</h3>
                    <ul className="space-y-2.5">
                      {d.schools.map((s) => (
                        <li key={s.name} className="border-b border-gray-100 pb-2.5">
                          <div className="text-sm font-semibold text-navy">{s.name}</div>
                          <div className="text-xs text-gray-400 mt-0.5">{s.type}</div>
                        </li>
                      ))}
                    </ul>
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
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-navy">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl text-white mb-3">Not sure which country is right for you?</h2>
          <p className="text-white/70 mb-8">Our Rwanda-based counselors will help you choose based on your goals, budget, and language preference.</p>
          <Link to="/contact" className="btn-primary">Book Free Consultation</Link>
        </div>
      </section>
    </>
  )
}
