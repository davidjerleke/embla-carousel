import { EmblaOptionsType } from '@vendor/embla-carousel-v8/embla-carousel'
import { arrayFromNumber } from '@/utils/array'
import { SandboxStaticSettingsType } from '@/content/v8/sandboxes/sandbox-utils'
import { sandboxStaticSandboxes } from '@/content/v8/sandboxes/sandbox-static'
import { styledComponentsStylesToString } from '@/utils/styled-components'
import { ExamplesSetupType } from '@/content/v8/examples/examples-utils'
import CarouselDragFree from '@/content/v8/sandboxes/React/SandboxFilesSrc/Predefined/DragFree/EmblaCarousel'
import {
  ARROWS_STYLES,
  CONTROLS_STYLES,
  SLIDE_NUMBER_STYLES,
  SNAP_DISPLAY_STYLES,
  examplesCarouselStyles
} from '@/content/v8/examples/examples-carousel-styles'

const ID = 'embla-carousel-drag-free'
const SLIDES = arrayFromNumber(16)
const OPTIONS: EmblaOptionsType = { dragFree: true }
const STYLES = examplesCarouselStyles(
  '50%',
  '1rem',
  OPTIONS,
  styledComponentsStylesToString(
    SLIDE_NUMBER_STYLES,
    CONTROLS_STYLES,
    ARROWS_STYLES,
    SNAP_DISPLAY_STYLES
  )
)
const CONFIG: SandboxStaticSettingsType = {
  id: ID,
  slides: SLIDES,
  options: OPTIONS,
  styles: STYLES
}
const SANDBOXES = sandboxStaticSandboxes(CONFIG, 'Predefined/DragFree')

export const EXAMPLE: ExamplesSetupType = {
  Carousel: CarouselDragFree as ExamplesSetupType['Carousel'],
  config: CONFIG,
  sandboxes: SANDBOXES
}
