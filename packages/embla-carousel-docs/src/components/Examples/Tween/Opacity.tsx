import React from 'react'
import { EmblaOptionsType } from 'embla-carousel-react'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
import CarouselOpacity from 'embla-carousel-react-sandboxes/src/SandboxFiles/CarouselOpacity'
import { carouselDefaultWrapperStyles } from 'components/Examples/carouselWrapperStyles'
import { createCarouselDefaultStyles } from 'components/Examples/createCarouselStyles'
import { createSlides } from 'components/Examples/createSlides'

export const ID = 'embla-carousel-react-opacity'
export const SLIDES = createSlides(5)
export const OPTIONS: EmblaOptionsType = { loop: true }

export const Wrapper = styled.div`
  ${carouselDefaultWrapperStyles};

  &.${ID} {
    ${createCarouselDefaultStyles('70%')};
  }
`

export const ExampleCarouselOpacity = () => {
  const [inViewRef, inView] = useInView()

  return (
    <Wrapper className={ID} ref={inViewRef}>
      {inView ? <CarouselOpacity slides={SLIDES} options={OPTIONS} /> : null}
    </Wrapper>
  )
}
