import { useEffect, useMemo, useState } from 'react'
import { Accordion, Button, Col, Container, Modal, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
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
  FaPlay,
  FaXmark,
} from 'react-icons/fa6'
import HeroCarousel from '../components/HeroCarousel'
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
import { getAdminHotSellingTrips, getCategories, getDestinations, getPackages, getPackagesByCategory } from '../services/api'
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

const tripRowBanners = {
  hot: new URL('../assets/travel/banner/banner-ladakh.jpg', import.meta.url).href,
  domestic: new URL('../assets/travel/banner/banner-kashmir.jpg', import.meta.url).href,
  international: new URL('../assets/travel/banner/banner-dubai.jpg', import.meta.url).href,
  honeymoon: new URL('../assets/travel/packages/packages-1537996194471-w1400-80.jpg', import.meta.url).href,
  weekend: new URL('../assets/travel/banner/banner-goa.jpg', import.meta.url).href,
  hill: new URL('../assets/travel/banner/banner-kerala.jpg', import.meta.url).href,
  adventure: new URL('../assets/travel/packages/packages-1581793745862-w1400-80.jpg', import.meta.url).href,
  backpacking: new URL('../assets/travel/styles/styles-1507525428034-w1600-80.jpg', import.meta.url).href,
}

const tripRowVideos = {
  hot: new URL('../assets/travel/videos/hot-selling-travel.mp4', import.meta.url).href,
}

const memoryVideos = {
  travelers: new URL('../assets/travel/videos/memory-01-travelers.mp4', import.meta.url).href,
  mountains: new URL('../assets/travel/videos/memory-02-mountains.mp4', import.meta.url).href,
  roadTrip: new URL('../assets/travel/videos/memory-03-road-trip.mp4', import.meta.url).href,
  nature: new URL('../assets/travel/videos/memory-04-nature.mp4', import.meta.url).href,
  adventure: new URL('../assets/travel/videos/memory-05-adventure.mp4', import.meta.url).href,
}

