import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../components/ui/Button'
import { northAmerica, europe } from '../data/destinations'
import { COUNTRY_COSTS, getCountryCost, formatMoney } from '../data/costs'

type ProgramType = 'Technical / Trades' | 'Business & Management' | 'University / Academic'

const PROGRAM_TYPES: ProgramType[] = ['Technical / Trades', 'Business & Management', 'University / Academic']

// Informational adjustment only — real per-program tuition varies by school.
const PROGRAM_MODIFIER: Record<ProgramType, number> = {
  'Technical / Trades': 0.9,
  'Business & Management': 1.1,
  'University / Academic': 1.0,
}

const ALL_COUNTRIES = [...northAmerica, ...europe]

export default function CostCalculatorPage() {
  const { t } = useTranslation('calculator')
  const { t: tHome } = useTranslation('home')
  const [slug, setSlug] = useState(COUNTRY_COSTS[0].slug)
  const [programType, setProgramType] = useState<ProgramType>('University / Academic')
  const [duration, setDuration] = useState(2)

  const country = ALL_COUNTRIES.find((c) => c.slug === slug)
  const cost = getCountryCost(slug)

  const estimate = useMemo(() => {
    if (!cost) return null
    const modifier = PROGRAM_MODIFIER[programType]
    const tuitionMin = cost.tuitionMin * modifier * duration
    const tuitionMax = cost.tuitionMax * modifier * duration
    const livingMin = cost.livingMin * duration
    const livingMax = cost.livingMax * duration
    return {
      tuitionMin, tuitionMax, livingMin, livingMax,
      totalMin: tuitionMin + livingMin,
      totalMax: tuitionMax + livingMax,
    }
  }, [cost, programType, duration])

  const modifierDirection = programType === 'University / Academic'
    ? t('result.modifierNeutral')
    : PROGRAM_MODIFIER[programType] > 1 ? t('result.modifierUp') : t('result.modifierDown')

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
        <div className="max-w-2xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">{t('form.countryLabel')}</label>
              <select
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all bg-white text-gray-700"
              >
                {COUNTRY_COSTS.map((c) => {
                  const match = ALL_COUNTRIES.find((ac) => ac.slug === c.slug)
                  return (
                    <option key={c.slug} value={c.slug}>
                      {match?.flag} {tHome(`destinationsShowcase.names.${c.slug}`)}
                    </option>
                  )
                })}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">{t('form.programTypeLabel')}</label>
              <select
                value={programType}
                onChange={(e) => setProgramType(e.target.value as ProgramType)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all bg-white text-gray-700"
              >
                {PROGRAM_TYPES.map((p) => (
                  <option key={p} value={p}>{t(`programTypes.${p}`)}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">{t('form.durationLabel')}</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((y) => (
                  <button
                    key={y}
                    type="button"
                    onClick={() => setDuration(y)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-colors ${
                      duration === y ? 'bg-navy text-white border-navy' : 'border-gray-300 text-gray-600 hover:border-navy'
                    }`}
                  >
                    {t('form.years', { count: y })}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {estimate && country && (
            <div className="mt-8 bg-navy rounded-2xl p-8 text-white">
              <h2 className="font-serif text-2xl mb-1">{t('result.title', { country: tHome(`destinationsShowcase.names.${slug}`) })}</h2>
              <p className="text-white/60 text-sm mb-6">{t('result.forDuration', { count: duration })}</p>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-baseline border-b border-white/10 pb-3">
                  <span className="text-white/70 text-sm">{t('result.tuition')}</span>
                  <span className="font-semibold">{formatMoney(estimate.tuitionMin, cost!.currencyPrefix)} – {formatMoney(estimate.tuitionMax, cost!.currencyPrefix)}</span>
                </div>
                <div className="flex justify-between items-baseline border-b border-white/10 pb-3">
                  <span className="text-white/70 text-sm">{t('result.living')}</span>
                  <span className="font-semibold">{formatMoney(estimate.livingMin, cost!.currencyPrefix)} – {formatMoney(estimate.livingMax, cost!.currencyPrefix)}</span>
                </div>
                <div className="flex justify-between items-baseline pt-1">
                  <span className="text-brand-gold-light font-bold text-sm">{t('result.total')}</span>
                  <span className="font-bold text-xl text-brand-gold-light">{formatMoney(estimate.totalMin, cost!.currencyPrefix)} – {formatMoney(estimate.totalMax, cost!.currencyPrefix)}</span>
                </div>
              </div>

              {programType !== 'University / Academic' && (
                <p className="text-xs text-white/50 mb-4">
                  {t('result.modifierNote', { programType: t(`programTypes.${programType}`).toLowerCase(), direction: modifierDirection })}
                </p>
              )}

              <p className="text-xs text-white/50 mb-6">{t('result.disclaimer')}</p>

              <div className="flex flex-col gap-3">
                <Button to={`/consultation?destination=${encodeURIComponent(country.name)}`} variant="primary">{t('result.cta')}</Button>
                <a href="/pathway-finder" className="text-center text-sm font-semibold text-white/80 hover:text-white hover:underline">
                  {t('result.findPathway')}
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
