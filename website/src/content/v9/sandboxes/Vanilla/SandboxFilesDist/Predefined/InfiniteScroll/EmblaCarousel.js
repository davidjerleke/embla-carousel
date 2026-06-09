import EmblaCarousel from 'embla-carousel'
import {
  setupInfiniteScroll,
  mockApiCall,
  SLIDE_TEMPLATE,
  createHTMLFromString
} from './EmblaCarouselInfiniteScroll'
import { addPrevNextButtonClickHandlers } from '../../EmblaCarouselArrowButtons'
import '../css/base.css'
import '../css/sandbox.css'
import '../css/embla.css'

const OPTIONS = {}

const emblaNode = document.querySelector('.embla')
const viewportNode = emblaNode.querySelector('.embla__viewport')
const prevBtn = emblaNode.querySelector('.embla__button--prev')
const nextBtn = emblaNode.querySelector('.embla__button--next')

const emblaApi = EmblaCarousel(viewportNode, OPTIONS)

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

addPrevNextButtonClickHandlers(emblaApi, prevBtn, nextBtn)
startInfiniteScroll()
window.addEventListener('resize', onResize)
