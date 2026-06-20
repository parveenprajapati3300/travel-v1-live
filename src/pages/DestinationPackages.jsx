import { useEffect, useMemo, useState } from 'react'
import { Badge, Button, Col, Container, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6'
import PackageCard from '../components/PackageCard'
import SectionHeading from '../components/SectionHeading'
import { formatPrice, packages } from '../data/packages'
import { getDestinations, getPackagesByDestination } from '../services/api'
import { findBySlug, slugify } from '../utils/slug'

function DestinationPackages() {
  const { slug } = useParams()
  const [destinations, setDestinations] = useState([])
  const [packageItems, setPackageItems] = useState([])
  const [loading, setLoading] = useState(true)
  const fallbackName = slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')

  useEffect(() => {
    getDestinations()
      .then((destinationResponse) => {
        setDestinations(destinationResponse.data)
      })
      .catch(() => {
        setDestinations([])
      })
  }, [])

  const destination = useMemo(() => findBySlug(destinations, slug), [destinations, slug])
  const destinationName = destination?.name || fallbackName

  useEffect(() => {
    getPackagesByDestination(destinationName)
      .then(({ data }) => {
        setPackageItems(data)
      })
      .catch(() => {
        setPackageItems(packages.filter((item) => slugify(item.packageDestination || item.location?.split(',')[0]) === slug))
      })
      .finally(() => setLoading(false))
  }, [destinationName, slug])

  const relatedPackages = useMemo(() => {
    return packageItems.filter((item) => slugify(item.packageDestination || item.location?.split(',')[0]) === slug)
  }, [packageItems, slug])

  return (
    <>
      <section className="destination-detail-hero" style={destination?.image ? { backgroundImage: `url(${destination.image})` } : undefined}>
        <Container>
          <div className="destination-detail-layout">
            <div className="destination-detail-copy" data-aos="fade-up">
              <Button as={Link} to="/destinations" variant="outline-dark" size="sm"><FaArrowLeft /> All Destinations</Button>
              <Badge bg="light" text="dark">{destination?.type || 'destination'}</Badge>
              <h1>{destinationName} Tour Packages</h1>
              <p>Explore handpicked packages, routes, hotels, and travel plans available for this destination.</p>
              {destination?.price && (
                <div className="destination-detail-price">
                  <span>Packages starting from</span>
                  <strong>{formatPrice(destination.price)}</strong>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      <section className="section soft-bg">
        <Container>
          <div className="section-title-row">
            <SectionHeading eyebrow="Packages" title={`${destinationName} Packages`} text="Choose a package and open details for itinerary, inclusions, gallery, hotel, transport, and inquiry." />
            <Button as={Link} to="/inquiry" className="btn-gradient">Plan Custom Trip <FaArrowRight /></Button>
          </div>
          {loading ? (
            <div className="admin-loading">Loading destination packages...</div>
          ) : (
            <Row className="g-4">
              {relatedPackages.map((item) => (
                <Col md={6} lg={4} key={item._id || item.id}>
                  <PackageCard item={item} />
                </Col>
              ))}
              {!relatedPackages.length && (
                <Col xs={12}>
                  <div className="empty-state-card">
                    <h3>No packages added yet</h3>
                    <p>Create a package in admin and select {destinationName} as its destination.</p>
                    <Button as={Link} to="/inquiry" className="btn-gradient">Request This Destination</Button>
                  </div>
                </Col>
              )}
            </Row>
          )}
        </Container>
      </section>
    </>
  )
}

export default DestinationPackages
