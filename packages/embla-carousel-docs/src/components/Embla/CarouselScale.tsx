import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react'
import { useInView } from 'react-intersection-observer'
import { flushSync } from 'react-dom'
import { imageByIndex } from './images'
import { numberWithinRange } from 'utils'
import { SlideNumber } from './carouselScaleStyles'
import {
  Wrapper,
  Container,
  Viewport,
  Slide,
  SlideInner,
  SlideImg,
} from './carouselBasicStyles'

type PropType = {
  id: string
  slideSizes: number[]
  options?: EmblaOptionsType
}

const SCALE_FACTOR = 3

const Carousel = (props: PropType) => {
  const { id, options, slideSizes } = props
  const carouselId = `${id}-carousel-items`
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [slideStyles, setSlideStyles] = useState<(number | null)[]>([])

  const updateSlideStyles = useCallback(() => {
    if (!emblaApi) return

    const engine = emblaApi.internalEngine()
    const scrollProgress = emblaApi.scrollProgress()

    const styles = emblaApi.scrollSnapList().map((scrollSnap, index) => {
      if (!emblaApi.slidesInView().includes(index)) return 0
      let diffToTarget = scrollSnap - scrollProgress

      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((loopItem) => {
          const target = loopItem.target().get()
          if (index === loopItem.index && target !== 0) {
            const sign = Math.sign(target)
            if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress)
            if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress)
          }
        })
      }
      const scale = 1 - Math.abs(diffToTarget * SCALE_FACTOR)
      return numberWithinRange(scale, 0, 1)
    })
    setSlideStyles(styles)
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('resize', updateSlideStyles)
    emblaApi.on('scroll', () => {
      flushSync(() => updateSlideStyles())
    })
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
                <SlideInner
                  style={{ transform: `scale(${slideStyles[index]})` }}
                >
                  <SlideNumber>
                    <span>{index + 1}</span>
                  </SlideNumber>
                  <SlideImg src={src} alt={alt} />
                </SlideInner>
              </Slide>
            )
          })}
        </Container>
      </Viewport>
    </>
  )
}

export const CarouselScale = (props: PropType) => {
  const [inViewRef, inView] = useInView()

  return (
    <Wrapper ref={inViewRef}>
      {inView ? <Carousel aria-roledescription="carousel" {...props} /> : null}
    </Wrapper>
  )
}
