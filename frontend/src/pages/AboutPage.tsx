import { Link } from 'react-router-dom'

const values = [
  { title: 'Transparency', desc: 'No hidden fees. No vague timelines. We tell you exactly what to expect and when.' },
  { title: 'Integrity', desc: 'We only recommend universities that genuinely fit the student — not ones that pay us referral fees.' },
  { title: 'Results', desc: 'We measure our success by your success — every student placed, every visa approved.' },
  { title: 'Care', desc: 'We remember you\'re a person, not an application number. Every student gets real attention.' },
]

const team = [
  { initials: 'JA', name: 'John Agak', role: 'Founder & Director', bio: '10+ years in international education consulting. Specialising in Canada and UK pathways.' },
  { initials: 'TM', name: 'Tuyishime', role: 'Rwanda Office Lead', bio: 'Based in Kigali. Specialist in the FMC pilot and francophone student pathways to Canada.' },
  { initials: 'AN', name: 'Amina Njoroge', role: 'Senior Counselor', bio: 'UK specialist. MSc from University of Edinburgh. Expert in UK student visa applications.' },
  { initials: 'BO', name: 'Brian Omondi', role: 'Visa Specialist', bio: 'High first-attempt approval rate across Canada and Australia.' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4 max-w-xl">
            Built to help you get there
          </h1>
          <p className="text-white/70 text-lg max-w-xl leading-relaxed">
            Masomo Now was founded to remove the barriers that stop talented Rwandan and francophone African students from accessing world-class education abroad.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="font-serif text-3xl text-navy mb-5">Where we started</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Masomo Now is the francophone Africa division of <strong className="text-navy">ELIMU International Education Connections</strong> — a Canadian education consultancy headquartered in Vancouver, BC, founded by education professionals with deep personal and professional experience in the Canadian system.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              ELIMU has spent years connecting students from Africa and the Middle East to Canadian colleges and universities. As we saw growing demand from francophone students in Rwanda, DR Congo, and Djibouti — students who faced unique barriers around language, immigration pathways, and destination choices — we launched Masomo Now to serve them directly.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Masomo Now expands ELIMU's proven model to francophone Africa: end-to-end support from university selection to post-arrival settlement, backed by a licensed immigration team and a network of partner institutions in Canada, Ireland, Germany, and Poland.
            </p>
          </div>
          <div className="space-y-5">
            <div className="border-l-4 border-brand-gold pl-5 py-1">
              <h3 className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-2">Mission</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                To make international education accessible to every ambitious francophone African student, regardless of background — with the same end-to-end support ELIMU has delivered for years.
              </p>
            </div>
            <div className="border-l-4 border-brand-gold pl-5 py-1">
              <h3 className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-2">Vision</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                A world where language and geography are never a barrier to the education a student deserves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ELIMU Credentials */}
      <section className="py-16 px-6 bg-navy">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-3">Our Foundation</p>
          <h2 className="font-serif text-2xl text-white mb-10">Backed by ELIMU International Education Connections</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="border-t border-white/20 pt-5">
              <div className="text-brand-gold font-bold text-sm mb-1">Vancouver, BC — Canada</div>
              <p className="text-white/60 text-sm leading-relaxed">Head office. Founded by Canadians with lived experience in the Canadian education system.</p>
            </div>
            <div className="border-t border-white/20 pt-5">
              <div className="text-brand-gold font-bold text-sm mb-1">RCIC Licensed</div>
              <p className="text-white/60 text-sm leading-relaxed">Licensed immigration consultant authorized by IRCC to submit study permit applications on behalf of students.</p>
            </div>
            <div className="border-t border-white/20 pt-5">
              <div className="text-brand-gold font-bold text-sm mb-1">CRA Registered</div>
              <p className="text-white/60 text-sm leading-relaxed">Incorporated and registered in Canada under the Canada Revenue Agency. A trusted, accountable organization.</p>
            </div>
            <div className="border-t border-white/20 pt-5">
              <div className="text-brand-gold font-bold text-sm mb-1">End-to-End Support</div>
              <p className="text-white/60 text-sm leading-relaxed">From first inquiry to airport pickup and settlement in Canada — we stay with every student through their full journey.</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-white/50">
            <span>ELIMU International Education Connections</span>
            <span className="hidden sm:inline">·</span>
            <span>info@elimunow.com</span>
            <span className="hidden sm:inline">·</span>
            <span>+1 780 512 7513</span>
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="py-16 px-6 bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl text-navy mb-8">Where we operate</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border-t-2 border-brand-gold pt-5">
              <div className="flex items-center gap-2 mb-1">
                <span>🇨🇦</span>
                <h3 className="font-bold text-navy">Vancouver, BC — Canada</h3>
                <span className="text-xs text-brand-gold font-bold ml-1">ELIMU HQ</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">Head office of ELIMU International. Our Canadian base for immigration, licensing, and institutional partnerships.</p>
            </div>
            <div className="border-t-2 border-navy pt-5">
              <div className="flex items-center gap-2 mb-1">
                <span>🇷🇼</span>
                <h3 className="font-bold text-navy">Kigali, Rwanda</h3>
                <span className="text-xs text-brand-gold font-bold ml-1">Masomo Now Office</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">Our francophone Africa desk. Serving Rwanda, DR Congo, and Djibouti. Contact: info@masomonow.com</p>
            </div>
            <div className="border-t-2 border-gray-300 pt-5">
              <div className="flex items-center gap-2 mb-1">
                <span>🇰🇪</span>
                <h3 className="font-bold text-navy">Nairobi, Kenya</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">ELIMU coordinating office for East Africa. Serving Kenya, Uganda, Tanzania, and Ethiopia.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl text-navy mb-12">What we stand for</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {values.map((v) => (
              <div key={v.title} className="border-t border-gray-200 pt-5">
                <h3 className="font-bold text-navy mb-2">{v.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-6 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl text-navy mb-3">Meet the counselors</h2>
          <p className="text-gray-500 text-base mb-12">Our team has personal experience studying abroad and deep knowledge of francophone student pathways to Canada and beyond.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name}>
                <div className="w-14 h-14 rounded-full bg-navy flex items-center justify-center font-bold text-white text-lg mb-4">
                  {member.initials}
                </div>
                <div className="font-bold text-navy">{member.name}</div>
                <div className="text-brand-blue text-xs font-semibold mt-0.5 mb-2">{member.role}</div>
                <p className="text-gray-500 text-xs leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-navy">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl text-white mb-3">Talk to a real counselor</h2>
          <p className="text-white/70 mb-8">No scripts, no sales pitch. Just honest advice about your next step — from our Rwanda team.</p>
          <Link to="/contact" className="btn-primary">Book Free Consultation</Link>
        </div>
      </section>
    </>
  )
}
