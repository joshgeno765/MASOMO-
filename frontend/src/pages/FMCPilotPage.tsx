import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FMC_ELIGIBLE_COUNTRIES } from '../data/destinations'
import Button from '../components/ui/Button'
import IconFeatureRow from '../components/ui/IconFeatureRow'
import BenefitGrid from '../components/ui/BenefitGrid'
import NumberedSteps from '../components/ui/NumberedSteps'

type Feature = { icon: string; title: string; description: string }
type Benefit = { title: string; desc: string }
type Step = { num: string; title: string; desc: string }

export default function FMCPilotPage() {
  const { t } = useTranslation('fmcPilot')

  const eligibilityPoints = t('eligibility.points', { returnObjects: true }) as Feature[]
  const benefits = t('benefits.items', { returnObjects: true }) as Benefit[]
  const steps = t('process.steps', { returnObjects: true }) as Step[]

  const infoRows: [string, string][] = [
    [t('infoTable.pilot'), t('infoTable.pilotValue')],
    [t('infoTable.managedBy'), t('infoTable.managedByValue')],
    [t('infoTable.studyLocation'), t('infoTable.studyLocationValue')],
    [t('infoTable.language'), t('infoTable.languageValue')],
    [t('infoTable.application'), t('infoTable.applicationValue')],
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 px-6">
        <img
          src="/images/seminars/seminar-4.webp"
          alt="Masomo Now counselor presenting Northern Lights College's British Columbia campuses"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/90" />
        <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-start">
          <div>
            <p className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-4">{t('hero.eyebrow')}</p>
            <h1 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-5">
              {t('hero.title')}
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              {t('hero.body')}
            </p>
            <div className="flex gap-3 flex-wrap">
              <Button to="/pathway-finder?ref=fmc-pilot" variant="primary">{t('hero.checkEligibility')}</Button>
              <a
                href="https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/fmc-student-pilot/eligibility.html"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                {t('hero.officialInfo')}
              </a>
            </div>
          </div>

          {/* Info table */}
          <div className="border border-white/20 rounded-lg overflow-hidden">
            {infoRows.map(([label, value]) => (
              <div key={label} className="flex gap-4 px-5 py-3.5 border-b border-white/10 last:border-0">
                <span className="text-white/50 text-sm w-32 flex-shrink-0">{label}</span>
                <span className="text-white text-sm font-semibold">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two pathways */}
      <section className="py-16 px-6 border-b border-gray-200 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-2xl text-navy mb-8">{t('pathways.title')}</h2>
          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 items-stretch">
            <div className="bg-white border-2 border-navy rounded-lg p-6">
              <h3 className="font-bold text-navy text-lg mb-2">{t('pathways.student.title')}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t('pathways.student.desc')}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 md:hidden">
                <span className="flex-1 h-px bg-gray-300" />
                <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">{t('pathways.or')}</span>
                <span className="flex-1 h-px bg-gray-300" />
              </div>
              <div className="hidden md:flex flex-col items-center gap-3 h-full">
                <span className="flex-1 w-px bg-gray-300" />
                <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">{t('pathways.or')}</span>
                <span className="flex-1 w-px bg-gray-300" />
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-bold text-navy text-lg mb-2">{t('pathways.worker.title')}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                {t('pathways.worker.desc')}
              </p>
              <a
                href="https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/special-instructions/francophone-mobility.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-blue text-sm font-bold hover:underline"
              >
                {t('pathways.worker.officialLink')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <div className="pt-16 px-6 text-center">
        <h2 className="font-serif text-3xl text-navy mb-2 max-w-6xl mx-auto">{t('eligibility.title')}</h2>
        <p className="text-gray-500 max-w-6xl mx-auto">{t('eligibility.subtitle')}</p>
      </div>
      <IconFeatureRow features={eligibilityPoints} />

      {/* Eligible countries */}
      <section className="pb-16 px-6 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">{t('eligibleCountries')}</p>
          <div className="flex flex-wrap gap-2">
            {FMC_ELIGIBLE_COUNTRIES.map((c) => (
              <span key={c} className="border border-gray-300 rounded px-3 py-1 text-sm text-gray-700">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <BenefitGrid title={t('benefits.title')} items={benefits} variant="rule" columns={2} wrapperBg="gray-50" />

      {/* Process */}
      <NumberedSteps
        title={t('process.title')}
        subtitle={t('process.subtitle')}
        steps={steps.map((s) => ({ title: s.title, description: s.desc }))}
        columns={5}
        dark
      />

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl text-navy mb-3">{t('cta.title')}</h2>
          <p className="text-gray-600 mb-8">
            {t('cta.body')}
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/consultation" className="btn-primary">{t('cta.bookFree')}</Link>
            <a
              href="https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/fmc-student-pilot/eligibility.html"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-lg hover:border-navy hover:text-navy transition-colors text-sm"
            >
              {t('cta.officialRequirements')}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
