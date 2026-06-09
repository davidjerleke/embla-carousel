import EmblaCarousel from 'embla-carousel'

const wrapperNode = document.querySelector('.embla')
const viewportNode = wrapperNode.querySelector('.embla__viewport')
const emblaApi = EmblaCarousel(viewportNode, {
  slidesToScroll: 1,
  breakpoints: {
    '(min-width: 768px)': { slidesToScroll: 'auto' }
  }
})
