import { EmblaOptionsType } from 'embla-carousel'
import { arrayFromNumber } from '@/utils/array'
import { SandboxStaticSettingsType } from '@/content/v9/sandboxes/sandbox-utils'
import { sandboxStaticSandboxes } from '@/content/v9/sandboxes/sandbox-static'
import { styledComponentsStylesToString } from '@/utils/styled-components'
import { ExamplesSetupType } from '@/content/v9/examples/examples-utils'
import CarouselAutoHeight from '@/content/v9/sandboxes/React/SandboxFilesSrc/Predefined/AutoHeight/EmblaCarousel'
import { css } from 'styled-components'
import {
  ARROWS_STYLES,
  CAROUSEL_DEFAULT_HEIGHT,
  CONTROLS_STYLES,
  DOTS_STYLES,
  SLIDE_NUMBER_STYLES,
  examplesCarouselStyles
} from '@/content/v9/examples/examples-carousel-styles'

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
