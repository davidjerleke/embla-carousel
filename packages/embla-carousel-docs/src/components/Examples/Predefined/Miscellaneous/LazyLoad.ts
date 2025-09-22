import { EmblaOptionsType } from 'embla-carousel'
import { arrayFromNumber } from 'utils/arrayFromNumber'
import { SandboxStaticSettingsType } from 'consts/sandbox'
import { sandboxStaticSandboxes } from 'components/Sandbox/sandboxStatic'
import { styledComponentsStylesToString } from 'utils/styledComponentStylesToString'
import { ExamplesSetupType } from 'consts/examples'
import CarouselLazyLoad from 'components/Sandbox/React/SandboxFilesSrc/LazyLoad/EmblaCarousel'
import {
  ARROWS_STYLES,
  CONTROLS_STYLES,
  DOTS_STYLES,
  IMAGE_STYLES,
  LAZY_LOAD_STYLES,
  examplesCarouselStyles
} from 'components/Examples/examplesCarouselStyles'

const ID = 'embla-carousel-lazy-load'
const SLIDES = arrayFromNumber(5)
const OPTIONS: EmblaOptionsType = {}
const STYLES = examplesCarouselStyles(
  '100%',
  '1rem',
  OPTIONS,
  styledComponentsStylesToString(
    IMAGE_STYLES,
    CONTROLS_STYLES,
    ARROWS_STYLES,
    DOTS_STYLES,
    LAZY_LOAD_STYLES
  )
)
const CONFIG: SandboxStaticSettingsType = {
  id: ID,
  slides: SLIDES,
  options: OPTIONS,
  styles: STYLES
}
const SANDBOXES = sandboxStaticSandboxes(CONFIG, 'LazyLoad')

export const EXAMPLE: ExamplesSetupType = {
  Carousel: CarouselLazyLoad as ExamplesSetupType['Carousel'],
  config: CONFIG,
  sandboxes: SANDBOXES
}
