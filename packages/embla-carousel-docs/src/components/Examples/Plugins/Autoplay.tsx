import React from 'react'
import { EmblaOptionsType } from 'embla-carousel-react'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
import CarouselAutoplay from 'components/CodeSandbox/React/SandboxFilesSrc/Autoplay/EmblaCarousel'
import { carouselDefaultWrapperStyles } from 'components/Examples/carouselWrapperStyles'
import { createCarouselDefaultStyles } from 'components/Examples/createCarouselStyles'
import { arrayFromNumber } from 'utils/arrayFromNumber'

export const ID = 'embla-carousel-autoplay'
export const SLIDES = arrayFromNumber(5)
export const OPTIONS: EmblaOptionsType = {}
export const STYLES = createCarouselDefaultStyles()

export const Wrapper = styled.div`
  ${carouselDefaultWrapperStyles};

  &.${ID} {
    ${STYLES};
  }
`

export const ExampleCarouselAutoplay = () => {
  const [inViewRef, inView] = useInView()

  return (
    <Wrapper className={ID} ref={inViewRef}>
      {inView ? <CarouselAutoplay slides={SLIDES} options={OPTIONS} /> : null}
    </Wrapper>
  )
}
