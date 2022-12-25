import EmblaCarousel, { EmblaOptionsType } from 'embla-carousel'
import {
  addPrevNextBtnsClickHandlers,
  addTogglePrevNextBtnsActive,
  addDotBtnsAndClickHandlers,
} from './arrows-dots-buttons'
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

const removePrevNextBtnsClickHandlers = addPrevNextBtnsClickHandlers(
  emblaApi,
  prevBtn,
  nextBtn,
)
const removeTogglePrevNextBtnsActive = addTogglePrevNextBtnsActive(
  emblaApi,
  prevBtn,
  nextBtn,
)
const removeDotBtnsAndClickHandlers = addDotBtnsAndClickHandlers(
  emblaApi,
  dotsNode,
)

emblaApi
  .on('destroy', removePrevNextBtnsClickHandlers)
  .on('destroy', removeTogglePrevNextBtnsActive)
  .on('destroy', removeDotBtnsAndClickHandlers)
