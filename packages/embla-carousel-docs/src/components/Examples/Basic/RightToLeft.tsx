import React from 'react'
import { EmblaOptionsType } from 'embla-carousel-react'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
import CarouselDefault from 'embla-carousel-react-sandboxes/src/SandboxFiles/DefaultSandboxCarousel'
import { carouselDefaultWrapperStyles } from 'components/Examples/carouselWrapperStyles'
import { createCarouselDefaultStyles } from 'components/Examples/createCarouselStyles'
import { createSlides } from 'components/Examples/createSlides'

export const ID = 'example-carousel-right-to-left'
export const SLIDES = createSlides(5)
export const OPTIONS: EmblaOptionsType = { direction: 'rtl' }

export const Wrapper = styled.div`
  ${carouselDefaultWrapperStyles};

  &#${ID} {
    ${createCarouselDefaultStyles()};
  }
`

export const ExampleCarouselRightToLeft = () => {
  const [inViewRef, inView] = useInView()

  return (
    <Wrapper id={ID} ref={inViewRef} dir="rtl">
      {inView ? <CarouselDefault slides={SLIDES} options={OPTIONS} /> : null}
    </Wrapper>
  )
}
