import React from 'react'
import { EmblaOptionsType } from 'embla-carousel-react'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
import CarouselLazyLoad from 'embla-carousel-react-sandboxes/src/SandboxFiles/CarouselLazyLoad'
import { carouselDefaultWrapperStyles } from 'components/Examples/carouselWrapperStyles'
import { createCarouselLazyLoadStyles } from 'components/Examples/createCarouselStyles'
import { createSlides } from 'components/Examples/createSlides'

export const ID = 'example-carousel-lazy-load'
export const SLIDES = createSlides(5)
export const OPTIONS: EmblaOptionsType = {}

export const Wrapper = styled.div`
  ${carouselDefaultWrapperStyles};

  &.${ID} {
    ${createCarouselLazyLoadStyles()};
  }
`

export const ExampleCarouselLazyLoad = () => {
  const [inViewRef, inView] = useInView()

  return (
    <Wrapper className={ID} ref={inViewRef}>
      {inView ? <CarouselLazyLoad slides={SLIDES} options={OPTIONS} /> : null}
    </Wrapper>
  )
}
