import { useMemo, useState } from 'react'
import { Alert, Button, Col, Form, Row, Table } from 'react-bootstrap'
import { FaArrowLeft, FaPen, FaPlus, FaTrash } from 'react-icons/fa6'

const destinationOptions = [
  'Kashmir',
  'Leh Ladakh',
  'Spiti Valley',
  'Kerala',
  'Meghalaya',
  'Rajasthan',
  'Thailand',
  'Vietnam',
  'Japan',
  'Sri Lanka',
  'Bali',
  'Dubai',
  'Switzerland',
]

const categoryOptions = ['Adventure', 'Luxury', 'Backpacking', 'Family', 'Honeymoon', 'Weekend', 'Group Trip']

const durationOptions = [
  { label: '3 Days / 2 Nights', days: 3 },
  { label: '5 Days / 4 Nights', days: 5 },
  { label: '6 Days / 5 Nights', days: 6 },
  { label: '7 Days / 6 Nights', days: 7 },
  { label: '8 Days / 7 Nights', days: 8 },
  { label: '10 Days / 9 Nights', days: 10 },
]

const createItinerary = (days, existing = []) =>
  Array.from({ length: days }, (_, index) => ({
    day: index + 1,
    title: existing[index]?.title || '',
    details: existing[index]?.details || '',
  }))

const initialForm = {
  category: 'domestic',
  packageDestination: '',
  packageCategories: [],
  title: '',
  image: '',
  duration: '5 Days / 4 Nights',
  price: '',
  location: '',
  rating: '4.8',
  description: '',
  highlights: '',
  included: '',
  excluded: '',
  itinerary: createItinerary(5),
  hotel: '',
  transport: '',
  gallery: '',
  reviews: '',
  isActive: true,
}

const listToText = (value) => (Array.isArray(value) ? value.join(', ') : value || '')

const durationToDays = (duration) => durationOptions.find((item) => item.label === duration)?.days || 1

