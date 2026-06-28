import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './context/AuthContext'

import Layout from './components/layout/Layout'
import AdminLayout from './components/layout/AdminLayout'

import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import StudyDestinationsPage from './pages/StudyDestinationsPage'
import FMCPilotPage from './pages/FMCPilotPage'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/LoginPage'
import AdminHomePage from './pages/admin/AdminHomePage'
import LeadsPage from './pages/admin/LeadsPage'

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  if (isLoading) return <div className="min-h-screen bg-navy flex items-center justify-center text-white/50 text-sm">Loading...</div>
  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="bottom-right" />
        <Routes>
          {/* Public website */}
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/destinations" element={<StudyDestinationsPage />} />
            <Route path="/fmc-pilot" element={<FMCPilotPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>

          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />

          {/* Admin portal */}
          <Route
            path="/admin"
            element={<RequireAuth><AdminLayout /></RequireAuth>}
          >
            <Route index element={<AdminHomePage />} />
            <Route path="leads" element={<LeadsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
