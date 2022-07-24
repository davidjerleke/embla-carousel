import { css } from 'styled-components'
import { COLORS } from 'consts'

export const hrStyles = css`
  hr {
    border-top: 0;
    border-right: 0;
    border-left: 0;
    border-bottom: 0.1rem solid ${COLORS.DETAIL_MEDIUM_CONTRAST};
  }
`
