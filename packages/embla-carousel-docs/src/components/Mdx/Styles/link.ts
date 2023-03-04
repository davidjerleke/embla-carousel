import { css } from 'styled-components'
import { gradientTextStyles } from 'utils/gradientTextStyles'
import { CODE_HIGHLIGHT_CLASS_NAME } from '../Components/Code'

export const linkStyles = css`
  a .${CODE_HIGHLIGHT_CLASS_NAME} > span {
    ${gradientTextStyles};
  }
`
