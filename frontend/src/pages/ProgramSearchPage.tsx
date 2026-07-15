import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { northAmerica, europe, FMC_INSTITUTIONS } from '../data/destinations'
import Button from '../components/ui/Button'

interface SearchableSchool {
  name: string
  programs: string[]
  countryName: string
  countryFlag: string
  destinationLink: string
  city?: string
  website?: string
  isFmc: boolean
}

type FilterKey = 'business' | 'engineering' | 'it' | 'health' | 'trades' | 'artsScience' | 'law' | 'hospitality'

const FILTER_KEYWORDS: Record<FilterKey, string[]> = {
  business: ['business', 'management', 'finance', 'accounting', 'administration', 'marketing', 'entrepreneurship', 'commerce', 'economics'],
  engineering: ['engineering', 'construction', 'manufacturing', 'architecture', 'aerospace'],
  it: ['computer', 'computing', 'information technology', 'digital', 'data science', 'cybersecurity', 'informatics'],
  health: ['health', 'nursing', 'medicine', 'medical'],
  trades: ['trade', 'apprenticeship', 'welding', 'automotive', 'electrical', 'transportation'],
  artsScience: ['arts', 'science', 'humanities', 'social', 'liberal', 'psychology'],
  law: ['law', 'justice'],
  hospitality: ['hospitality', 'tourism', 'culinary'],
}

const FILTER_ORDER: FilterKey[] = ['business', 'engineering', 'it', 'health', 'trades', 'artsScience', 'law', 'hospitality']

function buildSchools(): SearchableSchool[] {
  const fromCountries = [...northAmerica, ...europe].flatMap((c) =>
    c.schools.map((s) => ({
      name: s.name,
      programs: s.programs ?? [],
      countryName: c.name,
      countryFlag: c.flag,
      destinationLink: `/destinations#${c.slug}`,
      city: s.city,
      website: s.website,
      isFmc: false,
    }))
  )
  const fromFmc = FMC_INSTITUTIONS.flatMap((g) =>
    g.schools.map((s) => ({
      name: s.name,
      programs: s.programs ?? [],
      countryName: `Canada — ${g.province}`,
      countryFlag: '🇨🇦',
      destinationLink: '/fmc-pilot',
      city: g.province,
      website: undefined,
      isFmc: true,
    }))
  )
  return [...fromCountries, ...fromFmc]
}

const ALL_SCHOOLS = buildSchools()

export default function ProgramSearchPage() {
  const { t } = useTranslation('programs')
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<FilterKey | null>(null)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return ALL_SCHOOLS.filter((school) => {
      const matchesQuery = !q || school.name.toLowerCase().includes(q) || school.programs.some((p) => p.toLowerCase().includes(q))
      const matchesFilter = !activeFilter || school.programs.some((p) =>
        FILTER_KEYWORDS[activeFilter].some((kw) => p.toLowerCase().includes(kw))
      )
      return matchesQuery && matchesFilter && school.programs.length > 0
    })
  }, [query, activeFilter])

  return (
    <>
      <section className="bg-navy py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-4">{t('hero.eyebrow')}</p>
          <h1 className="font-serif text-3xl md:text-4xl text-white leading-tight mb-4">{t('hero.title')}</h1>
          <p className="text-white/70 text-lg">{t('hero.subtitle')}</p>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search.placeholder')}
            className="w-full border border-gray-300 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all mb-4"
          />

          <div className="flex flex-wrap gap-2 mb-8">
            {FILTER_ORDER.map((key) => (
              <button
                key={key}
                onClick={() => setActiveFilter(activeFilter === key ? null : key)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                  activeFilter === key ? 'bg-navy text-white border-navy' : 'border-gray-300 text-gray-600 hover:border-navy'
                }`}
              >
                {t(`filters.${key}`)}
              </button>
            ))}
            {(query || activeFilter) && (
              <button
                onClick={() => { setQuery(''); setActiveFilter(null) }}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-gray-400 hover:text-navy underline"
              >
                {t('search.clear')}
              </button>
            )}
          </div>

          <p className="text-sm text-gray-500 mb-6">{t('search.resultsCount', { count: results.length })}</p>

          {results.length === 0 ? (
            <p className="text-gray-500 text-sm py-12 text-center">{t('search.noResults')}</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {results.map((school) => (
                <div key={`${school.name}-${school.countryName}`} className="border border-gray-200 rounded-xl p-5">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h3 className="font-bold text-navy text-base leading-tight">{school.name}</h3>
                    {school.isFmc && (
                      <span className="flex-shrink-0 text-[10px] font-bold uppercase tracking-wide bg-brand-gold/20 text-brand-gold-dark px-2 py-1 rounded-full">
                        {t('card.fmcBadge')}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mb-3">{school.countryFlag} {school.countryName}{school.city && !school.isFmc ? ` · ${school.city}` : ''}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {school.programs.map((p) => (
                      <span key={p} className="text-[11px] bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{p}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-xs font-bold">
                    {school.website && (
                      <a href={school.website} target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline">
                        {t('card.visitWebsite')}
                      </a>
                    )}
                    <Link to={school.destinationLink} className="text-brand-blue hover:underline">
                      {t('card.viewDestination')}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 px-6 bg-navy text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl text-white mb-3">{t('cta.title')}</h2>
          <p className="text-white/70 mb-8">{t('cta.body')}</p>
          <Button to="/pathway-finder" variant="primary">{t('cta.findPathway')}</Button>
        </div>
      </section>
    </>
  )
}
