import { css } from 'styled-components'
import { MEDIA } from 'consts/breakpoints'
import { BreakpointKeyType } from 'consts/breakpoints'

export const hiddenAtBreakpointStyles = css<{ $hidden?: BreakpointKeyType }>`
  ${({ $hidden }) =>
    $hidden &&
    css`
      ${MEDIA[$hidden]} {
        display: none;
      }
    `};
`
