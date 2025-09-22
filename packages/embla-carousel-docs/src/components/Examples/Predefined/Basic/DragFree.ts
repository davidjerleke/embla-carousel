import { EmblaOptionsType } from 'embla-carousel'
import { arrayFromNumber } from 'utils/arrayFromNumber'
import { SandboxStaticSettingsType } from 'consts/sandbox'
import { sandboxStaticSandboxes } from 'components/Sandbox/sandboxStatic'
import { styledComponentsStylesToString } from 'utils/styledComponentStylesToString'
import { ExamplesSetupType } from 'consts/examples'
import CarouselDragFree from 'components/Sandbox/React/SandboxFilesSrc/DragFree/EmblaCarousel'
import {
  ARROWS_STYLES,
  CONTROLS_STYLES,
  SLIDE_NUMBER_STYLES,
  SNAP_DISPLAY_STYLES,
  examplesCarouselStyles
} from 'components/Examples/examplesCarouselStyles'

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
const SANDBOXES = sandboxStaticSandboxes(CONFIG, 'DragFree')

export const EXAMPLE: ExamplesSetupType = {
  Carousel: CarouselDragFree as ExamplesSetupType['Carousel'],
  config: CONFIG,
  sandboxes: SANDBOXES
}
