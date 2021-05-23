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
  SlideNumber,
} from './carouselBasicStyles'
import {
  ParallaxSlideInner,
  ParallaxSlideLayer,
  ParallaxSlideImg,
} from './carouselParallaxStyles'

type PropType = {
  id: string
  slideSizes: number[]
  options?: EmblaOptionsType
}

const Carousel = (props: PropType) => {
  const { id, options, slideSizes } = props
  const carouselId = `${id}-carousel-items`
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [slideStyles, setSlideStyles] = useState<(number | null)[]>([])

  const updateSlideStyles = useCallback(() => {
    if (!emblaApi) return
    const styles = emblaApi.scrollSnapList().map((scrollSnap, index) => {
      if (emblaApi.slidesInView().indexOf(index) === -1) return null
      const diffToTarget = scrollSnap - emblaApi.scrollProgress()
      return diffToTarget * (-1 / 1.2) * 100
    })
    setSlideStyles(styles)
  }, [emblaApi, setSlideStyles])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('scroll', updateSlideStyles)
    updateSlideStyles()
  }, [emblaApi, updateSlideStyles])

  return (
    <>
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
                <ParallaxSlideInner>
                  <ParallaxSlideLayer
                    style={{ transform: `translateX(${slideStyles[index]}%)` }}
                  >
                    <ParallaxSlideImg src={src} alt={alt} />
                  </ParallaxSlideLayer>
                </ParallaxSlideInner>
              </Slide>
            )
          })}
        </Container>
      </Viewport>
    </>
  )
}

export const CarouselParallax = (props: PropType) => {
  const [inViewRef, inView] = useInView({ triggerOnce: true })

  return (
    <Wrapper ref={inViewRef}>
      {inView ? <Carousel aria-roledescription="carousel" {...props} /> : null}
    </Wrapper>
  )
}
