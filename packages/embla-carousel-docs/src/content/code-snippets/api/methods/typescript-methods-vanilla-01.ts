import EmblaCarousel, { EmblaCarouselType } from 'embla-carousel'

const wrapperNode = <HTMLElement>document.querySelector('.embla')
const viewportNode = <HTMLElement>wrapperNode.querySelector('.embla__viewport')

const emblaApi = EmblaCarousel(viewportNode, { loop: true })

const logSelectedSnap = (emblaApi: EmblaCarouselType): void => {
  console.log(emblaApi.selectedSnap())
}

emblaApi.on('select', logSelectedSnap)
