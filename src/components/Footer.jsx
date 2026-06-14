import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaLocationDot, FaPhone, FaYoutube } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'

function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row className="g-4">
          <Col lg={4}>
            <h3>TravelSphere</h3>
            <p>Modern travel marketplace for group trips, customized packages, community meetups, and expert consultations.</p>
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
            <Link to="/inquiry">Careers</Link>
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
            <span><FaLocationDot /> Mumbai, Delhi, Bengaluru</span>
            <span><FaPhone /> +91 98765 43210</span>
            <span><MdEmail /> hello@travelsphere.in</span>
          </Col>
        </Row>
        <div className="footer-bottom">
          <span>Copyright 2026 TravelSphere. All rights reserved.</span>
          <span>Built for travel marketplace and community experiences.</span>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
