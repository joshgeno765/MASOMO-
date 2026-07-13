export type PathwayCategory =
  | 'Associate & UT Programs'
  | 'High School, Upgrading & Language Proficiency'
  | 'Degrees & Diplomas'
  | 'Trades & Apprenticeship'

export interface School {
  name: string
  type: string
  city: string
  photo: string | null
  website: string
  programTags?: ('technical' | 'business' | 'academic')[]
  costTier?: 'budget-friendly'
  pathwayCategories?: PathwayCategory[]
  intlRequirements?: string
  intlRequirementsSource?: string
  videoId?: string
  videoTitle?: string
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
      { label: 'Partner Schools', value: '8' },
      { label: 'Post-Study Work', value: 'PGWP — up to 3 years' },
      { label: 'Language', value: 'English (French via FMC Pilot)' },
      { label: 'Location', value: 'British Columbia, Alberta, Saskatchewan & Ontario' },
    ],
    schools: [
      {
        name: 'BCIT — British Columbia Institute of Technology', type: 'Public Polytechnic Institute', city: 'Burnaby, BC', photo: '/images/schools/bcit-thumb.webp', website: 'https://www.bcit.ca', programTags: ['technical'],
        pathwayCategories: ['High School, Upgrading & Language Proficiency', 'Degrees & Diplomas', 'Trades & Apprenticeship'],
        intlRequirements: 'English proficiency tiered by program: typically IELTS 6.5 overall (no band below 5.5), TOEFL iBT 86, PTE 60, or Duolingo 120. Program-specific admission requirements (grades/prerequisites) apply beyond English.',
        intlRequirementsSource: 'https://www.bcit.ca/admission/entrance-requirements/english-language-proficiency/',
        videoId: 'CKl8mhU_eR0', videoTitle: 'BCIT | Burnaby Campus Tour',
      },
      {
        name: 'TRU — Thompson Rivers University', type: 'Public University', city: 'Kamloops, BC', photo: '/images/schools/tru-thumb.webp', website: 'https://www.tru.ca', programTags: ['academic'],
        pathwayCategories: ['Associate & UT Programs', 'High School, Upgrading & Language Proficiency', 'Degrees & Diplomas', 'Trades & Apprenticeship'],
        intlRequirements: 'IELTS 6.5 overall (no band below 6.0), TOEFL iBT 88, PTE 58, or Duolingo 125 — or enter TRU\'s own English for Academic Purposes (EAP) program and work up to direct-entry level. Minimum 73% in Grade 12 English for degree programs (67% for diploma/certificate); minimum age 17.',
        intlRequirementsSource: 'https://www.tru.ca/truworld/new-students/before-you-leave-home/english-requirements.html',
        videoId: '6jc9QVVUC8Q', videoTitle: 'TRU Campus Tour 2024',
      },
      {
        name: 'University of Lethbridge', type: 'Public University', city: 'Lethbridge, AB', photo: '/images/schools/lethbridge-thumb.webp', website: 'https://www.ulethbridge.ca', programTags: ['academic'],
        pathwayCategories: ['High School, Upgrading & Language Proficiency', 'Degrees & Diplomas'],
        intlRequirements: 'IELTS 6.5 overall (no band below 6.0), TOEFL iBT 86, PTE 61, or Duolingo 120 — or complete the university\'s own English for Academic Purposes (EAP) Advanced Level. Minimum secondary school average varies by country (commonly around 65%).',
        intlRequirementsSource: 'https://www.ulethbridge.ca/ross/admissions/elp',
        videoId: 'FXM84Z2bK-U', videoTitle: 'ULethbridge: Experience for Everyone',
      },
      {
        name: 'Northern Lights College', type: 'Public College', city: 'Dawson Creek, BC', photo: '/images/schools/northern-lights-college-thumb.webp', website: 'https://www.nlc.bc.ca', programTags: ['technical'], costTier: 'budget-friendly',
        pathwayCategories: ['Associate & UT Programs', 'High School, Upgrading & Language Proficiency', 'Degrees & Diplomas', 'Trades & Apprenticeship'],
        intlRequirements: 'IELTS 6.0 overall (no band below 5.5), TOEFL iBT 78, or Duolingo 110 — or complete NLC\'s own in-house English as a Second Language (EASL) pathway program.',
        intlRequirementsSource: 'https://www.nlc.bc.ca/schedule/admissions-regulations/',
        videoId: '9gjCytEE-ro', videoTitle: 'Ask Our Students: Five Reasons International Students Should Study at NLC',
      },
      {
        name: 'North Island College', type: 'Public College', city: 'Comox Valley, BC', photo: null, website: 'https://www.nic.bc.ca', programTags: ['technical'], costTier: 'budget-friendly',
        pathwayCategories: ['Associate & UT Programs', 'Degrees & Diplomas', 'Trades & Apprenticeship'],
        intlRequirements: 'IELTS 6.0 overall (no band below 5.5) for most programs, higher for select limited-entry programs — or complete an approved English program through one of NIC\'s partner language schools.',
        intlRequirementsSource: 'https://www.nic.bc.ca/admissions/international-students/admission-requirements/english-requirements.html',
        videoId: 'aZ38Ejp_F2I', videoTitle: 'North Island College International',
      },
      {
        name: 'Saskatchewan Polytechnic', type: 'Public Polytechnic Institute', city: 'Saskatoon, SK', photo: null, website: 'https://saskpolytech.ca', programTags: ['technical'],
        pathwayCategories: ['High School, Upgrading & Language Proficiency', 'Degrees & Diplomas', 'Trades & Apprenticeship'],
        intlRequirements: 'IELTS 6.5 overall (no band below 5.0), TOEFL iBT 81, PTE 63, or Duolingo 110 for most programs (competitive programs such as nursing require higher scores) — or complete the University of Regina\'s EAP 100/101 or The Language Gallery Canada\'s pathway program.',
        intlRequirementsSource: 'https://saskpolytech.ca/admissions/admission-requirements/english-language-proficiency-requirements.aspx',
      },
      {
        name: 'Fanshawe College', type: 'Public College', city: 'London, ON', photo: '/images/schools/fanshawe-thumb.webp', website: 'https://www.fanshawec.ca', programTags: ['technical'],
        pathwayCategories: ['High School, Upgrading & Language Proficiency', 'Degrees & Diplomas', 'Trades & Apprenticeship'],
        intlRequirements: 'IELTS 6.0 overall (no band below 5.5), TOEFL iBT 79, PTE 53, or Duolingo 105 (no score below 95) for standard diploma/advanced diploma programs — or complete Fanshawe\'s own English for Academic Purposes (EAP) program.',
        intlRequirementsSource: 'https://www.fanshawec.ca/admission-finance/before-applying/admission-requirements/english-requirements',
      },
      {
        name: 'University Canada West', type: 'Private University', city: 'Vancouver, BC', photo: null, website: 'https://www.ucanwest.ca', programTags: ['business'],
        pathwayCategories: ['High School, Upgrading & Language Proficiency', 'Degrees & Diplomas'],
        intlRequirements: 'IELTS 6.5 overall (no band below 6.0) or TOEFL iBT 88 for direct entry into undergraduate and MBA programs — or complete UCW\'s own University Access Program (UAP) for students who fall short of direct entry.',
        intlRequirementsSource: 'https://www.ucanwest.ca/admissions/english-proficiency',
      },
    ],
    desc: 'Canada remains the single most requested destination for our students. Beyond the FMC Student Pilot\'s francophone pathway, we also place English-track students directly with technical institutes, colleges, and universities across British Columbia, Alberta, Saskatchewan, and Ontario — from Metro Vancouver\'s tech corridor to smaller regional colleges with a lower cost of living.',
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
      { name: 'Lake Washington Institute of Technology', type: 'Public Technical College', city: 'Kirkland, WA', photo: '/images/schools/lwtech-thumb.webp', website: 'https://www.lwtech.edu', programTags: ['technical'], costTier: 'budget-friendly' },
      { name: 'Seattle Colleges', type: 'Public Community College District', city: 'Seattle, WA', photo: '/images/schools/seattle-colleges-thumb.webp', website: 'https://www.seattlecolleges.edu', programTags: ['technical'], costTier: 'budget-friendly' },
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
      { name: 'DCU — Dublin City University', type: 'Public Research University', city: 'Dublin', photo: '/images/schools/dcu-thumb.webp', website: 'https://www.dcu.ie', programTags: ['academic'] },
      { name: 'Griffith College', type: 'Private College', city: 'Dublin', photo: '/images/schools/griffith-thumb.webp', website: 'https://www.griffith.ie', programTags: ['academic'] },
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
      { name: 'CBS International Business School', type: 'Private University of Applied Sciences', city: 'Cologne', photo: '/images/schools/cbs-thumb.webp', website: 'https://www.cbs.de/en', programTags: ['business'] },
      { name: 'BSBI — Berlin School of Business & Innovation', type: 'Private Institution', city: 'Berlin', photo: '/images/schools/bsbi-thumb.webp', website: 'https://www.berlinsbi.com', programTags: ['business'] },
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
      { name: 'Vistula University', type: 'Private University', city: 'Warsaw', photo: '/images/schools/vistula-thumb.webp', website: 'https://vistula.edu.pl/en', programTags: ['academic'], costTier: 'budget-friendly' },
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
  pathwayCategories?: PathwayCategory[]
  intlRequirements?: string
  intlRequirementsSource?: string
}

