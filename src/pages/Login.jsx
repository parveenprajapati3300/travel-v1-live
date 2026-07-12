import { useState } from 'react'
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap'
import { FaLock, FaPlaneDeparture } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { loginAdmin } from '../services/api'

function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const updateField = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    try {
      setLoading(true)
      const { data } = await loginAdmin(form)
      localStorage.setItem('tripnest_admin_token', data.token)
      localStorage.setItem('tripnest_admin_email', data.admin.email)
      navigate('/admin/dashboard')
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Login failed. Please check credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="page-section login-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={5}>
            <div className="login-card glass-card" data-aos="zoom-in">
              <div className="login-icon"><FaPlaneDeparture /></div>
              <span className="eyebrow">Admin Login</span>
              <h1>Welcome back</h1>
              <p>Manage tour inquiries, packages, and customer follow-ups.</p>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form className="inquiry-form" onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" value={form.email} onChange={updateField} placeholder="admin@tnttourandtravels.in" required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" value={form.password} onChange={updateField} placeholder="Enter admin password" required />
                </Form.Group>
                <Button type="submit" className="btn-gradient w-100" disabled={loading}>
                  <FaLock /> {loading ? 'Signing in...' : 'Login Securely'}
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Login
