import { Container } from 'react-bootstrap'
import { FaLocationDot, FaRoute, FaStar, FaUserGroup } from 'react-icons/fa6'
import SearchTour from './SearchTour'

const heroSlide = {
  image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=82',
  tripWords: ['Bhutan', 'Ladakh', 'Spiti', 'Zanskar', 'Kashmir', 'Tawang', 'Bali'],
  highlights: ['Family Tours', 'Group Departures', 'Honeymoon Trips', 'Weekend Escapes', 'International Holidays'],
  reviews: [
    {
      name: 'Saurabh',
      trip: 'Kashmir Great Lakes',
      avatar: 'S',
      avatarImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      text: 'It was my second trek with TNT, Kashmir Great Lakes. Awesome experience, helpful trek leaders and good food.',
    },
    {
      name: 'Riya',
      trip: 'Spiti Backpacking',
      avatar: 'R',
      avatarImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
      text: 'Our Spiti bike and backpacking trip was incredible, flawlessly organised and well managed throughout.',
    },
    {
      name: 'Karan',
      trip: 'Leh Ladakh Road Trip',
      avatar: 'K',
      avatarImage: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=120&q=80',
      text: 'Gear-up and layer-up trip to Leh was amazing. The journey, stay and support were beyond expectation.',
    },
  ],
}

function HeroCarousel() {
  return (
    <section className="hero-section">
      <div className="hero-slide hero-slide-wravel" style={{ backgroundImage: `url(${heroSlide.image})` }}>
        <Container>
          <div className="hero-wravel-content" data-aos="zoom-in">
            <div className="hero-wravel-copy">
              <div className="hero-theme-badge">
                <FaRoute />
                Handpicked holiday packages
              </div>
              <h1 className="hero-wravel-title" aria-label="Book your trip">
                <span>Book Your</span>
                <span>
                  Trip to
                  <span className="hero-trip-word-rail" aria-label="Popular destinations">
                    <span>
                      {[...heroSlide.tripWords, ...heroSlide.tripWords].map((word, index) => (
                        <b key={`${word}-${index}`}>{word}</b>
                      ))}
                    </span>
                  </span>
                </span>
              </h1>
              <div className="hero-wravel-taglines">
                <strong>TNT Tour and Travels</strong>
                <span>Trusted tours, smooth stays, and journeys planned with care.</span>
                <small>#travelwithtnt</small>
              </div>
              <div className="hero-theme-chips" aria-label="Popular tour themes">
                {heroSlide.highlights.map((item) => (
                  <span key={item}><FaLocationDot /> {item}</span>
                ))}
              </div>
              <div className="hero-inline-search">
                <SearchTour />
              </div>
            </div>
            <div className="hero-review-panel" aria-label="Traveler reviews">
              <div className="hero-review-panel-head">
                <span><FaUserGroup /> Real Traveler Ratings</span>
                <strong>4.9/5</strong>
              </div>
              <div className="hero-review-stack">
              <div className="hero-review-track">
                {[...heroSlide.reviews, ...heroSlide.reviews].map((review, index) => (
                  <article className="hero-review-card" key={`${review.text}-${index}`}>
                    <span>
                      {review.avatarImage ? <img src={review.avatarImage} alt="" /> : review.avatar}
                    </span>
                    <div>
                      <strong>{review.name}</strong>
                      <small>{review.trip}</small>
                      <div aria-label="5 star rating">
                        <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                      </div>
                      <p>{review.text}</p>
                    </div>
                  </article>
                ))}
              </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}

export default HeroCarousel
