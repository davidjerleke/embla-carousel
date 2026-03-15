import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'

useEmblaCarousel.globalOptions = { loop: true }

export function EmblaCarousel() {
  const [emblaRef] = useEmblaCarousel({ align: 'start' })

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          <div className="embla__slide">Slide 1</div>
          <div className="embla__slide">Slide 2</div>
          <div className="embla__slide">Slide 3</div>
        </div>
      </div>
    </div>
  )
}
