import { css } from 'styled-components'
import { COLORS } from 'consts/themes'
import { BORDER_SIZES } from 'consts/border'

export const hrStyles = css`
  hr {
    border-top: 0;
    border-right: 0;
    border-left: 0;
    border-bottom: ${BORDER_SIZES.DETAIL} solid ${COLORS.DETAIL_MEDIUM_CONTRAST};
  }
`
