import { useMemo, useState } from 'react'
import { Alert, Button, Col, Form, Modal, Row, Table } from 'react-bootstrap'
import { FaArrowLeft, FaCloudArrowUp, FaImages, FaPen, FaPlus, FaTrash } from 'react-icons/fa6'
import AdminPagination, { PAGE_SIZE } from './AdminPagination'

const durationOptions = [
  { label: '1 Day / 1 Night', days: 1 },
  { label: '2 Days / 1 Night', days: 2 },
  { label: '2 Days / 2 Nights', days: 2 },
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
  duration: '2 Days / 2 Nights',
  price: '',
  location: '',
  rating: '4.8',
  description: '',
  highlights: '',
  included: '',
  excluded: '',
  itinerary: createItinerary(2),
  hotel: '',
  transport: '',
  gallery: '',
  reviews: '',
  isActive: true,
}

const listToText = (value) => (Array.isArray(value) ? value.join(', ') : value || '')

const durationToDays = (duration) => durationOptions.find((item) => item.label === duration)?.days || 1

function PackageManager({ packages, destinations = [], categories = [], onCreate, onUpdate, onDelete }) {
  const [mode, setMode] = useState('list')
  const [form, setForm] = useState(initialForm)
  const [editingId, setEditingId] = useState('')
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [uploadingImage, setUploadingImage] = useState(false)
  const [uploadingGallery, setUploadingGallery] = useState(false)
  const [replacingGalleryIndex, setReplacingGalleryIndex] = useState(null)
  const [previewImage, setPreviewImage] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const selectedDays = useMemo(() => durationToDays(form.duration), [form.duration])
  const totalPages = Math.max(1, Math.ceil(packages.length / PAGE_SIZE))
  const activePage = Math.min(currentPage, totalPages)
  const paginatedPackages = useMemo(
    () => packages.slice((activePage - 1) * PAGE_SIZE, activePage * PAGE_SIZE),
    [activePage, packages],
  )
  const galleryImages = useMemo(() => listToText(form.gallery).split(',').map((item) => item.trim()).filter(Boolean), [form.gallery])
  const destinationOptions = useMemo(() => {
    const activeNames = destinations
      .filter((item) => item.isActive !== false)
      .map((item) => item.name)
    return form.packageDestination && !activeNames.includes(form.packageDestination)
      ? [...activeNames, form.packageDestination]
      : activeNames
  }, [destinations, form.packageDestination])
  const categoryOptions = useMemo(() => {
    const activeNames = categories.filter((item) => item.isActive !== false).map((item) => item.name)
    const selectedNames = form.packageCategories.filter((item) => !activeNames.includes(item))
    return [...activeNames, ...selectedNames]
  }, [categories, form.packageCategories])

  const updateField = (event) => {
    const { name, value } = event.target
    setFieldErrors((current) => ({ ...current, [name]: '' }))
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
    setFieldErrors((current) => ({ ...current, packageCategories: '' }))
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

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error?.message || 'Cloudinary upload failed.')
      }

      return data.secure_url
    } catch (uploadError) {
      throw new Error(uploadError.message || 'Unable to upload image. Please try again.', { cause: uploadError })
    }
  }

  const setGalleryImages = (images) => {
    setForm((current) => ({ ...current, gallery: images.join(', ') }))
  }

  const scrollToField = (name) => {
    const node = document.querySelector(`[data-package-field="${name}"]`)
    if (!node) return
    node.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setTimeout(() => {
      node.querySelector('input, textarea, select, button')?.focus()
    }, 250)
  }

  const uploadCoverImage = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    try {
      setError('')
      setUploadingImage(true)
      const imageUrl = await uploadToCloudinary(file)
      setForm((current) => ({ ...current, image: imageUrl }))
    } catch (uploadError) {
      setError(uploadError.message)
    } finally {
      setUploadingImage(false)
    }
  }

  const uploadGalleryImages = async (event) => {
    const files = Array.from(event.target.files || [])
    event.target.value = ''
    if (!files.length) return

    try {
      setError('')
      setUploadingGallery(true)
      const uploadedUrls = await Promise.all(files.map((file) => uploadToCloudinary(file)))
      setGalleryImages([...galleryImages, ...uploadedUrls])
    } catch (uploadError) {
      setError(uploadError.message)
    } finally {
      setUploadingGallery(false)
    }
  }

  const replaceGalleryImage = async (index, event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    try {
      setError('')
      setReplacingGalleryIndex(index)
      const imageUrl = await uploadToCloudinary(file)
      const nextImages = galleryImages.map((item, itemIndex) => (itemIndex === index ? imageUrl : item))
      setGalleryImages(nextImages)
    } catch (uploadError) {
      setError(uploadError.message)
    } finally {
      setReplacingGalleryIndex(null)
    }
  }

  const removeGalleryImage = (index) => {
    setGalleryImages(galleryImages.filter((_, itemIndex) => itemIndex !== index))
  }

  const openCreate = () => {
    setForm(initialForm)
    setEditingId('')
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
    setFieldErrors({})
    setMode('form')
  }

  const submitPackage = async (event) => {
    event.preventDefault()
    setError('')
    setFieldErrors({})

    const nextFieldErrors = {}
    if (!form.packageDestination) nextFieldErrors.packageDestination = 'Package destination is required.'
    if (!form.title.trim()) nextFieldErrors.title = 'Package title is required.'
    if (!form.price) nextFieldErrors.price = 'Package price is required.'
    if (!form.image.trim()) nextFieldErrors.image = 'Cover image is required.'
    if (!form.location.trim()) nextFieldErrors.location = 'Route / location is required.'
    if (!form.packageCategories.length) nextFieldErrors.packageCategories = 'Select at least one package category.'
    if (!form.description.trim()) nextFieldErrors.description = 'Description is required.'

    if (Object.keys(nextFieldErrors).length) {
      setFieldErrors(nextFieldErrors)
      setError('Please complete the highlighted package fields.')
      scrollToField(Object.keys(nextFieldErrors)[0])
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
              <Col md={4} data-package-field="packageDestination">
                <Form.Label>Package Destination</Form.Label>
                <Form.Select name="packageDestination" value={form.packageDestination} onChange={updateField} isInvalid={!!fieldErrors.packageDestination}>
                  <option value="">Select destination</option>
                  {destinationOptions.map((item) => <option key={item} value={item}>{item}</option>)}
                </Form.Select>
                {!destinationOptions.length && <div className="admin-field-hint">Create an active destination first.</div>}
                <Form.Control.Feedback type="invalid">{fieldErrors.packageDestination}</Form.Control.Feedback>
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
              <Col md={8} data-package-field="title">
                <Form.Label>Package Title</Form.Label>
                <Form.Control name="title" value={form.title} onChange={updateField} placeholder="Example: Kashmir Luxe Escape" isInvalid={!!fieldErrors.title} />
                <Form.Control.Feedback type="invalid">{fieldErrors.title}</Form.Control.Feedback>
              </Col>
              <Col md={4} data-package-field="price">
                <Form.Label>Package Price</Form.Label>
                <Form.Control type="number" name="price" value={form.price} onChange={updateField} placeholder="42999" isInvalid={!!fieldErrors.price} />
                <Form.Control.Feedback type="invalid">{fieldErrors.price}</Form.Control.Feedback>
              </Col>
              <Col md={8} data-package-field="image">
                <Form.Label>Cover Image URL</Form.Label>
                <div className="admin-upload-control">
                  <Form.Control name="image" value={form.image} onChange={updateField} placeholder="https://..." isInvalid={!!fieldErrors.image} />
                  <Button as="label" variant="outline-dark" className="admin-upload-button">
                    <FaCloudArrowUp /> {uploadingImage ? 'Uploading...' : 'Upload'}
                    <input accept="image/*" disabled={uploadingImage} hidden type="file" onChange={uploadCoverImage} />
                  </Button>
                </div>
                {fieldErrors.image && <div className="admin-field-error">{fieldErrors.image}</div>}
                {form.image && (
                  <button className="admin-image-preview" type="button" onClick={() => setPreviewImage(form.image)}>
                    <img src={form.image} alt="Package cover preview" />
                  </button>
                )}
              </Col>
              <Col md={4}>
                <Form.Label>Rating</Form.Label>
                <Form.Control type="number" step="0.1" max="5" name="rating" value={form.rating} onChange={updateField} />
              </Col>
              <Col xs={12} data-package-field="location">
                <Form.Label>Route / Location</Form.Label>
                <Form.Control name="location" value={form.location} onChange={updateField} placeholder="Srinagar, Gulmarg, Pahalgam" isInvalid={!!fieldErrors.location} />
                <Form.Control.Feedback type="invalid">{fieldErrors.location}</Form.Control.Feedback>
              </Col>
              <Col xs={12} data-package-field="packageCategories">
                <Form.Label>Package Category</Form.Label>
                <div className={`admin-check-grid ${fieldErrors.packageCategories ? 'is-invalid' : ''}`}>
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
                {!categoryOptions.length && <div className="admin-field-hint">Create an active category first.</div>}
                {fieldErrors.packageCategories && <div className="admin-field-error">{fieldErrors.packageCategories}</div>}
              </Col>
              <Col xs={12} data-package-field="description">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} name="description" value={form.description} onChange={updateField} isInvalid={!!fieldErrors.description} />
                <Form.Control.Feedback type="invalid">{fieldErrors.description}</Form.Control.Feedback>
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
                <div className="admin-gallery-toolbar">
                  <Button as="label" variant="outline-dark" className="admin-upload-button">
                    <FaImages /> {uploadingGallery ? 'Uploading...' : 'Upload Gallery Images'}
                    <input accept="image/*" disabled={uploadingGallery} hidden multiple type="file" onChange={uploadGalleryImages} />
                  </Button>
                </div>
                {galleryImages.length > 0 && (
                  <div className="admin-gallery-editor">
                    {galleryImages.map((imageUrl, index) => (
                      <div className="admin-gallery-item" key={`${imageUrl}-${index}`}>
                        <button type="button" onClick={() => setPreviewImage(imageUrl)}>
                          <img src={imageUrl} alt={`Gallery preview ${index + 1}`} />
                        </button>
                        <div className="admin-gallery-actions">
                          <Button as="label" size="sm" variant="outline-dark">
                            {replacingGalleryIndex === index ? 'Uploading...' : 'Change'}
                            <input
                              accept="image/*"
                              disabled={replacingGalleryIndex === index}
                              hidden
                              type="file"
                              onChange={(event) => replaceGalleryImage(index, event)}
                            />
                          </Button>
                          <Button size="sm" variant="outline-danger" onClick={() => removeGalleryImage(index)}><FaTrash /></Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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

        <Modal show={Boolean(previewImage)} onHide={() => setPreviewImage('')} centered size="xl" className="admin-image-modal">
          <Modal.Header closeButton>
            <Modal.Title>Cover Image Preview</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={previewImage} alt="Full package cover preview" />
          </Modal.Body>
        </Modal>
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
            {paginatedPackages.map((item) => (
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
      <AdminPagination currentPage={activePage} onPageChange={setCurrentPage} totalItems={packages.length} />
    </div>
  )
}

export default PackageManager
