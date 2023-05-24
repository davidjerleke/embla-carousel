import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel, {
  EmblaCarouselType,
  EmblaOptionsType,
} from 'embla-carousel-react'
import { LazyLoadImage } from './EmblaCarouselLazyLoadImage'
import imageByIndex from '../imageByIndex'

type PropType = {
  slides: number[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRed, emblaApi] = useEmblaCarousel(options)
  const [slidesInView, setSlidesInView] = useState<number[]>([])

  const updateSlidesInView = useCallback((emblaApi: EmblaCarouselType) => {
    setSlidesInView((slidesInView) => {
      if (slidesInView.length === emblaApi.slideNodes().length) {
        emblaApi.off('select', updateSlidesInView)
      }
      const inView = emblaApi
        .slidesInView(true)
        .filter((index) => !slidesInView.includes(index))
      return slidesInView.concat(inView)
    })
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    updateSlidesInView(emblaApi)
    emblaApi.on('select', updateSlidesInView)
    emblaApi.on('reInit', updateSlidesInView)
  }, [emblaApi, updateSlidesInView])

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
