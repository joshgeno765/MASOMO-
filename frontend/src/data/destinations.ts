export interface School {
  name: string
  type: string
  city: string
  photo: string | null
  website: string
  programTags?: ('technical' | 'business' | 'academic')[]
  costTier?: 'budget-friendly'
}

export interface Country {
  flag: string
  name: string
  tagline: string
  region: 'North America' | 'Europe'
  languages: string[]
  facts: { label: string; value: string }[]
  schools: School[]
  desc: string
  pros: string[]
  link: string
  linkLabel: string
}

export const northAmerica: Country[] = [
  {
    flag: '🇨🇦',
    name: 'Canada',
    tagline: 'From coast to coast — technical institutes to universities',
    region: 'North America',
    languages: ['English', 'French'],
    facts: [
      { label: 'Partner Schools', value: '5' },
      { label: 'Post-Study Work', value: 'PGWP — up to 3 years' },
      { label: 'Language', value: 'English (French via FMC Pilot)' },
      { label: 'Location', value: 'British Columbia & Alberta' },
    ],
    schools: [
      { name: 'BCIT — British Columbia Institute of Technology', type: 'Public Polytechnic Institute', city: 'Burnaby, BC', photo: '/images/schools/bcit.jpg', website: 'https://www.bcit.ca', programTags: ['technical'] },
      { name: 'TRU — Thompson Rivers University', type: 'Public University', city: 'Kamloops, BC', photo: '/images/schools/tru.jpg', website: 'https://www.tru.ca', programTags: ['academic'] },
      { name: 'University of Lethbridge', type: 'Public University', city: 'Lethbridge, AB', photo: '/images/schools/lethbridge.jpg', website: 'https://www.ulethbridge.ca', programTags: ['academic'] },
      { name: 'Northern Lights College', type: 'Public College', city: 'Dawson Creek, BC', photo: null, website: 'https://www.nlc.bc.ca', programTags: ['technical'], costTier: 'budget-friendly' },
      { name: 'North Island College', type: 'Public College', city: 'Comox Valley, BC', photo: null, website: 'https://www.nic.bc.ca', programTags: ['technical'], costTier: 'budget-friendly' },
    ],
    desc: 'Canada remains the single most requested destination for our students. Beyond the FMC Student Pilot\'s francophone pathway, we also place English-track students directly with technical institutes, colleges, and universities across British Columbia and Alberta — from Metro Vancouver\'s tech corridor to smaller regional colleges with a lower cost of living.',
    pros: ['Post-Graduation Work Permit — up to 3 years', 'A recognised pathway toward permanent residence', 'Strong co-op and trades programs (BCIT)', "TRU's guaranteed tuition model locks in your rate for your whole program", 'Lower cost of living at regional colleges (Northern Lights, North Island)'],
    link: '/consultation',
    linkLabel: 'Enquire About Canada →',
  },
  {
    flag: '🇺🇸',
    name: 'United States',
    tagline: 'A community-college pathway into the Seattle tech corridor',
    region: 'North America',
    languages: ['English'],
    facts: [
      { label: 'Partner Schools', value: '2' },
      { label: 'Post-Study Work', value: 'OPT — 12 months (+24 for STEM)' },
      { label: 'Language', value: 'English' },
      { label: 'Location', value: 'Kirkland & Seattle, WA' },
    ],
    schools: [
      { name: 'Lake Washington Institute of Technology', type: 'Public Technical College', city: 'Kirkland, WA', photo: '/images/schools/lwtech.jpg', website: 'https://www.lwtech.edu', programTags: ['technical'], costTier: 'budget-friendly' },
      { name: 'Seattle Colleges', type: 'Public Community College District', city: 'Seattle, WA', photo: '/images/schools/seattle-colleges.jpg', website: 'https://www.seattlecolleges.edu', programTags: ['technical'], costTier: 'budget-friendly' },
    ],
    desc: 'Our two Washington State partners sit minutes from downtown Seattle — home to Amazon, Microsoft, and one of the world\'s busiest tech job markets. Both offer accredited two-year degrees and certificates, with clear transfer pathways into four-year bachelor\'s programs, at a fraction of the cost of direct university enrollment.',
    pros: ['Direct pathway into the Seattle tech corridor', 'Lower tuition than direct 4-year enrollment', 'Clear transfer pathways to bachelor\'s degrees', 'OPT work authorization after graduation', 'No TOEFL/IELTS required at LWTech (free placement test)'],
    link: '/consultation',
    linkLabel: 'Enquire About the United States →',
  },
]

