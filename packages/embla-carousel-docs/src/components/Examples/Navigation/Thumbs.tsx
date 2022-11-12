import React from 'react'
import { EmblaOptionsType } from 'embla-carousel-react'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
import CarouselThumbs from 'embla-carousel-react-sandboxes/src/SandboxFiles/CarouselThumbs'
import { carouselThumbsWrapperStyles } from 'components/Examples/carouselWrapperStyles'
import { createCarouselThumbsStyles } from 'components/Examples/createCarouselStyles'
import { createSlides } from 'components/Examples/createSlides'

export const ID = 'example-carousel-thumbs'
export const SLIDES = createSlides(10)
export const OPTIONS: EmblaOptionsType = {}

export const Wrapper = styled.div`
  ${carouselThumbsWrapperStyles};

  &.${ID} {
    ${createCarouselThumbsStyles()};
  }
`

export const ExampleCarouselThumbs = () => {
  const [inViewRef, inView] = useInView()

  return (
    <Wrapper className={ID} ref={inViewRef}>
      {inView ? <CarouselThumbs slides={SLIDES} options={OPTIONS} /> : null}
    </Wrapper>
  )
}
