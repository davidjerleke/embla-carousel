import { EmblaOptionsType } from 'embla-carousel'
import { arrayFromNumber } from '@/utils/array'
import { SandboxStaticSettingsType } from '@/content/v9/sandboxes/sandbox-utils'
import { sandboxStaticSandboxes } from '@/content/v9/sandboxes/sandbox-static'
import { styledComponentsStylesToString } from '@/utils/styled-components'
import { ExamplesSetupType } from '@/content/v9/examples/examles-utils'
import CarouselSlideGapsCssGap from '@/content/v9/sandboxes/React/SandboxFilesSrc/Guides/SlideGapsCssGap/EmblaCarousel'
import {
  ARROWS_STYLES,
  CAROUSEL_DEFAULT_HEIGHT,
  CAROUSEL_MAX_WIDTH,
  CONTROLS_STYLES,
  IMAGE_STYLES,
  SNAP_DISPLAY_STYLES,
  TEXT_INPUT_FORM_STYLES,
  examplesCarouselStyles
} from '@/content/v9/examples/examples-carousel-styles'
import { css } from 'styled-components'
import { MEDIA } from '@/utils/breakpoints'

const ID = 'embla-carousel-slide-gaps-css-gap'
const SLIDES = arrayFromNumber(8)
const OPTIONS: EmblaOptionsType = { slidesToScroll: 'auto' }

const BASE_STYLES = css`
  .embla {
    max-width: ${CAROUSEL_MAX_WIDTH};
    margin: auto;

    --slide-height: ${CAROUSEL_DEFAULT_HEIGHT};
    --slide-size: 100%;
    --slide-gap: 0px;
  }

  .embla__viewport {
    overflow: hidden;
  }

  .embla__container {
    display: flex;
    touch-action: pan-y pinch-zoom;
    gap: var(--slide-gap);
  }

  .embla__slide {
    flex: 0 0 var(--slide-size);
    min-width: 0;
  }
`

const TEXT_INPUT_STYLES = css`
  .embla__text-input {
    max-width: 10rem;

    ${MEDIA.DESKTOP} {
      max-width: 15rem;
    }
  }
`

const STYLES = examplesCarouselStyles(
  '100%',
  '0px',
  OPTIONS,
  styledComponentsStylesToString(
    CONTROLS_STYLES,
    ARROWS_STYLES,
    IMAGE_STYLES,
    SNAP_DISPLAY_STYLES,
    TEXT_INPUT_FORM_STYLES,
    TEXT_INPUT_STYLES
  ),
  styledComponentsStylesToString(BASE_STYLES)
)
const CONFIG: SandboxStaticSettingsType = {
  id: ID,
  slides: SLIDES,
  options: OPTIONS,
  styles: STYLES
}
const SANDBOXES = sandboxStaticSandboxes(CONFIG, 'Guides/SlideGapsCssGap')

export const EXAMPLE: ExamplesSetupType = {
  Carousel: CarouselSlideGapsCssGap as ExamplesSetupType['Carousel'],
  config: CONFIG,
  sandboxes: SANDBOXES
}
