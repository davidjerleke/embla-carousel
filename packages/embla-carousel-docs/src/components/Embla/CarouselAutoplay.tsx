import React, { useCallback, useEffect, useRef, useState } from 'react'
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
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
  inView?: boolean
}

const Carousel = (props: PropType) => {
  const { id, options, slideSizes, inView = false } = props
  const carouselId = `${id}-carousel-items`
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ stopOnInteraction: true }),
  ])
  const [userTouched, setUserTouched] = useState(false)
  const ariaLive = !userTouched && inView ? 'off' : 'polite'

  useEffect(() => {
    if (!emblaApi) return

    if (!inView) {
      emblaApi.plugins().autoplay?.stop()
    } else if (!userTouched) {
      emblaApi.plugins().autoplay?.play()
    }
  }, [emblaApi, inView])

  const onUserTouch = useCallback(() => {
    if (!emblaApi) return

    emblaApi.plugins().autoplay?.stop()
    setUserTouched(true)
  }, [emblaApi, setUserTouched])

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
