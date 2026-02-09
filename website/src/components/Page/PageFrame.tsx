import { PropsWithChildren } from 'react'
import styled from 'styled-components'
import {
  FrameSizesType,
  PAGE_FRAME_SIZES,
  PAGE_FRAME_SPACING
} from '@/utils/page'

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

export function PageFrame(props: PropType) {
  const { size = 'DEFAULT', children, ...restProps } = props
  const frameSize = PAGE_FRAME_SIZES[size]

  return (
    <PageFrameWrapper $size={frameSize} {...restProps}>
      {children}
    </PageFrameWrapper>
  )
}
