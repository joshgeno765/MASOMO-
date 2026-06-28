import { Link } from 'react-router-dom'

const destinations = [
  {
    flag: '🇨🇦',
    name: 'Canada',
    tagline: 'Top choice for francophone students from Africa',
    fmc: true,
    facts: [
      { label: 'Universities', value: '120+' },
      { label: 'Post-Study Work', value: 'Up to 3 years (PGWP)' },
      { label: 'FMC Pilot', value: 'Available' },
      { label: 'Language', value: 'English & French' },
    ],
    desc: 'Canada is the top destination for students from Rwanda, DRC, and Djibouti. The Francophone Minority Communities (FMC) Student Pilot offers a dedicated, priority-processed study permit for francophone students to study at French-language institutions outside Quebec.',
    pros: ['FMC pilot pathway for francophone students', 'Post-Graduation Work Permit (up to 3 years)', 'Pathway to permanent residence', 'Safe, multicultural country', 'High quality of life'],
    link: '/fmc-pilot',
    linkLabel: 'Learn About the FMC Pilot →',
  },
  {
    flag: '🇬🇧',
    name: 'United Kingdom',
    tagline: 'World-ranked universities',
    fmc: false,
    facts: [
      { label: 'Universities', value: '130+' },
      { label: 'Post-Study Work', value: '2 years (Graduate Visa)' },
      { label: 'Top Programs', value: 'Business, Law, Medicine' },
      { label: 'Language', value: 'English' },
    ],
    desc: 'The UK is home to some of the world\'s most prestigious universities including Oxford, Cambridge, and Imperial College. The 2-year Graduate Visa lets you work in the UK after completing your degree.',
    pros: ['1–2 year degree programs (faster)', '2-year post-study work visa', 'World-class reputation', 'Diverse student community', 'Strong alumni networks'],
    link: '/contact',
    linkLabel: 'Enquire About UK',
  },
  {
    flag: '🇦🇺',
    name: 'Australia',
    tagline: 'Work while you study',
    fmc: false,
    facts: [
      { label: 'Universities', value: '40+' },
      { label: 'Post-Study Work', value: '2–4 years' },
      { label: 'Work Rights', value: '48 hrs/fortnight during studies' },
      { label: 'Language', value: 'English' },
    ],
    desc: 'Australia offers excellent education quality with generous post-study work rights. You can work up to 48 hours per fortnight while studying and stay 2–4 years after graduation depending on your qualification level.',
    pros: ['Work during studies (48 hrs/fortnight)', 'Long post-study work period', 'High quality of life', 'Strong economy and job market', 'Great for engineering & health programs'],
    link: '/contact',
    linkLabel: 'Enquire About Australia',
  },
  {
    flag: '🇺🇸',
    name: 'United States',
    tagline: 'Home of Ivy League institutions',
    fmc: false,
    facts: [
      { label: 'Institutions', value: '4,000+' },
      { label: 'Post-Study Work', value: '1–3 years (OPT)' },
      { label: 'Top Programs', value: 'STEM, Business, Medicine' },
      { label: 'Language', value: 'English' },
    ],
    desc: 'The US has the largest and most diverse higher education system in the world. With 4,000+ institutions, there is an option for every academic level and budget. STEM graduates benefit from an extended 3-year OPT work permit.',
    pros: ['World\'s most recognised degrees', 'STEM OPT extension (3 years)', 'Large scholarship opportunities', 'Strong research programs', 'Diverse campus culture'],
    link: '/contact',
    linkLabel: 'Enquire About USA',
  },
  {
    flag: '🇳🇿',
    name: 'New Zealand',
    tagline: 'Safe, affordable, high quality',
    fmc: false,
    facts: [
      { label: 'Universities', value: '8 public' },
      { label: 'Post-Study Work', value: 'Up to 3 years' },
      { label: 'Work Rights', value: '20 hrs/week during studies' },
      { label: 'Language', value: 'English' },
    ],
    desc: 'New Zealand is a safe, welcoming country with high-quality education. It\'s an increasingly popular destination for students seeking an alternative to Australia or the UK, with similar standards at lower costs.',
    pros: ['More affordable than Australia & UK', 'Safe and welcoming environment', 'Work 20 hrs/week during studies', 'Post-study work visa up to 3 years', 'High quality of life'],
    link: '/contact',
    linkLabel: 'Enquire About New Zealand',
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
                    {d.fmc && (
                      <span className="text-xs font-bold text-brand-gold border border-brand-gold px-2.5 py-0.5 rounded">
                        FMC Eligible
                      </span>
                    )}
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
