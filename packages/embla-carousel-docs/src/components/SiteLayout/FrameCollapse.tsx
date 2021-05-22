import { breakpoints } from 'consts'
import styled, { css } from 'styled-components'
import { FRAME_SPACING } from './Frame'

export const frameCollapseStyles = css`
  ${breakpoints.maxXs} {
    width: calc(100% + ${FRAME_SPACING} * 2);
    margin-left: -${FRAME_SPACING};
    margin-right: -${FRAME_SPACING};
  }
`

export const FrameCollapse = styled.div`
  ${frameCollapseStyles};
`
