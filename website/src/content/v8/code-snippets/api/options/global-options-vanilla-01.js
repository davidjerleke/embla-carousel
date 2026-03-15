import EmblaCarousel from 'embla-carousel'

EmblaCarousel.globalOptions = { loop: true }

const wrapperNode = document.querySelector('.embla')
const viewportNode = wrapperNode.querySelector('.embla__viewport')

const emblaApi = EmblaCarousel(viewportNode, { align: 'start' })
