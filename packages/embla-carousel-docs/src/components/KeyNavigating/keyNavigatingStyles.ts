import { css } from 'styled-components'
import { COLORS } from 'consts/themes'

export const OUTLINE_SIZE = '0.2rem'

export const keyNavigatingStyles = css<{ $isKeyNavigating: boolean }>`
  &:focus {
    outline: ${({ $isKeyNavigating }) =>
      $isKeyNavigating ? `${COLORS.BRAND_PRIMARY} solid ${OUTLINE_SIZE}` : 0};
  }
`
