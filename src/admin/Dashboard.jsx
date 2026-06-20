import { useCallback, useEffect, useMemo, useState } from 'react'
import { Alert, Button, Col, Row, Spinner } from 'react-bootstrap'
import {
  FaEnvelope,
  FaHouse,
  FaInbox,
  FaPhoneVolume,
  FaRightFromBracket,
  FaSuitcaseRolling,
  FaUserShield,
} from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import ContactTable from './ContactTable'
import InquiryTable from './InquiryTable'
import PackageManager from './PackageManager'
import {
  createPackage,
  deleteContact,
  deleteInquiry,
  deletePackage,
  getAdminPackages,
  getContacts,
  getInquiries,
  updatePackage,
} from '../services/api'

const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: <FaHouse /> },
  { key: 'packages', label: 'Packages', icon: <FaSuitcaseRolling /> },
  { key: 'inquiries', label: 'Inquiries', icon: <FaInbox /> },
  { key: 'contacts', label: 'Contacts', icon: <FaEnvelope /> },
]

function Dashboard() {
  const navigate = useNavigate()
  const [activeView, setActiveView] = useState('dashboard')
  const [inquiries, setInquiries] = useState([])
  const [contacts, setContacts] = useState([])
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const stats = useMemo(() => {
    return {
      inquiries: inquiries.length,
      contacts: contacts.length,
      packages: packages.length,
      pending: inquiries.length,
    }
  }, [contacts.length, inquiries.length, packages.length])

  const loadDashboard = useCallback(async () => {
    setError('')
    try {
      setLoading(true)
      const [inquiryResponse, contactResponse, packageResponse] = await Promise.all([getInquiries(), getContacts(), getAdminPackages()])
      setInquiries(inquiryResponse.data)
      setContacts(contactResponse.data)
      setPackages(packageResponse.data)
    } catch (apiError) {
      if (apiError.response?.status === 401) {
        localStorage.removeItem('tripnest_admin_token')
        navigate('/login')
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
    navigate('/login')
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

  const renderView = () => {
    if (activeView === 'packages') {
      return (
        <PackageManager
          packages={packages}
          onCreate={handleCreatePackage}
          onUpdate={handleUpdatePackage}
          onDelete={handleDeletePackage}
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
        <Row className="g-3 admin-stats">
          <Col sm={6} xl={3}>
            <button className="admin-stat-card admin-stat-button" onClick={() => setActiveView('inquiries')}>
              <FaInbox /><span>Total Inquiries</span><strong>{stats.inquiries}</strong>
            </button>
          </Col>
          <Col sm={6} xl={3}>
            <button className="admin-stat-card admin-stat-button" onClick={() => setActiveView('inquiries')}>
              <FaPhoneVolume /><span>Pending Calls</span><strong>{stats.pending}</strong>
            </button>
          </Col>
          <Col sm={6} xl={3}>
            <button className="admin-stat-card admin-stat-button" onClick={() => setActiveView('packages')}>
              <FaSuitcaseRolling /><span>Packages</span><strong>{stats.packages}</strong>
            </button>
          </Col>
          <Col sm={6} xl={3}>
            <button className="admin-stat-card admin-stat-button" onClick={() => setActiveView('contacts')}>
              <FaEnvelope /><span>Messages</span><strong>{stats.contacts}</strong>
            </button>
          </Col>
        </Row>

        <Row className="g-4">
          <Col lg={12}>
            <InquiryTable inquiries={inquiries.slice(0, 5)} onDelete={handleDeleteInquiry} />
          </Col>
          <Col lg={12}>
            <ContactTable contacts={contacts.slice(0, 5)} onDelete={handleDeleteContact} />
          </Col>
        </Row>
      </div>
    )
  }

  const activeTitle = navItems.find((item) => item.key === activeView)?.label || 'Dashboard'

  return (
    <section className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-logo"><FaUserShield /> TNT Admin</div>
        <div className="admin-nav">
          {navItems.map((item) => (
            <button
              className={activeView === item.key ? 'active' : ''}
              key={item.key}
              onClick={() => setActiveView(item.key)}
              type="button"
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
        <Button variant="light" onClick={logout}><FaRightFromBracket /> Logout</Button>
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
