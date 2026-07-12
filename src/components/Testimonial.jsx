import { FaQuoteLeft, FaStar } from 'react-icons/fa6'

function Testimonial({ image, name, trip, text }) {
  return (
    <div className="testimonial glass-card" data-aos="zoom-in">
      <div className="testimonial-top">
        <span className="testimonial-avatar">
          {image ? <img src={image} alt={name} /> : name?.charAt(0)}
        </span>
        <div>
          <strong>{name}</strong>
          <span>{trip}</span>
        </div>
      </div>
      <p>{text}</p>
      <div className="testimonial-footer">
        <div className="stars"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
        <FaQuoteLeft className="quote-icon" />
      </div>
    </div>
  )
}

export default Testimonial
