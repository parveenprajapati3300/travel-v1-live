// import { Carousel, Container } from 'react-bootstrap'
// import SearchTour from './SearchTour'

// const heroSlides = [
//   {
//     image: new URL('../assets/travel/banner/banner-01.jpg', import.meta.url).href,
//     title: 'Travel banner 1',
//   },
//   {
//     image: new URL('../assets/travel/banner/banner-03.jpg', import.meta.url).href,
//     title: 'Travel banner 3',
//   },
//   // {
//   {
//     image: new URL('../assets/travel/banner/banner-06.jpg', import.meta.url).href,
//     title: 'Travel banner 6',
//   },
//   {
//     image: new URL('../assets/travel/banner/banner-07.jpg', import.meta.url).href,
//     title: 'Travel banner 7',
//   },
// ]

// function HeroCarousel() {
//   return (
//     <section className="hero-section">
//       <Carousel className="hero-carousel" fade indicators interval={5600}>
//         {heroSlides.map((slide) => (
//           <Carousel.Item key={slide.title}>
//             <div className="hero-slide hero-slide-wravel">
//               <img className="hero-slide-image" src={slide.image} alt={slide.title} />
//               <Container>
//                 <div className="hero-wravel-content hero-carousel-content" data-aos="zoom-in">
//                   <div className="hero-search-center">
//                     <h1 className="hero-search-heading" aria-label="TNT Tour and Travels">
//                       TNT Tour and Travels
//                     </h1>
//                     <SearchTour />
//                   </div>
//                 </div>
//               </Container>
//             </div>
//           </Carousel.Item>
//         ))}
//       </Carousel>
//     </section>
//   )
// }

// export default HeroCarousel


import { Carousel, Container } from 'react-bootstrap'
import { FaLocationDot, FaRoute } from 'react-icons/fa6'
import SearchTour from './SearchTour'

const heroSlides = [
  {
    image: new URL('../assets/travel/banner/banner-01.jpg', import.meta.url).href,
    tripWords: ['Bhutan', 'Ladakh', 'Spiti', 'Zanskar', 'Kashmir', 'Tawang', 'Bali'],
    title: 'Book Your Trip to the Mountains',
    copy: 'Curated journeys for families, groups, honeymoons, and weekend escapes with smooth planning from start to finish.',
    highlights: ['Family Tours', 'Group Departures', 'Honeymoon Trips', 'Weekend Escapes', 'International Holidays'],
  },

  {
    image: new URL('../assets/travel/banner/banner-03.jpg', import.meta.url).href,
    tripWords: ['Paris', 'Swiss', 'Japan', 'Bali', 'Dubai', 'Singapore', 'Thailand'],
    title: 'International Trips with a Premium Feel',
    copy: 'From visa guidance to final drop-off, we keep your itinerary practical, transparent, and easy to enjoy.',
    highlights: ['Visa Guidance', 'Airport Transfers', 'City Tours', 'Couple Trips', 'Custom Holidays'],
  },

  {
    image: new URL('../assets/travel/banner/banner-06.jpg', import.meta.url).href,
    tripWords: ['Dubai', 'Singapore', 'Phuket', 'Vietnam', 'Sri Lanka', 'Maldives', 'Paris'],
    title: 'Premium City and Island Journeys',
    copy: 'Handpicked hotels, smart transfers, and smooth support for travelers who want comfort first.',
    highlights: ['Premium Stays', 'Island Trips', 'City Tours', 'Transfers', 'Custom Itineraries'],
  },
  {
    image: new URL('../assets/travel/banner/banner-07.jpg', import.meta.url).href,
    tripWords: ['Coastal', 'Mountain', 'Luxury', 'Adventure', 'Romance', 'Culture', 'Nature'],
    title: 'Adventure, Culture, and Coastlines',
    copy: 'A wide mix of travel styles, all made easy with local knowledge and careful trip handling.',
    highlights: ['Adventure', 'Cultural Tours', 'Coastal Breaks', 'Well Planned', 'Travel Support'],
  },
]

function HeroCarousel() {
  return (
    <section className="hero-section">
      <Carousel className="hero-carousel" fade indicators interval={5600}>
        {heroSlides.map((slide) => (
          <Carousel.Item key={slide.title}>
            <div className="hero-slide hero-slide-wravel">
              <img className="hero-slide-image" src={slide.image} alt={slide.title} />
              <Container>
                <div className="hero-wravel-content hero-carousel-content" data-aos="zoom-in">
                  <div className="hero-wravel-copy">
                    <h1 className="hero-wravel-title" aria-label={slide.title}>
                      <span>{slide.title}</span>
                    </h1>
                    <div className="hero-trip-word-rail" aria-label="Popular destinations">
                      <span>
                        {[...slide.tripWords, ...slide.tripWords].map((word, index) => (
                          <b key={`${word}-${index}`}>{word}</b>
                        ))}
                      </span>
                    </div>
                    <div className="hero-wravel-taglines">
                      <strong>TNT Tour and Travels</strong>
                      {/* <span>{slide.copy}</span> */}
                      {/* <small>#travelwithtnt</small> */}
                    </div>
                    <div className="hero-theme-chips" aria-label="Popular tour themes">
                      {slide.highlights.map((item) => (
                        <span key={item}><FaLocationDot /> {item}</span>
                      ))}
                    </div>
                    <div className="hero-inline-search mb-5">
                    {/* <div className="my-4"> */}
                      <SearchTour />
                    </div>
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
