import { useState } from 'react'
import { Alert, Button, Col, Form, Modal, Row, Table } from 'react-bootstrap'
import { FaArrowLeft, FaCloudArrowUp, FaPen, FaPlus, FaTrash } from 'react-icons/fa6'

const initialForm = {
  name: '',
  type: 'domestic',
  image: '',
  price: '',
  isActive: true,
}

function TaxonomyManager({ items, title, label, includePrice = false, includeType = false, onCreate, onUpdate, onDelete }) {
  const [mode, setMode] = useState('list')
  const [form, setForm] = useState(initialForm)
  const [editingId, setEditingId] = useState('')
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [uploadingImage, setUploadingImage] = useState(false)
  const [previewImage, setPreviewImage] = useState('')

  const updateField = (event) => {
    const { name, value } = event.target
    setFieldErrors((current) => ({ ...current, [name]: '' }))
    setForm((current) => ({
      ...current,
      [name]: name === 'isActive' ? value === 'active' : value,
    }))
  }

  const uploadToCloudinary = async (file) => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

    if (!cloudName || !uploadPreset) {
      throw new Error('Cloudinary upload setup missing. Add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in your frontend .env file.')
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', uploadPreset)
    if (import.meta.env.VITE_CLOUDINARY_FOLDER) {
      formData.append('folder', import.meta.env.VITE_CLOUDINARY_FOLDER)
    }

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    })
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error?.message || 'Cloudinary upload failed.')
    }

    return data.secure_url
  }

  const uploadImage = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    try {
      setError('')
      setUploadingImage(true)
      const imageUrl = await uploadToCloudinary(file)
      setForm((current) => ({ ...current, image: imageUrl }))
      setFieldErrors((current) => ({ ...current, image: '' }))
    } catch (uploadError) {
      setError(uploadError.message)
    } finally {
      setUploadingImage(false)
    }
  }

  const openCreate = () => {
    setForm(initialForm)
    setEditingId('')
    setError('')
    setFieldErrors({})
    setMode('form')
  }

  const openEdit = (item) => {
    setForm({
      name: item.name || '',
      type: item.type || 'domestic',
      image: item.image || '',
      price: item.price || '',
      isActive: item.isActive ?? true,
    })
    setEditingId(item._id)
    setError('')
    setFieldErrors({})
    setMode('form')
  }

  const closeForm = () => {
    setForm(initialForm)
    setEditingId('')
    setError('')
    setFieldErrors({})
    setPreviewImage('')
    setMode('list')
  }

  const submitForm = async (event) => {
    event.preventDefault()
    setError('')
    setFieldErrors({})

    const nextFieldErrors = {}
    if (!form.name.trim()) nextFieldErrors.name = `${label} name is required.`
    if (!form.image.trim()) nextFieldErrors.image = `${label} image is required.`
    if (includePrice && !form.price) nextFieldErrors.price = `${label} price is required.`

    if (Object.keys(nextFieldErrors).length) {
      setFieldErrors(nextFieldErrors)
      setError('Please complete the highlighted fields.')
      return
    }

    const payload = {
      name: form.name,
      ...(includeType ? { type: form.type } : {}),
      image: form.image,
      isActive: form.isActive,
      ...(includePrice ? { price: form.price } : {}),
    }

    if (editingId) {
      await onUpdate(editingId, payload)
    } else {
      await onCreate(payload)
    }

    closeForm()
  }

  if (mode === 'form') {
    return (
      <div className="admin-table-card package-form-card">
        <div className="admin-view-header">
          <div>
            <span className="eyebrow">{label}</span>
            <h2>{editingId ? `Edit ${label}` : `Add ${label}`}</h2>
            <p>This data will appear dynamically while creating packages and on the website.</p>
          </div>
          <Button variant="outline-dark" onClick={closeForm}><FaArrowLeft /> Back to {title}</Button>
        </div>

        <Form onSubmit={submitForm} className="admin-package-form">
          {error && <Alert variant="danger">{error}</Alert>}
          <div className="admin-form-section">
            <h3>{label} Details</h3>
            <Row className="g-3">
              <Col md={includePrice ? 3 : 6}>
                <Form.Label>{label}</Form.Label>
                <Form.Control name="name" value={form.name} onChange={updateField} placeholder={`Enter ${label.toLowerCase()}`} isInvalid={!!fieldErrors.name} />
                <Form.Control.Feedback type="invalid">{fieldErrors.name}</Form.Control.Feedback>
              </Col>
              {includeType && (
                <Col md={3}>
                  <Form.Label>Type</Form.Label>
                  <Form.Select name="type" value={form.type} onChange={updateField}>
                    <option value="domestic">Domestic</option>
                    <option value="international">International</option>
                  </Form.Select>
                </Col>
              )}
              {includePrice && (
                <Col md={3}>
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="number" name="price" value={form.price} onChange={updateField} placeholder="24999" isInvalid={!!fieldErrors.price} />
                  <Form.Control.Feedback type="invalid">{fieldErrors.price}</Form.Control.Feedback>
                </Col>
              )}
              <Col md={includePrice ? 3 : 6}>
                <Form.Label>Status</Form.Label>
                <Form.Select name="isActive" value={form.isActive ? 'active' : 'inactive'} onChange={updateField}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Form.Select>
              </Col>
              <Col xs={12}>
                <Form.Label>Image URL</Form.Label>
                <div className="admin-upload-control">
                  <Form.Control name="image" value={form.image} onChange={updateField} placeholder="https://..." isInvalid={!!fieldErrors.image} />
                  <Button as="label" variant="outline-dark" className="admin-upload-button">
                    <FaCloudArrowUp /> {uploadingImage ? 'Uploading...' : 'Upload Image'}
                    <input accept="image/*" disabled={uploadingImage} hidden type="file" onChange={uploadImage} />
                  </Button>
                </div>
                {fieldErrors.image && <div className="admin-field-error">{fieldErrors.image}</div>}
                {form.image && (
                  <button className="admin-image-preview" type="button" onClick={() => setPreviewImage(form.image)}>
                    <img src={form.image} alt={`${label} preview`} />
                  </button>
                )}
              </Col>
            </Row>
          </div>
          <div className="admin-form-actions">
            <Button type="button" variant="outline-dark" onClick={closeForm}>Cancel</Button>
            <Button type="submit" className="btn-gradient"><FaPlus /> {editingId ? `Update ${label}` : `Create ${label}`}</Button>
          </div>
        </Form>

        <Modal show={Boolean(previewImage)} onHide={() => setPreviewImage('')} centered size="xl" className="admin-image-modal">
          <Modal.Header closeButton>
            <Modal.Title>Image Preview</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={previewImage} alt={`${label} full preview`} />
          </Modal.Body>
        </Modal>
      </div>
    )
  }

  return (
    <div className="admin-table-card">
      <div className="admin-view-header">
        <div>
          <span className="eyebrow">{label}</span>
          <h2>{title}</h2>
          <p>Manage dynamic {title.toLowerCase()} used by package creation and frontend sections.</p>
        </div>
        <Button className="btn-gradient" onClick={openCreate}><FaPlus /> Add {label}</Button>
      </div>
      <div className="table-responsive">
        <Table hover className="admin-table align-middle">
          <thead>
            <tr>
              <th>{label}</th>
              {includeType && <th>Type</th>}
              <th>Status</th>
              <th>Image</th>
              {includePrice && <th>Price</th>}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td><strong>{item.name}</strong></td>
                {includeType && <td><span className="status-pill done">{item.type}</span></td>}
                <td><span className={`status-pill ${item.isActive === false ? '' : 'done'}`}>{item.isActive === false ? 'Inactive' : 'Active'}</span></td>
                <td>
                  <button className="admin-table-image" type="button" onClick={() => setPreviewImage(item.image)}>
                    <img src={item.image} alt={item.name} />
                  </button>
                </td>
                {includePrice && <td>Rs {Number(item.price).toLocaleString('en-IN')}</td>}
                <td>
                  <div className="table-actions">
                    <Button size="sm" variant="outline-dark" onClick={() => openEdit(item)}><FaPen /></Button>
                    <Button size="sm" variant="outline-danger" onClick={() => onDelete(item._id)}><FaTrash /></Button>
                  </div>
                </td>
              </tr>
            ))}
            {!items.length && (
              <tr><td colSpan={(includePrice ? 5 : 4) + (includeType ? 1 : 0)} className="text-center text-muted py-4">No {title.toLowerCase()} created yet.</td></tr>
            )}
          </tbody>
        </Table>
      </div>

      <Modal show={Boolean(previewImage)} onHide={() => setPreviewImage('')} centered size="xl" className="admin-image-modal">
        <Modal.Header closeButton>
          <Modal.Title>Image Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={previewImage} alt={`${label} full preview`} />
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default TaxonomyManager
