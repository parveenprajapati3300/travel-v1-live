import { Col, Container, Row } from 'react-bootstrap'
import PackageCard from '../components/PackageCard'
import SectionHeading from '../components/SectionHeading'
import { weekendPackages } from '../data/packages'

function WeekendGetaways() {
  return (
    <section className="page-section soft-bg">
      <Container>
        <SectionHeading eyebrow="Weekend Getaways" title="Short Trips For Quick Refresh Plans" text="Dummy weekend trips for users who want fast booking, light planning, and nearby travel options." />
        <Row className="g-4">
          {weekendPackages.map((item) => <Col md={6} lg={4} key={item.id}><PackageCard item={item} /></Col>)}
        </Row>
      </Container>
    </section>
  )
}

export default WeekendGetaways
