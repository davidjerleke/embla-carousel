import { COLORS } from 'consts/themes'
import React from 'react'
import styled, { css } from 'styled-components'
import { createSquareSizeStyles } from 'utils/createSquareSizeStyles'

const DEFAULT_SIZE = '3rem'
const DEFAULT_THICKNESS = '0.2rem'

const LoadSpinnerWrapper = styled.span<{
  $size: string
  $thickness: string
  $color: string
}>`
  ${({ $size }) => createSquareSizeStyles($size)}
  display: inline-flex;
  position: relative;

  > span {
    ${({ $size, $thickness, $color }) => css`
      ${createSquareSizeStyles($size)}
      border: ${$thickness} solid ${$color};
      border-color: ${$color} transparent transparent transparent;
    `}
    display: block;
    position: absolute;
    border-radius: 50%;
    animation: rotate 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  }

  > span:nth-child(1) {
    animation-delay: -0.45s;
  }
  > span:nth-child(2) {
    animation-delay: -0.3s;
  }
  > span:nth-child(3) {
    animation-delay: -0.15s;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

type PropType = {
  size?: string
  thickness?: string
  color?: string
}

export const LoadSpinner = (props: PropType) => {
  const {
    size = DEFAULT_SIZE,
    thickness = DEFAULT_THICKNESS,
    color = COLORS.DETAIL_HIGH_CONTRAST,
    ...restProps
  } = props

  return (
    <LoadSpinnerWrapper
      $size={size}
      $thickness={thickness}
      $color={color}
      {...restProps}
    >
      <span />
      <span />
      <span />
      <span />
    </LoadSpinnerWrapper>
  )
}
