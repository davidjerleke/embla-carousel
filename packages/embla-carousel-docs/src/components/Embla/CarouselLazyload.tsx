import React, { useCallback, useEffect, useState } from 'react'
import { useEmblaCarousel } from 'embla-carousel/react'
import { EmblaOptionsType } from 'embla-carousel'
import { useInView } from 'react-intersection-observer'
import { imageByIndex } from './images'
import {
  Wrapper,
  Container,
  Viewport,
  Slide,
  SlideInner,
  SlideImg,
  SlideNumber,
} from './carouselBasicStyles'

type PropType = {
  id: string
  slideSizes: number[]
  options?: EmblaOptionsType
}

const Carousel = (props: PropType) => {
  const { id, options, slideSizes } = props
  const carouselId = `${id}-carousel-items`
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [slidesInView, setSlidesInView] = useState<boolean[]>([])

  const registerSlidesInView = useCallback(() => {
    if (!emblaApi) return
    setSlidesInView((list) => {
      if (list.every((isInView) => isInView)) {
        emblaApi.off('select', registerSlidesInView)
        return list
      }
      const inView = emblaApi.slidesInView(true)
      return list.map(
        (isInView, index) => isInView || inView.indexOf(index) > -1,
      )
    })
  }, [emblaApi, setSlidesInView])

  useEffect(() => {
    if (!emblaApi) return
    setSlidesInView(emblaApi.slideNodes().map(() => false))
    emblaApi.on('select', registerSlidesInView)
    registerSlidesInView()
  }, [emblaApi, registerSlidesInView, setSlidesInView])

  return (
    <Viewport ref={emblaRef}>
      <Container id={carouselId} aria-live="polite">
        {slideSizes.map((size, index) => {
          const { src, alt } = imageByIndex(index)
          return (
            <Slide
              key={`${src}-${index}`}
              $size={size}
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slideSizes.length}`}
              role="group"
            >
              <SlideNumber>
                <span>{index + 1}</span>
              </SlideNumber>
              <SlideInner>
                {slidesInView[index] && <SlideImg src={src} alt={alt} />}
              </SlideInner>
            </Slide>
          )
        })}
      </Container>
    </Viewport>
  )
}

export const CarouselLazyload = (props: PropType) => {
  const [inViewRef, inView] = useInView({ triggerOnce: true })

  return (
    <Wrapper ref={inViewRef}>
      {inView ? <Carousel aria-roledescription="carousel" {...props} /> : null}
    </Wrapper>
  )
}
