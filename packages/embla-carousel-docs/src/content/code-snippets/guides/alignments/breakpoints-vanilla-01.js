import EmblaCarousel from 'embla-carousel'

const wrapperNode = document.querySelector('.embla')
const viewportNode = wrapperNode.querySelector('.embla__viewport')
const emblaApi = EmblaCarousel(viewportNode, {
  align: 'center',
  breakpoints: {
    '(min-width: 768px)': { align: 'start' }
  }
})
