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

applyProgress()

emblaApi
  .on('reinit', applyProgress)
  .on('scroll', applyProgress)
  .on('slidefocus', applyProgress)
  .on('destroy', removeProgress)
  .on('destroy', removePrevNextBtnsClickHandlers)
