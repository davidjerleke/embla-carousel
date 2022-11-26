import React from 'react'
import { EmblaOptionsType } from 'embla-carousel-react'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
import CarouselInfiniteScroll from 'embla-carousel-react-sandboxes/src/SandboxFiles/CarouselInfiniteScroll'
import { carouselDefaultWrapperStyles } from 'components/Examples/carouselWrapperStyles'
import { createCarouselInfiniteScrollStyles } from 'components/Examples/createCarouselStyles'
import { createSlides } from 'components/Examples/createSlides'

export const ID = 'embla-carousel-infinite-scroll'
export const SLIDES = createSlides(5)
export const OPTIONS: EmblaOptionsType = {
  inViewThreshold: 0,
  dragFree: true,
  containScroll: 'keepSnaps',
}
export const STYLES = createCarouselInfiniteScrollStyles()

export const Wrapper = styled.div`
  ${carouselDefaultWrapperStyles};

  &.${ID} {
    ${STYLES};
  }
`

export const ExampleCarouselInfiniteScroll = () => {
  const [inViewRef, inView] = useInView()

  return (
    <Wrapper className={ID} ref={inViewRef}>
      {inView ? (
        <CarouselInfiniteScroll slides={SLIDES} options={OPTIONS} />
      ) : null}
    </Wrapper>
  )
}
