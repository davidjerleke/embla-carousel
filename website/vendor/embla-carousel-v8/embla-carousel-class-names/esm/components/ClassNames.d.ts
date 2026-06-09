import { OptionsType } from './Options.js'
import { CreatePluginType } from '@vendor/embla-carousel-v8/embla-carousel'
declare module '@vendor/embla-carousel-v8/embla-carousel' {
  interface EmblaPluginsType {
    classNames: ClassNamesType
  }
}
export type ClassNamesType = CreatePluginType<{}, OptionsType>
export type ClassNamesOptionsType = ClassNamesType['options']
declare function ClassNames(userOptions?: ClassNamesOptionsType): ClassNamesType
declare namespace ClassNames {
  let globalOptions: ClassNamesOptionsType | undefined
}
export default ClassNames
