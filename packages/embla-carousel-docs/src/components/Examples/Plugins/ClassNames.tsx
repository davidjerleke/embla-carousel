import React from 'react'
import { EmblaOptionsType } from 'embla-carousel-react'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
import CarouselClassNames from 'embla-carousel-react-sandboxes/src/SandboxFiles/CarouselClassNames'
import { carouselDefaultWrapperStyles } from 'components/Examples/carouselWrapperStyles'
import { createCarouselClassNamesStyles } from 'components/Examples/createCarouselStyles'
import { arrayFromNumber } from 'utils/arrayFromNumber'

export const ID = 'embla-carousel-class-names'
export const SLIDES = arrayFromNumber(5)
export const OPTIONS: EmblaOptionsType = { inViewThreshold: 1 }
export const STYLES = createCarouselClassNamesStyles('60%')

export const Wrapper = styled.div`
  ${carouselDefaultWrapperStyles};

  &.${ID} {
    ${STYLES};
  }
`

export const ExampleCarouselClassNames = () => {
  const [inViewRef, inView] = useInView()

  return (
    <Wrapper className={ID} ref={inViewRef}>
      {inView ? <CarouselClassNames slides={SLIDES} options={OPTIONS} /> : null}
    </Wrapper>
  )
}
