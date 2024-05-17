import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
import CarouselFade from 'components/Sandbox/React/SandboxFilesSrc/Fade/EmblaCarousel'
import { examplesDefaultWrapperStyles } from 'components/Examples/examplesWrapperStyles'
import { examplesCarouselFadeStyles } from 'components/Examples/examplesCarouselStyles'
import { arrayFromNumber } from 'utils/arrayFromNumber'
import { SandboxSelection } from 'components/Sandbox/SandboxSelection'
import { sandboxStaticSandboxes } from 'components/Sandbox/sandboxStatic'
import { SandboxStaticSettingsType } from 'consts/sandbox'
import { EXAMPLES_INTERSECTION_OPTIONS } from 'consts/examples'

const ID = 'embla-carousel-fade'
const SLIDES = arrayFromNumber(5)
const OPTIONS: EmblaOptionsType = { loop: true, duration: 30 }
const STYLES = examplesCarouselFadeStyles()

const SANDBOX_CONFIG: SandboxStaticSettingsType = {
  id: ID,
  slides: SLIDES,
  options: OPTIONS,
  styles: STYLES
}

const SANDBOXES = sandboxStaticSandboxes(SANDBOX_CONFIG, 'Fade')

const Wrapper = styled.div`
  ${examplesDefaultWrapperStyles};

  &.${ID} {
    ${STYLES};
  }
`

export const Fade = () => {
  const [inViewRef, inView] = useInView(EXAMPLES_INTERSECTION_OPTIONS)

  return (
    <>
      <SandboxSelection sandboxes={SANDBOXES} />
      <Wrapper className={ID} ref={inViewRef}>
        {inView ? <CarouselFade slides={SLIDES} options={OPTIONS} /> : null}
      </Wrapper>
    </>
  )
}
