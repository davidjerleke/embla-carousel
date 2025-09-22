import { EmblaOptionsType } from 'embla-carousel'
import { arrayFromNumber } from 'utils/arrayFromNumber'
import { SandboxStaticSettingsType } from 'consts/sandbox'
import { sandboxStaticSandboxes } from 'components/Sandbox/sandboxStatic'
import { styledComponentsStylesToString } from 'utils/styledComponentStylesToString'
import { ExamplesSetupType } from 'consts/examples'
import CarouselParallax from 'components/Sandbox/React/SandboxFilesSrc/Parallax/EmblaCarousel'
import {
  ARROWS_STYLES,
  CONTROLS_STYLES,
  DOTS_STYLES,
  IMAGE_STYLES,
  PARALLAX_STYLES,
  examplesCarouselStyles
} from 'components/Examples/examplesCarouselStyles'

const ID = 'embla-carousel-parallax'
const SLIDES = arrayFromNumber(5)
const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true }
const STYLES = examplesCarouselStyles(
  '80%',
  '1rem',
  OPTIONS,
  styledComponentsStylesToString(
    IMAGE_STYLES,
    CONTROLS_STYLES,
    ARROWS_STYLES,
    DOTS_STYLES,
    PARALLAX_STYLES
  )
)
const CONFIG: SandboxStaticSettingsType = {
  id: ID,
  slides: SLIDES,
  options: OPTIONS,
  styles: STYLES
}
const SANDBOXES = sandboxStaticSandboxes(CONFIG, 'Parallax')

export const EXAMPLE: ExamplesSetupType = {
  Carousel: CarouselParallax as ExamplesSetupType['Carousel'],
  config: CONFIG,
  sandboxes: SANDBOXES
}
