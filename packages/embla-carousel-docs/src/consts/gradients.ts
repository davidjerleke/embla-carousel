import { css } from 'styled-components'
import { COLORS } from 'consts/themes'

export const BRAND_GRADIENT_BACKGROUND_STYLES = css`
  background-image: linear-gradient(
    45deg,
    ${COLORS.BRAND_PRIMARY},
    ${COLORS.BRAND_SECONDARY}
  );
`

export const BRAND_GRADIENT_TEXT_STYLES = css`
  color: ${COLORS.BRAND_PRIMARY};

  ${BRAND_GRADIENT_BACKGROUND_STYLES};
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`
