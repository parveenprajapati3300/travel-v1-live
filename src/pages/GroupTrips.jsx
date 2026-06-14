import { Button, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaCalendarDays, FaLocationDot, FaPeopleGroup, FaStar } from 'react-icons/fa6'
import SectionHeading from '../components/SectionHeading'

const trips = [
  { title: 'Leh Ladakh Bike Expedition', date: '12 Jul - 18 Jul', seats: '8 seats left', price: 'Rs 32,999', image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=900&q=80' },
  { title: 'Spiti Valley Backpacking', date: '2 Aug - 9 Aug', seats: '12 seats left', price: 'Rs 28,999', image: 'https://images.unsplash.com/photo-1628082305368-2e772d6c6d76?auto=format&fit=crop&w=900&q=80' },
  { title: 'Vietnam Community Trail', date: '18 Sep - 24 Sep', seats: '10 seats left', price: 'Rs 58,999', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=900&q=80' },
  { title: 'Meghalaya Monsoon Group', date: '6 Jul - 11 Jul', seats: '6 seats left', price: 'Rs 24,999', image: 'https://images.unsplash.com/photo-1591017403286-fd8493524e1e?auto=format&fit=crop&w=900&q=80' },
]

function GroupTrips() {
  return (
    <section className="page-section">
      <Container>
        <SectionHeading eyebrow="Group Trips" title="Join Fixed Departures With Fellow Travelers" text="Dummy group trip data for upcoming departures, seats, dates, and quick booking actions." />
        <Row className="g-4">
          {trips.map((trip) => (
            <Col md={6} lg={3} key={trip.title}>
              <article className="group-trip-card h-100" data-aos="fade-up">
                <img src={trip.image} alt={trip.title} />
                <div>
                  <span><FaCalendarDays /> {trip.date}</span>
                  <h3>{trip.title}</h3>
                  <p><FaPeopleGroup /> {trip.seats}</p>
                  <p><FaLocationDot /> Starts at {trip.price}</p>
                  <div className="stars"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
                  <Button as={Link} to="/inquiry" className="btn-gradient w-100">Book Now</Button>
                </div>
              </article>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default GroupTrips
