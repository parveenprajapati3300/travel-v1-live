import { useEffect, useState } from 'react'
import { Badge, Col, Container, Row } from 'react-bootstrap'
import PackageCard from '../components/PackageCard'
import SectionHeading from '../components/SectionHeading'
import { domesticPackages } from '../data/packages'
import { getPackages } from '../services/api'

const filters = {
  Duration: ['3 Days', '5 Days', '7 Days', '10+ Days'],
  'Travel Style': ['Adventure', 'Luxury', 'Backpacking', 'Family', 'Honeymoon'],
  Season: ['Summer', 'Winter', 'Monsoon'],
}

function Domestic() {
  const [items, setItems] = useState(domesticPackages)

  useEffect(() => {
    getPackages('domestic')
      .then(({ data }) => setItems(data.length ? data : domesticPackages))
      .catch(() => setItems(domesticPackages))
  }, [])

  return (
    <section className="page-section soft-bg listing-page">
      <Container>
        <SectionHeading eyebrow="Destinations" title="Explore India Your Way" text="Filter domestic group trips, weekend getaways, family holidays, and customized tours by duration, style, and season." />
        <Row className="g-4">
          {items.map((item) => <Col md={6} lg={4} key={item._id || item.id}><PackageCard item={item} /></Col>)}
        </Row>
      </Container>
    </section>
  )
}

export default Domestic