const memoryMediaItems = [
  {
    title: 'Mountain Group Memories',
    type: 'video',
    video: memoryVideos.travelers,
    poster: new URL('../assets/travel/gallery/gallery-1507525428034-w900-80.jpg', import.meta.url).href,
  },
  {
    title: 'Hillside Travel Story',
    type: 'video',
    video: memoryVideos.mountains,
    poster: new URL('../assets/travel/gallery/gallery-1528127269322-w900-80.jpg', import.meta.url).href,
  },
  {
    title: 'Valley Road Journey',
    type: 'video',
    video: memoryVideos.roadTrip,
    poster: new URL('../assets/travel/gallery/gallery-1518684079-w900-80.jpg', import.meta.url).href,
  },
  {
    title: 'Weekend Trip Moments',
    type: 'video',
    video: memoryVideos.nature,
    poster: new URL('../assets/travel/home/home-1506929562872-w900-80.jpg', import.meta.url).href,
  },
  {
    title: 'Traveler Life Highlights',
    type: 'video',
    video: memoryVideos.adventure,
    poster: new URL('../assets/travel/blogs/blogs-1508009603885-w900-80.jpg', import.meta.url).href,
  },
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

const homeBlogPosts = [
  {
    title: 'Why TNT Tour And Travels Is The Perfect Choice For Your All-Girls Trip',
    date: '30 Jul',
    read: '6 minutes read',
    image: new URL('../assets/travel/blogs/blogs-1500530855697-w900-80.jpg', import.meta.url).href,
    excerpt: 'Plan a safer, smoother, and more memorable trip with curated stays, transport, and support.',
  },
  {
    title: 'Book Now Pay Later With TNT Tour And Travels',
    date: '25 Jun',
    read: '5 minutes read',
    image: new URL('../assets/travel/blogs/blogs-1508009603885-w900-80.jpg', import.meta.url).href,
    excerpt: 'Make travel planning easier with flexible booking, clear pricing, and simple assistance.',
  },
  {
    title: 'Why School Trips Are More Than Just Fun Days Out',
    date: '18 Sep',
    read: '9 minutes read',
    image: new URL('../assets/travel/blogs/blogs-1488646953014-w900-80.jpg', import.meta.url).href,
    excerpt: 'Educational tours can bring teamwork, confidence, and real-world learning together.',
  },
  {
    title: '25 Best Places To Visit In India In July',
    date: '16 Jun',
    read: '17 minutes read',
    image: new URL('../assets/travel/styles/styles-1488646953014-w1800-80.jpg', import.meta.url).href,
    excerpt: 'There are many places to visit in India in July where monsoon weather, green views, and lighter crowds come together.',
  },
]

const homeFaqItems = [
  {
    question: 'What does TNT Tour And Travels mean?',
    answer: 'TNT Tour And Travels plans practical holidays, group trips, honeymoons, weekend getaways, and custom tours with end-to-end travel support.',
  },
  {
    question: 'Who are the travelers of TNT Tour And Travels?',
    answer: 'Our travelers include families, couples, solo travelers, school groups, corporate groups, and friends planning domestic or international trips.',
  },
  {
    question: 'What are the destinations that TNT Tour And Travels covers?',
    answer: 'We cover popular Indian destinations, weekend routes, Himalayan treks, honeymoon places, and international holidays including Thailand, Dubai, Bali, and more.',
  },
  {
    question: 'How experienced are TNT Tour And Travels trip captains?',
    answer: 'Trip captains and coordinators are selected for route knowledge, communication, traveler handling, and smooth on-ground coordination.',
  },
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
  const [hotSellingTrips, setHotSellingTrips] = useState([])
  const [homeDestinations, setHomeDestinations] = useState([])
  const [homeCategories, setHomeCategories] = useState([])
  const [groupTrips, setGroupTrips] = useState([])
  const [honeymoonTrips, setHoneymoonTrips] = useState([])
  const [weekendTrips, setWeekendTrips] = useState([])
  const [hillTrips, setHillTrips] = useState([])
  const [adventureTrips, setAdventureTrips] = useState([])
  const [soloTrips, setSoloTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeStoryIndex, setActiveStoryIndex] = useState(0)
  const [storyTransition, setStoryTransition] = useState(true)
  const [showWhyMore, setShowWhyMore] = useState(false)
  const [selectedMemoryVideo, setSelectedMemoryVideo] = useState(null)

  useEffect(() => {
    Promise.allSettled([
      getPackages('domestic').then((response) => ['domestic', response.data]),
      getPackages('international').then((response) => ['international', response.data]),
      getAdminHotSellingTrips().then((response) => ['hotSelling', response.data]),
      getDestinations().then((response) => ['destinations', response.data]),
      getCategories().then((response) => ['categories', response.data]),
      getPackagesByCategory('Group Tour').then((response) => ['group', response.data]),
      getPackagesByCategory('Honeymoon Tour').then((response) => ['honeymoon', response.data]),
      getPackagesByCategory('Weekend Tour').then((response) => ['weekend', response.data]),
      getPackagesByCategory('Hill Station Tour').then((response) => ['hill', response.data]),
      getPackagesByCategory('Adventure Tour').then((response) => ['adventure', response.data]),
      getPackagesByCategory('Solo Trip').then((response) => ['solo', response.data]),
    ])
      .then((responses) => {
        const nextData = {
          domestic: [],
          international: [],
          hotSelling: [],
          destinations: [],
          categories: [],
          group: [],
          honeymoon: [],
          weekend: [],
          hill: [],
          adventure: [],
          solo: [],
        }

        responses.forEach((response) => {
          if (response.status === 'fulfilled') {
            const [key, data] = response.value
            nextData[key] = data
          }
        })

        setHomeDomesticPackages(nextData.domestic)
        setHomeInternationalPackages(nextData.international)
        setHotSellingTrips(nextData.hotSelling)
        setHomeDestinations(nextData.destinations)
        setHomeCategories(nextData.categories)
        setGroupTrips(nextData.group)
        setHoneymoonTrips(nextData.honeymoon)
        setWeekendTrips(nextData.weekend)
        setHillTrips(nextData.hill)
        setAdventureTrips(nextData.adventure)
        setSoloTrips(nextData.solo)
      })
      .catch(() => {
        setHomeDomesticPackages([])
        setHomeInternationalPackages([])
        setHotSellingTrips([])
        setHomeDestinations([])
        setHomeCategories([])
        setGroupTrips([])
        setHoneymoonTrips([])
        setWeekendTrips([])
        setHillTrips([])
        setAdventureTrips([])
        setSoloTrips([])
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

  const domesticDestinations = homeDestinations
    .filter((destination) => (destination.type || 'domestic').toLowerCase() === 'domestic')
  const internationalDestinations = homeDestinations
    .filter((destination) => (destination.type || 'domestic').toLowerCase() === 'international')
  const communityImages = homeDestinations.slice(0, 4)
  const tripCardSkeletons = Array.from({ length: 5 }, (_, index) => index)
  const themeSkeletons = Array.from({ length: 6 }, (_, index) => index)
  const groupTripSkeletons = Array.from({ length: 3 }, (_, index) => index)
  const storySkeletons = Array.from({ length: 3 }, (_, index) => index)
  const communitySkeletons = Array.from({ length: 4 }, (_, index) => index)
  const statSkeletons = Array.from({ length: 6 }, (_, index) => index)
  const travelerStoryDestinations = useMemo(() => {
    const sourceDestinations = domesticDestinations.length ? domesticDestinations : homeDestinations.slice(0, 3)
    return sourceDestinations.slice(0, 3)
  }, [domesticDestinations, homeDestinations])
  const travelerStorySlides = useMemo(() => {
    const slides = travelerStories.map((story, index) => ({
      ...story,
      destination: travelerStoryDestinations[index % travelerStoryDestinations.length],
    }))
    return slides.concat(slides.slice(0, 3))
  }, [travelerStoryDestinations])
  const totalPackages = homeDomesticPackages.length + homeInternationalPackages.length
  const allPackages = [...homeDomesticPackages, ...homeInternationalPackages]
  const destinationSections = [
    {
      title: 'Domestic Destinations',
      route: '/destinations?type=domestic',
      banner: tripRowBanners.hill,
      items: domesticDestinations,
    },
    {
      title: 'International Destinations',
      route: '/destinations?type=international',
      banner: tripRowBanners.international,
      items: internationalDestinations,
    },
  ]
  const packageSections = [
    {
      title: 'Hot Selling Trips',
      route: '/domestic',
      banner: tripRowBanners.hot,
      bannerVideo: tripRowVideos.hot,
      itemType: 'hot',
      items: hotSellingTrips.length ? hotSellingTrips : allPackages,
    },
    {
      title: 'Domestic Trips',
      route: '/domestic',
      banner: tripRowBanners.domestic,
      items: homeDomesticPackages,
    },
    {
      title: 'International Trips',
      route: '/international',
      banner: tripRowBanners.international,
      items: homeInternationalPackages,
    },
    {
      title: 'Honeymoon Trips',
      route: '/category/honeymoon-tour',
      banner: tripRowBanners.honeymoon,
      items: honeymoonTrips.length ? honeymoonTrips : homeInternationalPackages,
    },
    {
      title: 'Weekend Trips',
      route: '/weekend-getaways',
      banner: tripRowBanners.weekend,
      items: weekendTrips.length ? weekendTrips : homeDomesticPackages,
    },
    {
      title: 'Himalayan Treks',
      route: '/category/adventure-tour',
      banner: tripRowBanners.adventure,
      items: adventureTrips.length ? adventureTrips : hillTrips.length ? hillTrips : groupTrips.length ? groupTrips : homeDomesticPackages,
    },
    {
      title: 'Backpacking Trips',
      route: '/category/solo-trip',
      banner: tripRowBanners.backpacking,
      items: soloTrips.length ? soloTrips : groupTrips.length ? groupTrips : allPackages,
    },
  ]
  const handleStoryTransitionEnd = () => {
    if (activeStoryIndex >= travelerStories.length) {
      setStoryTransition(false)
      setActiveStoryIndex(0)
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setStoryTransition(true))
      })
    }
  }
  const getDisplayItems = (items) => {
    if (items.length >= 6) return items
    return Array.from({ length: 10 }, (_, index) => items[index % items.length])
  }
  const formatCardDuration = (duration = '') => {
    const days = duration.match(/(\d+)\s*Days?/i)?.[1]
    const nights = duration.match(/(\d+)\s*Nights?/i)?.[1]
    if (!days || !nights) return duration
    return `${nights} Night ${days} Days`
  }
  const renderTripRow = ({ title, route, banner, bannerVideo, items }, itemType = 'package') => {
    const displayItems = items.length ? getDisplayItems(items) : []
    const syncFiveSecondVideo = (event) => {
      if (event.currentTarget.currentTime >= 5) {
        event.currentTarget.currentTime = 0
        event.currentTarget.play()
      }
    }

    return (
      <section className="home-trip-row" key={title} data-aos="fade-up">
        <div className="home-trip-banner">
          {bannerVideo ? (
            <video
              src={bannerVideo}
              poster={banner}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
              onTimeUpdate={syncFiveSecondVideo}
            />
          ) : (
            <img src={banner} alt="" />
          )}
          <div className="home-trip-banner-copy">
            <h3>{title}</h3>
            <p>A Journey Through Time, Colour And Culture</p>
            <Link className="home-trip-explore" to={route}>Explore</Link>
          </div>
        </div>
        {loading ? (
          <div className="home-trip-card-rail">
            {tripCardSkeletons.map((slot) => (
              <article className="home-trip-mini-card card-skeleton" key={`${title}-skeleton-${slot}`} aria-busy="true">
                <span className="card-skeleton-media" />
                <span className="card-skeleton-line card-skeleton-line-lg" />
                <span className="card-skeleton-line card-skeleton-line-sm" />
              </article>
            ))}
          </div>
        ) : displayItems.length ? (
          <Swiper
            className="home-trip-card-rail home-trip-swiper"
            modules={[Autoplay]}
            slidesPerView={5}
            slidesPerGroup={1}
            spaceBetween={20}
            loop={displayItems.length > 5}
            speed={850}
            autoplay={{ delay: 1900, disableOnInteraction: false, pauseOnMouseEnter: true }}
            grabCursor
            breakpoints={{
              0: { slidesPerView: 1.2, spaceBetween: 14 },
              576: { slidesPerView: 2, spaceBetween: 16 },
              768: { slidesPerView: 3, spaceBetween: 18 },
              992: { slidesPerView: 5, spaceBetween: 20 },
            }}
          >
            {displayItems.map((item, index) => {
              const name = itemType === 'destination' || itemType === 'hot' ? item.name || item.packageDestination || item.location?.split(',')[0] || item.title : item.packageDestination || item.location?.split(',')[0] || item.title
              const link = itemType === 'destination' || itemType === 'hot' ? `/destinations?search=${encodeURIComponent(name)}` : `/package/${item.id}`
              const packageTitle = item.title || item.name || item.packageDestination || name
              const cardDuration = formatCardDuration(item.duration)
              const packageLabel = cardDuration ? `${packageTitle} ${cardDuration}` : packageTitle
              const priceText = itemType === 'destination' || itemType === 'hot'
                ? item.price || item.price === 0
                  ? `Starting Price @ Rs ${Number(item.price).toLocaleString('en-IN')}`
                  : 'Cost As Per Requirement'
                : packageLabel

              return (
                <SwiperSlide className="home-trip-slide" key={`${item._id || item.id || item.name}-${index}`}>
                  <Link className="home-trip-mini-card" to={link}>
                    <img src={item.image} alt={name} />
                    <strong>{name}</strong>
                    <small>{priceText}</small>
                  </Link>
                </SwiperSlide>
              )
            })}
          </Swiper>
        ) : (
          <div className="home-trip-card-rail">
            <div className="empty-state-card home-trip-empty">
              <h3>No trips added yet</h3>
              <p>Add matching items from admin to show this section.</p>
            </div>
          </div>
        )}
        <Link className="home-trip-view-all" to={route}>View All <FaArrowRight /></Link>
      </section>
    )
  }
  const memoryCarouselItems = [...memoryMediaItems, ...memoryMediaItems]
  const hotSellingSection = packageSections.find((section) => section.itemType === 'hot')
  const otherPackageSections = packageSections.filter((section) => section.itemType !== 'hot')

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

      <section className="section home-trip-showcase">
        <Container>
          <div className="home-trip-stack">
            {hotSellingSection && renderTripRow(hotSellingSection, hotSellingSection.itemType || 'package')}
            {destinationSections.map((section) => renderTripRow(section, 'destination'))}
            {otherPackageSections.map((section) => renderTripRow(section, section.itemType || 'package'))}
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

      <section className="section memories-section">
        <Container>
          <SectionHeading eyebrow="Videos" title="Memories For Life" />
          <Swiper
            className="memories-carousel"
            modules={[Autoplay, Navigation, Pagination]}
            loop
            loopAdditionalSlides={memoryCarouselItems.length}
            watchSlidesProgress
            slidesPerView={3}
            slidesPerGroup={1}
            spaceBetween={24}
            speed={850}
            autoplay={{ delay: 1900, disableOnInteraction: false, pauseOnMouseEnter: false }}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 18 },
              768: { slidesPerView: 2, spaceBetween: 22 },
              992: { slidesPerView: 3, spaceBetween: 24 },
            }}
          >
            {memoryCarouselItems.map((item, index) => (
              <SwiperSlide className="memory-slide" key={`${item.title}-${index}`}>
                <button className="memory-card" type="button" onClick={() => setSelectedMemoryVideo(item)} aria-label={`Play ${item.title}`}>
                  <img src={item.poster || item.image} alt={item.title} />
                  <span className="memory-play" aria-hidden="true">
                    <FaPlay />
                  </span>
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </section>

      <Modal
        show={!!selectedMemoryVideo}
        onHide={() => setSelectedMemoryVideo(null)}
        centered
        size="lg"
        contentClassName="memory-video-modal"
      >
        <button className="memory-modal-close" type="button" onClick={() => setSelectedMemoryVideo(null)} aria-label="Close video">
          <FaXmark />
        </button>
        {selectedMemoryVideo && (
          <video controls autoPlay playsInline poster={selectedMemoryVideo.poster} aria-label={selectedMemoryVideo.title}>
            <source src={selectedMemoryVideo.video} type="video/mp4" />
          </video>
        )}
      </Modal>

      <section className="section soft-bg">
        <Container>
          <SectionHeading eyebrow="Upcoming Group Trips" title="Fixed Departures With Fellow Travelers" text="Join curated group adventures with shared energy, managed stays, transport, and on-trip coordination." />
          <Row className="g-4">
            {loading ? groupTripSkeletons.map((slot) => (
              <Col md={4} key={`group-trip-skeleton-${slot}`}>
                <article className="group-trip-card group-trip-card-skeleton card-skeleton" aria-busy="true">
                  <div className="card-skeleton-media group-trip-skeleton-media" />
                  <div>
                    <span className="card-skeleton-line card-skeleton-line-xs" />
                    <h3><span className="card-skeleton-line card-skeleton-line-lg" /></h3>
                    <span className="card-skeleton-link" />
                  </div>
                </article>
              </Col>
            )) : groupTrips.length ? groupTrips.slice(0, 3).map((trip) => (
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
            )) : (
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

      <section className="section home-blogs-section">
        <Container>
          <SectionHeading eyebrow="Blogs" title="Our Blogs" />
          <div className="home-blogs-layout">
            <div className="home-blog-list">
              {homeBlogPosts.slice(0, 3).map((post) => (
                <article className="home-blog-list-card" key={post.title} data-aos="fade-up">
                  <img src={post.image} alt={post.title} />
                  <div>
                    <div className="home-blog-meta">
                      <span>Published on {post.date}</span>
                      <span>{post.read}</span>
                    </div>
                    <h3>{post.title}</h3>
                  </div>
                </article>
              ))}
            </div>
            <article className="home-blog-feature-card" data-aos="fade-up">
              <img src={homeBlogPosts[3].image} alt={homeBlogPosts[3].title} />
              <div className="home-blog-meta">
                <span>Published on {homeBlogPosts[3].date}</span>
                <span>{homeBlogPosts[3].read}</span>
              </div>
              <h3>{homeBlogPosts[3].title}</h3>
              <p>{homeBlogPosts[3].excerpt}</p>
            </article>
          </div>
          <div className="home-section-action">
            <Button as={Link} to="/blogs" className="btn-gradient">View All <FaArrowRight /></Button>
          </div>
        </Container>
      </section>

      <section className="section home-faq-section">
        <Container>
          <SectionHeading eyebrow="FAQ" title="Have Any Doubts" />
          <Accordion className="home-faq-accordion" flush>
            {homeFaqItems.map((item, index) => (
              <Accordion.Item eventKey={`${index}`} key={item.question}>
                <Accordion.Header>{item.question}</Accordion.Header>
                <Accordion.Body>{item.answer}</Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
          <div className="home-section-action">
            <Button as={Link} to="/contact" variant="link" className="home-faq-more">View More</Button>
          </div>
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
              {loading ? (
                <div className="why-premium-stats">
                  {statSkeletons.map((slot) => (
                    <div className="why-premium-stat stat-skeleton card-skeleton" key={`stat-skeleton-${slot}`} aria-busy="true">
                      <span className="stat-skeleton-icon" />
                      <strong className="card-skeleton-line card-skeleton-line-md" />
                      <small className="card-skeleton-line card-skeleton-line-sm" />
                    </div>
                  ))}
                </div>
              ) : (
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
              )}
            </div>
          </div>
        </Container>
      </section>

      <section className="section" id="stories">
        <Container>
          <SectionHeading eyebrow="Traveler Stories" title="Reviews And Travel Experiences" />
          {loading ? (
            <div className="story-review-carousel">
              <div className="story-review-window">
                <div className="story-review-track">
                  {storySkeletons.map((slot) => (
                    <article className="story-review-card story-review-card-skeleton card-skeleton" data-aos="fade-up" key={`story-skeleton-${slot}`} aria-busy="true">
                      <div className="story-review-head">
                        <span className="story-review-avatar card-skeleton-media" />
                        <div className="story-review-meta">
                          <strong className="card-skeleton-line card-skeleton-line-lg" />
                          <span className="card-skeleton-line card-skeleton-line-sm" />
                        </div>
                        <span className="story-review-open card-skeleton-link" />
                      </div>
                      <p className="story-review-text">
                        <span className="card-skeleton-line card-skeleton-line-lg" />
                        <span className="card-skeleton-line card-skeleton-line-md" />
                        <span className="card-skeleton-line card-skeleton-line-sm" />
                      </p>
                      <div className="story-review-destination story-review-destination-skeleton">
                        <span className="card-skeleton-media" />
                        <div>
                          <strong className="card-skeleton-line card-skeleton-line-md" />
                          <span className="card-skeleton-line card-skeleton-line-xs" />
                        </div>
                        <span className="card-skeleton-link" />
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          ) : travelerStorySlides.length ? (
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
            <SectionHeading text="Trusted travel operations, tourism associations, and community milestones that keep every TNT journey accountable.Trusted travel operations, tourism associations, and community milestones that keep every TNT journey accountable.Trusted travel operations, tourism associations, and community milestones that keep every TNT journey accountable. " />
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
                {loading ? communitySkeletons.map((slot) => (
                  <div className="community-photo-skeleton card-skeleton" key={`community-skeleton-${slot}`} aria-busy="true">
                    <span className="card-skeleton-media" />
                  </div>
                )) : communityImages.map((item) => (
                  <img key={item._id || item.name} src={item.image} alt={item.name} />
                ))}
                {!loading && !communityImages.length && (
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
