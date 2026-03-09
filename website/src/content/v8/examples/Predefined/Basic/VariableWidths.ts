import { EmblaOptionsType } from '@vendor/embla-carousel-v8/embla-carousel'
import { arrayFromNumber } from '@/utils/array'
import { SandboxStaticSettingsType } from '@/content/v8/sandboxes/sandbox-utils'
import { sandboxStaticSandboxes } from '@/content/v8/sandboxes/sandbox-static'
import { styledComponentsStylesToString } from '@/utils/styled-components'
import { ExamplesSetupType } from '@/content/v8/examples/examples-utils'
import CarouselDragFree from '@/content/v8/sandboxes/React/SandboxFilesSrc/Predefined/DragFree/EmblaCarousel'
import { css } from 'styled-components'
import {
  ARROWS_STYLES,
  CONTROLS_STYLES,
  SNAP_DISPLAY_STYLES,
  SLIDE_NUMBER_STYLES,
  examplesCarouselStyles
} from '@/content/v8/examples/examples-carousel-styles'

const VARIABLE_WIDTH_STYLES = css`
  .embla__slide:nth-child(1) {
    flex: 0 0 60%;
  }
  .embla__slide:nth-child(2) {
    flex: 0 0 40%;
  }
  .embla__slide:nth-child(3) {
    flex: 0 0 30%;
  }
  .embla__slide:nth-child(4) {
    flex: 0 0 90%;
  }
  .embla__slide:nth-child(5) {
    flex: 0 0 35%;
  }
  .embla__slide:nth-child(6) {
    flex: 0 0 55%;
  }
  .embla__slide:nth-child(7) {
    flex: 0 0 85%;
  }
  .embla__slide:nth-child(8) {
    flex: 0 0 50%;
  }
  .embla__slide:nth-child(9) {
    flex: 0 0 35%;
  }
`

const ID = 'embla-carousel-variable-widths'
const SLIDES = arrayFromNumber(9)
const OPTIONS: EmblaOptionsType = {}
const STYLES = examplesCarouselStyles(
  '100%',
  '1rem',
  OPTIONS,
  styledComponentsStylesToString(
    SLIDE_NUMBER_STYLES,
    CONTROLS_STYLES,
    ARROWS_STYLES,
    SNAP_DISPLAY_STYLES,
    VARIABLE_WIDTH_STYLES
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
