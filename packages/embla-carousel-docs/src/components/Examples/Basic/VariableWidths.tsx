import React from 'react'
import { EmblaOptionsType } from 'embla-carousel-react'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
import CarouselDefault from 'embla-carousel-react-sandboxes/src/SandboxFiles/CarouselDefault'
import { carouselDefaultWrapperStyles } from 'components/Examples/carouselWrapperStyles'
import { createCarouselVariableWidthStyles } from 'components/Examples/createCarouselStyles'
import { createSlides } from 'components/Examples/createSlides'

export const ID = 'example-carousel-variable-widths'
export const SLIDES = createSlides(9)
export const OPTIONS: EmblaOptionsType = {}

export const Wrapper = styled.div`
  ${carouselDefaultWrapperStyles};

  &.${ID} {
    ${createCarouselVariableWidthStyles()};
  }
`

export const ExampleCarouselVariableWidths = () => {
  const [inViewRef, inView] = useInView()

  return (
    <Wrapper className={ID} ref={inViewRef}>
      {inView ? <CarouselDefault slides={SLIDES} options={OPTIONS} /> : null}
    </Wrapper>
  )
}
