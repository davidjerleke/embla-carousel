import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
import CarouselParallax from 'components/Sandbox/React/SandboxFilesSrc/Parallax/EmblaCarousel'
import { examplesDefaultWrapperStyles } from 'components/Examples/examplesWrapperStyles'
import { examplesCarouselParallaxStyles } from 'components/Examples/examplesCarouselStyles'
import { arrayFromNumber } from 'utils/arrayFromNumber'
import { SandboxSelection } from 'components/Sandbox/SandboxSelection'
import { sandboxStaticSandboxes } from 'components/Sandbox/sandboxStatic'
import { SandboxStaticSettingsType } from 'consts/sandbox'

const ID = 'embla-carousel-parallax'
const SLIDES = arrayFromNumber(5)
const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true }
const STYLES = examplesCarouselParallaxStyles('80%')

const SANDBOX_CONFIG: SandboxStaticSettingsType = {
  id: ID,
  slides: SLIDES,
  options: OPTIONS,
  styles: STYLES
}

const SANDBOXES = sandboxStaticSandboxes(SANDBOX_CONFIG, 'Parallax')

const Wrapper = styled.div`
  ${examplesDefaultWrapperStyles};

  &.${ID} {
    ${STYLES};
  }
`

export const Parallax = () => {
  const [inViewRef, inView] = useInView()

  return (
    <>
      <SandboxSelection sandboxes={SANDBOXES} />
      <Wrapper className={ID} ref={inViewRef}>
        {inView ? <CarouselParallax slides={SLIDES} options={OPTIONS} /> : null}
      </Wrapper>
    </>
  )
}
