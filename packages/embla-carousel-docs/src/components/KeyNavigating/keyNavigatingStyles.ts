import { css } from 'styled-components'
import { COLORS } from 'consts/themes'
import { BORDER_SIZES } from 'consts/border'

export const keyNavigatingStyles = css<{ $isKeyNavigating: boolean }>`
  &:focus {
    outline: ${({ $isKeyNavigating }) =>
      $isKeyNavigating
        ? `${COLORS.BRAND_PRIMARY} solid ${BORDER_SIZES.OUTLINE}`
        : 0};
  }
`
