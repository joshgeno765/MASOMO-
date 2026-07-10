import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import FloatingField from '../components/ui/FloatingField'
import PathwayJourneyVisual from '../components/ui/PathwayJourneyVisual'
import { matchPathway, PathwayMatchResult } from '../lib/pathwayMatching'
import { submitPathwayResult } from '../lib/api'
import { PathwayQuizAnswers, PathwayFinderSubmission } from '../types'

const HOME_COUNTRIES = ['Rwanda', 'DR Congo', 'Djibouti', 'Kenya', 'Uganda', 'Tanzania', 'Cameroon', 'Senegal', "Côte d'Ivoire", 'Other']

const QUESTIONS: { key: keyof PathwayQuizAnswers; question: string; options: string[] }[] = [
  { key: 'homeCountry', question: 'Which country are you applying from?', options: HOME_COUNTRIES },
  { key: 'languagePreference', question: 'Which language do you want to study in?', options: ['French', 'English', 'Both / Not sure'] },
  { key: 'studyGoal', question: 'What would you like to study?', options: [
    'Associate & UT Programs',
    'High School, Upgrading & Language Proficiency',
    'Degrees & Diplomas',
    'Trades & Apprenticeship',
    'Not sure yet',
  ] },
  { key: 'fieldOfInterest', question: 'What field are you interested in?', options: ['Technical / Trades', 'Business & Management', 'University / Academic', 'Not sure yet'] },
  { key: 'budget', question: 'What matters most for your budget?', options: ['Most affordable option', 'Budget flexible', 'Not sure'] },
  { key: 'timeline', question: 'When are you hoping to start?', options: ['As soon as possible', 'Within the next year', 'Just exploring'] },
]

const EMPTY_CAPTURE = { name: '', email: '', phone: '', message: '' }

function schoolLabel(schools: PathwayMatchResult['matchedSchools']): string {
  if (schools.length === 0) return 'Partner school'
  if (schools.length === 1) return schools[0].name
  return `${schools.length} matched schools`
}

