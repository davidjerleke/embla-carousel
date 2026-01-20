import { EmblaOptionsType } from 'embla-carousel'
import { arrayFromNumber } from 'utils/arrayFromNumber'
import { SandboxStaticSettingsType } from 'consts/sandbox'
import { sandboxStaticSandboxes } from 'components/Sandbox/sandboxStatic'
import { styledComponentsStylesToString } from 'utils/styledComponentStylesToString'
import { ExamplesSetupType } from 'consts/examples'
import CarouselFade from 'components/Sandbox/React/SandboxFilesSrc/Predefined/Fade/EmblaCarousel'
import { css } from 'styled-components'
import {
  ARROWS_STYLES,
  CONTROLS_STYLES,
  DOTS_STYLES,
  IMAGE_ROUNDED_STYLES,
  examplesCarouselStyles
} from 'components/Examples/examplesCarouselStyles'

const FADE_STYLES = css`
  .embla__slide__img {
    user-select: none;
  }
`

const ID = 'embla-carousel-fade'
const SLIDES = arrayFromNumber(5)
const OPTIONS: EmblaOptionsType = { loop: true, duration: 30 }
const STYLES = examplesCarouselStyles(
  '100%',
  '1rem',
  OPTIONS,
  styledComponentsStylesToString(
    IMAGE_ROUNDED_STYLES,
    CONTROLS_STYLES,
    ARROWS_STYLES,
    DOTS_STYLES,
    FADE_STYLES
  )
)
const CONFIG: SandboxStaticSettingsType = {
  id: ID,
  slides: SLIDES,
  options: OPTIONS,
  styles: STYLES
}
const SANDBOXES = sandboxStaticSandboxes(CONFIG, 'Predefined/Fade')

export const EXAMPLE: ExamplesSetupType = {
  Carousel: CarouselFade as ExamplesSetupType['Carousel'],
  config: CONFIG,
  sandboxes: SANDBOXES
}
