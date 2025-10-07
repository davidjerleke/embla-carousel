import { pageFrameCollapseStyles } from 'components/Page/PageFrameCollapse'
import { css } from 'styled-components'
import { SPACINGS } from 'consts/spacings'
import {
  CAROUSEL_CONTROLS_SPACING,
  CAROUSEL_DEFAULT_HEIGHT,
  CAROUSEL_IOS_PICKER_HEIGHT,
  CAROUSEL_NAV_BUTTON_SIZE,
  CAROUSEL_SCROLLBAR_HEIGHT,
  CAROUSEL_SCROLLBAR_SPACING,
  CAROUSEL_THUMB_SLIDES_HEIGHT,
  CAROUSEL_THUMB_SLIDES_SPACING
} from './examplesCarouselStyles'

const baseWrapperStyles = css`
  margin-top: ${SPACINGS.FOUR};
  margin-bottom: ${SPACINGS.FOUR};
  position: relative;
`

// EXAMPLES/PREDEFINED
export const examplesDefaultWrapperStyles = css`
  ${baseWrapperStyles};
  min-height: calc(
    ${CAROUSEL_DEFAULT_HEIGHT} + ${CAROUSEL_NAV_BUTTON_SIZE} +
      ${CAROUSEL_CONTROLS_SPACING}
  );
`

export const examplesThumbsWrapperStyles = css`
  ${baseWrapperStyles};
  min-height: calc(
    ${CAROUSEL_DEFAULT_HEIGHT} + ${CAROUSEL_THUMB_SLIDES_HEIGHT} +
      ${CAROUSEL_THUMB_SLIDES_SPACING}
  );
`

export const examplesScrollBarWrapperStyles = css`
  ${baseWrapperStyles};
  min-height: calc(
    ${CAROUSEL_DEFAULT_HEIGHT} + ${CAROUSEL_NAV_BUTTON_SIZE} +
      ${CAROUSEL_CONTROLS_SPACING} + ${CAROUSEL_SCROLLBAR_HEIGHT} +
      ${CAROUSEL_SCROLLBAR_SPACING}
  );
`

export const examplesIosPickerWrapperStyles = css`
  ${pageFrameCollapseStyles};
  min-height: ${CAROUSEL_IOS_PICKER_HEIGHT};
  touch-action: none;
  position: relative;
`

// EXAMPLES/GUIDES
export const examplesOneFormRow = css`
  ${baseWrapperStyles};
  min-height: calc(
    ${CAROUSEL_DEFAULT_HEIGHT} + (${CAROUSEL_NAV_BUTTON_SIZE} * 2) +
      (${CAROUSEL_CONTROLS_SPACING} * 2)
  );
`

export const examplesTwoFormRows = css`
  ${baseWrapperStyles};
  min-height: calc(
    ${CAROUSEL_DEFAULT_HEIGHT} + (${CAROUSEL_NAV_BUTTON_SIZE} * 3) +
      (${CAROUSEL_CONTROLS_SPACING} * 3)
  );
`
