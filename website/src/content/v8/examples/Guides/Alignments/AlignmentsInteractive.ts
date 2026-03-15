import { EmblaOptionsType } from '@vendor/embla-carousel-v8/embla-carousel'
import { arrayFromNumber } from '@/utils/array'
import { SandboxStaticSettingsType } from '@/content/v8/sandboxes/sandbox-utils'
import { sandboxStaticSandboxes } from '@/content/v8/sandboxes/sandbox-static'
import { styledComponentsStylesToString } from '@/utils/styled-components'
import { ExamplesSetupType } from '@/content/v8/examples/examples-utils'
import CarouselAlignmentsInteractive from '@/content/v8/sandboxes/React/SandboxFilesSrc/Guides/AlignmentsInteractive/EmblaCarousel'
import {
  ALIGNMENT_INDICATOR_STYLES,
  ARROWS_STYLES,
  CONTROLS_STYLES,
  IMAGE_STYLES,
  RADIO_INPUT_FORM_STYLES,
  SNAP_DISPLAY_STYLES,
  examplesCarouselStyles
} from '@/content/v8/examples/examples-carousel-styles'

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
