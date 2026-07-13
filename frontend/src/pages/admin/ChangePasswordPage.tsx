import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { changePassword } from '../../lib/api'
import { useAuth } from '../../context/AuthContext'
import Button from '../../components/ui/Button'

export default function ChangePasswordPage() {
  const { refreshUser, logout } = useAuth()
  const navigate = useNavigate()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword.length < 8) return toast.error('New password must be at least 8 characters')
    if (newPassword !== confirmPassword) return toast.error('Passwords do not match')

    setSubmitting(true)
    try {
      await changePassword(currentPassword, newPassword)
      await refreshUser()
      toast.success('Password updated')
      navigate('/admin', { replace: true })
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { error?: string } } })?.response?.data?.error
      toast.error(msg || 'Could not update password')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg p-8">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-gold-dark mb-2">Staff Access</p>
        <h1 className="font-serif text-2xl text-navy mb-1">Set a new password</h1>
        <p className="text-gray-500 text-sm mb-6">
          You're signing in with a temporary password. Choose a new one to continue.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Temporary password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              autoFocus
              className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-navy focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">New password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="At least 8 characters"
              className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-navy placeholder-gray-400 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirm new password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-navy focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors"
            />
          </div>
          <Button type="submit" disabled={submitting} fullWidth className="mt-2">
            {submitting ? 'Updating...' : 'Update password'}
          </Button>
        </form>

        <button
          onClick={logout}
          className="block w-full text-center text-sm text-gray-400 hover:text-navy mt-6 transition-colors"
        >
          Sign out
        </button>
      </div>
    </div>
  )
}
