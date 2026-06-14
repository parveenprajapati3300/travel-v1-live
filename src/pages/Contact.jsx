import { useState } from 'react'
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap'
import { FaLocationDot, FaPhone, FaRegClock } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
import SectionHeading from '../components/SectionHeading'
import { submitContact } from '../services/api'

const initialForm = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
}

function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState('')
  const [apiError, setApiError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const updateField = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  const validate = () => {
    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Name is required.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Enter a valid email.'
    if (!/^[0-9+\-\s]{8,15}$/.test(form.phone)) nextErrors.phone = 'Enter a valid phone number.'
    if (!form.subject.trim()) nextErrors.subject = 'Subject is required.'
    if (!form.message.trim()) nextErrors.message = 'Message is required.'
    return nextErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSuccess('')
    setApiError('')
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    try {
      setSubmitting(true)
      await submitContact(form)
      setSuccess('Message sent successfully. Our team will respond shortly.')
      setForm(initialForm)
    } catch (error) {
      setApiError(error.response?.data?.message || 'Unable to send message. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="page-section soft-bg">
      <Container>
        <SectionHeading eyebrow="Contact Us" title="Let’s Plan Something Beautiful" text="Reach out for package customization, group tours, corporate travel, or quick pricing support." />
        <Row className="g-4">
          <Col lg={5}>
            <div className="contact-panel glass-card" data-aos="fade-right">
              <h3>TripNest Holidays</h3>
              <p><FaLocationDot /> 12th Floor, Travel House, Mumbai, India</p>
              <p><FaPhone /> +91 98765 43210</p>
              <p><MdEmail /> hello@tripnest.in</p>
              <p><FaRegClock /> Mon to Sat, 10:00 AM - 7:00 PM</p>
            </div>
          </Col>
          <Col lg={7}>
            <Form className="contact-form glass-card inquiry-form" onSubmit={handleSubmit} noValidate data-aos="fade-left">
              {success && <Alert variant="success">{success}</Alert>}
              {apiError && <Alert variant="danger">{apiError}</Alert>}
              <Row className="g-3">
                <Col md={6}>
                  <Form.Label>Name</Form.Label>
                  <Form.Control name="name" value={form.name} onChange={updateField} placeholder="Example: Priya Verma" isInvalid={!!errors.name} />
                  <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Col>
                <Col md={6}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" value={form.email} onChange={updateField} placeholder="priya@example.com" isInvalid={!!errors.email} />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Col>
                <Col md={6}>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control name="phone" value={form.phone} onChange={updateField} placeholder="+91 98765 43210" isInvalid={!!errors.phone} />
                  <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                </Col>
                <Col md={6}>
                  <Form.Label>Subject</Form.Label>
                  <Form.Control name="subject" value={form.subject} onChange={updateField} placeholder="Custom Kerala package" isInvalid={!!errors.subject} />
                  <Form.Control.Feedback type="invalid">{errors.subject}</Form.Control.Feedback>
                </Col>
                <Col xs={12}>
                  <Form.Label>Message</Form.Label>
                  <Form.Control as="textarea" rows={5} name="message" value={form.message} onChange={updateField} placeholder="Tell us your travel dates, destination, budget, and special requests." isInvalid={!!errors.message} />
                  <Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback>
                </Col>
                <Col xs={12}>
                  <Button className="btn-gradient" type="submit" disabled={submitting}>
                    {submitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Contact
