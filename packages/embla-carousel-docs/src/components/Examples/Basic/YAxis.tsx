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
import { EXAMPLES_INTERSECTION_OPTIONS } from 'consts/examples'

const ID = 'embla-carousel-y-axis'
const SLIDES = arrayFromNumber(5)
const OPTIONS: EmblaOptionsType = { axis: 'y' }

const SANDBOX_SETTINGS: SandboxGeneratorSettingsType = {
  ...CONTEXT_DEFAULT_VALUE.formData,
  ...OPTIONS,
  id: ID,
  slideList: SLIDES,
  navigationPrevNextButtons: true,
  navigationDots: true
}

const SANDBOXES = staticGeneratorSandboxes(SANDBOX_SETTINGS)

const Wrapper = styled.div`
  ${examplesDefaultWrapperStyles};

  &.${ID} {
    ${sandboxGeneratorCreateStyles(SANDBOX_SETTINGS)};
  }
`

export const YAxis = () => {
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
