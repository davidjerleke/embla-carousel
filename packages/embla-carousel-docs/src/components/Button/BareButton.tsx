import React, { PropsWithChildren, ButtonHTMLAttributes } from 'react'
import styled, { css } from 'styled-components'
import { useTabAccess } from 'hooks/useTabAccess'
import { COLORS } from 'consts/themes'
import {
  tabAccessStyles,
  OUTLINE_SIZE,
} from 'components/TabAccess/tabAccessStyles'

export const bareButtonStyles = css<{
  $isTabbing: boolean
  $isButton?: boolean
}>`
  ${tabAccessStyles};
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

const Wrapper = styled.button`
  ${bareButtonStyles};
  position: relative;
`

export type PropType = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement>
>

export const BareButton = (props: PropType) => {
  const { children, ...restProps } = props
  const isTabbing = useTabAccess()

  return (
    <Wrapper $isTabbing={isTabbing} $isButton {...restProps}>
      {children}
    </Wrapper>
  )
}
