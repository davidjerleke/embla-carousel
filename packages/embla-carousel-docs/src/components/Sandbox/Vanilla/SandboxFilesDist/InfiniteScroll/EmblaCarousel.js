import EmblaCarousel from 'embla-carousel'
import {
  setupInfiniteScroll,
  mockApiCall,
  SLIDE_TEMPLATE,
  createHTMLFromString
} from './infinite-scroll'
import '../css/base.css'
import '../css/sandbox.css'
import '../css/embla.css'

const OPTIONS = {}

const emblaNode = document.querySelector('.embla')
const viewportNode = emblaNode.querySelector('.embla__viewport')

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
          const imageNumber = (index % 4) + 1
          return template.replace('__IMG_NUMBER__', imageNumber.toString())
        })
        .map((template, index) => {
          const slideNumber = slideCount + index + 1
          return template.replace('__SLIDE_NUMBER__', slideNumber.toString())
        })
        .map(createHTMLFromString)

      loadMore(slideNodesToAdd)
    })
  }
)

emblaApi.on('init', startInfiniteScroll)
emblaApi.on('destroy', () => {
  window.removeEventListener('resize', onResize)
})
window.addEventListener('resize', onResize)
