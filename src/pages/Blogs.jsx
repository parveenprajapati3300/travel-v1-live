import { Badge, Button, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaClock } from 'react-icons/fa6'
import SectionHeading from '../components/SectionHeading'

const posts = [
  { title: 'How To Choose Your First Group Trip', category: 'Planning', read: '5 min read', image: new URL('../assets/travel/blogs/blogs-1500530855697-w900-80.jpg', import.meta.url).href, text: 'A simple guide to choosing dates, difficulty, budget, and group size before booking.' },
  { title: 'Thailand Vs Vietnam For Indian Travelers', category: 'International', read: '7 min read', image: new URL('../assets/travel/blogs/blogs-1508009603885-w900-80.jpg', import.meta.url).href, text: 'Compare routes, food, nightlife, shopping, visa needs, and trip pacing.' },
  { title: 'Weekend Getaway Packing Checklist', category: 'Weekend', read: '4 min read', image: new URL('../assets/travel/blogs/blogs-1488646953014-w900-80.jpg', import.meta.url).href, text: 'Pack light, move fast, and avoid missing the basics for short trips.' },
  { title: 'Best Time To Visit Spiti Valley', category: 'Adventure', read: '6 min read', image: new URL('../assets/travel/packages/packages-fallback-banner-1.jpg', import.meta.url).href, text: 'Season-wise overview for road access, weather, cafes, and photography.' },
]

function Blogs() {
  return (
    <section className="page-section soft-bg">
      <Container>
        <SectionHeading eyebrow="Blogs" title="Travel Guides And Dummy Stories" text="Dummy blog data for planning guides, destination comparisons, weekend tips, and travel inspiration." />
        <Row className="g-4">
          {posts.map((post) => (
            <Col md={6} lg={3} key={post.title}>
              <article className="blog-card" data-aos="fade-up">
                <img src={post.image} alt={post.title} />
                <div>
                  <Badge bg="light" text="dark">{post.category}</Badge>
                  <h3>{post.title}</h3>
                  <span><FaClock /> {post.read}</span>
                  <p>{post.text}</p>
                  <Button as={Link} to="/contact" variant="outline-dark" size="sm">Read More <FaArrowRight /></Button>
                </div>
              </article>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default Blogs
