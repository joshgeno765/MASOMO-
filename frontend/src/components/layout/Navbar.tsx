import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageToggle from '../ui/LanguageToggle'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { t } = useTranslation()

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/about', label: t('nav.about') },
    { to: '/destinations', label: t('nav.destinations') },
    { to: '/resources', label: t('nav.resources') },
    { to: '/services', label: t('nav.services') },
    { to: '/contact', label: t('nav.contact') },
  ]

  return (
    <nav className="bg-navy sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-screen-2xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-brand-gold rounded-lg flex items-center justify-center font-extrabold text-navy text-base">
            MN
          </div>
          <img src="/images/elimu-logo.png" alt="ELIMU" className="h-7 w-auto flex-shrink-0" />
          <span className="text-white font-bold text-lg whitespace-nowrap">
            {t('brand.name')} <span className="text-brand-gold-light">{t('brand.now')}</span>
            <span className="ml-2 font-bold text-white">{t('brand.tagline')}</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden 2xl:flex items-center gap-1 flex-shrink-0">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-all duration-150 ${
                    isActive
                      ? 'text-brand-gold-light bg-white/10'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
          <li className="ml-2 flex-shrink-0">
            <LanguageToggle />
          </li>
          <li className="ml-2 flex-shrink-0">
            <Link
              to="/consultation"
              className="block bg-brand-gold text-navy font-bold text-sm px-4 py-2 rounded-md whitespace-nowrap hover:bg-brand-gold-light transition-all"
            >
              {t('nav.bookConsultation')}
            </Link>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <div className="2xl:hidden flex items-center gap-2">
          <LanguageToggle />
          <button
            className="text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={t('nav.toggleMenu')}
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="2xl:hidden bg-navy-mid border-t border-white/10">
          <div className="px-4 py-3 flex flex-col gap-1">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2.5 rounded-md text-sm font-medium ${
                    isActive ? 'text-brand-gold-light bg-white/10' : 'text-white/70'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <Link
              to="/consultation"
              onClick={() => setMobileOpen(false)}
              className="mt-2 text-center bg-brand-gold text-navy font-bold text-sm px-4 py-2.5 rounded-md"
            >
              {t('nav.bookConsultation')}
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
