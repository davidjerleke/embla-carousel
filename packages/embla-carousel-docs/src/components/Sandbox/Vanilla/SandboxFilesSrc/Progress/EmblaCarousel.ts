import EmblaCarousel, { EmblaOptionsType } from 'embla-carousel'
import { setupProgressBar } from './EmblaCarouselProgressBar'
import { addPrevNextBtnsClickHandlers } from '../EmblaCarouselArrowButtons'
import '../css/base.css'
import '../css/sandbox.css'
import '../css/embla.css'

const OPTIONS: EmblaOptionsType = {}

const emblaNode = <HTMLElement>document.querySelector('.embla')
const viewportNode = <HTMLElement>emblaNode.querySelector('.embla__viewport')
const prevBtn = <HTMLElement>emblaNode.querySelector('.embla__button--prev')
const nextBtn = <HTMLElement>emblaNode.querySelector('.embla__button--next')
const progressNode = <HTMLElement>(
  emblaNode.querySelector('.embla__progress__bar')
)

const emblaApi = EmblaCarousel(viewportNode, OPTIONS)
const { applyProgress, removeProgress } = setupProgressBar(
  emblaApi,
  progressNode
)

const removePrevNextBtnsClickHandlers = addPrevNextBtnsClickHandlers(
  emblaApi,
  prevBtn,
  nextBtn
)

emblaApi
  .on('init', applyProgress)
  .on('reInit', applyProgress)
  .on('scroll', applyProgress)
  .on('slideFocus', applyProgress)
  .on('destroy', removeProgress)
  .on('destroy', removePrevNextBtnsClickHandlers)
