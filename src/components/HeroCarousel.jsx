import { Carousel, Container } from 'react-bootstrap'
import { FaStar } from 'react-icons/fa6'
import SearchTour from './SearchTour'

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3?auto=format&fit=crop&w=1800&q=80',
    title: 'TNT Tour and Travels',
    text: 'Group trips, adventure tours, family holidays, and personalized travel support from New Delhi.',
    tag: 'Explore. Travel. Thrive.',
    rating: '4.9',
    ratingText: '12k+ happy travelers',
    visual: 'wravelStyle',
    spotlightImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=500&q=80',
    tripWords: ['Bhutan', 'Ladakh', 'Spiti', 'Zanskar', 'Kashmir', 'Tawang', 'Bali'],
    reviewItems: ['10k+ Reviews', '55k+ Travelers', '4.9/5 Rating', '10+ Destinations'],
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
  },
  {
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1800&q=80',
    title: 'Join Curated Group Trips',
    text: 'Meet fellow travelers, book fixed departures, and explore mountains, beaches, culture, and weekend escapes with in-house operations.',
    tag: 'Group Departures',
    rating: '4.8',
    ratingText: 'Group departure reviews',
  },
  {
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1800&q=80',
    title: 'Customize International Tours',
    text: 'Plan Thailand, Vietnam, Japan, Sri Lanka, Bali, Dubai, and Europe with itinerary experts and callback support.',
    tag: 'Personalized Tours',
    rating: '4.9',
    ratingText: 'International trip rating',
  },
]

function HeroCarousel() {
  return (
    <section className="hero-section">
      <Carousel fade interval={4200} controls indicators>
        {slides.map((slide) => (
          <Carousel.Item key={slide.title}>
            <div className={`hero-slide ${slide.visual === 'wravelStyle' ? 'hero-slide-wravel' : ''}`} style={{ backgroundImage: `url(${slide.image})` }}>
              <Container>
                {slide.visual === 'wravelStyle' ? (
                  <div className="hero-wravel-content" data-aos="zoom-in">
                    <div className="hero-wravel-copy">
                      <h1 className="hero-wravel-title" aria-label="Book your trip">
                        <span>Book Your</span>
                        <span>
                          Trip to
                          <span className="hero-trip-word-rail" aria-label="Popular destinations">
                            <span>
                              {[...slide.tripWords, ...slide.tripWords].map((word, index) => (
                                <b key={`${word}-${index}`}>{word}</b>
                              ))}
                            </span>
                          </span>
                        </span>
                      </h1>
                      <div className="hero-wravel-taglines">
                        <strong>Wander | Travel | Connect | Repeat</strong>
                        <span>Where Adventure meets Community</span>
                        <small>#travelerforlife</small>
                      </div>
   
                    </div>
                    <div className="hero-review-stack" aria-label="Traveler reviews">
                      <div className="hero-review-track">
                        {[...slide.reviews, ...slide.reviews].map((review, index) => (
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
                ) : (
                  <div className="hero-content" data-aos="fade-right">
                    <span className="eyebrow"><FaStar /> {slide.tag}</span>
                    <h1>{slide.title}</h1>
                    <p>{slide.text}</p>
                  </div>
                )}
              </Container>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
      <div className="hero-fixed-search">
        <Container>
          <SearchTour />
        </Container>
      </div>
    </section>
  )
}

export default HeroCarousel
