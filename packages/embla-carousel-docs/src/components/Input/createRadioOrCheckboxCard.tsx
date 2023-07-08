import React from 'react'
import styled from 'styled-components'
import { keyNavigatingStyles } from 'components/KeyNavigating/keyNavigatingStyles'
import { CARD_STYLES } from 'consts/card'
import { useKeyNavigating } from 'hooks/useKeyNavigating'
import { createSquareSizeStyles } from 'utils/createSquareSizeStyles'
import { kebabCaseToPascalCase } from 'utils/kebabCaseToPascalCase'
import { PropType } from './createRadioOrCheckboxDefault'
import { BRAND_GRADIENT_BACKGROUND_STYLES } from 'consts/gradients'
import { BORDER_RADIUSES, BORDER_SIZES } from 'consts/border'
import { LAYERS } from 'consts/layers'
import { COLORS } from 'consts/themes'

const RadioOrCheckboxCardWrapper = styled.label`
  ${CARD_STYLES};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100%;
`

const LabelContent = styled.span`
  z-index: ${LAYERS.STEP};
  position: relative;
  display: block;
  width: 100%;
  cursor: pointer;
`

const Highlight = styled.span`
  ${BRAND_GRADIENT_BACKGROUND_STYLES};
  top: -${BORDER_SIZES.DETAIL};
  left: -${BORDER_SIZES.DETAIL};
  bottom: -${BORDER_SIZES.DETAIL};
  right: -${BORDER_SIZES.DETAIL};
  display: block;
  position: absolute;
  border-radius: inherit;
  pointer-events: none;
  visibility: hidden;

  &:after {
    background-color: ${COLORS.BACKGROUND_CODE};
    border-radius: inherit;
    position: absolute;
    top: ${BORDER_SIZES.OUTLINE};
    left: ${BORDER_SIZES.OUTLINE};
    bottom: ${BORDER_SIZES.OUTLINE};
    right: ${BORDER_SIZES.OUTLINE};
    content: '';
  }
`

const Input = styled.input<{ $isKeyNavigating: boolean }>`
  ${keyNavigatingStyles};
  position: absolute;
  border-radius: ${BORDER_RADIUSES.CARD};
  top: 0;
  left: 0;
  ${createSquareSizeStyles('100%')};
  appearance: none;
  -webkit-appearance: none;
  border: 0;
  background-color: transparent;
  pointer-events: none;

  &:after {
    display: block;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    ${createSquareSizeStyles('100%')};
  }

  &:checked + ${Highlight} {
    visibility: visible;
  }

  &[disabled] + ${Highlight} + ${LabelContent} {
    cursor: not-allowed;
  }

  &[disabled]:checked + ${Highlight} {
    background-image: none;
    background-color: ${COLORS.DETAIL_HIGH_CONTRAST};
  }
`

export const createRadioOrCheckboxCard = (
  type: 'radio' | 'checkbox'
): ((props: PropType) => JSX.Element) => {
  const displayName = kebabCaseToPascalCase(`input-${type}-card`)

  const InputSelectionComponent = (props: PropType) => {
    const { children, ...restProps } = props
    const { isKeyNavigating } = useKeyNavigating()

    return (
      <RadioOrCheckboxCardWrapper htmlFor={restProps.id}>
        <Input type={type} $isKeyNavigating={isKeyNavigating} {...restProps} />
        <Highlight />
        <LabelContent>{children}</LabelContent>
      </RadioOrCheckboxCardWrapper>
    )
  }

  InputSelectionComponent.displayName = displayName
  return InputSelectionComponent
}
