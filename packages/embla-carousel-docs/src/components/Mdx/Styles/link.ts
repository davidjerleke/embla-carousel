import { css } from 'styled-components'
import { BRAND_GRADIENT_TEXT_STYLES } from 'consts/gradients'
import { CODE_HIGHLIGHT_CLASS_NAME } from '../Components/Code'

export const linkStyles = css`
  a .${CODE_HIGHLIGHT_CLASS_NAME} > span {
    ${BRAND_GRADIENT_TEXT_STYLES};
  }
`
