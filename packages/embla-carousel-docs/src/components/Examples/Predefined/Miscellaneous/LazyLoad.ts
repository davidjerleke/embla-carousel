import { EmblaOptionsType } from 'embla-carousel'
import { arrayFromNumber } from 'utils/arrayFromNumber'
import { SandboxStaticSettingsType } from 'consts/sandbox'
import { sandboxStaticSandboxes } from 'components/Sandbox/sandboxStatic'
import { styledComponentsStylesToString } from 'utils/styledComponentStylesToString'
import { ExamplesSetupType } from 'consts/examples'
import CarouselLazyLoad from 'components/Sandbox/React/SandboxFilesSrc/Predefined/LazyLoad/EmblaCarousel'
import { createSquareSizeStyles } from 'utils/createSquareSizeStyles'
import { BORDER_RADIUSES, BORDER_SIZES } from 'consts/border'
import { COLORS } from 'consts/themes'
import { css } from 'styled-components'
import {
  ARROWS_STYLES,
  CONTROLS_STYLES,
  DOTS_STYLES,
  IMAGE_ROUNDED_STYLES,
  examplesCarouselStyles
} from 'components/Examples/examplesCarouselStyles'

const LAZY_LOAD_STYLES = css`
  .embla__lazy-load {
    position: relative;
    height: 100%;
  }

  .embla__lazy-load__spinner {
    border: ${BORDER_SIZES.ACCENT_VERTICAL} solid
      rgba(${COLORS.TEXT_HIGH_CONTRAST_RGB_VALUE}, 0.2);
    border-left: ${BORDER_SIZES.ACCENT_VERTICAL} solid
      ${COLORS.TEXT_HIGH_CONTRAST};
    font-size: 1rem;
    display: inline-flex;
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

  .embla__lazy-load__spinner:after {
    border-radius: inherit;
    ${createSquareSizeStyles('5rem')}
  }

  .embla__lazy-load__img {
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }

  .embla__lazy-load--has-loaded .embla__lazy-load__img {
    opacity: 1;
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

const ID = 'embla-carousel-lazy-load'
const SLIDES = arrayFromNumber(5)
const OPTIONS: EmblaOptionsType = {}
const STYLES = examplesCarouselStyles(
  '100%',
  '1rem',
  OPTIONS,
  styledComponentsStylesToString(
    IMAGE_ROUNDED_STYLES,
    CONTROLS_STYLES,
    ARROWS_STYLES,
    DOTS_STYLES,
    LAZY_LOAD_STYLES
  )
)
const CONFIG: SandboxStaticSettingsType = {
  id: ID,
  slides: SLIDES,
  options: OPTIONS,
  styles: STYLES
}
const SANDBOXES = sandboxStaticSandboxes(CONFIG, 'Predefined/LazyLoad')

export const EXAMPLE: ExamplesSetupType = {
  Carousel: CarouselLazyLoad as ExamplesSetupType['Carousel'],
  config: CONFIG,
  sandboxes: SANDBOXES
}
