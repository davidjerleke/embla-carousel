import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { SPACINGS } from 'consts/spacings'

type FrameSizesType = keyof typeof FRAME_SIZES

export const FRAME_SIZES = {
  DEFAULT: '144rem',
  MD: '100rem',
}

export const FRAME_SPACING = SPACINGS.FOUR

const Wrapper = styled.div<{ $size: string }>`
  margin-left: auto;
  margin-right: auto;
  padding-left: ${FRAME_SPACING};
  padding-right: ${FRAME_SPACING};
  max-width: ${({ $size }) => $size};
  width: 100%;
`

type PropType = PropsWithChildren<{
  size?: FrameSizesType
}>

export const Frame = (props: PropType) => {
  const { size = 'DEFAULT', children, ...restProps } = props
  const frameSize = FRAME_SIZES[size]

  return (
    <Wrapper $size={frameSize} {...restProps}>
      {children}
    </Wrapper>
  )
}
