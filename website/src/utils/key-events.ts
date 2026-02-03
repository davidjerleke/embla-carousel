import { css } from 'styled-components'
import { COLORS } from '@/utils/theme'
import { BORDER_SIZES } from '@/utils/border'

/* CONSTS */
export const KEY_NAVIGATING_STYLES = css<{ $isKeyNavigating: boolean }>`
  &:focus {
    outline: ${({ $isKeyNavigating }) =>
      $isKeyNavigating
        ? `${COLORS.BRAND_PRIMARY} solid ${BORDER_SIZES.OUTLINE}`
        : 0};
  }
`
