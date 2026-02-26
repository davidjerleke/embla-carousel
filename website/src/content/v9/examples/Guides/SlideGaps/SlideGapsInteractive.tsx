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
import CarouselSlideGapsInteractive from '@/content/v9/sandboxes/React/SandboxFilesSrc/Guides/SlideGapsInteractive/EmblaCarousel'
import {
  ARROWS_STYLES,
  CONTROLS_STYLES,
  IMAGE_STYLES,
  SNAP_DISPLAY_STYLES,
  TEXT_INPUT_FORM_STYLES,
  examplesCarouselStyles
} from '@/content/v9/examples/examples-carousel-styles'

const ID = 'embla-carousel-slide-gaps-interactive'
const SLIDES = arrayFromNumber(8)
const OPTIONS: EmblaOptionsType = {}

const STYLES = examplesCarouselStyles(
  '70%',
  '10px',
  OPTIONS,
  styledComponentsStylesToString(
    CONTROLS_STYLES,
    ARROWS_STYLES,
    IMAGE_STYLES,
    SNAP_DISPLAY_STYLES,
    TEXT_INPUT_FORM_STYLES
  )
)
const CONFIG: SandboxStaticSettingsType = {
  id: ID,
  slides: SLIDES,
  options: OPTIONS,
  styles: STYLES
}
const SANDBOXES = sandboxStaticSandboxes(CONFIG, 'Guides/SlideGapsInteractive')

export const EXAMPLE: ExamplesSetupType = {
  Carousel: CarouselSlideGapsInteractive as ExamplesSetupType['Carousel'],
  config: CONFIG,
  sandboxes: SANDBOXES
}

export function ExampleSlideGapsInteractive() {
  return (
    <ExamplesLazy
      wrapper={EXAMPLES_WRAPPERS.TWO_FORM_ROWS}
      loader={() => {
        return import(
          '@/content/v9/examples/Guides/SlideGaps/SlideGapsInteractive'
        )
      }}
    />
  )
}
