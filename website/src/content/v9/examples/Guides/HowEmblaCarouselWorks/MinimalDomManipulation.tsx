'use client'

import { EmblaOptionsType } from 'embla-carousel'
import { arrayFromNumber } from '@/utils/array'
import { SandboxStaticSettingsType } from '@/content/v9/sandboxes/sandbox-utils'
import { sandboxStaticSandboxes } from '@/content/v9/sandboxes/sandbox-static'
import { styledComponentsStylesToString } from '@/utils/styled-components'
import { ExamplesSetupType } from '@/content/v9/examples/examples-utils'
import { ExamplesLazy } from '@/content/v9/examples/ExamplesLazy'
import CarouselMinimalDomManipulation from '@/content/v9/sandboxes/React/SandboxFilesSrc/Guides/MinimalDomManipulation/EmblaCarousel'
import {
  ARROWS_STYLES,
  CONTROLS_STYLES,
  DOTS_STYLES,
  SLIDE_NUMBER_STYLES,
  examplesCarouselStyles
} from '@/content/v9/examples/examples-carousel-styles'

const ID = 'embla-carousel-minimal-dom-manipulation'
const SLIDES = arrayFromNumber(5)
const OPTIONS: EmblaOptionsType = { loop: true }
const STYLES = examplesCarouselStyles(
  '70%',
  '1rem',
  OPTIONS,
  styledComponentsStylesToString(
    SLIDE_NUMBER_STYLES,
    CONTROLS_STYLES,
    ARROWS_STYLES,
    DOTS_STYLES
  )
)
const CONFIG: SandboxStaticSettingsType = {
  id: ID,
  slides: SLIDES,
  options: OPTIONS,
  styles: STYLES
}
const SANDBOXES = sandboxStaticSandboxes(
  CONFIG,
  'Guides/MinimalDomManipulation'
)

export const EXAMPLE: ExamplesSetupType = {
  Carousel: CarouselMinimalDomManipulation as ExamplesSetupType['Carousel'],
  config: CONFIG,
  sandboxes: SANDBOXES
}

export function ExampleMinimalDomManipulation() {
  return (
    <ExamplesLazy
      loader={() => {
        return import(
          '@/content/v9/examples/Guides/HowEmblaCarouselWorks/MinimalDomManipulation'
        )
      }}
    />
  )
}
