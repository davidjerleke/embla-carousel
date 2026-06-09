import { OptionsType } from './Options'
import { CreatePluginType } from '@vendor/embla-carousel-v8/embla-carousel'
declare module '@vendor/embla-carousel-v8/embla-carousel' {
  interface EmblaPluginsType {
    fade: FadeType
  }
}
export type FadeType = CreatePluginType<{}, OptionsType>
export type FadeOptionsType = FadeType['options']
declare function Fade(userOptions?: FadeOptionsType): FadeType
declare namespace Fade {
  let globalOptions: FadeOptionsType | undefined
}
export default Fade
