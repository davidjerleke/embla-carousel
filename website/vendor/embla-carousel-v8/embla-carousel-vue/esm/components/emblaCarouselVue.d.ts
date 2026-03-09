import { Ref, MaybeRef } from 'vue'
import {
  EmblaCarouselType,
  EmblaOptionsType,
  EmblaPluginType
} from '@vendor/embla-carousel-v8/embla-carousel'
export type EmblaCarouselVueType = [
  Ref<HTMLElement | undefined>,
  Ref<EmblaCarouselType | undefined>
]
declare function emblaCarouselVue(
  options?: MaybeRef<EmblaOptionsType>,
  plugins?: MaybeRef<EmblaPluginType[]>
): EmblaCarouselVueType
declare namespace emblaCarouselVue {
  let globalOptions: EmblaOptionsType | undefined
}
export default emblaCarouselVue
