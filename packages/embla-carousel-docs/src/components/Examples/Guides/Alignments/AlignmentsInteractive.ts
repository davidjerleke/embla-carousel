import { EmblaOptionsType } from 'embla-carousel'
import { arrayFromNumber } from 'utils/arrayFromNumber'
import { SandboxStaticSettingsType } from 'consts/sandbox'
import { sandboxStaticSandboxes } from 'components/Sandbox/sandboxStatic'
import { styledComponentsStylesToString } from 'utils/styledComponentStylesToString'
import { ExamplesSetupType } from 'consts/examples'
import CarouselAlignmentsInteractive from 'components/Sandbox/React/SandboxFilesSrc/Guides/AlignmentsInteractive/EmblaCarousel'
import {
  ALIGNMENT_INDICATOR_STYLES,
  ARROWS_STYLES,
  CONTROLS_STYLES,
  IMAGE_STYLES,
  RADIO_INPUT_FORM_STYLES,
  SNAP_DISPLAY_STYLES,
  examplesCarouselStyles
} from 'components/Examples/examplesCarouselStyles'

const ID = 'embla-carousel-alignments-interactive'
const SLIDES = arrayFromNumber(8)
const OPTIONS: EmblaOptionsType = { align: 'center', loop: true }

const STYLES = examplesCarouselStyles(
  '70%',
  '2rem',
  OPTIONS,
  styledComponentsStylesToString(
    CONTROLS_STYLES,
    ARROWS_STYLES,
    IMAGE_STYLES,
    RADIO_INPUT_FORM_STYLES,
    ALIGNMENT_INDICATOR_STYLES,
    SNAP_DISPLAY_STYLES
  )
)
const CONFIG: SandboxStaticSettingsType = {
  id: ID,
  slides: SLIDES,
  options: OPTIONS,
  styles: STYLES
}
const SANDBOXES = sandboxStaticSandboxes(CONFIG, 'Guides/AlignmentsInteractive')

export const EXAMPLE: ExamplesSetupType = {
  Carousel: CarouselAlignmentsInteractive as ExamplesSetupType['Carousel'],
  config: CONFIG,
  sandboxes: SANDBOXES
}
