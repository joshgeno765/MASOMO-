import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ARTICLES } from '../data/articles'

type Lang = 'en' | 'fr'

export default function ResourcesPage() {
  const { t, i18n } = useTranslation('blog')
  const lang = (i18n.resolvedLanguage === 'fr' ? 'fr' : 'en') as Lang

  const sorted = [...ARTICLES].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))

  return (
    <>
      <section className="bg-navy py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-4">{t('hero.eyebrow')}</p>
          <h1 className="font-serif text-3xl md:text-4xl text-white leading-tight mb-4">{t('hero.title')}</h1>
          <p className="text-white/70 text-lg">{t('hero.subtitle')}</p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {sorted.map((article) => (
            <Link
              key={article.slug}
              to={`/resources/${article.slug}`}
              className="border border-gray-200 rounded-xl p-6 hover:border-brand-gold/50 hover:-translate-y-0.5 transition-all block"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-brand-gold-dark mb-2">{article.category[lang]}</p>
              <h2 className="font-serif text-xl text-navy mb-2 leading-snug">{article.title[lang]}</h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">{article.excerpt[lang]}</p>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>{article.readTime[lang]}</span>
                <span className="font-bold text-brand-blue">{t('readMore')}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
