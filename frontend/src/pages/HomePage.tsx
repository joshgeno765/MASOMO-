import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import PhotoHero from '../components/ui/PhotoHero'
import TextImageSplit from '../components/ui/TextImageSplit'
import IconFeatureRow from '../components/ui/IconFeatureRow'
import Reveal from '../components/ui/Reveal'

const testimonials = [
  { name: 'Amara M.', dest: 'BCIT, British Columbia', quote: 'Masomo Now made what seemed impossible feel completely manageable. From my BCIT application to my study permit — every step was guided. I\'m now in Vancouver.' },
  { name: 'Jean-Pierre M.', dest: 'Collège Boréal, Ontario', quote: 'I came from DRC and didn\'t think studying in Canada was possible. Masomo Now found the FMC pilot for me — now I\'m studying in French in Ontario.' },
]

const destinationShowcase = [
  { flag: '🇨🇦', name: 'Canada', image: '/images/schools/bcit-thumb.webp', count: '8 partner schools' },
  { flag: '🇺🇸', name: 'United States', image: '/images/schools/lwtech-thumb.webp', count: '2 partner schools' },
  { flag: '🇮🇪', name: 'Ireland', image: '/images/schools/dcu-thumb.webp', count: '2 partner schools' },
  { flag: '🇩🇪', name: 'Germany', image: '/images/schools/cbs-thumb.webp', count: '3 partner schools' },
  { flag: '🇵🇱', name: 'Poland', image: '/images/schools/vistula-thumb.webp', count: '1 partner school' },
]

const whoWeHelp = [
  { photo: '/images/seminars/seminar-3-thumb.webp', title: 'High School Graduates', description: 'Start your undergraduate journey abroad.' },
  { photo: '/images/schools/lwtech-thumb.webp', title: 'University Transfer', description: 'Transfer credits into a university degree.' },
  { photo: '/images/schools/tru-thumb.webp', title: 'Degree & Diploma', description: 'Choose from career-focused programs.' },
  { photo: '/images/schools/bcit-thumb.webp', title: 'Trades', description: 'Hands-on training with co-op opportunities.' },
]

const partnerMarquee = [
  'BCIT', 'TRU', 'University of Lethbridge', 'Northern Lights College', 'North Island College',
  'Saskatchewan Polytechnic', 'Fanshawe College', 'University Canada West',
  'Lake Washington Institute of Technology', 'Seattle Colleges', 'DCU', 'Griffith College',
  'CBS International Business School', 'BSBI', 'Gisma University of Applied Sciences', 'Vistula University',
]

