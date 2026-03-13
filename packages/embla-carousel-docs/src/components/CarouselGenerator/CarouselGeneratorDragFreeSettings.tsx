import React from 'react'
import { InputRadioDefault } from 'components/Input/InputRadio'
import { useCarouselGenerator } from 'hooks/useCarouselGenerator'
import {
  SANDBOX_GENERATOR_FORM_FIELDS,
  SandboxGeneratorSettingsType
} from 'consts/sandbox'
import {
  SandboxGeneratorRadioType,
  createSandboxGeneratorInputId
} from 'utils/sandbox'
import { CarouselGeneratorFormItems } from './CarouselGeneratorFormItems'

const INPUT_DRAG_FREE: SandboxGeneratorRadioType<'dragFree'> = {
  ...createSandboxGeneratorInputId(SANDBOX_GENERATOR_FORM_FIELDS.DRAG_FREE),
  OPTIONS: [
    { LABEL: 'Disabled', VALUE: false },
    { LABEL: 'Enabled', VALUE: true },
    { LABEL: 'Snap', VALUE: 'snap' }
  ]
}

export const CarouselGeneratorDragFreeSettings = () => {
  const { formData, onChange } = useCarouselGenerator()

  return (
    <CarouselGeneratorFormItems
      role="radiogroup"
      aria-label={INPUT_DRAG_FREE.ID}
    >
      {INPUT_DRAG_FREE.OPTIONS.map(({ VALUE, LABEL }) => (
        <div key={String(VALUE)}>
          <InputRadioDefault
            name={INPUT_DRAG_FREE.FIELD_NAME}
            id={`${INPUT_DRAG_FREE.ID}-${VALUE}`}
            value={String(VALUE)}
            checked={formData[INPUT_DRAG_FREE.FIELD_NAME] === VALUE}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const { name, value } = event.currentTarget
              const fieldName = name as keyof SandboxGeneratorSettingsType
              const parsed =
                value === 'true' ? true : value === 'false' ? false : value
              onChange(fieldName, parsed)
            }}
          >
            {LABEL}
          </InputRadioDefault>
        </div>
      ))}
    </CarouselGeneratorFormItems>
  )
}
