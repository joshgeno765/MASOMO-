import { useTranslation } from 'react-i18next'
import PhotoHero from '../components/ui/PhotoHero'
import Button from '../components/ui/Button'
import { northAmerica, europe, oceania, asia } from '../data/destinations'

const allCountries = [...northAmerica, ...europe, ...oceania, ...asia]

export default function UniversitiesPage() {
  const { t } = useTranslation('universities')

  return (
    <>
      <PhotoHero
        image="/images/seminars/seminar-5.webp"
        alt={t('hero.alt')}
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      />

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto space-y-14">
          {allCountries.map((c) => (
            <div key={c.slug}>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{c.flag}</span>
                <h2 className="font-serif text-2xl text-navy">{c.name}</h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {c.schools.map((s) => (
                  <div key={s.name} className="border border-gray-200 rounded-lg p-5">
                    <h3 className="font-bold text-navy text-sm leading-tight mb-1">{s.name}</h3>
                    <p className="text-xs text-gray-500 mb-3">{s.type} · {s.city}</p>
                    {s.website && (
                      <a
                        href={s.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-brand-blue hover:underline"
                      >
                        {t('visitWebsite')}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-navy text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl text-white mb-3">{t('cta.title')}</h2>
          <p className="text-white/70 mb-8">{t('cta.body')}</p>
          <Button to="/pathway-finder" variant="primary">{t('cta.button')}</Button>
        </div>
      </section>
    </>
  )
}
