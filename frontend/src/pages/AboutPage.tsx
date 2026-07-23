import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Trans, useTranslation } from 'react-i18next'
import PhotoHero from '../components/ui/PhotoHero'
import TextImageSplit from '../components/ui/TextImageSplit'
import IconFeatureRow from '../components/ui/IconFeatureRow'
import { OFFICES } from '../data/offices'

type CredentialItem = { icon: string; title: string; description: string }
type ValueTextItem = { title: string; desc: string }

const valueNums = ['01', '02', '03', '04']

const seminarPhotos = [
  '/images/seminars/seminar-3.webp',
  '/images/seminars/seminar-5-thumb.webp',
  '/images/seminars/seminar-2-thumb.webp',
  '/images/seminars/seminar-4-thumb.webp',
  '/images/seminars/seminar-1-thumb.webp',
  '/images/seminars/seminar-6-thumb.webp',
]

const teamPhotos = [
  '/images/team/team-1-thumb.webp',
  '/images/team/team-2-thumb.webp',
  '/images/team/team-3-thumb.webp',
]

export default function AboutPage() {
  const { hash } = useLocation()
  const { t } = useTranslation('about')

  useEffect(() => {
    if (!hash) return
    const el = document.querySelector(hash)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [hash])

  const credentials = t('credentials.items', { returnObjects: true }) as CredentialItem[]

  const valueTexts = t('values.items', { returnObjects: true }) as ValueTextItem[]
  const values = valueNums.map((num, i) => ({ num, title: valueTexts[i].title, desc: valueTexts[i].desc }))

  const seminarCaptions = t('seminars.items', { returnObjects: true }) as string[]
  const seminars = seminarPhotos.map((src, i) => ({ src, caption: seminarCaptions[i] }))

  const teamCaptions = t('team.items', { returnObjects: true }) as string[]
  const team = teamPhotos.map((src, i) => ({ src, caption: teamCaptions[i] }))

  return (
    <>
      <PhotoHero
        image="/images/seminars/seminar-2.webp"
        alt={t('hero.alt')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        quote={t('hero.quote')}
      />

      <TextImageSplit
        image="/images/seminars/seminar-4.webp"
        alt={t('story.alt')}
        title={t('story.title')}
        imageSide="right"
      >
        <p>
          <Trans
            i18nKey="story.p1"
            t={t}
            components={{ 1: <a href="https://elimunow.com" target="_blank" rel="noopener noreferrer" className="text-navy font-bold hover:underline" /> }}
          />
        </p>
        <p>{t('story.p2')}</p>
      </TextImageSplit>

      <IconFeatureRow
        title={t('credentials.title')}
        features={credentials}
      />

      {/* Offices */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl text-navy mb-3">{t('offices.title')}</h2>
          <p className="text-gray-500 mb-8">{t('offices.subtitle')}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {OFFICES.map((o) => (
              <div key={o.city} className={`rounded-xl p-5 ${o.comingSoon ? 'border-2 border-dashed border-gray-300' : 'border-2 border-navy/10'}`}>
                <div className={`text-3xl mb-2 ${o.comingSoon ? 'grayscale opacity-60' : ''}`}>{o.flag}</div>
                <h3 className={`font-bold ${o.comingSoon ? 'text-gray-500' : 'text-navy'}`}>{o.city}</h3>
                <p className="text-xs text-gray-500 mb-3">{o.country}</p>
                {o.comingSoon ? (
                  <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-brand-gold-dark bg-brand-gold/10 px-2 py-1 rounded-full">{t('offices.comingSoon')}</span>
                ) : (
                  <>
                    <a href={`mailto:${o.email}`} className="block text-xs text-brand-blue hover:underline mb-1 break-all">{o.email}</a>
                    <a href={`tel:${o.phone!.replace(/[^\d+]/g, '')}`} className="block text-xs text-gray-600 hover:text-navy">{o.phone}</a>
                  </>
                )}
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
          <p className="text-xs font-bold uppercase tracking-widest text-brand-gold-dark mb-3">{t('seminars.eyebrow')}</p>
          <h2 className="font-serif text-4xl text-navy mb-3">{t('seminars.title')}</h2>
          <p className="text-gray-600 text-lg mb-12 max-w-2xl">
            {t('seminars.body')}
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {seminars.map((s, i) => (
              <figure key={s.src} className={`overflow-hidden rounded-xl ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                <img src={s.src} alt={s.caption} loading="lazy" className={`w-full object-cover photo-grade ${i === 0 ? 'h-full min-h-[20rem]' : 'h-48'}`} />
                <figcaption className="bg-white px-4 py-3 text-xs text-gray-500 leading-relaxed">{s.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-6 bg-navy">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-4xl text-white mb-5">{t('team.title')}</h2>
          <p className="text-white/70 text-lg leading-relaxed">
            {t('team.body')}
          </p>
        </div>
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-5 mt-12 text-left">
          {team.map((m) => (
            <figure key={m.src} className="rounded-xl overflow-hidden">
              <img src={m.src} alt={m.caption} loading="lazy" className="w-full h-56 object-cover photo-grade" />
              <figcaption className="text-white/50 text-xs mt-2 leading-relaxed">{m.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  )
}
