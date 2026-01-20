import { css } from 'styled-components'
import { EmblaOptionsType } from 'embla-carousel'
import { arrayFromNumber } from 'utils/arrayFromNumber'
import { SandboxStaticSettingsType } from 'consts/sandbox'
import { sandboxStaticSandboxes } from 'components/Sandbox/sandboxStatic'
import { styledComponentsStylesToString } from 'utils/styledComponentStylesToString'
import { ExamplesSetupType } from 'consts/examples'
import CarouselSlideSizesVariableWidth from 'components/Sandbox/React/SandboxFilesSrc/Guides/SlideSizesVariableWidths/EmblaCarousel'
import {
  ARROWS_STYLES,
  CONTROLS_STYLES,
  IMAGE_STYLES,
  examplesCarouselStyles
} from 'components/Examples/examplesCarouselStyles'

const VARIABLE_WIDTH_STYLES = css`
  .embla__slide:nth-child(1) {
    flex: 0 0 60%;
  }
  .embla__slide:nth-child(2) {
    flex: 0 0 40%;
  }
  .embla__slide:nth-child(3) {
    flex: 0 0 80%;
  }
  .embla__slide:nth-child(4) {
    flex: 0 0 25%;
  }
  .embla__slide:nth-child(5) {
    flex: 0 0 70%;
  }
`

const ID = 'embla-carousel-slide-sizes-variable-widths'
const SLIDES = arrayFromNumber(5)
const OPTIONS: EmblaOptionsType = {}

const STYLES = examplesCarouselStyles(
  '70%',
  '0',
  OPTIONS,
  styledComponentsStylesToString(
    CONTROLS_STYLES,
    ARROWS_STYLES,
    IMAGE_STYLES,
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
  'Guides/SlideSizesVariableWidths'
)

export const EXAMPLE: ExamplesSetupType = {
  Carousel: CarouselSlideSizesVariableWidth as ExamplesSetupType['Carousel'],
  config: CONFIG,
  sandboxes: SANDBOXES
}
