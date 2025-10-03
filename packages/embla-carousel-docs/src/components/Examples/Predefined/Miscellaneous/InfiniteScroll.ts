import { EmblaOptionsType } from 'embla-carousel'
import { arrayFromNumber } from 'utils/arrayFromNumber'
import { SandboxStaticSettingsType } from 'consts/sandbox'
import { sandboxStaticSandboxes } from 'components/Sandbox/sandboxStatic'
import { styledComponentsStylesToString } from 'utils/styledComponentStylesToString'
import { ExamplesSetupType } from 'consts/examples'
import CarouselInfiniteScroll from 'components/Sandbox/React/SandboxFilesSrc/Predefined/InfiniteScroll/EmblaCarousel'
import { css } from 'styled-components'
import { BORDER_SIZES, BORDER_RADIUSES } from 'consts/border'
import { COLORS } from 'consts/themes'
import { createSquareSizeStyles } from 'utils/createSquareSizeStyles'
import {
  ARROWS_STYLES,
  CONTROLS_STYLES,
  SLIDE_NUMBER_STYLES,
  SNAP_DISPLAY_STYLES,
  examplesCarouselStyles
} from 'components/Examples/examplesCarouselStyles'

const INFINITE_SCROLL_STYLES = css`
  .embla-infinite-scroll {
    position: relative;
    flex: 0 0 15rem;
    min-width: 0;
    height: var(--slide-height);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .embla-infinite-scroll__spinner {
    display: none;
    border: ${BORDER_SIZES.ACCENT_VERTICAL} solid
      rgba(${COLORS.TEXT_HIGH_CONTRAST_RGB_VALUE}, 0.2);
    border-left: ${BORDER_SIZES.ACCENT_VERTICAL} solid
      ${COLORS.TEXT_HIGH_CONTRAST};
    font-size: 1rem;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    text-indent: -9999em;
    animation: loading 1.1s infinite linear;
    border-radius: ${BORDER_RADIUSES.CIRCLE};
    ${createSquareSizeStyles('5rem')}
  }

  .embla-infinite-scroll__spinner:after {
    border-radius: inherit;
    ${createSquareSizeStyles('5rem')}
  }

  .embla-infinite-scroll--loading-more > .embla-infinite-scroll__spinner {
    display: inline-flex;
  }

  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const ID = 'embla-carousel-infinite-scroll'
const SLIDES = arrayFromNumber(5)
const OPTIONS: EmblaOptionsType = {
  dragFree: true,
  containScroll: 'keepSnaps',
  slideChanges: true,
  resize: false
}
const STYLES = examplesCarouselStyles(
  '100%',
  '1rem',
  OPTIONS,
  styledComponentsStylesToString(
    SLIDE_NUMBER_STYLES,
    CONTROLS_STYLES,
    ARROWS_STYLES,
    SNAP_DISPLAY_STYLES,
    INFINITE_SCROLL_STYLES
  )
)
const CONFIG: SandboxStaticSettingsType = {
  id: ID,
  slides: SLIDES,
  options: OPTIONS,
  styles: STYLES
}
const SANDBOXES = sandboxStaticSandboxes(CONFIG, 'Predefined/InfiniteScroll')

export const EXAMPLE: ExamplesSetupType = {
  Carousel: CarouselInfiniteScroll as ExamplesSetupType['Carousel'],
  config: CONFIG,
  sandboxes: SANDBOXES
}
