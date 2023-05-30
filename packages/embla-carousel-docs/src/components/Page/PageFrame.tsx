import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { SPACINGS } from 'consts/spacings'

type FrameSizesType = keyof typeof PAGE_FRAME_SIZES

const PAGE_FRAME_SIZES = {
  DEFAULT: '144rem',
  MD: '100rem',
  SM: '68rem'
}

export const PAGE_FRAME_SPACING = SPACINGS.FOUR

const PageFrameWrapper = styled.div<{ $size: string }>`
  margin-left: auto;
  margin-right: auto;
  padding-left: ${PAGE_FRAME_SPACING};
  padding-right: ${PAGE_FRAME_SPACING};
  max-width: ${({ $size }) => $size};
  width: 100%;
`

type PropType = PropsWithChildren<{
  size?: FrameSizesType
}>

export const PageFrame = (props: PropType) => {
  const { size = 'DEFAULT', children, ...restProps } = props
  const frameSize = PAGE_FRAME_SIZES[size]

  return (
    <PageFrameWrapper $size={frameSize} {...restProps}>
      {children}
    </PageFrameWrapper>
  )
}
