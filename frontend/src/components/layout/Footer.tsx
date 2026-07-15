import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-navy text-white/60">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 bg-brand-gold rounded-lg flex items-center justify-center font-extrabold text-navy text-base">
                MN
              </div>
              <img src="/images/elimu-logo.png" alt="ELIMU" className="h-7 w-auto" />
              <span className="text-white font-bold text-lg">
                {t('brand.name')} <span className="text-brand-gold-light">{t('brand.now')}</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs mb-4">
              {t('footer.description')}
            </p>
            <div className="flex gap-2 text-xs flex-wrap">
              <span className="bg-white/10 px-2.5 py-1 rounded-full">🇨🇦 Vancouver</span>
              <span className="bg-white/10 px-2.5 py-1 rounded-full">🇺🇸 Seattle</span>
              <span className="bg-white/10 px-2.5 py-1 rounded-full">🇰🇪 Nairobi</span>
              <span className="bg-white/10 px-2.5 py-1 rounded-full">🇷🇼 Kigali</span>
              <span className="bg-white/10 px-2.5 py-1 rounded-full">🇪🇹 Jijiga</span>
              <span className="bg-white/10 px-2.5 py-1 rounded-full">🇩🇪 Bonn</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">{t('footer.navigate')}</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-sm hover:text-brand-gold-light transition-colors">{t('nav.home')}</Link>
              <Link to="/about" className="text-sm hover:text-brand-gold-light transition-colors">{t('nav.about')}</Link>
              <Link to="/destinations" className="text-sm hover:text-brand-gold-light transition-colors">{t('footer.studyDestinations')}</Link>
              <Link to="/programs" className="text-sm hover:text-brand-gold-light transition-colors">{t('footer.programSearch')}</Link>
              <Link to="/cost-calculator" className="text-sm hover:text-brand-gold-light transition-colors">{t('footer.costCalculator')}</Link>
              <Link to="/resources" className="text-sm hover:text-brand-gold-light transition-colors">{t('footer.resources')}</Link>
              <Link to="/services" className="text-sm hover:text-brand-gold-light transition-colors">{t('nav.services')}</Link>
              <Link to="/fmc-pilot" className="text-sm hover:text-brand-gold-light transition-colors">🇨🇦 {t('footer.fmcPilotProgram')}</Link>
              <Link to="/consultation" className="text-sm hover:text-brand-gold-light transition-colors">{t('footer.bookConsultation')}</Link>
              <Link to="/contact" className="text-sm hover:text-brand-gold-light transition-colors">{t('nav.contact')}</Link>
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">{t('footer.destinationsHeading')}</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link to="/fmc-pilot" className="hover:text-brand-gold-light transition-colors">🇨🇦 {t('footer.canadaFmc')}</Link>
              <Link to="/destinations#united-states" className="hover:text-brand-gold-light transition-colors">🇺🇸 {t('footer.unitedStates')}</Link>
              <Link to="/destinations#ireland" className="hover:text-brand-gold-light transition-colors">🇮🇪 {t('footer.ireland')}</Link>
              <Link to="/destinations#germany" className="hover:text-brand-gold-light transition-colors">🇩🇪 {t('footer.germany')}</Link>
              <Link to="/destinations#poland" className="hover:text-brand-gold-light transition-colors">🇵🇱 {t('footer.poland')}</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs">
          <span>{t('footer.copyright')}</span>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-brand-gold-light transition-colors">{t('footer.privacyPolicy')}</Link>
            <Link to="/terms" className="hover:text-brand-gold-light transition-colors">{t('footer.termsOfUse')}</Link>
            <span className="text-white/30">info@masomonow.com</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
