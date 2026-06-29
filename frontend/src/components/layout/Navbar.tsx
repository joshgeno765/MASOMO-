import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/destinations', label: 'Destinations' },
    { to: '/fmc-pilot', label: 'FMC Pilot' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <nav className="bg-navy sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-brand-gold rounded-lg flex items-center justify-center font-extrabold text-navy text-base">
            MN
          </div>
          <span className="text-white font-bold text-lg">
            Masomo <span className="text-brand-gold-light">Now</span>
            <span className="ml-2 font-bold text-white">Sky is the beginning</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 ${
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
          <li className="ml-2">
            <Link
              to="/contact"
              className="bg-brand-gold text-navy font-bold text-sm px-4 py-2 rounded-md hover:bg-brand-gold-light transition-all"
            >
              Book Consultation →
            </Link>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-navy-mid border-t border-white/10">
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
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 text-center bg-brand-gold text-navy font-bold text-sm px-4 py-2.5 rounded-md"
            >
              Book Consultation →
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
