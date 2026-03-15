import React, { useId } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

export function EmblaCarousel(props) {
  const carouselId = useId()
  const [emblaRef, emblaApi, emblaServerApi] = useEmblaCarousel({
    loop: true,
    ssr: props.slides.map(() => 50), // Each slide is 50% of the viewport width
    breakpoints: {
      '(min-width: 768px)': {
        ssr: props.slides.map(() => 70) // Each slide is 70% of the viewport width
      }
    }
  })
  const renderSsrStyles = !emblaApi

  return (
    <>
      {renderSsrStyles && (
        <style>
          {emblaServerApi.ssrStyles(`#${carouselId}`, '.embla__slide')}
        </style>
      )}

      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container" id={carouselId}>
            {props.slides.map((slide) => (
              <div className="embla__slide" key={slide.id}>
                {slide}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
