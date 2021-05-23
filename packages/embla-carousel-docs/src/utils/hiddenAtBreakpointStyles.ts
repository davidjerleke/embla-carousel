import { css } from 'styled-components'
import { breakpoints, BreakpointKeyType } from 'consts'

export const hiddenAtBreakpointStyles = css<{ $hidden?: BreakpointKeyType }>`
  ${({ $hidden }) =>
    $hidden &&
    css`
      ${breakpoints[$hidden]} {
        display: none;
      }
    `};
`
