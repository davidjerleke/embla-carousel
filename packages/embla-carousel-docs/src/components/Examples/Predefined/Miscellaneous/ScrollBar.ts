import { EmblaOptionsType } from 'embla-carousel'
import { arrayFromNumber } from 'utils/arrayFromNumber'
import { SandboxStaticSettingsType } from 'consts/sandbox'
import { sandboxStaticSandboxes } from 'components/Sandbox/sandboxStatic'
import { styledComponentsStylesToString } from 'utils/styledComponentStylesToString'
import { ExamplesSetupType } from 'consts/examples'
import CarouselScrollBar from 'components/Sandbox/React/SandboxFilesSrc/Predefined/ScrollBar/EmblaCarousel'
import { css } from 'styled-components'
import { BORDER_RADIUSES } from 'consts/border'
import { COLORS } from 'consts/themes'
import {
  ARROWS_STYLES,
  CAROUSEL_BUTTON_BASE_STYLES,
  CAROUSEL_CONTROLS_SPACING,
  CAROUSEL_SCROLLBAR_HEIGHT,
  CAROUSEL_SCROLLBAR_TRACK_HEIGHT,
  CAROUSEL_SLIDE_RADIUS_STYLES,
  CONTROLS_STYLES,
  SLIDE_NUMBER_STYLES,
  SNAP_DISPLAY_STYLES,
  examplesCarouselStyles
} from 'components/Examples/examplesCarouselStyles'

const SCROLL_BAR_STYLES = css`
  .embla__scrollbar {
    ${CAROUSEL_BUTTON_BASE_STYLES};
    display: flex;
    margin-top: ${CAROUSEL_CONTROLS_SPACING};
    width: 100%;
    padding: calc(
        (${CAROUSEL_SCROLLBAR_HEIGHT} - ${CAROUSEL_SCROLLBAR_TRACK_HEIGHT}) / 2
      )
      0;
  }

  .embla__scrollbar::-webkit-slider-runnable-track {
    ${CAROUSEL_SLIDE_RADIUS_STYLES}
    background: ${COLORS.DETAIL_MEDIUM_CONTRAST};
    height: ${CAROUSEL_SCROLLBAR_TRACK_HEIGHT};
  }

  .embla__scrollbar::-moz-range-track {
    ${CAROUSEL_SLIDE_RADIUS_STYLES}
    background: ${COLORS.DETAIL_MEDIUM_CONTRAST};
    height: ${CAROUSEL_SCROLLBAR_TRACK_HEIGHT};
  }

  .embla__scrollbar::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: ${CAROUSEL_SCROLLBAR_HEIGHT};
    height: ${CAROUSEL_SCROLLBAR_HEIGHT};
    border-radius: ${BORDER_RADIUSES.CIRCLE};
    border: 0;
    background: ${COLORS.TEXT_BODY};
    margin-top: calc(
      (${CAROUSEL_SCROLLBAR_HEIGHT} - ${CAROUSEL_SCROLLBAR_TRACK_HEIGHT}) / 2 *
        -1
    );
  }

  .embla__scrollbar::-moz-range-thumb {
    width: ${CAROUSEL_SCROLLBAR_HEIGHT};
    height: ${CAROUSEL_SCROLLBAR_HEIGHT};
    border-radius: ${BORDER_RADIUSES.CIRCLE};
    border: 0;
    background: ${COLORS.TEXT_BODY};
    margin-top: calc(
      (${CAROUSEL_SCROLLBAR_HEIGHT} - ${CAROUSEL_SCROLLBAR_TRACK_HEIGHT}) / 2 *
        -1
    );
  }
`

const ID = 'embla-carousel-scroll-bar'
const SLIDES = arrayFromNumber(10)
const OPTIONS: EmblaOptionsType = { dragFree: true }
const STYLES = examplesCarouselStyles(
  '50%',
  '1rem',
  OPTIONS,
  styledComponentsStylesToString(
    SLIDE_NUMBER_STYLES,
    CONTROLS_STYLES,
    ARROWS_STYLES,
    SNAP_DISPLAY_STYLES,
    SCROLL_BAR_STYLES
  )
)
const CONFIG: SandboxStaticSettingsType = {
  id: ID,
  slides: SLIDES,
  options: OPTIONS,
  styles: STYLES
}
const SANDBOXES = sandboxStaticSandboxes(CONFIG, 'Predefined/ScrollBar')

export const EXAMPLE: ExamplesSetupType = {
  Carousel: CarouselScrollBar as ExamplesSetupType['Carousel'],
  config: CONFIG,
  sandboxes: SANDBOXES
}
