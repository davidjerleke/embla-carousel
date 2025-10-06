import EmblaCarousel, { EmblaOptionsType } from 'embla-carousel'
import { addPrevNextButtonClickHandlers } from '../../EmblaCarouselArrowButtons'
import { addSizeFormHandler } from './EmblaCarouselSizeForm'
import '../css/base.css'
import '../css/sandbox.css'
import '../css/embla.css'

const OPTIONS: EmblaOptionsType = {}

const emblaNode = <HTMLElement>document.querySelector('.embla')
const viewportNode = <HTMLElement>emblaNode.querySelector('.embla__viewport')
const prevBtn = <HTMLElement>emblaNode.querySelector('.embla__button--prev')
const nextBtn = <HTMLElement>emblaNode.querySelector('.embla__button--next')

const slideSizeFormNode = <HTMLFormElement>(
  emblaNode.querySelector('.embla__form--slide-size')
)
const slideSizeInputNode = <HTMLInputElement>(
  slideSizeFormNode.querySelector('.embla__input')
)

const slideGapSizeFormNode = <HTMLFormElement>(
  emblaNode.querySelector('.embla__form--slide-spacing')
)
const slideGapSizeInputNode = <HTMLInputElement>(
  slideGapSizeFormNode.querySelector('.embla__input')
)

const emblaApi = EmblaCarousel(viewportNode, OPTIONS)

addPrevNextButtonClickHandlers(emblaApi, prevBtn, nextBtn)
addSizeFormHandler(
  emblaApi,
  slideSizeFormNode,
  slideSizeInputNode,
  30,
  100,
  70,
  '--slide-size',
  '%'
)
addSizeFormHandler(
  emblaApi,
  slideGapSizeFormNode,
  slideGapSizeInputNode,
  0,
  50,
  10,
  '--slide-spacing',
  'px'
)
