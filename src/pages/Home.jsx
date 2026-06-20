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
import { getCategories, getDestinations, getPackages, getPackagesByCategory } from '../services/api'
import { slugify } from '../utils/slug'

function Home() {
  const [homeDomesticPackages, setHomeDomesticPackages] = useState([])
  const [homeInternationalPackages, setHomeInternationalPackages] = useState([])
  const [homeDestinations, setHomeDestinations] = useState([])
  const [homeCategories, setHomeCategories] = useState([])
  const [groupTrips, setGroupTrips] = useState([])
  const [activeDestinationTab, setActiveDestinationTab] = useState('domestic')
  const [activePackageTab, setActivePackageTab] = useState('domestic')

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

  const activePackages = activePackageTab === 'domestic' ? homeDomesticPackages : homeInternationalPackages
  const activeRoute = activePackageTab === 'domestic' ? '/domestic' : '/international'
  const activeViewLabel = activePackageTab === 'domestic' ? 'Domestic' : 'International'
  const activeDestinations = homeDestinations
    .filter((destination) => (destination.type || 'domestic').toLowerCase() === activeDestinationTab)
    .slice(0, 4)
  const storyItems = [...homeDomesticPackages, ...homeInternationalPackages]
    .flatMap((item) => (item.reviews || []).map((review) => [item.title, item.packageDestination || item.location, review]))
    .slice(0, 3)
  const communityImages = homeDestinations.slice(0, 4)

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
            {storyItems.map(([name, trip, text]) => (
              <Col md={4} key={name}>
                <Testimonial name={name} trip={trip} text={text} />
              </Col>
            ))}
            {!storyItems.length && (
              <Col xs={12}>
                <div className="empty-state-card">
                  <h3>No traveler stories added yet</h3>
                  <p>Add reviews while creating packages from admin to show stories here.</p>
                </div>
              </Col>
            )}
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
