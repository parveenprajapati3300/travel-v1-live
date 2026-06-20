import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import AOS from 'aos'
import { AnimatePresence, motion } from 'framer-motion'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'aos/dist/aos.css'
import './index.css'
import AppNavbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingActions from './components/FloatingActions'
import ScrollToTop from './components/ScrollToTop'
import LoadingSpinner from './components/LoadingSpinner'
import Home from './pages/Home'
import About from './pages/About'
import Domestic from './pages/Domestic'
import Destinations from './pages/Destinations'
import DestinationPackages from './pages/DestinationPackages'
import GroupTrips from './pages/GroupTrips'
import International from './pages/International'
import WeekendGetaways from './pages/WeekendGetaways'
import CustomizedTours from './pages/CustomizedTours'
import Community from './pages/Community'
import Blogs from './pages/Blogs'
import PackageDetails from './pages/PackageDetails'
import CategoryPackages from './pages/CategoryPackages'
import Contact from './pages/Contact'
import Inquiry from './pages/Inquiry'
import Login from './pages/Login'
import Dashboard from './admin/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'

function PageShell({ children }) {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -14 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  )
}

function AppRoutes() {
  return (
    <PageShell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/destination/:slug" element={<DestinationPackages />} />
        <Route path="/category/:slug" element={<CategoryPackages />} />
        <Route path="/domestic" element={<Domestic />} />
        <Route path="/group-trips" element={<GroupTrips />} />
        <Route path="/international" element={<International />} />
        <Route path="/weekend-getaways" element={<WeekendGetaways />} />
        <Route path="/customized-tours" element={<CustomizedTours />} />
        <Route path="/community" element={<Community />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/package/:id" element={<PackageDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/inquiry" element={<Inquiry />} />
        <Route path="/admin-login" element={<Login />} />
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route
          path="/admin/:section"
          element={(
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          )}
        />
      </Routes>
    </PageShell>
  )
}

function AppContent() {
  const location = useLocation()
  const isAdminArea = location.pathname.startsWith('/admin')

  return (
    <>
      {!isAdminArea && <AppNavbar />}
      <AppRoutes />
      {!isAdminArea && <Footer />}
      {!isAdminArea && <FloatingActions />}
      <ScrollToTop />
    </>
  )
}

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 80 })
    const timer = setTimeout(() => setLoading(false), 650)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
