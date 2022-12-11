import { css } from 'styled-components'
import { styledComponentsStylesToString } from 'utils/styledComponentStylesToString'
import { resetStyles } from 'components/Layout/GlobalStyles/reset'
import { baseStyles } from 'components/Layout/GlobalStyles/base'
import { fontStyles } from 'components/Layout/GlobalStyles/font'
import { CAROUSEL_WRAPPER_RADIUS } from '../Examples/carouselWrapperStyles'
import { MEDIA } from 'consts/breakpoints'
import { COLORS, themeStyles } from 'consts/themes'

const sandboxWrapperStyles = css`
  .sandbox {
    max-width: 67rem;
    margin-left: auto;
    margin-right: auto;
  }
`

const sandboxCarouselStyles = css`
  .sandbox__carousel {
    background-color: ${COLORS.BACKGROUND_CODE};
  }

  .sandbox__carousel {
    position: relative;
  }

  ${MEDIA.MIN_SM} {
    .sandbox__carousel {
      border-radius: ${CAROUSEL_WRAPPER_RADIUS};
    }
  }
`

const sandboxHeaderStyles = css`
  .sandbox__header {
    font-size: 2rem;
    font-weight: bold;
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
    border-radius: 3rem;
    text-align: center;
    font-weight: bold;
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