export interface FmcProvinceGroup {
  province: string
  schools: FmcInstitution[]
}

export const FMC_INSTITUTIONS: FmcProvinceGroup[] = [
  {
    province: 'Ontario',
    schools: [
      {
        name: "Université de l'Ontario français (UOF)", programTags: ['academic'],
        pathwayCategories: ['Degrees & Diplomas'],
        intlRequirements: 'French proficiency required: DELF B2 (min. 70%), TFI 700+/990, TEF 600+/900, or TCF 450+/699.',
        intlRequirementsSource: 'https://uofinternational.ca/je-veux-etudier-a-luof/conditions-dadmission',
      },
      {
        name: 'Collège Boréal', programTags: ['technical'],
        pathwayCategories: ['Degrees & Diplomas', 'Trades & Apprenticeship'],
        intlRequirements: 'Approved French test required (TEF or TCF); the FMC Student Pilot specifically requires Canadian Language Benchmark (CLB) level 5 or higher in all four skills. Application fee $350 CAD.',
        intlRequirementsSource: 'https://collegeboreal.ca/en/future-students/international-applicants/francophone-minority-communities-student-pilot-fmcsp/',
      },
      {
        name: 'La Cité collégiale', programTags: ['technical'],
        pathwayCategories: ['Associate & UT Programs', 'Degrees & Diplomas', 'Trades & Apprenticeship'],
        intlRequirements: 'French test required: TCF minimum 375 (Compréhension écrite) or TEF minimum 352 (Compréhension écrite). Application fee $350 CAD; FMC pathway requires a tuition deposit.',
        intlRequirementsSource: 'https://www.collegelacite.ca/tests-de-francais',
      },
      {
        name: "Université d'Ottawa (French programs)", programTags: ['academic'],
        pathwayCategories: ['Degrees & Diplomas'],
        intlRequirements: 'French proficiency required unless 3+ years of French-medium schooling completed (DR Congo and Djibouti are on the exemption list; Rwanda is not): DALF C1/C2, DELF B2 (min. 16/25 in Production écrite), TCF B2, or TEF B2.',
        intlRequirementsSource: 'https://www.uottawa.ca/study/undergraduate-studies/language-requirements',
      },
    ],
  },
  {
    province: 'New Brunswick',
    schools: [
      {
        name: 'Université de Moncton', programTags: ['academic'],
        pathwayCategories: ['High School, Upgrading & Language Proficiency', 'Degrees & Diplomas'],
        intlRequirements: 'French proficiency required unless native French speaker — commonly cited minimum is level B1 on the TFI (or equivalent TCF/DALF/TEF level). Non-refundable application fee $300 CAD.',
        intlRequirementsSource: 'https://www.umoncton.ca/processus-d%E2%80%99admission-pour-%C3%A9tudiants-internationaux',
      },
      {
        name: 'Collège communautaire du Nouveau-Brunswick (CCNB)', programTags: ['technical'],
        pathwayCategories: ['Associate & UT Programs', 'High School, Upgrading & Language Proficiency', 'Trades & Apprenticeship'],
        intlRequirements: 'French test required unless 3+ years of francophone schooling: TFI 700 minimum, TCF Canada level B2, TEF Canada level B2, DELF B2, or DALF C1. $100 CAD processing fee plus a mandatory CCNB admission test.',
        intlRequirementsSource: 'https://ccnb.ca/admission-et-inscription/etudiants-internationaux/',
      },
    ],
  },
  {
    province: 'Manitoba',
    schools: [
      {
        name: 'Université de Saint-Boniface', programTags: ['academic'],
        pathwayCategories: ['Degrees & Diplomas'],
        intlRequirements: 'Approved French test required of all international applicants, including francophone-country nationals: DELF B2, DALF C1, TCF B2, or TEF B2. Test results must be original and less than 2 years old.',
        intlRequirementsSource: 'https://ustboniface.ca/tests-de-francais-normalises-internationaux',
      },
    ],
  },
  {
    province: 'Alberta',
    schools: [
      {
        name: 'Campus Saint-Jean (University of Alberta)', programTags: ['academic'],
        pathwayCategories: ['Associate & UT Programs', 'Degrees & Diplomas'],
        intlRequirements: 'French proficiency required (primary language of instruction): completion of Alberta French 30-1/30-2 or equivalent, 4 years of full-time French study, or a diploma from a French-medium institution. FMC pilot requires a $150 CAD application fee plus a tuition deposit.',
        intlRequirementsSource: 'https://www.ualberta.ca/en/campus-saint-jean/programs/international/francophone-minority-communities-student-pilot.html',
      },
    ],
  },
  {
    province: 'Nova Scotia',
    schools: [
      {
        name: 'Université Sainte-Anne', programTags: ['academic'],
        pathwayCategories: ['Associate & UT Programs', 'High School, Upgrading & Language Proficiency', 'Degrees & Diplomas'],
        intlRequirements: 'For the FMC Student Pilot specifically: TEF or TCF level 5. Application fee $150 CAD for international applicants.',
        intlRequirementsSource: 'https://www.usainteanne.ca/futurs-etudiants/etudiants-internationaux/avant-de-venir-au-canada/ppecfsm',
      },
    ],
  },
]
