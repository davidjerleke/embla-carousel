import { COLORS } from 'consts/themes'
import { FONT_SIZES } from 'consts/fontSizes'
import { css } from 'styled-components'

export const BASE_FONT_STYLES = '62.5%'

export const BASE_STYLES = css`
  html {
    background-color: ${COLORS.BACKGROUND_SITE};
    font-size: ${BASE_FONT_STYLES};
  }
  body {
    background-color: ${COLORS.BACKGROUND_SITE};
    color: ${COLORS.TEXT_HIGH_CONTRAST};
    font-size: ${FONT_SIZES.BODY};
    line-height: 1.65;
  }
`
