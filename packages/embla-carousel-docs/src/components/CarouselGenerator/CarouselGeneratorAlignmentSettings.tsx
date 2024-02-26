import React from 'react'
import { InputRadioDefault } from 'components/Input/InputRadio'
import { InputCheckboxDefault } from 'components/Input/InputCheckbox'
import { Admonition } from 'components/Mdx/Components/Admonition'
import { useCarouselGenerator } from 'hooks/useCarouselGenerator'
import {
  SANDBOX_GENERATOR_FORM_FIELDS,
  SandboxGeneratorSettingsType
} from 'consts/sandbox'
import {
  CarouselGeneratorFormItem,
  CarouselGeneratorFormItems
} from './CarouselGeneratorFormItems'
import {
  SandboxGeneratorCheckboxType,
  SandboxGeneratorRadioType,
  createSandboxGeneratorInputId
} from 'utils/sandbox'

const INPUT_ALIGN: SandboxGeneratorRadioType<'align'> = {
  ...createSandboxGeneratorInputId(SANDBOX_GENERATOR_FORM_FIELDS.ALIGN),
  OPTIONS: [
    { LABEL: 'Start', VALUE: 'start' },
    { LABEL: 'Center', VALUE: 'center' },
    { LABEL: 'End', VALUE: 'end' }
  ]
}

const INPUT_CONTAIN_SCROLL: SandboxGeneratorCheckboxType<'containScroll'> = {
  ...createSandboxGeneratorInputId(
    SANDBOX_GENERATOR_FORM_FIELDS.CONTAIN_SCROLL
  ),
  LABEL: 'Clear leading and trailing space'
}

export const CarouselGeneratorAlignmentSettings = () => {
  const { formData, onChange, onRadioChange } = useCarouselGenerator()
  const slideSize = formData[SANDBOX_GENERATOR_FORM_FIELDS.SLIDE_SIZE]
  const loop = formData[SANDBOX_GENERATOR_FORM_FIELDS.LOOP]

  return (
    <>
      {slideSize === '100' && (
        <Admonition type="note">
          Aligment settings will only make a visual <strong>difference</strong>{' '}
          for carousels with slide sizes <strong>less than 100%</strong>.
        </Admonition>
      )}

      <CarouselGeneratorFormItems role="radiogroup" aria-label={INPUT_ALIGN.ID}>
        {INPUT_ALIGN.OPTIONS.map(({ VALUE, LABEL }) => (
          <div key={LABEL}>
            <InputRadioDefault
              name={INPUT_ALIGN.FIELD_NAME}
              id={`${INPUT_ALIGN.ID}-${VALUE}`}
              value={VALUE as string}
              checked={formData[INPUT_ALIGN.FIELD_NAME] === VALUE}
              onChange={onRadioChange}
            >
              {LABEL}
            </InputRadioDefault>
          </div>
        ))}
      </CarouselGeneratorFormItems>

      {!loop && (
        <CarouselGeneratorFormItem>
          <InputCheckboxDefault
            name={INPUT_CONTAIN_SCROLL.FIELD_NAME}
            id={INPUT_CONTAIN_SCROLL.ID}
            checked={formData[INPUT_CONTAIN_SCROLL.FIELD_NAME] === 'trimSnaps'}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const { name, checked } = event.currentTarget
              const fieldName = name as keyof SandboxGeneratorSettingsType
              onChange(fieldName, checked ? 'trimSnaps' : false)
            }}
          >
            {INPUT_CONTAIN_SCROLL.LABEL}
          </InputCheckboxDefault>
        </CarouselGeneratorFormItem>
      )}
    </>
  )
}
