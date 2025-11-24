// CLIENT
import EmblaCarousel from 'embla-carousel'

const wrapperNode = document.querySelector('.embla')
const viewportNode = wrapperNode.querySelector('.embla__viewport')
const emblaApi = EmblaCarousel(viewportNode, {
  loop: true,
  ssr: slides.map(() => 50), // Each slide is 50% of the viewport width
  breakpoints: {
    '(min-width: 768px)': {
      ssr: slides.map(() => 70) // Each slide is 70% of the viewport width
    }
  }
})
