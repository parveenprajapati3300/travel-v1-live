import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import PackageCard from '../components/PackageCard'
import SectionHeading from '../components/SectionHeading'
import { PackageCardSkeleton } from '../components/CardSkeletons'
import { getUpcomingPackages } from '../services/api'

const skeletons = Array.from({ length: 6 }, (_, index) => index)

function UpcomingPackages() {
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUpcomingPackages()
      .then((response) => setPackages(response.data || []))
      .catch(() => setPackages([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="page-section soft-bg listing-page">
      <Container>
        <SectionHeading eyebrow="Upcoming Trips" title="All Upcoming Packages" text="Browse every upcoming package selected from admin." />
        <Row className="g-4">
          {loading ? skeletons.map((slot) => (
            <Col md={6} lg={4} key={`upcoming-package-skeleton-${slot}`}><PackageCardSkeleton /></Col>
          )) : packages.length ? packages.map((item) => (
            <Col md={6} lg={4} key={item._id || item.id}>
              <PackageCard item={item} />
            </Col>
          )) : (
            <Col xs={12}>
              <div className="empty-state-card">
                <h3>No upcoming packages yet</h3>
                <p>Upcoming packages selected from admin will appear here.</p>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </section>
  )
}

export default UpcomingPackages
