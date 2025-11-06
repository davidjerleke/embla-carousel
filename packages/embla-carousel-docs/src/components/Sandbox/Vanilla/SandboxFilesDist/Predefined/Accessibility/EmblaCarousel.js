import EmblaCarousel from 'embla-carousel'
import Accessibility from 'embla-carousel-accessibility'
import { addDotButtonAndClickHandlers } from '../../EmblaCarouselDotButton'
import { addPrevNextButtonClickHandlers } from '../../EmblaCarouselArrowButtons'
import { addAccessibility } from './EmblaCarouselAccessibility'
import '../css/base.css'
import '../css/sandbox.css'
import '../css/embla.css'

const OPTIONS = {}

const emblaNode = document.querySelector('.embla')
const viewportNode = emblaNode.querySelector('.embla__viewport')
const prevBtn = emblaNode.querySelector('.embla__button--prev')
const nextBtn = emblaNode.querySelector('.embla__button--next')
const dotsNode = document.querySelector('.embla__dots')

const emblaApi = EmblaCarousel(viewportNode, OPTIONS, [
  Accessibility({
    announceChanges: true,
    rootNode: (emblaRoot) => emblaRoot.parentElement
  })
])

addPrevNextButtonClickHandlers(emblaApi, prevBtn, nextBtn)
addDotButtonAndClickHandlers(emblaApi, dotsNode)
addAccessibility(emblaApi)