export const europe: Country[] = [
  {
    flag: '🇮🇪',
    name: 'Ireland',
    tagline: 'English-speaking gateway to the European Union',
    region: 'Europe',
    languages: ['English'],
    facts: [
      { label: 'Partner Schools', value: '2' },
      { label: 'Post-Study Work', value: '2 years (Stamp 1G)' },
      { label: 'Language', value: 'English' },
      { label: 'Location', value: 'Dublin' },
    ],
    schools: [
      { name: 'DCU — Dublin City University', type: 'Public Research University', city: 'Dublin', photo: '/images/schools/dcu.jpg', website: 'https://www.dcu.ie', programTags: ['academic'] },
      { name: 'Griffith College', type: 'Private College', city: 'Dublin', photo: '/images/schools/griffith.jpg', website: 'https://www.griffith.ie', programTags: ['academic'] },
    ],
    desc: 'Ireland is one of the only English-speaking countries in the EU, making it a strategic choice for African students seeking a globally recognised degree with access to European job markets. Dublin is home to the European headquarters of Google, Meta, and Apple.',
    pros: ['English-language EU country', '2-year post-study work permit (Stamp 1G)', 'Access to European job market', 'World-class tech and business sector', 'Welcoming to international students'],
    link: '/consultation',
    linkLabel: 'Enquire About Ireland →',
  },
  {
    flag: '🇩🇪',
    name: 'Germany',
    tagline: "Europe's largest economy — English programs available",
    region: 'Europe',
    languages: ['English'],
    facts: [
      { label: 'Partner Schools', value: '3' },
      { label: 'Post-Study Work', value: '18 months (Job Seeker Visa)' },
      { label: 'Language', value: 'English programs available' },
      { label: 'Location', value: 'Berlin & other cities' },
    ],
    schools: [
      { name: 'CBS International Business School', type: 'Private University of Applied Sciences', city: 'Cologne', photo: '/images/schools/cbs.jpg', website: 'https://www.cbs.de/en', programTags: ['business'] },
      { name: 'BSBI — Berlin School of Business & Innovation', type: 'Private Institution', city: 'Berlin', photo: '/images/schools/bsbi.jpg', website: 'https://www.berlinsbi.com', programTags: ['business'] },
      { name: 'Gisma University of Applied Sciences', type: 'Private University of Applied Sciences', city: 'Berlin / Potsdam', photo: null, website: 'https://www.gisma.com', programTags: ['business'] },
    ],
    desc: 'Germany is Europe\'s strongest economy and a top destination for international students. Our three partner institutions offer fully English-taught business and management programs, making Germany accessible without needing to learn German first.',
    pros: ['3 partner institutions in major cities', '18-month job seeker visa after graduation', 'Strong engineering & business job market', 'English-taught programs available', 'Central EU location'],
    link: '/consultation',
    linkLabel: 'Enquire About Germany →',
  },
  {
    flag: '🇵🇱',
    name: 'Poland',
    tagline: 'Affordable European education in Warsaw',
    region: 'Europe',
    languages: ['English'],
    facts: [
      { label: 'Partner Schools', value: '1' },
      { label: 'Post-Study Work', value: '1 year' },
      { label: 'Language', value: 'English programs available' },
      { label: 'Location', value: 'Warsaw' },
    ],
    schools: [
      { name: 'Vistula University', type: 'Private University', city: 'Warsaw', photo: '/images/schools/vistula.jpg', website: 'https://vistula.edu.pl/en', programTags: ['academic'], costTier: 'budget-friendly' },
    ],
    desc: 'Poland offers EU-recognised degrees at significantly lower tuition fees and living costs than Western Europe. Vistula University in Warsaw is one of Poland\'s most internationally active institutions, with a strong track record of enrolling students from Africa.',
    pros: ['Among the most affordable EU tuitions', 'Lower cost of living vs. Western Europe', 'EU-recognised degrees', 'English-taught programs', 'Growing economy and job market'],
    link: '/consultation',
    linkLabel: 'Enquire About Poland →',
  },
]

export const comingSoon = [
  { flags: '🇦🇺', region: 'Australia' },
  { flags: '🇯🇵', region: 'Asia', note: 'Starting with Japan' },
]

export const FMC_ELIGIBLE_COUNTRIES: string[] = [
  'Rwanda', 'DR Congo', 'Djibouti', 'Cameroon', 'Senegal', "Côte d'Ivoire", 'Mali', 'Burkina Faso', 'Gabon', 'Togo',
]

export interface FmcInstitution {
  name: string
  programTags: ('technical' | 'academic')[]
}

export interface FmcProvinceGroup {
  province: string
  schools: FmcInstitution[]
}

export const FMC_INSTITUTIONS: FmcProvinceGroup[] = [
  {
    province: 'Ontario',
    schools: [
      { name: "Université de l'Ontario français (UOF)", programTags: ['academic'] },
      { name: 'Collège Boréal', programTags: ['technical'] },
      { name: 'La Cité collégiale', programTags: ['technical'] },
      { name: "Université d'Ottawa (French programs)", programTags: ['academic'] },
    ],
  },
  {
    province: 'New Brunswick',
    schools: [
      { name: 'Université de Moncton', programTags: ['academic'] },
      { name: 'Collège communautaire du Nouveau-Brunswick (CCNB)', programTags: ['technical'] },
    ],
  },
  {
    province: 'Manitoba',
    schools: [
      { name: 'Université de Saint-Boniface', programTags: ['academic'] },
    ],
  },
  {
    province: 'Alberta',
    schools: [
      { name: 'Campus Saint-Jean (University of Alberta)', programTags: ['academic'] },
    ],
  },
  {
    province: 'Nova Scotia',
    schools: [
      { name: 'Université Sainte-Anne', programTags: ['academic'] },
    ],
  },
]
