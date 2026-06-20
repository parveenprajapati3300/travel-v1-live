import { Badge, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaClock, FaLocationDot, FaStar } from 'react-icons/fa6'
import { formatPrice } from '../utils/format'

function PackageCard({ item }) {
  const destinationLabel = item.packageDestination || item.location?.split(',')[0] || 'Destination'

  return (
    <Card className="package-card h-100" data-aos="fade-up">
      <div className="card-image-wrap">
        <Card.Img variant="top" src={item.image} alt={item.title} />
        <Badge className="category-badge">{item.category}</Badge>
        <div className="image-rating"><FaStar /> {item.rating}</div>
      </div>
      <Card.Body>
        <div className="package-topline">
          <span><FaLocationDot /> {destinationLabel}</span>
          <span>{item.duration}</span>
        </div>
        <Card.Title>{item.title}</Card.Title>
        <div className="meta-row"><FaLocationDot /> {item.location}</div>
        <div className="meta-row"><FaClock /> {item.duration}</div>
        <Card.Text>{item.description}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <div>
          <small>Starting from</small>
          <strong>{formatPrice(item.price)}</strong>
        </div>
        <div className="card-actions">
          <Button as={Link} to="/inquiry" className="btn-gradient" size="sm">Book Now</Button>
          <Button as={Link} to={`/package/${item.id}`} variant="outline-dark" size="sm">Details <FaArrowRight /></Button>
        </div>
      </Card.Footer>
    </Card>
  )
}

export default PackageCard
