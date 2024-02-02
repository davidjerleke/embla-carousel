import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
import CarouselThumbs from 'components/Sandbox/React/SandboxFilesSrc/Thumbs/EmblaCarousel'
import { examplesThumbsWrapperStyles } from 'components/Examples/examplesWrapperStyles'
import { examplesCarouselThumbsStyles } from 'components/Examples/examplesCarouselStyles'
import { arrayFromNumber } from 'utils/arrayFromNumber'
import { SandboxSelection } from 'components/Sandbox/SandboxSelection'
import { sandboxStaticSandboxes } from 'components/Sandbox/sandboxStatic'
import { SandboxStaticSettingsType } from 'consts/sandbox'

const ID = 'embla-carousel-thumbs'
const SLIDES = arrayFromNumber(10)
const OPTIONS: EmblaOptionsType = {}
const STYLES = examplesCarouselThumbsStyles()

const SANDBOX_CONFIG: SandboxStaticSettingsType = {
  id: ID,
  slides: SLIDES,
  options: OPTIONS,
  styles: STYLES
}

const SANDBOXES = sandboxStaticSandboxes(SANDBOX_CONFIG, 'Thumbs')

const Wrapper = styled.div`
  ${examplesThumbsWrapperStyles};

  &.${ID} {
    ${STYLES};
  }
`

export const Thumbs = () => {
  const [inViewRef, inView] = useInView()

  return (
    <>
      <SandboxSelection sandboxes={SANDBOXES} />
      <Wrapper className={ID} ref={inViewRef}>
        {inView ? <CarouselThumbs slides={SLIDES} options={OPTIONS} /> : null}
      </Wrapper>
    </>
  )
}
