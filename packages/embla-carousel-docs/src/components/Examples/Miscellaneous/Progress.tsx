import React from 'react'
import { EmblaOptionsType } from 'embla-carousel-react'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
import CarouselProgress from 'components/Sandbox/React/SandboxFilesSrc/Progress/EmblaCarousel'
import { carouselDefaultWrapperStyles } from 'components/Examples/carouselWrapperStyles'
import { createCarouselProgressStyles } from 'components/Examples/createCarouselStyles'
import { arrayFromNumber } from 'utils/arrayFromNumber'

export const ID = 'embla-carousel-progress'
export const SLIDES = arrayFromNumber(5)
export const OPTIONS: EmblaOptionsType = { dragFree: true }
export const STYLES = createCarouselProgressStyles()

export const Wrapper = styled.div`
  ${carouselDefaultWrapperStyles};

  &.${ID} {
    ${STYLES};
  }
`

export const ExampleCarouselProgress = () => {
  const [inViewRef, inView] = useInView()

  return (
    <Wrapper className={ID} ref={inViewRef}>
      {inView ? <CarouselProgress slides={SLIDES} options={OPTIONS} /> : null}
    </Wrapper>
  )
}
