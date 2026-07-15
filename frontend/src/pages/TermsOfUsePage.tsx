import { Trans, useTranslation } from 'react-i18next'

export default function TermsOfUsePage() {
  const { t } = useTranslation('legal')

  return (
    <section className="py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-gold-dark mb-3">{t('terms.eyebrow')}</p>
        <h1 className="font-serif text-3xl md:text-4xl text-navy mb-2">{t('terms.title')}</h1>
        <p className="text-sm text-gray-500 mb-10">{t('terms.lastUpdated')}</p>

        <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed space-y-8">
          <p>
            {t('terms.intro')}
          </p>

          <div>
            <h2 className="font-serif text-xl text-navy mb-3">{t('terms.ourServices.title')}</h2>
            <p>
              {t('terms.ourServices.body')}
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-navy mb-3">{t('terms.noGuarantee.title')}</h2>
            <p>
              {t('terms.noGuarantee.body')}
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-navy mb-3">{t('terms.accuracy.title')}</h2>
            <p>
              {t('terms.accuracy.body')}
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-navy mb-3">{t('terms.contentIp.title')}</h2>
            <p>
              {t('terms.contentIp.body')}
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-navy mb-3">{t('terms.links.title')}</h2>
            <p>
              {t('terms.links.body')}
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-navy mb-3">{t('terms.liability.title')}</h2>
            <p>
              {t('terms.liability.body')}
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-navy mb-3">{t('terms.governingLaw.title')}</h2>
            <p>{t('terms.governingLaw.body')}</p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-navy mb-3">{t('terms.changes.title')}</h2>
            <p>{t('terms.changes.body')}</p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-navy mb-3">{t('terms.contact.title')}</h2>
            <p>
              <Trans
                i18nKey="terms.contact.body"
                t={t}
                components={{ 1: <a href="mailto:info@masomonow.com" className="text-brand-blue hover:underline" /> }}
              />
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
