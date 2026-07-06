import { Link } from 'react-router-dom'

const eligibilityPoints = [
  { title: 'Francophone country of origin', desc: 'You must be a citizen or resident of a francophone country — including Rwanda, DR Congo, Djibouti, Cameroon, Côte d\'Ivoire, Senegal, and others.' },
  { title: 'Accepted at a participating institution', desc: 'You must have an acceptance letter from a designated FMC-eligible college or university in Canada outside Quebec.' },
  { title: 'French-language program', desc: 'Your program of study must be delivered primarily in French at the participating institution.' },
  { title: 'Standard IRCC requirements', desc: 'You must also meet the standard requirements: proof of finances, health clearance, character, and intent to leave Canada after studies.' },
]

const benefits = [
  { title: 'Faster processing', desc: 'Applications through this pilot are processed on a priority basis, reducing wait times significantly.' },
  { title: 'Dedicated support pathway', desc: 'The pilot connects francophone students with institutions that have specific support structures for French-speaking international students.' },
  { title: 'Study outside Quebec', desc: 'Access world-class French-language education in Ontario, New Brunswick, Manitoba, and other provinces.' },
  { title: 'Pathway to permanent residence', desc: 'Graduating from a French-language program outside Quebec strengthens your Express Entry profile under francophone immigration streams.' },
]

const institutions = [
  { province: 'Ontario', schools: ['Université de l\'Ontario français (UOF)', 'Collège Boréal', 'La Cité collégiale', 'Université d\'Ottawa (French programs)'] },
  { province: 'New Brunswick', schools: ['Université de Moncton', 'Collège communautaire du Nouveau-Brunswick (CCNB)'] },
  { province: 'Manitoba', schools: ['Université de Saint-Boniface'] },
  { province: 'Alberta', schools: ['Campus Saint-Jean (University of Alberta)'] },
  { province: 'Nova Scotia', schools: ['Université Sainte-Anne'] },
]

const steps = [
  { num: '1', title: 'Check eligibility', desc: 'We review your background, nationality, and academic history against the FMC pilot requirements.' },
  { num: '2', title: 'Choose a program', desc: 'We identify the right French-language program and institution that fits your career goals and qualifications.' },
  { num: '3', title: 'Apply to the institution', desc: 'We prepare your full application package — transcripts, SOP, recommendation letters, and language proof.' },
  { num: '4', title: 'Submit study permit', desc: 'Once you have your acceptance letter, we guide you through the IRCC study permit application under the FMC pilot.' },
  { num: '5', title: 'Pre-departure & arrival', desc: 'We prepare you for life in Canada — housing, orientation, banking, and connecting with the local francophone community.' },
]

export default function FMCPilotPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-start">
          <div>
            <p className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-4">Canada Study Permit</p>
            <h1 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-5">
              Francophone Minority Communities Student Pilot
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              A dedicated Canadian immigration pathway for francophone students from Rwanda, DR Congo, Djibouti, and other French-speaking countries — to study at French-language institutions across Canada outside Quebec.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link to="/consultation" className="btn-primary">Check My Eligibility</Link>
              <a
                href="https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/fmc-student-pilot/eligibility.html"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                Official IRCC Page ↗
              </a>
            </div>
          </div>

          {/* Info table */}
          <div className="border border-white/20 rounded-lg overflow-hidden">
            {[
              ['Pilot name', 'FMC Student Pilot'],
              ['Managed by', 'IRCC — Immigration, Refugees & Citizenship Canada'],
              ['Target students', 'Francophone international students'],
              ['Study location', 'Canada — outside Quebec'],
              ['Language', 'French-language programs'],
              ['Processing', 'Priority — faster than standard'],
            ].map(([label, value]) => (
              <div key={label} className="flex gap-4 px-5 py-3.5 border-b border-white/10 last:border-0">
                <span className="text-white/50 text-sm w-32 flex-shrink-0">{label}</span>
                <span className="text-white text-sm font-semibold">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who is this for */}
      <section className="py-16 px-6 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl text-navy mb-4">Who is this for?</h2>
          <p className="text-gray-600 text-base mb-6 max-w-2xl">
            If you are from Rwanda, DR Congo, Djibouti, Cameroon, Côte d'Ivoire, Senegal, or any other French-speaking country — and you want to study in French in Canada — this pilot was built for you.
          </p>
          <div className="flex flex-wrap gap-2">
            {['Rwanda', 'DR Congo', 'Djibouti', 'Cameroon', 'Senegal', "Côte d'Ivoire", 'Mali', 'Burkina Faso', 'Gabon', 'Togo'].map((c) => (
              <span key={c} className="border border-gray-300 rounded px-3 py-1 text-sm text-gray-700">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl text-navy mb-3">Eligibility criteria</h2>
          <p className="text-gray-500 mb-10">You must meet all of the following to apply through the FMC Student Pilot.</p>
          <div className="grid md:grid-cols-2 gap-x-14 gap-y-8">
            {eligibilityPoints.map((p) => (
              <div key={p.title} className="border-t border-gray-200 pt-5">
                <h3 className="font-bold text-navy mb-2">{p.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
              </div>
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

      {/* Institutions */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl text-navy mb-3">Participating institutions</h2>
          <p className="text-gray-500 mb-10 max-w-2xl">
            French-language colleges and universities across Canada (outside Quebec) that participate in the FMC pilot. We'll help you find the right fit.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {institutions.map((group) => (
              <div key={group.province}>
                <h3 className="font-bold text-navy text-sm uppercase tracking-wide mb-3 border-b border-gray-200 pb-2">{group.province}</h3>
                <ul className="space-y-2">
                  {group.schools.map((school) => (
                    <li key={school} className="text-sm text-gray-600">{school}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-400 mt-8">
            This list is regularly updated. {' '}
            <a
              href="https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/fmc-student-pilot/eligibility.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-blue hover:underline"
            >
              See the official IRCC list ↗
            </a>
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 px-6 bg-navy">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl text-white mb-3">How Masomo Now helps</h2>
          <p className="text-white/60 mb-12 max-w-xl">From checking your eligibility to arriving on campus — our Rwanda-based team knows this pathway inside out.</p>
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
          <h2 className="font-serif text-3xl text-navy mb-3">Ready to apply through the FMC Pilot?</h2>
          <p className="text-gray-600 mb-8">
            Book a free consultation with our Rwanda team. We'll tell you exactly if you qualify and what your next step is.
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
