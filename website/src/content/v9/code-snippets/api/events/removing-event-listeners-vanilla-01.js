import EmblaCarousel from 'embla-carousel'

const wrapperNode = document.querySelector('.embla')
const viewportNode = wrapperNode.querySelector('.embla__viewport')

const emblaApi = EmblaCarousel(viewportNode, { loop: true })

const logSlidesInViewOnce = (emblaApi, event) => {
  console.log(`${event.type}: ${event.detail.slidesInView}`)
  emblaApi.off('slidesinview', logSlidesInViewOnce)
}

emblaApi.on('slidesinview', logSlidesInViewOnce)
