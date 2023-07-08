import React from 'react'
import { EmblaOptionsType } from 'embla-carousel-react'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
import CarouselDefault from 'components/Sandbox/React/SandboxFilesSrc/Default/EmblaCarousel'
import { carouselDefaultWrapperStyles } from 'components/Examples/carouselWrapperStyles'
import { createCarouselDefaultStyles } from 'components/Examples/createCarouselStyles'
import { arrayFromNumber } from 'utils/arrayFromNumber'

export const ID = 'embla-carousel-y-axis'
export const SLIDES = arrayFromNumber(5)
export const OPTIONS: EmblaOptionsType = { axis: 'y' }
export const STYLES = createCarouselDefaultStyles(
  undefined,
  undefined,
  OPTIONS.axis
)

export const Wrapper = styled.div`
  ${carouselDefaultWrapperStyles};

  &.${ID} {
    ${STYLES};
  }
`

export const ExampleCarouselYAxis = () => {
  const [inViewRef, inView] = useInView()

  return (
    <Wrapper className={ID} ref={inViewRef}>
      {inView ? <CarouselDefault slides={SLIDES} options={OPTIONS} /> : null}
    </Wrapper>
  )
}
