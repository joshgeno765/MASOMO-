import { Trans, useTranslation } from 'react-i18next'

type CollectItem = { label: string; text: string }

export default function PrivacyPolicyPage() {
  const { t } = useTranslation('legal')

  const collectItems = t('privacy.whatWeCollect.items', { returnObjects: true }) as CollectItem[]

  return (
    <section className="py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-gold-dark mb-3">{t('privacy.eyebrow')}</p>
        <h1 className="font-serif text-3xl md:text-4xl text-navy mb-2">{t('privacy.title')}</h1>
        <p className="text-sm text-gray-500 mb-10">{t('privacy.lastUpdated')}</p>

        <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed space-y-8">
          <p>
            <Trans
              i18nKey="privacy.intro"
              t={t}
              components={{ 1: <strong className="text-navy" /> }}
            />
          </p>

          <div>
            <h2 className="font-serif text-xl text-navy mb-3">{t('privacy.whatWeCollect.title')}</h2>
            <p className="mb-3">{t('privacy.whatWeCollect.intro')}</p>
            <ul className="list-disc pl-6 space-y-2">
              {collectItems.map((item) => (
                <li key={item.label}><strong>{item.label}</strong> — {item.text}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-xl text-navy mb-3">{t('privacy.howWeUseIt.title')}</h2>
            <p>
              {t('privacy.howWeUseIt.body')}
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-navy mb-3">{t('privacy.whoCanSeeIt.title')}</h2>
            <p>
              {t('privacy.whoCanSeeIt.body')}
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-navy mb-3">{t('privacy.cookies.title')}</h2>
            <p>
              {t('privacy.cookies.body')}
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-navy mb-3">{t('privacy.retention.title')}</h2>
            <p>
              {t('privacy.retention.body')}
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-navy mb-3">{t('privacy.yourRights.title')}</h2>
            <p>
              <Trans
                i18nKey="privacy.yourRights.body"
                t={t}
                components={{ 1: <a href="mailto:info@masomonow.com" className="text-brand-blue hover:underline" /> }}
              />
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-navy mb-3">{t('privacy.under18.title')}</h2>
            <p>
              {t('privacy.under18.body')}
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-navy mb-3">{t('privacy.changes.title')}</h2>
            <p>
              {t('privacy.changes.body')}
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-navy mb-3">{t('privacy.contact.title')}</h2>
            <p>
              <Trans
                i18nKey="privacy.contact.body"
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
