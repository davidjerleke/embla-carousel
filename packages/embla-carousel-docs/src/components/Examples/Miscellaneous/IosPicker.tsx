import React from 'react'
import { EmblaOptionsType } from 'embla-carousel-react'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
import CarouselIosPicker from 'components/CodeSandbox/React/SandboxFilesSrc/CarouselIosPicker'
import { iosPickerWrapperStyles } from 'components/Examples/carouselWrapperStyles'
import { createCarouselIosPickerStyles } from 'components/Examples/createCarouselStyles'

export const ID = 'embla-carousel-ios-picker'
export const STYLES = createCarouselIosPickerStyles()

export const Wrapper = styled.div`
  ${iosPickerWrapperStyles};

  &.${ID} {
    ${STYLES};
  }
`

type PropType = {
  loop: EmblaOptionsType['loop'] // change to options!
}

export const ExampleCarouselIosPicker = (props: PropType) => {
  const [inViewRef, inView] = useInView()

  return (
    <Wrapper className={ID} ref={inViewRef}>
      {inView ? <CarouselIosPicker loop={props.loop} /> : null}
    </Wrapper>
  )
}
