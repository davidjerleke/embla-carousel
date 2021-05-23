import React, { PropsWithChildren, ButtonHTMLAttributes } from 'react'
import styled, { css } from 'styled-components'
import { tabAccessStyles, OUTLINE_SIZE } from 'components/TabAccess'
import { useTabAccess } from 'hooks'

export const plainButtonStyles = css<{ $isTabbing: boolean }>`
  -webkit-tap-highlight-color: rgba(var(--text-high-contrast-rgb-value), 0.5);
  -webkit-appearance: none;
  background-color: transparent;
  touch-action: manipulation;
  display: inline-flex;
  text-decoration: none;
  cursor: pointer;
  border: 0;
  padding: 0;
  margin: 0;
  outline-offset: -${OUTLINE_SIZE};
  ${tabAccessStyles};
  &:disabled {
    cursor: not-allowed;
  }
`

const Wrapper = styled.button`
  ${plainButtonStyles};
`

export type PropType = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement>
>

export const PlainButton = (props: PropType) => {
  const { children, ...restProps } = props
  const isTabbing = useTabAccess()

  return (
    <Wrapper $isTabbing={isTabbing} {...restProps}>
      {children}
    </Wrapper>
  )
}
