import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import PhotoHero from '../components/ui/PhotoHero'
import TextImageSplit from '../components/ui/TextImageSplit'
import IconFeatureRow from '../components/ui/IconFeatureRow'
import CardGridSection from '../components/ui/CardGridSection'
import FactsBand from '../components/ui/FactsBand'
import ScrollCarouselModal from '../components/ui/ScrollCarouselModal'

const testimonials = [
  { name: 'Amara M.', dest: 'BCIT, British Columbia', quote: 'Masomo Now made what seemed impossible feel completely manageable. From my BCIT application to my study permit — every step was guided. I\'m now in Vancouver.' },
  { name: 'Claudette U.', dest: 'Université de Moncton, NB', quote: 'En tant que Rwandaise francophone, le programme pilote FMC était parfait pour moi. L\'équipe de Masomo Now à Kigali m\'a guidée du début à la fin.' },
  { name: 'Jean-Pierre M.', dest: 'Collège Boréal, Ontario', quote: 'I came from DRC and didn\'t think studying in Canada was possible. Masomo Now found the FMC pilot for me — now I\'m studying in French in Ontario.' },
]

const whyMasomoNow = [
  {
    image: '/images/seminars/seminar-3.jpg',
    title: 'RCIC Licensed Team',
    body: 'Our Regulated Canadian Immigration Consultants (RCICs) are licensed by the College of Immigration and Citizenship Consultants (CICC) — License R731358, RCIC-IRB-L3. They guide you through Canadian study permits, including the FMC pathway, as well as UK and Australian visas.',
  },
  {
    image: '/images/seminars/seminar-4.jpg',
    title: 'Francophone FMC Pathway',
    body: 'A dedicated Canadian immigration pathway for francophone students from Rwanda, DR Congo, and Djibouti. Study at French-language institutions across Canada with priority processing and a clear route to permanent residence.',
  },
  {
    image: '/images/seminars/seminar-2.jpg',
    title: 'On The Ground In East Africa',
    body: 'Our counselors run in-person seminars in schools and community halls across East Africa — walking students through real pathways abroad face to face, alongside partners like Northern Lights College.',
  },
  {
    image: '/images/schools/bcit.jpg',
    title: 'Real Partner Institutions',
    body: 'We work with 13 partner schools across Canada, the United States, Ireland, Germany, and Poland — every one a real, verified institution with real programs, not a placeholder listing.',
  },
]

const destinationCards = [
  { image: '/images/schools/bcit.jpg', title: 'Canada', subtitle: '5 partner schools', linkLabel: 'Explore', linkTo: '/destinations' },
  { image: '/images/schools/lwtech.jpg', title: 'United States', subtitle: '2 partner schools', linkLabel: 'Explore', linkTo: '/destinations' },
  { image: '/images/schools/dcu.jpg', title: 'Ireland', subtitle: '2 partner schools', linkLabel: 'Explore', linkTo: '/destinations' },
  { image: '/images/schools/cbs.jpg', title: 'Germany', subtitle: '3 partner schools', linkLabel: 'Explore', linkTo: '/destinations' },
]

export default function HomePage() {
  return (
    <>
      <div className="bg-brand-gold text-navy text-center py-2.5 px-4 text-sm font-semibold">
        Francophone students from Rwanda, DRC & Djibouti may qualify for Canada's FMC Student Pilot —{' '}
        <Link to="/pathway-finder?ref=fmc-pilot" className="underline font-bold hover:text-navy/70">Learn more</Link>
      </div>

      <PhotoHero
        image="/images/seminars/seminar-3.jpg"
        alt="A Masomo Now / ELIMU seminar with students in Kenya"
        eyebrow="Masomo Now — ELIMU International Education Connections"
        title="Study and work abroad, without guesswork"
        subtitle="We guide students from Rwanda, DR Congo, and Djibouti through every step — from choosing the right university to landing on campus."
        ctaLabel="Find Your Pathway →"
        ctaTo="/pathway-finder"
      />

      <TextImageSplit
        image="/images/seminars/seminar-4.jpg"
        alt="Masomo Now counselor presenting Northern Lights College's British Columbia campuses"
        title="Welcome to Masomo Now"
        imageSide="left"
        cta={<Link to="/about" className="text-brand-blue text-sm font-bold hover:underline">Learn more about ELIMU →</Link>}
      >
        <p>Masomo Now is the francophone Africa division of <strong className="text-navy">ELIMU International Education Connections</strong> — a licensed Canadian education consultancy headquartered in Vancouver, BC.</p>
        <p>We serve students directly from Rwanda, DR Congo, and Djibouti — backed by a licensed immigration team and real partner institutions in Canada, Ireland, Germany, and Poland.</p>
      </TextImageSplit>

      <IconFeatureRow
        title="Why Masomo Now"
        features={[
          { icon: '🛂', title: 'RCIC Licensed', description: 'Licensed visa & study permit support for Canada, UK, and Australia.' },
          { icon: '🍁', title: 'FMC Pathway', description: 'A dedicated francophone route to studying in Canada.' },
          { icon: '📍', title: 'On The Ground', description: 'In-person seminars across East Africa, not just online.' },
          { icon: '🤝', title: 'End-to-End Support', description: 'From first inquiry to arrival on campus.' },
        ]}
      />

      <CardGridSection
        eyebrow="Where you could study"
        title="Explore your destination"
        cards={destinationCards}
        columns={4}
      />

      <ScrollCarouselModal eyebrow="More about us" title="What makes Masomo Now different" items={whyMasomoNow} />

      <TextImageSplit
        image="/images/seminars/seminar-5.jpg"
        alt="Students respond to a live poll during a school seminar on studying abroad"
        title="We show up in person, not just online"
        imageSide="right"
        cta={<Link to="/about#seminars" className="text-brand-blue text-sm font-bold hover:underline">See our recent seminars →</Link>}
      >
        <p>Our counselors run in-person seminars in schools and community halls across East Africa — walking students through real pathways abroad face to face, alongside partners like Northern Lights College.</p>
      </TextImageSplit>

      <FactsBand
        dark
        facts={[
          { value: '13', label: 'Partner Schools' },
          { value: '5', label: 'Study Destinations' },
          { value: '3', label: 'Countries We Serve' },
          { value: 'RCIC', label: 'Licensed Immigration Team' },
        ]}
      />

      {/* Recent students */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl text-navy mb-10">Recent students</h2>
          <div className="flex gap-5 overflow-x-auto pb-2">
            {testimonials.map((t) => (
              <div key={t.name} className="flex-shrink-0 w-80 bg-white border border-gray-200 rounded-2xl p-6">
                <p className="text-gray-700 text-sm leading-relaxed italic mb-5">"{t.quote}"</p>
                <div className="font-semibold text-navy text-sm">{t.name}</div>
                <div className="text-gray-400 text-xs mt-0.5">{t.dest}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
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
    </>
  )
}
