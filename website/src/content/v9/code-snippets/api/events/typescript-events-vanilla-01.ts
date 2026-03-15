import EmblaCarousel, {
  EmblaCarouselType,
  EmblaEventModelType
} from 'embla-carousel'

const wrapperNode = <HTMLElement>document.querySelector('.embla')
const viewportNode = <HTMLElement>wrapperNode.querySelector('.embla__viewport')

const emblaApi = EmblaCarousel(viewportNode, { loop: true })

const logSelectEvent = (
  emblaApi: EmblaCarouselType,
  event: EmblaEventModelType<'select'>
): void => {
  const { sourceSnap, targetSnap } = event.detail

  console.log('Previous snap index: ', sourceSnap)
  console.log('Current snap index: ', targetSnap)
}

emblaApi.on('select', logSelectEvent)
