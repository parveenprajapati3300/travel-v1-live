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
import SearchTour from './SearchTour'
import tripsnThrillsLogo from '../assets/tripsnthrills-logo.png'

const heroSlides = [
  {
    image: new URL('../assets/travel/banner/banner-01.jpg', import.meta.url).href,
    title: 'Explore the World with TripsNThrills',
  },
  {
    image: new URL('../assets/travel/banner/banner-03.jpg', import.meta.url).href,
    title: 'Explore the World with TripsNThrills',
  },
  {
    image: new URL('../assets/travel/banner/banner-06.jpg', import.meta.url).href,
    title: 'Explore the World with TripsNThrills',
  },
  {
    image: new URL('../assets/travel/banner/banner-07.jpg', import.meta.url).href,
    title: 'Explore the World with TripsNThrills',
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
                    <p className="hero-banner-subtitle">
                      Affordable Group Tours | Weekend Trips | Customized Holidays
                    </p>
                    <div className="hero-inline-search hero-banner-search mb-5">
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
