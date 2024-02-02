import EmblaCarousel from 'embla-carousel'
import { setupProgressBar } from './EmblaCarouselProgressBar'
import { addPrevNextBtnsClickHandlers } from '../EmblaCarouselArrowButtons'
import '../css/base.css'
import '../css/sandbox.css'
import '../css/embla.css'

const OPTIONS = {}

const emblaNode = document.querySelector('.embla')
const viewportNode = emblaNode.querySelector('.embla__viewport')
const prevBtn = emblaNode.querySelector('.embla__button--prev')
const nextBtn = emblaNode.querySelector('.embla__button--next')
const progressNode = emblaNode.querySelector('.embla__progress__bar')

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
  .on('destroy', removeProgress)
  .on('destroy', removePrevNextBtnsClickHandlers)
