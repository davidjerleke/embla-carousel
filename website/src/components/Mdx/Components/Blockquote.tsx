import styled from 'styled-components'
import { COLORS } from '@/utils/theme'
import { SPACINGS } from '@/utils/spacings'
import { BORDER_SIZES } from '@/utils/border'

export const Blockquote = styled.blockquote`
  padding-left: ${SPACINGS.FOUR};
  border-left: ${BORDER_SIZES.ACCENT_VERTICAL} solid
    ${COLORS.DETAIL_LOW_CONTRAST};

  > *:last-child {
    margin-bottom: 0;
  }
`
