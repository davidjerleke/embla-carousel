import { css } from 'styled-components'
import { COLORS } from 'consts/themes'
import { SPACINGS } from 'consts/spacings'
import { BORDER_SIZES } from 'consts/border'

export const blockquoteStyles = css`
  blockquote {
    padding-left: ${SPACINGS.FOUR};
    border-left: ${BORDER_SIZES.ACCENT_VERTICAL} solid
      ${COLORS.DETAIL_LOW_CONTRAST};

    > *:last-child {
      margin-bottom: 0;
    }
  }
`
