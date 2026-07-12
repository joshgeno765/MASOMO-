import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import PhotoHero from '../components/ui/PhotoHero'
import TextImageSplit from '../components/ui/TextImageSplit'
import IconFeatureRow from '../components/ui/IconFeatureRow'

const values = [
  { num: '01', title: 'Transparency', desc: 'Clear pricing and honest timelines.' },
  { num: '02', title: 'Integrity', desc: 'Student-first recommendations.' },
  { num: '03', title: 'Excellence', desc: 'Focused on successful admissions and visa outcomes.' },
  { num: '04', title: 'Care', desc: 'Personalized support throughout your journey.' },
]

const seminars = [
  { src: '/images/seminars/seminar-3.webp', caption: 'Information session at a partner secondary school — walking students through the FMC pathway to Canada.' },
  { src: '/images/seminars/seminar-5-thumb.webp', caption: 'Students respond to a live poll during a school seminar on studying abroad.' },
  { src: '/images/seminars/seminar-2-thumb.webp', caption: 'International Education & Career Symposium — Nairobi, Kenya, in partnership with Northern Lights College.' },
  { src: '/images/seminars/seminar-4-thumb.webp', caption: 'Walking families through the route from British Columbia\'s Northern Lights College campuses to a study permit.' },
  { src: '/images/seminars/seminar-1-thumb.webp', caption: 'Our counselors follow up with students one-on-one after every seminar.' },
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
      <PhotoHero
        image="/images/seminars/seminar-2.webp"
        alt="Masomo Now / ELIMU education symposium in Nairobi, Kenya"
        title="Your Journey Starts Here"
        subtitle="Helping students turn their international education dreams into reality."
      />

      <TextImageSplit
        image="/images/seminars/seminar-4.webp"
        alt="Masomo Now counselor presenting Northern Lights College's British Columbia campuses"
        title="Our Story"
        imageSide="right"
      >
        <p>Masomo Now is the Francophone Africa division of <strong className="text-navy">ELIMU International Education Connections</strong>, a Canadian education consultancy headquartered in Vancouver, British Columbia.</p>
        <p>Our mission is to connect talented students with quality education opportunities around the world while providing trusted guidance throughout every step of the journey.</p>
      </TextImageSplit>

      <IconFeatureRow
        title="Our credentials"
        features={[
          { icon: '🇨🇦', title: 'Canadian Head Office', description: 'Based in Vancouver, British Columbia.' },
          { icon: '🛂', title: 'Licensed Immigration Support', description: 'Professional study permit and immigration guidance.' },
          { icon: '📋', title: 'Canadian Registered Business', description: 'Operating through ELIMU International Education Connections.' },
          { icon: '🤝', title: 'End-to-End Student Support', description: 'From consultation to arrival abroad.' },
        ]}
      />

      {/* Offices */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl text-navy mb-3">Where We Operate</h2>
          <p className="text-gray-500 mb-8">Serving students throughout East and Central Africa.</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              ['🇨🇦', 'Vancouver'],
              ['🇰🇪', 'Nairobi'],
              ['🇷🇼', 'Kigali'],
              ['🇪🇹', 'Jijiga'],
            ].map(([flag, name]) => (
              <div key={name} className="border-2 border-navy/10 rounded-xl p-5">
                <div className="text-3xl mb-2">{flag}</div>
                <h3 className="font-bold text-navy">{name}</h3>
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
          <p className="text-xs font-bold uppercase tracking-widest text-brand-gold-dark mb-3">On the ground</p>
          <h2 className="font-serif text-4xl text-navy mb-3">Our Seminars</h2>
          <p className="text-gray-600 text-lg mb-12 max-w-2xl">
            We regularly host school visits, education fairs, and community seminars across East Africa to help students and families explore international education opportunities.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {seminars.map((s, i) => (
              <figure key={s.src} className={`overflow-hidden rounded-xl ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                <img src={s.src} alt={s.caption} loading="lazy" className={`w-full object-cover ${i === 0 ? 'h-full min-h-[20rem]' : 'h-48'}`} />
                <figcaption className="bg-white px-4 py-3 text-xs text-gray-500 leading-relaxed">{s.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-6 bg-navy">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-4xl text-white mb-5">Our Team</h2>
          <p className="text-white/70 text-lg leading-relaxed">
            Our advisors work closely with licensed immigration professionals to provide personalized guidance from your first inquiry until you arrive at your destination.
          </p>
        </div>
      </section>
    </>
  )
}
