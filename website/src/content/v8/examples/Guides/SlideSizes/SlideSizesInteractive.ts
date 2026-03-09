import { EmblaOptionsType } from '@vendor/embla-carousel-v8/embla-carousel'
import { arrayFromNumber } from '@/utils/array'
import { SandboxStaticSettingsType } from '@/content/v8/sandboxes/sandbox-utils'
import { sandboxStaticSandboxes } from '@/content/v8/sandboxes/sandbox-static'
import { styledComponentsStylesToString } from '@/utils/styled-components'
import { ExamplesSetupType } from '@/content/v8/examples/examples-utils'
import CarouselSlideSizesInteractive from '@/content/v8/sandboxes/React/SandboxFilesSrc/Guides/SlideSizesInteractive/EmblaCarousel'
import {
  ARROWS_STYLES,
  CONTROLS_STYLES,
  IMAGE_STYLES,
  SNAP_DISPLAY_STYLES,
  TEXT_INPUT_FORM_STYLES,
  examplesCarouselStyles
} from '@/content/v8/examples/examples-carousel-styles'

const ID = 'embla-carousel-slide-sizes-interactive'
const SLIDES = arrayFromNumber(8)
const OPTIONS: EmblaOptionsType = {}

const STYLES = examplesCarouselStyles(
  '70%',
  '0',
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
const SANDBOXES = sandboxStaticSandboxes(CONFIG, 'Guides/SlideSizesInteractive')

export const EXAMPLE: ExamplesSetupType = {
  Carousel: CarouselSlideSizesInteractive as ExamplesSetupType['Carousel'],
  config: CONFIG,
  sandboxes: SANDBOXES
}
