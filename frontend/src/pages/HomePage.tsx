import { Link } from 'react-router-dom'
import { Trans, useTranslation } from 'react-i18next'
import Button from '../components/ui/Button'
import TextImageSplit from '../components/ui/TextImageSplit'
import IconFeatureRow from '../components/ui/IconFeatureRow'
import Reveal from '../components/ui/Reveal'
import VideoEmbed from '../components/ui/VideoEmbed'

type Feature = { icon: string; title: string; description: string }
type WhoWeHelpItem = { title: string; description: string }
type Testimonial = { name: string; dest: string; quote: string }

const destinationShowcase = [
  { slug: 'canada', image: '/images/schools/bcit-thumb.webp' },
  { slug: 'united-states', image: '/images/schools/lwtech-thumb.webp' },
  { slug: 'ireland', image: '/images/schools/dcu-thumb.webp' },
  { slug: 'germany', image: '/images/schools/cbs-thumb.webp' },
  { slug: 'poland', image: '/images/schools/vistula-thumb.webp' },
]

const whoWeHelpPhotos = [
  '/images/seminars/seminar-3-thumb.webp',
  '/images/schools/lwtech-thumb.webp',
  '/images/schools/tru-thumb.webp',
  '/images/schools/bcit-thumb.webp',
]

const flags: Record<string, string> = {
  canada: '🇨🇦',
  'united-states': '🇺🇸',
  ireland: '🇮🇪',
  germany: '🇩🇪',
  poland: '🇵🇱',
}

const partnerMarquee = [
  'BCIT', 'TRU', 'University of Lethbridge', 'Northern Lights College', 'North Island College',
  'Saskatchewan Polytechnic', 'Fanshawe College', 'University Canada West',
  'Lake Washington Institute of Technology', 'Seattle Colleges', 'DCU', 'Griffith College',
  'CBS International Business School', 'BSBI', 'Gisma University of Applied Sciences', 'Vistula University',
  'Engineering Institute of Technology', 'CUCAS',
]

