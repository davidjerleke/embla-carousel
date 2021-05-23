import React, { useEffect, useState } from 'react'
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
import {
  ProgressWrapper,
  ProgressBar,
  ProgressHighlight,
} from './carouselProgressStyles'

type PropType = {
  id: string
  slideSizes: number[]
  options?: EmblaOptionsType
}

const Carousel = (props: PropType) => {
  const { id, options, slideSizes } = props
  const carouselId = `${id}-carousel-items`
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    emblaApi?.on('scroll', () => {
      const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()))
      setScrollProgress(progress)
    })
  }, [emblaApi])

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
                <SlideInner>
                  <SlideImg src={src} alt={alt} />
                </SlideInner>
              </Slide>
            )
          })}
        </Container>
      </Viewport>
      <ProgressWrapper>
        <ProgressBar>
          <ProgressHighlight
            style={{
              transform: `translateX(${scrollProgress * 100}%)`,
              WebkitTransform: `translateX(${scrollProgress * 100}%)`,
            }}
          />
        </ProgressBar>
      </ProgressWrapper>
    </>
  )
}

export const CarouselProgress = (props: PropType) => {
  const [inViewRef, inView] = useInView({ triggerOnce: true })

  return (
    <Wrapper ref={inViewRef}>
      {inView ? <Carousel aria-roledescription="carousel" {...props} /> : null}
    </Wrapper>
  )
}
