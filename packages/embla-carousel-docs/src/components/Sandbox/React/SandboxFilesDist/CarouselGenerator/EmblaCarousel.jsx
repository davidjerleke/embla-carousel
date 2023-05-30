import React, {
  /*__NAV_AUTOPLAY_REPLACE_START__*/ useCallback /*__NAV_AUTOPLAY_REPLACE_END__*/
} from 'react'
import useEmblaCarousel from 'embla-carousel-react'
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
/*__AUTOPLAY_REPLACE_START__*/
import Autoplay from 'embla-carousel-autoplay'
/*__AUTOPLAY_REPLACE_END__*/
import imageByIndex from '../imageByIndex'

const EmblaCarousel = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(
    options,
    /*__PLUGINS_REPLACE_START__*/
    [
      /*__AUTOPLAY_REPLACE_START__*/
      Autoplay()
      /*__AUTOPLAY_REPLACE_END__*/
    ]
    /*__PLUGINS_REPLACE_END__*/
  )

  /*__NAV_AUTOPLAY_REPLACE_START__*/
  const onButtonClick = useCallback((emblaApi) => {
    const { autoplay } = emblaApi.plugins()
    if (!autoplay) return
    if (autoplay.options.stopOnInteraction !== false) autoplay.stop()
  }, [])
  /*__NAV_AUTOPLAY_REPLACE_END__*/

  /*__DOT_BUTTONS_REPLACE_START__*/
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    /*__NAV_AUTOPLAY_REPLACE_START__*/ onButtonClick /*__NAV_AUTOPLAY_REPLACE_END__*/
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
    /*__NAV_AUTOPLAY_REPLACE_START__*/ onButtonClick /*__NAV_AUTOPLAY_REPLACE_END__*/
  )
  /*__PREV_NEXT_BUTTONS_REPLACE_END__*/

  return (
    <div
      className="embla"
      /*__DIRECTION_RTL_REPLACE_START__*/ dir="rtl" /*__DIRECTION_RTL_REPLACE_END__*/
    >
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number">
                <span>{index + 1}</span>
              </div>
              <img
                className="embla__slide__img"
                src={imageByIndex(index)}
                alt="Your alt text"
              />
            </div>
          ))}
        </div>
      </div>

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
    </div>
  )
}

export default EmblaCarousel
