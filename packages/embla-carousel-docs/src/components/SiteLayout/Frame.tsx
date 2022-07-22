import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { MEDIA } from 'consts'

export const FRAME_SPACING = '2.4rem'
const FRAME_MAX_WIDTH = '100rem'

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: ${FRAME_SPACING};
  padding-right: ${FRAME_SPACING};
  max-width: ${FRAME_MAX_WIDTH};
  width: 100%;

  ${MEDIA.DESKTOP} {
    width: 90%;
  }
`

type PropType = PropsWithChildren<{}>

export const Frame = (props: PropType) => {
  const { children, ...restProps } = props
  return <Wrapper {...restProps}>{children}</Wrapper>
}
