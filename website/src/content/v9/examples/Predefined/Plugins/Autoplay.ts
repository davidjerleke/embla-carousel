import { EmblaOptionsType } from 'embla-carousel'
import { arrayFromNumber } from '@/utils/array'
import { SandboxStaticSettingsType } from '@/content/v9/sandboxes/sandbox-utils'
import { sandboxStaticSandboxes } from '@/content/v9/sandboxes/sandbox-static'
import { styledComponentsStylesToString } from '@/utils/styled-components'
import { ExamplesSetupType } from '@/content/v9/examples/examles-utils'
import CarouselAutoplay from '@/content/v9/sandboxes/React/SandboxFilesSrc/Predefined/Autoplay/EmblaCarousel'
import { css } from 'styled-components'
import {
  ARROWS_STYLES,
  CONTROLS_STYLES,
  PLAY_BUTTON_STYLES,
  PROGRESS_STYLES,
  SLIDE_NUMBER_STYLES,
  examplesCarouselStyles
} from '@/content/v9/examples/examples-carousel-styles'

const AUTOPLAY_STYLES = css`
  .embla__controls {
    grid-template-columns: auto 1fr auto;
  }

  .embla__progress {
    justify-self: center;
    transition: opacity 0.3s ease-in-out;
    width: 8rem;
  }

  .embla__progress--hidden {
    opacity: 0;
  }

  .embla__progress__bar {
    animation-name: autoplay-progress;
    animation-timing-function: linear;
    animation-iteration-count: 1;
  }

  .embla__progress--hidden .embla__progress__bar {
    animation-play-state: paused;
  }

  @keyframes autoplay-progress {
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(100%, 0, 0);
    }
  }
`

const ID = 'embla-carousel-autoplay'
const SLIDES = arrayFromNumber(5)
const OPTIONS: EmblaOptionsType = { loop: true }
const STYLES = examplesCarouselStyles(
  '70%',
  '1rem',
  OPTIONS,
  styledComponentsStylesToString(
    SLIDE_NUMBER_STYLES,
    CONTROLS_STYLES,
    ARROWS_STYLES,
    PLAY_BUTTON_STYLES,
    PROGRESS_STYLES,
    AUTOPLAY_STYLES
  )
)
const CONFIG: SandboxStaticSettingsType = {
  id: ID,
  slides: SLIDES,
  options: OPTIONS,
  styles: STYLES
}
const SANDBOXES = sandboxStaticSandboxes(CONFIG, 'Predefined/Autoplay')

export const EXAMPLE: ExamplesSetupType = {
  Carousel: CarouselAutoplay as ExamplesSetupType['Carousel'],
  config: CONFIG,
  sandboxes: SANDBOXES
}
