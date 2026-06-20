import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import PackageCard from '../components/PackageCard'
import SectionHeading from '../components/SectionHeading'
import { weekendPackages } from '../data/packages'
import { getPackagesByCategory } from '../services/api'

function WeekendGetaways() {
  const [items, setItems] = useState(weekendPackages)

  useEffect(() => {
    getPackagesByCategory('Weekend Tour')
      .then(({ data }) => setItems(data.length ? data : weekendPackages))
      .catch(() => setItems(weekendPackages))
  }, [])

  return (
    <section className="page-section soft-bg">
      <Container>
        <SectionHeading eyebrow="Weekend Getaways" title="Short Trips For Quick Refresh Plans" text="Packages selected under Weekend Tour category from admin." />
        <Row className="g-4">
          {items.map((item) => <Col md={6} lg={4} key={item._id || item.id}><PackageCard item={item} /></Col>)}
        </Row>
      </Container>
    </section>
  )
}

export default WeekendGetaways
