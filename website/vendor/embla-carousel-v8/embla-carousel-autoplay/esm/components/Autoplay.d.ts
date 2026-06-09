import { OptionsType } from './Options.js'
import { CreatePluginType } from '@vendor/embla-carousel-v8/embla-carousel'
declare module '@vendor/embla-carousel-v8/embla-carousel' {
  interface EmblaPluginsType {
    autoplay: AutoplayType
  }
  interface EmblaEventListType {
    autoplayPlay: 'autoplay:play'
    autoplayStop: 'autoplay:stop'
    autoplaySelect: 'autoplay:select'
    autoplayTimerSet: 'autoplay:timerset'
    autoplayTimerStopped: 'autoplay:timerstopped'
  }
}
export type AutoplayType = CreatePluginType<
  {
    play: (jump?: boolean) => void
    stop: () => void
    reset: () => void
    isPlaying: () => boolean
    timeUntilNext: () => number | null
  },
  OptionsType
>
export type AutoplayOptionsType = AutoplayType['options']
declare function Autoplay(userOptions?: AutoplayOptionsType): AutoplayType
declare namespace Autoplay {
  let globalOptions: AutoplayOptionsType | undefined
}
export default Autoplay
