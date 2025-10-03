import { css } from 'styled-components'
import { EmblaOptionsType } from 'embla-carousel'
import { arrayFromNumber } from 'utils/arrayFromNumber'
import { SandboxStaticSettingsType } from 'consts/sandbox'
import { sandboxStaticSandboxes } from 'components/Sandbox/sandboxStatic'
import { styledComponentsStylesToString } from 'utils/styledComponentStylesToString'
import { ExamplesSetupType } from 'consts/examples'
import CarouselSlideSizesInteractive from 'components/Sandbox/React/SandboxFilesSrc/Guides/SlideSizesInteractive/EmblaCarousel'
import { SPACINGS } from 'consts/spacings'
import { FONT_SIZES } from 'consts/fontSizes'
import {
  ARROWS_STYLES,
  CAROUSEL_CONTROLS_SPACING,
  CONTROLS_STYLES,
  DEFAULT_BUTTON_STYLES,
  IMAGE_STYLES,
  INPUT_STYLES,
  examplesCarouselStyles
} from 'components/Examples/examplesCarouselStyles'

const ID = 'embla-carousel-slide-sizes-interactive'
const SLIDES = arrayFromNumber(8)
const OPTIONS: EmblaOptionsType = {}
const FORM_STYLES = css`
  .embla__form {
    display: flex;
    justify-content: space-between;
    gap: ${SPACINGS.TWO};
    margin-bottom: ${CAROUSEL_CONTROLS_SPACING};
  }

  .embla__label {
    display: flex;
    align-items: center;
    font-size: ${FONT_SIZES.COMPLEMENTARY};
    gap: ${SPACINGS.ONE};
  }

  .embla__submit {
    ${DEFAULT_BUTTON_STYLES};
  }
`

const STYLES = examplesCarouselStyles(
  '70%',
  '0',
  OPTIONS,
  styledComponentsStylesToString(
    CONTROLS_STYLES,
    ARROWS_STYLES,
    IMAGE_STYLES,
    FORM_STYLES,
    INPUT_STYLES
  )
)
const CONFIG: SandboxStaticSettingsType = {
  id: ID,
  slides: SLIDES,
  options: OPTIONS,
  styles: STYLES
}
const SANDBOXES = sandboxStaticSandboxes(CONFIG, 'Guides/SlideSizesInteractive')

export const EXAMPLE: ExamplesSetupType = {
  Carousel: CarouselSlideSizesInteractive as ExamplesSetupType['Carousel'],
  config: CONFIG,
  sandboxes: SANDBOXES
}
