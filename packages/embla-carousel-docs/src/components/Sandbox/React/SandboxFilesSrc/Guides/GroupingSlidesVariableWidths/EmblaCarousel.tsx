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
import { useGroupIndicator } from '../../EmblaCarouselGroupIndicator'
import { sandboxImages } from 'components/Sandbox/sandboxImages'

const SHOW_SLIDE_GROUPS = ['yes', 'no']
const SLIDES_TO_SCROLL = ['1', '2', 'auto']

type PropType = {
  slides: number[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [showSlideGroups, setShowSlideGroups] = useState('yes')
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

  const groupIndicatorClassNames = useGroupIndicator(emblaApi)

  return (
    <div
      className={'embla'.concat(
        showSlideGroups === 'no' ? ' embla--group-indicator-hidden' : ''
      )}
    >
      <RadioForm
        property="showSlideGroups"
        values={SHOW_SLIDE_GROUPS}
        selected={showSlideGroups}
        onChange={setShowSlideGroups}
      />
      <RadioForm
        property="slidesToScroll"
        values={SLIDES_TO_SCROLL}
        selected={dynamicOptions.slidesToScroll?.toString()}
        onChange={(value) => {
          setDynamicOptions((currentOptions) => ({
            ...currentOptions,
            slidesToScroll:
              value === 'auto'
                ? 'auto'
                : (Number(value) as EmblaOptionsType['slidesToScroll'])
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
              <span
                className={`embla__group__indicator ${groupIndicatorClassNames[index]}`}
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

        <SelectedSnapDisplay
          selectedSnap={selectedSnap}
          snapCount={snapCount}
        />
      </div>
    </div>
  )
}

export default EmblaCarousel
