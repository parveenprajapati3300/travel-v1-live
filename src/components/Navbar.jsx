import { useEffect, useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink, useLocation } from 'react-router-dom'
import { FaPlaneDeparture } from 'react-icons/fa6'

function AppNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHomeTop = location.pathname === '/' && !scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <Navbar expand="lg" fixed="top" className={`site-nav ${isHomeTop ? 'is-home-top' : 'is-scrolled'}`}>
      <Container fluid="xl">
        <Navbar.Brand as={NavLink} to="/" className="brand-mark">
          <span><FaPlaneDeparture /></span>
          TravelSphere
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navigation" />
        <Navbar.Collapse id="main-navigation">
          <Nav className="ms-auto align-items-lg-center gap-lg-1">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/destinations">Destinations</Nav.Link>
            <Nav.Link as={NavLink} to="/group-trips">Group Trips</Nav.Link>
            <Nav.Link as={NavLink} to="/international">International</Nav.Link>
            <Nav.Link as={NavLink} to="/weekend-getaways">Weekend</Nav.Link>
            <Nav.Link as={NavLink} to="/customized-tours">Customized Tours</Nav.Link>
            <Nav.Link as={NavLink} to="/community">Community</Nav.Link>
            <Nav.Link as={NavLink} to="/blogs">Blogs</Nav.Link>
            <Nav.Link as={NavLink} to="/about">About</Nav.Link>
            <Nav.Link as={NavLink} to="/contact">Contact</Nav.Link>
            <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
            <Nav.Link as={NavLink} to="/inquiry" className="nav-cta">Plan My Trip</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default AppNavbar
