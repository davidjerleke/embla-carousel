import EmblaCarousel from 'embla-carousel'
/*__PREV_NEXT_BUTTONS_REPLACE_START__*/
import { addPrevNextBtnsClickHandlers } from './arrow-buttons'
/*__PREV_NEXT_BUTTONS_REPLACE_END__*/
/*__DOT_BUTTONS_REPLACE_START__*/
import { addDotBtnsAndClickHandlers } from './dot-buttons'
/*__DOT_BUTTONS_REPLACE_END__*/
/*__AUTOPLAY_REPLACE_START__*/
import Autoplay from 'embla-carousel-autoplay'
/*__AUTOPLAY_REPLACE_END__*/
import '../css/base.css'
import '../css/sandbox.css'
import '../css/embla.css'

const OPTIONS = {}

const emblaNode = document.querySelector('.embla')
const viewportNode = emblaNode.querySelector('.embla__viewport')
/*__PREV_NEXT_BUTTONS_REPLACE_START__*/
const prevBtn = emblaNode.querySelector('.embla__button--prev')
const nextBtn = emblaNode.querySelector('.embla__button--next')
/*__PREV_NEXT_BUTTONS_REPLACE_END__*/
/*__DOT_BUTTONS_REPLACE_START__*/
const dotsNode = document.querySelector('.embla__dots')
/*__DOT_BUTTONS_REPLACE_END__*/
const emblaApi = EmblaCarousel(
  viewportNode,
  OPTIONS,
  /*__PLUGINS_REPLACE_START__*/
  [
    /*__AUTOPLAY_REPLACE_START__*/
    Autoplay()
    /*__AUTOPLAY_REPLACE_END__*/
  ]
  /*__PLUGINS_REPLACE_END__*/
)

/*__NAV_AUTOPLAY_REPLACE_START__*/
const onButtonClick = (emblaApi) => {
  const { autoplay } = emblaApi.plugins()
  if (!autoplay) return
  if (autoplay.options.stopOnInteraction !== false) autoplay.stop()
}
/*__NAV_AUTOPLAY_REPLACE_END__*/

/*__PREV_NEXT_BUTTONS_REPLACE_START__*/
const removePrevNextBtnsClickHandlers = addPrevNextBtnsClickHandlers(
  emblaApi,
  prevBtn,
  nextBtn,
  /*__NAV_AUTOPLAY_REPLACE_START__*/ onButtonClick /*__NAV_AUTOPLAY_REPLACE_END__*/
)
/*__PREV_NEXT_BUTTONS_REPLACE_END__*/
/*__DOT_BUTTONS_REPLACE_START__*/
const removeDotBtnsAndClickHandlers = addDotBtnsAndClickHandlers(
  emblaApi,
  dotsNode,
  /*__NAV_AUTOPLAY_REPLACE_START__*/ onButtonClick /*__NAV_AUTOPLAY_REPLACE_END__*/
)
/*__DOT_BUTTONS_REPLACE_END__*/

/*__PREV_NEXT_BUTTONS_REPLACE_START__*/
emblaApi.on('destroy', removePrevNextBtnsClickHandlers)
/*__PREV_NEXT_BUTTONS_REPLACE_END__*/
/*__DOT_BUTTONS_REPLACE_START__*/
emblaApi.on('destroy', removeDotBtnsAndClickHandlers)
/*__DOT_BUTTONS_REPLACE_END__*/
