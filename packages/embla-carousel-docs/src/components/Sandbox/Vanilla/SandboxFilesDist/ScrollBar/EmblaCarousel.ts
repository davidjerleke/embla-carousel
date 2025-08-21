import EmblaCarousel, { EmblaOptionsType } from 'embla-carousel'
import { addPrevNextButtonClickHandlers } from '../EmblaCarouselArrowButtons'
import { updateSelectedSnapDisplay } from '../EmblaCarouselSelectedSnapDisplay'
import { addScrollBarListener } from './EmblaCarouselScrollBar'
import '../css/base.css'
import '../css/sandbox.css'
import '../css/embla.css'

const OPTIONS: EmblaOptionsType = {}

const emblaNode = <HTMLElement>document.querySelector('.embla')
const viewportNode = <HTMLElement>emblaNode.querySelector('.embla__viewport')
const prevBtn = <HTMLElement>emblaNode.querySelector('.embla__button--prev')
const nextBtn = <HTMLElement>emblaNode.querySelector('.embla__button--next')
const snapDisplayNode = <HTMLElement>(
  emblaNode.querySelector('.embla__selected-snap-display')
)
const scrollBarNode = <HTMLInputElement>(
  emblaNode.querySelector('.embla__scrollbar')
)

const emblaApi = EmblaCarousel(viewportNode, OPTIONS)

addPrevNextButtonClickHandlers(emblaApi, prevBtn, nextBtn)
updateSelectedSnapDisplay(emblaApi, snapDisplayNode)
addScrollBarListener(emblaApi, scrollBarNode)
