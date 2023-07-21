import React from 'react'
import { EmblaOptionsType } from 'embla-carousel-react'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
import CarouselLazyLoad from 'components/Sandbox/React/SandboxFilesSrc/LazyLoad/EmblaCarousel'
import { carouselDefaultWrapperStyles } from 'components/Examples/carouselWrapperStyles'
import { createCarouselLazyLoadStyles } from 'components/Examples/createCarouselStyles'
import { arrayFromNumber } from 'utils/arrayFromNumber'

export const ID = 'embla-carousel-lazy-load'
export const SLIDES = arrayFromNumber(5)
export const OPTIONS: EmblaOptionsType = {}
export const STYLES = createCarouselLazyLoadStyles()

export const Wrapper = styled.div`
  ${carouselDefaultWrapperStyles};

  &.${ID} {
    ${STYLES};
  }
`

export const ExampleCarouselLazyLoad = () => {
  const [inViewRef, inView] = useInView()

  return (
    <Wrapper className={ID} ref={inViewRef}>
      {inView ? <CarouselLazyLoad slides={SLIDES} options={OPTIONS} /> : null}
    </Wrapper>
  )
}
