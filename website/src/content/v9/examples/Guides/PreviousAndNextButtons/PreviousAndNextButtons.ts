import { EmblaOptionsType } from 'embla-carousel'
import { arrayFromNumber } from '@/utils/array'
import { SandboxStaticSettingsType } from '@/content/v9/sandboxes/sandbox-utils'
import { sandboxStaticSandboxes } from '@/content/v9/sandboxes/sandbox-static'
import { styledComponentsStylesToString } from '@/utils/styled-components'
import { ExamplesSetupType } from '@/content/v9/examples/examples-utils'
import CarouselPreviousAndNextButtons from '@/content/v9/sandboxes/React/SandboxFilesSrc/Guides/PreviousAndNextButtons/EmblaCarousel'
import {
  ARROWS_STYLES,
  CONTROLS_STYLES,
  IMAGE_STYLES,
  SNAP_DISPLAY_STYLES,
  RADIO_INPUT_FORM_STYLES,
  examplesCarouselStyles
} from '@/content/v9/examples/examples-carousel-styles'

const ID = 'embla-carousel-previous-and-next-buttons'
const SLIDES = arrayFromNumber(8)
const OPTIONS: EmblaOptionsType = { loop: false }

const STYLES = examplesCarouselStyles(
  '70%',
  '2rem',
  OPTIONS,
  styledComponentsStylesToString(
    CONTROLS_STYLES,
    ARROWS_STYLES,
    IMAGE_STYLES,
    SNAP_DISPLAY_STYLES,
    RADIO_INPUT_FORM_STYLES
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
  'Guides/PreviousAndNextButtons'
)

export const EXAMPLE: ExamplesSetupType = {
  Carousel: CarouselPreviousAndNextButtons as ExamplesSetupType['Carousel'],
  config: CONFIG,
  sandboxes: SANDBOXES
}
