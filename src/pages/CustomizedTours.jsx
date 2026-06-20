import { Col, Container, Row } from 'react-bootstrap'
import { FaCalendarDays, FaHotel, FaRoute, FaUsers } from 'react-icons/fa6'
import InquiryForm from '../components/InquiryForm'
import SectionHeading from '../components/SectionHeading'

const steps = [
  ['Tell us your travel style', 'Share destination, date, budget, group size, and trip mood.'],
  ['Get a custom itinerary', 'We draft route, hotels, transfers, activities, and day-wise flow.'],
  ['Confirm and travel', 'Finalize quote, book services, and travel with support.'],
]

function CustomizedTours() {
  return (
    <section className="page-section inquiry-page">
      <Container>
        <Row className="g-5 align-items-center">
          <Col lg={5}>
            <SectionHeading center={false} eyebrow="Customized Tours" title="Build A Trip Around Your Dates, Budget, And People" text="Use this page for personalized travel packages, honeymoon routes, family holidays, premium stays, and custom group plans." />
            <div className="custom-feature-grid">
              <span><FaRoute /> Custom routes</span>
              <span><FaHotel /> Hotel matching</span>
              <span><FaCalendarDays /> Flexible dates</span>
              <span><FaUsers /> Group planning</span>
            </div>
            <div className="process-list">
              {steps.map(([title, text], index) => (
                <div key={title}>
                  <strong>{index + 1}</strong>
                  <span>{title}</span>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </Col>
          <Col lg={7}>
            <div className="form-shell glass-card">
              <InquiryForm />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default CustomizedTours
