import React, { lazy } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
import { examplesThumbsWrapperStyles } from 'components/Examples/examplesWrapperStyles'
import { arrayFromNumber } from 'utils/arrayFromNumber'
import { SandboxStaticSettingsType } from 'consts/sandbox'
import { sandboxStaticSandboxes } from 'components/Sandbox/sandboxStatic'
import { SandboxSelection } from 'components/Sandbox/SandboxSelection'
import { styledComponentsStylesToString } from 'utils/styledComponentStylesToString'
import { EXAMPLES_INTERSECTION_OPTIONS } from 'consts/examples'
import { LoadSpinnerWithSuspense } from 'components/LoadSpinner/LoadSpinnerWithSuspense'
import {
  SLIDE_NUMBER_STYLES,
  THUMBS_STYLES,
  examplesCarouselDefaultStyles
} from 'components/Examples/examplesCarouselStyles'

const CarouselThumbs = lazy(() => {
  return import('components/Sandbox/React/SandboxFilesSrc/Thumbs/EmblaCarousel')
})

const ID = 'embla-carousel-thumbs'
const SLIDES = arrayFromNumber(10)
const OPTIONS: EmblaOptionsType = {}
const STYLES = examplesCarouselDefaultStyles(
  '100%',
  '1rem',
  'x',
  styledComponentsStylesToString(SLIDE_NUMBER_STYLES, THUMBS_STYLES)
)

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
  const [inViewRef, inView] = useInView(EXAMPLES_INTERSECTION_OPTIONS)

  return (
    <>
      <SandboxSelection sandboxes={SANDBOXES} />

      <Wrapper className={ID} ref={inViewRef}>
        {inView ? (
          <LoadSpinnerWithSuspense usePortal={false}>
            <CarouselThumbs slides={SLIDES} options={OPTIONS} />
          </LoadSpinnerWithSuspense>
        ) : null}
      </Wrapper>
    </>
  )
}
