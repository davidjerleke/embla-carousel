import EmblaCarousel from 'embla-carousel'
import { addPrevNextButtonClickHandlers } from '../../EmblaCarouselArrowButtons'
import { updateSelectedSnapDisplay } from '../../EmblaCarouselSelectedSnapDisplay'
import { addRadioFormHandler } from '../../EmblaCarouselRadioForm'
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

const loopFormNode = emblaNode.querySelector('.embla__radio-form--loop')
const loopRadioNodes = Array.from(
  loopFormNode.querySelectorAll('input[type="radio"]')
)

const emblaApi = EmblaCarousel(viewportNode, OPTIONS)

addPrevNextButtonClickHandlers(emblaApi, prevBtn, nextBtn)
updateSelectedSnapDisplay(emblaApi, snapDisplayNode)
addRadioFormHandler(loopFormNode, loopRadioNodes, (value) => {
  dynamicOptions = {
    ...dynamicOptions,
    loop: value === 'true'
  }
  emblaApi.reInit(dynamicOptions)
})
