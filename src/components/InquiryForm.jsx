import { useState } from 'react'
import { Alert, Button, Col, Form, Row } from 'react-bootstrap'
import { FaHeadset, FaShieldHeart } from 'react-icons/fa6'
import { submitInquiry } from '../services/api'

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  destination: '',
  travelDate: '',
  people: '',
  budget: '',
  message: '',
}

function InquiryForm({ compact = false, defaultDestination = '', onSuccess }) {
  const [form, setForm] = useState({ ...initialForm, destination: defaultDestination })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [apiError, setApiError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const updateField = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  const validate = () => {
    const nextErrors = {}
    if (!form.fullName.trim()) nextErrors.fullName = 'Full name is required.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Enter a valid email.'
    if (!/^[0-9+\-\s]{8,15}$/.test(form.phone)) nextErrors.phone = 'Enter a valid phone number.'
    if (!form.destination.trim()) nextErrors.destination = 'Destination is required.'
    if (!form.travelDate) nextErrors.travelDate = 'Travel date is required.'
    if (!form.people || Number(form.people) < 1) nextErrors.people = 'Add at least one traveler.'
    if (!form.budget.trim()) nextErrors.budget = 'Budget is required.'
    return nextErrors
  }

  const submitForm = async (event) => {
    event.preventDefault()
    setApiError('')
    setSuccess(false)
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    try {
      setSubmitting(true)
      await submitInquiry({
        name: form.fullName,
        email: form.email,
        phone: form.phone,
        destination: form.destination,
        travelDate: form.travelDate,
        people: Number(form.people),
        budget: form.budget,
        message: form.message,
      })
      setSuccess(true)
      onSuccess?.()
      setForm({ ...initialForm, destination: defaultDestination })
    } catch (error) {
      setApiError(error.response?.data?.message || 'Unable to submit inquiry. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Form className={`inquiry-form ${compact ? 'compact' : ''}`} onSubmit={submitForm} noValidate>
      <div className="form-trust-row">
        <span><FaHeadset /> Quick callback</span>
        <span><FaShieldHeart /> Secure details</span>
      </div>

      {success && <Alert variant="success">Thanks! Our travel expert will contact you shortly.</Alert>}
      {apiError && <Alert variant="danger">{apiError}</Alert>}

      <Row className="g-3">
        <Col md={compact ? 12 : 6}>
          <Form.Label>Full Name</Form.Label>
          <Form.Control name="fullName" value={form.fullName} onChange={updateField} placeholder="Example: Rahul Sharma" isInvalid={!!errors.fullName} />
          <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
        </Col>
        <Col md={compact ? 12 : 6}>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={form.email} onChange={updateField} placeholder="rahul@example.com" isInvalid={!!errors.email} />
          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
        </Col>
        <Col md={compact ? 12 : 6}>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control name="phone" value={form.phone} onChange={updateField} placeholder="+91 000000000" isInvalid={!!errors.phone} />
          <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
        </Col>
        <Col md={compact ? 12 : 6}>
          <Form.Label>Destination</Form.Label>
          <Form.Control name="destination" value={form.destination} onChange={updateField} placeholder="Kashmir, Bali, Dubai..." isInvalid={!!errors.destination} />
          <Form.Control.Feedback type="invalid">{errors.destination}</Form.Control.Feedback>
        </Col>
        <Col md={compact ? 12 : 4}>
          <Form.Label>Travel Date</Form.Label>
          <Form.Control type="date" name="travelDate" value={form.travelDate} onChange={updateField} isInvalid={!!errors.travelDate} />
          <Form.Control.Feedback type="invalid">{errors.travelDate}</Form.Control.Feedback>
        </Col>
        <Col md={compact ? 12 : 4}>
          <Form.Label>Number of People</Form.Label>
          <Form.Control type="number" min="1" name="people" value={form.people} onChange={updateField} placeholder="Example: 4" isInvalid={!!errors.people} />
          <Form.Control.Feedback type="invalid">{errors.people}</Form.Control.Feedback>
        </Col>
        <Col md={compact ? 12 : 4}>
          <Form.Label>Budget</Form.Label>
          <Form.Control name="budget" value={form.budget} onChange={updateField} placeholder="Rs 50,000 - Rs 1,00,000" isInvalid={!!errors.budget} />
          <Form.Control.Feedback type="invalid">{errors.budget}</Form.Control.Feedback>
        </Col>
        <Col xs={12}>
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" rows={compact ? 3 : 5} name="message" value={form.message} onChange={updateField} placeholder="Tell us your hotel preference, occasion, flight status, or any special request." />
        </Col>
        <Col xs={12}>
          <Button type="submit" className="btn-gradient w-100" disabled={submitting}>
            {submitting ? 'Sending...' : 'Send Inquiry'}
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default InquiryForm
