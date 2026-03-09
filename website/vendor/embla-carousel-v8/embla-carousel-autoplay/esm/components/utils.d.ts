import { EmblaCarouselType } from '@vendor/embla-carousel-v8/embla-carousel/components/EmblaCarousel'
import { DelayOptionType, RootNodeType } from './Options.js'
export declare function normalizeDelay(
  emblaApi: EmblaCarouselType,
  delay: DelayOptionType
): number[]
export declare function getAutoplayRootNode(
  emblaApi: EmblaCarouselType,
  rootNode: RootNodeType
): HTMLElement
