import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './context/AuthContext'

import Layout from './components/layout/Layout'
import AdminLayout from './components/layout/AdminLayout'

// Each page is its own separate JS chunk — only loaded when the user visits that route
const HomePage = lazy(() => import('./pages/HomePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const StudyDestinationsPage = lazy(() => import('./pages/StudyDestinationsPage'))
const FMCPilotPage = lazy(() => import('./pages/FMCPilotPage'))
const PathwayFinderPage = lazy(() => import('./pages/PathwayFinderPage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const ConsultationPage = lazy(() => import('./pages/ConsultationPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const AdminHomePage = lazy(() => import('./pages/admin/AdminHomePage'))
const LeadsPage = lazy(() => import('./pages/admin/LeadsPage'))
const ConsultationsPage = lazy(() => import('./pages/admin/ConsultationsPage'))
const UsersPage = lazy(() => import('./pages/admin/UsersPage'))

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-6 h-6 border-2 border-navy border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  if (isLoading) return <PageLoader />
  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="bottom-right" />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public website */}
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/destinations" element={<StudyDestinationsPage />} />
              <Route path="/fmc-pilot" element={<FMCPilotPage />} />
              <Route path="/pathway-finder" element={<PathwayFinderPage />} />
              <Route path="/universities" element={<Navigate to="/destinations" replace />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/consultation" element={<ConsultationPage />} />
              <Route path="/contact" element={<Navigate to="/consultation" replace />} />
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
              <Route path="consultations" element={<ConsultationsPage />} />
              <Route path="users" element={<UsersPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  )
}
