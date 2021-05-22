import { css } from 'styled-components'

export const OUTLINE_SIZE = '0.2rem'

export const tabAccessStyles = css<{ $isTabbing: boolean }>`
  &:focus {
    outline: ${({ $isTabbing }) =>
      $isTabbing ? `var(--brand-primary) solid ${OUTLINE_SIZE}` : 0};
  }
`
