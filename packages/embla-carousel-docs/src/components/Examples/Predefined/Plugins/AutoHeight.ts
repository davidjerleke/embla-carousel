import { EmblaOptionsType } from 'embla-carousel'
import { arrayFromNumber } from 'utils/arrayFromNumber'
import { SandboxStaticSettingsType } from 'consts/sandbox'
import { sandboxStaticSandboxes } from 'components/Sandbox/sandboxStatic'
import { styledComponentsStylesToString } from 'utils/styledComponentStylesToString'
import { ExamplesSetupType } from 'consts/examples'
import CarouselAutoHeight from 'components/Sandbox/React/SandboxFilesSrc/Predefined/AutoHeight/EmblaCarousel'
import { css } from 'styled-components'
import {
  ARROWS_STYLES,
  CAROUSEL_DEFAULT_HEIGHT,
  CONTROLS_STYLES,
  DOTS_STYLES,
  SLIDE_NUMBER_STYLES,
  examplesCarouselStyles
} from 'components/Examples/examplesCarouselStyles'

const AUTO_HEIGHT_STYLES = css`
  .embla__container {
    align-items: flex-start;
  }

  .embla__slide:nth-child(1) > .embla__slide__number {
    height: ${CAROUSEL_DEFAULT_HEIGHT};
  }
  .embla__slide:nth-child(2) > .embla__slide__number {
    height: calc(${CAROUSEL_DEFAULT_HEIGHT} + 4rem);
  }
  .embla__slide:nth-child(3) > .embla__slide__number {
    height: calc(${CAROUSEL_DEFAULT_HEIGHT} - 2rem);
  }
  .embla__slide:nth-child(4) > .embla__slide__number {
    height: calc(${CAROUSEL_DEFAULT_HEIGHT} + 2rem);
  }
  .embla__slide:nth-child(5) > .embla__slide__number {
    height: ${CAROUSEL_DEFAULT_HEIGHT};
  }
`

const ID = 'embla-carousel-auto-height'
const SLIDES = arrayFromNumber(5)
const OPTIONS: EmblaOptionsType = {}
const STYLES = examplesCarouselStyles(
  '100%',
  '1rem',
  OPTIONS,
  styledComponentsStylesToString(
    SLIDE_NUMBER_STYLES,
    CONTROLS_STYLES,
    ARROWS_STYLES,
    DOTS_STYLES,
    AUTO_HEIGHT_STYLES
  )
)
const CONFIG: SandboxStaticSettingsType = {
  id: ID,
  slides: SLIDES,
  options: OPTIONS,
  styles: STYLES
}
const SANDBOXES = sandboxStaticSandboxes(CONFIG, 'Predefined/AutoHeight')

export const EXAMPLE: ExamplesSetupType = {
  Carousel: CarouselAutoHeight as ExamplesSetupType['Carousel'],
  config: CONFIG,
  sandboxes: SANDBOXES
}
