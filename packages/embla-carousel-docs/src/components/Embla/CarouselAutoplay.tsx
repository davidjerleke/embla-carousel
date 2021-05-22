import React, { useCallback, useEffect, useState } from 'react'
import { useEmblaCarousel } from 'embla-carousel/react'
import { EmblaOptionsType } from 'embla-carousel'
import { useInView } from 'react-intersection-observer'
import { imageByIndex } from './images'
import { useInterval } from 'hooks'
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
  inView?: boolean
}

const Carousel = (props: PropType) => {
  const { id, options, slideSizes, inView = false } = props
  const carouselId = `${id}-carousel-items`
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [userTouched, setUserTouched] = useState(false)
  const ariaLive = !userTouched && inView ? 'off' : 'polite'
  const autoplay = useCallback(() => {
    if (emblaApi?.canScrollNext()) {
      emblaApi?.scrollNext()
    } else {
      emblaApi?.scrollTo(0)
    }
  }, [emblaApi])
  const { play, stop } = useInterval(autoplay, 4000)

  useEffect(() => {
    if (!inView) {
      stop()
    } else if (!userTouched) {
      play()
    }
  }, [inView, stop])

  const onUserTouch = useCallback(() => {
    stop()
    setUserTouched(true)
  }, [stop, setUserTouched])

  useEffect(() => {
    emblaApi?.on('pointerDown', onUserTouch)
  }, [emblaApi, onUserTouch])

  return (
    <Viewport ref={emblaRef}>
      <Container id={carouselId} aria-live={ariaLive}>
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
                <SlideImg src={src} alt={alt} />
              </SlideInner>
            </Slide>
          )
        })}
      </Container>
    </Viewport>
  )
}

export const CarouselAutoplay = (props: PropType) => {
  const [inViewRef, inView] = useInView()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (!mounted && inView) setMounted(true)
  }, [mounted, inView])

  return (
    <Wrapper ref={inViewRef}>
      {mounted ? (
        <Carousel aria-roledescription="carousel" inView={inView} {...props} />
      ) : null}
    </Wrapper>
  )
}
