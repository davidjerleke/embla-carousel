import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
import CarouselIosPicker from 'components/Sandbox/React/SandboxFilesSrc/IosPicker/EmblaCarousel'
import { examplesIosPickerWrapperStyles } from 'components/Examples/examplesWrapperStyles'
import { examplesCarouselIosPickerStyles } from 'components/Examples/examplesCarouselStyles'
import { SandboxSelection } from 'components/Sandbox/SandboxSelection'
import { sandboxStaticSandboxes } from 'components/Sandbox/sandboxStatic'
import { SandboxStaticSettingsType } from 'consts/sandbox'
import { EXAMPLES_INTERSECTION_OPTIONS } from 'consts/examples'

const ID = 'embla-carousel-ios-style-picker'
const STYLES = examplesCarouselIosPickerStyles()

const SANDBOX_CONFIG: SandboxStaticSettingsType = {
  id: ID,
  slides: [],
  options: {},
  styles: STYLES
}
const SANDBOX_LOOP_CONFIG: SandboxStaticSettingsType = {
  ...SANDBOX_CONFIG,
  options: { loop: true }
}

const SANDBOXES = sandboxStaticSandboxes(SANDBOX_CONFIG, 'IosPicker')
const SANDBOXES_LOOP = sandboxStaticSandboxes(SANDBOX_LOOP_CONFIG, 'IosPicker')

const Wrapper = styled.div`
  ${examplesIosPickerWrapperStyles};

  &.${ID} {
    ${STYLES};
  }
`

type PropType = {
  loop: EmblaOptionsType['loop']
}

export const IosPicker = (props: PropType) => {
  const [inViewRef, inView] = useInView(EXAMPLES_INTERSECTION_OPTIONS)
  const { loop } = props

  return (
    <>
      <SandboxSelection sandboxes={loop ? SANDBOXES_LOOP : SANDBOXES} />
      <Wrapper className={ID} ref={inViewRef}>
        {inView ? <CarouselIosPicker loop={loop} /> : null}
      </Wrapper>
    </>
  )
}
