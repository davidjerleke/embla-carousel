import { EmblaOptionsType } from 'embla-carousel'
import { SandboxStaticSettingsType } from 'consts/sandbox'
import { sandboxStaticSandboxes } from 'components/Sandbox/sandboxStatic'
import { styledComponentsStylesToString } from 'utils/styledComponentStylesToString'
import { ExamplesSetupType } from 'consts/examples'
import CarouselIosPicker from 'components/Sandbox/React/SandboxFilesSrc/Predefined/IosPicker/EmblaCarousel'
import { IOS_PICKER_STYLES } from 'components/Examples/examplesCarouselStyles'

const ID = 'embla-carousel-ios-style-picker'
const OPTIONS: EmblaOptionsType = {}
const STYLES = styledComponentsStylesToString(IOS_PICKER_STYLES)
const CONFIG: SandboxStaticSettingsType = {
  id: ID,
  slides: [],
  options: OPTIONS,
  styles: STYLES
}
const SANDBOXES = sandboxStaticSandboxes(CONFIG, 'Predefined/IosPicker')

export const EXAMPLE: ExamplesSetupType = {
  Carousel: CarouselIosPicker as ExamplesSetupType['Carousel'],
  config: CONFIG,
  sandboxes: SANDBOXES
}
