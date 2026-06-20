import { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {
  FaCalendarDays,
  FaArrowRight,
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
import { domesticPackages, internationalPackages } from '../data/packages'
import { getCategories, getDestinations, getPackages } from '../services/api'
import { slugify } from '../utils/slug'

const fallbackDestinations = [
  { name: 'Leh Ladakh', type: 'Domestic', duration: '7 Days', price: 32999, image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=900&q=80' },
  { name: 'Spiti Valley', type: 'Domestic', duration: '8 Days', price: 28999, image: 'https://images.unsplash.com/photo-1628082305368-2e772d6c6d76?auto=format&fit=crop&w=900&q=80' },
  { name: 'Kerala', type: 'Domestic', duration: '6 Days', price: 38999, image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80' },
  { name: 'Meghalaya', type: 'Domestic', duration: '5 Days', price: 24999, image: 'https://images.unsplash.com/photo-1591017403286-fd8493524e1e?auto=format&fit=crop&w=900&q=80' },
  { name: 'Thailand', type: 'International', duration: '5 Days', price: 52999, image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=900&q=80' },
  { name: 'Vietnam', type: 'International', duration: '6 Days', price: 58999, image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=900&q=80' },
  { name: 'Japan', type: 'International', duration: '7 Days', price: 149999, image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80' },
  { name: 'Sri Lanka', type: 'International', duration: '5 Days', price: 44999, image: 'https://images.unsplash.com/photo-1588255580561-45f224b1f6f8?auto=format&fit=crop&w=900&q=80' },
]

const groupTrips = [
  { destination: 'Leh Ladakh Bike Expedition', dates: '12 Jul - 18 Jul', image: fallbackDestinations[0].image },
  { destination: 'Spiti Valley Backpacking', dates: '2 Aug - 9 Aug', image: fallbackDestinations[4].image },
  { destination: 'Vietnam Community Trail', dates: '18 Sep - 24 Sep', image: fallbackDestinations[5].image },
]

const fallbackCategories = [
  { name: 'Group Tour', image: fallbackDestinations[0].image },
  { name: 'Honeymoon Tour', image: fallbackDestinations[4].image },
  { name: 'Solo Trip', image: fallbackDestinations[1].image },
  { name: 'Weekend Tour', image: fallbackDestinations[2].image },
]

const stories = [
  ['Aarav Mehta', 'Leh Ladakh group trip', 'Met amazing people, route leaders were sharp, and every stay felt sorted.'],
  ['Nisha Rao', 'Bali custom tour', 'The plan had romance, free time, and zero confusion. Exactly what we needed.'],
  ['Kabir Sethi', 'Dubai family getaway', 'Fast callback, clear inclusions, and smooth transfers from airport to hotel.'],
]

const communityImages = [
  {
    name: 'Group travel friends',
    image: 'https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Mountain travel community',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Beach travel meetup',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Adventure travelers',
    image: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=900&q=80',
  },
]

function Home() {
  const [homeDomesticPackages, setHomeDomesticPackages] = useState(domesticPackages)
  const [homeInternationalPackages, setHomeInternationalPackages] = useState(internationalPackages)
  const [homeDestinations, setHomeDestinations] = useState(fallbackDestinations)
  const [homeCategories, setHomeCategories] = useState(fallbackCategories)
  const [activeDestinationTab, setActiveDestinationTab] = useState('domestic')
  const [activePackageTab, setActivePackageTab] = useState('domestic')

  useEffect(() => {
    Promise.all([getPackages('domestic'), getPackages('international'), getDestinations(), getCategories()])
      .then(([domesticResponse, internationalResponse, destinationResponse, categoryResponse]) => {
        setHomeDomesticPackages(domesticResponse.data.length ? domesticResponse.data : domesticPackages)
        setHomeInternationalPackages(internationalResponse.data.length ? internationalResponse.data : internationalPackages)
        setHomeDestinations(destinationResponse.data.length ? destinationResponse.data : fallbackDestinations)
        setHomeCategories(categoryResponse.data.length ? categoryResponse.data : fallbackCategories)
      })
      .catch(() => {
        setHomeDomesticPackages(domesticPackages)
        setHomeInternationalPackages(internationalPackages)
        setHomeDestinations(fallbackDestinations)
        setHomeCategories(fallbackCategories)
      })
  }, [])

  const activePackages = activePackageTab === 'domestic' ? homeDomesticPackages : homeInternationalPackages
  const activeRoute = activePackageTab === 'domestic' ? '/domestic' : '/international'
  const activeViewLabel = activePackageTab === 'domestic' ? 'Domestic' : 'International'
  const activeDestinations = homeDestinations
    .filter((destination) => (destination.type || 'domestic').toLowerCase() === activeDestinationTab)
    .slice(0, 4)

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
            </Row>
          </div>
        </Container>
      </section>

      <section className="section soft-bg">
        <Container>
          <div className="section-title-row">
            <SectionHeading eyebrow="Themes" title="Holidays By Theme" text="Choose a travel style and see packages created under that category." />
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
            </Row>
          </div>
        </Container>
      </section>

      <section className="section soft-bg">
        <Container>
          <SectionHeading eyebrow="Upcoming Group Trips" title="Fixed Departures With Fellow Travelers" text="Join curated group adventures with shared energy, managed stays, transport, and on-trip coordination." />
          <Row className="g-4">
            {groupTrips.map((trip) => (
              <Col md={4} key={trip.destination}>
                <article className="group-trip-card" data-aos="fade-up">
                  <img src={trip.image} alt={trip.destination} />
                  <div>
                    <span><FaCalendarDays /> {trip.dates}</span>
                    <h3>{trip.destination}</h3>
                    <Button as={Link} to="/inquiry" className="btn-gradient">Book Now</Button>
                  </div>
                </article>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="section gradient-band">
        <Container>
          <Row className="g-4 align-items-center">
            <Col lg={5}>
              <SectionHeading center={false} eyebrow="Why Choose Us" title="In-House Operations, Hassle-Free Experience" text="No third-party dependency for critical trip flow. Transport, stay, route, and support are managed as one travel experience." />
            </Col>
            <Col lg={7}>
              <Row className="g-3">
                {[
                  [<FaShieldHeart />, 'In-house Operations', 'Core planning and execution stay with our travel team.'],
                  [<FaTruckPlane />, 'Hassle-Free Experience', 'Transport, stay, route, and itinerary managed end to end.'],
                  [<FaHeadset />, 'Callback Support', 'Quick consultation for dates, budget, and trip style.'],
                  [<FaWandMagicSparkles />, 'Customized Packages', 'Trips shaped around group, family, honeymoon, or solo needs.'],
                ].map(([icon, title, text]) => (
                  <Col sm={6} key={title}>
                    <div className="why-card glass-card" data-aos="fade-up">
                      <span>{icon}</span>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section" id="stories">
        <Container>
          <SectionHeading eyebrow="Traveler Stories" title="Reviews And Travel Experiences" />
          <Row className="g-4">
            {stories.map(([name, trip, text]) => (
              <Col md={4} key={name}>
                <Testimonial name={name} trip={trip} text={text} />
              </Col>
            ))}
          </Row>
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
                  <img key={item.name} src={item.image} alt={item.name} />
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

    </>
  )
}

export default Home
