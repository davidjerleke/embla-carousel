import styled, { css } from 'styled-components'
import { MEDIA } from 'consts/breakpoints'
import { FRAME_SPACING } from './Frame'

export const frameCollapseStyles = css`
  ${MEDIA.MAX_XS} {
    width: calc(100% + ${FRAME_SPACING} * 2);
    margin-left: -${FRAME_SPACING};
    margin-right: -${FRAME_SPACING};
  }
`

export const FrameCollapse = styled.div`
  ${frameCollapseStyles};
`
