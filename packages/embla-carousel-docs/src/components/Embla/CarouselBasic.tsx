import React, { useCallback, useEffect, useState } from 'react'
import { useEmblaCarousel } from 'embla-carousel/react'
import { EmblaOptionsType } from 'embla-carousel'
import { useInView } from 'react-intersection-observer'
import { ChevronLeftIcon, ChevronRightIcon } from 'assets/icons'
import { imageByIndex } from './images'
import {
  Wrapper,
  Container,
  Viewport,
  Slide,
  SlideInner,
  SlideImg,
  SlideNumber,
  DotButtons,
  DotButton,
  ArrowButton,
} from './carouselBasicStyles'

type PropType = {
  id: string
  slideSizes: number[]
  options?: EmblaOptionsType
  showDotButtons?: boolean
  showArrowButtons?: boolean
}

const Carousel = (props: PropType) => {
  const { id, options, slideSizes, showDotButtons, showArrowButtons } = props
  const carouselId = `${id}-carousel-items`
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [prevButtonEnabled, setPrevButtonEnabled] = useState(false)
  const [nextButtonEnabled, setNextButtonEnabled] = useState(false)

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index)
    },
    [emblaApi],
  )

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setPrevButtonEnabled(emblaApi.canScrollPrev())
    setNextButtonEnabled(emblaApi.canScrollNext())
  }, [emblaApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaApi) return
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    onSelect()
  }, [emblaApi, setScrollSnaps])

  return (
    <>
      <Viewport ref={emblaRef} dir={options?.direction}>
        <Container $axis={options?.axis} id={carouselId} aria-live="polite">
          {slideSizes.map((size, index) => {
            const { src, alt } = imageByIndex(index)
            return (
              <Slide
                key={`${src}-${index}`}
                $size={size}
                aria-label={`${index + 1} of ${slideSizes.length}`}
                aria-roledescription="slide"
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
      {showArrowButtons && (
        <>
          <ArrowButton
            $direction="prev"
            onClick={scrollPrev}
            disabled={!prevButtonEnabled}
            aria-controls={carouselId}
            aria-label="Scroll to previous slide"
          >
            <ChevronLeftIcon aria-hidden="true" focusable="false" />
          </ArrowButton>
          <ArrowButton
            $direction="next"
            onClick={scrollNext}
            disabled={!nextButtonEnabled}
            aria-controls={carouselId}
            aria-label="Scroll to next slide"
          >
            <ChevronRightIcon aria-hidden="true" focusable="false" />
          </ArrowButton>
        </>
      )}
      {showDotButtons && (
        <DotButtons>
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              $active={selectedIndex === index}
              onClick={() => scrollTo(index)}
              aria-controls={carouselId}
              aria-label={`Scroll to slide ${index + 1}`}
            />
          ))}
        </DotButtons>
      )}
    </>
  )
}

export const CarouselBasic = (props: PropType) => {
  const [inViewRef, inView] = useInView({ triggerOnce: true })

  return (
    <Wrapper ref={inViewRef}>
      {inView ? <Carousel aria-roledescription="carousel" {...props} /> : null}
    </Wrapper>
  )
}
