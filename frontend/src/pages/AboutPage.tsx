import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const values = [
  { num: '01', title: 'Transparency', desc: 'No hidden fees. No vague timelines. We tell you exactly what to expect and when.' },
  { num: '02', title: 'Integrity', desc: 'We only recommend universities that genuinely fit the student — not ones that pay us referral fees.' },
  { num: '03', title: 'Results', desc: 'We measure our success by your success — every student placed, every visa approved.' },
  { num: '04', title: 'Care', desc: 'We remember you\'re a person, not an application number. Every student gets real attention.' },
]

const team = [
  { initials: 'JA', name: 'John Agak', role: 'Founder & Director', bio: '10+ years in international education consulting. Specialising in Canada and UK pathways.' },
  { initials: 'TM', name: 'Tuyishime', role: 'Rwanda Office Lead', bio: 'Based in Kigali. Specialist in the FMC pilot and francophone student pathways to Canada.' },
  { initials: 'AN', name: 'Amina Njoroge', role: 'Senior Counselor', bio: 'UK specialist. MSc from University of Edinburgh. Expert in UK student visa applications.' },
  { initials: 'BO', name: 'Brian Omondi', role: 'Visa Specialist', bio: 'High first-attempt approval rate across Canada and Australia.' },
]

const seminars = [
  { src: '/images/seminars/seminar-3.jpg', caption: 'Information session at a partner secondary school — walking students through the FMC pathway to Canada.' },
  { src: '/images/seminars/seminar-5.jpg', caption: 'Students respond to a live poll during a school seminar on studying abroad.' },
  { src: '/images/seminars/seminar-2.jpg', caption: 'International Education & Career Symposium — Nairobi, Kenya, in partnership with Northern Lights College.' },
  { src: '/images/seminars/seminar-4.jpg', caption: 'Walking families through the route from British Columbia\'s Northern Lights College campuses to a study permit.' },
  { src: '/images/seminars/seminar-1.jpg', caption: 'Our counselors follow up with students one-on-one after every seminar.' },
]

