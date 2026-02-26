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
import CarouselAlignmentsInteractive from '@/content/v9/sandboxes/React/SandboxFilesSrc/Guides/AlignmentsInteractive/EmblaCarousel'
import {
  ALIGNMENT_INDICATOR_STYLES,
  ARROWS_STYLES,
  CONTROLS_STYLES,
  IMAGE_STYLES,
  RADIO_INPUT_FORM_STYLES,
  SNAP_DISPLAY_STYLES,
  examplesCarouselStyles
} from '@/content/v9/examples/examples-carousel-styles'

const ID = 'embla-carousel-alignments-interactive'
const SLIDES = arrayFromNumber(8)
const OPTIONS: EmblaOptionsType = { align: 'center', loop: true }

const STYLES = examplesCarouselStyles(
  '70%',
  '2rem',
  OPTIONS,
  styledComponentsStylesToString(
    CONTROLS_STYLES,
    ARROWS_STYLES,
    IMAGE_STYLES,
    RADIO_INPUT_FORM_STYLES,
    ALIGNMENT_INDICATOR_STYLES,
    SNAP_DISPLAY_STYLES
  )
)
const CONFIG: SandboxStaticSettingsType = {
  id: ID,
  slides: SLIDES,
  options: OPTIONS,
  styles: STYLES
}
const SANDBOXES = sandboxStaticSandboxes(CONFIG, 'Guides/AlignmentsInteractive')

export const EXAMPLE: ExamplesSetupType = {
  Carousel: CarouselAlignmentsInteractive as ExamplesSetupType['Carousel'],
  config: CONFIG,
  sandboxes: SANDBOXES
}

export function ExampleAlignmentsInteractive() {
  return (
    <ExamplesLazy
      wrapper={EXAMPLES_WRAPPERS.TWO_FORM_ROWS}
      loader={() => {
        return import(
          '@/content/v9/examples/Guides/Alignments/AlignmentsInteractive'
        )
      }}
    />
  )
}
