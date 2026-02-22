import { EmblaOptionsType } from 'embla-carousel'
import { arrayFromNumber } from '@/utils/array'
import { SandboxStaticSettingsType } from '@/content/v9/sandboxes/sandbox-utils'
import { sandboxStaticSandboxes } from '@/content/v9/sandboxes/sandbox-static'
import { styledComponentsStylesToString } from '@/utils/styled-components'
import { ExamplesSetupType } from '@/content/v9/examples/examples-utils'
import CarouselProgress from '@/content/v9/sandboxes/React/SandboxFilesSrc/Predefined/Progress/EmblaCarousel'
import {
  ARROWS_STYLES,
  CONTROLS_STYLES,
  PROGRESS_STYLES,
  SLIDE_NUMBER_STYLES,
  examplesCarouselStyles
} from '@/content/v9/examples/examples-carousel-styles'

const ID = 'embla-carousel-progress'
const SLIDES = arrayFromNumber(5)
const OPTIONS: EmblaOptionsType = { dragFree: true }
const STYLES = examplesCarouselStyles(
  '65%',
  '1rem',
  OPTIONS,
  styledComponentsStylesToString(
    SLIDE_NUMBER_STYLES,
    CONTROLS_STYLES,
    ARROWS_STYLES,
    PROGRESS_STYLES
  )
)
const CONFIG: SandboxStaticSettingsType = {
  id: ID,
  slides: SLIDES,
  options: OPTIONS,
  styles: STYLES
}
const SANDBOXES = sandboxStaticSandboxes(CONFIG, 'Predefined/Progress')

export const EXAMPLE: ExamplesSetupType = {
  Carousel: CarouselProgress as ExamplesSetupType['Carousel'],
  config: CONFIG,
  sandboxes: SANDBOXES
}
