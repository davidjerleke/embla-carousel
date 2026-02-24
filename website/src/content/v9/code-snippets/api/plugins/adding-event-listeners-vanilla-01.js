import EmblaCarousel from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'

const wrapperNode = document.querySelector('.embla')
const viewportNode = wrapperNode.querySelector('.embla__viewport')

const emblaApi = EmblaCarousel(viewportNode, { loop: true }, [Autoplay()])

const logAutoplayStart = (emblaApi, event) => {
  console.log(`${event.type} fired`)
}

emblaApi.on('autoplay:play', logAutoplayStart)
emblaApi.plugins().autoplay?.play()
