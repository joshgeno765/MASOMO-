import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Country, School, northAmerica, europe, oceania, asia, comingSoon } from '../data/destinations'
import Button from '../components/ui/Button'
import VideoEmbed from '../components/ui/VideoEmbed'
import PhotoHero from '../components/ui/PhotoHero'

interface ActiveVideo {
  videoId: string
  title: string
}

type CompareRow = { tuition: string; living: string; work: string; gradVisa: string }

function SchoolCard({ s, onPlayVideo, t }: { s: School; onPlayVideo: (v: ActiveVideo) => void; t: (key: string) => string }) {
  return (
    <div className="group relative h-40 rounded-lg overflow-hidden border border-gray-200 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      {s.photo ? (
        <>
          <img src={s.photo} alt={`${s.name}, ${s.city}`} loading="lazy" className="absolute inset-0 w-full h-full object-cover photo-grade transition-transform duration-300 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/40 to-transparent" />
        </>
      ) : (
        <div className="absolute inset-0 bg-navy" />
      )}
      <div className="relative h-full flex flex-col justify-end p-4">
        <div className="font-semibold text-white text-sm leading-tight">{s.name}</div>
        <div className="text-[11px] text-white/60 mb-1.5">{s.type} · {s.city}</div>
        <div className="flex items-center gap-3">
          <a
            href={s.website}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${s.name} official website`}
            className="text-[11px] font-bold text-brand-gold-light w-fit border-b border-brand-gold-light/50 hover:border-brand-gold-light"
          >
            {t('school.visitWebsite')}
          </a>
          {s.videoId && (
            <button
              onClick={() => onPlayVideo({ videoId: s.videoId!, title: s.videoTitle ?? s.name })}
              className="text-[11px] font-bold text-white w-fit border-b border-white/50 hover:border-white"
            >
              {t('school.watchVideo')}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function CountryBlock({ d, onPlayVideo, t }: { d: Country; onPlayVideo: (v: ActiveVideo) => void; t: ReturnType<typeof useTranslation>['t'] }) {
  const tagline = t(`countries.${d.slug}.tagline`)
  const desc = t(`countries.${d.slug}.desc`)
  const pros = t(`countries.${d.slug}.pros`, { returnObjects: true }) as string[]
  const linkLabel = t(`countries.${d.slug}.linkLabel`)
  const factValues = t(`countries.${d.slug}.factValues`, { returnObjects: true }) as string[]

  return (
    <div id={d.slug} className="py-12 scroll-mt-20">
      {/* Header */}
      <div className="flex items-start gap-5 mb-8">
        <span className="text-4xl">{d.flag}</span>
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="font-serif text-2xl text-navy">{d.name}</h2>
          </div>
          <p className="text-gray-500 text-sm mt-1">{tagline}</p>
        </div>
        <Link to={d.link} className="hidden md:inline-flex text-sm font-bold text-brand-blue hover:underline">
          {linkLabel}
        </Link>
      </div>

      {/* Partner school photo cards */}
      <div className={`grid gap-4 mb-10 ${d.schools.length >= 3 ? 'md:grid-cols-3' : d.schools.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-1 max-w-sm'}`}>
        {d.schools.map((s) => (<SchoolCard key={s.name} s={s} onPlayVideo={onPlayVideo} t={t} />))}
      </div>

      {/* Body */}
      <div className="grid md:grid-cols-3 gap-10">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">{t('sectionLabels.keyFacts')}</h3>
          <div className="space-y-2.5">
            {d.facts.map((f, i) => (
              <div key={f.label} className="flex justify-between gap-4 border-b border-gray-100 pb-2.5">
                <span className="text-sm text-gray-500">{t(`factLabels.${f.label}`, { defaultValue: f.label })}</span>
                <span className="text-sm font-semibold text-navy text-right">{factValues[i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">{t('sectionLabels.overview')}</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">{t('sectionLabels.why', { country: d.name })}</h3>
          <ul className="space-y-2.5">
            {pros.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-sm text-gray-600">
                <img src="/images/elimu-logo.png" alt="" className="w-3.5 h-auto mt-1 flex-shrink-0" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile CTA */}
      <div className="md:hidden mt-6">
        <Link to={d.link} className="text-sm font-bold text-brand-blue hover:underline">
          {linkLabel}
        </Link>
      </div>
    </div>
  )
}

export default function StudyDestinationsPage() {
  const { t } = useTranslation('destinations')
  const [activeVideo, setActiveVideo] = useState<ActiveVideo | null>(null)
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const el = document.querySelector(hash)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [hash])

  const compareHeaders = t('compare.headers', { returnObjects: true }) as string[]
  const compareRows = t('compare.rows', { returnObjects: true }) as Record<string, CompareRow>
  const allCountries = [...northAmerica, ...europe, ...oceania, ...asia]

  return (
    <>
      <PhotoHero
        image="/images/schools/tru.webp"
        alt="Thompson Rivers University campus entrance"
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        quote={t('hero.quote')}
      />

      {/* Featured partner video — BCIT */}
      <section className="py-16 px-6 bg-gray-50 border-b border-gray-200">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-gold-dark mb-3">{t('video.eyebrow')}</p>
          <h2 className="font-serif text-3xl text-navy mb-6">{t('video.title')}</h2>
          <VideoEmbed videoId="CKl8mhU_eR0" title="BCIT | Burnaby Campus Tour" autoplay />
          <p className="text-xs text-gray-500 mt-4">{t('video.caption')}</p>
        </div>
      </section>

      {/* North America */}
      <section className="pt-16 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-gold-dark mb-1">{t('region.label')}</p>
          <h2 className="font-serif text-3xl text-navy">{t('region.northAmerica')}</h2>
        </div>
      </section>
      <section className="px-6">
        <div className="max-w-6xl mx-auto divide-y divide-gray-200">
          {northAmerica.map((d) => (<CountryBlock key={d.name} d={d} onPlayVideo={setActiveVideo} t={t} />))}
        </div>
      </section>

      {/* Europe */}
      <section className="pt-4 px-6">
        <div className="max-w-6xl mx-auto border-t border-gray-200 pt-12">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-gold-dark mb-1">{t('region.label')}</p>
          <h2 className="font-serif text-3xl text-navy">{t('region.europe')}</h2>
        </div>
      </section>
      <section className="px-6">
        <div className="max-w-6xl mx-auto divide-y divide-gray-200">
          {europe.map((d) => (<CountryBlock key={d.name} d={d} onPlayVideo={setActiveVideo} t={t} />))}
        </div>
      </section>

      {/* Oceania */}
      <section className="pt-4 px-6">
        <div className="max-w-6xl mx-auto border-t border-gray-200 pt-12">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-gold-dark mb-1">{t('region.label')}</p>
          <h2 className="font-serif text-3xl text-navy">{t('region.oceania')}</h2>
        </div>
      </section>
      <section className="px-6">
        <div className="max-w-6xl mx-auto divide-y divide-gray-200">
          {oceania.map((d) => (<CountryBlock key={d.name} d={d} onPlayVideo={setActiveVideo} t={t} />))}
        </div>
      </section>

      {/* Asia */}
      <section className="pt-4 px-6">
        <div className="max-w-6xl mx-auto border-t border-gray-200 pt-12">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-gold-dark mb-1">{t('region.label')}</p>
          <h2 className="font-serif text-3xl text-navy">{t('region.asia')}</h2>
        </div>
      </section>
      <section className="px-6">
        <div className="max-w-6xl mx-auto divide-y divide-gray-200">
          {asia.map((d) => (<CountryBlock key={d.name} d={d} onPlayVideo={setActiveVideo} t={t} />))}
        </div>
      </section>

      {/* Coming soon regions */}
      {comingSoon.length > 0 && (
        <section className="py-16 px-6 bg-gray-50 border-t border-b border-gray-200">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-gold-dark mb-1">{t('comingSoon.eyebrow')}</p>
            <h2 className="font-serif text-3xl text-navy mb-8">{t('comingSoon.title')}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {comingSoon.map((c) => (
                <div key={c.region} className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                  <div className="text-4xl mb-3">{c.flags}</div>
                  <div className="font-serif text-xl text-navy mb-1">{c.region}</div>
                  <div className="text-sm text-gray-500">{c.note ? t('comingSoon.japanNote') : t('comingSoon.placeholder')}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      <p className="text-xs text-gray-500 text-center px-6 py-6 max-w-6xl mx-auto">
        {t('comingSoon.photoCredits')}
      </p>

      {/* Compare Destinations */}
      <section className="py-16 px-6 bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl text-navy mb-8">{t('compare.title')}</h2>
          <div className="overflow-x-auto border border-gray-200 rounded-lg bg-white">
            <table className="w-full text-sm min-w-[720px]">
              <thead>
                <tr className="border-b border-gray-200">
                  {compareHeaders.map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allCountries.map((c, i) => {
                  const row = compareRows[c.slug]
                  return (
                    <tr key={c.name} className={i < allCountries.length - 1 ? 'border-b border-gray-100' : ''}>
                      <td className="px-4 py-3 font-semibold text-navy whitespace-nowrap">{c.flag} {c.name}</td>
                      <td className="px-4 py-3 text-gray-600">{row.tuition}</td>
                      <td className="px-4 py-3 text-gray-600">{row.living}</td>
                      <td className="px-4 py-3 text-gray-600">{row.work}</td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{row.gradVisa}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            {t('compare.disclaimer')}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-navy">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl text-white mb-3">{t('cta.title')}</h2>
          <p className="text-white/70 mb-8">{t('cta.body')}</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Button to="/pathway-finder" variant="primary">{t('cta.findPathway')}</Button>
            <Button to="/consultation" variant="outline">{t('cta.bookFree')}</Button>
          </div>
        </div>
      </section>

      {/* Video lightbox */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6"
          onClick={() => setActiveVideo(null)}
        >
          <div className="w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <VideoEmbed videoId={activeVideo.videoId} title={activeVideo.title} />
            <button
              onClick={() => setActiveVideo(null)}
              className="mt-4 text-white text-sm font-semibold hover:underline"
            >
              ✕ Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}
