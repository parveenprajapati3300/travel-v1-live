import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaLocationDot, FaPhone, FaYoutube } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
import tripsnThrillsLogo from '../assets/tripsnthrills-logo.png'

function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row className="g-4">
          <Col lg={4}>
            <img className="footer-logo" src={tripsnThrillsLogo} alt="TripsNThrills" />
            <p>Custom holiday packages, group trips, family tours, and expert travel support from New Delhi.</p>
            <div className="social-links">
              <a href="https://instagram.com" aria-label="Instagram"><FaInstagram /></a>
              <a href="https://facebook.com" aria-label="Facebook"><FaFacebookF /></a>
              <a href="https://youtube.com" aria-label="YouTube"><FaYoutube /></a>
              <a href="https://linkedin.com" aria-label="LinkedIn"><FaLinkedinIn /></a>
            </div>
          </Col>
          <Col md={4} lg={2}>
            <h4>Quick Links</h4>
            <Link to="/about">About</Link>
            <Link to="/domestic">Destinations</Link>
            <Link to="/international">International Trips</Link>
            <Link to="/inquiry">Plan My Trip</Link>
            <Link to="/contact">Terms</Link>
            <Link to="/contact">Privacy</Link>
          </Col>
          <Col md={4} lg={3}>
            <h4>Trip Styles</h4>
            <span>Adventure Tours</span>
            <span>Backpacking Trips</span>
            <span>Weekend Getaways</span>
            <span>Family & Honeymoon</span>
            <span>Group Departures</span>
          </Col>
          <Col md={4} lg={3}>
            <h4>Contact</h4>
            <span><FaLocationDot /> 705, Somdutt Chamber, New Delhi- 110066</span>
            <span><FaPhone /> +91 000000000</span>
            <span><MdEmail /> hello@tnttourandtravels.in</span>
          </Col>
        </Row>
        <div className="footer-bottom">
          <span>Copyright 2026 TNT Tour and Travels. All rights reserved.</span>
          <span>Explore. Travel. Thrive.</span>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
