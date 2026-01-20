import EmblaCarousel from 'embla-carousel'
import { setupTweenParallax } from './EmblaCarouselTweenParallax'
import { addDotButtonAndClickHandlers } from '../../EmblaCarouselDotButton'
import { addPrevNextButtonClickHandlers } from '../../EmblaCarouselArrowButtons'
import '../css/base.css'
import '../css/sandbox.css'
import '../css/embla.css'

const OPTIONS = {}

const emblaNode = document.querySelector('.embla')
const viewportNode = emblaNode.querySelector('.embla__viewport')
const prevBtn = emblaNode.querySelector('.embla__button--prev')
const nextBtn = emblaNode.querySelector('.embla__button--next')
const dotsNode = document.querySelector('.embla__dots')

const emblaApi = EmblaCarousel(viewportNode, OPTIONS)

setupTweenParallax(emblaApi)
addPrevNextButtonClickHandlers(emblaApi, prevBtn, nextBtn)
addDotButtonAndClickHandlers(emblaApi, dotsNode)
