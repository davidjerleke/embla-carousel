import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
import { SandboxGeneratorExample } from 'components/Sandbox/SandboxGeneratorExample'
import { examplesDefaultWrapperStyles } from 'components/Examples/examplesWrapperStyles'
import { arrayFromNumber } from 'utils/arrayFromNumber'
import { SandboxGeneratorSettingsType } from 'consts/sandbox'
import { CONTEXT_DEFAULT_VALUE } from 'components/CarouselGenerator/CarouselGeneratorContext'
import { sandboxGeneratorCreateStyles } from 'components/Sandbox/sandboxGeneratorCreateStyles'
import { staticGeneratorSandboxes } from 'components/Sandbox/sandboxGenerator'
import { SandboxSelection } from 'components/Sandbox/SandboxSelection'
import { examplesCarouselSlidesPerViewStyles } from '../examplesCarouselStyles'
import { EXAMPLES_INTERSECTION_OPTIONS } from 'consts/examples'

const ID = 'embla-carousel-slides-per-view'
const SLIDES = arrayFromNumber(6)
const OPTIONS: EmblaOptionsType = { align: 'start' }

const SANDBOX_SETTINGS: SandboxGeneratorSettingsType = {
  ...CONTEXT_DEFAULT_VALUE.formData,
  ...OPTIONS,
  id: ID,
  slideList: SLIDES,
  navigationPrevNextButtons: true,
  navigationDots: true,
  styles: examplesCarouselSlidesPerViewStyles()
}

const SANDBOXES = staticGeneratorSandboxes(SANDBOX_SETTINGS)

const Wrapper = styled.div`
  ${examplesDefaultWrapperStyles};

  &.${ID} {
    ${sandboxGeneratorCreateStyles(SANDBOX_SETTINGS)};
  }
`

export const SlidesPerView = () => {
  const [inViewRef, inView] = useInView(EXAMPLES_INTERSECTION_OPTIONS)

  return (
    <>
      <SandboxSelection sandboxes={SANDBOXES} />
      <Wrapper className={ID} ref={inViewRef}>
        {inView ? (
          <SandboxGeneratorExample
            slides={SLIDES}
            options={OPTIONS}
            navigationPrevNextButtons
            navigationDots
          />
        ) : null}
      </Wrapper>
    </>
  )
}
