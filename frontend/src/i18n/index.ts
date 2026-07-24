import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import enCommon from './locales/en/common.json'
import enHome from './locales/en/home.json'
import enAbout from './locales/en/about.json'
import enDestinations from './locales/en/destinations.json'
import enFmcPilot from './locales/en/fmcPilot.json'
import enPathwayFinder from './locales/en/pathwayFinder.json'
import enServices from './locales/en/services.json'
import enConsultation from './locales/en/consultation.json'
import enContact from './locales/en/contact.json'
import enLegal from './locales/en/legal.json'
import enCalculator from './locales/en/calculator.json'
import enPrograms from './locales/en/programs.json'
import enBlog from './locales/en/blog.json'
import enChatbot from './locales/en/chatbot.json'
import enUniversities from './locales/en/universities.json'

import frCommon from './locales/fr/common.json'
import frHome from './locales/fr/home.json'
import frAbout from './locales/fr/about.json'
import frDestinations from './locales/fr/destinations.json'
import frFmcPilot from './locales/fr/fmcPilot.json'
import frPathwayFinder from './locales/fr/pathwayFinder.json'
import frServices from './locales/fr/services.json'
import frConsultation from './locales/fr/consultation.json'
import frContact from './locales/fr/contact.json'
import frLegal from './locales/fr/legal.json'
import frCalculator from './locales/fr/calculator.json'
import frPrograms from './locales/fr/programs.json'
import frBlog from './locales/fr/blog.json'
import frChatbot from './locales/fr/chatbot.json'
import frUniversities from './locales/fr/universities.json'

export const defaultNS = 'common'

export const resources = {
  en: {
    common: enCommon,
    home: enHome,
    about: enAbout,
    destinations: enDestinations,
    fmcPilot: enFmcPilot,
    pathwayFinder: enPathwayFinder,
    services: enServices,
    consultation: enConsultation,
    contact: enContact,
    legal: enLegal,
    calculator: enCalculator,
    programs: enPrograms,
    blog: enBlog,
    chatbot: enChatbot,
    universities: enUniversities,
  },
  fr: {
    common: frCommon,
    home: frHome,
    about: frAbout,
    destinations: frDestinations,
    fmcPilot: frFmcPilot,
    pathwayFinder: frPathwayFinder,
    services: frServices,
    consultation: frConsultation,
    contact: frContact,
    legal: frLegal,
    calculator: frCalculator,
    programs: frPrograms,
    blog: frBlog,
    chatbot: frChatbot,
    universities: frUniversities,
  },
} as const

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    defaultNS,
    fallbackLng: 'en',
    supportedLngs: ['en', 'fr'],
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'masomo_lang',
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
