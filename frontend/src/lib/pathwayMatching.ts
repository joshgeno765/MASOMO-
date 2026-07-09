import {
  Country, School, northAmerica, europe,
  FMC_ELIGIBLE_COUNTRIES, FMC_INSTITUTIONS, FmcInstitution,
} from '../data/destinations'
import { PathwayQuizAnswers } from '../types'

export interface MatchedSchool {
  name: string
  type?: string
  city?: string
  photo?: string | null
  website?: string
}

export interface PathwayMatchResult {
  isFmcPathway: boolean
  country: Country
  matchedSchools: MatchedSchool[]
  alternateCountry?: Country
  alternateSchools?: MatchedSchool[]
  rationale: string[]
}

type FieldTag = 'technical' | 'business' | 'academic' | null

const FIELD_TAG: Record<PathwayQuizAnswers['fieldOfInterest'], FieldTag> = {
  'Technical / Trades': 'technical',
  'Business & Management': 'business',
  'University / Academic': 'academic',
  'Not sure yet': null,
}

function schoolFieldScore(tags: string[] | undefined, wantedTag: FieldTag): number {
  if (!wantedTag || !tags) return 0
  return tags.includes(wantedTag) ? 2 : 0
}

function schoolCostScore(costTier: string | undefined, budget: PathwayQuizAnswers['budget']): number {
  if (budget !== 'Most affordable option') return 0
  return costTier === 'budget-friendly' ? 2 : 0
}

function scoreCountry(country: Country, answers: PathwayQuizAnswers) {
  const wantedTag = FIELD_TAG[answers.fieldOfInterest]
  const languageScore = country.languages.includes(answers.languagePreference)
    ? 3
    : answers.languagePreference === 'Both / Not sure'
      ? 1
      : 0

  const schoolScores = country.schools.map((school) => ({
    school,
    score: schoolFieldScore(school.programTags, wantedTag) + schoolCostScore(school.costTier, answers.budget),
  }))

  const bestSchoolScore = schoolScores.length ? Math.max(...schoolScores.map((s) => s.score)) : 0
  return { country, score: languageScore + bestSchoolScore, schoolScores }
}

function toMatchedSchool(school: School): MatchedSchool {
  return { name: school.name, type: school.type, city: school.city, photo: school.photo, website: school.website }
}

function buildRationale(country: Country, answers: PathwayQuizAnswers, topSchools: { school: School; score: number }[]): string[] {
  const rationale: string[] = []
  if (country.languages.includes(answers.languagePreference)) {
    rationale.push(`${country.name} teaches in ${answers.languagePreference} — matching your language preference.`)
  }
  const wantedTag = FIELD_TAG[answers.fieldOfInterest]
  const fieldMatch = topSchools.find((s) => wantedTag && s.school.programTags?.includes(wantedTag))
  if (fieldMatch) {
    rationale.push(`${fieldMatch.school.name} offers strong ${answers.fieldOfInterest.toLowerCase()} programs.`)
  }
  if (answers.budget === 'Most affordable option' && topSchools.some((s) => s.school.costTier === 'budget-friendly')) {
    rationale.push(`${country.name} includes budget-friendly options with a lower cost of living.`)
  }
  if (rationale.length === 0) {
    rationale.push(`${country.name} is one of our strongest partner regions for students exploring their options.`)
  }
  return rationale
}

export function matchPathway(answers: PathwayQuizAnswers): PathwayMatchResult {
  const canada = northAmerica.find((c) => c.name === 'Canada')!
  const isFmcCandidate = FMC_ELIGIBLE_COUNTRIES.includes(answers.homeCountry) && answers.languagePreference !== 'English'

  if (isFmcCandidate) {
    const wantedTag = FIELD_TAG[answers.fieldOfInterest]
    const fmcTagMatches = (tags: FmcInstitution['programTags']) =>
      (wantedTag === 'technical' || wantedTag === 'academic') && tags.includes(wantedTag)
    const allFmcSchools: FmcInstitution[] = FMC_INSTITUTIONS.flatMap((g) => g.schools)
    const sorted = [...allFmcSchools].sort((a, b) => {
      const aScore = fmcTagMatches(a.programTags) ? 1 : 0
      const bScore = fmcTagMatches(b.programTags) ? 1 : 0
      return bScore - aScore
    })
    const matchedSchools: MatchedSchool[] = sorted.slice(0, 3).map((s) => ({ name: s.name }))

    const rationale = [
      `${answers.homeCountry} is one of the countries eligible for Canada's Francophone Minority Communities (FMC) Student Pilot.`,
    ]
    if (wantedTag) {
      rationale.push(`We prioritized institutions with strong ${answers.fieldOfInterest.toLowerCase()} programs where possible.`)
    }
    if (answers.timeline === 'As soon as possible') {
      rationale.push('The FMC pilot offers priority processing — a real advantage given your timeline.')
    }

    const alternateSchools: MatchedSchool[] = canada.schools.slice(0, 3).map(toMatchedSchool)

    return {
      isFmcPathway: true,
      country: canada,
      matchedSchools,
      alternateSchools,
      rationale,
    }
  }

  const candidates = [...northAmerica, ...europe]
  const scored = candidates.map((country) => scoreCountry(country, answers))
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    return b.country.schools.length - a.country.schools.length
  })

  const primary = scored[0]
  const runnerUp = scored[1]

  const topSchools = [...primary.schoolScores].sort((a, b) => b.score - a.score).slice(0, 3)
  const matchedSchools = topSchools.map((s) => toMatchedSchool(s.school))
  const rationale = buildRationale(primary.country, answers, topSchools)

  const alternateTopSchools = runnerUp
    ? [...runnerUp.schoolScores].sort((a, b) => b.score - a.score).slice(0, 2)
    : []
  const alternateSchools = alternateTopSchools.map((s) => toMatchedSchool(s.school))

  return {
    isFmcPathway: false,
    country: primary.country,
    matchedSchools,
    alternateCountry: runnerUp?.country,
    alternateSchools: alternateSchools.length ? alternateSchools : undefined,
    rationale,
  }
}
