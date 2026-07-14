import { useEffect, useState } from 'react'
import { Accordion, Badge, Button, Col, Container, Modal, Row, Tab, Tabs, Toast, ToastContainer } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { FaBed, FaBus, FaClock, FaIndianRupeeSign, FaLocationDot, FaStar, FaTags } from 'react-icons/fa6'
import Gallery from '../components/Gallery'
import InquiryForm from '../components/InquiryForm'
import PackageCard from '../components/PackageCard'
import { PackageCardSkeleton, PackageDetailSkeleton } from '../components/CardSkeletons'
import SectionHeading from '../components/SectionHeading'
import { getPackage, getPackages } from '../services/api'
import { formatPrice } from '../utils/format'

const faqs = [
  ['Can I customize this trip?', 'Yes. Dates, hotel category, route pacing, activities, and group size can be adjusted after consultation.'],
  ['Are flights included?', 'Flights are listed under exclusions unless a custom quote specifically includes them.'],
  ['Is this suitable for families?', 'Most packages can be adapted for families, couples, solo travelers, and group departures.'],
]

function PackageDetails() {
  const { id } = useParams()
  const [packageData, setPackageData] = useState(undefined)
  const item = packageData?.id === id ? packageData : null
  const [relatedItems, setRelatedItems] = useState([])
  const [relatedLoading, setRelatedLoading] = useState(true)
  const [showInquiryModal, setShowInquiryModal] = useState(false)
  const [showStickyCta, setShowStickyCta] = useState(false)
  const [showSuccessToast, setShowSuccessToast] = useState(false)

  useEffect(() => {
    setPackageData(undefined)
    getPackage(id)
      .then(({ data }) => setPackageData(data))
      .catch(() => setPackageData(null))
  }, [id])

  useEffect(() => {
    setRelatedLoading(true)
    if (!item?.category) {
      setRelatedItems([])
      setRelatedLoading(false)
      return
    }

    getPackages(item.category)
      .then(({ data }) => setRelatedItems(data.filter((packageItem) => packageItem.id !== item.id)))
      .catch(() => setRelatedItems([]))
      .finally(() => setRelatedLoading(false))
  }, [item])

  useEffect(() => {
    const onScroll = () => setShowStickyCta(window.scrollY > 520)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (packageData === undefined) {
    return <PackageDetailSkeleton />
  }

  if (!item) {
    return (
      <section className="page-section text-center">
        <Container>
          <h1 className="page-title">Package not found</h1>
          <Button as={Link} to="/" className="btn-gradient">Back to Home</Button>
        </Container>
      </section>
    )
  }

  const related = relatedItems
  const packageCategories = item.packageCategories?.length ? item.packageCategories : [item.category]
  const itinerary = item.itinerary || []
  const included = item.included || []
  const excluded = item.excluded || []
  const gallery = item.gallery?.length ? item.gallery : [item.image]
  const reviews = item.reviews || []

  return (
    <>
      <section className="details-hero" style={{ backgroundImage: `url(${item.image})` }}>
        <Container>
          <div className="details-hero-content" data-aos="fade-up">
            <Badge className="category-badge">{item.category}</Badge>
            <h1>{item.title}</h1>
            <p>{item.description}</p>
            <div className="details-meta">
              <span><FaLocationDot /> {item.packageDestination || item.location}</span>
              <span><FaClock /> {item.duration}</span>
              <span><FaTags /> {packageCategories.join(', ')}</span>
              <span><FaStar /> {item.rating}</span>
            </div>
            <div className="details-price-row">
              <span>Starting from</span>
              <strong>{formatPrice(item.price)}</strong>
              <Button className="btn-gradient" onClick={() => setShowInquiryModal(true)}>Send Inquiry</Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="details-summary-wrap">
        <Container>
          <Row className="g-3">
            <Col md={3} sm={6}>
              <div className="summary-card">
                <FaLocationDot />
                <span>Destination</span>
                <strong>{item.packageDestination || item.location?.split(',')[0]}</strong>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="summary-card">
                <FaTags />
                <span>Category</span>
                <strong>{packageCategories.join(', ')}</strong>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="summary-card">
                <FaClock />
                <span>Duration</span>
                <strong>{item.duration}</strong>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="summary-card">
                <FaIndianRupeeSign />
                <span>Price</span>
                <strong>{formatPrice(item.price)}</strong>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section details-page-body">
        <Container>
          <div className="detail-block package-gallery-section" data-aos="fade-up">
            <h2>Gallery</h2>
            <Gallery customImages={gallery} />
          </div>

          <Row className="g-5">
            <Col lg={8}>
              <div className="detail-block detail-tabs" data-aos="fade-up">
                <Tabs defaultActiveKey="overview" className="trip-tabs">
                  <Tab eventKey="overview" title="Overview">
                    <p>{item.description}</p>
                    <div className="package-detail-facts">
                      <span><strong>Destination</strong>{item.packageDestination || item.location?.split(',')[0]}</span>
                      <span><strong>Route</strong>{item.location}</span>
                      <span><strong>Duration</strong>{item.duration}</span>
                      <span><strong>Categories</strong>{packageCategories.join(', ')}</span>
                    </div>
                    <p>{item.location} is planned with handpicked viewpoints, comfortable transfers, flexible evenings, and local experiences.</p>
                  </Tab>
                  <Tab eventKey="itinerary" title="Itinerary">
                    <div className="timeline">
                      {itinerary.map((day) => (
                        <div className="timeline-item" key={day.day}>
                          <span>Day {day.day}</span>
                          <div>
                            <h3>{day.title}</h3>
                            <p>{day.details}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Tab>
                  <Tab eventKey="inclusions" title="Inclusions">
                    <Row className="g-4">
                      <Col md={6}>
                        <h3>Included</h3>
                        {/* <ul className="icon-list">{included.map((entry) => <li key={entry}><FaCheck /> {entry}</li>)}</ul> */}
                        <p>{included}</p>
                      </Col>
                      <Col md={6}>
                        <h3>Excluded</h3>
                        {/* <ul className="icon-list excluded">{excluded.map((entry) => <li key={entry}><FaXmark /> {entry}</li>)}</ul> */}
                         <p>{excluded}</p>
                      </Col>
                    </Row>
                  </Tab>
                  <Tab eventKey="reviews" title="Reviews">
                    <Row className="g-3">
                      {reviews.map((review) => (
                        <Col md={6} key={review}>
                          <div className="review-card">
                            <div className="stars"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
                            <p>{review}</p>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </Tab>
                </Tabs>
              </div>

              <Row className="g-4">
                <Col md={6}>
                  <div className="detail-block h-100" data-aos="fade-up">
                    <h2><FaBed /> Hotel Details</h2>
                    <p>{item.hotel}</p>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="detail-block h-100" data-aos="fade-up">
                    <h2><FaBus /> Transportation Details</h2>
                    <p>{item.transport}</p>
                  </div>
                </Col>
              </Row>

              <div className="detail-block mt-4" data-aos="fade-up">
                <h2>FAQ</h2>
                <Accordion>
                  {faqs.map(([question, answer], index) => (
                    <Accordion.Item eventKey={String(index)} key={question}>
                      <Accordion.Header>{question}</Accordion.Header>
                      <Accordion.Body>{answer}</Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </div>
            </Col>

            <Col lg={4}>
              <aside className="booking-sidebar glass-card" data-aos="fade-left">
                <span className="eyebrow">Book This Trip</span>
                <h2>Get a custom quote</h2>
                <p>Share your details and our travel expert will call back with the best available plan.</p>
                <div className="booking-package-mini">
                  <span>{item.packageDestination || item.location?.split(',')[0]}</span>
                  <strong>{formatPrice(item.price)}</strong>
                </div>
                <Button className="btn-gradient w-100" onClick={() => setShowInquiryModal(true)}>Open Inquiry Form</Button>
              </aside>
            </Col>
          </Row>
        </Container>
      </section>

      <div className={`package-sticky-cta ${showStickyCta ? 'show' : ''}`}>
        <Container>
          <div>
            <span>{item.title}</span>
            <strong>{formatPrice(item.price)}</strong>
            <Button className="btn-gradient" onClick={() => setShowInquiryModal(true)}>Send Inquiry</Button>
          </div>
        </Container>
      </div>

      <Modal show={showInquiryModal} onHide={() => setShowInquiryModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Package Inquiry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-package-summary">
            <span>{item.title}</span>
            <strong>{formatPrice(item.price)}</strong>
          </div>
          <InquiryForm
            defaultDestination={item.title}
            onSuccess={() => {
              setShowSuccessToast(true)
              setShowInquiryModal(false)
            }}
          />
        </Modal.Body>
      </Modal>

      <ToastContainer position="top-end" className="inquiry-toast">
        <Toast bg="success" show={showSuccessToast} onClose={() => setShowSuccessToast(false)} delay={3500} autohide>
          <Toast.Header>
            <strong className="me-auto">Inquiry Successful</strong>
          </Toast.Header>
          <Toast.Body>Your inquiry has been submitted successfully. Our team will contact you shortly.</Toast.Body>
        </Toast>
      </ToastContainer>

      <section className="section soft-bg">
        <Container>
          <SectionHeading eyebrow="Related Packages" title="More Trips In This Style" />
          <Row className="g-4">
            {relatedLoading ? Array.from({ length: 3 }, (_, index) => (
              <Col md={6} lg={4} key={`related-package-skeleton-${index}`}><PackageCardSkeleton /></Col>
            )) : related.map((packageItem) => <Col md={6} lg={4} key={packageItem._id || packageItem.id}><PackageCard item={packageItem} /></Col>)}
          </Row>
        </Container>
      </section>
    </>
  )
}

export default PackageDetails
