import EmblaCarousel from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'

const wrapperNode = document.querySelector('.embla')
const viewportNode = wrapperNode.querySelector('.embla__viewport')

const emblaApi = EmblaCarousel(viewportNode, { loop: true }, [Autoplay()])

const logPluginEvent = (emblaApi, eventName) => {
  console.log(`Autoplay just triggered ${eventName}!`)
}

emblaApi.on('autoplay:stop', logPluginEvent)
