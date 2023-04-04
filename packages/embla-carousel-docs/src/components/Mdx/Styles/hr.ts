import { css } from 'styled-components'
import { COLORS } from 'consts/themes'
import { BORDER_SIZES } from 'consts/border'
import { HEADING_TOP_SPACING } from './heading'
import { SPACINGS } from 'consts/spacings'

const DECORATION_WIDTH = SPACINGS.CUSTOM(({ EIGHT }) => EIGHT + 0.2)

export const hrStyles = css`
  hr {
    border-top: 0;
    border-right: 0;
    border-left: 0;
    border-bottom: ${BORDER_SIZES.DETAIL} solid ${COLORS.DETAIL_MEDIUM_CONTRAST};
    margin-top: ${HEADING_TOP_SPACING};
    width: ${DECORATION_WIDTH};
    background-color: ${COLORS.DETAIL_MEDIUM_CONTRAST};
  }
`
