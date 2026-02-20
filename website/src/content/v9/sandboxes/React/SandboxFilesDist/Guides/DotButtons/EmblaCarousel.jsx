import React, { useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import {
  NextButton,
  PrevButton,
  usePrevNextButtons
} from '../../EmblaCarouselArrowButtons'
import RadioForm from '../../EmblaCarouselRadioForm'
import { DotButton, useDotButton } from '../../EmblaCarouselDotButton'
import { sandboxImages } from 'components/Sandbox/sandboxImages'

const LOOP = ['true', 'false']

const EmblaCarousel = (props) => {
  const { slides, options } = props
  const [dynamicOptions, setDynamicOptions] = useState({
    ...options
  })
  const [emblaRef, emblaApi] = useEmblaCarousel({
    ...options,
    ...dynamicOptions
  })

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  return (
    <div className="embla">
      <RadioForm
        property="loop"
        values={LOOP}
        selected={dynamicOptions.loop?.toString()}
        onChange={(value) => {
          setDynamicOptions((currentOptions) => ({
            ...currentOptions,
            loop: value === 'true'
          }))
        }}
      />

      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide" key={index}>
              <img
                className="embla__slide__img"
                src={sandboxImages(index)}
                alt="Your alt text"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

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
      </div>
    </div>
  )
}

export default EmblaCarousel
