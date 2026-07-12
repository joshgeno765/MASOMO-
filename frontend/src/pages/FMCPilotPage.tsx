import { Link } from 'react-router-dom'
import { FMC_ELIGIBLE_COUNTRIES } from '../data/destinations'
import Button from '../components/ui/Button'
import IconFeatureRow from '../components/ui/IconFeatureRow'

const eligibilityPoints = [
  { icon: '🌍', title: 'Francophone country of origin', description: 'A citizen or resident of an eligible francophone country.' },
  { icon: '🎓', title: 'Accepted at a participating institution', description: 'An admission letter from a participating institution outside Quebec.' },
  { icon: '🗣️', title: 'French-language program', description: 'Your program of study is delivered primarily in French.' },
  { icon: '📋', title: 'Standard IRCC requirements', description: 'Standard study permit requirements: proof of finances, health, and character.' },
]

const benefits = [
  { title: 'Priority processing', desc: 'Applications through this pilot are processed faster than standard study permits.' },
  { title: 'French-speaking environment', desc: 'Study and live in a dedicated French-language community outside Quebec.' },
  { title: 'Study outside Quebec', desc: 'Access world-class French-language education in Ontario, New Brunswick, Manitoba, and other provinces.' },
  { title: 'Pathway to permanent residence', desc: 'Graduating outside Quebec strengthens your Express Entry profile.' },
]

const steps = [
  { num: '1', title: 'Eligibility Assessment', desc: 'We check your background against the FMC pilot requirements.' },
  { num: '2', title: 'Program Selection', desc: 'We find the right French-language program for your goals.' },
  { num: '3', title: 'Application Preparation', desc: 'We prepare your full application package.' },
  { num: '4', title: 'Study Permit Guidance', desc: 'We guide you through the IRCC study permit application.' },
  { num: '5', title: 'Pre-Departure & Arrival Support', desc: 'We prepare you for life in Canada.' },
]

export default function FMCPilotPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 px-6">
        <img
          src="/images/seminars/seminar-4.webp"
          alt="Masomo Now counselor presenting Northern Lights College's British Columbia campuses"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/90" />
        <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-start">
          <div>
            <p className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-4">Canada Study Permit</p>
            <h1 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-5">
              Study in Canada Through the Francophone Minority Communities Student Pilot
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              A dedicated pathway for eligible French-speaking students to study at participating French-language institutions outside Quebec.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Button to="/pathway-finder?ref=fmc-pilot" variant="primary">Check My Eligibility</Button>
              <a
                href="https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/fmc-student-pilot/eligibility.html"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                Official IRCC Information ↗
              </a>
            </div>
          </div>

          {/* Info table */}
          <div className="border border-white/20 rounded-lg overflow-hidden">
            {[
              ['Pilot', 'FMC Student Pilot'],
              ['Managed by', 'IRCC'],
              ['Study location', 'Canada — outside Quebec'],
              ['Language', 'French'],
              ['Application', 'Priority processing'],
            ].map(([label, value]) => (
              <div key={label} className="flex gap-4 px-5 py-3.5 border-b border-white/10 last:border-0">
                <span className="text-white/50 text-sm w-32 flex-shrink-0">{label}</span>
                <span className="text-white text-sm font-semibold">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two pathways */}
      <section className="py-16 px-6 border-b border-gray-200 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-2xl text-navy mb-8">Two Pathways — Study or Work</h2>
          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 items-stretch">
            <div className="bg-white border-2 border-navy rounded-lg p-6">
              <h3 className="font-bold text-navy text-lg mb-2">FMC Student Pilot</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                For students who want to study in Canada. No job offer required.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 md:hidden">
                <span className="flex-1 h-px bg-gray-300" />
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Or</span>
                <span className="flex-1 h-px bg-gray-300" />
              </div>
              <div className="hidden md:flex flex-col items-center gap-3 h-full">
                <span className="flex-1 w-px bg-gray-300" />
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Or</span>
                <span className="flex-1 w-px bg-gray-300" />
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-bold text-navy text-lg mb-2">Francophone Mobility Work Permit</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                For skilled workers who already have a Canadian job offer. No study permit required.
              </p>
              <a
                href="https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/special-instructions/francophone-mobility.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-blue text-sm font-bold hover:underline"
              >
                Official IRCC page ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <div className="pt-16 px-6 text-center">
        <h2 className="font-serif text-3xl text-navy mb-2 max-w-6xl mx-auto">Eligibility</h2>
        <p className="text-gray-500 max-w-6xl mx-auto">You may qualify if you meet all of the following.</p>
      </div>
      <IconFeatureRow features={eligibilityPoints} />

      {/* Eligible countries */}
      <section className="pb-16 px-6 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Eligible Countries</p>
          <div className="flex flex-wrap gap-2">
            {FMC_ELIGIBLE_COUNTRIES.map((c) => (
              <span key={c} className="border border-gray-300 rounded px-3 py-1 text-sm text-gray-700">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-6 bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl text-navy mb-10">Benefits of the FMC pathway</h2>
          <div className="grid md:grid-cols-2 gap-x-14 gap-y-8">
            {benefits.map((b) => (
              <div key={b.title} className="border-t border-gray-200 pt-5">
                <h3 className="font-bold text-navy mb-2">{b.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 px-6 bg-navy">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl text-white mb-3">How Masomo Now Helps</h2>
          <p className="text-white/60 mb-12 max-w-xl">From checking your eligibility to arriving on campus.</p>
          <div className="grid md:grid-cols-5 gap-6">
            {steps.map((s) => (
              <div key={s.num} className="border-t border-white/20 pt-5">
                <div className="text-brand-gold font-bold text-sm mb-3">Step {s.num}</div>
                <h3 className="text-white font-bold text-sm mb-2">{s.title}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl text-navy mb-3">Ready to Study in Canada?</h2>
          <p className="text-gray-600 mb-8">
            Book a free consultation and we'll assess your eligibility and guide you through every step of the application process.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/consultation" className="btn-primary">Book Free Consultation</Link>
            <a
              href="https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/fmc-student-pilot/eligibility.html"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-lg hover:border-navy hover:text-navy transition-colors text-sm"
            >
              Read Official Requirements ↗
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
