import React from 'react'
import { EmblaOptionsType } from 'embla-carousel-react'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
import CarouselIosPicker from 'embla-carousel-react-sandboxes/src/SandboxFiles/CarouselIosPicker'
import { iosPickerWrapperStyles } from 'components/Examples/carouselWrapperStyles'
import { createCarouselIosPickerStyles } from 'components/Examples/createCarouselStyles'

export const ID = 'example-carousel-ios-picker'

export const Wrapper = styled.div`
  ${iosPickerWrapperStyles};

  &.${ID} {
    ${createCarouselIosPickerStyles()};
  }
`

type PropType = {
  loop?: EmblaOptionsType['loop']
}

export const ExampleCarouselIosPicker = (props: PropType) => {
  const [inViewRef, inView] = useInView()

  return (
    <Wrapper className={ID} ref={inViewRef}>
      {inView ? <CarouselIosPicker loop={props.loop} /> : null}
    </Wrapper>
  )
}
