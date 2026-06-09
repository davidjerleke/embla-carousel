import EmblaCarousel from 'embla-carousel'

const wrapperNode = document.querySelector('.embla')
const viewportNode = wrapperNode.querySelector('.embla__viewport')

const emblaApi = EmblaCarousel(viewportNode, { loop: true })

const logSlidesInView = (emblaApi) => {
  console.log(emblaApi.slidesInView())
}

emblaApi.on('slidesInView', logSlidesInView)
