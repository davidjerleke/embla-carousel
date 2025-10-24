import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'

export function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })

  const scrollToPrev = () => emblaApi?.scrollToPrev()
  const scrollToNext = () => emblaApi?.scrollToNext()

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          <div className="embla__slide">Slide 1</div>
          <div className="embla__slide">Slide 2</div>
          <div className="embla__slide">Slide 3</div>
        </div>
      </div>

      <button className="embla__prev" onClick={scrollToPrev}>
        Scroll to prev
      </button>
      <button className="embla__next" onClick={scrollToNext}>
        Scroll to next
      </button>
    </div>
  )
}
