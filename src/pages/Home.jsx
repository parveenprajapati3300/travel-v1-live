import { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {
  FaCalendarDays,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaHeadset,
  FaPeopleGroup,
  FaShieldHeart,
  FaTruckPlane,
  FaUsers,
  FaWandMagicSparkles,
} from 'react-icons/fa6'
import HeroCarousel from '../components/HeroCarousel'
import PackageCard from '../components/PackageCard'
import SectionHeading from '../components/SectionHeading'
import Testimonial from '../components/Testimonial'
import { getCategories, getDestinations, getPackages, getPackagesByCategory } from '../services/api'
import { slugify } from '../utils/slug'

const travelerStories = [
  {
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    name: 'Nisha Rao',
    trip: 'Goa Friends Weekend',
    text: 'The trip felt very smooth from pickup to hotel check-in. The team stayed connected throughout and made the weekend easy for our group.',
  },
  {
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    name: 'Rahul Mehta',
    trip: 'Manali Group Tour',
    text: 'Great planning, clean stay, and a friendly captain. I joined solo but came back with a full travel circle.',
  },
  {
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=300&q=80',
    name: 'Priya Sharma',
    trip: 'Dubai Family Escape',
    text: 'Everything was handled professionally. Itinerary, transfers, and support were clear, so our family could simply enjoy the holiday.',
  },
  {
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    name: 'Aman Verma',
    trip: 'Rishikesh Adventure',
    text: 'The experience was energetic and well managed. Activities were on time and the local guidance made the trip feel premium.',
  },
  {
    image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&w=300&q=80',
    name: 'Simran Kaur',
    trip: 'Kashmir Honeymoon',
    text: 'Beautiful hotels, polite coordination, and a very comfortable plan. The whole trip felt personal and carefully arranged.',
  },
  {
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    name: 'Vikram Saini',
    trip: 'Thailand Group Escape',
    text: 'The schedule had the right balance of sightseeing and free time. Support was quick, and the overall vibe was fantastic.',
  },
]

const whyTravelImages = [
  'https://images.unsplash.com/photo-1522506209496-4536d9020ec4?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
]

function Home() {
  const [homeDomesticPackages, setHomeDomesticPackages] = useState([])
  const [homeInternationalPackages, setHomeInternationalPackages] = useState([])
  const [homeDestinations, setHomeDestinations] = useState([])
  const [homeCategories, setHomeCategories] = useState([])
  const [groupTrips, setGroupTrips] = useState([])
  const [activeDestinationTab, setActiveDestinationTab] = useState('domestic')
  const [activePackageTab, setActivePackageTab] = useState('domestic')
  const [activeStoryIndex, setActiveStoryIndex] = useState(0)
  const [storyTransition, setStoryTransition] = useState(true)
  const [showWhyMore, setShowWhyMore] = useState(false)

  useEffect(() => {
    Promise.all([getPackages('domestic'), getPackages('international'), getDestinations(), getCategories(), getPackagesByCategory('Group Tour')])
      .then(([domesticResponse, internationalResponse, destinationResponse, categoryResponse, groupResponse]) => {
        setHomeDomesticPackages(domesticResponse.data)
        setHomeInternationalPackages(internationalResponse.data)
        setHomeDestinations(destinationResponse.data)
        setHomeCategories(categoryResponse.data)
        setGroupTrips(groupResponse.data)
      })
      .catch(() => {
        setHomeDomesticPackages([])
        setHomeInternationalPackages([])
        setHomeDestinations([])
        setHomeCategories([])
        setGroupTrips([])
      })
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setStoryTransition(true)
      setActiveStoryIndex((current) => current + 1)
    }, 2800)

    return () => window.clearInterval(timer)
  }, [])

  const activePackages = activePackageTab === 'domestic' ? homeDomesticPackages : homeInternationalPackages
  const activeRoute = activePackageTab === 'domestic' ? '/domestic' : '/international'
  const activeViewLabel = activePackageTab === 'domestic' ? 'Domestic' : 'International'
  const activeDestinations = homeDestinations
    .filter((destination) => (destination.type || 'domestic').toLowerCase() === activeDestinationTab)
    .slice(0, 4)
  const communityImages = homeDestinations.slice(0, 4)
  const totalPackages = homeDomesticPackages.length + homeInternationalPackages.length
  const showPreviousStory = () => {
    if (activeStoryIndex === 0) {
      setStoryTransition(false)
      setActiveStoryIndex(travelerStories.length)
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setStoryTransition(true)
          setActiveStoryIndex(travelerStories.length - 1)
        })
      })
      return
    }

    setStoryTransition(true)
    setActiveStoryIndex((current) => current - 1)
  }
  const showNextStory = () => {
    setStoryTransition(true)
    setActiveStoryIndex((current) => current + 1)
  }
  const handleStoryTransitionEnd = () => {
    if (activeStoryIndex >= travelerStories.length) {
      setStoryTransition(false)
      setActiveStoryIndex(0)
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setStoryTransition(true))
      })
    }
  }

  return (
    <>
      <HeroCarousel />

      <section className="trust-strip">
        <Container>
          <div className="trust-grid">
            <span><strong>55k+</strong> Travelers</span>
            <span><strong>12k+</strong> Reviews</span>
            <span><strong>10+</strong> Destinations</span>
            <span><strong>4.9/5</strong> Rating</span>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="destination-tabs-shell">
            <div className="section-title-row">
              <SectionHeading title="Popular Destinations" text="Indulge in unforgettable adventures with special tour plans." />
              <Button as={Link} to={`/destinations?type=${activeDestinationTab}`} variant="outline-dark">
                View More
              </Button>
            </div>
            <div className="package-tabs" role="tablist" aria-label="Destination categories">
              <button className={activeDestinationTab === 'domestic' ? 'active' : ''} type="button" onClick={() => setActiveDestinationTab('domestic')}>
                Domestic
              </button>
              <button className={activeDestinationTab === 'international' ? 'active' : ''} type="button" onClick={() => setActiveDestinationTab('international')}>
                International
              </button>
            </div>
            <Row className="g-4">
              {activeDestinations.map((destination) => (
                <Col md={6} lg={3} key={destination.name}>
                  <article className="destination-standard-card" data-aos="fade-up">
                    <Link className="destination-image-link" to={`/destination/${slugify(destination.name)}`} aria-label={`Explore ${destination.name}`}>
                      <img src={destination.image} alt={destination.name} />
                    </Link>
                    <div>
                      <h3>{destination.name}</h3>
                      <p><span>From</span> Rs {destination.price.toLocaleString('en-IN')}</p>
                      <Link to={`/destination/${slugify(destination.name)}`}>Explore <FaArrowRight /></Link>
                    </div>
                  </article>
                </Col>
              ))}
              {!activeDestinations.length && (
                <Col xs={12}>
                  <div className="empty-state-card">
                    <h3>No destinations added yet</h3>
                    <p>Create {activeDestinationTab} destinations from admin to show them here.</p>
                  </div>
                </Col>
              )}
            </Row>
          </div>
        </Container>
      </section>

      <section className="section soft-bg">
        <Container>
          <div className="section-title-row">
            <SectionHeading eyebrow="Themes" title="Holidays By Theme" text="Choose a travel style and see packages created under that category." />
            <Button as={Link} to="/categories" variant="outline-dark mb-4">View All</Button>
          </div>
          <Row className="g-4">
            {homeCategories.slice(0, 6).map((category) => (
              <Col md={6} lg={4} key={category._id || category.name}>
                <Link className="theme-category-card" to={`/category/${slugify(category.name)}`} data-aos="fade-up">
                  <img src={category.image} alt={category.name} />
                  <span>{category.name}</span>
                  <strong>Explore <FaArrowRight /></strong>
                </Link>
              </Col>
            ))}
            {!homeCategories.length && (
              <Col xs={12}>
                <div className="empty-state-card">
                  <h3>No categories added yet</h3>
                  <p>Create categories from admin to show theme cards here.</p>
                </div>
              </Col>
            )}
          </Row>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="package-tabs-shell">
            <div className="section-title-row">
              <SectionHeading eyebrow="Packages" title="Choose Domestic Or International Trips" text="Switch tabs to see curated packages by category, then open the full list from the matching page." />
              <Button as={Link} to={activeRoute} variant="outline-dark">View All {activeViewLabel}</Button>
            </div>
            <div className="package-tabs" role="tablist" aria-label="Package categories">
              <button className={activePackageTab === 'domestic' ? 'active' : ''} type="button" onClick={() => setActivePackageTab('domestic')}>
                Domestic Packages
              </button>
              <button className={activePackageTab === 'international' ? 'active' : ''} type="button" onClick={() => setActivePackageTab('international')}>
                International Packages
              </button>
            </div>
            <Row className="g-4">
              {activePackages.slice(0, 3).map((item) => (
                <Col md={6} lg={4} key={item._id || item.id}><PackageCard item={item} /></Col>
              ))}
              {!activePackages.length && (
                <Col xs={12}>
                  <div className="empty-state-card">
                    <h3>No {activeViewLabel.toLowerCase()} packages added yet</h3>
                    <p>Create packages from admin to show them here.</p>
                  </div>
                </Col>
              )}
            </Row>
          </div>
        </Container>
      </section>

      <section className="section soft-bg">
        <Container>
          <SectionHeading eyebrow="Upcoming Group Trips" title="Fixed Departures With Fellow Travelers" text="Join curated group adventures with shared energy, managed stays, transport, and on-trip coordination." />
          <Row className="g-4">
            {groupTrips.slice(0, 3).map((trip) => (
              <Col md={4} key={trip._id || trip.id}>
                <article className="group-trip-card" data-aos="fade-up">
                  <img src={trip.image} alt={trip.title} />
                  <div>
                    <span><FaCalendarDays /> {trip.duration}</span>
                    <h3>{trip.title}</h3>
                    <Button as={Link} to={`/package/${trip.id}`} className="btn-gradient">View Details</Button>
                  </div>
                </article>
              </Col>
            ))}
            {!groupTrips.length && (
              <Col xs={12}>
                <div className="empty-state-card">
                  <h3>No group trips added yet</h3>
                  <p>Create packages and select Group Tour category from admin.</p>
                </div>
              </Col>
            )}
          </Row>
        </Container>
      </section>

      <section className="section gradient-band">
        <Container>
          <div className="why-premium-layout">
            <div className="why-photo-mosaic" data-aos="fade-right">
              {whyTravelImages.map((image, index) => (
                <img key={image} src={image} alt={`TNT travel experience ${index + 1}`} />
              ))}
            </div>
            <div className="why-premium-copy" data-aos="fade-left">
              <span className="eyebrow">Why Choose Us</span>
              <h2>Why TNT Tour and Travels</h2>
              <p className="why-quote">“A well-planned journey should feel effortless from the first call to the final day.”</p>
              <p>We plan every journey with hand-picked routes, comfortable stays, reliable transport, and quick support, so your holiday feels smooth from booking to return.</p>
              <p>No third-party dependency for critical trip flow. Transport, stay, route, itinerary, and support are managed as one travel experience by our team.</p>
              {!showWhyMore && (
                <button className="why-read-more-btn" type="button" onClick={() => setShowWhyMore(true)}>
                  Read More
                </button>
              )}
              {showWhyMore && (
                <div className="why-more-content">
                  <p>Whether it is a family vacation, honeymoon, weekend escape, or group departure, TNT Tour and Travels keeps the planning practical, transparent, and easy to follow.</p>
                  <p>Our team keeps the package flow clear with practical day-wise planning, stay coordination, route guidance, and traveler support for every important step.</p>
                  <button className="why-read-more-btn" type="button" onClick={() => setShowWhyMore(false)}>
                    Read Less
                  </button>
                </div>
              )}
              <div className="why-premium-stats">
                {[
                  [<FaUsers />, `${totalPackages}+`, 'Live Packages'],
                  [<FaTruckPlane />, `${homeDestinations.length}+`, 'Destinations'],
                  [<FaWandMagicSparkles />, `${homeCategories.length}+`, 'Tour Themes'],
                  [<FaShieldHeart />, 'In-house', 'Operations'],
                  [<FaHeadset />, 'Quick', 'Callback Support'],
                  [<FaPeopleGroup />, `${travelerStories.length}+`, 'Traveler Reviews'],
                ].map(([icon, value, label]) => (
                  <div className="why-premium-stat" key={label}>
                    <span>{icon}</span>
                    <strong>{value}</strong>
                    <small>{label}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section" id="stories">
        <Container>
          <SectionHeading eyebrow="Traveler Stories" title="Reviews And Travel Experiences" />
          <div className="testimonial-carousel smooth-story-carousel">
            <button className="story-carousel-control previous" type="button" onClick={showPreviousStory} aria-label="Previous review">
              <FaChevronLeft />
            </button>
            <div className="story-carousel-window">
              <div
                className={`story-carousel-track ${storyTransition ? '' : 'no-transition'}`}
                style={{ transform: `translateX(calc(-${activeStoryIndex} * var(--story-card-step)))` }}
                onTransitionEnd={handleStoryTransitionEnd}
              >
                {travelerStories.concat(travelerStories.slice(0, 3)).map((story, index) => (
                  <div className="story-carousel-card" key={`${story.name}-${index}`}>
                    <Testimonial image={story.image} name={story.name} trip={story.trip} text={story.text} />
                  </div>
                ))}
              </div>
            </div>
            <button className="story-carousel-control next" type="button" onClick={showNextStory} aria-label="Next review">
              <FaChevronRight />
            </button>
            <div className="story-carousel-dots" aria-hidden="true">
              {travelerStories.map((story, index) => (
                <span className={index === activeStoryIndex % travelerStories.length ? 'active' : ''} key={story.name} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="section community-section" id="community">
        <Container>
          <Row className="g-4 align-items-center">
            <Col lg={6}>
              <SectionHeading center={false} eyebrow="Travel Community" title="Connect With Fellow Travelers" text="Discover community photos, meetups, group adventures, and events across solo travel, trekking, international trips, and weekend plans." />
              <div className="community-actions">
                <Button as={Link} to="/inquiry" className="btn-gradient"><FaUsers /> Join Community</Button>
                <span><FaPeopleGroup /> Solo Travel | Trekking | Weekend Trips</span>
              </div>
            </Col>
            <Col lg={6}>
              <div className="community-photo-grid">
                {communityImages.map((item) => (
                  <img key={item._id || item.name} src={item.image} alt={item.name} />
                ))}
                {!communityImages.length && (
                  <div className="empty-state-card">
                    <h3>No community images yet</h3>
                    <p>Create destinations from admin to show images here.</p>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

    </>
  )
}

export default Home
