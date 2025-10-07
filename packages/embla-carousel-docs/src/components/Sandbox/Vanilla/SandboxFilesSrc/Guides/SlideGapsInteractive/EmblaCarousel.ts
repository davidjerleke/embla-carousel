import EmblaCarousel, { EmblaOptionsType } from 'embla-carousel'
import { addPrevNextButtonClickHandlers } from '../../EmblaCarouselArrowButtons'
import { updateSelectedSnapDisplay } from '../../EmblaCarouselSelectedSnapDisplay'
import { addSizeFormHandler } from '../../EmblaCarouselSizeForm'
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

const slideSizeFormNode = <HTMLFormElement>(
  emblaNode.querySelector('.embla__text-form--slide-size')
)
const slideSizeInputNode = <HTMLInputElement>(
  slideSizeFormNode.querySelector('input[type="number"]')
)

const slideGapSizeFormNode = <HTMLFormElement>(
  emblaNode.querySelector('.embla__text-form--slide-spacing')
)
const slideGapSizeInputNode = <HTMLInputElement>(
  slideGapSizeFormNode.querySelector('input[type="number"]')
)

const emblaApi = EmblaCarousel(viewportNode, OPTIONS)

addPrevNextButtonClickHandlers(emblaApi, prevBtn, nextBtn)
updateSelectedSnapDisplay(emblaApi, snapDisplayNode)
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
