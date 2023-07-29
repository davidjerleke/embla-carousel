import React from 'react'
import { EmblaOptionsType } from 'embla-carousel-react'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
import CarouselParallax from 'components/Sandbox/React/SandboxFilesSrc/Parallax/EmblaCarousel'
import { carouselDefaultWrapperStyles } from 'components/Examples/carouselWrapperStyles'
import { createCarouselParallaxStyles } from 'components/Examples/createCarouselStyles'
import { arrayFromNumber } from 'utils/arrayFromNumber'

export const ID = 'embla-carousel-parallax'
export const SLIDES = arrayFromNumber(5)
export const OPTIONS: EmblaOptionsType = { dragFree: true }
export const STYLES = createCarouselParallaxStyles('80%')

export const Wrapper = styled.div`
  ${carouselDefaultWrapperStyles};

  &.${ID} {
    ${STYLES};
  }
`

export const ExampleCarouselParallax = () => {
  const [inViewRef, inView] = useInView()

  return (
    <Wrapper className={ID} ref={inViewRef}>
      {inView ? <CarouselParallax slides={SLIDES} options={OPTIONS} /> : null}
    </Wrapper>
  )
}
