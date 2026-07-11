import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import PhotoHero from '../components/ui/PhotoHero'
import TextImageSplit from '../components/ui/TextImageSplit'
import IconFeatureRow from '../components/ui/IconFeatureRow'
import FactsBand from '../components/ui/FactsBand'
import ScrollCarouselModal from '../components/ui/ScrollCarouselModal'
import VideoEmbed from '../components/ui/VideoEmbed'
import Reveal from '../components/ui/Reveal'

const testimonials = [
  { name: 'Amara M.', dest: 'BCIT, British Columbia', quote: 'Masomo Now made what seemed impossible feel completely manageable. From my BCIT application to my study permit — every step was guided. I\'m now in Vancouver.' },
  { name: 'Claudette U.', dest: 'Université de Moncton, NB', quote: 'En tant que Rwandaise francophone, le programme pilote FMC était parfait pour moi. L\'équipe de Masomo Now à Kigali m\'a guidée du début à la fin.' },
  { name: 'Jean-Pierre M.', dest: 'Collège Boréal, Ontario', quote: 'I came from DRC and didn\'t think studying in Canada was possible. Masomo Now found the FMC pilot for me — now I\'m studying in French in Ontario.' },
]

const whyMasomoNow = [
  {
    image: '/images/seminars/seminar-3-thumb.webp',
    title: 'RCIC Licensed Team',
    body: 'Our Regulated Canadian Immigration Consultants (RCICs) are licensed by the College of Immigration and Citizenship Consultants (CICC) — License R731358, RCIC-IRB-L3. They guide you through Canadian study permits, including the FMC pathway, as well as UK and Australian visas.',
  },
  {
    image: '/images/seminars/seminar-4-thumb.webp',
    title: 'Francophone FMC Pathway',
    body: 'A dedicated Canadian immigration pathway for francophone students from Rwanda, DR Congo, and Djibouti. Study at French-language institutions across Canada with priority processing and a clear route to permanent residence.',
  },
  {
    image: '/images/seminars/seminar-2-thumb.webp',
    title: 'On The Ground In East Africa',
    body: 'Our counselors run in-person seminars in schools and community halls across East Africa — walking students through real pathways abroad face to face, alongside partners like Northern Lights College.',
  },
  {
    image: '/images/schools/bcit-thumb.webp',
    title: 'Real Partner Institutions',
    body: 'We work with 13 partner schools across Canada, the United States, Ireland, Germany, and Poland — every one a real, verified institution with real programs, not a placeholder listing.',
  },
]

const destinationShowcase = [
  { flag: '🇨🇦', name: 'Canada', image: '/images/schools/bcit-thumb.webp', count: '5 partner schools' },
  { flag: '🇺🇸', name: 'United States', image: '/images/schools/lwtech-thumb.webp', count: '2 partner schools' },
  { flag: '🇮🇪', name: 'Ireland', image: '/images/schools/dcu-thumb.webp', count: '2 partner schools' },
  { flag: '🇩🇪', name: 'Germany', image: '/images/schools/cbs-thumb.webp', count: '3 partner schools' },
  { flag: '🇵🇱', name: 'Poland', image: '/images/schools/vistula-thumb.webp', count: '1 partner school' },
]

const whoWeHelp = [
  { photo: '/images/seminars/seminar-3-thumb.webp', title: 'Recent High School Graduates', description: 'Undergraduate-track programs plus English/French upgrading and language-proficiency pathways for students moving straight from secondary school.' },
  { photo: '/images/schools/lwtech-thumb.webp', title: 'University Transfer Students', description: 'Associate degree and university-transfer (UT) programs that let you start close to home and transfer credits into a full degree abroad.' },
  { photo: '/images/schools/tru-thumb.webp', title: 'Degree & Diploma Seekers', description: 'Full diploma and bachelor\'s degree programs across our partner institutions in Canada, the US, Ireland, Germany, and Poland.' },
  { photo: '/images/schools/bcit-thumb.webp', title: 'Trades & Apprenticeship', description: 'Hands-on technical and trades programs with strong co-op placement, including at BCIT and Northern Lights College.' },
]

const networkItems = [
  {
    title: 'Partner Institutions',
    body: '13 real, verified partner institutions across Canada, the United States, Ireland, Germany, and Poland — including BCIT, TRU, University of Lethbridge, Northern Lights College, North Island College, Lake Washington Institute of Technology, Seattle Colleges, DCU, Griffith College, CBS International Business School, BSBI, Gisma University of Applied Sciences, and Vistula University.',
  },
  {
    title: 'Specialist Visa & Immigration Counselors',
    body: 'Our RCIC-licensed team (College of Immigration and Citizenship Consultants, License R731358) guides every study permit and visa application, including Canada\'s FMC Student Pilot for francophone students.',
  },
  {
    title: 'In-Person Seminars & Community Events',
    body: 'Our counselors run seminars in schools and community halls across East Africa — real, face-to-face guidance, not just an online form.',
  },
]

const partnerMarquee = [
  'BCIT', 'TRU', 'University of Lethbridge', 'Northern Lights College', 'North Island College',
  'Saskatchewan Polytechnic', 'Fanshawe College', 'University Canada West',
  'Lake Washington Institute of Technology', 'Seattle Colleges', 'DCU', 'Griffith College',
  'CBS International Business School', 'BSBI', 'Gisma University of Applied Sciences', 'Vistula University',
]

const realFacts = [
  { value: '16', label: 'Partner Schools' },
  { value: '5', label: 'Study Destinations' },
  { value: '3', label: 'Countries We Serve' },
  { value: 'RCIC', label: 'Licensed Immigration Team' },
]

