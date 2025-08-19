import React, { lazy } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
import { examplesDefaultWrapperStyles } from 'components/Examples/examplesWrapperStyles'
import { arrayFromNumber } from 'utils/arrayFromNumber'
import { SandboxStaticSettingsType } from 'consts/sandbox'
import { sandboxStaticSandboxes } from 'components/Sandbox/sandboxStatic'
import { SandboxSelection } from 'components/Sandbox/SandboxSelection'
import { styledComponentsStylesToString } from 'utils/styledComponentStylesToString'
import { EXAMPLES_INTERSECTION_OPTIONS } from 'consts/examples'
import { LoadSpinnerWithSuspense } from 'components/LoadSpinner/LoadSpinnerWithSuspense'
import {
  ARROWS_STYLES,
  CONTROLS_STYLES,
  DOTS_STYLES,
  SCALE_STYLES,
  SLIDE_NUMBER_STYLES,
  examplesCarouselStyles
} from 'components/Examples/examplesCarouselStyles'

const CarouselScale = lazy(() => {
  return import('components/Sandbox/React/SandboxFilesSrc/Scale/EmblaCarousel')
})

const ID = 'embla-carousel-scale'
const SLIDES = arrayFromNumber(5)
const OPTIONS: EmblaOptionsType = { loop: true }
const STYLES = examplesCarouselStyles(
  '55%',
  '1rem',
  'x',
  styledComponentsStylesToString(
    SLIDE_NUMBER_STYLES,
    CONTROLS_STYLES,
    ARROWS_STYLES,
    DOTS_STYLES,
    SCALE_STYLES
  )
)

const SANDBOX_CONFIG: SandboxStaticSettingsType = {
  id: ID,
  slides: SLIDES,
  options: OPTIONS,
  styles: STYLES
}

const SANDBOXES = sandboxStaticSandboxes(SANDBOX_CONFIG, 'Scale')

const Wrapper = styled.div`
  ${examplesDefaultWrapperStyles};

  &.${ID} {
    ${STYLES};
  }
`

export const Scale = () => {
  const [inViewRef, inView] = useInView(EXAMPLES_INTERSECTION_OPTIONS)

  return (
    <>
      <SandboxSelection sandboxes={SANDBOXES} />

      <Wrapper className={ID} ref={inViewRef}>
        {inView ? (
          <LoadSpinnerWithSuspense usePortal={false}>
            <CarouselScale slides={SLIDES} options={OPTIONS} />
          </LoadSpinnerWithSuspense>
        ) : null}
      </Wrapper>
    </>
  )
}
