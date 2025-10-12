import EmblaCarousel from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'

const wrapperNode = document.querySelector('.embla')
const viewportNode = wrapperNode.querySelector('.embla__viewport')
const prevButtonNode = wrapperNode.querySelector('.embla__prev')
const nextButtonNode = wrapperNode.querySelector('.embla__next')

const emblaApi = EmblaCarousel(viewportNode, { loop: false }, [Autoplay()])

prevButtonNode.addEventListener('click', () => emblaApi.scrollToPrev(), false)
nextButtonNode.addEventListener('click', () => emblaApi.scrollToNext(), false)

emblaApi.plugins().autoplay?.play()
