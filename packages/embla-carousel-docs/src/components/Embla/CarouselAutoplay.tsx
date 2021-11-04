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
  const autoplayRef = useRef(Autoplay({ stopOnInteraction: true }))
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [autoplayRef.current])
  const [userTouched, setUserTouched] = useState(false)
  const ariaLive = !userTouched && inView ? 'off' : 'polite'

  useEffect(() => {
    if (!inView) {
      autoplayRef.current.stop()
    } else if (!userTouched) {
      autoplayRef.current.play()
    }
  }, [inView])

  const onUserTouch = useCallback(() => {
    autoplayRef.current.stop()
    setUserTouched(true)
  }, [setUserTouched])

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
