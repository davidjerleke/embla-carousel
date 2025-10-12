import React, { useState, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

export function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })
  const [prevButtonDisabled, setPrevButtonDisabled] = useState(true)
  const [nextButtonDisabled, setNextButtonDisabled] = useState(true)

  const scrollToPrev = () => emblaApi?.scrollToPrev()
  const scrollToNext = () => emblaApi?.scrollToNext()

  const toggleButtonsDisabled = (emblaApi) => {
    setPrevButtonDisabled(!emblaApi.canScrollToPrev())
    setNextButtonDisabled(!emblaApi.canScrollToNext())
  }

  useEffect(() => {
    if (!emblaApi) return

    toggleButtonsDisabled(emblaApi)
    emblaApi.on('reinit', toggleButtonsDisabled)
    emblaApi.on('select', toggleButtonsDisabled)
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

      <button
        className="embla__prev"
        onClick={scrollToPrev}
        disabled={prevButtonDisabled}
      >
        Scroll to prev
      </button>
      <button
        className="embla__next"
        onClick={scrollToNext}
        disabled={nextButtonDisabled}
      >
        Scroll to next
      </button>
    </div>
  )
}