export default function PathwayFinderPage() {
  const [searchParams] = useSearchParams()
  const cameFromFmc = searchParams.get('ref') === 'fmc-pilot'

  const [step, setStep] = useState<'intro' | 'quiz' | 'result'>(cameFromFmc ? 'quiz' : 'intro')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Partial<PathwayQuizAnswers>>({})
  const [result, setResult] = useState<PathwayMatchResult | null>(null)

  const [captureForm, setCaptureForm] = useState(EMPTY_CAPTURE)
  const [submitting, setSubmitting] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleAnswer = (value: string) => {
    const key = QUESTIONS[questionIndex].key
    const updated = { ...answers, [key]: value }
    setAnswers(updated)

    if (questionIndex < QUESTIONS.length - 1) {
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
    if (!captureForm.name.trim()) return toast.error('Please enter your full name')
    if (!captureForm.email.includes('@')) return toast.error('Please enter a valid email')
    if (!captureForm.phone.trim()) return toast.error('Please enter your phone number')

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
      toast.error('Something went wrong. Please try again or book a consultation directly.')
    } finally {
      setSubmitting(false)
    }
  }

  const postStudyWork = result?.country.facts.find((f) => f.label === 'Post-Study Work')?.value ?? ''

  return (
    <>
      <section className="bg-navy py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-4">Pathway Finder</p>
          <h1 className="font-serif text-3xl md:text-4xl text-white leading-tight mb-4">
            Answer 6 questions. See your real matched pathway.
          </h1>
          <p className="text-white/70 text-lg">
            No guesswork — this matches your answers against our actual partner schools and eligibility criteria.
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          {step === 'intro' && (
            <Card className="text-center py-12">
              {cameFromFmc && (
                <p className="text-brand-gold text-sm font-bold mb-4">Let's check your FMC Student Pilot eligibility</p>
              )}
              <h2 className="font-serif text-2xl text-navy mb-3">Ready to find your pathway?</h2>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                Takes about a minute. We'll show you a real result immediately — no email required to see it.
              </p>
              <Button variant="primary" onClick={() => setStep('quiz')}>Start →</Button>
            </Card>
          )}

          {step === 'quiz' && (
            <Card>
              {cameFromFmc && questionIndex === 0 && (
                <p className="text-brand-gold text-xs font-bold uppercase tracking-wide mb-4">Checking FMC Student Pilot eligibility</p>
              )}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-400">Question {questionIndex + 1} of {QUESTIONS.length}</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full mb-8 overflow-hidden">
                <div
                  className="h-full bg-brand-gold rounded-full transition-all duration-300"
                  style={{ width: `${((questionIndex + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>

              <h2 className="font-serif text-2xl text-navy mb-6">{QUESTIONS[questionIndex].question}</h2>

              <div className="grid gap-3">
                {QUESTIONS[questionIndex].options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    className="text-left border border-gray-200 rounded-xl px-5 py-4 text-sm font-semibold text-gray-700 hover:border-navy hover:bg-navy/5 transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>

              <button onClick={handleBack} className="mt-8 text-sm font-semibold text-gray-400 hover:text-navy">
                ← Back
              </button>
            </Card>
          )}

          {step === 'result' && result && answers.homeCountry && (
            <div className="space-y-8">
              <PathwayJourneyVisual
                homeCountry={answers.homeCountry}
                isFmcPathway={result.isFmcPathway}
                destinationFlag={result.country.flag}
                destinationName={result.isFmcPathway ? 'Canada (FMC Pilot)' : result.country.name}
                schoolLabel={schoolLabel(result.matchedSchools)}
                outcome={postStudyWork}
              />

              <Card>
                <h2 className="font-serif text-2xl text-navy mb-1">
                  {result.isFmcPathway ? 'You may qualify for the FMC Student Pilot' : `Your best match: ${result.country.name}`}
                </h2>
                <p className="text-gray-500 text-sm mb-6">{result.country.tagline}</p>

                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Why this match</h3>
                <ul className="space-y-2 mb-6">
                  {result.rationale.map((r) => (
                    <li key={r} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-brand-gold mt-0.5 flex-shrink-0 font-bold">—</span>
                      {r}
                    </li>
                  ))}
                </ul>

                {answers.studyGoal && answers.studyGoal !== 'Not sure yet' && (
                  <p className="text-xs text-gray-400 mb-4">
                    You're looking to study: <span className="font-semibold text-navy">{answers.studyGoal}</span>
                  </p>
                )}

                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Matched schools</h3>
                <div className="grid gap-3 mb-2">
                  {result.matchedSchools.map((s) => (
                    <div key={s.name} className="border border-gray-200 rounded-xl p-4">
                      <div className="font-semibold text-navy text-sm">{s.name}</div>
                      {(s.type || s.city) && <div className="text-xs text-gray-400 mt-0.5">{[s.type, s.city].filter(Boolean).join(' · ')}</div>}
                      {s.website && (
                        <a href={s.website} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-brand-blue hover:underline mt-1 inline-block">
                          Visit official website ↗
                        </a>
                      )}
                      {s.intlRequirements && (
                        <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                          <span className="font-semibold text-gray-600">International admission requirements: </span>
                          {s.intlRequirements}
                          {s.intlRequirementsSource && (
                            <>
                              {' '}
                              <a href={s.intlRequirementsSource} target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline">
                                (source ↗)
                              </a>
                            </>
                          )}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-3">
                  Requirements shown are general guidelines from each school's official site — your counselor will confirm the exact requirements for your specific program.
                </p>
              </Card>

              {result.alternateCountry && result.alternateSchools && result.alternateSchools.length > 0 && (
                <Card>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                    {result.isFmcPathway ? 'Prefer an English-track option?' : 'Also consider'}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {result.isFmcPathway
                      ? `Canada also has English-track partner schools if French isn't a fit:`
                      : `${result.alternateCountry.name} was a close second match:`}
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
                  See full details →
                </Link>
                <button onClick={handleRetake} className="font-semibold text-gray-400 hover:text-navy">
                  Retake quiz
                </button>
              </div>

              <Card>
                {saved ? (
                  <div className="text-center py-4">
                    <h3 className="font-serif text-xl text-navy mb-2">Saved!</h3>
                    <p className="text-gray-600 text-sm">A counselor will follow up on your matched pathway shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleCaptureSubmit} className="space-y-4">
                    <h3 className="font-serif text-xl text-navy mb-1">Save this / book a consultation</h3>
                    <p className="text-gray-500 text-sm mb-4">Optional — leave your details and a counselor will follow up on this exact match.</p>
                    <FloatingField label="Full Name" name="name" value={captureForm.name} onChange={handleCaptureChange} required />
                    <FloatingField label="Email" name="email" type="email" value={captureForm.email} onChange={handleCaptureChange} required />
                    <FloatingField label="Phone" name="phone" value={captureForm.phone} onChange={handleCaptureChange} required />
                    <Button type="submit" fullWidth loading={submitting}>
                      {submitting ? 'Saving...' : 'Save My Pathway →'}
                    </Button>
                    <p className="text-center text-[11px] text-gray-400">
                      By saving, you agree to our <Link to="/privacy" className="underline hover:text-navy">Privacy Policy</Link>.
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
