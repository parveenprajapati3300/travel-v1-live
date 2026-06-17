import { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {
  FaCalendarDays,
  FaCameraRetro,
  FaArrowRight,
  FaHeadset,
  FaPeopleGroup,
  FaShieldHeart,
  FaStar,
  FaSuitcaseRolling,
  FaTruckPlane,
  FaUsers,
  FaWandMagicSparkles,
} from 'react-icons/fa6'
import HeroCarousel from '../components/HeroCarousel'
import PackageCard from '../components/PackageCard'
import SectionHeading from '../components/SectionHeading'
import Testimonial from '../components/Testimonial'
import Gallery from '../components/Gallery'
import InquiryForm from '../components/InquiryForm'
import { domesticPackages, internationalPackages } from '../data/packages'
import { getPackages } from '../services/api'

const destinations = [
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
  { destination: 'Leh Ladakh Bike Expedition', dates: '12 Jul - 18 Jul', image: destinations[0].image },
  { destination: 'Spiti Valley Backpacking', dates: '2 Aug - 9 Aug', image: destinations[1].image },
  { destination: 'Vietnam Community Trail', dates: '18 Sep - 24 Sep', image: destinations[5].image },
]

const stories = [
  ['Aarav Mehta', 'Leh Ladakh group trip', 'Met amazing people, route leaders were sharp, and every stay felt sorted.'],
  ['Nisha Rao', 'Bali custom tour', 'The plan had romance, free time, and zero confusion. Exactly what we needed.'],
  ['Kabir Sethi', 'Dubai family getaway', 'Fast callback, clear inclusions, and smooth transfers from airport to hotel.'],
]

function Home() {
  const [homeDomesticPackages, setHomeDomesticPackages] = useState(domesticPackages)
  const [homeInternationalPackages, setHomeInternationalPackages] = useState(internationalPackages)
  const [activeDestinationTab, setActiveDestinationTab] = useState('domestic')
  const [activePackageTab, setActivePackageTab] = useState('domestic')

  useEffect(() => {
    Promise.all([getPackages('domestic'), getPackages('international')])
      .then(([domesticResponse, internationalResponse]) => {
        setHomeDomesticPackages(domesticResponse.data.length ? domesticResponse.data : domesticPackages)
        setHomeInternationalPackages(internationalResponse.data.length ? internationalResponse.data : internationalPackages)
      })
      .catch(() => {
        setHomeDomesticPackages(domesticPackages)
        setHomeInternationalPackages(internationalPackages)
      })
  }, [])

  const activePackages = activePackageTab === 'domestic' ? homeDomesticPackages : homeInternationalPackages
  const activeRoute = activePackageTab === 'domestic' ? '/domestic' : '/international'
  const activeViewLabel = activePackageTab === 'domestic' ? 'Domestic' : 'International'
  const activeDestinations = destinations.filter((destination) => destination.type.toLowerCase() === activeDestinationTab)

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
              <Button as={Link} to={activeDestinationTab === 'domestic' ? '/domestic' : '/international'} variant="outline-dark">
                View All {activeDestinationTab === 'domestic' ? 'Domestic' : 'International'}
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
                    <img src={destination.image} alt={destination.name} />
                    <div>
                      <h3>{destination.name}</h3>
                      <div className="destination-meta-line">
                        <strong>{destination.duration}</strong>
                        <span>From</span>
                      </div>
                      <p>Rs {destination.price.toLocaleString('en-IN')}</p>
                      <Link to="/inquiry">Explore <FaArrowRight /></Link>
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
                {destinations.slice(0, 4).map((destination) => (
                  <img key={destination.name} src={destination.image} alt={`${destination.name} community`} />
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section soft-bg" id="gallery">
        <Container>
          <SectionHeading eyebrow="Instagram Gallery" title="Adventure Shots, Trekking Photos, And Trip Moments" />
          <Gallery />
        </Container>
      </section>

      <section className="section lead-section">
        <Container>
          <Row className="g-4 align-items-center">
            <Col lg={5}>
              <SectionHeading center={false} eyebrow="Free Consultation" title="Request A Callback For Your Trip" text="Share your name, email, phone, destination, and travel date. Our expert will help you compare group trips and custom packages." />
              <div className="lead-icons">
                <span><FaCameraRetro /> Destination ideas</span>
                <span><FaSuitcaseRolling /> Package guidance</span>
                <span><FaStar /> Review-backed picks</span>
              </div>
            </Col>
            <Col lg={7}>
              <div className="form-shell glass-card">
                <InquiryForm />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="newsletter-section">
        <Container>
          <Row className="align-items-center g-4">
            <Col lg={7}>
              <span className="eyebrow">Travel Notes</span>
              <h2>Get trip drops, group departure alerts, and community event updates.</h2>
            </Col>
            <Col lg={5}>
              <div className="newsletter-form">
                <Form.Control type="email" placeholder="Enter your email" aria-label="Email address" />
                <Button className="btn-gradient">Subscribe</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default Home
