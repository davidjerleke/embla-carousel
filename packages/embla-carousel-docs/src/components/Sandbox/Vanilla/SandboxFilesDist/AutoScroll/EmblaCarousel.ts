import EmblaCarousel, { EmblaOptionsType } from 'embla-carousel'
import AutoScroll from 'embla-carousel-auto-scroll'
import { addPrevNextButtonClickHandlers } from '../EmblaCarouselArrowButtons'
import {
  addPlayButtonListeners,
  addNavButtonListeners
} from './EmblaCarouselAutoScroll'
import '../css/base.css'
import '../css/sandbox.css'
import '../css/embla.css'

const OPTIONS: EmblaOptionsType = {}

const emblaNode = <HTMLElement>document.querySelector('.embla')
const viewportNode = <HTMLElement>emblaNode.querySelector('.embla__viewport')
const prevBtn = <HTMLElement>emblaNode.querySelector('.embla__button--prev')
const nextBtn = <HTMLElement>emblaNode.querySelector('.embla__button--next')
const playBtn = <HTMLElement>document.querySelector('.embla__play')

const emblaApi = EmblaCarousel(viewportNode, OPTIONS, [AutoScroll()])

addPrevNextButtonClickHandlers(emblaApi, prevBtn, nextBtn)
addPlayButtonListeners(emblaApi, playBtn)
addNavButtonListeners(emblaApi, prevBtn, nextBtn)

emblaApi.plugins().autoScroll?.play()
