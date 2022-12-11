import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { LazyLoadImage } from './EmblaCarouselLazyLoadImage'
import imageByIndex from '../imageByIndex'

const EmblaCarousel = (props) => {
  const { slides, options } = props
  const [emblaRed, emblaApi] = useEmblaCarousel(options)
  const [slidesInView, setSlidesInView] = useState([])

  const findSlidesInView = useCallback(() => {
    if (!emblaApi) return

    setSlidesInView((slidesInView) => {
      if (slidesInView.length === emblaApi.slideNodes().length) {
        emblaApi.off('select', findSlidesInView)
      }
      const inView = emblaApi
        .slidesInView(true)
        .filter((index) => slidesInView.indexOf(index) === -1)
      return slidesInView.concat(inView)
    })
  }, [emblaApi, setSlidesInView])

  useEffect(() => {
    if (!emblaApi) return
    findSlidesInView()
    emblaApi.on('select', findSlidesInView)
    emblaApi.on('reInit', findSlidesInView)
  }, [emblaApi, findSlidesInView])

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRed}>
        <div className="embla__container">
          {slides.map((index) => (
            <LazyLoadImage
              key={index}
              index={index}
              imgSrc={imageByIndex(index)}
              inView={slidesInView.indexOf(index) > -1}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel
