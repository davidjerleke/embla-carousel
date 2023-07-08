import React from 'react'
import { EmblaOptionsType } from 'embla-carousel-react'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
import CarouselScale from 'components/Sandbox/React/SandboxFilesSrc/Scale/EmblaCarousel'
import { carouselDefaultWrapperStyles } from 'components/Examples/carouselWrapperStyles'
import { createCarouselScaleStyles } from 'components/Examples/createCarouselStyles'
import { arrayFromNumber } from 'utils/arrayFromNumber'

export const ID = 'embla-carousel-scale'
export const SLIDES = arrayFromNumber(5)
export const OPTIONS: EmblaOptionsType = { loop: true }
export const STYLES = createCarouselScaleStyles()

export const Wrapper = styled.div`
  ${carouselDefaultWrapperStyles};

  &.${ID} {
    ${STYLES};
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
