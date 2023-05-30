import React from 'react'
import { CAROUSEL_GENERATOR_FORM_FIELDS } from 'consts/carouselGenerator'
import { CarouselGeneratorFormItem } from './CarouselGeneratorFormItems'
import { useCarouselGenerator } from 'hooks/useCarouselGenerator'
import { InputCheckboxDefault } from 'components/Input/InputCheckbox'
import {
  CarouselGeneratorCheckboxType,
  createCarouselGeneratorInputId
} from 'utils/carouselGenerator'

const INPUT_PREV_NEXT_BUTTONS: CarouselGeneratorCheckboxType<'navigationPrevNextButtons'> =
  {
    ...createCarouselGeneratorInputId(
      CAROUSEL_GENERATOR_FORM_FIELDS.NAVIGATION_PREV_NEXT_BUTTONS
    ),
    LABEL: 'Previous and next buttons'
  }

const INPUT_DOTS: CarouselGeneratorCheckboxType<'navigationDots'> = {
  ...createCarouselGeneratorInputId(
    CAROUSEL_GENERATOR_FORM_FIELDS.NAVIGATION_DOTS
  ),
  LABEL: 'Dot navigation'
}

export const CarouselGeneratorNavigationSettings = () => {
  const { formData, onCheckboxChange } = useCarouselGenerator()

  return (
    <>
      <CarouselGeneratorFormItem>
        <InputCheckboxDefault
          name={INPUT_PREV_NEXT_BUTTONS.FIELD_NAME}
          id={INPUT_PREV_NEXT_BUTTONS.ID}
          checked={formData[INPUT_PREV_NEXT_BUTTONS.FIELD_NAME]}
          onChange={onCheckboxChange}
        >
          {INPUT_PREV_NEXT_BUTTONS.LABEL}
        </InputCheckboxDefault>
      </CarouselGeneratorFormItem>

      <CarouselGeneratorFormItem>
        <InputCheckboxDefault
          name={INPUT_DOTS.FIELD_NAME}
          id={INPUT_DOTS.ID}
          checked={formData[INPUT_DOTS.FIELD_NAME]}
          onChange={onCheckboxChange}
        >
          {INPUT_DOTS.LABEL}
        </InputCheckboxDefault>
      </CarouselGeneratorFormItem>
    </>
  )
}
