import { useEffect, useMemo, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {
  FaCalendarDays,
  FaArrowRight,
  FaHeadset,
  FaLocationDot,
  FaPeopleGroup,
  FaShieldHeart,
  FaTruckPlane,
  FaUsers,
  FaWandMagicSparkles,
  FaStar,
  FaGoogle,
} from 'react-icons/fa6'
import HeroCarousel from '../components/HeroCarousel'
import PackageCard from '../components/PackageCard'
import SectionHeading from '../components/SectionHeading'
import recognition1 from '../assets/recognitions/recognition-1.png'
import recognition2 from '../assets/recognitions/recognition-2.png'
import recognition3 from '../assets/recognitions/recognition-3.png'
import recognition4 from '../assets/recognitions/recognition-4.png'
import recognition5 from '../assets/recognitions/recognition-5.png'
import recognition6 from '../assets/recognitions/recognition-6.png'
import recognition7 from '../assets/recognitions/recognition-7.png'
import recognition8 from '../assets/recognitions/recognition-8.png'
import recognition9 from '../assets/recognitions/recognition-9.png'
import { getCategories, getDestinations, getPackages, getPackagesByCategory } from '../services/api'
import { slugify } from '../utils/slug'

const travelerStories = [
  {
    image: new URL('../assets/travel/home/home-1494790108377-w300-80.jpg', import.meta.url).href,
    name: 'Nisha Rao',
    trip: 'Goa Friends Weekend',
    text: 'The trip felt very smooth from pickup to hotel check-in. The team stayed connected throughout and made the weekend easy for our group.',
  },
  {
    image: new URL('../assets/travel/home/home-1500648767791-w300-80.jpg', import.meta.url).href,
    name: 'Rahul Mehta',
    trip: 'Manali Group Tour',
    text: 'Great planning, clean stay, and a friendly captain. I joined solo but came back with a full travel circle.',
  },
  {
    image: new URL('../assets/travel/home/home-1531123897727-w300-80.jpg', import.meta.url).href,
    name: 'Priya Sharma',
    trip: 'Dubai Family Escape',
    text: 'Everything was handled professionally. Itinerary, transfers, and support were clear, so our family could simply enjoy the holiday.',
  },
  {
    image: new URL('../assets/travel/home/home-1507003211169-w300-80.jpg', import.meta.url).href,
    name: 'Aman Verma',
    trip: 'Rishikesh Adventure',
    text: 'The experience was energetic and well managed. Activities were on time and the local guidance made the trip feel premium.',
  },
  {
    image: new URL('../assets/travel/home/home-1489424731084-w300-80.jpg', import.meta.url).href,
    name: 'Simran Kaur',
    trip: 'Kashmir Honeymoon',
    text: 'Beautiful hotels, polite coordination, and a very comfortable plan. The whole trip felt personal and carefully arranged.',
  },
  {
    image: new URL('../assets/travel/home/home-1506794778202-w300-80.jpg', import.meta.url).href,
    name: 'Vikram Saini',
    trip: 'Thailand Group Escape',
    text: 'The schedule had the right balance of sightseeing and free time. Support was quick, and the overall vibe was fantastic.',
  },
]

const whyTravelImages = [
  new URL('../assets/travel/home/home-1522506209496-w900-80.jpg', import.meta.url).href,
  new URL('../assets/travel/blogs/blogs-1500530855697-w900-80.jpg', import.meta.url).href,
  new URL('../assets/travel/styles/styles-1488646953014-w1800-80.jpg', import.meta.url).href,
  new URL('../assets/travel/home/home-1506929562872-w900-80.jpg', import.meta.url).href,
  new URL('../assets/travel/gallery/gallery-1507525428034-w900-80.jpg', import.meta.url).href,
]

const recognitionItems = [
  { name: 'Startup India', image: recognition1 },
  { name: 'MSME', image: recognition2 },
  { name: 'Travelers Choice', image: recognition3 },
  { name: 'Uttar Pradesh Tourism', image: recognition4 },
  { name: 'ATOAI', image: recognition5 },
  { name: 'Business Standard', image: recognition6 },
  { name: 'IIMB', image: recognition7 },
  { name: 'Uttar Pradesh Tourism Centre', image: recognition8 },
  { name: 'Experience Bengal', image: recognition9 },
]

const trustStats = [
  {
    value: '55k+',
    label: 'Travelers',
    icon: FaUsers,
    tone: 'teal',
  },
  {
    value: '12k+',
    label: 'Reviews',
    icon: FaStar,
    tone: 'gold',
  },
  {
    value: '10+',
    label: 'Destinations',
    icon: FaLocationDot,
    tone: 'blue',
  },
  {
    value: '24/7',
    label: 'Support',
    icon: FaHeadset,
    tone: 'coral',
  },
]

function Home() {
  const [homeDomesticPackages, setHomeDomesticPackages] = useState([])
  const [homeInternationalPackages, setHomeInternationalPackages] = useState([])
  const [homeDestinations, setHomeDestinations] = useState([])
  const [homeCategories, setHomeCategories] = useState([])
  const [groupTrips, setGroupTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeDestinationTab, setActiveDestinationTab] = useState('domestic')
  const [activePackageTab, setActivePackageTab] = useState('domestic')
  const [activeStoryIndex, setActiveStoryIndex] = useState(0)
  const [storyTransition, setStoryTransition] = useState(true)
  const [showWhyMore, setShowWhyMore] = useState(false)

  useEffect(() => {
    setLoading(true)
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
      .finally(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setStoryTransition(true)
      setActiveStoryIndex((current) => current + 1)
    }, 3200)

    return () => window.clearInterval(timer)
  }, [])

  const activePackages = activePackageTab === 'domestic' ? homeDomesticPackages : homeInternationalPackages
  const activeRoute = activePackageTab === 'domestic' ? '/domestic' : '/international'
  const activeViewLabel = activePackageTab === 'domestic' ? 'Domestic' : 'International'
  const activeDestinations = homeDestinations
    .filter((destination) => (destination.type || 'domestic').toLowerCase() === activeDestinationTab)
    .slice(0, 6)
  const communityImages = homeDestinations.slice(0, 4)
  const destinationSkeletons = Array.from({ length: 6 }, (_, index) => index)
  const themeSkeletons = Array.from({ length: 6 }, (_, index) => index)
  const packageSkeletons = Array.from({ length: 3 }, (_, index) => index)
  const travelerStoryDestinations = useMemo(() => {
    const sourceDestinations = activeDestinations.length ? activeDestinations : homeDestinations.slice(0, 3)
    return sourceDestinations.slice(0, 3)
  }, [activeDestinations, homeDestinations])
  const travelerStorySlides = useMemo(() => {
    const slides = travelerStories.map((story, index) => ({
      ...story,
      destination: travelerStoryDestinations[index % travelerStoryDestinations.length],
    }))
    return slides.concat(slides.slice(0, 3))
  }, [travelerStoryDestinations])
  const totalPackages = homeDomesticPackages.length + homeInternationalPackages.length
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
            {trustStats.map((item) => {
              const Icon = item.icon
              return (
                <article key={item.label} className={`trust-card trust-card-${item.tone}`}>
                  <div className="trust-icon" aria-hidden="true">
                    <Icon />
                  </div>
                  <div className="trust-copy">
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </div>
                </article>
              )
            })}
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
              {loading ? destinationSkeletons.map((slot) => (
                <Col xs={12} sm={6} lg={4} key={`destination-skeleton-${slot}`}>
                  <article className="destination-standard-card card-skeleton destination-card-skeleton" aria-busy="true">
                    <div className="destination-image-link card-skeleton-media" />
                    <div>
                      <span className="card-skeleton-line card-skeleton-line-lg" />
                      <span className="card-skeleton-line card-skeleton-line-sm" />
                      <span className="card-skeleton-link" />
                    </div>
                  </article>
                </Col>
              )) : activeDestinations.length ? activeDestinations.map((destination) => (
                <Col xs={12} sm={6} lg={4} key={destination.name}>
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
              )) : (
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
            {loading ? themeSkeletons.map((slot) => (
              <Col md={6} lg={4} key={`theme-skeleton-${slot}`}>
                <article className="theme-standard-card card-skeleton theme-card-skeleton" aria-busy="true">
                  <div className="theme-image-link card-skeleton-media" />
                  <div>
                    <span className="card-skeleton-line card-skeleton-line-lg" />
                    <span className="card-skeleton-line card-skeleton-line-sm" />
                    <span className="card-skeleton-link" />
                  </div>
                </article>
              </Col>
            )) : homeCategories.length ? homeCategories.slice(0, 6).map((category) => (
              <Col md={6} lg={4} key={category._id || category.name}>
                <article className="theme-standard-card" data-aos="fade-up">
                  <Link className="theme-image-link" to={`/category/${slugify(category.name)}`} aria-label={`Explore ${category.name}`}>
                    <img src={category.image} alt={category.name} />
                  </Link>
                  <div>
                    <h3>{category.name}</h3>
                    <Link to={`/category/${slugify(category.name)}`}>Explore <FaArrowRight /></Link>
                  </div>
                </article>
              </Col>
            )) : (
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
              {loading ? packageSkeletons.map((slot) => (
                <Col md={6} lg={4} key={`package-skeleton-${slot}`}>
                  <article className="package-card h-100 package-card-skeleton card-skeleton" aria-busy="true">
                    <div className="card-image-wrap card-skeleton-media" />
                    <div className="package-card-skeleton-body">
                      <div className="card-skeleton-line card-skeleton-line-xs" />
                      <div className="card-skeleton-line card-skeleton-line-lg" />
                      <div className="card-skeleton-line card-skeleton-line-md" />
                      <div className="card-skeleton-line card-skeleton-line-md" />
                      <div className="card-skeleton-line card-skeleton-line-lg card-skeleton-line-short" />
                    </div>
                    <div className="package-card-skeleton-footer">
                      <div className="card-skeleton-line card-skeleton-line-sm" />
                      <div className="card-skeleton-link" />
                    </div>
                  </article>
                </Col>
              )) : activePackages.length ? activePackages.slice(0, 3).map((item) => (
                <Col md={6} lg={4} key={item._id || item.id}><PackageCard item={item} /></Col>
              )) : (
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
          {travelerStorySlides.length ? (
            <div className="story-review-carousel">
              <div className="story-review-window">
                <div
                  className={`story-review-track ${storyTransition ? '' : 'no-transition'}`}
                  style={{ transform: `translateX(calc(-${activeStoryIndex} * var(--story-review-step)))` }}
                  onTransitionEnd={handleStoryTransitionEnd}
                >
                  {travelerStorySlides.map((story, index) => {
                    const destination = story.destination || travelerStoryDestinations[0]

                    return (
                      <article className="story-review-card" data-aos="fade-up" key={`${story.name}-${story.trip}-${index}`}>
                        <div className="story-review-head">
                          <span className="story-review-avatar">
                            <img src={story.image} alt={story.name} />
                          </span>
                          <div className="story-review-meta">
                            <strong>{story.name}</strong>
                            <span className="story-review-google">
                              <FaGoogle />
                              <i>Google</i>
                              <b><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></b>
                            </span>
                          </div>
                          <span className="story-review-open">
                            <FaArrowRight />
                          </span>
                        </div>
                        <p className="story-review-text">{story.text}</p>
                        <Link className="story-review-destination" to={destination ? `/destination/${slugify(destination.name)}` : '/destinations'}>
                          <img src={destination?.image} alt={destination?.name} />
                          <div>
                            <strong>{destination?.name}</strong>
                            <span>Try Yourself</span>
                          </div>
                          <FaArrowRight />
                        </Link>
                      </article>
                    )
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="empty-state-card">
              <h3>No traveler stories yet</h3>
              <p>Add packages from admin and they will appear here automatically.</p>
            </div>
          )}
        </Container>
      </section>

      <section className="section recognition-section">
        <Container>
          <SectionHeading eyebrow="Recognitions" title="Recognitions By Govt." text="Trusted travel operations, tourism associations, and community milestones that keep every TNT journey accountable." />
          <div className="recognition-carousel" aria-label="Recognitions carousel">
            <div className="recognition-track">
              {[...recognitionItems, ...recognitionItems].map((item, index) => (
                <article className="recognition-card" key={`${item.name}-${index}`}>
                  <img src={item.image} alt={item.name} />
                </article>
              ))}
            </div>
          <SectionHeading  text="Trusted travel operations, tourism associations, and community milestones that keep every TNT journey accountable.Trusted travel operations, tourism associations, and community milestones that keep every TNT journey accountable.Trusted travel operations, tourism associations, and community milestones that keep every TNT journey accountable. " />
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
