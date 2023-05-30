import React from 'react'
import styled from 'styled-components'
import { useCarouselGenerator } from 'hooks/useCarouselGenerator'
import { CAROUSEL_GENERATOR_FORM_FIELDS } from 'consts/carouselGenerator'
import { SANDBOXES } from 'components/Examples/CarouselGenerator/CarouselGeneratorSandboxes'
import { SandboxSelectionInput } from 'components/Sandbox/SandboxSelectionInput'
import { snakeCaseToKebabCase } from 'utils/snakeCaseToKebabCase'
import { createGapStyles } from 'utils/createGapStyles'
import { SANDBOX_SELECTION_SPACING } from 'consts/sandbox'
import {
  CarouselGeneratorRadioType,
  createCarouselGeneratorInputId
} from 'utils/carouselGenerator'

const INPUT_FRAMEWORK: CarouselGeneratorRadioType<'framework'> = {
  ...createCarouselGeneratorInputId(CAROUSEL_GENERATOR_FORM_FIELDS.FRAMEWORK),
  OPTIONS: []
}

const SandboxSelectionList = styled.ul`
  ${createGapStyles(
    SANDBOX_SELECTION_SPACING,
    SANDBOX_SELECTION_SPACING,
    'li'
  )};
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
`

export const CarouselGeneratorFrameworkSettings = () => {
  const { formData, onRadioChange } = useCarouselGenerator()

  return (
    <div>
      <SandboxSelectionList role="radiogroup" aria-label={INPUT_FRAMEWORK.ID}>
        {SANDBOXES.map((sandbox) => (
          <li key={sandbox.key}>
            <SandboxSelectionInput
              framework={sandbox.key}
              name={INPUT_FRAMEWORK.FIELD_NAME}
              id={`${INPUT_FRAMEWORK.ID}-${snakeCaseToKebabCase(sandbox.key)}`}
              value={sandbox.key}
              onChange={onRadioChange}
              checked={formData[INPUT_FRAMEWORK.FIELD_NAME] === sandbox.key}
            >
              {sandbox.label}
            </SandboxSelectionInput>
          </li>
        ))}
      </SandboxSelectionList>
    </div>
  )
}
