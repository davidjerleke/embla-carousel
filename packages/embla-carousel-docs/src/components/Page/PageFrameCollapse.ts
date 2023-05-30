import { css } from 'styled-components'
import { PAGE_FRAME_SPACING } from 'components/Page/PageFrame'
import { MEDIA } from 'consts/breakpoints'

export const pageFrameCollapseStyles = css`
  ${MEDIA.MAX_XS} {
    width: calc(100% + ${PAGE_FRAME_SPACING} * 2);
    margin-left: -${PAGE_FRAME_SPACING};
    margin-right: -${PAGE_FRAME_SPACING};
  }
`
