import { useEffect, useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink, useLocation } from 'react-router-dom'
import {
  FaBars,
  FaBookOpen,
  FaCalendarDays,
  FaChevronDown,
  FaChevronUp,
  FaEarthAsia,
  FaEnvelope,
  FaHouse,
  FaLocationDot,
  FaPeopleGroup,
  FaPhone,
  FaRegUser,
  FaSuitcaseRolling,
  FaXmark,
} from 'react-icons/fa6'
import tripsnThrillsLogo from '../assets/tripsnthrills-logo.png'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Domestic Packages', to: '/domestic' },
  { label: 'International Packages', to: '/international' },
  { label: 'Group Trips', to: '/group-trips' },
  { label: 'Weekend Packages', to: '/weekend-getaways' },
  { label: 'Destinations', to: '/destinations' },
  { label: 'Customized Packages', to: '/customized-tours' },
  { label: 'Community', to: '/community' },
  { label: 'Blogs', to: '/blogs' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  // { label: 'Login', to: '/login' },
  { label: 'Plan My Trip', to: '/inquiry', className: 'nav-cta' },
]

const packageNavItems = navItems.filter((item) =>
  [
    '/domestic',
    '/international',
    '/group-trips',
    '/weekend-getaways',
    '/destinations',
    '/customized-tours',
  ].includes(item.to),
)
const desktopNavItems = navItems.filter((item) =>
  ['/', '/community', '/blogs', '/about', '/contact'].includes(item.to),
)
const mobileNavItems = navItems.filter((item) => item.className !== 'nav-cta')
const mobileIcons = {
  Home: FaHouse,
  'Domestic Packages': FaSuitcaseRolling,
  'International Packages': FaEarthAsia,
  'Group Trips': FaPeopleGroup,
  'Weekend Packages': FaCalendarDays,
  Destinations: FaLocationDot,
  'Customized Packages': FaEarthAsia,
  Community: FaPeopleGroup,
  Blogs: FaBookOpen,
  About: FaBookOpen,
  Contact: FaEnvelope,
}

function AppNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [packagesOpen, setPackagesOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHomeTop = location.pathname === '/' && !scrolled
  const isPackagesActive = packageNavItems.some((item) => item.to === location.pathname)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <Navbar expand="lg" fixed="top" expanded={menuOpen} className={`site-nav ${isHomeTop ? 'is-home-top' : 'is-scrolled'}`}>
      <Container fluid="xl">
        <Navbar.Brand as={NavLink} to="/" className="brand-mark">
          <img src={tripsnThrillsLogo} alt="TripsNThrills" />
        </Navbar.Brand>
        <button
          type="button"
          className="nav-drawer-toggle"
          aria-controls="main-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() =>
            setMenuOpen((current) => {
              const next = !current
              if (!next) setPackagesOpen(false)
              return next
            })
          }
        >
          {menuOpen ? <FaXmark /> : <FaBars />}
        </button>
        {menuOpen && <button type="button" className="nav-drawer-backdrop" aria-label="Close menu overlay" onClick={() => { setMenuOpen(false); setPackagesOpen(false) }} />}
        <Navbar.Collapse id="main-navigation">
          <div className="nav-drawer-header">
            <img src={tripsnThrillsLogo} alt="TripsNThrills" className="nav-drawer-logo" />
            <button type="button" className="nav-drawer-close" aria-label="Close menu" onClick={() => { setMenuOpen(false); setPackagesOpen(false) }}>
              <FaXmark />
            </button>
          </div>
          <Nav className="header-nav align-items-lg-center gap-lg-1">
            <div className="nav-desktop-links">
              <Nav.Link key="/" as={NavLink} to="/" onClick={() => setMenuOpen(false)}>
                Home
              </Nav.Link>
              <div
                className={`nav-more ${packagesOpen ? 'is-open' : ''}`}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) {
                    setPackagesOpen(false)
                  }
                }}
              >
                <button
                  type="button"
                  className={`nav-more-toggle ${isPackagesActive ? 'active' : ''}`}
                  aria-expanded={packagesOpen}
                  onClick={() => setPackagesOpen((current) => !current)}
                >
                  Packages {packagesOpen ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                <div className="nav-more-menu">
                  {packageNavItems.map((item) => (
                    <Nav.Link
                      key={item.to}
                      as={NavLink}
                      to={item.to}
                      className={item.className || ''}
                      onClick={() => {
                        setPackagesOpen(false)
                        setMenuOpen(false)
                      }}
                    >
                      {item.label}
                    </Nav.Link>
                  ))}
                </div>
              </div>
              {desktopNavItems
                .filter((item) => item.to !== '/')
                .map((item) => (
                  <Nav.Link
                    key={item.to}
                    as={NavLink}
                    to={item.to}
                    className={item.className || ''}
                    onClick={() => {
                      setPackagesOpen(false)
                      setMenuOpen(false)
                    }}
                  >
                    {item.label}
                  </Nav.Link>
                ))}
              {/*
                Keep the CTA visible on desktop as a direct action.
              */}
              <Nav.Link
                as={NavLink}
                to="/inquiry"
                className="nav-cta"
                onClick={() => {
                  setPackagesOpen(false)
                  setMenuOpen(false)
                }}
              >
                Plan My Trip
              </Nav.Link>
            </div>
            <div className="nav-mobile-links">
              {mobileNavItems.map((item) => {
                const Icon = mobileIcons[item.label] || FaLocationDot
                return (
                  <Nav.Link
                    key={item.to}
                    as={NavLink}
                    to={item.to}
                    className="nav-mobile-link-card"
                    onClick={() => {
                      setPackagesOpen(false)
                      setMenuOpen(false)
                    }}
                  >
                    <span className="nav-mobile-link-icon">
                      <Icon />
                    </span>
                    <span className="nav-mobile-link-text">{item.label}</span>
                  </Nav.Link>
                )
              })}
            </div>
            <div className="nav-mobile-cta">
              <Nav.Link
                as={NavLink}
                to="/inquiry"
                className="nav-mobile-cta-btn"
                onClick={() => {
                  setPackagesOpen(false)
                  setMenuOpen(false)
                }}
              >
                Plan My Trip
              </Nav.Link>
            </div>
            <div className="nav-actions">
              <a className="nav-call" href="tel:+919797972175" aria-label="Call TNT Tour and Travels">
                <FaPhone />
                <span>
                  <small>Call Us</small>
                  +91 000000000
                </span>
              </a>
              {/* <Nav.Link as={NavLink} to="/destinations" className="nav-icon-action" aria-label="Search tours">
                <FaMagnifyingGlass />
              </Nav.Link> */}
              <Nav.Link as={NavLink} className="nav-icon-action" aria-label="Profile" onClick={() => setMenuOpen(false)}>
                <FaRegUser />
              </Nav.Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default AppNavbar
