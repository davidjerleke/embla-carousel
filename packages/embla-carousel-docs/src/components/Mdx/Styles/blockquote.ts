import { css } from 'styled-components'
import { COLORS } from 'consts'

export const blockquoteStyles = css`
  blockquote {
    padding-left: 2.4rem;
    border-left: 0.4rem solid ${COLORS.DETAIL_LOW_CONTRAST};

    > *:last-child {
      margin-bottom: 0;
    }
  }
`
