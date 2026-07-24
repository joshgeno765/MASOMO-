import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PhotoHero from '../components/ui/PhotoHero'
import IconFeatureRow from '../components/ui/IconFeatureRow'
import NumberedSteps from '../components/ui/NumberedSteps'

type ServiceItem = { icon: string; title: string; description: string }
type ProcessStep = { title: string; description: string }
type FaqItem = { q: string; a: string }

const servicePhotos = [
  '/images/seminars/seminar-2-thumb.webp',
  '/images/schools/dcu-thumb.webp',
  '/images/seminars/seminar-4-thumb.webp',
  '/images/schools/vistula-thumb.webp',
  '/images/seminars/seminar-5-thumb.webp',
  '/images/schools/bcit-thumb.webp',
]

export default function ServicesPage() {
  const { t } = useTranslation('services')

  const serviceTexts = t('whatWeHelpWith.items', { returnObjects: true }) as ServiceItem[]
  const services = servicePhotos.map((photo, i) => ({ ...serviceTexts[i], photo }))

  const process = t('process.items', { returnObjects: true }) as ProcessStep[]

  const faqs = t('faq.items', { returnObjects: true }) as FaqItem[]

  return (
    <>
      <PhotoHero
        image="/images/seminars/seminar-1.webp"
        alt={t('hero.alt')}
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        quote={t('hero.quote')}
      />

      <IconFeatureRow title={t('whatWeHelpWith.title')} columns={3} features={services} />

      {/* Our Process */}
      <NumberedSteps title={t('process.title')} steps={process} columns={4} />

      {/* FAQ */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl text-navy mb-8">{t('faq.title')}</h2>
          <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
            {faqs.map((f, i) => (
              <details key={f.q} open={i === 0} className="py-5 group">
                <summary className="flex items-center justify-between font-bold text-navy cursor-pointer">
                  {f.q}
                  <svg className="chev w-5 h-5 text-brand-gold transition-transform flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                  </svg>
                </summary>
                <p className="text-gray-600 mt-3 text-[15px] leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 pt-8 px-6">
        <div className="max-w-2xl mx-auto text-center border-t border-gray-200 pt-14">
          <h2 className="font-serif text-2xl text-navy mb-3">{t('cta.title')}</h2>
          <p className="text-gray-500 mb-6">{t('cta.body')}</p>
          <Link to="/consultation" className="text-sm font-bold text-navy border-b border-navy pb-0.5">{t('cta.link')}</Link>
        </div>
      </section>
    </>
  )
}
