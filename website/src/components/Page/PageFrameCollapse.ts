import { css } from 'styled-components'
import { MEDIA } from '@/utils/breakpoints'
import { PAGE_FRAME_SPACING } from '@/utils/page'

export const pageFrameCollapseStyles = css`
  ${MEDIA.MAX_XS} {
    width: calc(100% + ${PAGE_FRAME_SPACING} * 2);
    margin-left: -${PAGE_FRAME_SPACING};
    margin-right: -${PAGE_FRAME_SPACING};
  }
`
