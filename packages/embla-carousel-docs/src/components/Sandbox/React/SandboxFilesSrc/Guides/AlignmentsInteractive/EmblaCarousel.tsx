import React, { useState } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import {
  NextButton,
  PrevButton,
  usePrevNextButtons
} from '../../EmblaCarouselArrowButtons'
import RadioForm from '../../EmblaCarouselRadioForm'
import {
  SelectedSnapDisplay,
  useSelectedSnapDisplay
} from '../../EmblaCarouselSelectedSnapDisplay'
import { sandboxImages } from 'components/Sandbox/sandboxImages'

const ALIGNMENTS = ['start', 'center', 'end']
const LOOP = ['true', 'false']

type PropType = {
  slides: number[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [dynamicOptions, setDynamicOptions] = useState<EmblaOptionsType>({
    ...options
  })
  const [emblaRef, emblaApi] = useEmblaCarousel({
    ...options,
    ...dynamicOptions
  })

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi)

  return (
    <div className="embla">
      <RadioForm
        property="align"
        values={ALIGNMENTS}
        options={dynamicOptions}
        setOptions={(value) => {
          setDynamicOptions((currentOptions) => ({
            ...currentOptions,
            align: value as EmblaOptionsType['align']
          }))
        }}
      />

      <RadioForm
        property="loop"
        values={LOOP}
        options={dynamicOptions}
        setOptions={(value) => {
          setDynamicOptions((currentOptions) => ({
            ...currentOptions,
            loop: (value === 'true') as EmblaOptionsType['loop']
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

        <span
          className={'embla__align-indicator'.concat(
            ` embla__align-indicator--${dynamicOptions.align}`
          )}
        />
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <SelectedSnapDisplay
          selectedSnap={selectedSnap}
          snapCount={snapCount}
        />
      </div>
    </div>
  )
}

export default EmblaCarousel
