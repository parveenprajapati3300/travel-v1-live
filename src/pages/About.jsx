import { Col, Container, Row } from 'react-bootstrap'
import { FaAward, FaEarthAsia, FaHandshake, FaRoute } from 'react-icons/fa6'
import SectionHeading from '../components/SectionHeading'

function About() {
  return (
    <section className="page-section">
      <Container>
        <Row className="g-5 align-items-center">
          <Col lg={6} data-aos="fade-right">
            <span className="eyebrow">About TNT Tour and Travels</span>
            <h1 className="page-title">A modern travel agency for holidays that feel effortless.</h1>
            <p className="lead-text">We design tour packages with the care of a boutique planner and the operational discipline of a serious travel company. Every route, hotel, transfer, and experience is chosen to keep your holiday smooth, stylish, and memorable.</p>
          </Col>
          <Col lg={6} data-aos="fade-left">
            <img className="about-image" src={new URL('../assets/travel/about/about-1488646953014-w1200-80.jpg', import.meta.url).href} alt="Travel planning desk" />
          </Col>
        </Row>

        <section className="section pb-0">
          <SectionHeading eyebrow="Our Promise" title="Smart Packages, Real Support" />
          <Row className="g-4">
            {[
              [<FaRoute />, 'Curated Routes', 'We design realistic itineraries with time to breathe.'],
              [<FaEarthAsia />, 'Wide Network', 'Trusted hotels, drivers, guides, and operators across India and abroad.'],
              [<FaHandshake />, 'Transparent Planning', 'Clear inclusions, exclusions, pricing, and upgrade options.'],
              [<FaAward />, 'Premium Feel', 'Modern experiences, tasteful stays, and traveler-first service.'],
            ].map(([icon, title, text]) => (
              <Col md={6} lg={3} key={title}>
                <div className="why-card glass-card" data-aos="fade-up">
                  <span>{icon}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </Col>
            ))}
          </Row>
        </section>
      </Container>
    </section>
  )
}

export default About
