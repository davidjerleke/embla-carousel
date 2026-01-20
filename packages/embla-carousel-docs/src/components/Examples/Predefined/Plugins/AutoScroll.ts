import { EmblaOptionsType } from 'embla-carousel'
import { arrayFromNumber } from 'utils/arrayFromNumber'
import { SandboxStaticSettingsType } from 'consts/sandbox'
import { sandboxStaticSandboxes } from 'components/Sandbox/sandboxStatic'
import { styledComponentsStylesToString } from 'utils/styledComponentStylesToString'
import { ExamplesSetupType } from 'consts/examples'
import CarouselAutoScroll from 'components/Sandbox/React/SandboxFilesSrc/Predefined/AutoScroll/EmblaCarousel'
import {
  ARROWS_STYLES,
  CONTROLS_STYLES,
  PLAY_BUTTON_STYLES,
  SLIDE_NUMBER_STYLES,
  examplesCarouselStyles
} from 'components/Examples/examplesCarouselStyles'

const ID = 'embla-carousel-auto-scroll'
const SLIDES = arrayFromNumber(8)
const OPTIONS: EmblaOptionsType = { loop: true }
const STYLES = examplesCarouselStyles(
  '45%',
  '1rem',
  OPTIONS,
  styledComponentsStylesToString(
    SLIDE_NUMBER_STYLES,
    CONTROLS_STYLES,
    ARROWS_STYLES,
    PLAY_BUTTON_STYLES
  )
)
const CONFIG: SandboxStaticSettingsType = {
  id: ID,
  slides: SLIDES,
  options: OPTIONS,
  styles: STYLES
}
const SANDBOXES = sandboxStaticSandboxes(CONFIG, 'Predefined/AutoScroll')

export const EXAMPLE: ExamplesSetupType = {
  Carousel: CarouselAutoScroll as ExamplesSetupType['Carousel'],
  config: CONFIG,
  sandboxes: SANDBOXES
}
