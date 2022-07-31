import { css } from 'styled-components'
import { COLORS } from 'consts'

export const gradientBackgroundStyles = css`
  background-image: linear-gradient(
    45deg,
    ${COLORS.BRAND_PRIMARY},
    ${COLORS.BRAND_SECONDARY}
  );
`
