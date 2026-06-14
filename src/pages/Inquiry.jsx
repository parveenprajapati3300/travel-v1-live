import { Col, Container, Row } from 'react-bootstrap'
import InquiryForm from '../components/InquiryForm'

function Inquiry() {
  return (
    <section className="page-section inquiry-page">
      <Container>
        <Row className="g-5 align-items-center">
          <Col lg={5} data-aos="fade-right">
            <span className="eyebrow">Inquiry Form</span>
            <h1 className="page-title">Tell us the trip in your head. We will make it workable.</h1>
            <p className="lead-text">Share your destination, dates, traveler count, and budget. A travel expert will respond with a practical package plan and upgrade options.</p>
            <div className="mini-stats">
              <span><strong>24 hrs</strong> response window</span>
              <span><strong>100%</strong> customized quote</span>
            </div>
          </Col>
          <Col lg={7} data-aos="fade-left">
            <div className="glass-card form-shell">
              <InquiryForm />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Inquiry
