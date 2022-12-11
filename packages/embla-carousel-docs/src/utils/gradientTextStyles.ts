import { gradientBackgroundStyles } from './gradientBackgroundStyles'
import { COLORS } from 'consts/themes'
import { css } from 'styled-components'

export const gradientTextStyles = css`
  color: ${COLORS.BRAND_PRIMARY};

  ${gradientBackgroundStyles};
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`
