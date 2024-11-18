import { EmblaCarouselType } from 'embla-carousel/components/EmblaCarousel'
import { DelayOptionType, RootNodeType } from './Options'

export function normalizeDelay(
  emblaApi: EmblaCarouselType,
  delay: DelayOptionType
): number[] {
  const scrollSnaps = emblaApi.scrollSnapList()

  if (typeof delay === 'number') {
    return scrollSnaps.map(() => delay)
  }
  return delay(scrollSnaps, emblaApi)
}

export function getAutoplayRootNode(
  emblaApi: EmblaCarouselType,
  rootNode: RootNodeType
): HTMLElement {
  const emblaRootNode = emblaApi.rootNode()
  return (rootNode && rootNode(emblaRootNode)) || emblaRootNode
}
