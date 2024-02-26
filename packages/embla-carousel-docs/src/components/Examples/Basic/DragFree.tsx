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
import { examplesCarouselDragFreeStyles } from '../examplesCarouselStyles'

const ID = 'embla-carousel-drag-free'
const SLIDES = arrayFromNumber(16)
const OPTIONS: EmblaOptionsType = { dragFree: true }

const SANDBOX_SETTINGS: SandboxGeneratorSettingsType = {
  ...CONTEXT_DEFAULT_VALUE.formData,
  ...OPTIONS,
  id: ID,
  slideList: SLIDES,
  slideSize: '50',
  navigationPrevNextButtons: true,
  selectedSnapDisplay: true,
  styles: examplesCarouselDragFreeStyles('50%')
}

const SANDBOXES = staticGeneratorSandboxes(SANDBOX_SETTINGS)

const Wrapper = styled.div`
  ${examplesDefaultWrapperStyles};

  &.${ID} {
    ${sandboxGeneratorCreateStyles(SANDBOX_SETTINGS)};
  }
`

export const DragFree = () => {
  const [inViewRef, inView] = useInView()

  return (
    <>
      <SandboxSelection sandboxes={SANDBOXES} />
      <Wrapper className={ID} ref={inViewRef}>
        {inView ? (
          <SandboxGeneratorExample
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
