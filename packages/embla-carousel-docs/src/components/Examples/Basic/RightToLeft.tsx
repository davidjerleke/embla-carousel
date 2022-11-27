import React from 'react'
import { EmblaOptionsType } from 'embla-carousel-react'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
import CarouselRightToLeft from 'embla-carousel-react-sandboxes/src/SandboxFiles/CarouselRightToLeft'
import { carouselDefaultWrapperStyles } from 'components/Examples/carouselWrapperStyles'
import { createCarouselDefaultStyles } from 'components/Examples/createCarouselStyles'
import { arrayFromNumber } from 'utils/arrayFromNumber'

export const ID = 'embla-carousel-right-to-left'
export const SLIDES = arrayFromNumber(5)
export const OPTIONS: EmblaOptionsType = { direction: 'rtl' }
export const STYLES = createCarouselDefaultStyles()

export const Wrapper = styled.div`
  ${carouselDefaultWrapperStyles};

  &.${ID} {
    ${STYLES};
  }
`

export const ExampleCarouselRightToLeft = () => {
  const [inViewRef, inView] = useInView()

  return (
    <Wrapper className={ID} ref={inViewRef}>
      {inView ? (
        <CarouselRightToLeft slides={SLIDES} options={OPTIONS} />
      ) : null}
    </Wrapper>
  )
}
