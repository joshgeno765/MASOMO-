import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const navItems = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/leads', label: 'Leads', end: false },
  { to: '/admin/consultations', label: 'Consultations', end: false },
  { to: '/admin/users', label: 'Team', end: false },
  { to: '/admin/profile', label: 'Profile', end: false },
]

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-52 bg-navy flex-shrink-0 flex flex-col">
        <div className="px-5 py-5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-brand-gold rounded flex items-center justify-center font-extrabold text-navy text-xs">MN</div>
            <span className="text-white font-bold text-sm">Masomo Now</span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `block px-3 py-2 text-sm transition-colors rounded ${
                  isActive ? 'text-white bg-white/10' : 'text-white/50 hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="px-5 py-4 border-t border-white/10">
          <div className="flex items-center gap-2.5 mb-3">
            {user?.avatarUrl ? (
              <img src={user.avatarUrl} alt="" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                {(user?.firstName?.[0] ?? user?.email?.[0] ?? '?').toUpperCase()}
              </div>
            )}
            <div className="min-w-0">
              <div className="text-white text-xs font-semibold truncate">
                {[user?.firstName, user?.lastName].filter(Boolean).join(' ') || user?.email}
              </div>
              {(user?.firstName || user?.lastName) && (
                <div className="text-white/40 text-[11px] truncate">{user?.email}</div>
              )}
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-white/40 hover:text-white text-xs transition-colors"
          >
            Sign out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}