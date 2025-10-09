import EmblaCarousel from 'embla-carousel'
import { addPrevNextButtonClickHandlers } from '../../EmblaCarouselArrowButtons'
import { updateSelectedSnapDisplay } from '../../EmblaCarouselSelectedSnapDisplay'
import { addRadioFormHandler } from '../../EmblaCarouselRadioForm'
import { addAlignIndicatorHandler } from '../../EmblaCarouselAlignIndicator'
import '../css/base.css'
import '../css/sandbox.css'
import '../css/embla.css'

const OPTIONS = {}
let dynamicOptions = { ...OPTIONS }

const emblaNode = document.querySelector('.embla')
const viewportNode = emblaNode.querySelector('.embla__viewport')
const prevBtn = emblaNode.querySelector('.embla__button--prev')
const nextBtn = emblaNode.querySelector('.embla__button--next')
const snapDisplayNode = emblaNode.querySelector('.embla__selected-snap-display')
const alignIndicatorNode = emblaNode.querySelector('.embla__align-indicator')

const alignFormNode = emblaNode.querySelector('.embla__radio-form--align')
const alignRadioNodes = Array.from(
  alignFormNode.querySelectorAll('input[type="radio"]')
)

const containScrollFormNode = emblaNode.querySelector(
  '.embla__radio-form--containScroll'
)
const containScrollRadioNodes = Array.from(
  containScrollFormNode.querySelectorAll('input[type="radio"]')
)

const emblaApi = EmblaCarousel(viewportNode, OPTIONS)

addPrevNextButtonClickHandlers(emblaApi, prevBtn, nextBtn)
updateSelectedSnapDisplay(emblaApi, snapDisplayNode)
addAlignIndicatorHandler(emblaApi, alignIndicatorNode)
addRadioFormHandler(alignFormNode, alignRadioNodes, (event) => {
  const value = event.target.value

  dynamicOptions = {
    ...dynamicOptions,
    align: value
  }
  emblaApi.reInit(dynamicOptions)
})
addRadioFormHandler(containScrollFormNode, containScrollRadioNodes, (event) => {
  const value = event.target.value

  dynamicOptions = {
    ...dynamicOptions,
    containScroll: value === 'false' ? false : value
  }
  emblaApi.reInit(dynamicOptions)
})
