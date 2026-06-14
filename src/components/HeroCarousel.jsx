import { Button, Carousel, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaLocationDot, FaStar } from 'react-icons/fa6'
import SearchTour from './SearchTour'

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1800&q=80',
    title: 'TravelSphere',
    text: 'Group Trips, Adventure Tours & Personalized Experiences for travelers who want the plan, the people, and the support in one place.',
    tag: 'Travel Marketplace',
  },
  {
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1800&q=80',
    title: 'Join Curated Group Trips',
    text: 'Meet fellow travelers, book fixed departures, and explore mountains, beaches, culture, and weekend escapes with in-house operations.',
    tag: 'Group Departures',
  },
  {
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1800&q=80',
    title: 'Customize International Tours',
    text: 'Plan Thailand, Vietnam, Japan, Sri Lanka, Bali, Dubai, and Europe with itinerary experts and callback support.',
    tag: 'Personalized Tours',
  },
]

function HeroCarousel() {
  return (
    <section className="hero-section">
      <Carousel fade interval={4200} controls indicators>
        {slides.map((slide) => (
          <Carousel.Item key={slide.title}>
            <div className="hero-slide" style={{ backgroundImage: `url(${slide.image})` }}>
              <Container>
                <div className="hero-content" data-aos="fade-right">
                  <span className="eyebrow"><FaStar /> {slide.tag}</span>
                  <h1>{slide.title}</h1>
                  <p>{slide.text}</p>
                  <div className="hero-actions">
                    <Button as={Link} to="/domestic" className="btn-gradient">Explore Trips <FaArrowRight /></Button>
                    <Button as={Link} to="/inquiry" variant="light">Customize Tour</Button>
                  </div>
                  <div className="hero-stats">
                    <span><strong>55k+</strong> travelers</span>
                    <span><strong>4.9</strong> reviews</span>
                    <span><strong>10+</strong> destinations</span>
                    <span><FaLocationDot /> India + World</span>
                  </div>
                  <div className="hero-search-wrap">
                    <SearchTour />
                  </div>
                </div>
              </Container>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  )
}

export default HeroCarousel
