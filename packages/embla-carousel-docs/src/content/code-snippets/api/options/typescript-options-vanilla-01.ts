import EmblaCarousel, { EmblaOptionsType } from 'embla-carousel'

const wrapperNode = <HTMLElement>document.querySelector('.embla')
const viewportNode = <HTMLElement>wrapperNode.querySelector('.embla__viewport')

const options: EmblaOptionsType = { loop: true }
const emblaApi = EmblaCarousel(viewportNode, options)