export default function AboutPage() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const el = document.querySelector(hash)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [hash])

  return (
    <>
      {/* Hero — full-bleed photo */}
      <section className="relative overflow-hidden">
        <img
          src="/images/seminars/seminar-2.jpg"
          alt="Masomo Now / ELIMU education symposium in Nairobi, Kenya"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/80" />
        <div className="relative max-w-4xl mx-auto text-center py-24 px-6">
          <h1 className="font-serif text-5xl md:text-6xl text-white leading-tight mb-6">Built to help you <span className="text-brand-gold">get there</span></h1>
          <p className="text-white/80 text-xl max-w-xl mx-auto">Masomo Now was founded to remove the barriers that stop talented Rwandan and francophone African students from accessing world-class education abroad.</p>
        </div>
      </section>

      {/* Story — text + photo */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-3xl text-navy mb-6">Where we started</h2>
            <p className="text-gray-600 leading-relaxed mb-4 text-lg">
              Masomo Now is the francophone Africa division of <strong className="text-navy">ELIMU International Education Connections</strong> — a Canadian education consultancy headquartered in Vancouver, BC.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              As we saw growing demand from francophone students in Rwanda, DR Congo, and Djibouti, we launched Masomo Now to serve them directly — backed by a licensed immigration team and partner institutions in Canada, Ireland, Germany, and Poland.
            </p>
          </div>
          <img
            src="/images/seminars/seminar-4.jpg"
            alt="Masomo Now counselor presenting Northern Lights College's British Columbia campuses"
            className="w-full h-80 object-cover rounded-2xl"
          />
        </div>
      </section>

      {/* Credentials — navy/gold blocks */}
      <section>
        {[
          ['Vancouver, BC — Canada', 'Head office. Founded by Canadians with lived experience in the Canadian education system.'],
          ['RCIC Licensed', 'Licensed immigration consultant authorized by IRCC to submit study permit applications on behalf of students.'],
          ['CRA Registered', 'Incorporated and registered in Canada under the Canada Revenue Agency.'],
          ['End-to-End Support', 'From first inquiry to airport pickup and settlement in Canada.'],
        ].map(([title, desc], i) => (
          <div key={title} className={`px-8 md:px-14 py-10 ${i % 2 === 0 ? 'bg-navy' : 'bg-brand-gold'}`}>
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center gap-2 md:gap-10">
              <h3 className={`font-serif text-xl md:w-64 flex-shrink-0 ${i % 2 === 0 ? 'text-brand-gold' : 'text-navy'}`}>{title}</h3>
              <p className={`leading-relaxed ${i % 2 === 0 ? 'text-white/70' : 'text-navy/70'}`}>{desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Offices */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl text-navy mb-8">Where we operate</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              ['🇨🇦', 'Vancouver, BC — Canada', 'ELIMU HQ'],
              ['🇷🇼', 'Kigali, Rwanda', 'Masomo Now Office'],
              ['🇰🇪', 'Nairobi, Kenya', ''],
            ].map(([flag, name, tag]) => (
              <div key={name} className="border-2 border-navy/10 rounded-xl p-5">
                <div className="text-3xl mb-2">{flag}</div>
                <h3 className="font-bold text-navy">{name}</h3>
                {tag && <span className="text-xs text-brand-gold font-bold">{tag}</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values — huge numerals */}
      <section className="py-4">
        <div className="grid md:grid-cols-2">
          {values.map((v, i) => (
            <div key={v.num} className={`relative overflow-hidden px-8 md:px-14 py-12 ${i % 2 === 0 ? 'bg-white' : 'bg-brand-gold-light/10'} border-b border-r border-gray-200`}>
              <span className="absolute -top-4 right-4 text-8xl font-black text-navy/5 leading-none select-none">{v.num}</span>
              <div className="relative z-10">
                <h3 className="font-serif text-2xl text-navy mb-2">{v.title}</h3>
                <p className="text-gray-600 leading-relaxed max-w-xs">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Seminars & Events — real photo gallery */}
      <section id="seminars" className="py-20 px-6 bg-gray-50 border-t border-b border-gray-200 scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-3">On the ground</p>
          <h2 className="font-serif text-4xl text-navy mb-3">Our seminars &amp; events</h2>
          <p className="text-gray-600 text-lg mb-12 max-w-2xl">
            Before a student ever books a consultation online, many of them meet us in person — at a school assembly, a community hall, or a symposium alongside partners like Northern Lights College.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {seminars.map((s, i) => (
              <figure key={s.src} className={`overflow-hidden rounded-xl ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                <img src={s.src} alt={s.caption} className={`w-full object-cover ${i === 0 ? 'h-full min-h-[20rem]' : 'h-48'}`} />
                <figcaption className="bg-white px-4 py-3 text-xs text-gray-500 leading-relaxed">{s.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-6 bg-navy">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-4xl text-white mb-3">Meet the counselors</h2>
          <p className="text-white/60 text-lg mb-12">Our team has personal experience studying abroad and deep knowledge of francophone student pathways.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="bg-white/5 border-2 border-white/10 rounded-xl p-5">
                <div className="w-14 h-14 rounded-full bg-brand-gold flex items-center justify-center font-extrabold text-navy text-lg mb-4">{member.initials}</div>
                <div className="font-bold text-white">{member.name}</div>
                <div className="text-brand-gold text-xs font-semibold mt-0.5 mb-2">{member.role}</div>
                <p className="text-white/50 text-xs leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-4xl text-navy mb-4">Talk to a real counselor</h2>
          <p className="text-gray-600 text-lg mb-8">No scripts, no sales pitch. Just honest advice about your next step.</p>
          <Link to="/consultation" className="inline-block bg-navy hover:bg-brand-blue text-white font-extrabold px-8 py-4 rounded-lg transition-colors text-lg">Book Free Consultation</Link>
        </div>
      </section>
    </>
  )
}
