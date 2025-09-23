import EmblaCarousel from 'embla-carousel'
/*__PREV_NEXT_BUTTONS_REPLACE_START__*/
import { addPrevNextButtonClickHandlers } from './EmblaCarouselArrowButtons'
/*__PREV_NEXT_BUTTONS_REPLACE_END__*/
/*__DOT_BUTTONS_REPLACE_START__*/
import { addDotButtonsAndClickHandlers } from './EmblaCarouselDotButton'
/*__DOT_BUTTONS_REPLACE_END__*/
/*__SELECTED_SNAP_DISPLAY_REPLACE_START__*/
import { updateSelectedSnapDisplay } from './EmblaCarouselSelectedSnapDisplay'
/*__SELECTED_SNAP_DISPLAY_REPLACE_END__*/
/*__AUTOPLAY_REPLACE_START__*/
import Autoplay from 'embla-carousel-autoplay'
/*__AUTOPLAY_REPLACE_END__*/
/*__CLASS_NAMES_REPLACE_START__*/
import ClassNames from 'embla-carousel-class-names'
/*__CLASS_NAMES_REPLACE_END__*/
import '../css/base.css'
import '../css/sandbox.css'
import '../css/embla.css'

const OPTIONS = {}

const emblaNode = document.querySelector('.embla')
const viewportNode = emblaNode.querySelector('.embla__viewport')
/*__PREV_NEXT_BUTTONS_REPLACE_START__*/
const prevBtnNode = emblaNode.querySelector('.embla__button--prev')
const nextBtnNode = emblaNode.querySelector('.embla__button--next')
/*__PREV_NEXT_BUTTONS_REPLACE_END__*/
/*__DOT_BUTTONS_REPLACE_START__*/
const dotsNode = emblaNode.querySelector('.embla__dots')
/*__DOT_BUTTONS_REPLACE_END__*/
/*__SELECTED_SNAP_DISPLAY_REPLACE_START__*/
const snapDisplayNode = emblaNode.querySelector('.embla__selected-snap-display')
/*__SELECTED_SNAP_DISPLAY_REPLACE_END__*/

const emblaApi = EmblaCarousel(
  viewportNode,
  OPTIONS,
  /*__PLUGINS_REPLACE_START__*/
  [
    /*__AUTOPLAY_REPLACE_START__*/
    Autoplay(),
    /*__AUTOPLAY_REPLACE_END__*/

    /*__CLASS_NAMES_REPLACE_START__*/
    ClassNames()
    /*__CLASS_NAMES_REPLACE_END__*/
  ]
  /*__PLUGINS_REPLACE_END__*/
)

/*__NAV_AUTOPLAY_REPLACE_START__*/
const onNavButtonClick = (emblaApi) => {
  const autoplay = emblaApi?.plugins()?.autoplay
  if (!autoplay) return
  autoplay.stop()
}
/*__NAV_AUTOPLAY_REPLACE_END__*/

/*__PREV_NEXT_BUTTONS_REPLACE_START__*/
addPrevNextButtonClickHandlers(
  emblaApi,
  prevBtnNode,
  nextBtnNode,
  /*__NAV_AUTOPLAY_REPLACE_START__*/ onNavButtonClick /*__NAV_AUTOPLAY_REPLACE_END__*/
)
/*__PREV_NEXT_BUTTONS_REPLACE_END__*/
/*__DOT_BUTTONS_REPLACE_START__*/
addDotButtonsAndClickHandlers(
  emblaApi,
  dotsNode,
  /*__NAV_AUTOPLAY_REPLACE_START__*/ onNavButtonClick /*__NAV_AUTOPLAY_REPLACE_END__*/
)
/*__DOT_BUTTONS_REPLACE_END__*/
/*__SELECTED_SNAP_DISPLAY_REPLACE_START__*/
updateSelectedSnapDisplay(emblaApi, snapDisplayNode)
/*__SELECTED_SNAP_DISPLAY_REPLACE_END__*/
