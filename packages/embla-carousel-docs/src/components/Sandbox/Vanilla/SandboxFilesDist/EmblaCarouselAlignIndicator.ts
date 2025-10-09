import { EmblaCarouselType } from 'embla-carousel/components/EmblaCarousel'
import { EmblaOptionsType } from 'embla-carousel/components/Options'

export const addAlignIndicatorHandler = (
  emblaApi: EmblaCarouselType,
  alignIndicatorNode: HTMLElement
): void => {
  let currentAlign: EmblaOptionsType['align'] = 'center'

  emblaApi.on('reinit', () => {
    const nextAlign = emblaApi.internalEngine().options.align || 'center'

    const currentAlignClass = `embla__align-indicator--${currentAlign}`
    alignIndicatorNode.classList.remove(currentAlignClass)

    const nextAlignClass = `embla__align-indicator--${nextAlign}`
    alignIndicatorNode.classList.add(nextAlignClass)

    currentAlign = nextAlign
  })
}
