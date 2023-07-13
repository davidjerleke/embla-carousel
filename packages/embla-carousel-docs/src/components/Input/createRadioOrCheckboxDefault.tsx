import React, { PropsWithRef } from 'react'
import styled, { css } from 'styled-components'
import { COLORS } from 'consts/themes'
import { SPACINGS } from 'consts/spacings'
import { useKeyNavigating } from 'hooks/useKeyNavigating'
import { createSquareSizeStyles } from 'utils/createSquareSizeStyles'
import { BORDER_RADIUSES } from 'consts/border'
import { BRAND_GRADIENT_BACKGROUND_STYLES } from 'consts/gradients'
import { kebabCaseToPascalCase } from 'utils/kebabCaseToPascalCase'
import { TAP_HIGHLIGHT_STYLES } from 'consts/tapHighlight'
import { KEY_NAVIGATING_STYLES } from 'consts/keyNavigatingStyles'

const INPUT_SIZE = '2.5rem'
const CHECK_SIZE = '1.2rem'

const RadioOrCheckboxDefaultWrapper = styled.span`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
`

const InputWrapper = styled.span`
  flex: 0 0 ${INPUT_SIZE};
  position: relative;
  min-width: 0;
`

const InputLineHeight = styled.span`
  color: ${COLORS.BACKGROUND_SITE};
  width: ${INPUT_SIZE};
  display: inline-block;
  line-height: inherit;
`

const Input = styled.input<{ $isKeyNavigating: boolean }>`
  ${createSquareSizeStyles(INPUT_SIZE)};
  ${TAP_HIGHLIGHT_STYLES};
  ${KEY_NAVIGATING_STYLES};
  appearance: none;
  -webkit-appearance: none;
  position: absolute;
  top: 50%;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  background-color: ${COLORS.DETAIL_MEDIUM_CONTRAST};
  cursor: pointer;

  &:before,
  &:after {
    display: block;
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &:before {
    ${createSquareSizeStyles('2rem')};
    background-color: ${COLORS.BACKGROUND_CODE};
  }

  &:after {
    ${createSquareSizeStyles(CHECK_SIZE)};
  }

  &:checked {
    &:after {
      ${BRAND_GRADIENT_BACKGROUND_STYLES};
    }
  }

  &[disabled] {
    cursor: not-allowed;
  }

  &[disabled]:checked {
    &:after {
      background-image: none;
      background-color: ${COLORS.DETAIL_HIGH_CONTRAST};
    }
  }
`

const InputRadio = styled(Input)`
  border-radius: ${BORDER_RADIUSES.CIRCLE};

  &:before {
    border-radius: ${BORDER_RADIUSES.CIRCLE};
  }
  &:after {
    border-radius: ${BORDER_RADIUSES.CIRCLE};
  }
`

const InputCheckbox = styled(Input)`
  border-radius: ${BORDER_RADIUSES.LINE};

  &:before {
    border-radius: ${BORDER_RADIUSES.LINE};
  }

  &:after {
    border-radius: 0;
  }
`

const Label = styled.label<{ $disabled?: boolean }>`
  ${TAP_HIGHLIGHT_STYLES};
  padding-left: ${SPACINGS.TWO};
  min-width: 0;
  flex: 0 0 calc(100% - ${INPUT_SIZE});

  ${({ $disabled }) =>
    $disabled &&
    css`
      color: ${COLORS.TEXT_LOW_CONTRAST};
    `};
`

export type PropType = PropsWithRef<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
>

export const createRadioOrCheckboxDefault = (
  type: 'radio' | 'checkbox'
): ((props: PropType) => JSX.Element) => {
  const InputComponent = type === 'radio' ? InputRadio : InputCheckbox
  const displayName = kebabCaseToPascalCase(`input-${type}-default`)

  const InputSelectionComponent = (props: PropType) => {
    const { children, ...restProps } = props
    const { isKeyNavigating } = useKeyNavigating()

    return (
      <RadioOrCheckboxDefaultWrapper>
        <InputWrapper>
          <InputLineHeight>-</InputLineHeight>
          <InputComponent
            type={type}
            $isKeyNavigating={isKeyNavigating}
            {...restProps}
          />
        </InputWrapper>
        <Label htmlFor={restProps.id} $disabled={restProps.disabled}>
          {children}
        </Label>
      </RadioOrCheckboxDefaultWrapper>
    )
  }

  InputSelectionComponent.displayName = displayName
  return InputSelectionComponent
}
