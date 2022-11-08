import React from 'react'
import { EmblaOptionsType } from 'embla-carousel-react'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
import CarouselDefault from 'embla-carousel-react-sandboxes/src/SandboxFiles/DefaultSandboxCarousel'
import { carouselDefaultWrapperStyles } from 'components/Examples/carouselWrapperStyles'
import { createCarouselDefaultStyles } from 'components/Examples/createCarouselStyles'
import { createSlides } from 'components/Examples/createSlides'

export const ID = 'example-carousel-y-axis'
export const SLIDES = createSlides(5)
export const OPTIONS: EmblaOptionsType = { axis: 'y' }

export const Wrapper = styled.div`
  ${carouselDefaultWrapperStyles};

  &#${ID} {
    ${createCarouselDefaultStyles(undefined, undefined, OPTIONS.axis)};
  }
`

export const ExampleCarouselYAxis = () => {
  const [inViewRef, inView] = useInView()

  return (
    <Wrapper id={ID} ref={inViewRef}>
      {inView ? <CarouselDefault slides={SLIDES} options={OPTIONS} /> : null}
    </Wrapper>
  )
}
