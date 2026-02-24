import EmblaCarousel, { EmblaPluginType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'

const wrapperNode = <HTMLElement>document.querySelector('.embla')
const viewportNode = <HTMLElement>wrapperNode.querySelector('.embla__viewport')

const plugins: EmblaPluginType[] = [Autoplay()]
const emblaApi = EmblaCarousel(viewportNode, { loop: true }, plugins)

emblaApi.plugins().autoplay?.play()
