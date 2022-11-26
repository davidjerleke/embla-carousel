import React from 'react'
import { EmblaOptionsType } from 'embla-carousel-react'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
import CarouselDefault from 'embla-carousel-react-sandboxes/src/SandboxFiles/CarouselDefault'
import { carouselDefaultWrapperStyles } from 'components/Examples/carouselWrapperStyles'
import { createCarouselDefaultStyles } from 'components/Examples/createCarouselStyles'
import { createSlides } from 'components/Examples/createSlides'

export const ID = 'embla-carousel-react-y-axis'
export const SLIDES = createSlides(5)
export const OPTIONS: EmblaOptionsType = { axis: 'y' }
export const STYLES = createCarouselDefaultStyles(
  undefined,
  undefined,
  OPTIONS.axis,
)

export const Wrapper = styled.div`
  ${carouselDefaultWrapperStyles};

  &.${ID} {
    ${STYLES};
  }
`

export const ExampleCarouselYAxis = () => {
  const [inViewRef, inView] = useInView()

  return (
    <Wrapper className={ID} ref={inViewRef}>
      {inView ? <CarouselDefault slides={SLIDES} options={OPTIONS} /> : null}
    </Wrapper>
  )
}