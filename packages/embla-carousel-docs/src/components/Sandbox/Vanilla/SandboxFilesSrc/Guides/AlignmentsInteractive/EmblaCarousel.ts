import EmblaCarousel, { EmblaOptionsType } from 'embla-carousel'
import { addPrevNextButtonClickHandlers } from '../../EmblaCarouselArrowButtons'
import { updateSelectedSnapDisplay } from '../../EmblaCarouselSelectedSnapDisplay'
import { addRadioFormHandler } from '../../EmblaCarouselRadioForm'
import { addAlignIndicatorHandler } from '../../EmblaCarouselAlignIndicator'
import '../css/base.css'
import '../css/sandbox.css'
import '../css/embla.css'

const OPTIONS: EmblaOptionsType = {}
let dynamicOptions: EmblaOptionsType = { ...OPTIONS }

const emblaNode = <HTMLElement>document.querySelector('.embla')
const viewportNode = <HTMLElement>emblaNode.querySelector('.embla__viewport')
const prevBtn = <HTMLElement>emblaNode.querySelector('.embla__button--prev')
const nextBtn = <HTMLElement>emblaNode.querySelector('.embla__button--next')
const snapDisplayNode = <HTMLElement>(
  emblaNode.querySelector('.embla__selected-snap-display')
)
const alignIndicatorNode = <HTMLElement>(
  emblaNode.querySelector('.embla__align-indicator')
)

const alignFormNode = <HTMLFormElement>(
  emblaNode.querySelector('.embla__radio-form--align')
)
const alignRadioNodes = <HTMLInputElement[]>(
  Array.from(alignFormNode.querySelectorAll('input[type="radio"]'))
)

const loopFormNode = <HTMLFormElement>(
  emblaNode.querySelector('.embla__radio-form--loop')
)
const loopRadioNodes = <HTMLInputElement[]>(
  Array.from(loopFormNode.querySelectorAll('input[type="radio"]'))
)

const emblaApi = EmblaCarousel(viewportNode, OPTIONS)

addPrevNextButtonClickHandlers(emblaApi, prevBtn, nextBtn)
updateSelectedSnapDisplay(emblaApi, snapDisplayNode)
addAlignIndicatorHandler(emblaApi, alignIndicatorNode)
addRadioFormHandler(alignFormNode, alignRadioNodes, (event) => {
  const value = (event.target as HTMLInputElement).value

  dynamicOptions = {
    ...dynamicOptions,
    align: <EmblaOptionsType['align']>value
  }
  emblaApi.reInit(dynamicOptions)
})
addRadioFormHandler(loopFormNode, loopRadioNodes, (event) => {
  const value = (event.target as HTMLInputElement).value

  dynamicOptions = {
    ...dynamicOptions,
    loop: <EmblaOptionsType['loop']>(value === 'true')
  }
  emblaApi.reInit(dynamicOptions)
})
