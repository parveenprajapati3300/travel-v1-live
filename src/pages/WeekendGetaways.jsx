import { Badge, Button, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaClock, FaLocationDot } from 'react-icons/fa6'
import SectionHeading from '../components/SectionHeading'

const weekends = [
  { title: 'Rishikesh Rafting Weekend', time: '2 Nights / 3 Days', style: 'Adventure', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80' },
  { title: 'Jaipur Culture Break', time: '2 Nights / 3 Days', style: 'Heritage', image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=80' },
  { title: 'Lonavala Monsoon Escape', time: '1 Night / 2 Days', style: 'Nature', image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80' },
  { title: 'Goa Friends Weekend', time: '3 Nights / 4 Days', style: 'Beach', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80' },
]

function WeekendGetaways() {
  return (
    <section className="page-section soft-bg">
      <Container>
        <SectionHeading eyebrow="Weekend Getaways" title="Short Trips For Quick Refresh Plans" text="Dummy weekend trips for users who want fast booking, light planning, and nearby travel options." />
        <Row className="g-4">
          {weekends.map((trip) => (
            <Col md={6} lg={3} key={trip.title}>
              <article className="mini-destination-card" data-aos="fade-up">
                <img src={trip.image} alt={trip.title} />
                <div>
                  <Badge bg="light" text="dark">{trip.style}</Badge>
                  <h3>{trip.title}</h3>
                  <p><FaClock /> {trip.time}</p>
                  <p><FaLocationDot /> Weekend departure</p>
                  <Button as={Link} to="/inquiry" className="btn-gradient" size="sm">Plan Weekend</Button>
                </div>
              </article>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default WeekendGetaways
