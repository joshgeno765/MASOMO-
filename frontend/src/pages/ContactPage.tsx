import { useTranslation } from 'react-i18next'
import PhotoHero from '../components/ui/PhotoHero'
import Button from '../components/ui/Button'
import { OFFICES } from '../data/offices'

export default function ContactPage() {
  const { t } = useTranslation('contact')

  return (
    <>
      <PhotoHero
        image="/images/seminars/seminar-2.webp"
        alt="Masomo Now / ELIMU education symposium in Nairobi, Kenya"
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        quote={t('hero.quote')}
      />

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {OFFICES.map((o) => (
              <div key={o.city} className={`rounded-xl p-6 ${o.comingSoon ? 'border-2 border-dashed border-gray-300' : 'border-2 border-navy/10'}`}>
                <div className={`text-3xl mb-2 ${o.comingSoon ? 'grayscale opacity-60' : ''}`}>{o.flag}</div>
                <h3 className={`font-bold text-lg ${o.comingSoon ? 'text-gray-500' : 'text-navy'}`}>{o.city}</h3>
                <p className="text-sm text-gray-500 mb-4">{o.country}</p>
                {o.comingSoon ? (
                  <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-gold-dark bg-brand-gold/10 px-2.5 py-1 rounded-full">{t('comingSoon')}</span>
                ) : (
                  <>
                    <a href={`mailto:${o.email}`} className="block text-sm text-brand-blue hover:underline mb-1 break-all">{o.email}</a>
                    <a href={`tel:${o.phone!.replace(/[^\d+]/g, '')}`} className="block text-sm text-gray-600 hover:text-navy">{o.phone}</a>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-navy text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl text-white mb-3">{t('cta.title')}</h2>
          <p className="text-white/70 mb-8">{t('cta.body')}</p>
          <Button to="/consultation" variant="primary">{t('cta.button')}</Button>
        </div>
      </section>
    </>
  )
}
