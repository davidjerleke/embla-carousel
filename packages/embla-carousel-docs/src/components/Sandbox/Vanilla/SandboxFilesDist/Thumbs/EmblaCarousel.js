import EmblaCarousel from 'embla-carousel'
import {
  addThumbButtonClickHandlers,
  addToggleThumbButtonsActive
} from './EmblaCarouselThumbsButton'
import '../css/base.css'
import '../css/sandbox.css'
import '../css/embla.css'

const OPTIONS = {}
const OPTIONS_THUMBS = {
  containScroll: 'keepSnaps',
  dragFree: true
}

const viewportNodeMainCarousel = document.querySelector('.embla__viewport')
const viewportNodeThumbCarousel = document.querySelector(
  '.embla-thumbs__viewport'
)
const emblaApiMain = EmblaCarousel(viewportNodeMainCarousel, OPTIONS)
const emblaApiThumb = EmblaCarousel(viewportNodeThumbCarousel, OPTIONS_THUMBS)

addThumbButtonClickHandlers(emblaApiMain, emblaApiThumb)
addToggleThumbButtonsActive(emblaApiMain, emblaApiThumb)
