import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import PackageCard from '../components/PackageCard'
import SectionHeading from '../components/SectionHeading'
import { getPackages } from '../services/api'

function International() {
  const [items, setItems] = useState([])

  useEffect(() => {
    getPackages('international')
      .then(({ data }) => setItems(data))
      .catch(() => setItems([]))
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
          {!items.length && (
            <Col xs={12}>
              <div className="empty-state-card">
                <h3>No international packages added yet</h3>
                <p>Create international packages from admin to show them here.</p>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </section>
  )
}

export default International
