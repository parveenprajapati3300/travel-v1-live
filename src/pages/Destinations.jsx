import { useEffect, useMemo, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link, useSearchParams } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa6'
import PackageCard from '../components/PackageCard'
import SectionHeading from '../components/SectionHeading'
import { formatPrice, packages } from '../data/packages'
import { getDestinations, getPackages } from '../services/api'
import { slugify } from '../utils/slug'

function Destinations() {
  const [searchParams] = useSearchParams()
  const selectedType = searchParams.get('type') || ''
  const searchTerm = (searchParams.get('search') || '').trim().toLowerCase()
  const [items, setItems] = useState(packages)
  const [destinations, setDestinations] = useState([])

  useEffect(() => {
    Promise.all([getPackages(), getDestinations(selectedType)])
      .then(([packageResponse, destinationResponse]) => {
        setItems(packageResponse.data.length ? packageResponse.data : packages)
        setDestinations(destinationResponse.data)
      })
      .catch(() => {
        setItems(packages)
        setDestinations([])
      })
  }, [selectedType])

  const filteredDestinations = useMemo(() => {
    if (!searchTerm) return destinations
    return destinations.filter((item) => item.name.toLowerCase().includes(searchTerm))
  }, [destinations, searchTerm])

  const filteredItems = useMemo(() => {
    if (!searchTerm) return items
    return items.filter((item) => {
      const values = [
        item.title,
        item.location,
        item.packageDestination,
        item.category,
        ...(item.packageCategories || []),
      ]

      return values.some((value) => value?.toLowerCase().includes(searchTerm))
    })
  }, [items, searchTerm])

  return (
    <section className="page-section soft-bg listing-page">
      <Container>
        <SectionHeading eyebrow="Destinations" title="Browse Trips By Place, Style, And Budget" text="Domestic routes, international escapes, group trips, and custom packages collected in one marketplace view." />
        {filteredDestinations.length > 0 && (
          <Row className="g-4 mb-5">
            {filteredDestinations.map((item) => (
              <Col md={6} lg={3} key={item._id}>
                <article className="mini-destination-card" data-aos="fade-up">
                  <Link to={`/destination/${slugify(item.name)}`} aria-label={`Explore ${item.name}`}>
                    <img src={item.image} alt={item.name} />
                  </Link>
                  <div>
                    <h3>{item.name}</h3>
                    <p><span>From</span> {formatPrice(item.price)}</p>
                    <Link to={`/destination/${slugify(item.name)}`}>Explore <FaArrowRight /></Link>
                  </div>
                </article>
              </Col>
            ))}
          </Row>
        )}
        <SectionHeading eyebrow="Packages" title="All Available Packages" />
        <Row className="g-4">
          {filteredItems.map((item) => <Col md={6} lg={4} key={item._id || item.id}><PackageCard item={item} /></Col>)}
        </Row>
      </Container>
    </section>
  )
}

export default Destinations
