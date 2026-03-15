import EmblaCarousel from 'embla-carousel'

const wrapperNode = document.querySelector('.embla')
const viewportNode = wrapperNode.querySelector('.embla__viewport')

const emblaApi = EmblaCarousel(viewportNode, { loop: true })

const logSlidesInViewOnce = (emblaApi) => {
  console.log(emblaApi.slidesInView())
  emblaApi.off('slidesInView', logSlidesInViewOnce)
}

emblaApi.on('slidesInView', logSlidesInViewOnce)
