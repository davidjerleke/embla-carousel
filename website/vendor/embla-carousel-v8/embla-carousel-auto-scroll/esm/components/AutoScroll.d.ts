import { OptionsType } from './Options.js'
import { CreatePluginType } from '@vendor/embla-carousel-v8/embla-carousel'
declare module '@vendor/embla-carousel-v8/embla-carousel' {
  interface EmblaPluginsType {
    autoScroll: AutoScrollType
  }
  interface EmblaEventListType {
    autoScrollPlay: 'autoScroll:play'
    autoScrollStop: 'autoScroll:stop'
  }
}
export type AutoScrollType = CreatePluginType<
  {
    play: (delay?: number) => void
    stop: () => void
    reset: () => void
    isPlaying: () => boolean
  },
  OptionsType
>
export type AutoScrollOptionsType = AutoScrollType['options']
declare function AutoScroll(userOptions?: AutoScrollOptionsType): AutoScrollType
declare namespace AutoScroll {
  let globalOptions: AutoScrollOptionsType | undefined
}
export default AutoScroll
