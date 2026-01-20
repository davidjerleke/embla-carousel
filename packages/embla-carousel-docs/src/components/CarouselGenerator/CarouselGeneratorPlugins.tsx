import React from 'react'
import { InputCheckboxDefault } from 'components/Input/InputCheckbox'
import { SANDBOX_GENERATOR_FORM_FIELDS } from 'consts/sandbox'
import { useCarouselGenerator } from 'hooks/useCarouselGenerator'
import { CarouselGeneratorFormItem } from './CarouselGeneratorFormItems'
import {
  SandboxGeneratorCheckboxType,
  createSandboxGeneratorInputId
} from 'utils/sandbox'

const INPUT_ACCESSIBILITY: SandboxGeneratorCheckboxType<'accessibility'> = {
  ...createSandboxGeneratorInputId(SANDBOX_GENERATOR_FORM_FIELDS.ACCESSIBILITY),
  LABEL: 'Accessibility'
}

const INPUT_AUTOPLAY: SandboxGeneratorCheckboxType<'autoplay'> = {
  ...createSandboxGeneratorInputId(SANDBOX_GENERATOR_FORM_FIELDS.AUTOPLAY),
  LABEL: 'Autoplay'
}

const INPUT_CLASS_NAMES: SandboxGeneratorCheckboxType<'classNames'> = {
  ...createSandboxGeneratorInputId(SANDBOX_GENERATOR_FORM_FIELDS.CLASS_NAMES),
  LABEL: 'Class names'
}

const INPUT_WHEEL_GESTURES: SandboxGeneratorCheckboxType<'wheelGestures'> = {
  ...createSandboxGeneratorInputId(
    SANDBOX_GENERATOR_FORM_FIELDS.WHEEL_GESTURES
  ),
  LABEL: 'Wheel gestures (make a contribution)'
}

export const CarouselGeneratorPlugins = () => {
  const { formData, onCheckboxChange } = useCarouselGenerator()

  return (
    <>
      <CarouselGeneratorFormItem>
        <InputCheckboxDefault
          name={INPUT_ACCESSIBILITY.FIELD_NAME}
          id={INPUT_ACCESSIBILITY.ID}
          checked={formData[INPUT_ACCESSIBILITY.FIELD_NAME]}
          onChange={onCheckboxChange}
        >
          {INPUT_ACCESSIBILITY.LABEL}
        </InputCheckboxDefault>
      </CarouselGeneratorFormItem>

      <CarouselGeneratorFormItem>
        <InputCheckboxDefault
          name={INPUT_AUTOPLAY.FIELD_NAME}
          id={INPUT_AUTOPLAY.ID}
          checked={formData[INPUT_AUTOPLAY.FIELD_NAME]}
          onChange={onCheckboxChange}
        >
          {INPUT_AUTOPLAY.LABEL}
        </InputCheckboxDefault>
      </CarouselGeneratorFormItem>

      <CarouselGeneratorFormItem>
        <InputCheckboxDefault
          name={INPUT_CLASS_NAMES.FIELD_NAME}
          id={INPUT_CLASS_NAMES.ID}
          checked={formData[INPUT_CLASS_NAMES.FIELD_NAME]}
          onChange={onCheckboxChange}
        >
          {INPUT_CLASS_NAMES.LABEL}
        </InputCheckboxDefault>
      </CarouselGeneratorFormItem>

      <CarouselGeneratorFormItem>
        <InputCheckboxDefault
          name={INPUT_WHEEL_GESTURES.FIELD_NAME}
          id={INPUT_WHEEL_GESTURES.ID}
          checked={formData[INPUT_WHEEL_GESTURES.FIELD_NAME]}
          onChange={onCheckboxChange}
          disabled
        >
          {INPUT_WHEEL_GESTURES.LABEL}
        </InputCheckboxDefault>
      </CarouselGeneratorFormItem>
    </>
  )
}
