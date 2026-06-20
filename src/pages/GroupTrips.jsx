import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import PackageCard from '../components/PackageCard'
import SectionHeading from '../components/SectionHeading'
import { groupPackages } from '../data/packages'
import { getPackagesByCategory } from '../services/api'

function GroupTrips() {
  const [items, setItems] = useState(groupPackages)

  useEffect(() => {
    getPackagesByCategory('Group Tour')
      .then(({ data }) => setItems(data.length ? data : groupPackages))
      .catch(() => setItems(groupPackages))
  }, [])

  return (
    <section className="page-section">
      <Container>
        <SectionHeading eyebrow="Group Trips" title="Join Fixed Departures With Fellow Travelers" text="Packages selected under Group Tour category from admin." />
        <Row className="g-4">
          {items.map((item) => <Col md={6} lg={4} key={item._id || item.id}><PackageCard item={item} /></Col>)}
        </Row>
      </Container>
    </section>
  )
}

export default GroupTrips
