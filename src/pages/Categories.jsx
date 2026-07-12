import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa6'
import SectionHeading from '../components/SectionHeading'
import { getCategories } from '../services/api'
import { slugify } from '../utils/slug'

function Categories() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getCategories()
      .then(({ data }) => setCategories(data))
      .catch(() => setCategories([]))
  }, [])

  return (
    <section className="page-section soft-bg">
      <Container>
        <div className="section-title-row">
          <SectionHeading eyebrow="Themes" title="All Holiday Themes" text="Choose any admin-created category and see related packages." />
        </div>
        <Row className="g-4">
          {categories.map((category) => (
            <Col md={6} lg={4} key={category._id || category.name}>
              <Link className="theme-category-card" to={`/category/${slugify(category.name)}`} data-aos="fade-up">
                <img src={category.image} alt={category.name} />
                <span>{category.name}</span>
                <strong>Explore <FaArrowRight /></strong>
              </Link>
            </Col>
          ))}
          {!categories.length && (
            <Col xs={12}>
              <div className="empty-state-card">
                <h3>No categories added yet</h3>
                <p>Create categories from admin to show them here.</p>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </section>
  )
}

export default Categories
