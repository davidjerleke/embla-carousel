import { EmblaOptionsType } from 'embla-carousel'
import { arrayFromNumber } from 'utils/arrayFromNumber'
import { SandboxStaticSettingsType } from 'consts/sandbox'
import { sandboxStaticSandboxes } from 'components/Sandbox/sandboxStatic'
import { styledComponentsStylesToString } from 'utils/styledComponentStylesToString'
import { ExamplesSetupType } from 'consts/examples'
import CarouselParallax from 'components/Sandbox/React/SandboxFilesSrc/Predefined/Parallax/EmblaCarousel'
import { css } from 'styled-components'
import {
  ARROWS_STYLES,
  CAROUSEL_SLIDE_RADIUS_STYLES,
  CONTROLS_STYLES,
  DOTS_STYLES,
  IMAGE_ROUNDED_STYLES,
  examplesCarouselStyles
} from 'components/Examples/examplesCarouselStyles'

const PARALLAX_STYLES = css`
  .embla__parallax {
    ${CAROUSEL_SLIDE_RADIUS_STYLES};
    height: 100%;
    overflow: hidden;
  }

  .embla__parallax__layer {
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .embla__parallax__img {
    max-width: none;
    flex: 0 0 calc(115% + (var(--slide-spacing) * 2));
    object-fit: cover;
  }
`

const ID = 'embla-carousel-parallax'
const SLIDES = arrayFromNumber(5)
const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true }
const STYLES = examplesCarouselStyles(
  '80%',
  '1rem',
  OPTIONS,
  styledComponentsStylesToString(
    IMAGE_ROUNDED_STYLES,
    CONTROLS_STYLES,
    ARROWS_STYLES,
    DOTS_STYLES,
    PARALLAX_STYLES
  )
)
const CONFIG: SandboxStaticSettingsType = {
  id: ID,
  slides: SLIDES,
  options: OPTIONS,
  styles: STYLES
}
const SANDBOXES = sandboxStaticSandboxes(CONFIG, 'Predefined/Parallax')

export const EXAMPLE: ExamplesSetupType = {
  Carousel: CarouselParallax as ExamplesSetupType['Carousel'],
  config: CONFIG,
  sandboxes: SANDBOXES
}
