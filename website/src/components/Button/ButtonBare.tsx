import React, { ComponentPropsWithRef } from 'react'
import styled, { css } from 'styled-components'
import { COLORS } from '@/utils/theme'
import { BORDER_SIZES } from '@/utils/border'
import { TAP_HIGHLIGHT_STYLES } from '@/utils/tap-highlight'
import { useAppSelector } from '@/hooks/redux'
import { selectKeyNavigating } from '@/components/KeyEvents/key-events-reducer'
import {
  KEY_NAVIGATING_STYLES,
  type KeyNavigatingPropType
} from '@/utils/key-events'

export const buttonBareStyles = css<
  KeyNavigatingPropType & {
    $isButton?: boolean
  }
>`
  ${KEY_NAVIGATING_STYLES};
  ${TAP_HIGHLIGHT_STYLES};
  color: ${COLORS.TEXT_BODY};
  outline-offset: -${BORDER_SIZES.OUTLINE};
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

const ButtonBareWrapper = styled.button<
  KeyNavigatingPropType & {
    $isButton?: boolean
  }
>`
  ${buttonBareStyles};
  position: relative;
`

export const ButtonBareText = styled.span``

export type PropType = ComponentPropsWithRef<'button'>

export const ButtonBare = React.forwardRef(function ButtonBare(
  props: PropType,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const { children, ...restProps } = props
  const isKeyNavigating = useAppSelector(selectKeyNavigating)

  return (
    <ButtonBareWrapper
      $isKeyNavigating={isKeyNavigating}
      ref={ref}
      $isButton
      {...restProps}
    >
      <ButtonBareText>{children}</ButtonBareText>
    </ButtonBareWrapper>
  )
})
