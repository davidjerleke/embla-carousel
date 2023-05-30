import { pageFrameCollapseStyles } from 'components/Page/PageFrameCollapse'
import { css } from 'styled-components'
import { MEDIA } from 'consts/breakpoints'
import { COLORS } from 'consts/themes'
import { BORDER_RADIUSES, BORDER_SIZES } from 'consts/border'
import { LAYERS } from 'consts/layers'

export const CAROUSEL_DEFAULT_HEIGHT = '19rem'
export const CAROUSEL_THUMB_SLIDES_HEIGHT = '9rem'
export const CAROUSEL_THUMB_SLIDES_SPACING = '0.8rem'
export const CAROUSEL_IOS_PICKER_HEIGHT = '22.2rem'
export const CAROUSEL_SLIDES_SPACING = '1rem'
export const CAROUSEL_WRAPPER_SPACING = '1.6rem'
export const CAROUSEL_WRAPPER_RADIUS = BORDER_RADIUSES.BOX

const borderStyles = css`
  position: relative;

  ${MEDIA.MIN_XS} {
    border-radius: ${CAROUSEL_WRAPPER_RADIUS};
  }

  &:after {
    z-index: ${LAYERS.STEP};
    content: '';
    pointer-events: none;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: inherit;

    ${MEDIA.MIN_XS} {
      border: ${BORDER_SIZES.DETAIL} solid ${COLORS.DETAIL_LOW_CONTRAST};
    }
    ${MEDIA.MAX_XS} {
      border-top: ${BORDER_SIZES.DETAIL} solid ${COLORS.DETAIL_LOW_CONTRAST};
      border-bottom: ${BORDER_SIZES.DETAIL} solid ${COLORS.DETAIL_LOW_CONTRAST};
    }
  }
`

const baseWrapperStyles = css`
  ${pageFrameCollapseStyles};
  ${borderStyles};
  background-color: ${COLORS.BACKGROUND_CODE};
`

export const carouselDefaultWrapperStyles = css`
  ${baseWrapperStyles};
  height: calc(${CAROUSEL_DEFAULT_HEIGHT} + ${CAROUSEL_WRAPPER_SPACING} * 2);
`

export const carouselThumbsWrapperStyles = css`
  ${baseWrapperStyles};
  height: calc(
    ${CAROUSEL_DEFAULT_HEIGHT} + ${CAROUSEL_THUMB_SLIDES_HEIGHT} +
      ${CAROUSEL_THUMB_SLIDES_SPACING} + ${CAROUSEL_WRAPPER_SPACING} * 2
  );
`

export const iosPickerWrapperStyles = css`
  ${pageFrameCollapseStyles};
  ${borderStyles};
  height: ${CAROUSEL_IOS_PICKER_HEIGHT};
  background-color: ${COLORS.BACKGROUND_CODE};
  padding-left: ${CAROUSEL_WRAPPER_SPACING};
  padding-right: ${CAROUSEL_WRAPPER_SPACING};
  touch-action: none;
`
