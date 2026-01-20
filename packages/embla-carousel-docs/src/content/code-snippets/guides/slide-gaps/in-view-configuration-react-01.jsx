import React, { useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

export function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    inViewMargin: '0px -20px 0px 0px'
  })

  const logSlidesInView = (emblaApi, event) => {
    console.log('Slides entered view: ' + event.detail.slidesEnterView)
  }

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('slidesinview', logSlidesInView)
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
