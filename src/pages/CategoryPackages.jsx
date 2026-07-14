import { useEffect, useMemo, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6'
import PackageCard from '../components/PackageCard'
import { PackageCardSkeleton } from '../components/CardSkeletons'
import SectionHeading from '../components/SectionHeading'
import { getCategories, getPackagesByCategory } from '../services/api'
import { findBySlug } from '../utils/slug'

function CategoryPackages() {
  const { slug } = useParams()
  const [categories, setCategories] = useState([])
  const [packageItems, setPackageItems] = useState([])
  const [loading, setLoading] = useState(true)

  const category = useMemo(() => findBySlug(categories, slug), [categories, slug])
  const fallbackName = slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
  const categoryName = category?.name || fallbackName

  useEffect(() => {
    getCategories()
      .then(({ data }) => setCategories(data))
      .catch(() => setCategories([]))
  }, [])

  useEffect(() => {
    setLoading(true)
    getPackagesByCategory(categoryName)
      .then(({ data }) => setPackageItems(data))
      .catch(() => {
        setPackageItems([])
      })
      .finally(() => setLoading(false))
  }, [categoryName])

  return (
    <>
      <section className="category-detail-hero" style={category?.image ? { backgroundImage: `url(${category.image})` } : undefined}>
        <Container>
          <div className="category-detail-layout">
            <div className="category-detail-copy" data-aos="fade-up">
              <Button as={Link} to="/" variant="outline-dark" size="sm"><FaArrowLeft /> Back Home</Button>
              <span className="eyebrow">Holiday Theme</span>
              <h1>{categoryName} Packages</h1>
              <p>Explore packages related to this travel theme, selected from admin-created package categories.</p>
              <Button as={Link} to="/inquiry" className="btn-gradient">Plan This Trip <FaArrowRight /></Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="section soft-bg">
        <Container>
          <SectionHeading eyebrow="Packages" title={`${categoryName} Packages`} />
          {loading ? (
            <Row className="g-4">
              {Array.from({ length: 3 }, (_, index) => (
                <Col md={6} lg={4} key={`category-package-skeleton-${index}`}><PackageCardSkeleton /></Col>
              ))}
            </Row>
          ) : (
            <Row className="g-4">
              {packageItems.map((item) => (
                <Col md={6} lg={4} key={item._id || item.id}>
                  <PackageCard item={item} />
                </Col>
              ))}
              {!packageItems.length && (
                <Col xs={12}>
                  <div className="empty-state-card">
                    <h3>No packages added yet</h3>
                    <p>Create a package in admin and select {categoryName} in Package Category.</p>
                    <Button as={Link} to="/inquiry" className="btn-gradient">Request This Theme</Button>
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

export default CategoryPackages
