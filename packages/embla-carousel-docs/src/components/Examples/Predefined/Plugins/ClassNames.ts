import { EmblaOptionsType } from 'embla-carousel'
import { arrayFromNumber } from 'utils/arrayFromNumber'
import { SandboxStaticSettingsType } from 'consts/sandbox'
import { sandboxStaticSandboxes } from 'components/Sandbox/sandboxStatic'
import { styledComponentsStylesToString } from 'utils/styledComponentStylesToString'
import { ExamplesSetupType } from 'consts/examples'
import CarouselClassNames from 'components/Sandbox/React/SandboxFilesSrc/Predefined/ClassNames/EmblaCarousel'
import { css } from 'styled-components'
import {
  ARROWS_STYLES,
  CONTROLS_STYLES,
  DOTS_STYLES,
  IMAGE_ROUNDED_STYLES,
  examplesCarouselStyles
} from 'components/Examples/examplesCarouselStyles'

const CLASS_NAMES_STYLES = css`
  .embla__slide {
    transition: opacity 0.2s ease-in-out;
  }

  .embla__slide:not(.is-snapped) {
    opacity: 0.16;
  }
`

const ID = 'embla-carousel-class-names'
const SLIDES = arrayFromNumber(5)
const OPTIONS: EmblaOptionsType = {}
const STYLES = examplesCarouselStyles(
  '70%',
  '1rem',
  OPTIONS,
  styledComponentsStylesToString(
    IMAGE_ROUNDED_STYLES,
    CONTROLS_STYLES,
    ARROWS_STYLES,
    DOTS_STYLES,
    CLASS_NAMES_STYLES
  )
)
const CONFIG: SandboxStaticSettingsType = {
  id: ID,
  slides: SLIDES,
  options: OPTIONS,
  styles: STYLES
}
const SANDBOXES = sandboxStaticSandboxes(CONFIG, 'Predefined/ClassNames')

export const EXAMPLE: ExamplesSetupType = {
  Carousel: CarouselClassNames as ExamplesSetupType['Carousel'],
  config: CONFIG,
  sandboxes: SANDBOXES
}
