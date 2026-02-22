import { EmblaOptionsType } from 'embla-carousel'
import { arrayFromNumber } from '@/utils/array'
import { SandboxStaticSettingsType } from '@/content/v9/sandboxes/sandbox-utils'
import { sandboxStaticSandboxes } from '@/content/v9/sandboxes/sandbox-static'
import { styledComponentsStylesToString } from '@/utils/styled-components'
import { ExamplesSetupType } from '@/content/v9/examples/examples-utils'
import CarouselAccessibility from '@/content/v9/sandboxes/React/SandboxFilesSrc/Predefined/Accessibility/EmblaCarousel'
import {
  ACCESSIBILITY_STYLES,
  ARROWS_STYLES,
  CONTROLS_STYLES,
  DOTS_STYLES,
  SLIDE_NUMBER_STYLES,
  examplesCarouselStyles
} from '@/content/v9/examples/examples-carousel-styles'

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
