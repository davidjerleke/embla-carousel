import { css } from 'styled-components'
import { MEDIA, BreakpointKeyType } from 'consts'

export const hiddenAtBreakpointStyles = css<{ $hidden?: BreakpointKeyType }>`
  ${({ $hidden }) =>
    $hidden &&
    css`
      ${MEDIA[$hidden]} {
        display: none;
      }
    `};
`
