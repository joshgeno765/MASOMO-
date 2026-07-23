import {
  Country, School, PathwayCategory, northAmerica, europe, oceania,
  FMC_ELIGIBLE_COUNTRIES, FMC_INSTITUTIONS, FmcInstitution,
} from '../data/destinations'
import { PathwayQuizAnswers } from '../types'

export interface MatchedSchool {
  name: string
  type?: string
  city?: string
  photo?: string | null
  website?: string
  pathwayCategories?: PathwayCategory[]
  intlRequirements?: string
  intlRequirementsSource?: string
}

export interface RationaleItem {
  key: 'languageMatch' | 'fieldMatch' | 'pathwayMatch' | 'budgetMatch' | 'fallback'
    | 'fmcEligible' | 'fmcFieldPriority' | 'fmcPathwayMatch' | 'fmcTimeline'
  params?: Record<string, string>
}

export interface PathwayMatchResult {
  isFmcPathway: boolean
  country: Country
  matchedSchools: MatchedSchool[]
  alternateCountry?: Country
  alternateSchools?: MatchedSchool[]
  rationale: RationaleItem[]
}

type FieldTag = 'technical' | 'business' | 'academic' | null

const FIELD_TAG: Record<PathwayQuizAnswers['fieldOfInterest'], FieldTag> = {
  'Technical / Trades': 'technical',
  'Business & Management': 'business',
  'University / Academic': 'academic',
  'Not sure yet': null,
}

function wantedPathwayCategory(studyGoal: PathwayQuizAnswers['studyGoal']): PathwayCategory | null {
  return studyGoal === 'Not sure yet' ? null : studyGoal
}

function schoolFieldScore(tags: string[] | undefined, wantedTag: FieldTag): number {
  if (!wantedTag || !tags) return 0
  return tags.includes(wantedTag) ? 2 : 0
}

function schoolPathwayScore(categories: PathwayCategory[] | undefined, wanted: PathwayCategory | null): number {
  if (!wanted || !categories) return 0
  return categories.includes(wanted) ? 2 : 0
}

function schoolCostScore(costTier: string | undefined, budget: PathwayQuizAnswers['budget']): number {
  if (budget !== 'Most affordable option') return 0
  return costTier === 'budget-friendly' ? 2 : 0
}

function scoreCountry(country: Country, answers: PathwayQuizAnswers) {
  const wantedTag = FIELD_TAG[answers.fieldOfInterest]
  const wantedPathway = wantedPathwayCategory(answers.studyGoal)
  const languageScore = country.languages.includes(answers.languagePreference)
    ? 3
    : answers.languagePreference === 'Both / Not sure'
      ? 1
      : 0

  const schoolScores = country.schools.map((school) => ({
    school,
    score: schoolFieldScore(school.programTags, wantedTag)
      + schoolPathwayScore(school.pathwayCategories, wantedPathway)
      + schoolCostScore(school.costTier, answers.budget),
  }))

  const bestSchoolScore = schoolScores.length ? Math.max(...schoolScores.map((s) => s.score)) : 0
  return { country, score: languageScore + bestSchoolScore, schoolScores }
}

function toMatchedSchool(school: School): MatchedSchool {
  return {
    name: school.name,
    type: school.type,
    city: school.city,
    photo: school.photo,
    website: school.website,
    pathwayCategories: school.pathwayCategories,
    intlRequirements: school.intlRequirements,
    intlRequirementsSource: school.intlRequirementsSource,
  }
}

function toMatchedFmcSchool(school: FmcInstitution): MatchedSchool {
  return {
    name: school.name,
    pathwayCategories: school.pathwayCategories,
    intlRequirements: school.intlRequirements,
    intlRequirementsSource: school.intlRequirementsSource,
  }
}

function buildRationale(country: Country, answers: PathwayQuizAnswers, topSchools: { school: School; score: number }[]): RationaleItem[] {
  const rationale: RationaleItem[] = []
  if (country.languages.includes(answers.languagePreference)) {
    rationale.push({ key: 'languageMatch', params: { country: country.name, language: answers.languagePreference } })
  }
  const wantedTag = FIELD_TAG[answers.fieldOfInterest]
  const fieldMatch = topSchools.find((s) => wantedTag && s.school.programTags?.includes(wantedTag))
  if (fieldMatch) {
    rationale.push({ key: 'fieldMatch', params: { school: fieldMatch.school.name, field: answers.fieldOfInterest } })
  }
  const wantedPathway = wantedPathwayCategory(answers.studyGoal)
  const pathwayMatch = topSchools.find((s) => wantedPathway && s.school.pathwayCategories?.includes(wantedPathway))
  if (pathwayMatch) {
    rationale.push({ key: 'pathwayMatch', params: { school: pathwayMatch.school.name, studyGoal: answers.studyGoal } })
  }
  if (answers.budget === 'Most affordable option' && topSchools.some((s) => s.school.costTier === 'budget-friendly')) {
    rationale.push({ key: 'budgetMatch', params: { country: country.name } })
  }
  if (rationale.length === 0) {
    rationale.push({ key: 'fallback', params: { country: country.name } })
  }
  return rationale
}

export function matchPathway(answers: PathwayQuizAnswers): PathwayMatchResult {
  const canada = northAmerica.find((c) => c.name === 'Canada')!
  const isFmcCandidate = FMC_ELIGIBLE_COUNTRIES.includes(answers.homeCountry) && answers.languagePreference !== 'English'

  if (isFmcCandidate) {
    const wantedTag = FIELD_TAG[answers.fieldOfInterest]
    const wantedPathway = wantedPathwayCategory(answers.studyGoal)
    const fmcTagMatches = (tags: FmcInstitution['programTags']) =>
      (wantedTag === 'technical' || wantedTag === 'academic') && tags.includes(wantedTag)
    const fmcPathwayMatches = (categories: PathwayCategory[] | undefined) =>
      Boolean(wantedPathway && categories?.includes(wantedPathway))

    const allFmcSchools: FmcInstitution[] = FMC_INSTITUTIONS.flatMap((g) => g.schools)
    const sorted = [...allFmcSchools].sort((a, b) => {
      const aScore = (fmcTagMatches(a.programTags) ? 1 : 0) + (fmcPathwayMatches(a.pathwayCategories) ? 1 : 0)
      const bScore = (fmcTagMatches(b.programTags) ? 1 : 0) + (fmcPathwayMatches(b.pathwayCategories) ? 1 : 0)
      return bScore - aScore
    })
    const matchedSchools: MatchedSchool[] = sorted.slice(0, 3).map(toMatchedFmcSchool)

    const rationale: RationaleItem[] = [
      { key: 'fmcEligible', params: { homeCountry: answers.homeCountry } },
    ]
    if (wantedTag) {
      rationale.push({ key: 'fmcFieldPriority', params: { field: answers.fieldOfInterest } })
    }
    const pathwaySchoolMatch = sorted.find((s) => fmcPathwayMatches(s.pathwayCategories))
    if (pathwaySchoolMatch) {
      rationale.push({ key: 'fmcPathwayMatch', params: { school: pathwaySchoolMatch.name, studyGoal: answers.studyGoal } })
    }
    if (answers.timeline === 'As soon as possible') {
      rationale.push({ key: 'fmcTimeline' })
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

  const candidates = [...northAmerica, ...europe, ...oceania]
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
