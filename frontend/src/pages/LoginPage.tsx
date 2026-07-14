import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import Button from '../components/ui/Button'
import { northAmerica, europe } from '../data/destinations'

const partnerSchools = [...northAmerica, ...europe].flatMap((country) => country.schools.map((s) => s.name))

export default function LoginPage() {
  const { login, user, isLoading } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!isLoading && user) navigate('/admin', { replace: true })
  }, [user, isLoading, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return toast.error('Please enter your email and password')
    setSubmitting(true)
    try {
      await login(email, password)
      navigate('/admin', { replace: true })
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { error?: string } } })?.response?.data?.error
      toast.error(msg || 'Could not reach server — check your connection')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-dvh flex">
      {/* Photo panel */}
      <div className="hidden md:flex md:w-1/2 lg:w-3/5 relative overflow-hidden">
        <img
          src="/images/seminars/seminar-1.webp"
          alt="A Masomo Now / ELIMU seminar with students in Kenya"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/20" />
        <div className="relative flex flex-col justify-end h-full px-12 pb-16 max-w-xl">
          <p className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-3">Masomo Now — Staff Portal</p>
          <h1 className="font-serif text-3xl lg:text-4xl text-white leading-tight mb-4">
            Guiding Francophone African students to campuses abroad
          </h1>
          <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-3 py-1.5 text-xs font-semibold text-white w-fit">
            🛂 RCIC Licensed
          </span>
        </div>
      </div>

      {/* Form panel */}
      <div className="w-full md:w-1/2 lg:w-2/5 flex items-center justify-center bg-white px-5 py-10 sm:px-6 sm:py-12">
        <div className="w-full max-w-sm">
          <Link to="/" className="flex items-center gap-2.5 mb-8 sm:mb-10">
            <div className="w-9 h-9 bg-brand-gold rounded-lg flex items-center justify-center font-extrabold text-navy text-base flex-shrink-0">MN</div>
            <img src="/images/elimu-logo.png" alt="ELIMU" className="h-7 w-auto flex-shrink-0" />
            <span className="text-navy font-bold text-lg">Masomo Now</span>
          </Link>

          <p className="text-xs font-bold uppercase tracking-widest text-brand-gold-dark mb-2">Staff Access</p>
          <h2 className="font-serif text-2xl sm:text-3xl text-navy mb-1">Sign in</h2>
          <p className="text-gray-500 text-sm mb-6 sm:mb-8">Masomo Now team access only</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@masomonow.com"
                autoFocus
                className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-base sm:text-sm text-navy placeholder-gray-400 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-base sm:text-sm text-navy placeholder-gray-400 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors"
              />
            </div>
            <Button type="submit" disabled={submitting} fullWidth className="mt-2">
              {submitting ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <Link to="/" className="block text-center text-sm text-gray-400 hover:text-navy mt-8 transition-colors">
            ← Back to masomonow.com
          </Link>

          <div className="hidden sm:block mt-10 pt-6 border-t border-gray-100">
            <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3 text-center">Our Partner Schools</p>
            <p className="text-xs text-gray-400 text-center leading-relaxed">
              {partnerSchools.join(' · ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
