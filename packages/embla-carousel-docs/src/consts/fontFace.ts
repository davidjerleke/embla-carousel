import { css } from 'styled-components'
import { INTER_ITALIC_VARIABLE_BASE_64 } from 'assets/fonts/inter-italic-var-base64'
import { INTER_ROMAN_VARIABLE_BASE_64 } from 'assets/fonts/inter-roman-var-base64'

export const FONT_FAMILY = `'Inter var'`
const FONT_WEIGHT_RANGE = '400 900'

export const FONT_FACE_STYLES = css`
  @supports (font-variation-settings: normal) {
    @font-face {
      font-family: ${FONT_FAMILY};
      font-weight: ${FONT_WEIGHT_RANGE};
      font-style: normal;
      font-named-instance: 'Regular';
      src: url(${INTER_ROMAN_VARIABLE_BASE_64})
          format('woff2 supports variations(gvar)'),
        url(${INTER_ROMAN_VARIABLE_BASE_64}) format('woff2-variations'),
        url(${INTER_ROMAN_VARIABLE_BASE_64}) format('woff2');
    }

    @font-face {
      font-family: ${FONT_FAMILY};
      font-weight: ${FONT_WEIGHT_RANGE};
      font-style: italic;
      font-named-instance: 'Italic';
      src: url(${INTER_ITALIC_VARIABLE_BASE_64})
          format('woff2 supports variations(gvar)'),
        url(${INTER_ITALIC_VARIABLE_BASE_64}) format('woff2-variations'),
        url(${INTER_ITALIC_VARIABLE_BASE_64}) format('woff2');
    }
  }
`
