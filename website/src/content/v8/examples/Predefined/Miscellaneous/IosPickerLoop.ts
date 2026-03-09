import { EmblaOptionsType } from '@vendor/embla-carousel-v8/embla-carousel'
import { SandboxStaticSettingsType } from '@/content/v8/sandboxes/sandbox-utils'
import { sandboxStaticSandboxes } from '@/content/v8/sandboxes/sandbox-static'
import { styledComponentsStylesToString } from '@/utils/styled-components'
import { ExamplesSetupType } from '@/content/v8/examples/examples-utils'
import CarouselIosPicker from '@/content/v8/sandboxes/React/SandboxFilesSrc/Predefined/IosPicker/EmblaCarousel'
import { IOS_PICKER_STYLES } from '@/content/v8/examples/examples-carousel-styles'

const ID = 'embla-carousel-ios-style-picker-loop'
const OPTIONS: EmblaOptionsType = { loop: true }
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
