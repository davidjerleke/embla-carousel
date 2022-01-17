import { gradientBackgroundStyles } from './gradientBackgroundStyles'
import { supportsStyles } from 'consts'
import { css } from 'styled-components'

export const gradientTextStyles = css`
  color: var(--brand-primary);
  ${supportsStyles.gradientText} {
    ${gradientBackgroundStyles};
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`
