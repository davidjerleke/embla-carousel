import styled, { css } from 'styled-components'
import { ButtonBare } from './ButtonBare'
import { COLORS } from 'consts/themes'
import { SPACINGS } from 'consts/spacings'
import { BRAND_GRADIENT_BACKGROUND_STYLES } from 'consts/gradients'
import { FONT_WEIGHTS } from 'consts/fontSizes'
import { BUTTON_SIZES } from 'consts/buttons'
import { createButtonWithLoading } from './createButtonWithLoading'

export const buttonPrimaryFilledStyles = css`
  ${BUTTON_SIZES.MD}
  ${BRAND_GRADIENT_BACKGROUND_STYLES};
  color: ${COLORS.BACKGROUND_SITE};
  line-height: 1.15;
  font-weight: ${FONT_WEIGHTS.BOLD};
  display: inline-flex;
  align-items: center;
`

export const ButtonPrimaryFilled = styled(ButtonBare)`
  ${buttonPrimaryFilledStyles};

  &:disabled {
    background-image: none;
    background-color: ${COLORS.DETAIL_HIGH_CONTRAST};
  }
`

export const ButtonPrimaryFilledWithLoading = createButtonWithLoading(
  ButtonPrimaryFilled,
  SPACINGS.FOUR,
  COLORS.TEXT_BODY
)
