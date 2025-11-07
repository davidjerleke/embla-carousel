import React, {
  /*__NAV_AUTOPLAY_REPLACE_START__*/
  useCallback,
  /*__NAV_AUTOPLAY_REPLACE_END__*/
  /*__AUTOPLAY_REPLACE_START__*/
  useEffect
  /*__AUTOPLAY_REPLACE_END__*/
} from 'react'
/*__DOT_BUTTONS_REPLACE_START__*/
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
/*__DOT_BUTTONS_REPLACE_END__*/
/*__PREV_NEXT_BUTTONS_REPLACE_START__*/
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
/*__PREV_NEXT_BUTTONS_REPLACE_END__*/
/*__SELECTED_SNAP_DISPLAY_REPLACE_START__*/
import {
  SelectedSnapDisplay,
  useSelectedSnapDisplay
} from './EmblaCarouselSelectedSnapDisplay'
/*__SELECTED_SNAP_DISPLAY_REPLACE_END__*/
/*__ACCESSIBILITY_REPLACE_START__*/
import { useAccessibility } from './EmblaCarouselAccessibility'
/*__ACCESSIBILITY_REPLACE_END__*/
/*__AUTOPLAY_REPLACE_START__*/
import Autoplay from 'embla-carousel-autoplay'
/*__AUTOPLAY_REPLACE_END__*/
/*__CLASS_NAMES_REPLACE_START__*/
import ClassNames from 'embla-carousel-class-names'
/*__CLASS_NAMES_REPLACE_END__*/
/*__ACCESSIBILITY_REPLACE_START__*/
import Accessiblity from 'embla-carousel-accessibility'
/*__ACCESSIBILITY_REPLACE_END__*/
import useEmblaCarousel from 'embla-carousel-react'

const EmblaCarousel = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(
    options,
    /*__PLUGINS_REPLACE_START__*/
    [
      /*__AUTOPLAY_REPLACE_START__*/
      Autoplay(),
      /*__AUTOPLAY_REPLACE_END__*/

      /*__CLASS_NAMES_REPLACE_START__*/
      ClassNames(),
      /*__CLASS_NAMES_REPLACE_END__*/

      /*__ACCESSIBILITY_REPLACE_START__*/
      Accessiblity({
        announceChanges: true,
        rootNode: (emblaRoot) => emblaRoot.parentElement
      })
      /*__ACCESSIBILITY_REPLACE_END__*/
    ]
    /*__PLUGINS_REPLACE_END__*/
  )

  /*__NAV_AUTOPLAY_REPLACE_START__*/
  const onNavButtonClick = useCallback((emblaApi) => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    autoplay.stop()
  }, [])
  /*__NAV_AUTOPLAY_REPLACE_END__*/

  /*__DOT_BUTTONS_REPLACE_START__*/
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    /*__NAV_AUTOPLAY_REPLACE_START__*/ onNavButtonClick /*__NAV_AUTOPLAY_REPLACE_END__*/
  )
  /*__DOT_BUTTONS_REPLACE_END__*/

  /*__PREV_NEXT_BUTTONS_REPLACE_START__*/
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(
    emblaApi,
    /*__NAV_AUTOPLAY_REPLACE_START__*/ onNavButtonClick /*__NAV_AUTOPLAY_REPLACE_END__*/
  )
  /*__PREV_NEXT_BUTTONS_REPLACE_END__*/

  /*__SELECTED_SNAP_DISPLAY_REPLACE_START__*/
  const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi)
  /*__SELECTED_SNAP_DISPLAY_REPLACE_END__*/

  /*__ACCESSIBILITY_REPLACE_START__*/
  useAccessibility(emblaApi)
  /*__ACCESSIBILITY_REPLACE_END__*/

  /*__AUTOPLAY_REPLACE_START__*/
  useEffect(() => {
    if (!emblaApi) return
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    autoplay.play()
  }, [emblaApi])
  /*__AUTOPLAY_REPLACE_END__*/

  return (
    <section
      className="embla"
      /*__DIRECTION_RTL_REPLACE_START__*/ dir="rtl" /*__DIRECTION_RTL_REPLACE_END__*/
    >
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number">{index + 1}</div>
            </div>
          ))}
        </div>
      </div>

      {/*__CONTROLS_REPLACE_START__*/}
      <div className="embla__controls">
        {/*__PREV_NEXT_BUTTONS_REPLACE_START__*/}
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
        {/*__PREV_NEXT_BUTTONS_REPLACE_END__*/}

        {/*__DOT_BUTTONS_REPLACE_START__*/}
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>
        {/*__DOT_BUTTONS_REPLACE_END__*/}

        {/*__SELECTED_SNAP_DISPLAY_REPLACE_START__*/}
        <SelectedSnapDisplay
          selectedSnap={selectedSnap}
          snapCount={snapCount}
        />
        {/*__SELECTED_SNAP_DISPLAY_REPLACE_END__*/}
      </div>
      {/*__CONTROLS_REPLACE_END__*/}

      {/*__ACCESSIBILITY_REPLACE_START__*/}
      <div className="embla__live-region" />
      {/*__ACCESSIBILITY_REPLACE_END__*/}
    </section>
  )
}

export default EmblaCarousel
