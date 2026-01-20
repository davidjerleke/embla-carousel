import { EmblaOptionsType } from 'embla-carousel'
import { arrayFromNumber } from 'utils/arrayFromNumber'
import { SandboxStaticSettingsType } from 'consts/sandbox'
import { sandboxStaticSandboxes } from 'components/Sandbox/sandboxStatic'
import { styledComponentsStylesToString } from 'utils/styledComponentStylesToString'
import { ExamplesSetupType } from 'consts/examples'
import CarouselThumbs from 'components/Sandbox/React/SandboxFilesSrc/Predefined/Thumbs/EmblaCarousel'
import { css } from 'styled-components'
import { MEDIA } from 'consts/breakpoints'
import { FONT_SIZES, FONT_WEIGHTS } from 'consts/fontSizes'
import { COLORS } from 'consts/themes'
import {
  CAROUSEL_BORDER_STYLES,
  CAROUSEL_BUTTON_BASE_STYLES,
  CAROUSEL_SLIDE_RADIUS_STYLES,
  CAROUSEL_THUMB_SLIDES_HEIGHT,
  CAROUSEL_THUMB_SLIDES_SPACING,
  SLIDE_NUMBER_STYLES,
  examplesCarouselStyles
} from 'components/Examples/examplesCarouselStyles'

const THUMBS_STYLES = css`
  .embla-thumbs {
    --thumbs-slide-spacing: ${CAROUSEL_THUMB_SLIDES_SPACING};
    --thumbs-slide-height: ${CAROUSEL_THUMB_SLIDES_HEIGHT};
    margin-top: var(--thumbs-slide-spacing);
  }

  .embla-thumbs__viewport {
    overflow: hidden;
  }

  .embla-thumbs__container {
    display: flex;
    flex-direction: row;
    margin-left: calc(var(--thumbs-slide-spacing) * -1);
  }

  .embla-thumbs__slide {
    flex: 0 0 22%;
    min-width: 0;
    padding-left: var(--thumbs-slide-spacing);
  }

  ${MEDIA.MIN_XS} {
    .embla-thumbs__slide {
      flex: 0 0 15%;
    }
  }

  .embla-thumbs__slide__number {
    ${CAROUSEL_SLIDE_RADIUS_STYLES};
    ${CAROUSEL_BUTTON_BASE_STYLES};
    ${CAROUSEL_BORDER_STYLES};
    font-size: ${FONT_SIZES.H4};
    font-weight: ${FONT_WEIGHTS.SEMI_BOLD};
    color: ${COLORS.DETAIL_HIGH_CONTRAST};
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--thumbs-slide-height);
    width: 100%;
  }

  .embla-thumbs__slide--selected .embla-thumbs__slide__number {
    color: ${COLORS.TEXT_BODY};
  }
`

const ID = 'embla-carousel-thumbs'
const SLIDES = arrayFromNumber(10)
const OPTIONS: EmblaOptionsType = {}
const STYLES = examplesCarouselStyles(
  '100%',
  '1rem',
  OPTIONS,
  styledComponentsStylesToString(SLIDE_NUMBER_STYLES, THUMBS_STYLES)
)
const CONFIG: SandboxStaticSettingsType = {
  id: ID,
  slides: SLIDES,
  options: OPTIONS,
  styles: STYLES
}
const SANDBOXES = sandboxStaticSandboxes(CONFIG, 'Predefined/Thumbs')

export const EXAMPLE: ExamplesSetupType = {
  Carousel: CarouselThumbs as ExamplesSetupType['Carousel'],
  config: CONFIG,
  sandboxes: SANDBOXES
}
