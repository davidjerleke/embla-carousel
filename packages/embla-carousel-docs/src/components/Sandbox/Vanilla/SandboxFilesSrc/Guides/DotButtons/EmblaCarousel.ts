import EmblaCarousel, { EmblaOptionsType } from 'embla-carousel'
import { addDotButtonAndClickHandlers } from '../../EmblaCarouselDotButton'
import { addPrevNextButtonClickHandlers } from '../../EmblaCarouselArrowButtons'
import { addRadioFormHandler } from '../../EmblaCarouselRadioForm'
import '../css/base.css'
import '../css/sandbox.css'
import '../css/embla.css'

const OPTIONS: EmblaOptionsType = {}
let dynamicOptions: EmblaOptionsType = { ...OPTIONS }

const emblaNode = <HTMLElement>document.querySelector('.embla')
const viewportNode = <HTMLElement>emblaNode.querySelector('.embla__viewport')
const prevBtn = <HTMLElement>emblaNode.querySelector('.embla__button--prev')
const nextBtn = <HTMLElement>emblaNode.querySelector('.embla__button--next')
const dotsNode = <HTMLElement>document.querySelector('.embla__dots')

const loopFormNode = <HTMLFormElement>(
  emblaNode.querySelector('.embla__radio-form--loop')
)
const loopRadioNodes = <HTMLInputElement[]>(
  Array.from(loopFormNode.querySelectorAll('input[type="radio"]'))
)

const emblaApi = EmblaCarousel(viewportNode, OPTIONS)

addPrevNextButtonClickHandlers(emblaApi, prevBtn, nextBtn)
addDotButtonAndClickHandlers(emblaApi, dotsNode)
addRadioFormHandler(loopFormNode, loopRadioNodes, (value) => {
  dynamicOptions = {
    ...dynamicOptions,
    loop: <EmblaOptionsType['loop']>(value === 'true')
  }
  emblaApi.reInit(dynamicOptions)
})
