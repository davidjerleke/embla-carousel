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
import CarouselGroupingSlidesInteractive from '@/content/v9/sandboxes/React/SandboxFilesSrc/Guides/GroupingSlidesInteractive/EmblaCarousel'
import {
  ARROWS_STYLES,
  CONTROLS_STYLES,
  GROUP_INDICATOR_STYLES,
  IMAGE_STYLES,
  RADIO_INPUT_FORM_STYLES,
  SNAP_DISPLAY_STYLES,
  examplesCarouselStyles
} from '@/content/v9/examples/examples-carousel-styles'

const ID = 'embla-carousel-grouping-slides-interactive'
const SLIDES = arrayFromNumber(10)
const OPTIONS: EmblaOptionsType = { slidesToScroll: 1 }

const STYLES = examplesCarouselStyles(
  '40%',
  '1rem',
  OPTIONS,
  styledComponentsStylesToString(
    CONTROLS_STYLES,
    ARROWS_STYLES,
    IMAGE_STYLES,
    RADIO_INPUT_FORM_STYLES,
    SNAP_DISPLAY_STYLES,
    GROUP_INDICATOR_STYLES
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
  'Guides/GroupingSlidesInteractive'
)

export const EXAMPLE: ExamplesSetupType = {
  Carousel: CarouselGroupingSlidesInteractive as ExamplesSetupType['Carousel'],
  config: CONFIG,
  sandboxes: SANDBOXES
}

export function ExampleGroupingSlidesInteractive() {
  return (
    <ExamplesLazy
      wrapper={EXAMPLES_WRAPPERS.TWO_FORM_ROWS}
      loader={() => {
        return import(
          '@/content/v9/examples/Guides/GroupingSlides/GroupingSlidesInteractive'
        )
      }}
    />
  )
}
