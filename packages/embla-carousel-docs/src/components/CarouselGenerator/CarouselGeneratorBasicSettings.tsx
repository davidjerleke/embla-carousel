import React, { useEffect } from 'react'
import { InputRadioDefault } from 'components/Input/InputRadio'
import { InputCheckboxDefault } from 'components/Input/InputCheckbox'
import { useCarouselGenerator } from 'hooks/useCarouselGenerator'
import { SANDBOX_GENERATOR_FORM_FIELDS } from 'consts/sandbox'
import {
  SandboxGeneratorCheckboxType,
  SandboxGeneratorRadioType,
  createSandboxGeneratorInputId
} from 'utils/sandbox'
import {
  CarouselGeneratorFormItem,
  CarouselGeneratorFormItems
} from './CarouselGeneratorFormItems'

const INPUT_AXIS: SandboxGeneratorRadioType<'axis'> = {
  ...createSandboxGeneratorInputId(SANDBOX_GENERATOR_FORM_FIELDS.AXIS),
  OPTIONS: [
    { LABEL: 'Horizontal', VALUE: 'x' },
    { LABEL: 'Vertical', VALUE: 'y' }
  ]
}

const INPUT_DIRECTION: SandboxGeneratorRadioType<'direction'> = {
  ...createSandboxGeneratorInputId(SANDBOX_GENERATOR_FORM_FIELDS.DIRECTION),
  OPTIONS: [
    { LABEL: 'Left to right', VALUE: 'ltr' },
    { LABEL: 'Right to left', VALUE: 'rtl' }
  ]
}

const INPUT_LOOP: SandboxGeneratorCheckboxType<'loop'> = {
  ...createSandboxGeneratorInputId(SANDBOX_GENERATOR_FORM_FIELDS.LOOP),
  LABEL: 'Loop'
}

const INPUT_DRAG_FREE: SandboxGeneratorCheckboxType<'dragFree'> = {
  ...createSandboxGeneratorInputId(SANDBOX_GENERATOR_FORM_FIELDS.DRAG_FREE),
  LABEL: 'Drag free'
}

const INPUT_ACCESSIBILITY: SandboxGeneratorCheckboxType<'accessibility'> = {
  ...createSandboxGeneratorInputId(SANDBOX_GENERATOR_FORM_FIELDS.ACCESSIBILITY),
  LABEL: 'Accessibility (under development)'
}

export const CarouselGeneratorBasicSettings = () => {
  const { formData, onCheckboxChange, onRadioChange, onChange } =
    useCarouselGenerator()
  const axis = formData[SANDBOX_GENERATOR_FORM_FIELDS.AXIS]

  useEffect(() => {
    if (axis === 'y') onChange(SANDBOX_GENERATOR_FORM_FIELDS.DIRECTION, 'ltr')
  }, [axis])

  return (
    <>
      <CarouselGeneratorFormItems role="radiogroup" aria-label={INPUT_AXIS.ID}>
        {INPUT_AXIS.OPTIONS.map(({ VALUE, LABEL }) => (
          <div key={VALUE}>
            <InputRadioDefault
              name={INPUT_AXIS.FIELD_NAME}
              id={`${INPUT_AXIS.ID}-${VALUE}`}
              value={VALUE}
              checked={formData[INPUT_AXIS.FIELD_NAME] === VALUE}
              onChange={onRadioChange}
            >
              {LABEL}
            </InputRadioDefault>
          </div>
        ))}
      </CarouselGeneratorFormItems>

      {axis === 'x' && (
        <CarouselGeneratorFormItems
          role="radiogroup"
          aria-label={INPUT_DIRECTION.ID}
        >
          {INPUT_DIRECTION.OPTIONS.map(({ VALUE, LABEL }) => (
            <div key={VALUE}>
              <InputRadioDefault
                name={INPUT_DIRECTION.FIELD_NAME}
                id={`${INPUT_DIRECTION.ID}-${VALUE}`}
                value={VALUE}
                checked={formData[INPUT_DIRECTION.FIELD_NAME] === VALUE}
                onChange={onRadioChange}
              >
                {LABEL}
              </InputRadioDefault>
            </div>
          ))}
        </CarouselGeneratorFormItems>
      )}

      <CarouselGeneratorFormItem>
        <InputCheckboxDefault
          name={INPUT_LOOP.FIELD_NAME}
          id={INPUT_LOOP.ID}
          checked={formData[INPUT_LOOP.FIELD_NAME]}
          onChange={onCheckboxChange}
        >
          {INPUT_LOOP.LABEL}
        </InputCheckboxDefault>
      </CarouselGeneratorFormItem>

      <CarouselGeneratorFormItem>
        <InputCheckboxDefault
          name={INPUT_DRAG_FREE.FIELD_NAME}
          id={INPUT_DRAG_FREE.ID}
          checked={formData[INPUT_DRAG_FREE.FIELD_NAME]}
          onChange={onCheckboxChange}
        >
          {INPUT_DRAG_FREE.LABEL}
        </InputCheckboxDefault>
      </CarouselGeneratorFormItem>

      <CarouselGeneratorFormItem>
        <InputCheckboxDefault
          name={INPUT_ACCESSIBILITY.FIELD_NAME}
          id={INPUT_ACCESSIBILITY.ID}
          checked={formData[INPUT_ACCESSIBILITY.FIELD_NAME]}
          onChange={onCheckboxChange}
          disabled
        >
          {INPUT_ACCESSIBILITY.LABEL}
        </InputCheckboxDefault>
      </CarouselGeneratorFormItem>
    </>
  )
}
