import { css } from 'styled-components'
import { COLORS } from '@/utils/theme'
import { BORDER_SIZES } from '@/utils/border'

/* CONSTS */
export type KeyNavigatingPropType = {
  $isKeyNavigating: boolean
}

export const KEY_NAVIGATING_STYLES = css<KeyNavigatingPropType>`
  &:focus {
    outline: ${({ $isKeyNavigating }) =>
      $isKeyNavigating
        ? `${COLORS.BRAND_PRIMARY} solid ${BORDER_SIZES.OUTLINE}`
        : 0};
  }
`
