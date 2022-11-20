import React from 'react'
import { EmblaOptionsType } from 'embla-carousel-react'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
import CarouselProgress from 'embla-carousel-react-sandboxes/src/SandboxFiles/CarouselProgress'
import { carouselDefaultWrapperStyles } from 'components/Examples/carouselWrapperStyles'
import { createCarouselProgressStyles } from 'components/Examples/createCarouselStyles'
import { createSlides } from 'components/Examples/createSlides'

export const ID = 'embla-carousel-react-progress'
export const SLIDES = createSlides(5)
export const OPTIONS: EmblaOptionsType = { dragFree: true }

export const Wrapper = styled.div`
  ${carouselDefaultWrapperStyles};

  &.${ID} {
    ${createCarouselProgressStyles()};
  }
`

export const ExampleCarouselProgress = () => {
  const [inViewRef, inView] = useInView()

  return (
    <Wrapper className={ID} ref={inViewRef}>
      {inView ? <CarouselProgress slides={SLIDES} options={OPTIONS} /> : null}
    </Wrapper>
  )
}
