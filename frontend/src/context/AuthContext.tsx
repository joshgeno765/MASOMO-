import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { getMe, login as apiLogin } from '../lib/api'
import { User } from '../types'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('masomo_token')
    if (!token) { setIsLoading(false); return }

    getMe()
      .then((res) => { if (res.data) setUser(res.data) })
      .catch(() => localStorage.removeItem('masomo_token'))
      .finally(() => setIsLoading(false))
  }, [])

  const login = async (email: string, password: string) => {
    const res = await apiLogin(email, password)
    if (!res.data) throw new Error('Login failed')
    localStorage.setItem('masomo_token', res.data.token)
    setUser(res.data.user)
  }

  const logout = () => {
    localStorage.removeItem('masomo_token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
