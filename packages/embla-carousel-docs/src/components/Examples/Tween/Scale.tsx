import React from 'react'
import { EmblaOptionsType } from 'embla-carousel-react'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
import CarouselScale from 'embla-carousel-react-sandboxes/src/SandboxFiles/CarouselScale'
import { carouselDefaultWrapperStyles } from 'components/Examples/carouselWrapperStyles'
import { createCarouselScaleStyles } from 'components/Examples/createCarouselStyles'
import { createSlides } from 'components/Examples/createSlides'

export const ID = 'example-carousel-scale'
export const SLIDES = createSlides(5)
export const OPTIONS: EmblaOptionsType = { loop: true }

export const Wrapper = styled.div`
  ${carouselDefaultWrapperStyles};

  &.${ID} {
    ${createCarouselScaleStyles()};
  }
`

export const ExampleCarouselScale = () => {
  const [inViewRef, inView] = useInView()

  return (
    <Wrapper className={ID} ref={inViewRef}>
      {inView ? <CarouselScale slides={SLIDES} options={OPTIONS} /> : null}
    </Wrapper>
  )
}
