import styled, { css } from 'styled-components'
import { BareButton } from './BareButton'
import { COLORS } from 'consts/themes'
import { SPACINGS } from 'consts/spacings'
import { BRAND_GRADIENT_BACKGROUND_STYLES } from 'consts/gradients'

export const primaryButtonFilledStyles = css`
  ${BRAND_GRADIENT_BACKGROUND_STYLES};
  color: ${COLORS.BACKGROUND_SITE};
  padding: ${SPACINGS.CUSTOM(({ TWO }) => TWO + 0.2)}
    ${SPACINGS.CUSTOM(({ FOUR }) => FOUR + 0.2)};
  line-height: 1.15;
  border-radius: 3rem;
  font-weight: bold;
  display: inline-flex;
`

export const PrimaryButtonFilled = styled(BareButton)`
  ${primaryButtonFilledStyles};

  &:disabled {
    background-image: none;
    background-color: ${COLORS.DETAIL_HIGH_CONTRAST};
  }
`
