import { css } from 'styled-components'
import { COLORS } from 'consts/themes'

export const OUTLINE_SIZE = '0.2rem'

export const tabAccessStyles = css<{ $isTabbing: boolean }>`
  &:focus {
    outline: ${({ $isTabbing }) =>
      $isTabbing ? `${COLORS.BRAND_PRIMARY} solid ${OUTLINE_SIZE}` : 0};
  }
`
