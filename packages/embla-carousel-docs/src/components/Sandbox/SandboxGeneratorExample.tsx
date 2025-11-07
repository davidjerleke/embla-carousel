import React, { useCallback, useEffect } from 'react'
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
import Accessiblity from 'embla-carousel-accessibility'
import { useAccessibility } from './SandboxGeneratorExampleAccessibility'

type PropType = {
  slides: number[]
  options?: EmblaOptionsType
  navigationPrevNextButtons?: boolean
  navigationDots?: boolean
  selectedSnapDisplay?: boolean
  autoplay?: boolean
  classNames?: boolean
  accessibility?: boolean
}

export const SandboxGeneratorExample: React.FC<PropType> = (props) => {
  const {
    slides,
    options,
    navigationPrevNextButtons,
    navigationDots,
    selectedSnapDisplay,
    autoplay,
    classNames,
    accessibility
  } = props
  const isRightToLeft = options?.direction === 'rtl'

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    ...(autoplay ? [Autoplay()] : []),
    ...(classNames ? [ClassNames()] : []),
    ...(accessibility
      ? [
          Accessiblity({
            announceChanges: true,
            rootNode: (emblaRoot) => emblaRoot.parentElement
          })
        ]
      : [])
  ])

  const onButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const { autoplay } = emblaApi.plugins()
    if (!autoplay) return
    autoplay.stop()
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

  useAccessibility(accessibility ? emblaApi : undefined)

  useEffect(() => {
    if (!autoplay) return
    emblaApi?.plugins()?.autoplay?.play()
  }, [emblaApi, autoplay])

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
              />
              <NextButton
                onClick={onNextButtonClick}
                disabled={nextBtnDisabled}
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

      {accessibility && <div className="embla__live-region" />}
    </div>
  )
}
