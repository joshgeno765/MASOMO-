export interface CountryCostProfile {
  slug: string
  currencyCode: string
  currencyPrefix: string
  tuitionMin: number
  tuitionMax: number
  livingMin: number
  livingMax: number
}

// Figures are annual (per year of study), representative ranges sourced from
// each country's official minimum funds / typical partner-school tuition —
// see the Compare Destinations table on the Study Destinations page for context.
export const COUNTRY_COSTS: CountryCostProfile[] = [
  { slug: 'canada', currencyCode: 'CAD', currencyPrefix: 'CAD $', tuitionMin: 15000, tuitionMax: 40000, livingMin: 22895, livingMax: 22895 },
  { slug: 'united-states', currencyCode: 'USD', currencyPrefix: 'USD $', tuitionMin: 10000, tuitionMax: 35000, livingMin: 25000, livingMax: 33000 },
  { slug: 'ireland', currencyCode: 'EUR', currencyPrefix: '€', tuitionMin: 9850, tuitionMax: 28000, livingMin: 10000, livingMax: 10000 },
  { slug: 'germany', currencyCode: 'EUR', currencyPrefix: '€', tuitionMin: 7000, tuitionMax: 15000, livingMin: 11904, livingMax: 11904 },
  { slug: 'poland', currencyCode: 'EUR', currencyPrefix: '€', tuitionMin: 2000, tuitionMax: 8000, livingMin: 7000, livingMax: 11000 },
]

export function getCountryCost(slug: string): CountryCostProfile | undefined {
  return COUNTRY_COSTS.find((c) => c.slug === slug)
}

export function formatMoney(amount: number, currencyPrefix: string): string {
  return `${currencyPrefix}${Math.round(amount).toLocaleString('en-US')}`
}
