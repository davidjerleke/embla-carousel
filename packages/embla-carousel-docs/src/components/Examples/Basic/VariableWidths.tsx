import React from 'react'
import { EmblaOptionsType } from 'embla-carousel-react'
import styled, { css } from 'styled-components'
import { useInView } from 'react-intersection-observer'
import CarouselDefault from 'embla-carousel-react-sandboxes/src/SandboxFiles/DefaultSandboxCarousel'
import { carouselDefaultWrapperStyles } from 'components/Examples/carouselWrapperStyles'
import { createCarouselDefaultStyles } from 'components/Examples/createCarouselStyles'
import { createSlides } from 'components/Examples/createSlides'

export const ID = 'example-carousel-variable-widths'
export const SLIDES = createSlides(9)
export const OPTIONS: EmblaOptionsType = { containScroll: 'trimSnaps' }

export const Wrapper = styled.div`
  ${carouselDefaultWrapperStyles};

  &#${ID} {
    ${createCarouselDefaultStyles(
      '100%',
      undefined,
      undefined,
      css`
        .embla__slide:nth-child(1) {
          flex: 0 0 60%;
        }
        .embla__slide:nth-child(2) {
          flex: 0 0 40%;
        }
        .embla__slide:nth-child(3) {
          flex: 0 0 30%;
        }
        .embla__slide:nth-child(4) {
          flex: 0 0 90%;
        }
        .embla__slide:nth-child(5) {
          flex: 0 0 35%;
        }
        .embla__slide:nth-child(6) {
          flex: 0 0 55%;
        }
        .embla__slide:nth-child(7) {
          flex: 0 0 85%;
        }
        .embla__slide:nth-child(8) {
          flex: 0 0 46%;
        }
        .embla__slide:nth-child(9) {
          flex: 0 0 30%;
        }
      `,
    )};
  }
`

export const ExampleCarouselVariableWidths = () => {
  const [inViewRef, inView] = useInView()

  return (
    <Wrapper id={ID} ref={inViewRef}>
      {inView ? <CarouselDefault slides={SLIDES} options={OPTIONS} /> : null}
    </Wrapper>
  )
}
