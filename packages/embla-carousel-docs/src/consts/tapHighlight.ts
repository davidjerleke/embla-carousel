import { css } from 'styled-components'
import { COLORS } from './themes'

export const TAP_HIGHLIGHT_STYLES = css`
  -webkit-tap-highlight-color: rgba(
    ${COLORS.TEXT_HIGH_CONTRAST_RGB_VALUE},
    0.5
  );
`
