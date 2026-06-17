import { Col, Container, Row } from 'react-bootstrap'
import PackageCard from '../components/PackageCard'
import SectionHeading from '../components/SectionHeading'
import { groupPackages } from '../data/packages'

function GroupTrips() {
  return (
    <section className="page-section">
      <Container>
        <SectionHeading eyebrow="Group Trips" title="Join Fixed Departures With Fellow Travelers" text="Dummy group trip data for upcoming departures, seats, dates, and quick booking actions." />
        <Row className="g-4">
          {groupPackages.map((item) => <Col md={6} lg={4} key={item.id}><PackageCard item={item} /></Col>)}
        </Row>
      </Container>
    </section>
  )
}

export default GroupTrips