export default function HomePage() {
  return (
    <>
      <div className="bg-brand-gold text-navy text-center py-2.5 px-4 text-sm font-semibold">
        Francophone students from Africa may qualify for Canada's FMC Student Pilot —{' '}
        <Link to="/pathway-finder?ref=fmc-pilot" className="underline font-bold hover:text-navy/70">Check your eligibility</Link>
      </div>

      <PhotoHero
        images={['/images/seminars/seminar-2.webp', '/images/seminars/seminar-3.webp', '/images/seminars/seminar-4.webp']}
        alt="A Masomo Now / ELIMU seminar with students in Kenya"
        eyebrow="Masomo Now — ELIMU International Education Connections"
        title="Study and work abroad, without guesswork"
        subtitle="Backed by ELIMU International Education Connections, a licensed Canadian consultancy, we guide students from Rwanda, DR Congo, and Djibouti from first inquiry to landing on campus."
        ctaLabel="Find Your Pathway →"
        ctaTo="/pathway-finder"
        height="h-[75vh] min-h-[520px] max-h-[700px]"
      >
        <Button to="/services" variant="outline">Explore Our Services</Button>
        <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-3 py-1.5 text-xs font-semibold text-white">
          🛂 RCIC Licensed
        </span>
        <Link to="/about" className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/20 transition-colors">
          🎓 Learn about ELIMU →
        </Link>
      </PhotoHero>

      <TextImageSplit
        image="/images/seminars/seminar-4.webp"
        alt="Masomo Now counselor presenting Northern Lights College's British Columbia campuses"
        title="Welcome to Masomo Now"
        imageSide="left"
        cta={<Link to="/about" className="text-brand-blue text-sm font-bold hover:underline">Learn more about ELIMU →</Link>}
      >
        <p>Masomo Now is the francophone Africa division of <strong className="text-navy">ELIMU International Education Connections</strong> — a licensed Canadian education consultancy headquartered in Vancouver, BC.</p>
        <p>We serve students directly from Rwanda, DR Congo, and Djibouti — backed by a licensed immigration team and real partner institutions in Canada, Ireland, Germany, and Poland.</p>
      </TextImageSplit>

      <FactsBand facts={realFacts} />

      {/* See what studying abroad actually looks like */}
      <Reveal>
        <section className="py-16 px-6 bg-gray-50 border-y border-gray-200">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-gold-dark mb-3">What awaits you abroad</p>
              <h2 className="font-serif text-3xl text-navy mb-4">See what studying abroad actually looks like</h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                We don't just tell you about campus life in Canada — we show you. This is a real look inside TRU — Thompson Rivers University in Kamloops, BC, one of our partner schools — from classrooms to campus life.
              </p>
              <Link to="/destinations" className="text-brand-blue text-sm font-bold hover:underline">Watch real campus videos for every partner school →</Link>
            </div>
            <div>
              <VideoEmbed videoId="6jc9QVVUC8Q" title="TRU Campus Tour 2024" autoplay />
            </div>
          </div>
        </section>
      </Reveal>

      <IconFeatureRow
        title="Why Masomo Now"
        features={[
          { icon: '🛂', title: 'RCIC Licensed', description: 'Licensed visa & study permit support for Canada, UK, and Australia.' },
          { icon: '🍁', title: 'FMC Pathway', description: 'A dedicated francophone route to studying in Canada.' },
          { icon: '📍', title: 'On The Ground', description: 'In-person seminars across East Africa, not just online.' },
          { icon: '🤝', title: 'End-to-End Support', description: 'From first inquiry to arrival on campus.' },
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

      <ScrollCarouselModal eyebrow="More about us" title="What makes Masomo Now different" items={whyMasomoNow} />

      <TextImageSplit
        image="/images/seminars/seminar-5.webp"
        alt="Students respond to a live poll during a school seminar on studying abroad"
        title="We show up in person, not just online"
        imageSide="right"
        cta={<Link to="/about#seminars" className="text-brand-blue text-sm font-bold hover:underline">See our recent seminars →</Link>}
      >
        <p>Our counselors run in-person seminars in schools and community halls across East Africa — walking students through real pathways abroad face to face, alongside partners like Northern Lights College.</p>
      </TextImageSplit>

      {/* Our network */}
      <Reveal>
        <section className="py-16 px-6 border-t border-b border-gray-200">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-gold-dark mb-3">Our Network</p>
            <h2 className="font-serif text-3xl text-navy mb-10">Part of a real, verified network</h2>
            <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
              {networkItems.map((item, i) => (
                <details key={item.title} open={i === 0} className="py-5 group">
                  <summary className="flex items-center justify-between font-bold text-navy">
                    {item.title}
                    <svg className="chev w-5 h-5 text-brand-gold transition-transform flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                    </svg>
                  </summary>
                  <p className="text-gray-600 mt-3 text-[15px] leading-relaxed">{item.body}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Partner marquee */}
      <section className="py-14 border-y border-gray-200 overflow-hidden bg-gray-50">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-500 mb-8">Our Real Partner Institutions</p>
        <div className="flex whitespace-nowrap marquee-track">
          {[0, 1].map((rep) => (
            <div key={rep} className="flex items-center gap-14 pr-14" aria-hidden={rep === 1}>
              {partnerMarquee.map((name) => (
                <span key={name} className="text-navy/40 font-serif italic text-xl">{name}</span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <FactsBand
        dark
        facts={realFacts}
      />

      {/* Recent students */}
      <Reveal>
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-3xl text-navy mb-10">Recent students</h2>
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
            <h2 className="font-serif text-3xl text-white mb-3">Ready to get started?</h2>
            <p className="text-white/70 mb-8">Book a free consultation and we'll tell you exactly what your next step should be.</p>
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
