import { FaQuoteLeft, FaStar } from 'react-icons/fa6'

function Testimonial({ name, trip, text }) {
  return (
    <div className="testimonial glass-card" data-aos="zoom-in">
      <FaQuoteLeft className="quote-icon" />
      <p>{text}</p>
      <div className="stars"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
      <strong>{name}</strong>
      <span>{trip}</span>
    </div>
  )
}

export default Testimonial
