import { OptionsType } from './Options.js'
import { CreatePluginType } from '@vendor/embla-carousel-v8/embla-carousel'
declare module '@vendor/embla-carousel-v8/embla-carousel' {
  interface EmblaPluginsType {
    autoHeight: AutoHeightType
  }
}
export type AutoHeightType = CreatePluginType<{}, OptionsType>
export type AutoHeightOptionsType = AutoHeightType['options']
declare function AutoHeight(userOptions?: AutoHeightOptionsType): AutoHeightType
declare namespace AutoHeight {
  let globalOptions: AutoHeightOptionsType | undefined
}
export default AutoHeight
