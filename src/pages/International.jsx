import { useEffect, useState } from 'react'
import { Badge, Col, Container, Row } from 'react-bootstrap'
import PackageCard from '../components/PackageCard'
import SectionHeading from '../components/SectionHeading'
import { internationalPackages } from '../data/packages'
import { getPackages } from '../services/api'

const filters = {
  Duration: ['3 Days', '5 Days', '7 Days', '10+ Days'],
  'Travel Style': ['Adventure', 'Luxury', 'Backpacking', 'Family', 'Honeymoon'],
  Season: ['Summer', 'Winter', 'Monsoon'],
}

function International() {
  const [items, setItems] = useState(internationalPackages)

  useEffect(() => {
    getPackages('international')
      .then(({ data }) => setItems(data.length ? data : internationalPackages))
      .catch(() => setItems(internationalPackages))
  }, [])

  return (
    <section className="page-section soft-bg listing-page">
      <Container>
        <SectionHeading eyebrow="International Trips" title="See The World With Confidence" text="Compare international trips with curated routing, smart hotels, activity planning, documentation support, and consultation." />
        {/* <div className="filter-panel glass-card" data-aos="fade-up">
          {Object.entries(filters).map(([title, values]) => (
            <div key={title}>
              <strong>{title}</strong>
              <div>
                {values.map((value) => <Badge bg="light" text="dark" key={value}>{value}</Badge>)}
              </div>
            </div>
          ))}
        </div> */}
        <Row className="g-4">
          {items.map((item) => <Col md={6} lg={4} key={item._id || item.id}><PackageCard item={item} /></Col>)}
        </Row>
      </Container>
    </section>
  )
}

export default International
