'use client'

import { EmblaOptionsType } from 'embla-carousel'
import { arrayFromNumber } from '@/utils/array'
import { SandboxStaticSettingsType } from '@/content/v9/sandboxes/sandbox-utils'
import { sandboxStaticSandboxes } from '@/content/v9/sandboxes/sandbox-static'
import { styledComponentsStylesToString } from '@/utils/styled-components'
import {
  EXAMPLES_WRAPPERS,
  ExamplesSetupType
} from '@/content/v9/examples/examples-utils'
import { ExamplesLazy } from '@/content/v9/examples/ExamplesLazy'
import CarouselDotButtons from '@/content/v9/sandboxes/React/SandboxFilesSrc/Guides/DotButtons/EmblaCarousel'
import {
  ARROWS_STYLES,
  CONTROLS_STYLES,
  IMAGE_STYLES,
  DOTS_STYLES,
  RADIO_INPUT_FORM_STYLES,
  examplesCarouselStyles
} from '@/content/v9/examples/examples-carousel-styles'

const ID = 'embla-carousel-dot-buttons'
const SLIDES = arrayFromNumber(5)
const OPTIONS: EmblaOptionsType = { loop: false }

const STYLES = examplesCarouselStyles(
  '70%',
  '2rem',
  OPTIONS,
  styledComponentsStylesToString(
    CONTROLS_STYLES,
    ARROWS_STYLES,
    IMAGE_STYLES,
    DOTS_STYLES,
    RADIO_INPUT_FORM_STYLES
  )
)
const CONFIG: SandboxStaticSettingsType = {
  id: ID,
  slides: SLIDES,
  options: OPTIONS,
  styles: STYLES
}
const SANDBOXES = sandboxStaticSandboxes(CONFIG, 'Guides/DotButtons')

export const EXAMPLE: ExamplesSetupType = {
  Carousel: CarouselDotButtons as ExamplesSetupType['Carousel'],
  config: CONFIG,
  sandboxes: SANDBOXES
}

export function ExampleDotButtons() {
  return (
    <ExamplesLazy
      wrapper={EXAMPLES_WRAPPERS.ONE_FORM_ROW}
      loader={() => {
        return import('@/content/v9/examples/Guides/DotButtons/DotButtons')
      }}
    />
  )
}
