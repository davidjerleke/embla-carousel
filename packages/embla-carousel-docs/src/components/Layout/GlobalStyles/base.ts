import { COLORS } from 'consts'
import { css } from 'styled-components'

export const baseStyles = css`
  html {
    background-color: ${COLORS.BACKGROUND_SITE};
    font-size: 62.5%;
  }
  body {
    background-color: ${COLORS.BACKGROUND_SITE};
    color: ${COLORS.TEXT_HIGH_CONTRAST};
    line-height: 1.65;
    font-size: 1.6rem;
  }
`
