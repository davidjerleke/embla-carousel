import EmblaCarousel from 'embla-carousel'

const wrapperNode = document.querySelector('.embla')
const viewportNode = wrapperNode.querySelector('.embla__viewport')

const emblaApi = EmblaCarousel(viewportNode, { loop: true })

const logSlidesInView = (emblaApi, event) => {
  console.log(`${event.type}: ${emblaApi.slidesInView()}`)
}

emblaApi.on('slidesinview', logSlidesInView)
