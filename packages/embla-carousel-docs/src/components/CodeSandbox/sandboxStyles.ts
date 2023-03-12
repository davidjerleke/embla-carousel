import { css } from 'styled-components'
import { styledComponentsStylesToString } from 'utils/styledComponentStylesToString'
import { resetStyles } from 'components/Layout/GlobalStyles/reset'
import { baseStyles } from 'components/Layout/GlobalStyles/base'
import { fontStyles } from 'components/Layout/GlobalStyles/font'
import { CAROUSEL_WRAPPER_RADIUS } from '../Examples/carouselWrapperStyles'
import { MEDIA } from 'consts/breakpoints'
import { BORDER_SIZES } from 'consts/border'
import { FONT_WEIGHTS } from 'consts/fontSizes'
import { COLORS, themeStyles } from 'consts/themes'

const sandboxWrapperStyles = css`
  .sandbox {
    width: 100%;
  }

  ${MEDIA.MIN_SM} {
    .sandbox {
      margin-left: auto;
      margin-right: auto;
      max-width: 67rem;
    }
  }
`

const sandboxCarouselStyles = css`
  .sandbox__carousel {
    position: relative;
    background-color: ${COLORS.BACKGROUND_CODE};
  }

  ${MEDIA.MAX_SM} {
    .sandbox__carousel {
      border-top: ${BORDER_SIZES.DETAIL} solid ${COLORS.DETAIL_LOW_CONTRAST};
      border-bottom: ${BORDER_SIZES.DETAIL} solid ${COLORS.DETAIL_LOW_CONTRAST};
    }
  }

  ${MEDIA.MIN_SM} {
    .sandbox__carousel {
      border-radius: ${CAROUSEL_WRAPPER_RADIUS};
      border: ${BORDER_SIZES.DETAIL} solid ${COLORS.DETAIL_LOW_CONTRAST};
    }
  }
`

const sandboxHeaderStyles = css`
  .sandbox__header {
    font-size: 2rem;
    font-weight: ${FONT_WEIGHTS.BOLD};
    text-align: center;
    padding: 4rem 2rem 2rem 2rem;
  }
`

const sandboxFooterStyles = css`
  .sandbox__footer {
    display: flex;
    justify-content: center;
    padding: 2rem 2rem 4rem 2rem;
  }

  .sandbox__footer__link {
    display: flex;
    align-items: center;
    background-color: transparent;
    text-decoration: none;
    text-align: center;
    font-weight: ${FONT_WEIGHTS.BOLD};
    color: ${COLORS.TEXT_LOW_CONTRAST};
    font-size: 1.4rem;
  }

  .sandbox__footer__link__svg {
    display: block;
    width: 2rem;
    height: 2rem;
    margin-right: 1rem;
    fill: currentColor;
  }
`

export const BASE_CSS = styledComponentsStylesToString(
  themeStyles,
  resetStyles,
  baseStyles,
  fontStyles,
)

export const SANDBOX_CSS = styledComponentsStylesToString(
  sandboxWrapperStyles,
  sandboxCarouselStyles,
  sandboxHeaderStyles,
  sandboxFooterStyles,
)
