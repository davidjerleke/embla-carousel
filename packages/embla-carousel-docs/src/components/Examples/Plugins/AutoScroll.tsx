import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
import CarouselAutoScroll from 'components/Sandbox/React/SandboxFilesSrc/AutoScroll/EmblaCarousel'
import { examplesDefaultWrapperStyles } from 'components/Examples/examplesWrapperStyles'
import { examplesCarouselAutoplayStyles } from 'components/Examples/examplesCarouselStyles'
import { arrayFromNumber } from 'utils/arrayFromNumber'
import { SandboxSelection } from 'components/Sandbox/SandboxSelection'
import { sandboxStaticSandboxes } from 'components/Sandbox/sandboxStatic'
import { SandboxStaticSettingsType } from 'consts/sandbox'

const ID = 'embla-carousel-auto-scroll'
const SLIDES = arrayFromNumber(8)
const OPTIONS: EmblaOptionsType = { loop: true }
const STYLES = examplesCarouselAutoplayStyles('45%')

const SANDBOX_CONFIG: SandboxStaticSettingsType = {
  id: ID,
  slides: SLIDES,
  options: OPTIONS,
  styles: STYLES
}

const SANDBOXES = sandboxStaticSandboxes(SANDBOX_CONFIG, 'AutoScroll')

const Wrapper = styled.div`
  ${examplesDefaultWrapperStyles};

  &.${ID} {
    ${STYLES};
  }
`

export const AutoScroll = () => {
  const [inViewRef, inView] = useInView()

  return (
    <>
      <SandboxSelection sandboxes={SANDBOXES} />
      <Wrapper className={ID} ref={inViewRef}>
        {inView ? (
          <CarouselAutoScroll slides={SLIDES} options={OPTIONS} />
        ) : null}
      </Wrapper>
    </>
  )
}
