import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { AuthProvider, useAuth } from './context/AuthContext'

import Layout from './components/layout/Layout'
import AdminLayout from './components/layout/AdminLayout'
import ErrorBoundary from './components/ErrorBoundary'

// Each page is its own separate JS chunk — only loaded when the user visits that route
const HomePage = lazy(() => import('./pages/HomePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const StudyDestinationsPage = lazy(() => import('./pages/StudyDestinationsPage'))
const FMCPilotPage = lazy(() => import('./pages/FMCPilotPage'))
const PathwayFinderPage = lazy(() => import('./pages/PathwayFinderPage'))
const CostCalculatorPage = lazy(() => import('./pages/CostCalculatorPage'))
const ProgramSearchPage = lazy(() => import('./pages/ProgramSearchPage'))
const ResourcesPage = lazy(() => import('./pages/ResourcesPage'))
const ArticlePage = lazy(() => import('./pages/ArticlePage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const ConsultationPage = lazy(() => import('./pages/ConsultationPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'))
const TermsOfUsePage = lazy(() => import('./pages/TermsOfUsePage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const ChangePasswordPage = lazy(() => import('./pages/admin/ChangePasswordPage'))
const AdminHomePage = lazy(() => import('./pages/admin/AdminHomePage'))
const LeadsPage = lazy(() => import('./pages/admin/LeadsPage'))
const ConsultationsPage = lazy(() => import('./pages/admin/ConsultationsPage'))
const UsersPage = lazy(() => import('./pages/admin/UsersPage'))
const ProfilePage = lazy(() => import('./pages/admin/ProfilePage'))

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-6 h-6 border-2 border-navy border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const location = useLocation()
  if (isLoading) return <PageLoader />
  if (!user) return <Navigate to="/login" replace />
  if (user.mustChangePassword && location.pathname !== '/admin/change-password') {
    return <Navigate to="/admin/change-password" replace />
  }
  return <>{children}</>
}

export default function App() {
  const { i18n } = useTranslation()

  useEffect(() => {
    sessionStorage.removeItem('masomo_chunk_reload_attempted')
  }, [])

  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage || 'en'
  }, [i18n.resolvedLanguage])

  return (
    <ErrorBoundary>
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
                <Route path="/cost-calculator" element={<CostCalculatorPage />} />
                <Route path="/programs" element={<ProgramSearchPage />} />
                <Route path="/resources" element={<ResourcesPage />} />
                <Route path="/resources/:slug" element={<ArticlePage />} />
                <Route path="/universities" element={<Navigate to="/destinations" replace />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/consultation" element={<ConsultationPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy" element={<PrivacyPolicyPage />} />
                <Route path="/terms" element={<TermsOfUsePage />} />
              </Route>

              {/* Auth */}
              <Route path="/login" element={<LoginPage />} />
              {/* /admin/login is the natural URL people actually type/bookmark */}
              <Route path="/admin/login" element={<Navigate to="/login" replace />} />

              {/* Forced password change — outside AdminLayout so there's no sidebar to escape through */}
              <Route path="/admin/change-password" element={<RequireAuth><ChangePasswordPage /></RequireAuth>} />

              {/* Admin portal */}
              <Route
                path="/admin"
                element={<RequireAuth><AdminLayout /></RequireAuth>}
              >
                <Route index element={<AdminHomePage />} />
                <Route path="leads" element={<LeadsPage />} />
                <Route path="consultations" element={<ConsultationsPage />} />
                <Route path="users" element={<UsersPage />} />
                <Route path="profile" element={<ProfilePage />} />
              </Route>

              {/* Anything else — never leave the screen blank */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  )
}
