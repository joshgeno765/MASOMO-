export interface LocalizedText {
  en: string
  fr: string
}

export interface ArticleSection {
  heading: LocalizedText
  body: LocalizedText
}

export interface Article {
  slug: string
  category: LocalizedText
  title: LocalizedText
  excerpt: LocalizedText
  readTime: LocalizedText
  publishedAt: string
  sections: ArticleSection[]
}

export const ARTICLES: Article[] = [
  {
    slug: 'canadian-study-permit-guide',
    category: { en: 'Visas & Permits', fr: 'Visas et permis' },
    title: { en: 'How to Apply for a Canadian Study Permit', fr: 'Comment demander un permis d\'études canadien' },
    excerpt: {
      en: 'A step-by-step walkthrough of the Canadian study permit process, from acceptance letter to biometrics.',
      fr: 'Un guide étape par étape du processus de demande de permis d\'études canadien, de la lettre d\'admission aux données biométriques.',
    },
    readTime: { en: '6 min read', fr: '6 min de lecture' },
    publishedAt: '2026-03-01',
    sections: [
      {
        heading: { en: 'The basics', fr: 'Les bases' },
        body: {
          en: 'A Canadian study permit is the document that allows you to study at a designated learning institution (DLI) in Canada for more than six months. It is not a visa on its own, but most study permit approvals also come with an entry visa or an Electronic Travel Authorization (eTA), depending on your nationality.',
          fr: 'Le permis d\'études canadien est le document qui vous autorise à étudier dans un établissement d\'enseignement désigné (EED) au Canada pendant plus de six mois. Ce n\'est pas un visa en soi, mais la plupart des permis d\'études approuvés s\'accompagnent aussi d\'un visa de résident temporaire ou d\'une autorisation de voyage électronique (AVE), selon votre nationalité.',
        },
      },
      {
        heading: { en: 'Step by step', fr: 'Étape par étape' },
        body: {
          en: '1) Get accepted at a designated learning institution and receive your official letter of acceptance. 2) Gather proof of funds — tuition plus living costs for at least one year, shown through bank statements, a GIC, or a loan letter. 3) Complete the IRCC application online (or on paper if online isn\'t available in your country) and pay the application and biometrics fees. 4) Attend a biometrics appointment at your nearest visa application centre. 5) Wait for a decision — processing times vary widely by country, so apply as early as possible.',
          fr: '1) Obtenez une admission dans un établissement d\'enseignement désigné et recevez votre lettre d\'admission officielle. 2) Rassemblez vos preuves de fonds — les frais de scolarité plus le coût de la vie pour au moins un an, démontrés par des relevés bancaires, un CPG ou une lettre de prêt. 3) Remplissez la demande IRCC en ligne (ou sur papier si ce n\'est pas possible dans votre pays) et payez les frais de demande et de biométrie. 4) Présentez-vous à un rendez-vous biométrique au centre de demande de visa le plus proche. 5) Attendez la décision — les délais de traitement varient beaucoup selon le pays, alors présentez votre demande le plus tôt possible.',
        },
      },
      {
        heading: { en: 'Common reasons for refusal', fr: 'Motifs de refus courants' },
        body: {
          en: 'Most refusals come down to unclear proof of funds, a study plan that doesn\'t match your academic or career background, or incomplete documentation. A licensed immigration consultant can review your file before submission to catch these issues early.',
          fr: 'La plupart des refus s\'expliquent par des preuves de fonds peu claires, un projet d\'études qui ne correspond pas à votre parcours académique ou professionnel, ou des documents incomplets. Un consultant en immigration agréé peut examiner votre dossier avant l\'envoi pour repérer ces problèmes à temps.',
        },
      },
      {
        heading: { en: 'A faster path for Francophone applicants', fr: 'Une filière plus rapide pour les candidats francophones' },
        body: {
          en: 'If you\'re from an eligible Francophone country and want to study in French outside Quebec, the Francophone Minority Communities (FMC) Student Pilot offers priority processing. See our FMC Pilot page to check your eligibility.',
          fr: 'Si vous venez d\'un pays francophone admissible et souhaitez étudier en français hors Québec, le pilote pour étudiants des communautés francophones en situation minoritaire (FMC) offre un traitement prioritaire. Consultez notre page sur le pilote FMC pour vérifier votre admissibilité.',
        },
      },
    ],
  },
  {
    slug: 'vancouver-winter-packing-list',
    category: { en: 'Living Abroad', fr: 'Vivre à l\'étranger' },
    title: { en: 'What to Pack for Your First Winter in Vancouver', fr: 'Quoi apporter pour votre premier hiver à Vancouver' },
    excerpt: {
      en: 'Vancouver winters are milder than most of Canada, but wetter — here\'s what\'s actually worth packing.',
      fr: 'Les hivers à Vancouver sont plus doux que dans le reste du Canada, mais plus humides — voici ce qui vaut vraiment la peine d\'apporter.',
    },
    readTime: { en: '4 min read', fr: '4 min de lecture' },
    publishedAt: '2026-02-15',
    sections: [
      {
        heading: { en: 'Rain, not snow', fr: 'De la pluie, pas de la neige' },
        body: {
          en: 'Unlike Ontario, Alberta, or Saskatchewan, coastal British Columbia rarely sees heavy snow. Temperatures usually hover between 2°C and 10°C in winter. The real challenge is near-constant rain from November through February — a good waterproof layer matters more than a heavy parka.',
          fr: 'Contrairement à l\'Ontario, à l\'Alberta ou à la Saskatchewan, la Colombie-Britannique côtière connaît rarement de fortes chutes de neige. Les températures oscillent généralement entre 2 °C et 10 °C en hiver. Le vrai défi est la pluie quasi constante de novembre à février — une bonne couche imperméable compte plus qu\'une lourde parka.',
        },
      },
      {
        heading: { en: 'What to actually bring', fr: 'Ce qu\'il faut vraiment apporter' },
        body: {
          en: 'A waterproof (not just water-resistant) jacket, a pair of waterproof shoes or boots, a light insulated layer for cooler days, and an umbrella that can handle wind. Layering matters more than any single heavy item — Vancouver weather swings within the same day.',
          fr: 'Un manteau imperméable (pas seulement résistant à l\'eau), une paire de chaussures ou de bottes imperméables, une couche isolante légère pour les jours plus frais, et un parapluie capable de résister au vent. Superposer les vêtements compte plus qu\'un seul vêtement chaud — la météo de Vancouver varie dans une même journée.',
        },
      },
      {
        heading: { en: 'What you can skip', fr: 'Ce que vous pouvez éviter' },
        body: {
          en: 'Save your money and luggage space — a heavy Canada-Goose-style winter parka rated for -30°C is overkill in Vancouver (though essential if your school is in Saskatchewan, Manitoba, or Ontario). Thick snow boots aren\'t necessary either; waterproof sneakers or light boots are usually enough.',
          fr: 'Économisez votre argent et l\'espace dans vos bagages — une lourde parka d\'hiver conçue pour -30 °C est excessive à Vancouver (bien qu\'essentielle si votre école se trouve en Saskatchewan, au Manitoba ou en Ontario). Des bottes de neige épaisses ne sont pas nécessaires non plus; des espadrilles ou bottes légères imperméables suffisent généralement.',
        },
      },
      {
        heading: { en: 'Buy some of it locally', fr: 'Achetez-en une partie sur place' },
        body: {
          en: 'Many students find it cheaper to arrive with one good jacket and buy the rest — boots, gloves, a toque — after arrival, when end-of-season sales are common and you can size things in person.',
          fr: 'Beaucoup d\'étudiants trouvent plus économique d\'arriver avec un seul bon manteau et d\'acheter le reste — bottes, gants, tuque — après leur arrivée, lorsque les soldes de fin de saison sont fréquentes et que vous pouvez essayer les articles en personne.',
        },
      },
    ],
  },
  {
    slug: 'post-graduation-work-permits-explained',
    category: { en: 'Visas & Permits', fr: 'Visas et permis' },
    title: { en: 'Understanding Post-Graduation Work Permits', fr: 'Comprendre les permis de travail post-diplôme' },
    excerpt: {
      en: 'What happens after you graduate? A country-by-country look at post-study work rights across our five destinations.',
      fr: 'Que se passe-t-il après l\'obtention de votre diplôme? Un survol pays par pays du droit de travail post-études dans nos cinq destinations.',
    },
    readTime: { en: '5 min read', fr: '5 min de lecture' },
    publishedAt: '2026-01-20',
    sections: [
      {
        heading: { en: 'Canada — PGWP', fr: 'Canada — PVMD' },
        body: {
          en: 'The Post-Graduation Work Permit (PGWP) lets international graduates work in Canada for up to 3 years, depending on program length. It\'s open-work — no job offer required — and time spent working on a PGWP counts toward permanent residence pathways like Express Entry.',
          fr: 'Le permis de travail post-diplôme (PVMD) permet aux diplômés internationaux de travailler au Canada jusqu\'à 3 ans, selon la durée du programme. C\'est un permis de travail ouvert — aucune offre d\'emploi requise — et le temps travaillé sous un PVMD compte pour les filières de résidence permanente comme Entrée express.',
        },
      },
      {
        heading: { en: 'United States — OPT', fr: 'États-Unis — OPT' },
        body: {
          en: 'Optional Practical Training (OPT) gives F-1 students 12 months of work authorization in their field of study, extendable to 24 additional months (36 total) for STEM graduates. Unlike Canada\'s PGWP, OPT requires your job to relate directly to your program.',
          fr: 'La formation pratique optionnelle (OPT) donne aux étudiants F-1 12 mois d\'autorisation de travail dans leur domaine d\'études, prolongeable de 24 mois supplémentaires (36 mois au total) pour les diplômés STIM. Contrairement au PVMD canadien, l\'OPT exige que votre emploi soit directement lié à votre programme.',
        },
      },
      {
        heading: { en: 'Ireland, Germany, and Poland', fr: 'Irlande, Allemagne et Pologne' },
        body: {
          en: 'Ireland\'s Stamp 1G gives graduates up to 2 years to find work. Germany\'s Job Seeker Visa allows 18 months to search for employment related to your degree. Poland grants graduates roughly 1 year of post-study stay. All three are more restrictive on job type than Canada\'s PGWP, so research your target profession\'s licensing requirements early.',
          fr: 'Le Stamp 1G irlandais donne aux diplômés jusqu\'à 2 ans pour trouver un emploi. Le visa de recherche d\'emploi allemand permet 18 mois pour chercher un poste lié à votre diplôme. La Pologne accorde environ 1 an de séjour post-études. Ces trois options sont plus restrictives sur le type d\'emploi que le PVMD canadien — informez-vous tôt sur les exigences d\'agrément de votre profession cible.',
        },
      },
      {
        heading: { en: 'Plan before you choose a country', fr: 'Planifiez avant de choisir un pays' },
        body: {
          en: 'If long-term immigration is your priority, factor post-study work rights into your country decision as heavily as tuition cost. Our Pathway Finder quiz weighs this alongside your budget and language preference.',
          fr: 'Si l\'immigration à long terme est votre priorité, tenez compte du droit de travail post-études dans le choix de votre pays, autant que des frais de scolarité. Notre questionnaire Recherche de filière tient compte de cet aspect avec votre budget et votre préférence linguistique.',
        },
      },
    ],
  },
  {
    slug: 'fmc-student-pilot-eligibility',
    category: { en: 'FMC Pilot', fr: 'Pilote FMC' },
    title: { en: 'FMC Student Pilot: Who Qualifies and How to Apply', fr: 'Pilote pour étudiants FMC : qui est admissible et comment postuler' },
    excerpt: {
      en: 'A closer look at Canada\'s Francophone Minority Communities Student Pilot — eligibility, benefits, and the application process.',
      fr: 'Un survol détaillé du pilote pour étudiants des communautés francophones en situation minoritaire du Canada — admissibilité, avantages et processus de demande.',
    },
    readTime: { en: '5 min read', fr: '5 min de lecture' },
    publishedAt: '2026-01-05',
    sections: [
      {
        heading: { en: 'What it is', fr: 'De quoi s\'agit-il' },
        body: {
          en: 'The FMC Student Pilot is an IRCC initiative that fast-tracks study permits for Francophone students from eligible countries who plan to study in French at a participating institution outside Quebec.',
          fr: 'Le pilote pour étudiants FMC est une initiative d\'IRCC qui accélère le traitement des permis d\'études pour les étudiants francophones de pays admissibles qui prévoient étudier en français dans un établissement participant à l\'extérieur du Québec.',
        },
      },
      {
        heading: { en: 'Who qualifies', fr: 'Qui est admissible' },
        body: {
          en: 'You need to be a citizen or resident of an eligible Francophone country (including Rwanda, DR Congo, Djibouti, Cameroon, Senegal, Côte d\'Ivoire, Mali, Burkina Faso, Gabon, and Togo), hold an admission letter to a participating institution, be enrolled in a program delivered primarily in French, and meet standard IRCC requirements for finances, health, and character.',
          fr: 'Vous devez être citoyen ou résident d\'un pays francophone admissible (notamment le Rwanda, la RD Congo, Djibouti, le Cameroun, le Sénégal, la Côte d\'Ivoire, le Mali, le Burkina Faso, le Gabon et le Togo), détenir une lettre d\'admission d\'un établissement participant, être inscrit à un programme offert principalement en français, et répondre aux exigences standards d\'IRCC en matière de finances, de santé et de bonnes mœurs.',
        },
      },
      {
        heading: { en: 'Why it matters', fr: 'Pourquoi c\'est important' },
        body: {
          en: 'Beyond faster processing, studying outside Quebec in French strengthens your Express Entry profile for permanent residence, since Canada actively encourages Francophone immigration to minority communities across Ontario, New Brunswick, Manitoba, Alberta, and Nova Scotia.',
          fr: 'Au-delà d\'un traitement plus rapide, étudier en français hors Québec renforce votre profil Entrée express pour la résidence permanente, car le Canada encourage activement l\'immigration francophone vers les communautés minoritaires en Ontario, au Nouveau-Brunswick, au Manitoba, en Alberta et en Nouvelle-Écosse.',
        },
      },
      {
        heading: { en: 'Next step', fr: 'Prochaine étape' },
        body: {
          en: 'Take our Pathway Finder quiz with your home country and French as your language preference — it will flag your FMC eligibility automatically and match you to real participating institutions.',
          fr: 'Faites notre questionnaire Recherche de filière en indiquant votre pays d\'origine et le français comme préférence linguistique — il détectera automatiquement votre admissibilité au pilote FMC et vous associera à de véritables établissements participants.',
        },
      },
    ],
  },
  {
    slug: 'ielts-toefl-duolingo-comparison',
    category: { en: 'Application Tips', fr: 'Conseils de candidature' },
    title: { en: 'IELTS vs TOEFL vs Duolingo: Which English Test Should You Take?', fr: 'IELTS, TOEFL ou Duolingo : quel test d\'anglais choisir?' },
    excerpt: {
      en: 'Every partner school accepts different combinations of English proficiency tests — here\'s how to pick the right one for you.',
      fr: 'Chaque école partenaire accepte différentes combinaisons de tests de compétence en anglais — voici comment choisir celui qui vous convient.',
    },
    readTime: { en: '5 min read', fr: '5 min de lecture' },
    publishedAt: '2025-12-10',
    sections: [
      {
        heading: { en: 'Why it matters', fr: 'Pourquoi c\'est important' },
        body: {
          en: 'Almost every English-track program at our partner schools requires proof of English proficiency unless you\'ve studied in English for several years. Picking the right test can save you time, money, and stress.',
          fr: 'Presque tous les programmes en anglais de nos écoles partenaires exigent une preuve de compétence en anglais, sauf si vous avez étudié en anglais pendant plusieurs années. Choisir le bon test peut vous faire gagner du temps, de l\'argent et vous éviter du stress.',
        },
      },
      {
        heading: { en: 'IELTS', fr: 'IELTS' },
        body: {
          en: 'The most widely recognized test globally, available in Academic and General Training formats. Most of our partner schools ask for an overall band of 6.0–6.5 with no individual band below 5.5–6.0. Results take about 1–13 days depending on the test type.',
          fr: 'Le test le plus largement reconnu au monde, offert en format académique et général. La plupart de nos écoles partenaires exigent une note globale de 6,0 à 6,5, sans note individuelle inférieure à 5,5–6,0. Les résultats sont disponibles en 1 à 13 jours selon le type de test.',
        },
      },
      {
        heading: { en: 'TOEFL iBT', fr: 'TOEFL iBT' },
        body: {
          en: 'Common at North American institutions, fully computer-based, with scores typically required in the 78–88 range for our partner schools. Results are usually available within 4–8 days.',
          fr: 'Répandu dans les établissements nord-américains, entièrement sur ordinateur, avec des scores généralement requis entre 78 et 88 pour nos écoles partenaires. Les résultats sont habituellement disponibles en 4 à 8 jours.',
        },
      },
      {
        heading: { en: 'Duolingo English Test', fr: 'Test d\'anglais Duolingo' },
        body: {
          en: 'A cheaper, faster, fully online alternative — results in about 2 days. Several of our partner schools (including Northern Lights College, TRU, and BCIT) accept Duolingo scores around 105–125, making it a strong option if you need a quick turnaround or don\'t have a test centre nearby.',
          fr: 'Une option plus abordable, plus rapide et entièrement en ligne — résultats en environ 2 jours. Plusieurs de nos écoles partenaires (dont Northern Lights College, TRU et BCIT) acceptent des scores Duolingo d\'environ 105 à 125, ce qui en fait une excellente option si vous avez besoin d\'un résultat rapide ou n\'avez pas de centre de test à proximité.',
        },
      },
      {
        heading: { en: 'How to decide', fr: 'Comment décider' },
        body: {
          en: 'Check your target school\'s exact requirement first (our Study Destinations page lists each partner school\'s official minimums and sources), then pick whichever test is cheapest and fastest to access from where you live.',
          fr: 'Vérifiez d\'abord l\'exigence exacte de l\'école visée (notre page Destinations d\'études indique les minimums officiels et les sources pour chaque école partenaire), puis choisissez le test le plus abordable et le plus accessible rapidement depuis votre lieu de résidence.',
        },
      },
    ],
  },
  {
    slug: 'budgeting-first-year-abroad',
    category: { en: 'Costs & Budgeting', fr: 'Coûts et budget' },
    title: { en: 'Budgeting for Your First Year Studying Abroad', fr: 'Établir un budget pour votre première année à l\'étranger' },
    excerpt: {
      en: 'Tuition is only part of the picture — here\'s everything else to plan for financially before you land.',
      fr: 'Les frais de scolarité ne sont qu\'une partie du portrait — voici tout le reste à prévoir financièrement avant votre arrivée.',
    },
    readTime: { en: '6 min read', fr: '6 min de lecture' },
    publishedAt: '2025-11-18',
    sections: [
      {
        heading: { en: 'The two big numbers', fr: 'Les deux grands chiffres' },
        body: {
          en: 'Every study-abroad budget starts with two figures: tuition and living costs. These vary enormously by country — Poland can cost a fraction of the United States. Use our Cost & Budget Calculator to get an instant estimate for your target country and program length.',
          fr: 'Tout budget d\'études à l\'étranger commence par deux chiffres : les frais de scolarité et le coût de la vie. Ces montants varient énormément selon le pays — la Pologne peut coûter une fraction du prix des États-Unis. Utilisez notre calculateur de coûts et de budget pour obtenir une estimation instantanée selon votre pays cible et la durée de votre programme.',
        },
      },
      {
        heading: { en: 'Hidden costs to plan for', fr: 'Coûts cachés à prévoir' },
        body: {
          en: 'Beyond tuition and rent: mandatory health insurance (often $600–$1,200/year), study permit and biometrics fees, flights, winter clothing if you\'re headed somewhere cold, a security deposit for housing, and a buffer for the first month before you find part-time work.',
          fr: 'Au-delà des frais de scolarité et du loyer : l\'assurance maladie obligatoire (souvent 600 à 1 200 $/an), les frais de permis d\'études et de biométrie, les billets d\'avion, des vêtements d\'hiver si vous partez vers un endroit froid, un dépôt de garantie pour le logement, et une marge pour le premier mois avant de trouver un emploi à temps partiel.',
        },
      },
      {
        heading: { en: 'Where you can save', fr: 'Où vous pouvez économiser' },
        body: {
          en: 'Regional colleges (like Northern Lights College or North Island College in BC) typically cost less than big-city institutions. Most study permits also come with the right to work part-time — up to 24 hours a week in Canada, for example — which can offset living costs once you\'re settled.',
          fr: 'Les collèges régionaux (comme Northern Lights College ou North Island College en C.-B.) coûtent généralement moins cher que les établissements en grande ville. La plupart des permis d\'études s\'accompagnent aussi du droit de travailler à temps partiel — jusqu\'à 24 heures par semaine au Canada, par exemple — ce qui peut compenser le coût de la vie une fois installé.',
        },
      },
      {
        heading: { en: 'Talk to a counselor before you commit', fr: 'Parlez à un conseiller avant de vous engager' },
        body: {
          en: 'Every student\'s situation is different. Book a free consultation and we\'ll walk through a realistic budget for your specific destination, program, and timeline.',
          fr: 'Chaque situation d\'étudiant est différente. Réservez une consultation gratuite et nous établirons ensemble un budget réaliste pour votre destination, votre programme et votre échéancier spécifiques.',
        },
      },
    ],
  },
]

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug)
}
