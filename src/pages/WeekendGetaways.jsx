import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import PackageCard from '../components/PackageCard'
import { PackageCardSkeleton } from '../components/CardSkeletons'
import SectionHeading from '../components/SectionHeading'
import { getPackagesByCategory } from '../services/api'

function WeekendGetaways() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPackagesByCategory('Weekend Tour')
      .then(({ data }) => setItems(data))
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="page-section soft-bg">
      <Container>
        <SectionHeading eyebrow="Weekend Getaways" title="Short Trips For Quick Refresh Plans" text="Packages selected under Weekend Tour category from admin." />
        <Row className="g-4">
          {loading ? Array.from({ length: 3 }, (_, index) => (
            <Col md={6} lg={4} key={`weekend-skeleton-${index}`}><PackageCardSkeleton /></Col>
          )) : items.map((item) => <Col md={6} lg={4} key={item._id || item.id}><PackageCard item={item} /></Col>)}
          {!loading && !items.length && (
            <Col xs={12}>
              <div className="empty-state-card">
                <h3>No weekend packages added yet</h3>
                <p>Create packages and select Weekend Tour category from admin.</p>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </section>
  )
}

export default WeekendGetaways
