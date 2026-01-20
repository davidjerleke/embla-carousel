import { css } from 'styled-components'
import { EmblaOptionsType } from 'embla-carousel'
import { arrayFromNumber } from 'utils/arrayFromNumber'
import { SandboxStaticSettingsType } from 'consts/sandbox'
import { sandboxStaticSandboxes } from 'components/Sandbox/sandboxStatic'
import { styledComponentsStylesToString } from 'utils/styledComponentStylesToString'
import { ExamplesSetupType } from 'consts/examples'
import CarouselGroupingSlidesVariableWidths from 'components/Sandbox/React/SandboxFilesSrc/Guides/GroupingSlidesVariableWidths/EmblaCarousel'
import {
  ARROWS_STYLES,
  CONTROLS_STYLES,
  GROUP_INDICATOR_STYLES,
  IMAGE_STYLES,
  RADIO_INPUT_FORM_STYLES,
  SNAP_DISPLAY_STYLES,
  examplesCarouselStyles
} from 'components/Examples/examplesCarouselStyles'

const VARIABLE_WIDTH_STYLES = css`
  .embla__slide:nth-child(1) {
    flex: 0 0 55%;
  }
  .embla__slide:nth-child(2) {
    flex: 0 0 40%;
  }
  .embla__slide:nth-child(3) {
    flex: 0 0 80%;
  }
  .embla__slide:nth-child(4) {
    flex: 0 0 60%;
  }
  .embla__slide:nth-child(5) {
    flex: 0 0 30%;
  }
  .embla__slide:nth-child(6) {
    flex: 0 0 25%;
  }
  .embla__slide:nth-child(7) {
    flex: 0 0 35%;
  }
  .embla__slide:nth-child(8) {
    flex: 0 0 30%;
  }
  .embla__slide:nth-child(9) {
    flex: 0 0 90%;
  }
  .embla__slide:nth-child(10) {
    flex: 0 0 50%;
  }
  .embla__slide:nth-child(11) {
    flex: 0 0 35%;
  }
`

const ID = 'embla-carousel-grouping-slides-variable-widths'
const SLIDES = arrayFromNumber(11)
const OPTIONS: EmblaOptionsType = { slidesToScroll: 1 }

const STYLES = examplesCarouselStyles(
  '40%',
  '1rem',
  OPTIONS,
  styledComponentsStylesToString(
    CONTROLS_STYLES,
    ARROWS_STYLES,
    IMAGE_STYLES,
    RADIO_INPUT_FORM_STYLES,
    SNAP_DISPLAY_STYLES,
    GROUP_INDICATOR_STYLES,
    VARIABLE_WIDTH_STYLES
  )
)
const CONFIG: SandboxStaticSettingsType = {
  id: ID,
  slides: SLIDES,
  options: OPTIONS,
  styles: STYLES
}
const SANDBOXES = sandboxStaticSandboxes(
  CONFIG,
  'Guides/GroupingSlidesVariableWidths'
)

export const EXAMPLE: ExamplesSetupType = {
  Carousel:
    CarouselGroupingSlidesVariableWidths as ExamplesSetupType['Carousel'],
  config: CONFIG,
  sandboxes: SANDBOXES
}
