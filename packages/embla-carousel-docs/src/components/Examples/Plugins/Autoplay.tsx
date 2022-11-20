import React from 'react'
import { EmblaOptionsType } from 'embla-carousel-react'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
import CarouselAutoplay from 'embla-carousel-react-sandboxes/src/SandboxFiles/CarouselAutoplay'
import { carouselDefaultWrapperStyles } from 'components/Examples/carouselWrapperStyles'
import { createCarouselDefaultStyles } from 'components/Examples/createCarouselStyles'
import { createSlides } from 'components/Examples/createSlides'

export const ID = 'embla-carousel-react-autoplay'
export const SLIDES = createSlides(5)
export const OPTIONS: EmblaOptionsType = {}

export const Wrapper = styled.div`
  ${carouselDefaultWrapperStyles};

  &.${ID} {
    ${createCarouselDefaultStyles()};
  }
`

export const ExampleCarouselAutoplay = () => {
  const [inViewRef, inView] = useInView()

  return (
    <Wrapper className={ID} ref={inViewRef}>
      {inView ? <CarouselAutoplay slides={SLIDES} options={OPTIONS} /> : null}
    </Wrapper>
  )
}