function PackageManager({ packages, onCreate, onUpdate, onDelete }) {
  const [mode, setMode] = useState('list')
  const [form, setForm] = useState(initialForm)
  const [editingId, setEditingId] = useState('')
  const [error, setError] = useState('')

  const selectedDays = useMemo(() => durationToDays(form.duration), [form.duration])

  const updateField = (event) => {
    const { name, value } = event.target
    setForm((current) => {
      if (name === 'duration') {
        return { ...current, duration: value, itinerary: createItinerary(durationToDays(value), current.itinerary) }
      }
      if (name === 'isActive') {
        return { ...current, isActive: value === 'active' }
      }
      return { ...current, [name]: value }
    })
  }

  const togglePackageCategory = (value) => {
    setForm((current) => {
      const exists = current.packageCategories.includes(value)
      return {
        ...current,
        packageCategories: exists
          ? current.packageCategories.filter((item) => item !== value)
          : [...current.packageCategories, value],
      }
    })
  }

  const updateItinerary = (index, field, value) => {
    setForm((current) => ({
      ...current,
      itinerary: current.itinerary.map((item, itemIndex) => (itemIndex === index ? { ...item, [field]: value } : item)),
    }))
  }

  const openCreate = () => {
    setForm(initialForm)
    setEditingId('')
    setError('')
    setMode('form')
  }

  const closeForm = () => {
    setForm(initialForm)
    setEditingId('')
    setError('')
    setMode('list')
  }

  const openEdit = (item) => {
    const duration = item.duration || initialForm.duration
    setEditingId(item._id)
    setForm({
      category: item.category || 'domestic',
      packageDestination: item.packageDestination || item.location?.split(',')[0] || '',
      packageCategories: Array.isArray(item.packageCategories) ? item.packageCategories : [],
      title: item.title || '',
      image: item.image || '',
      duration,
      price: item.price || '',
      location: item.location || '',
      rating: item.rating || '4.8',
      description: item.description || '',
      highlights: listToText(item.highlights),
      included: listToText(item.included),
      excluded: listToText(item.excluded),
      itinerary: createItinerary(durationToDays(duration), item.itinerary || []),
      hotel: item.hotel || '',
      transport: item.transport || '',
      gallery: listToText(item.gallery),
      reviews: listToText(item.reviews),
      isActive: item.isActive ?? true,
    })
    setError('')
    setMode('form')
  }

  const submitPackage = async (event) => {
    event.preventDefault()
    setError('')

    if (!form.title.trim() || !form.image.trim() || !form.price || !form.packageDestination || !form.location.trim() || !form.description.trim()) {
      setError('Package title, destination, image, price, route/location, and description are required.')
      return
    }

    if (!form.packageCategories.length) {
      setError('Select at least one package category.')
      return
    }

    const cleanPayload = {
      ...form,
      itinerary: form.itinerary.map((item, index) => ({
        day: index + 1,
        title: item.title || `Day ${index + 1}`,
        details: item.details || 'Details will be updated soon.',
      })),
    }

    if (editingId) {
      await onUpdate(editingId, cleanPayload)
    } else {
      await onCreate(cleanPayload)
    }

    closeForm()
  }

  if (mode === 'form') {
    return (
      <div className="admin-table-card package-form-card">
        <div className="admin-view-header">
          <div>
            <span className="eyebrow">Packages</span>
            <h2>{editingId ? 'Edit Package' : 'Create Package'}</h2>
            <p>Use structured travel fields. Itinerary rows are generated from selected package duration.</p>
          </div>
          <Button variant="outline-dark" onClick={closeForm}><FaArrowLeft /> Back to Packages</Button>
        </div>

        <Form onSubmit={submitPackage} className="admin-package-form">
          {error && <Alert variant="danger">{error}</Alert>}

          <div className="admin-form-section">
            <h3>Basic Package Details</h3>
            <Row className="g-3">
              <Col md={4}>
                <Form.Label>Package Type</Form.Label>
                <Form.Select name="category" value={form.category} onChange={updateField}>
                  <option value="domestic">Domestic</option>
                  <option value="international">International</option>
                </Form.Select>
              </Col>
              <Col md={4}>
                <Form.Label>Package Destination</Form.Label>
                <Form.Select name="packageDestination" value={form.packageDestination} onChange={updateField}>
                  <option value="">Select destination</option>
                  {destinationOptions.map((item) => <option key={item} value={item}>{item}</option>)}
                </Form.Select>
              </Col>
              <Col md={4}>
                <Form.Label>Package Duration</Form.Label>
                <Form.Select name="duration" value={form.duration} onChange={updateField}>
                  {durationOptions.map((item) => <option key={item.label} value={item.label}>{item.label}</option>)}
                </Form.Select>
              </Col>
              <Col md={4}>
                <Form.Label>Package Status</Form.Label>
                <Form.Select name="isActive" value={form.isActive ? 'active' : 'inactive'} onChange={updateField}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Form.Select>
              </Col>
              <Col md={8}>
                <Form.Label>Package Title</Form.Label>
                <Form.Control name="title" value={form.title} onChange={updateField} placeholder="Example: Kashmir Luxe Escape" />
              </Col>
              <Col md={4}>
                <Form.Label>Package Price</Form.Label>
                <Form.Control type="number" name="price" value={form.price} onChange={updateField} placeholder="42999" />
              </Col>
              <Col md={8}>
                <Form.Label>Cover Image URL</Form.Label>
                <Form.Control name="image" value={form.image} onChange={updateField} placeholder="https://..." />
              </Col>
              <Col md={4}>
                <Form.Label>Rating</Form.Label>
                <Form.Control type="number" step="0.1" max="5" name="rating" value={form.rating} onChange={updateField} />
              </Col>
              <Col xs={12}>
                <Form.Label>Route / Location</Form.Label>
                <Form.Control name="location" value={form.location} onChange={updateField} placeholder="Srinagar, Gulmarg, Pahalgam" />
              </Col>
              <Col xs={12}>
                <Form.Label>Package Category</Form.Label>
                <div className="admin-check-grid">
                  {categoryOptions.map((item) => (
                    <label key={item}>
                      <input
                        checked={form.packageCategories.includes(item)}
                        onChange={() => togglePackageCategory(item)}
                        type="checkbox"
                      />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </Col>
              <Col xs={12}>
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} name="description" value={form.description} onChange={updateField} />
              </Col>
            </Row>
          </div>

          <div className="admin-form-section">
            <h3>Itinerary ({selectedDays} Days)</h3>
            <div className="itinerary-editor">
              {form.itinerary.map((day, index) => (
                <div className="itinerary-row" key={day.day}>
                  <span>Day {day.day}</span>
                  <Form.Control value={day.title} onChange={(event) => updateItinerary(index, 'title', event.target.value)} placeholder="Day title" />
                  <Form.Control as="textarea" rows={2} value={day.details} onChange={(event) => updateItinerary(index, 'details', event.target.value)} placeholder="Day details" />
                </div>
              ))}
            </div>
          </div>

          <div className="admin-form-section">
            <h3>Package Services</h3>
            <Row className="g-3">
              <Col md={6}>
                <Form.Label>Highlights</Form.Label>
                <Form.Control as="textarea" rows={2} name="highlights" value={form.highlights} onChange={updateField} placeholder="Comma separated" />
              </Col>
              <Col md={6}>
                <Form.Label>Included</Form.Label>
                <Form.Control as="textarea" rows={2} name="included" value={form.included} onChange={updateField} placeholder="Comma separated" />
              </Col>
              <Col md={6}>
                <Form.Label>Excluded</Form.Label>
                <Form.Control as="textarea" rows={2} name="excluded" value={form.excluded} onChange={updateField} placeholder="Comma separated" />
              </Col>
              <Col md={6}>
                <Form.Label>Gallery URLs</Form.Label>
                <Form.Control as="textarea" rows={2} name="gallery" value={form.gallery} onChange={updateField} placeholder="Comma separated image URLs" />
              </Col>
              <Col md={6}>
                <Form.Label>Hotel</Form.Label>
                <Form.Control name="hotel" value={form.hotel} onChange={updateField} />
              </Col>
              <Col md={6}>
                <Form.Label>Transport</Form.Label>
                <Form.Control name="transport" value={form.transport} onChange={updateField} />
              </Col>
              <Col xs={12}>
                <Form.Label>Reviews</Form.Label>
                <Form.Control name="reviews" value={form.reviews} onChange={updateField} placeholder="Comma separated review lines" />
              </Col>
            </Row>
          </div>

          <div className="admin-form-actions">
            <Button type="button" variant="outline-dark" onClick={closeForm}>Cancel</Button>
            <Button type="submit" className="btn-gradient"><FaPlus /> {editingId ? 'Update Package' : 'Create Package'}</Button>
          </div>
        </Form>
      </div>
    )
  }

  return (
    <div className="admin-table-card">
      <div className="admin-view-header">
        <div>
          <span className="eyebrow">Packages</span>
          <h2>Package List</h2>
          <p>Manage domestic and international packages shown on the website.</p>
        </div>
        <Button className="btn-gradient" onClick={openCreate}><FaPlus /> Add Package</Button>
      </div>
      <div className="table-responsive">
        <Table hover className="admin-table align-middle">
          <thead>
            <tr>
              <th>Package</th>
              <th>Destination</th>
              <th>Type</th>
              <th>Categories</th>
              <th>Duration</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((item) => (
              <tr key={item._id}>
                <td>
                  <strong>{item.title}</strong>
                  <span>{item.location}</span>
                </td>
                <td>{item.packageDestination || item.location?.split(',')[0]}</td>
                <td><span className="status-pill done">{item.category}</span></td>
                <td className="admin-category-cell">{item.packageCategories?.join(', ') || '-'}</td>
                <td>{item.duration}</td>
                <td>Rs {Number(item.price).toLocaleString('en-IN')}</td>
                <td><span className={`status-pill ${item.isActive === false ? '' : 'done'}`}>{item.isActive === false ? 'Inactive' : 'Active'}</span></td>
                <td>
                  <div className="table-actions">
                    <Button size="sm" variant="outline-dark" onClick={() => openEdit(item)}><FaPen /></Button>
                    <Button size="sm" variant="outline-danger" onClick={() => onDelete(item._id)}><FaTrash /></Button>
                  </div>
                </td>
              </tr>
            ))}
            {!packages.length && (
              <tr><td colSpan="8" className="text-center text-muted py-4">No packages uploaded yet.</td></tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default PackageManager
