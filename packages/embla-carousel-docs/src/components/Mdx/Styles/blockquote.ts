import { css } from 'styled-components'
import { COLORS } from 'consts/themes'
import { SPACINGS } from 'consts/spacings'

export const blockquoteStyles = css`
  blockquote {
    padding-left: ${SPACINGS.FOUR};
    border-left: 0.4rem solid ${COLORS.DETAIL_LOW_CONTRAST};

    > *:last-child {
      margin-bottom: 0;
    }
  }
`
