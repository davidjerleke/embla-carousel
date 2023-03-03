import React, { PropsWithRef } from 'react'
import styled, { css } from 'styled-components'
import { useKeyNavigating } from 'hooks/useKeyNavigating'
import { COLORS } from 'consts/themes'
import {
  keyNavigatingStyles,
  OUTLINE_SIZE,
} from 'components/KeyNavigating/keyNavigatingStyles'

export const bareButtonStyles = css<{
  $isKeyNavigating: boolean
  $isButton?: boolean
}>`
  ${keyNavigatingStyles};
  color: ${COLORS.TEXT_BODY};
  outline-offset: -${OUTLINE_SIZE};
  -webkit-tap-highlight-color: rgba(
    ${COLORS.TEXT_HIGH_CONTRAST_RGB_VALUE},
    0.5
  );
  -webkit-appearance: none;
  appearance: none;
  background-color: transparent;
  touch-action: manipulation;
  display: inline-flex;
  text-decoration: none;
  cursor: pointer;
  border: 0;
  padding: 0;
  margin: 0;

  ${({ $isButton }) =>
    $isButton &&
    css`
      &:disabled {
        cursor: not-allowed;
      }
    `}
`

const BareButtonWrapper = styled.button`
  ${bareButtonStyles};
  position: relative;
`

export type PropType = PropsWithRef<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
>

export const BareButton = React.forwardRef(function BareButton(
  props: PropType,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const { children, ...restProps } = props
  const { isKeyNavigating } = useKeyNavigating()

  return (
    <BareButtonWrapper
      $isKeyNavigating={isKeyNavigating}
      ref={ref}
      $isButton
      {...restProps}
    >
      {children}
    </BareButtonWrapper>
  )
})