export default function HomePage() {
  const { t } = useTranslation('home')

  const features = t('whyChooseUs.features', { returnObjects: true }) as Feature[]
  const whoWeHelp = t('whoWeHelp.items', { returnObjects: true }) as WhoWeHelpItem[]
  const testimonials = t('testimonials.items', { returnObjects: true }) as Testimonial[]

  return (
    <>
      <div className="bg-brand-gold text-black py-2.5 px-4 text-sm font-semibold flex flex-col sm:flex-row flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
        <a
          href="https://rcic.link/r731358"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-bold underline decoration-black/40 underline-offset-2 rounded-full px-2.5 py-1 hover:bg-black/10 hover:decoration-2 hover:decoration-black transition-all"
        >
          🇨🇦 ✔️ {t('trust.badge')} ↗
        </a>
        <span className="w-full sm:w-auto sm:flex-1 text-center min-w-0">
          {t('banner.text')}{' '}
          <Link to="/pathway-finder?ref=fmc-pilot" className="underline font-bold hover:text-black/70">{t('banner.cta')}</Link>
        </span>
      </div>

      {/* Split hero — two distinct paths, no photo to compete with the choice */}
      <section className="relative">
        <div className="grid md:grid-cols-2">
          <div className="bg-navy px-6 py-16 md:py-28 flex items-center">
            <div className="max-w-md mx-auto md:mx-0 md:ml-auto md:mr-16">
              <p className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-4">{t('hero.students.eyebrow')}</p>
              <h1 className="font-serif text-4xl md:text-6xl text-white leading-[1.1] mb-5">{t('hero.students.title')}</h1>
              <p className="text-white/75 text-base md:text-lg leading-relaxed mb-8">
                {t('hero.students.body')}
              </p>
              <Button to="/pathway-finder" variant="primary">{t('hero.students.cta')}</Button>
            </div>
          </div>

          <div className="bg-navy px-6 py-16 md:py-28 flex items-center">
            <div className="max-w-md mx-auto md:mx-0 md:mr-auto md:ml-16">
              <p className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-4">{t('hero.workers.eyebrow')}</p>
              <h2 className="font-serif text-4xl md:text-6xl text-white leading-[1.1] mb-5">{t('hero.workers.title')}</h2>
              <p className="text-white/75 text-base md:text-lg leading-relaxed mb-8">
                {t('hero.workers.body')}
              </p>
              <Button to="/fmc-pilot" variant="outline">{t('hero.workers.cta')}</Button>
            </div>
          </div>
        </div>

        {/* "Or" divider between the two paths */}
        <div className="flex items-center gap-3 px-6 py-3 md:hidden bg-navy">
          <span className="flex-1 h-px bg-white/20" />
          <span className="text-xs font-bold text-white/60 uppercase tracking-widest">{t('hero.or')}</span>
          <span className="flex-1 h-px bg-white/20" />
        </div>
        <div className="hidden md:flex absolute inset-y-0 left-1/2 -translate-x-1/2 items-center z-10">
          <span className="bg-white text-navy text-xs font-bold uppercase tracking-widest rounded-full w-12 h-12 flex items-center justify-center shadow-lg">{t('hero.or')}</span>
        </div>
      </section>

      {/* Trust quote */}
      <div className="bg-navy-mid py-6 px-6 text-center border-t border-white/10">
        <p className="text-brand-gold-light text-xs font-bold uppercase tracking-widest mb-2">{t('trust.eyebrow')}</p>
        <p className="text-white/80 text-base italic max-w-2xl mx-auto">
          {t('trust.quote')}
        </p>
      </div>

      <TextImageSplit
        image="/images/seminars/seminar-4.webp"
        alt="Masomo Now counselor presenting Northern Lights College's British Columbia campuses"
        title={t('welcome.title')}
        imageSide="left"
        cta={<Link to="/about" className="text-brand-blue text-sm font-bold hover:underline">{t('welcome.learnMore')}</Link>}
      >
        <p>
          <Trans
            i18nKey="welcome.p1"
            t={t}
            components={{ 1: <a href="https://elimunow.com" target="_blank" rel="noopener noreferrer" className="text-navy font-bold hover:underline" /> }}
          />
        </p>
        <p>{t('welcome.p2')}</p>
      </TextImageSplit>

      {/* Featured partner video — TRU */}
      <section className="py-16 px-6 bg-gray-50 border-y border-gray-200">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-gold-dark mb-3">{t('video.eyebrow')}</p>
          <h2 className="font-serif text-3xl text-navy mb-6">{t('video.title')}</h2>
          <VideoEmbed videoId="6jc9QVVUC8Q" title="TRU Campus Tour 2024" autoplay />
          <p className="text-xs text-gray-500 mt-4">{t('video.caption')}</p>
        </div>
      </section>

      <IconFeatureRow
        title={t('whyChooseUs.title')}
        features={features}
      />

      {/* Destinations showcase */}
      <Reveal>
        <section className="py-16 px-6 bg-navy">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-2xl mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-gold-light mb-3">{t('destinationsShowcase.eyebrow')}</p>
              <h2 className="font-serif text-3xl text-white">{t('destinationsShowcase.title')}</h2>
              <p className="text-white/60 text-lg mt-3">{t('destinationsShowcase.subtitle')}</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {destinationShowcase.map((d) => (
                <Link key={d.slug} to={`/destinations#${d.slug}`} className="group relative rounded-lg overflow-hidden h-72 block">
                  <img src={d.image} alt={t(`destinationsShowcase.names.${d.slug}`)} loading="lazy" className="absolute inset-0 w-full h-full object-cover photo-grade group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/30 to-transparent" />
                  <div className="absolute bottom-0 p-5">
                    <p className="text-xs font-semibold uppercase mb-1">{flags[d.slug]}</p>
                    <p className="text-white font-bold text-base leading-tight">{t(`destinationsShowcase.names.${d.slug}`)}</p>
                    <p className="text-white/60 text-xs mt-1">{t(`destinationsShowcase.counts.${d.slug}`)}</p>
                    <span className="inline-block mt-3 text-xs font-semibold text-white/90 border-b border-brand-gold-light">{t('destinationsShowcase.explore')}</span>
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
              <p className="text-xs font-bold uppercase tracking-widest text-brand-gold-dark mb-3">{t('whoWeHelp.eyebrow')}</p>
              <h2 className="font-serif text-3xl text-navy">{t('whoWeHelp.title')}</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {whoWeHelp.map((w, i) => (
                <div key={w.title} className="border border-gray-200 rounded-xl p-7 hover:border-brand-gold/50 transition-colors">
                  <img src={whoWeHelpPhotos[i]} alt="" loading="lazy" className="w-14 h-14 rounded-lg object-cover photo-grade mb-4" />
                  <h3 className="font-bold text-navy text-lg mb-2">{w.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{w.description}</p>
                  <Link to="/pathway-finder" className="text-sm font-semibold text-brand-blue hover:underline">{t('whoWeHelp.findPathway')}</Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Partner marquee */}
      <section className="py-14 border-y border-gray-200 overflow-hidden bg-gray-50">
        <p className="text-center font-serif text-2xl text-navy mb-1">{t('partners.title')}</p>
        <p className="text-center text-sm text-gray-500 mb-8">{t('partners.subtitle')}</p>
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
          <Link to="/destinations" className="text-sm font-bold text-brand-blue hover:underline">{t('partners.viewAll')}</Link>
        </p>
      </section>

      {/* Recent students */}
      <Reveal>
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-3xl text-navy mb-10">{t('testimonials.title')}</h2>
            <div className="flex gap-5 overflow-x-auto pb-2">
              {testimonials.map((item) => (
                <div key={item.name} className="flex-shrink-0 w-80 bg-white border border-gray-200 rounded-2xl p-6">
                  <p className="text-gray-700 text-sm leading-relaxed italic mb-5">"{item.quote}"</p>
                  <div className="font-semibold text-navy text-sm">{item.name}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{item.dest}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Graduation */}
      <Reveal>
        <section className="py-16 px-6 bg-gray-50">
          <figure className="max-w-sm mx-auto rounded-2xl overflow-hidden shadow-sm">
            <img
              src="/images/team/graduation-1.webp"
              alt="A Masomo Now / ELIMU student at their Canadian convocation"
              loading="lazy"
              className="w-full h-96 object-cover object-top photo-grade"
            />
            <figcaption className="bg-white px-5 py-4 text-sm text-gray-600 text-center">
              {t('graduation.caption')}
            </figcaption>
          </figure>
        </section>
      </Reveal>

      {/* CTA */}
      <Reveal>
        <section className="py-20 px-6 bg-navy text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl text-white mb-3">{t('cta.title')}</h2>
            <p className="text-white/70 mb-8">{t('cta.body')}</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Button to="/consultation" variant="primary">{t('cta.bookFree')}</Button>
              <Button to="/pathway-finder" variant="outline">{t('cta.findPathway')}</Button>
            </div>
          </div>
        </section>
      </Reveal>
    </>
  )
}
