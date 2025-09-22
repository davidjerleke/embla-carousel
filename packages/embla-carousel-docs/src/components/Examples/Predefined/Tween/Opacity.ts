import { EmblaOptionsType } from 'embla-carousel'
import { arrayFromNumber } from 'utils/arrayFromNumber'
import { SandboxStaticSettingsType } from 'consts/sandbox'
import { sandboxStaticSandboxes } from 'components/Sandbox/sandboxStatic'
import { styledComponentsStylesToString } from 'utils/styledComponentStylesToString'
import { ExamplesSetupType } from 'consts/examples'
import CarouselOpacity from 'components/Sandbox/React/SandboxFilesSrc/Opacity/EmblaCarousel'
import {
  ARROWS_STYLES,
  CONTROLS_STYLES,
  DOTS_STYLES,
  IMAGE_STYLES,
  examplesCarouselStyles
} from 'components/Examples/examplesCarouselStyles'

const ID = 'embla-carousel-opacity'
const SLIDES = arrayFromNumber(5)
const OPTIONS: EmblaOptionsType = { loop: true }
const STYLES = examplesCarouselStyles(
  '70%',
  '1rem',
  OPTIONS,
  styledComponentsStylesToString(
    IMAGE_STYLES,
    CONTROLS_STYLES,
    ARROWS_STYLES,
    DOTS_STYLES
  )
)
const CONFIG: SandboxStaticSettingsType = {
  id: ID,
  slides: SLIDES,
  options: OPTIONS,
  styles: STYLES
}
const SANDBOXES = sandboxStaticSandboxes(CONFIG, 'Opacity')

export const EXAMPLE: ExamplesSetupType = {
  Carousel: CarouselOpacity as ExamplesSetupType['Carousel'],
  config: CONFIG,
  sandboxes: SANDBOXES
}
