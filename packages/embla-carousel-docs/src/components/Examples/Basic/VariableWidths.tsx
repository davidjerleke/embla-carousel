import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
import EmblaCarouselExample from 'components/Sandbox/SandboxGeneratorExample'
import { examplesDefaultWrapperStyles } from 'components/Examples/examplesWrapperStyles'
import { arrayFromNumber } from 'utils/arrayFromNumber'
import { SandboxGeneratorSettingsType } from 'consts/sandbox'
import { CONTEXT_DEFAULT_VALUE } from 'components/CarouselGenerator/CarouselGeneratorContext'
import { sandboxGeneratorCreateStyles } from 'components/Sandbox/sandboxGeneratorCreateStyles'
import { examplesCarouselVariableWidthStyles } from '../examplesCarouselStyles'
import { staticGeneratorSandboxes } from 'components/Sandbox/sandboxGenerator'
import { SandboxSelection } from 'components/Sandbox/SandboxSelection'

const ID = 'embla-carousel-variable-widths'
const SLIDES = arrayFromNumber(9)
const OPTIONS: EmblaOptionsType = {}

const SANDBOX_SETTINGS: SandboxGeneratorSettingsType = {
  ...CONTEXT_DEFAULT_VALUE.formData,
  ...OPTIONS,
  id: ID,
  slideList: SLIDES,
  navigationPrevNextButtons: true,
  selectedSnapDisplay: true,
  styles: examplesCarouselVariableWidthStyles()
}

const SANDBOXES = staticGeneratorSandboxes(SANDBOX_SETTINGS)

const Wrapper = styled.div`
  ${examplesDefaultWrapperStyles};

  &.${ID} {
    ${sandboxGeneratorCreateStyles(SANDBOX_SETTINGS)};
  }
`

export const VariableWidths = () => {
  const [inViewRef, inView] = useInView()

  return (
    <>
      <SandboxSelection sandboxes={SANDBOXES} />
      <Wrapper className={ID} ref={inViewRef}>
        {inView ? (
          <EmblaCarouselExample
            slides={SLIDES}
            options={OPTIONS}
            navigationPrevNextButtons
            selectedSnapDisplay
          />
        ) : null}
      </Wrapper>
    </>
  )
}
