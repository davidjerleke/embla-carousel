import { EmblaOptionsType } from 'embla-carousel'
import { SandboxStaticSettingsType } from '@/content/v9/sandboxes/sandbox-utils'
import { sandboxStaticSandboxes } from '@/content/v9/sandboxes/sandbox-static'
import { styledComponentsStylesToString } from '@/utils/styled-components'
import { ExamplesSetupType } from '@/content/v9/examples/examples-utils'
import CarouselIosPicker from '@/content/v9/sandboxes/React/SandboxFilesSrc/Predefined/IosPicker/EmblaCarousel'
import { IOS_PICKER_STYLES } from '@/content/v9/examples/examples-carousel-styles'

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
