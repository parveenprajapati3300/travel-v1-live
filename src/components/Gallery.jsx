import { useCallback, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { FaChevronLeft, FaChevronRight, FaXmark } from 'react-icons/fa6'

const images = [
  new URL('../assets/travel/gallery/gallery-1469474968028-w900-80.jpg', import.meta.url).href,
  new URL('../assets/travel/gallery/gallery-1500534314209-w900-80.jpg', import.meta.url).href,
  new URL('../assets/travel/gallery/gallery-1507525428034-w900-80.jpg', import.meta.url).href,
  new URL('../assets/travel/gallery/gallery-1518684079-w900-80.jpg', import.meta.url).href,
  new URL('../assets/travel/gallery/gallery-1516483638261-w900-80.jpg', import.meta.url).href,
  new URL('../assets/travel/gallery/gallery-1528127269322-w900-80.jpg', import.meta.url).href,
]

function Gallery({ customImages = images }) {
  const galleryImages = useMemo(
    () => customImages.filter(Boolean).filter((image, index, list) => list.indexOf(image) === index),
    [customImages],
  )
  const [activeIndex, setActiveIndex] = useState(null)
  const visibleImages = galleryImages.slice(0, 5)
  const extraPhotos = Math.max(galleryImages.length - 5, 0)
  const hasLightbox = activeIndex !== null

  const openLightbox = (index) => {
    setActiveIndex(index)
  }

  const closeLightbox = () => {
    setActiveIndex(null)
  }

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => (current === 0 ? galleryImages.length - 1 : current - 1))
  }, [galleryImages.length])

  const showNext = useCallback(() => {
    setActiveIndex((current) => (current === galleryImages.length - 1 ? 0 : current + 1))
  }, [galleryImages.length])

  useEffect(() => {
    if (!hasLightbox) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeLightbox()
      if (event.key === 'ArrowLeft') showPrevious()
      if (event.key === 'ArrowRight') showNext()
    }

    document.body.classList.add('gallery-lightbox-open')
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.classList.remove('gallery-lightbox-open')
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [hasLightbox, showNext, showPrevious])

  if (!galleryImages.length) {
    return <div className="gallery-empty-state">Gallery images will appear here once uploaded from admin.</div>
  }

  return (
    <>
      <div className={`gallery-collage gallery-count-${visibleImages.length}`}>
        {visibleImages.map((image, index) => (
          <button
            type="button"
            className="gallery-collage-tile"
            key={image}
            onClick={() => openLightbox(index)}
            data-aos="fade-up"
            aria-label={`Open travel gallery image ${index + 1}`}
          >
            <img src={image} alt={`Travel gallery ${index + 1}`} />
            {index === 4 && extraPhotos > 0 && <span>+{extraPhotos} Photos</span>}
          </button>
        ))}
      </div>

      {hasLightbox && createPortal((
        <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label="Package gallery preview">
          <button type="button" className="gallery-lightbox-close" onClick={closeLightbox} aria-label="Close gallery">
            <FaXmark />
          </button>
          {galleryImages.length > 1 && (
            <button type="button" className="gallery-lightbox-arrow previous" onClick={showPrevious} aria-label="Previous image">
              <FaChevronLeft />
            </button>
          )}
          <img src={galleryImages[activeIndex]} alt={`Travel gallery fullscreen ${activeIndex + 1}`} />
          {galleryImages.length > 1 && (
            <button type="button" className="gallery-lightbox-arrow next" onClick={showNext} aria-label="Next image">
              <FaChevronRight />
            </button>
          )}
          <div className="gallery-lightbox-count">{activeIndex + 1} / {galleryImages.length}</div>
        </div>
      ), document.body)}
    </>
  )
}

export default Gallery
