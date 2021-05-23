import React, { useEffect, useCallback, useState } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import { useEmblaCarousel } from 'embla-carousel/react'
import { useInView } from 'react-intersection-observer'
import { imageByIndex } from './images'
import { Slide, SlideInner, SlideImg, SlideNumber } from './carouselBasicStyles'
import {
  Wrapper,
  MainViewport,
  MainContainer,
  ThumbViewport,
  ThumbContainer,
  ThumbSlide,
  ThumbSlideInner,
  ThumbSlideNumber,
} from './carouselThumbStyles'

type PropType = {
  id: string
  slideSizes: number[]
  options?: EmblaOptionsType
}

const Carousel = (props: PropType) => {
  const { id, options, slideSizes } = props
  const carouselId = `${id}-carousel-items`
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options)
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  })

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return
      if (emblaThumbsApi.clickAllowed()) {
        emblaMainApi.scrollTo(index)
      }
    },
    [emblaMainApi, emblaThumbsApi],
  )

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return
    setSelectedIndex(emblaMainApi.selectedScrollSnap())
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaMainApi) return
    emblaMainApi.on('select', onSelect)
    onSelect()
  }, [emblaMainApi, onSelect])

  return (
    <>
      <MainViewport ref={emblaMainRef}>
        <MainContainer id={carouselId} aria-live="polite">
          {slideSizes.map((size, index) => {
            const { src, alt } = imageByIndex(index)
            return (
              <Slide
                key={`main-${src}-${index}`}
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
        </MainContainer>
      </MainViewport>
      <ThumbViewport ref={emblaThumbsRef}>
        <ThumbContainer aria-live="polite">
          {slideSizes.map((_, index) => {
            const { src, alt } = imageByIndex(index)
            return (
              <ThumbSlide
                key={`thumb-${src}-${index}`}
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${slideSizes.length}`}
                role="group"
              >
                <ThumbSlideNumber>
                  <span>{index + 1}</span>
                </ThumbSlideNumber>
                <ThumbSlideInner
                  disabled={index === selectedIndex}
                  aria-controls={carouselId}
                  onClick={() => onThumbClick(index)}
                  aria-label={`Scroll to slide ${index + 1}`}
                >
                  <SlideImg src={src} alt={alt} />
                </ThumbSlideInner>
              </ThumbSlide>
            )
          })}
        </ThumbContainer>
      </ThumbViewport>
    </>
  )
}

export const CarouselThumb = (props: PropType) => {
  const [inViewRef, inView] = useInView({ triggerOnce: true })

  return (
    <Wrapper ref={inViewRef}>
      {inView ? <Carousel aria-roledescription="carousel" {...props} /> : null}
    </Wrapper>
  )
}
