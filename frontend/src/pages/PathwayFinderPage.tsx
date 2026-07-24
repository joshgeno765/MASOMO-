import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Trans, useTranslation } from 'react-i18next'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import FloatingField from '../components/ui/FloatingField'
import PathwayJourneyVisual from '../components/ui/PathwayJourneyVisual'
import { matchPathway, PathwayMatchResult, RationaleItem } from '../lib/pathwayMatching'
import { submitPathwayResult } from '../lib/api'
import { PathwayQuizAnswers, PathwayFinderSubmission } from '../types'

const HOME_COUNTRIES = ['Rwanda', 'DR Congo', 'Djibouti', 'Kenya', 'Uganda', 'Tanzania', 'Cameroon', 'Senegal', "Côte d'Ivoire", 'Other']

const QUESTION_DEFS: { key: keyof PathwayQuizAnswers; i18nKey: string; values: string[] }[] = [
  { key: 'homeCountry', i18nKey: 'homeCountry', values: HOME_COUNTRIES },
  { key: 'languagePreference', i18nKey: 'languagePreference', values: ['French', 'English', 'Both / Not sure'] },
  { key: 'studyGoal', i18nKey: 'studyGoal', values: [
    'Associate & UT Programs',
    'High School, Upgrading & Language Proficiency',
    'Degrees & Diplomas',
    'Trades & Apprenticeship',
    'Not sure yet',
  ] },
  { key: 'fieldOfInterest', i18nKey: 'fieldOfInterest', values: ['Technical / Trades', 'Business & Management', 'University / Academic', 'Not sure yet'] },
  { key: 'budget', i18nKey: 'budget', values: ['Most affordable option', 'Budget flexible', 'Not sure'] },
  { key: 'timeline', i18nKey: 'timeline', values: ['As soon as possible', 'Within the next year', 'Just exploring'] },
]

const EMPTY_CAPTURE = { name: '', email: '', phone: '', message: '' }

const COUNTRY_SLUGS: Record<string, string> = {
  Canada: 'canada',
  'United States': 'united-states',
  Ireland: 'ireland',
  Germany: 'germany',
  Poland: 'poland',
  Australia: 'australia',
  China: 'china',
}

