import EmblaCarousel from 'embla-carousel'

const wrapperNode = document.querySelector('.embla')
const viewportNode = wrapperNode.querySelector('.embla__viewport')

const emblaApi = EmblaCarousel(viewportNode, {
  inViewMargin: '0px -20px 0px 0px'
})

const logSlidesInView = (emblaApi, event) => {
  console.log('Slides entered view: ' + event.detail.slidesEnterView)
}

emblaApi.on('slidesinview', logSlidesInView)
