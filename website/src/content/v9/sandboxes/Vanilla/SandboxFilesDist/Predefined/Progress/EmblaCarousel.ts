import EmblaCarousel, { EmblaOptionsType } from 'embla-carousel'
import { setupProgressBar } from './EmblaCarouselProgressBar'
import { addPrevNextButtonClickHandlers } from '../../EmblaCarouselArrowButtons'
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
const applyProgress = setupProgressBar(emblaApi, progressNode)

addPrevNextButtonClickHandlers(emblaApi, prevBtn, nextBtn)
applyProgress()

emblaApi
  .on('reinit', applyProgress)
  .on('scroll', applyProgress)
  .on('slidefocus', applyProgress)
