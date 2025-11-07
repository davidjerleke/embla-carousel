import { EmblaOptionsType } from 'embla-carousel'
import { arrayFromNumber } from 'utils/arrayFromNumber'
import { SandboxStaticSettingsType } from 'consts/sandbox'
import { sandboxStaticSandboxes } from 'components/Sandbox/sandboxStatic'
import { styledComponentsStylesToString } from 'utils/styledComponentStylesToString'
import { ExamplesSetupType } from 'consts/examples'
import CarouselAccessibility from 'components/Sandbox/React/SandboxFilesSrc/Predefined/Accessibility/EmblaCarousel'
import {
  ACCESSIBILITY_STYLES,
  ARROWS_STYLES,
  CONTROLS_STYLES,
  DOTS_STYLES,
  SLIDE_NUMBER_STYLES,
  examplesCarouselStyles
} from 'components/Examples/examplesCarouselStyles'

const ID = 'embla-carousel-accessibility'
const SLIDES = arrayFromNumber(6)
const OPTIONS: EmblaOptionsType = {}
const STYLES = examplesCarouselStyles(
  '70%',
  '1rem',
  OPTIONS,
  styledComponentsStylesToString(
    SLIDE_NUMBER_STYLES,
    CONTROLS_STYLES,
    ARROWS_STYLES,
    DOTS_STYLES,
    ACCESSIBILITY_STYLES
  )
)
const CONFIG: SandboxStaticSettingsType = {
  id: ID,
  slides: SLIDES,
  options: OPTIONS,
  styles: STYLES
}
const SANDBOXES = sandboxStaticSandboxes(CONFIG, 'Predefined/Accessibility')

export const EXAMPLE: ExamplesSetupType = {
  Carousel: CarouselAccessibility as ExamplesSetupType['Carousel'],
  config: CONFIG,
  sandboxes: SANDBOXES
}
