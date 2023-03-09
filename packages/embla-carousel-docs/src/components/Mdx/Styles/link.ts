import { css } from 'styled-components'
import { brandGradientTextStyles } from 'consts/gradients'
import { CODE_HIGHLIGHT_CLASS_NAME } from '../Components/Code'

export const linkStyles = css`
  a .${CODE_HIGHLIGHT_CLASS_NAME} > span {
    ${brandGradientTextStyles};
  }
`
