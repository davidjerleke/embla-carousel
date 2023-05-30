import styled, { css } from 'styled-components'
import { ButtonBare, ButtonBareText } from './ButtonBare'
import { COLORS } from 'consts/themes'
import { SPACINGS } from 'consts/spacings'
import { FONT_WEIGHTS } from 'consts/fontSizes'
import { LAYERS } from 'consts/layers'
import { BORDER_SIZES } from 'consts/border'
import {
  BRAND_GRADIENT_BACKGROUND_STYLES,
  BRAND_GRADIENT_TEXT_STYLES
} from 'consts/gradients'

export const buttonPrimaryOutlinedStyles = css`
  padding: ${SPACINGS.CUSTOM(() => 1.4)} ${SPACINGS.CUSTOM(() => 2.6)};
  line-height: 1.15;
  border-radius: 3rem;
  font-weight: ${FONT_WEIGHTS.BOLD};
  display: inline-flex;
  position: relative;

  &:before,
  &:after {
    content: '';
    position: absolute;
    pointer-events: none;
    border-radius: inherit;
  }

  &:before {
    ${BRAND_GRADIENT_BACKGROUND_STYLES};
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  &:after {
    background-color: ${COLORS.BACKGROUND_SITE};
    top: ${BORDER_SIZES.OUTLINE};
    left: ${BORDER_SIZES.OUTLINE};
    bottom: ${BORDER_SIZES.OUTLINE};
    right: ${BORDER_SIZES.OUTLINE};
  }

  ${ButtonBareText} {
    ${BRAND_GRADIENT_TEXT_STYLES};
    z-index: ${LAYERS.STEP};
  }
`

export const ButtonPrimaryOutlined = styled(ButtonBare)`
  ${buttonPrimaryOutlinedStyles};

  &:disabled {
    &:before {
      background-image: none;
      background-color: ${COLORS.DETAIL_HIGH_CONTRAST};
    }

    ${ButtonBareText} {
      background-image: none;
      background-clip: border-box;
      -webkit-background-clip: border-box;
      -webkit-text-fill-color: currentcolor;
      color: ${COLORS.DETAIL_HIGH_CONTRAST};
    }
  }
`
