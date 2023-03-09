import { css } from 'styled-components'
import { COLORS } from 'consts/themes'

export const brandGradientBackgroundStyles = css`
  background-image: linear-gradient(
    45deg,
    ${COLORS.BRAND_PRIMARY},
    ${COLORS.BRAND_SECONDARY}
  );
`

export const brandGradientTextStyles = css`
  color: ${COLORS.BRAND_PRIMARY};

  ${brandGradientBackgroundStyles};
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`
