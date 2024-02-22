import EmblaCarousel, {
  EmblaOptionsType,
  /*__NAV_AUTOPLAY_REPLACE_START__*/ EmblaCarouselType /*__NAV_AUTOPLAY_REPLACE_END__*/
} from 'embla-carousel'
/*__PREV_NEXT_BUTTONS_REPLACE_START__*/
import { addPrevNextBtnsClickHandlers } from './EmblaCarouselArrowButtons'
/*__PREV_NEXT_BUTTONS_REPLACE_END__*/
/*__DOT_BUTTONS_REPLACE_START__*/
import { addDotBtnsAndClickHandlers } from './EmblaCarouselDotButton'
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

const OPTIONS: EmblaOptionsType = {}

const emblaNode = <HTMLElement>document.querySelector('.embla')
const viewportNode = <HTMLElement>emblaNode.querySelector('.embla__viewport')
/*__PREV_NEXT_BUTTONS_REPLACE_START__*/
const prevBtnNode = <HTMLElement>emblaNode.querySelector('.embla__button--prev')
const nextBtnNode = <HTMLElement>emblaNode.querySelector('.embla__button--next')
/*__PREV_NEXT_BUTTONS_REPLACE_END__*/
/*__DOT_BUTTONS_REPLACE_START__*/
const dotsNode = <HTMLElement>emblaNode.querySelector('.embla__dots')
/*__DOT_BUTTONS_REPLACE_END__*/
/*__SELECTED_SNAP_DISPLAY_REPLACE_START__*/
const snapDisplayNode = <HTMLElement>(
  emblaNode.querySelector('.embla__selected-snap-display')
)
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
const onNavButtonClick = (emblaApi: EmblaCarouselType): void => {
  const autoplay = emblaApi?.plugins()?.autoplay
  if (!autoplay) return

  const resetOrStop =
    autoplay.options.stopOnInteraction === false
      ? autoplay.reset
      : autoplay.stop

  resetOrStop()
}
/*__NAV_AUTOPLAY_REPLACE_END__*/

/*__PREV_NEXT_BUTTONS_REPLACE_START__*/
const removePrevNextBtnsClickHandlers = addPrevNextBtnsClickHandlers(
  emblaApi,
  prevBtnNode,
  nextBtnNode,
  /*__NAV_AUTOPLAY_REPLACE_START__*/ onNavButtonClick /*__NAV_AUTOPLAY_REPLACE_END__*/
)
/*__PREV_NEXT_BUTTONS_REPLACE_END__*/
/*__DOT_BUTTONS_REPLACE_START__*/
const removeDotBtnsAndClickHandlers = addDotBtnsAndClickHandlers(
  emblaApi,
  dotsNode,
  /*__NAV_AUTOPLAY_REPLACE_START__*/ onNavButtonClick /*__NAV_AUTOPLAY_REPLACE_END__*/
)
/*__DOT_BUTTONS_REPLACE_END__*/
/*__SELECTED_SNAP_DISPLAY_REPLACE_START__*/
const stopSelectedSnapDisplay = updateSelectedSnapDisplay(
  emblaApi,
  snapDisplayNode
)
/*__SELECTED_SNAP_DISPLAY_REPLACE_END__*/

/*__PREV_NEXT_BUTTONS_REPLACE_START__*/
emblaApi.on('destroy', removePrevNextBtnsClickHandlers)
/*__PREV_NEXT_BUTTONS_REPLACE_END__*/
/*__DOT_BUTTONS_REPLACE_START__*/
emblaApi.on('destroy', removeDotBtnsAndClickHandlers)
/*__DOT_BUTTONS_REPLACE_END__*/
/*__SELECTED_SNAP_DISPLAY_REPLACE_START__*/
emblaApi.on('destroy', stopSelectedSnapDisplay)
/*__SELECTED_SNAP_DISPLAY_REPLACE_END__*/
