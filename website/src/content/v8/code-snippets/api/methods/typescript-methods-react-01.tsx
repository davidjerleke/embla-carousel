import React, { useEffect } from 'react'
import { EmblaCarouselType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'

export function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  const logSelectedSnap = (emblaApi: EmblaCarouselType) => {
    console.log(emblaApi.selectedSnap())
  }

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', logSelectedSnap)
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
    </div>
  )
}
