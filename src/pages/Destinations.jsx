import { useEffect, useState } from 'react'
import { Badge, Button, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaLocationDot } from 'react-icons/fa6'
import PackageCard from '../components/PackageCard'
import SectionHeading from '../components/SectionHeading'
import { formatPrice, packages } from '../data/packages'
import { getPackages } from '../services/api'

const featured = [
  { name: 'Leh Ladakh', type: 'Adventure', price: 32999, image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=900&q=80' },
  { name: 'Spiti Valley', type: 'Backpacking', price: 28999, image: 'https://images.unsplash.com/photo-1628082305368-2e772d6c6d76?auto=format&fit=crop&w=900&q=80' },
  { name: 'Meghalaya', type: 'Nature', price: 24999, image: 'https://images.unsplash.com/photo-1591017403286-fd8493524e1e?auto=format&fit=crop&w=900&q=80' },
  { name: 'Vietnam', type: 'International', price: 58999, image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=900&q=80' },
]

function Destinations() {
  const [items, setItems] = useState(packages)

  useEffect(() => {
    getPackages()
      .then(({ data }) => setItems(data.length ? data : packages))
      .catch(() => setItems(packages))
  }, [])

  return (
    <section className="page-section soft-bg listing-page">
      <Container>
        <SectionHeading eyebrow="Destinations" title="Browse Trips By Place, Style, And Budget" text="Domestic routes, international escapes, group trips, and custom packages collected in one marketplace view." />
        <Row className="g-4 mb-5">
          {featured.map((item) => (
            <Col md={6} lg={3} key={item.name}>
              <article className="mini-destination-card" data-aos="fade-up">
                <img src={item.image} alt={item.name} />
                <div>
                  <Badge bg="light" text="dark">{item.type}</Badge>
                  <h3>{item.name}</h3>
                  <p><FaLocationDot /> From {formatPrice(item.price)}</p>
                  <Button as={Link} to="/inquiry" size="sm" className="btn-gradient">Plan Trip <FaArrowRight /></Button>
                </div>
              </article>
            </Col>
          ))}
        </Row>
        <SectionHeading eyebrow="Packages" title="All Available Packages" />
        <Row className="g-4">
          {items.map((item) => <Col md={6} lg={4} key={item._id || item.id}><PackageCard item={item} /></Col>)}
        </Row>
      </Container>
    </section>
  )
}

export default Destinations
