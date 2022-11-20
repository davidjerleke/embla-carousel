import React from 'react'
import { EmblaOptionsType } from 'embla-carousel-react'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
import CarouselArrowsDots from 'embla-carousel-react-sandboxes/src/SandboxFiles/CarouselArrowsDots'
import { carouselDefaultWrapperStyles } from 'components/Examples/carouselWrapperStyles'
import { createCarouselArrowsDotsStyles } from 'components/Examples/createCarouselStyles'
import { createSlides } from 'components/Examples/createSlides'

export const ID = 'embla-carousel-react-arrow-dots'
export const SLIDES = createSlides(5)
export const OPTIONS: EmblaOptionsType = {}

export const Wrapper = styled.div`
  ${carouselDefaultWrapperStyles};

  &.${ID} {
    ${createCarouselArrowsDotsStyles()};
  }
`

export const ExampleCarouselArrowsDots = () => {
  const [inViewRef, inView] = useInView()

  return (
    <Wrapper className={ID} ref={inViewRef}>
      {inView ? <CarouselArrowsDots slides={SLIDES} options={OPTIONS} /> : null}
    </Wrapper>
  )
}
