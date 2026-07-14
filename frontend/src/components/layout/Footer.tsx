import { Link } from 'react-router-dom'

export default function Footer() {
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
                Masomo <span className="text-brand-gold-light">Now</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs mb-4">
              International education consultancy helping Francophone African students access world-class institutions abroad — with a focus on Canadian francophone pathways.
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
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">Navigate</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-sm hover:text-brand-gold-light transition-colors">Home</Link>
              <Link to="/about" className="text-sm hover:text-brand-gold-light transition-colors">About Us</Link>
              <Link to="/destinations" className="text-sm hover:text-brand-gold-light transition-colors">Study Destinations</Link>
              <Link to="/services" className="text-sm hover:text-brand-gold-light transition-colors">Services</Link>
              <Link to="/fmc-pilot" className="text-sm hover:text-brand-gold-light transition-colors">🇨🇦 FMC Pilot Program</Link>
              <Link to="/consultation" className="text-sm hover:text-brand-gold-light transition-colors">Book Consultation</Link>
              <Link to="/contact" className="text-sm hover:text-brand-gold-light transition-colors">Contact</Link>
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">Destinations</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link to="/fmc-pilot" className="hover:text-brand-gold-light transition-colors">🇨🇦 Canada (FMC Pilot)</Link>
              <Link to="/destinations#united-states" className="hover:text-brand-gold-light transition-colors">🇺🇸 United States</Link>
              <Link to="/destinations#ireland" className="hover:text-brand-gold-light transition-colors">🇮🇪 Ireland</Link>
              <Link to="/destinations#germany" className="hover:text-brand-gold-light transition-colors">🇩🇪 Germany</Link>
              <Link to="/destinations#poland" className="hover:text-brand-gold-light transition-colors">🇵🇱 Poland</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs">
          <span>© 2026 Masomo Now. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-brand-gold-light transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-brand-gold-light transition-colors">Terms of Use</Link>
            <span className="text-white/30">info@masomonow.com</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
