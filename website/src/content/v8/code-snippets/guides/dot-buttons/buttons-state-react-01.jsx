import React, { useState, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

export function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })
  const [scrollSnaps, setScrollSnaps] = useState([])
  const [selectedSnap, setSelectedSnap] = useState(0)

  const scrollTo = (index) => emblaApi?.scrollTo(index)
  const setupSnaps = (emblaApi) => setScrollSnaps(emblaApi.scrollSnapList())
  const setActiveSnap = (emblaApi) =>
    setSelectedSnap(emblaApi.selectedScrollSnap())

  useEffect(() => {
    if (!emblaApi) return

    setupSnaps(emblaApi)
    setActiveSnap(emblaApi)

    emblaApi.on('reInit', setupSnaps)
    emblaApi.on('reInit', setActiveSnap)
    emblaApi.on('select', setActiveSnap)
  }, [emblaApi])

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          <div className="embla__slide">Slide 1</div>
          <div className="embla__slide">Slide 2</div>
          <div className="embla__slide">Slide 3</div>
        </div>
      </div>

      <div className="embla__dots">
        {scrollSnaps.map((_, index) => (
          <button
            className={'embla__dot'.concat(
              index === selectedSnap ? ' embla__dot--selected' : ''
            )}
            key={index}
            onClick={() => scrollTo(index)}
          >
            {/* Button content */}
          </button>
        ))}
      </div>
    </div>
  )
}
