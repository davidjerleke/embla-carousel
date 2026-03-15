import EmblaCarousel from 'embla-carousel'

const wrapperNode = document.querySelector('.embla')
const viewportNode = wrapperNode.querySelector('.embla__viewport')

let loopEnabled = true
const emblaApi = EmblaCarousel(viewportNode, { loop: loopEnabled })

function toggleLoop() {
  loopEnabled = !loopEnabled
  emblaApi.reInit({ loop: loopEnabled })
}
