import { css } from 'styled-components'
import interRomanVar from 'assets/fonts/Inter-roman.var.woff2'
// import interRomanVarItalic from 'assets/fonts/Inter-italic.var.woff2'

export const FONT_FAMILY = `'Inter var'`
const FONT_WEIGHT_RANGE = '400 900'

export const FONT_FACE_STYLES = css`
  @font-face {
    font-family: ${FONT_FAMILY};
    font-weight: ${FONT_WEIGHT_RANGE};
    font-style: normal;
    font-named-instance: 'Regular';
    src: url(${interRomanVar}) format('woff2 supports variations(gvar)'),
      url(${interRomanVar}) format('woff2-variations'),
      url(${interRomanVar}) format('woff2');
  }
`

// @font-face {
//   font-family: ${FONT_FAMILY};
//   font-weight: ${FONT_WEIGHT_RANGE};
//   font-style: italic;
//   font-named-instance: 'Italic';
//   src: url(${interRomanVarItalic})
//       format('woff2 supports variations(gvar)'),
//     url(${interRomanVarItalic}) format('woff2-variations'),
//     url(${interRomanVarItalic}) format('woff2');
// }
