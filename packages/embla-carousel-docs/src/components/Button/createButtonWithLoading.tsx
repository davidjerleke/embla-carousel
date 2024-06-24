import React from 'react'
import styled, { css } from 'styled-components'
import { PropType as ButtonBarePropType } from './ButtonBare'
import { ButtonPrimaryFilled } from './ButtonPrimaryFilled'
import {
  LoadSpinner,
  PropType as LoadSpinnerPropType
} from 'components/LoadSpinner/LoadSpinner'

const ButtonLoadSpinner = styled(LoadSpinner)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const ButtonLoadSpinnerText = styled.span``

const buttonWithLoadingStyles = css<{ $isLoading: boolean }>`
  position: relative;
  width: 100%;
  text-align: center;
  justify-content: center;

  ${({ $isLoading }) =>
    $isLoading &&
    css`
      ${ButtonLoadSpinnerText} {
        opacity: 0;
      }
    `}
`

type PropType = ButtonBarePropType & {
  isLoading: boolean
}

export const createButtonWithLoading = (
  ButtonComponent: typeof ButtonPrimaryFilled,
  size?: LoadSpinnerPropType['size'],
  color?: LoadSpinnerPropType['color']
): ((props: PropType) => JSX.Element) => {
  const displayName = `${ButtonComponent.displayName}WithLoading`

  const Button = styled(ButtonComponent)`
    ${buttonWithLoadingStyles};
  `

  const ButtonWithLoading = (props: PropType) => {
    const { children, isLoading, ...restProps } = props

    return (
      <Button $isLoading={isLoading} {...restProps}>
        <ButtonLoadSpinnerText>{children}</ButtonLoadSpinnerText>
        {isLoading && <ButtonLoadSpinner size={size} color={color} />}
      </Button>
    )
  }

  ButtonWithLoading.displayName = displayName
  return ButtonWithLoading
}
