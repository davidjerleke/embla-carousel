import EmblaCarousel from 'embla-carousel'
import {
  setupInfiniteScroll,
  mockApiCall,
  SLIDE_TEMPLATE,
  createHTMLFromString
} from './EmblaCarouselInfiniteScroll'
import { addPrevNextBtnsClickHandlers } from '../EmblaCarouselArrowButtons'
import '../css/base.css'
import '../css/sandbox.css'
import '../css/embla.css'

const OPTIONS = {}

const emblaNode = document.querySelector('.embla')
const viewportNode = emblaNode.querySelector('.embla__viewport')
const prevBtn = emblaNode.querySelector('.embla__button--prev')
const nextBtn = emblaNode.querySelector('.embla__button--next')

const emblaApi = EmblaCarousel(viewportNode, OPTIONS)

const removePrevNextBtnsClickHandlers = addPrevNextBtnsClickHandlers(
  emblaApi,
  prevBtn,
  nextBtn
)

const onResize = () => emblaApi.reInit()
const startInfiniteScroll = setupInfiniteScroll(
  emblaApi,
  (loadMore, endInfiniteScroll, slideCount) => {
    mockApiCall(1000, 2000, () => {
      if (slideCount === 20) return endInfiniteScroll()

      const fiveNewSlideNodes = Array.from(Array(5).keys())
      const slideNodesToAdd = fiveNewSlideNodes
        .map(() => SLIDE_TEMPLATE)
        .map((template, index) => {
          const slideNumber = slideCount + index + 1
          return template.replace('__SLIDE_NUMBER__', slideNumber.toString())
        })
        .map(createHTMLFromString)

      loadMore(slideNodesToAdd)
    })
  }
)

startInfiniteScroll()

emblaApi
  .on('destroy', () => {
    window.removeEventListener('resize', onResize)
  })
  .on('destroy', removePrevNextBtnsClickHandlers)

window.addEventListener('resize', onResize)
