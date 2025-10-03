import { EmblaOptionsType } from 'embla-carousel'
import { arrayFromNumber } from 'utils/arrayFromNumber'
import { SandboxStaticSettingsType } from 'consts/sandbox'
import { sandboxStaticSandboxes } from 'components/Sandbox/sandboxStatic'
import { styledComponentsStylesToString } from 'utils/styledComponentStylesToString'
import { ExamplesSetupType } from 'consts/examples'
import CarouselDefault from 'components/Sandbox/React/SandboxFilesSrc/Predefined/Default/EmblaCarousel'
import { css } from 'styled-components'
import { MEDIA } from 'consts/breakpoints'
import {
  CAROUSEL_DEFAULT_HEIGHT,
  ARROWS_STYLES,
  CONTROLS_STYLES,
  DOTS_STYLES,
  SLIDE_NUMBER_STYLES,
  examplesCarouselStyles
} from 'components/Examples/examplesCarouselStyles'

const SLIDES_PER_VIEW_STYLES = css`
  .embla {
    max-width: 70rem;
    margin: auto;

    --slide-height: ${CAROUSEL_DEFAULT_HEIGHT};
    --slide-spacing: 1rem;
    --slide-size: 100%;
    --slide-spacing-sm: 1.6rem;
    --slide-size-sm: 50%;
    --slide-spacing-lg: 2rem;
    --slide-size-lg: calc(100% / 3);
  }

  .embla__viewport {
    overflow: hidden;
  }

  .embla__container {
    display: flex;
    touch-action: pan-y pinch-zoom;
    margin-left: calc(var(--slide-spacing) * -1);
  }

  ${MEDIA.MIN_SM} {
    .embla__container {
      margin-left: calc(var(--slide-spacing-sm) * -1);
    }
  }
  ${MEDIA.MIN_LG} {
    .embla__container {
      margin-left: calc(var(--slide-spacing-lg) * -1);
    }
  }

  .embla__slide {
    min-width: 0;
    flex: 0 0 var(--slide-size);
    padding-left: var(--slide-spacing);
  }

  ${MEDIA.MIN_SM} {
    .embla__slide {
      flex: 0 0 var(--slide-size-sm);
      padding-left: var(--slide-spacing-sm);
    }
  }
  ${MEDIA.MIN_LG} {
    .embla__slide {
      flex: 0 0 var(--slide-size-lg);
      padding-left: var(--slide-spacing-lg);
    }
  }
`

const ID = 'embla-carousel-slides-per-view'
const SLIDES = arrayFromNumber(6)
const OPTIONS: EmblaOptionsType = { align: 'start' }
const STYLES = examplesCarouselStyles(
  '100%',
  '1rem',
  OPTIONS,
  styledComponentsStylesToString(
    SLIDE_NUMBER_STYLES,
    CONTROLS_STYLES,
    ARROWS_STYLES,
    DOTS_STYLES
  ),
  styledComponentsStylesToString(SLIDES_PER_VIEW_STYLES)
)
const CONFIG: SandboxStaticSettingsType = {
  id: ID,
  slides: SLIDES,
  options: OPTIONS,
  styles: STYLES
}
const SANDBOXES = sandboxStaticSandboxes(CONFIG, 'Predefined/Default')

export const EXAMPLE: ExamplesSetupType = {
  Carousel: CarouselDefault as ExamplesSetupType['Carousel'],
  config: CONFIG,
  sandboxes: SANDBOXES
}
