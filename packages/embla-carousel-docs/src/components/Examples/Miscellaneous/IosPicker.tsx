import React, { lazy } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
import { examplesIosPickerWrapperStyles } from 'components/Examples/examplesWrapperStyles'
import { SandboxSelection } from 'components/Sandbox/SandboxSelection'
import { sandboxStaticSandboxes } from 'components/Sandbox/sandboxStatic'
import { SandboxStaticSettingsType } from 'consts/sandbox'
import { styledComponentsStylesToString } from 'utils/styledComponentStylesToString'
import { EXAMPLES_INTERSECTION_OPTIONS } from 'consts/examples'
import { LoadSpinnerWithSuspense } from 'components/LoadSpinner/LoadSpinnerWithSuspense'
import { IOS_PICKER_STYLES } from 'components/Examples/examplesCarouselStyles'

const CarouselIosPicker = lazy(() => {
  return import(
    'components/Sandbox/React/SandboxFilesSrc/IosPicker/EmblaCarousel'
  )
})

const ID = 'embla-carousel-ios-style-picker'
const STYLES = styledComponentsStylesToString(IOS_PICKER_STYLES)

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
        {inView ? (
          <LoadSpinnerWithSuspense usePortal={false}>
            <CarouselIosPicker loop={loop} />
          </LoadSpinnerWithSuspense>
        ) : null}
      </Wrapper>
    </>
  )
}
