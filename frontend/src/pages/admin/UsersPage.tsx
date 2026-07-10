import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { getUsers, createUser, toggleUserActive, StaffUser } from '../../lib/api'

const EMPTY_FORM = { email: '', password: '', role: 'COUNSELOR' as 'ADMIN' | 'COUNSELOR' }

export default function UsersPage() {
  const [users, setUsers] = useState<StaffUser[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const load = () => {
    setLoading(true)
    getUsers()
      .then((res) => setUsers(res.data ?? []))
      .catch(() => toast.error('Failed to load users'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.email.includes('@')) return toast.error('Enter a valid email')
    if (form.password.length < 8) return toast.error('Password must be at least 8 characters')
    setSubmitting(true)
    try {
      await createUser(form.email, form.password, form.role)
      toast.success(`Account created for ${form.email}`)
      setForm(EMPTY_FORM)
      setShowForm(false)
      load()
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { error?: string } } })?.response?.data?.error
      toast.error(msg || 'Failed to create account')
    } finally {
      setSubmitting(false)
    }
  }

  const handleToggle = async (user: StaffUser) => {
    try {
      await toggleUserActive(user.id, !user.isActive)
      setUsers((prev) => prev.map((u) => u.id === user.id ? { ...u, isActive: !u.isActive } : u))
      toast.success(user.isActive ? `${user.email} deactivated` : `${user.email} activated`)
    } catch {
      toast.error('Failed to update account')
    }
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-serif text-2xl text-navy">Team Accounts</h1>
          <p className="text-gray-500 text-sm mt-1">Manage counselor and admin login access</p>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="bg-navy hover:bg-brand-blue text-white text-sm font-bold px-4 py-2.5 rounded-lg transition-colors"
        >
          {showForm ? 'Cancel' : '+ Add Account'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="border border-gray-200 rounded-lg p-6 mb-8 bg-white space-y-4">
          <h2 className="font-semibold text-navy mb-2">New Account</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                placeholder="counselor@masomonow.com"
                className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                placeholder="Min. 8 characters"
                className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Role</label>
              <select
                value={form.role}
                onChange={(e) => setForm((p) => ({ ...p, role: e.target.value as 'ADMIN' | 'COUNSELOR' }))}
                className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all bg-white"
              >
                <option value="COUNSELOR">Counselor</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="bg-navy hover:bg-brand-blue text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors disabled:opacity-60"
          >
            {submitting ? 'Creating...' : 'Create Account'}
          </button>
        </form>
      )}

      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
        {loading ? (
          <div className="px-6 py-8 text-gray-500 text-sm">Loading...</div>
        ) : users.length === 0 ? (
          <div className="px-6 py-8 text-gray-500 text-sm">No accounts yet</div>
        ) : (
          users.map((user, i) => (
            <div
              key={user.id}
              className={`flex items-center justify-between px-5 py-4 ${i < users.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <div>
                <div className="font-semibold text-navy text-sm">{user.email}</div>
                <div className="text-xs text-gray-500 mt-0.5">{user.role}</div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded ${user.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {user.isActive ? 'Active' : 'Inactive'}
                </span>
                <button
                  onClick={() => handleToggle(user)}
                  className="text-xs text-gray-500 hover:text-navy transition-colors"
                >
                  {user.isActive ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
