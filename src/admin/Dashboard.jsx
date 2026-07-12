import { useCallback, useEffect, useMemo, useState } from 'react'
import { Alert, Button, Col, Row, Spinner } from 'react-bootstrap'
import {
  FaEnvelope,
  FaBars,
  FaHouse,
  FaLayerGroup,
  FaInbox,
  FaPlus,
  FaRightFromBracket,
  FaSuitcaseRolling,
  FaMapLocationDot,
  FaUserShield,
} from 'react-icons/fa6'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import ContactTable from './ContactTable'
import InquiryTable from './InquiryTable'
import PackageManager from './PackageManager'
import TaxonomyManager from './TaxonomyManager'
import {
  createCategory,
  createDestination,
  createPackage,
  deleteCategory,
  deleteDestination,
  deleteContact,
  deleteInquiry,
  deletePackage,
  getAdminCategories,
  getAdminDestinations,
  getAdminPackages,
  getContacts,
  getInquiries,
  updateCategory,
  updateDestination,
  updatePackage,
} from '../services/api'

const navItems = [
  { key: 'dashboard', label: 'Dashboard', path: '/admin/dashboard', icon: <FaHouse /> },
  { key: 'packages', label: 'Packages', path: '/admin/packages', icon: <FaSuitcaseRolling /> },
  { key: 'destinations', label: 'Destinations', path: '/admin/destinations', icon: <FaMapLocationDot /> },
  { key: 'categories', label: 'Categories', path: '/admin/categories', icon: <FaLayerGroup /> },
  { key: 'inquiries', label: 'Inquiries', path: '/admin/inquiries', icon: <FaInbox /> },
  { key: 'contacts', label: 'Contacts', path: '/admin/contacts', icon: <FaEnvelope /> },
]

