import { frameCollapseStyles } from 'components/SiteLayout/FrameCollapse'
import { CAROUSEL_DEFAULT_HEIGHT } from './createCarouselStyles'
import { MEDIA } from 'consts/breakpoints'
import { COLORS } from 'consts/themes'
import { css } from 'styled-components'

export const CAROUSEL_SPACING = '1.6rem'
export const CAROUSEL_RADIUS = '0.4rem'

export const carouselDefaultWrapperStyles = css`
  height: calc(${CAROUSEL_DEFAULT_HEIGHT} + ${CAROUSEL_SPACING} * 2);
  padding: ${CAROUSEL_SPACING};
  background-color: ${COLORS.BACKGROUND_CODE};
  position: relative;

  ${MEDIA.MAX_SM} {
    ${frameCollapseStyles};
  }
  ${MEDIA.MIN_SM} {
    border-radius: ${CAROUSEL_RADIUS};
  }
`
