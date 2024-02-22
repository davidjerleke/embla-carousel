import React, { useCallback } from 'react'
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { DotButton, useDotButton } from './SandboxGeneratorExampleDotButton'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './SandboxGeneratorExampleArrowButtons'
import {
  SelectedSnapDisplay,
  useSelectedSnapDisplay
} from './SandboxGeneratorExampleSelectedSnapDisplay'
import Autoplay from 'embla-carousel-autoplay'
import ClassNames from 'embla-carousel-class-names'

type PropType = {
  slides: number[]
  options?: EmblaOptionsType
  navigationPrevNextButtons?: boolean
  navigationDots?: boolean
  selectedSnapDisplay?: boolean
  autoplay?: boolean
  classNames?: boolean
}

const EmblaCarouselExample: React.FC<PropType> = (props) => {
  const {
    slides,
    options,
    navigationPrevNextButtons,
    navigationDots,
    selectedSnapDisplay,
    autoplay,
    classNames
  } = props
  const isRightToLeft = options?.direction === 'rtl'
  const isVertical = options?.axis === 'y'

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    ...(autoplay ? [Autoplay()] : []),
    ...(classNames ? [ClassNames()] : [])
  ])

  const onButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const { autoplay } = emblaApi.plugins()
    if (!autoplay) return
    if (autoplay.options.stopOnInteraction !== false) autoplay.stop()
  }, [])

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onButtonClick
  )

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi, onButtonClick)

  const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi)

  return (
    <div className="embla" dir={isRightToLeft ? 'rtl' : undefined}>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number">{index + 1}</div>
            </div>
          ))}
        </div>
      </div>

      {(navigationPrevNextButtons || navigationDots) && (
        <div className="embla__controls">
          {navigationPrevNextButtons && (
            <div className="embla__buttons">
              <PrevButton
                onClick={onPrevButtonClick}
                disabled={prevBtnDisabled}
                isRightToLeft={isRightToLeft}
                isVertical={isVertical}
              />
              <NextButton
                onClick={onNextButtonClick}
                disabled={nextBtnDisabled}
                isRightToLeft={isRightToLeft}
                isVertical={isVertical}
              />
            </div>
          )}

          {navigationDots && (
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
          )}

          {selectedSnapDisplay && (
            <SelectedSnapDisplay
              selectedSnap={selectedSnap}
              snapCount={snapCount}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default EmblaCarouselExample
