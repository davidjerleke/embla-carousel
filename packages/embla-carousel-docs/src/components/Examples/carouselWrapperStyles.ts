import { frameCollapseStyles } from 'components/SiteLayout/FrameCollapse'
import { css } from 'styled-components'
import { MEDIA } from 'consts/breakpoints'
import { COLORS } from 'consts/themes'

export const CAROUSEL_DEFAULT_HEIGHT = '19rem'
export const CAROUSEL_THUMBS_HEIGHT = '28.8rem'
export const CAROUSEL_IOS_PICKER_HEIGHT = '22.2rem'
export const CAROUSEL_SPACING = '1.6rem'
export const CAROUSEL_RADIUS = '0.4rem'

export const baseWrapperStyles = css`
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

export const carouselDefaultWrapperStyles = css`
  ${baseWrapperStyles};
  height: calc(${CAROUSEL_DEFAULT_HEIGHT} + ${CAROUSEL_SPACING} * 2);
`

export const carouselThumbsWrapperStyles = css`
  ${baseWrapperStyles};
  height: calc(${CAROUSEL_THUMBS_HEIGHT} + ${CAROUSEL_SPACING} * 2);
`

export const iosPickerWrapperStyles = css`
  height: ${CAROUSEL_IOS_PICKER_HEIGHT};
  background-color: ${COLORS.BACKGROUND_CODE};
  padding-left: ${CAROUSEL_SPACING};
  padding-right: ${CAROUSEL_SPACING};

  ${MEDIA.MAX_SM} {
    ${frameCollapseStyles};
  }
  ${MEDIA.MIN_SM} {
    border-radius: ${CAROUSEL_RADIUS};
  }
`
