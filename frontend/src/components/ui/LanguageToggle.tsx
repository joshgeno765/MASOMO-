import { useTranslation } from 'react-i18next'

export default function LanguageToggle({ dark = true }: { dark?: boolean }) {
  const { i18n, t } = useTranslation()
  const current = i18n.resolvedLanguage === 'fr' ? 'fr' : 'en'
  const next = current === 'en' ? 'fr' : 'en'

  const base = dark
    ? 'border-white/20 text-white/70 hover:text-white hover:bg-white/10'
    : 'border-navy/20 text-navy/70 hover:text-navy hover:bg-navy/5'
  const activeCls = dark ? 'bg-white/15 text-white' : 'bg-navy/10 text-navy'

  return (
    <button
      type="button"
      onClick={() => i18n.changeLanguage(next)}
      aria-label={t('language.switchTo', { language: next === 'en' ? 'English' : 'Français' })}
      className={`flex items-center gap-0.5 rounded-md border text-xs font-bold overflow-hidden ${base}`}
    >
      <span className={`px-2 py-1.5 ${current === 'en' ? activeCls : ''}`}>{t('language.en')}</span>
      <span className="opacity-40">/</span>
      <span className={`px-2 py-1.5 ${current === 'fr' ? activeCls : ''}`}>{t('language.fr')}</span>
    </button>
  )
}