function Dashboard() {
  const navigate = useNavigate()
  const location = useLocation()
  const { section = 'dashboard' } = useParams()
  const activeView = navItems.some((item) => item.key === section) ? section : 'dashboard'
  const [inquiries, setInquiries] = useState([])
  const [contacts, setContacts] = useState([])
  const [packages, setPackages] = useState([])
  const [destinations, setDestinations] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const stats = useMemo(() => {
    return {
      leads: inquiries.length + contacts.length,
      inquiries: inquiries.length,
      contacts: contacts.length,
      packages: packages.length,
      destinations: destinations.length,
      categories: categories.length,
    }
  }, [categories.length, contacts.length, destinations.length, inquiries.length, packages.length])

  const loadDashboard = useCallback(async () => {
    setError('')
    try {
      setLoading(true)
      const [inquiryResponse, contactResponse, packageResponse, destinationResponse, categoryResponse] = await Promise.all([
        getInquiries(),
        getContacts(),
        getAdminPackages(),
        getAdminDestinations(),
        getAdminCategories(),
      ])
      setInquiries(inquiryResponse.data)
      setContacts(contactResponse.data)
      setPackages(packageResponse.data)
      setDestinations(destinationResponse.data)
      setCategories(categoryResponse.data)
    } catch (apiError) {
      if (apiError.response?.status === 401) {
        localStorage.removeItem('tripnest_admin_token')
        navigate('/admin-login')
        return
      }
      setError(apiError.response?.data?.message || 'Unable to load dashboard data.')
    } finally {
      setLoading(false)
    }
  }, [navigate])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadDashboard()
  }, [loadDashboard])

  const logout = () => {
    localStorage.removeItem('tripnest_admin_token')
    localStorage.removeItem('tripnest_admin_email')
    navigate('/admin-login')
  }

  const goToView = (view) => {
    navigate(navItems.find((item) => item.key === view)?.path || '/admin/dashboard')
  }

  const handleDeleteInquiry = async (id) => {
    await deleteInquiry(id)
    setInquiries((current) => current.filter((item) => item._id !== id))
    setNotice('Inquiry deleted successfully.')
  }

  const handleDeleteContact = async (id) => {
    await deleteContact(id)
    setContacts((current) => current.filter((item) => item._id !== id))
    setNotice('Contact message deleted successfully.')
  }

  const handleCreatePackage = async (payload) => {
    const { data } = await createPackage(payload)
    setPackages((current) => [data.package, ...current])
    setNotice('Package created successfully.')
  }

  const handleUpdatePackage = async (id, payload) => {
    const { data } = await updatePackage(id, payload)
    setPackages((current) => current.map((item) => (item._id === id ? data.package : item)))
    setNotice('Package updated successfully.')
  }

  const handleDeletePackage = async (id) => {
    await deletePackage(id)
    setPackages((current) => current.filter((item) => item._id !== id))
    setNotice('Package deleted successfully.')
  }

  const handleCreateDestination = async (payload) => {
    const { data } = await createDestination(payload)
    setDestinations((current) => [data.destination, ...current])
    setNotice('Destination created successfully.')
  }

  const handleUpdateDestination = async (id, payload) => {
    const { data } = await updateDestination(id, payload)
    setDestinations((current) => current.map((item) => (item._id === id ? data.destination : item)))
    setNotice('Destination updated successfully.')
  }

  const handleDeleteDestination = async (id) => {
    await deleteDestination(id)
    setDestinations((current) => current.filter((item) => item._id !== id))
    setNotice('Destination deleted successfully.')
  }

  const handleCreateCategory = async (payload) => {
    const { data } = await createCategory(payload)
    setCategories((current) => [data.category, ...current])
    setNotice('Category created successfully.')
  }

  const handleUpdateCategory = async (id, payload) => {
    const { data } = await updateCategory(id, payload)
    setCategories((current) => current.map((item) => (item._id === id ? data.category : item)))
    setNotice('Category updated successfully.')
  }

  const handleDeleteCategory = async (id) => {
    await deleteCategory(id)
    setCategories((current) => current.filter((item) => item._id !== id))
    setNotice('Category deleted successfully.')
  }

  const renderView = () => {
    if (activeView === 'packages') {
      return (
        <PackageManager
          packages={packages}
          destinations={destinations}
          categories={categories}
          onCreate={handleCreatePackage}
          onUpdate={handleUpdatePackage}
          onDelete={handleDeletePackage}
        />
      )
    }

    if (activeView === 'destinations') {
      return (
        <TaxonomyManager
          items={destinations}
          title="Destination List"
          label="Destination"
          includePrice
          includeType
          onCreate={handleCreateDestination}
          onUpdate={handleUpdateDestination}
          onDelete={handleDeleteDestination}
        />
      )
    }

    if (activeView === 'categories') {
      return (
        <TaxonomyManager
          items={categories}
          title="Category List"
          label="Category"
          onCreate={handleCreateCategory}
          onUpdate={handleUpdateCategory}
          onDelete={handleDeleteCategory}
        />
      )
    }

    if (activeView === 'inquiries') {
      return (
        <div className="admin-screen">
          <div className="admin-view-header">
            <div>
              <span className="eyebrow">Inquiries</span>
              <h2>Tour Inquiries</h2>
            </div>
          </div>
          <InquiryTable inquiries={inquiries} onDelete={handleDeleteInquiry} />
        </div>
      )
    }

    if (activeView === 'contacts') {
      return (
        <div className="admin-screen">
          <div className="admin-view-header">
            <div>
              <span className="eyebrow">Contacts</span>
              <h2>Contact Messages</h2>
            </div>
          </div>
          <ContactTable contacts={contacts} onDelete={handleDeleteContact} />
        </div>
      )
    }

    return (
      <div className="admin-screen">
        <div className="admin-dashboard-hero">
          <div>
            <span className="eyebrow">Live Overview</span>
            <h2>Manage trips, leads, and website content from one place.</h2>
            <p>Keep destinations, categories, packages, inquiries, and contact messages fresh for the frontend.</p>
          </div>
          <div className="admin-hero-actions">
            <Button className="btn-gradient" onClick={() => goToView('packages')}><FaPlus /> Add Package</Button>
            <Button variant="light" onClick={() => goToView('destinations')}><FaMapLocationDot /> Destinations</Button>
          </div>
        </div>

        <div className="admin-stat-grid">
          {[
            ['Leads', stats.leads, <FaInbox />, 'inquiries', `${stats.inquiries} inquiries + ${stats.contacts} messages`],
            ['Packages', stats.packages, <FaSuitcaseRolling />, 'packages', 'Active travel products'],
            ['Destinations', stats.destinations, <FaMapLocationDot />, 'destinations', 'Places shown on site'],
            ['Categories', stats.categories, <FaLayerGroup />, 'categories', 'Themes and tour styles'],
          ].map(([label, value, icon, view, hint]) => (
            <button className="admin-stat-card admin-stat-button" key={label} onClick={() => goToView(view)}>
              <span className="admin-stat-icon">{icon}</span>
              <span>{label}</span>
              <strong>{value}</strong>
              <small>{hint}</small>
            </button>
          ))}
        </div>

        <Row className="g-4">
          <Col xs={12}>
            <div className="admin-preview-card">
              <div className="admin-preview-header">
                <div>
                  <span className="eyebrow">Recent Leads</span>
                  <h3>Latest Tour Inquiries</h3>
                </div>
                <Button variant="outline-dark" size="sm" onClick={() => goToView('inquiries')}>View All</Button>
              </div>
              <InquiryTable inquiries={inquiries.slice(0, 5)} onDelete={handleDeleteInquiry} />
            </div>
          </Col>
          <Col xs={12}>
            <div className="admin-preview-card">
              <div className="admin-preview-header">
                <div>
                  <span className="eyebrow">Messages</span>
                  <h3>Recent Contacts</h3>
                </div>
                <Button variant="outline-dark" size="sm" onClick={() => goToView('contacts')}>View All</Button>
              </div>
              <ContactTable contacts={contacts.slice(0, 5)} onDelete={handleDeleteContact} />
            </div>
          </Col>
        </Row>
      </div>
    )
  }

  const activeTitle = navItems.find((item) => item.key === activeView)?.label || 'Dashboard'

  useEffect(() => {
    if (!navItems.some((item) => item.key === section)) {
      navigate('/admin/dashboard', { replace: true })
    }
  }, [navigate, section])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return (
    <section className={`admin-layout ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <aside className="admin-sidebar">
        <div className="admin-sidebar-head">
          <div className="admin-logo" title="TNT Admin">
            <FaUserShield />
            <span>TNT Admin</span>
          </div>
          <button
            type="button"
            className="admin-menu-toggle"
            onClick={() => setSidebarCollapsed((current) => !current)}
            aria-label={sidebarCollapsed ? 'Open sidebar' : 'Collapse sidebar'}
            title={sidebarCollapsed ? 'Open menu' : 'Close menu'}
          >
            <FaBars />
          </button>
        </div>
        <div className="admin-nav">
          {navItems.map((item) => (
            <button
              className={activeView === item.key ? 'active' : ''}
              key={item.key}
              onClick={() => navigate(item.path)}
              type="button"
              title={item.label}
              data-label={item.label}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        <Button variant="light" onClick={logout} title="Logout" data-label="Logout"><FaRightFromBracket /> <span>Logout</span></Button>
      </aside>

      <main className="admin-main">
        <div className="admin-topbar">
          <div>
            <span className="eyebrow">Admin Panel</span>
            <h1>{activeTitle}</h1>
          </div>
          <Button variant="outline-dark" onClick={logout}><FaRightFromBracket /> Logout</Button>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}
        {notice && <Alert variant="success" onClose={() => setNotice('')} dismissible>{notice}</Alert>}

        {loading ? (
          <div className="admin-loading"><Spinner animation="border" /> Loading dashboard...</div>
        ) : renderView()}
      </main>
    </section>
  )
}

export default Dashboard
