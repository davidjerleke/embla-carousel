import React from 'react'
import { useCarouselGenerator } from 'hooks/useCarouselGenerator'
import {
  SANDBOX_GENERATOR_FORM_FIELDS,
  SandboxGeneratorSettingsType
} from 'consts/sandbox'
import {
  CarouselGeneratorFormItem,
  CarouselGeneratorInputText
} from './CarouselGeneratorFormItems'
import {
  SandboxGeneratorCheckboxType,
  SandboxGeneratorInputTextType,
  createSandboxGeneratorInputId
} from 'utils/sandbox'
import { InputCheckboxDefault } from 'components/Input/InputCheckbox'

const INPUT_SLIDE_SIZE: SandboxGeneratorInputTextType<'slideSize'> = {
  ...createSandboxGeneratorInputId(SANDBOX_GENERATOR_FORM_FIELDS.SLIDE_SIZE),
  LABEL: 'Slide size (%)'
}

const INPUT_SLIDE_GAP_SIZE: SandboxGeneratorInputTextType<'slideGapSize'> = {
  ...createSandboxGeneratorInputId(
    SANDBOX_GENERATOR_FORM_FIELDS.SLIDE_GAP_SIZE
  ),
  LABEL: 'Slide gaps (px)'
}

const INPUT_SLIDES_TO_SCROLL: SandboxGeneratorCheckboxType<'slidesToScroll'> = {
  ...createSandboxGeneratorInputId(
    SANDBOX_GENERATOR_FORM_FIELDS.SLIDES_TO_SCROLL
  ),
  LABEL: 'Group slides'
}

export const CarouselGeneratorSlidesSettings = () => {
  const { formData, onNumberChange, onChange, onNumberBlur } =
    useCarouselGenerator()

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

      {parseInt(formData.slideSize) <= 50 && (
        <CarouselGeneratorFormItem>
          <InputCheckboxDefault
            name={INPUT_SLIDES_TO_SCROLL.FIELD_NAME}
            id={INPUT_SLIDES_TO_SCROLL.ID}
            checked={formData[INPUT_SLIDES_TO_SCROLL.FIELD_NAME] === 'auto'}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const { name, checked } = event.currentTarget
              const fieldName = name as keyof SandboxGeneratorSettingsType
              onChange(fieldName, checked ? 'auto' : 1)
            }}
          >
            {INPUT_SLIDES_TO_SCROLL.LABEL}
          </InputCheckboxDefault>
        </CarouselGeneratorFormItem>
      )}
    </>
  )
}
