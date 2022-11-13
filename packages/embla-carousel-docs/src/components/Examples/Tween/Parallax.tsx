import React from 'react'
import { EmblaOptionsType } from 'embla-carousel-react'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
import CarouselParallax from 'embla-carousel-react-sandboxes/src/SandboxFiles/CarouselParallax'
import { carouselDefaultWrapperStyles } from 'components/Examples/carouselWrapperStyles'
import { createCarouselParallaxStyles } from 'components/Examples/createCarouselStyles'
import { createSlides } from 'components/Examples/createSlides'

export const ID = 'example-carousel-parallax'
export const SLIDES = createSlides(5)
export const OPTIONS: EmblaOptionsType = { inViewThreshold: 0, dragFree: true }

export const Wrapper = styled.div`
  ${carouselDefaultWrapperStyles};

  &.${ID} {
    ${createCarouselParallaxStyles('80%')};
  }
`

export const ExampleCarouselParallax = () => {
  const [inViewRef, inView] = useInView()

  return (
    <Wrapper className={ID} ref={inViewRef}>
      {inView ? <CarouselParallax slides={SLIDES} options={OPTIONS} /> : null}
    </Wrapper>
  )
}