export default function PathwayFinderPage() {
  const { t } = useTranslation('pathwayFinder')
  const { t: tHome } = useTranslation('home')
  const { t: tDestinations } = useTranslation('destinations')
  const [searchParams] = useSearchParams()
  const cameFromFmc = searchParams.get('ref') === 'fmc-pilot'

  const [step, setStep] = useState<'intro' | 'quiz' | 'result'>(cameFromFmc ? 'quiz' : 'intro')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Partial<PathwayQuizAnswers>>({})
  const [result, setResult] = useState<PathwayMatchResult | null>(null)

  const [captureForm, setCaptureForm] = useState(EMPTY_CAPTURE)
  const [submitting, setSubmitting] = useState(false)
  const [saved, setSaved] = useState(false)

  const countryLabel = (name: string) => {
    const slug = COUNTRY_SLUGS[name]
    return slug ? tHome(`destinationsShowcase.names.${slug}`) : name
  }

  const optionLabel = (i18nKey: string, value: string) => t(`questions.${i18nKey}.options.${value}`)

  const schoolLabel = (schools: PathwayMatchResult['matchedSchools']): string => {
    if (schools.length === 0) return t('result.partnerSchool')
    if (schools.length === 1) return schools[0].name
    return t('result.matchedSchoolsCount', { count: schools.length })
  }

  const renderRationale = (item: RationaleItem): string => {
    const params: Record<string, string> = {}
    if (item.params?.country) params.country = countryLabel(item.params.country)
    if (item.params?.homeCountry) params.homeCountry = optionLabel('homeCountry', item.params.homeCountry)
    if (item.params?.school) params.school = item.params.school
    if (item.params?.studyGoal) params.studyGoal = optionLabel('studyGoal', item.params.studyGoal)
    if (item.params?.language) params.language = optionLabel('languagePreference', item.params.language)
    if (item.params?.field) params.field = t(`fieldLabelsLower.${item.params.field}`)
    return t(`rationale.${item.key}`, params)
  }

  const handleAnswer = (value: string) => {
    const key = QUESTION_DEFS[questionIndex].key
    const updated = { ...answers, [key]: value }
    setAnswers(updated)

    if (questionIndex < QUESTION_DEFS.length - 1) {
      setQuestionIndex(questionIndex + 1)
    } else {
      const finalAnswers = updated as PathwayQuizAnswers
      setResult(matchPathway(finalAnswers))
      setStep('result')
    }
  }

  const handleBack = () => {
    if (questionIndex === 0) {
      setStep('intro')
    } else {
      setQuestionIndex(questionIndex - 1)
    }
  }

  const handleRetake = () => {
    setAnswers({})
    setQuestionIndex(0)
    setResult(null)
    setCaptureForm(EMPTY_CAPTURE)
    setSaved(false)
    setStep('intro')
  }

  const handleCaptureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCaptureForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleCaptureSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!result || !answers.homeCountry) return
    if (!captureForm.name.trim()) return toast.error(t('toast.nameRequired'))
    if (!captureForm.email.includes('@')) return toast.error(t('toast.emailInvalid'))
    if (!captureForm.phone.trim()) return toast.error(t('toast.phoneRequired'))

    const destinationInterest = result.isFmcPathway
      ? 'Canada — FMC Student Pilot'
      : `${result.country.name} — ${result.matchedSchools[0]?.name ?? ''}`

    const submission: PathwayFinderSubmission = {
      name: captureForm.name,
      email: captureForm.email,
      phone: captureForm.phone,
      country: answers.homeCountry,
      destinationInterest,
      message: captureForm.message || undefined,
      quizAnswers: answers as PathwayQuizAnswers,
      matchedResult: {
        country: result.country.name,
        schools: result.matchedSchools.map((s) => s.name),
        isFmcPathway: result.isFmcPathway,
      },
    }

    setSubmitting(true)
    try {
      await submitPathwayResult(submission)
      setSaved(true)
    } catch {
      toast.error(t('toast.genericError'))
    } finally {
      setSubmitting(false)
    }
  }

  const postStudyWork = (() => {
    if (!result) return ''
    const index = result.country.facts.findIndex((f) => f.label === 'Post-Study Work')
    if (index === -1) return ''
    const factValues = tDestinations(`countries.${result.country.slug}.factValues`, { returnObjects: true }) as string[]
    return Array.isArray(factValues) ? factValues[index] : result.country.facts[index].value
  })()

  return (
    <>
      <section className="bg-navy py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-4">{t('hero.eyebrow')}</p>
          <h1 className="font-serif text-3xl md:text-4xl text-white leading-tight mb-4">
            {t('hero.title')}
          </h1>
          <p className="text-white/70 text-lg">
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          {step === 'intro' && (
            <Card className="text-center py-12">
              {cameFromFmc && (
                <p className="text-brand-gold-dark text-sm font-bold mb-4">{t('intro.fmcCheck')}</p>
              )}
              <h2 className="font-serif text-2xl text-navy mb-3">{t('intro.title')}</h2>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                {t('intro.body')}
              </p>
              <Button variant="primary" onClick={() => setStep('quiz')}>{t('intro.start')}</Button>
            </Card>
          )}

          {step === 'quiz' && (
            <Card>
              {cameFromFmc && questionIndex === 0 && (
                <p className="text-brand-gold-dark text-xs font-bold uppercase tracking-wide mb-4">{t('quiz.fmcChecking')}</p>
              )}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-500">{t('quiz.questionOf', { current: questionIndex + 1, total: QUESTION_DEFS.length })}</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full mb-8 overflow-hidden">
                <div
                  className="h-full bg-brand-gold rounded-full transition-all duration-300"
                  style={{ width: `${((questionIndex + 1) / QUESTION_DEFS.length) * 100}%` }}
                />
              </div>

              <h2 className="font-serif text-2xl text-navy mb-6">{t(`questions.${QUESTION_DEFS[questionIndex].i18nKey}.question`)}</h2>

              <div className="grid gap-3">
                {QUESTION_DEFS[questionIndex].values.map((value) => (
                  <button
                    key={value}
                    onClick={() => handleAnswer(value)}
                    className="text-left border border-gray-200 rounded-xl px-5 py-4 text-sm font-semibold text-gray-700 hover:border-navy hover:bg-navy/5 transition-colors"
                  >
                    {optionLabel(QUESTION_DEFS[questionIndex].i18nKey, value)}
                  </button>
                ))}
              </div>

              <button onClick={handleBack} className="mt-8 text-sm font-semibold text-gray-500 hover:text-navy">
                {t('quiz.back')}
              </button>
            </Card>
          )}

          {step === 'result' && result && answers.homeCountry && (
            <div className="space-y-8">
              <PathwayJourneyVisual
                homeCountry={optionLabel('homeCountry', answers.homeCountry)}
                isFmcPathway={result.isFmcPathway}
                destinationFlag={result.country.flag}
                destinationName={result.isFmcPathway ? t('result.destinationCanadaFmc') : countryLabel(result.country.name)}
                schoolLabel={schoolLabel(result.matchedSchools)}
                outcome={postStudyWork}
                labels={{
                  you: t('journey.you'),
                  fmcPilot: t('journey.fmcPilot'),
                  eligiblePathway: t('journey.eligiblePathway'),
                  destination: t('journey.destination'),
                  matchedSchool: t('journey.matchedSchool'),
                  outcome: t('journey.outcome'),
                }}
              />

              <Card>
                <h2 className="font-serif text-2xl text-navy mb-1">
                  {result.isFmcPathway ? t('result.fmcTitle') : t('result.matchTitle', { country: countryLabel(result.country.name) })}
                </h2>
                <p className="text-gray-500 text-sm mb-6">{result.country.tagline}</p>

                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">{t('result.whyThisMatch')}</h3>
                <ul className="space-y-2 mb-6">
                  {result.rationale.map((r, i) => (
                    <li key={`${r.key}-${i}`} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-brand-gold-dark mt-0.5 flex-shrink-0 font-bold">—</span>
                      {renderRationale(r)}
                    </li>
                  ))}
                </ul>

                {answers.studyGoal && answers.studyGoal !== 'Not sure yet' && (
                  <p className="text-xs text-gray-500 mb-4">
                    {t('result.studyingLabel')} <span className="font-semibold text-navy">{optionLabel('studyGoal', answers.studyGoal)}</span>
                  </p>
                )}

                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">{t('result.matchedSchools')}</h3>
                <div className="grid gap-3 mb-2">
                  {result.matchedSchools.map((s) => (
                    <div key={s.name} className="border border-gray-200 rounded-xl p-4">
                      <div className="font-semibold text-navy text-sm">{s.name}</div>
                      {(s.type || s.city) && <div className="text-xs text-gray-500 mt-0.5">{[s.type, s.city].filter(Boolean).join(' · ')}</div>}
                      {s.website && (
                        <a href={s.website} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-brand-blue hover:underline mt-1 inline-block">
                          {t('result.visitWebsite')}
                        </a>
                      )}
                      {s.intlRequirements && (
                        <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                          <span className="font-semibold text-gray-600">{t('result.intlRequirementsLabel')} </span>
                          {s.intlRequirements}
                          {s.intlRequirementsSource && (
                            <>
                              {' '}
                              <a href={s.intlRequirementsSource} target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline">
                                {t('result.source')}
                              </a>
                            </>
                          )}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  {t('result.requirementsDisclaimer')}
                </p>
              </Card>

              {result.alternateCountry && result.alternateSchools && result.alternateSchools.length > 0 && (
                <Card>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
                    {result.isFmcPathway ? t('result.preferEnglishTrack') : t('result.alsoConsider')}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {result.isFmcPathway
                      ? t('result.canadaEnglishTrack')
                      : t('result.closeSecond', { country: countryLabel(result.alternateCountry.name) })}
                  </p>
                  <div className="grid gap-2">
                    {result.alternateSchools.map((s) => (
                      <div key={s.name} className="text-sm text-gray-600">— {s.name}</div>
                    ))}
                  </div>
                </Card>
              )}

              <div className="flex gap-4 justify-center text-sm">
                <Link to={result.isFmcPathway ? '/fmc-pilot' : '/destinations'} className="font-bold text-brand-blue hover:underline">
                  {t('result.seeFullDetails')}
                </Link>
                <button onClick={handleRetake} className="font-semibold text-gray-500 hover:text-navy">
                  {t('result.retakeQuiz')}
                </button>
              </div>

              <Card>
                {saved ? (
                  <div className="text-center py-4">
                    <h3 className="font-serif text-xl text-navy mb-2">{t('save.savedTitle')}</h3>
                    <p className="text-gray-600 text-sm">{t('save.savedBody')}</p>
                  </div>
                ) : (
                  <form onSubmit={handleCaptureSubmit} className="space-y-4">
                    <h3 className="font-serif text-xl text-navy mb-1">{t('save.title')}</h3>
                    <p className="text-gray-500 text-sm mb-4">{t('save.subtitle')}</p>
                    <FloatingField label={t('save.fullName')} name="name" value={captureForm.name} onChange={handleCaptureChange} required />
                    <FloatingField label={t('save.email')} name="email" type="email" value={captureForm.email} onChange={handleCaptureChange} required />
                    <FloatingField label={t('save.phone')} name="phone" value={captureForm.phone} onChange={handleCaptureChange} required />
                    <Button type="submit" fullWidth loading={submitting}>
                      {submitting ? t('save.saving') : t('save.saveCta')}
                    </Button>
                    <p className="text-center text-[11px] text-gray-500">
                      <Trans
                        i18nKey="save.privacyNotice"
                        t={t}
                        components={{ 1: <Link to="/privacy" className="underline hover:text-navy" /> }}
                      />
                    </p>
                  </form>
                )}
              </Card>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
