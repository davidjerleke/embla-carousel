import { css } from 'styled-components'
import { CAROUSEL_RADIUS, CAROUSEL_SPACING } from './carouselWrapperStyles'
import { MEDIA } from 'consts/breakpoints'
import { COLORS } from 'consts/themes'

export const sandboxWrapperStyles = css`
  .sandbox {
    max-width: 67rem;
    margin-left: auto;
    margin-right: auto;
  }
`

export const sandboxCarouselStyles = css`
  .embla {
    padding: ${CAROUSEL_SPACING};
    background-color: ${COLORS.BACKGROUND_CODE};
    position: relative;

    ${MEDIA.MIN_SM} {
      border-radius: ${CAROUSEL_RADIUS};
    }
  }
`

export const sandboxHeaderStyles = css`
  .sandbox__header {
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    padding: 4rem 2rem 2rem 2rem;
  }
`

export const sandboxFooterStyles = css`
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
