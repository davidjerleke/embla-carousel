import React from 'react'
import { useCarouselGenerator } from 'hooks/useCarouselGenerator'
import { CAROUSEL_GENERATOR_FORM_FIELDS } from 'consts/carouselGenerator'
import {
  CarouselGeneratorFormItem,
  CarouselGeneratorInputText
} from './CarouselGeneratorFormItems'
import {
  CarouselGeneratorInputTextType,
  createCarouselGeneratorInputId
} from 'utils/carouselGenerator'

const INPUT_SLIDE_SIZE: CarouselGeneratorInputTextType<'slideSize'> = {
  ...createCarouselGeneratorInputId(CAROUSEL_GENERATOR_FORM_FIELDS.SLIDE_SIZE),
  LABEL: 'Slide size (%)'
}

const INPUT_SLIDE_GAP_SIZE: CarouselGeneratorInputTextType<'slideGapSize'> = {
  ...createCarouselGeneratorInputId(
    CAROUSEL_GENERATOR_FORM_FIELDS.SLIDE_GAP_SIZE
  ),
  LABEL: 'Slide gaps (px)'
}

export const CarouselGeneratorSlidesSettings = () => {
  const { formData, onNumberChange, onNumberBlur } = useCarouselGenerator()

  return (
    <>
      <CarouselGeneratorFormItem>
        <CarouselGeneratorInputText
          type="number"
          min="10"
          max="100"
          name={INPUT_SLIDE_SIZE.FIELD_NAME}
          id={INPUT_SLIDE_SIZE.ID}
          value={formData[INPUT_SLIDE_SIZE.FIELD_NAME]}
          onChange={onNumberChange}
          onBlur={onNumberBlur}
        >
          {INPUT_SLIDE_SIZE.LABEL}
        </CarouselGeneratorInputText>
      </CarouselGeneratorFormItem>

      <CarouselGeneratorFormItem>
        <CarouselGeneratorInputText
          type="number"
          min="0"
          max="20"
          name={INPUT_SLIDE_GAP_SIZE.FIELD_NAME}
          id={INPUT_SLIDE_GAP_SIZE.ID}
          value={formData[INPUT_SLIDE_GAP_SIZE.FIELD_NAME]}
          onChange={onNumberChange}
          onBlur={onNumberBlur}
        >
          {INPUT_SLIDE_GAP_SIZE.LABEL}
        </CarouselGeneratorInputText>
      </CarouselGeneratorFormItem>
    </>
  )
}
