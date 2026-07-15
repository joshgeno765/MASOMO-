import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getArticleBySlug } from '../data/articles'
import Button from '../components/ui/Button'

type Lang = 'en' | 'fr'

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const { t, i18n } = useTranslation('blog')
  const lang = (i18n.resolvedLanguage === 'fr' ? 'fr' : 'en') as Lang
  const article = slug ? getArticleBySlug(slug) : undefined

  if (!article) {
    return (
      <section className="py-24 px-6 text-center">
        <h1 className="font-serif text-3xl text-navy mb-3">{t('notFound.title')}</h1>
        <p className="text-gray-500 mb-8">{t('notFound.body')}</p>
        <Link to="/resources" className="text-brand-blue font-bold hover:underline">{t('notFound.back')}</Link>
      </section>
    )
  }

  const publishedDate = new Date(article.publishedAt).toLocaleDateString(lang === 'fr' ? 'fr-CA' : 'en-CA', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <>
      <section className="bg-navy py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <Link to="/resources" className="text-brand-gold-light text-sm font-semibold hover:underline mb-6 inline-block">
            {t('backToResources')}
          </Link>
          <p className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-3">{article.category[lang]}</p>
          <h1 className="font-serif text-3xl md:text-4xl text-white leading-tight mb-4">{article.title[lang]}</h1>
          <p className="text-white/60 text-sm">{t('publishedOn', { date: publishedDate })} · {article.readTime[lang]}</p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-8">
          {article.sections.map((section) => (
            <div key={section.heading[lang]}>
              <h2 className="font-serif text-xl text-navy mb-3">{section.heading[lang]}</h2>
              <p className="text-gray-600 leading-relaxed">{section.body[lang]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-50 border-t border-gray-200">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-2xl text-navy mb-3">{t('relatedCta.title')}</h2>
          <p className="text-gray-600 mb-8">{t('relatedCta.body')}</p>
          <Button to="/consultation" variant="primary">{t('relatedCta.cta')}</Button>
        </div>
      </section>
    </>
  )
}
