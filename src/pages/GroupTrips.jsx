import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import PackageCard from '../components/PackageCard'
import { PackageCardSkeleton } from '../components/CardSkeletons'
import SectionHeading from '../components/SectionHeading'
import { getPackagesByCategory } from '../services/api'

function GroupTrips() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPackagesByCategory('Group Tour')
      .then(({ data }) => setItems(data))
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="page-section">
      <Container>
        <SectionHeading eyebrow="Group Trips" title="Join Fixed Departures With Fellow Travelers" text="Packages selected under Group Tour category from admin." />
        <Row className="g-4">
          {loading ? Array.from({ length: 3 }, (_, index) => (
            <Col md={6} lg={4} key={`group-skeleton-${index}`}><PackageCardSkeleton /></Col>
          )) : items.map((item) => <Col md={6} lg={4} key={item._id || item.id}><PackageCard item={item} /></Col>)}
          {!loading && !items.length && (
            <Col xs={12}>
              <div className="empty-state-card">
                <h3>No group trips added yet</h3>
                <p>Create packages and select Group Tour category from admin.</p>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </section>
  )
}

export default GroupTrips
