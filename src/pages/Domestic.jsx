import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import PackageCard from '../components/PackageCard'
import { PackageCardSkeleton } from '../components/CardSkeletons'
import SectionHeading from '../components/SectionHeading'
import { getPackages } from '../services/api'

function Domestic() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPackages('domestic')
      .then(({ data }) => setItems(data))
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="page-section soft-bg listing-page">
      <Container>
        <SectionHeading eyebrow="Destinations" title="Explore India Your Way" text="Filter domestic group trips, weekend getaways, family holidays, and customized tours by duration, style, and season." />
        <Row className="g-4">
          {loading ? Array.from({ length: 3 }, (_, index) => (
            <Col md={6} lg={4} key={`domestic-skeleton-${index}`}><PackageCardSkeleton /></Col>
          )) : items.map((item) => <Col md={6} lg={4} key={item._id || item.id}><PackageCard item={item} /></Col>)}
          {!loading && !items.length && (
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
