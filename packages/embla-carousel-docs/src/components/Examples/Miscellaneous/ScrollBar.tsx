import React, { lazy } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
import { examplesScrollBarWrapperStyles } from 'components/Examples/examplesWrapperStyles'
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
  SLIDE_NUMBER_STYLES,
  SNAP_DISPLAY_STYLES,
  SCROLL_BAR_STYLES,
  examplesCarouselStyles
} from 'components/Examples/examplesCarouselStyles'

const CarouselScrollBar = lazy(() => {
  return import(
    'components/Sandbox/React/SandboxFilesSrc/ScrollBar/EmblaCarousel'
  )
})

const ID = 'embla-carousel-scroll-bar'
const SLIDES = arrayFromNumber(10)
const OPTIONS: EmblaOptionsType = { dragFree: true }
const STYLES = examplesCarouselStyles(
  '50%',
  '1rem',
  'x',
  styledComponentsStylesToString(
    SLIDE_NUMBER_STYLES,
    CONTROLS_STYLES,
    ARROWS_STYLES,
    SNAP_DISPLAY_STYLES,
    SCROLL_BAR_STYLES
  )
)

const SANDBOX_CONFIG: SandboxStaticSettingsType = {
  id: ID,
  slides: SLIDES,
  options: OPTIONS,
  styles: STYLES
}

const SANDBOXES = sandboxStaticSandboxes(SANDBOX_CONFIG, 'ScrollBar')

const Wrapper = styled.div`
  ${examplesScrollBarWrapperStyles};

  &.${ID} {
    ${STYLES};
  }
`

export const ScrollBar = () => {
  const [inViewRef, inView] = useInView(EXAMPLES_INTERSECTION_OPTIONS)

  return (
    <>
      <SandboxSelection sandboxes={SANDBOXES} />

      <Wrapper className={ID} ref={inViewRef}>
        {inView ? (
          <LoadSpinnerWithSuspense usePortal={false}>
            <CarouselScrollBar slides={SLIDES} options={OPTIONS} />
          </LoadSpinnerWithSuspense>
        ) : null}
      </Wrapper>
    </>
  )
}
