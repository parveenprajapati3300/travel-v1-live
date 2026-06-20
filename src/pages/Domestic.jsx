import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import PackageCard from '../components/PackageCard'
import SectionHeading from '../components/SectionHeading'
import { getPackages } from '../services/api'

function Domestic() {
  const [items, setItems] = useState([])

  useEffect(() => {
    getPackages('domestic')
      .then(({ data }) => setItems(data))
      .catch(() => setItems([]))
  }, [])

  return (
    <section className="page-section soft-bg listing-page">
      <Container>
        <SectionHeading eyebrow="Destinations" title="Explore India Your Way" text="Filter domestic group trips, weekend getaways, family holidays, and customized tours by duration, style, and season." />
        <Row className="g-4">
          {items.map((item) => <Col md={6} lg={4} key={item._id || item.id}><PackageCard item={item} /></Col>)}
          {!items.length && (
            <Col xs={12}>
              <div className="empty-state-card">
                <h3>No domestic packages added yet</h3>
                <p>Create domestic packages from admin to show them here.</p>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </section>
  )
}

export default Domestic