export default function HomePage() {
  return (
    <>
      <div className="bg-brand-gold text-navy text-center py-2.5 px-4 text-sm font-semibold">
        Francophone Minority Community Student Pilot (FMCSP) —{' '}
        <Link to="/pathway-finder?ref=fmc-pilot" className="underline font-bold hover:text-navy/70">Check your eligibility</Link>
      </div>

      <PhotoHero
        images={['/images/seminars/seminar-2.webp', '/images/seminars/seminar-3.webp', '/images/seminars/seminar-4.webp']}
        alt="A Masomo Now / ELIMU seminar with students in Kenya"
        title="Study Abroad"
        subtitle="Helping international students access world-class education in Canada, the United States, Ireland, Germany, and Poland through trusted university partnerships and licensed immigration consultants."
        ctaLabel="Find Your Pathway →"
        ctaTo="/pathway-finder"
        secondaryTitle="Work in Canada"
        secondarySubtitle="Helping Francophone skilled workers secure a Canadian job offer and immigrate through the Francophone Mobility work permit — no LMIA required, no study permit required."
        secondaryCtaLabel="Explore Immigration Pathway →"
        secondaryCtaTo="/fmc-pilot"
        height="h-[75vh] min-h-[520px] max-h-[700px]"
      >
        <Link to="/about" className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/20 transition-colors">
          🇨🇦 Canadian Licensed Support
        </Link>
      </PhotoHero>

      <TextImageSplit
        image="/images/seminars/seminar-4.webp"
        alt="Masomo Now counselor presenting Northern Lights College's British Columbia campuses"
        title="Welcome to Masomo Now"
        imageSide="left"
        cta={<Link to="/about" className="text-brand-blue text-sm font-bold hover:underline">Learn more about ELIMU →</Link>}
      >
        <p>Masomo Now is the Francophone Africa division of <strong className="text-navy">ELIMU International Education Connections</strong>, a Canadian education consultancy based in Vancouver, British Columbia.</p>
        <p>We help students successfully apply to universities and colleges abroad by providing expert guidance on admissions, visas, and student preparation from application to arrival.</p>
      </TextImageSplit>

      <IconFeatureRow
        title="Why Choose Masomo Now?"
        features={[
          { icon: '🛂', title: 'RCIC Licensed Support', description: 'Professional immigration guidance backed by licensed Canadian consultants.' },
          { icon: '🎓', title: 'Trusted Partner Institutions', description: 'Study at carefully selected colleges and universities across five countries.' },
          { icon: '🎯', title: 'Personalized Guidance', description: 'Every student receives advice tailored to their goals, budget, and academic background.' },
          { icon: '🤝', title: 'End-to-End Support', description: 'From your first consultation until you settle into your new campus.' },
        ]}
      />

      {/* Destinations showcase */}
      <Reveal>
        <section className="py-16 px-6 bg-navy">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-2xl mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-gold-light mb-3">Study Destinations</p>
              <h2 className="font-serif text-3xl text-white">Where we send our students</h2>
              <p className="text-white/60 text-lg mt-3">Real partner institutions across five countries — matched to your goals, budget, and language preference.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {destinationShowcase.map((d) => (
                <Link key={d.name} to="/destinations" className="group relative rounded-lg overflow-hidden h-72 block">
                  <img src={d.image} alt={d.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/30 to-transparent" />
                  <div className="absolute bottom-0 p-5">
                    <p className="text-xs font-semibold uppercase mb-1">{d.flag}</p>
                    <p className="text-white font-bold text-base leading-tight">{d.name}</p>
                    <p className="text-white/60 text-xs mt-1">{d.count}</p>
                    <span className="inline-block mt-3 text-xs font-semibold text-white/90 border-b border-brand-gold-light">Explore</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Who we help */}
      <Reveal>
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-2xl mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-gold-dark mb-3">Who We Help</p>
              <h2 className="font-serif text-3xl text-navy">Support for every stage</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {whoWeHelp.map((w) => (
                <div key={w.title} className="border border-gray-200 rounded-xl p-7 hover:border-brand-gold/50 transition-colors">
                  <img src={w.photo} alt="" loading="lazy" className="w-14 h-14 rounded-lg object-cover mb-4" />
                  <h3 className="font-bold text-navy text-lg mb-2">{w.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{w.description}</p>
                  <Link to="/pathway-finder" className="text-sm font-semibold text-brand-blue hover:underline">Find your pathway →</Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Partner marquee */}
      <section className="py-14 border-y border-gray-200 overflow-hidden bg-gray-50">
        <p className="text-center font-serif text-2xl text-navy mb-1">Our Partners</p>
        <p className="text-center text-sm text-gray-500 mb-8">We proudly work with 16 trusted institutions across Canada, the United States, Ireland, Germany, and Poland.</p>
        <div className="flex whitespace-nowrap marquee-track mb-8">
          {[0, 1].map((rep) => (
            <div key={rep} className="flex items-center gap-14 pr-14" aria-hidden={rep === 1}>
              {partnerMarquee.map((name) => (
                <span key={name} className="text-navy/40 font-serif italic text-xl">{name}</span>
              ))}
            </div>
          ))}
        </div>
        <p className="text-center">
          <Link to="/destinations" className="text-sm font-bold text-brand-blue hover:underline">View All Partner Institutions →</Link>
        </p>
      </section>

      {/* Recent students */}
      <Reveal>
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-3xl text-navy mb-10">Student Success Stories</h2>
            <div className="flex gap-5 overflow-x-auto pb-2">
              {testimonials.map((t) => (
                <div key={t.name} className="flex-shrink-0 w-80 bg-white border border-gray-200 rounded-2xl p-6">
                  <p className="text-gray-700 text-sm leading-relaxed italic mb-5">"{t.quote}"</p>
                  <div className="font-semibold text-navy text-sm">{t.name}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{t.dest}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* CTA */}
      <Reveal>
        <section className="py-20 px-6 bg-navy text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl text-white mb-3">Ready to Study Abroad?</h2>
            <p className="text-white/70 mb-8">Book a free consultation with one of our advisors and receive a personalized study pathway based on your academic goals.</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Button to="/consultation" variant="primary">Book Free Consultation</Button>
              <Button to="/pathway-finder" variant="outline">Find Your Pathway →</Button>
            </div>
          </div>
        </section>
      </Reveal>
    </>
  )
}
