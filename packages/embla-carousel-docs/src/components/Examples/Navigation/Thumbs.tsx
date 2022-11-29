import React from 'react'
import { EmblaOptionsType } from 'embla-carousel-react'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
import CarouselThumbs from 'components/CodeSandbox/React/SandboxFilesSrc/CarouselThumbs'
import { carouselThumbsWrapperStyles } from 'components/Examples/carouselWrapperStyles'
import { createCarouselThumbsStyles } from 'components/Examples/createCarouselStyles'
import { arrayFromNumber } from 'utils/arrayFromNumber'

export const ID = 'embla-carousel-thumbs'
export const SLIDES = arrayFromNumber(10)
export const OPTIONS: EmblaOptionsType = {}
export const STYLES = createCarouselThumbsStyles()

export const Wrapper = styled.div`
  ${carouselThumbsWrapperStyles};

  &.${ID} {
    ${STYLES};
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
