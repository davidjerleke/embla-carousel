import { EmblaOptionsType } from 'embla-carousel'
import { arrayFromNumber } from 'utils/arrayFromNumber'
import { SandboxStaticSettingsType } from 'consts/sandbox'
import { sandboxStaticSandboxes } from 'components/Sandbox/sandboxStatic'
import { styledComponentsStylesToString } from 'utils/styledComponentStylesToString'
import { ExamplesSetupType } from 'consts/examples'
import CarouselSlideSizesInteractive from 'components/Sandbox/React/SandboxFilesSrc/Guides/SlideSizesInteractive/EmblaCarousel'
import {
  ARROWS_STYLES,
  CONTROLS_STYLES,
  IMAGE_STYLES,
  SNAP_DISPLAY_STYLES,
  TEXT_INPUT_FORM_STYLES,
  examplesCarouselStyles
} from 'components/Examples/examplesCarouselStyles'

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
