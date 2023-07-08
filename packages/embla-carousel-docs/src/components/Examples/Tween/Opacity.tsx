import React from 'react'
import { EmblaOptionsType } from 'embla-carousel-react'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
import CarouselOpacity from 'components/Sandbox/React/SandboxFilesSrc/Opacity/EmblaCarousel'
import { carouselDefaultWrapperStyles } from 'components/Examples/carouselWrapperStyles'
import { createCarouselDefaultStyles } from 'components/Examples/createCarouselStyles'
import { arrayFromNumber } from 'utils/arrayFromNumber'

export const ID = 'embla-carousel-opacity'
export const SLIDES = arrayFromNumber(5)
export const OPTIONS: EmblaOptionsType = { loop: true }
export const STYLES = createCarouselDefaultStyles('70%')

export const Wrapper = styled.div`
  ${carouselDefaultWrapperStyles};

  &.${ID} {
    ${STYLES};
  }
`

export const ExampleCarouselOpacity = () => {
  const [inViewRef, inView] = useInView()

  return (
    <Wrapper className={ID} ref={inViewRef}>
      {inView ? <CarouselOpacity slides={SLIDES} options={OPTIONS} /> : null}
    </Wrapper>
  )
}
