import EmblaCarousel, { EmblaOptionsType } from 'embla-carousel'
import { setupTweenOpacity } from './EmblaCarouselTweenOpacity'
import { addDotBtnsAndClickHandlers } from '../EmblaCarouselDotButton'
import { addPrevNextBtnsClickHandlers } from '../EmblaCarouselArrowButtons'
import '../css/base.css'
import '../css/sandbox.css'
import '../css/embla.css'

const OPTIONS: EmblaOptionsType = {}

const emblaNode = <HTMLElement>document.querySelector('.embla')
const viewportNode = <HTMLElement>emblaNode.querySelector('.embla__viewport')
const prevBtn = <HTMLElement>emblaNode.querySelector('.embla__button--prev')
const nextBtn = <HTMLElement>emblaNode.querySelector('.embla__button--next')
const dotsNode = <HTMLElement>document.querySelector('.embla__dots')

const emblaApi = EmblaCarousel(viewportNode, OPTIONS)
const removeTweenOpacity = setupTweenOpacity(emblaApi)

const removePrevNextBtnsClickHandlers = addPrevNextBtnsClickHandlers(
  emblaApi,
  prevBtn,
  nextBtn
)
const removeDotBtnsAndClickHandlers = addDotBtnsAndClickHandlers(
  emblaApi,
  dotsNode
)

emblaApi
  .on('destroy', removeTweenOpacity)
  .on('destroy', removePrevNextBtnsClickHandlers)
  .on('destroy', removeDotBtnsAndClickHandlers)
