import React from 'react'
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

export const CarouselGeneratorBasicSettings = () => {
  const { formData, onCheckboxChange, onRadioChange } = useCarouselGenerator()

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
    </>
  )
}
