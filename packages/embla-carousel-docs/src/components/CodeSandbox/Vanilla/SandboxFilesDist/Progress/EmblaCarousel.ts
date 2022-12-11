import EmblaCarousel, { EmblaOptionsType } from 'embla-carousel'
import { setupProgressBar } from './progress-bar'
import '../css/base.css'
import '../css/sandbox.css'
import '../css/embla.css'
 
const OPTIONS: EmblaOptionsType = {}
 
const emblaNode = <HTMLElement>document.querySelector('.embla')
const viewportNode = <HTMLElement>emblaNode.querySelector('.embla__viewport')
const progressNode = <HTMLElement>(
  emblaNode.querySelector('.embla__progress__bar')
)
 
const emblaApi = EmblaCarousel(viewportNode, OPTIONS)
const { applyProgress, removeProgress } = setupProgressBar(
  emblaApi,
  progressNode,
)
 
emblaApi
  .on('init', applyProgress)
  .on('reInit', applyProgress)
  .on('scroll', applyProgress)
  .on('destroy', removeProgress)
