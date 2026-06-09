import {
  EmblaCarouselType,
  EmblaOptionsType,
  EmblaPluginType
} from '@vendor/embla-carousel-v8/embla-carousel'
export type EmblaViewportRefType = <ViewportElement extends HTMLElement>(
  instance: ViewportElement | null
) => void
export type UseEmblaCarouselType = [
  EmblaViewportRefType,
  EmblaCarouselType | undefined
]
declare function useEmblaCarousel(
  options?: EmblaOptionsType,
  plugins?: EmblaPluginType[]
): UseEmblaCarouselType
declare namespace useEmblaCarousel {
  let globalOptions: EmblaOptionsType | undefined
}
export default useEmblaCarousel
