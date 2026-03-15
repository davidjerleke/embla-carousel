// @ts-nocheck
import EmblaCarousel, {
  EmblaCarouselType,
  EmblaEventType
} from 'embla-carousel'

const wrapperNode = <HTMLElement>document.querySelector('.embla')
const viewportNode = <HTMLElement>wrapperNode.querySelector('.embla__viewport')

const emblaApi = EmblaCarousel(viewportNode, { loop: true })

const logEmblaEvent = (
  emblaApi: EmblaCarouselType,
  eventName: EmblaEventType
): void => {
  console.log(`Embla just triggered ${eventName}!`)
}

emblaApi.on('select', logEmblaEvent)
