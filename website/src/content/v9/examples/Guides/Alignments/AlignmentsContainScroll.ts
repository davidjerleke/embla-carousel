import { EmblaOptionsType } from 'embla-carousel'
import { arrayFromNumber } from '@/utils/array'
import { SandboxStaticSettingsType } from '@/content/v9/sandboxes/sandbox-utils'
import { sandboxStaticSandboxes } from '@/content/v9/sandboxes/sandbox-static'
import { styledComponentsStylesToString } from '@/utils/styled-components'
import { ExamplesSetupType } from '@/content/v9/examples/examles-utils'
import CarouselAlignmentsContainScroll from '@/content/v9/sandboxes/React/SandboxFilesSrc/Guides/AlignmentsContainScroll/EmblaCarousel'
import {
  ALIGNMENT_INDICATOR_STYLES,
  ARROWS_STYLES,
  CONTROLS_STYLES,
  IMAGE_STYLES,
  RADIO_INPUT_FORM_STYLES,
  SNAP_DISPLAY_STYLES,
  examplesCarouselStyles
} from '@/content/v9/examples/examples-carousel-styles'

const ID = 'embla-carousel-alignments-contain-scroll'
const SLIDES = arrayFromNumber(8)
const OPTIONS: EmblaOptionsType = {
  align: 'center',
  containScroll: 'trimSnaps'
}

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
const SANDBOXES = sandboxStaticSandboxes(
  CONFIG,
  'Guides/AlignmentsContainScroll'
)

export const EXAMPLE: ExamplesSetupType = {
  Carousel: CarouselAlignmentsContainScroll as ExamplesSetupType['Carousel'],
  config: CONFIG,
  sandboxes: SANDBOXES
}
