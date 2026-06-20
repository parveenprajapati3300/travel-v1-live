import { Container } from 'react-bootstrap'
import { FaStar } from 'react-icons/fa6'
import SearchTour from './SearchTour'

const heroSlide = {
  image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3?auto=format&fit=crop&w=1800&q=80',
  tripWords: ['Bhutan', 'Ladakh', 'Spiti', 'Zanskar', 'Kashmir', 'Tawang', 'Bali'],
  reviews: [
    {
      avatar: 'S',
      avatarImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      text: 'It was my second trek with TNT, Kashmir Great Lakes. Awesome experience, helpful trek leaders and good food.',
    },
    {
      avatar: 'R',
      avatarImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
      text: 'Our Spiti bike and backpacking trip was incredible, flawlessly organised and well managed throughout.',
    },
    {
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
            </div>
            <div className="hero-review-stack" aria-label="Traveler reviews">
              <div className="hero-review-track">
                {[...heroSlide.reviews, ...heroSlide.reviews].map((review, index) => (
                  <article className="hero-review-card" key={`${review.text}-${index}`}>
                    <span>
                      {review.avatarImage ? <img src={review.avatarImage} alt="" /> : review.avatar}
                    </span>
                    <div>
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
        </Container>
      </div>
      <div className="hero-fixed-search">
        <Container>
          <SearchTour />
        </Container>
      </div>
    </section>
  )
}

export default HeroCarousel
