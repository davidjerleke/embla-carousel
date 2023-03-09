import { css } from 'styled-components'
import { COLORS } from './themes'

type ScrollBarShadowSideType = keyof typeof SCROLL_BAR_SHADOWS

const SCROLL_BAR_SHADOW_OFFSET = '1.2rem'
const SCROLL_BAR_SHADOW_BLUR = '1.6rem'
export const SCROLL_BAR_SHADOW_SIZE = `${
  parseFloat(SCROLL_BAR_SHADOW_BLUR) * 2
}rem`

const SCROLL_BAR_SHADOWS = {
  left: `${SCROLL_BAR_SHADOW_OFFSET} 0 ${SCROLL_BAR_SHADOW_BLUR}`,
  right: `-${SCROLL_BAR_SHADOW_OFFSET} 0 ${SCROLL_BAR_SHADOW_BLUR}`,
  top: `0 ${SCROLL_BAR_SHADOW_OFFSET} ${SCROLL_BAR_SHADOW_BLUR}`,
  bottom: `0 -${SCROLL_BAR_SHADOW_OFFSET} ${SCROLL_BAR_SHADOW_BLUR}`,
}

export const createScrollBarShadowStyles = (
  side: ScrollBarShadowSideType,
  color: string = COLORS.BACKGROUND_SITE,
) => {
  const sizeProperty = side === 'left' || side === 'right' ? 'width' : 'height'

  return css<{ $isKeyNavigating: boolean }>`
    ${sizeProperty}: ${SCROLL_BAR_SHADOW_SIZE};
    box-shadow: ${SCROLL_BAR_SHADOWS[side]} ${color};
    pointer-events: none;

    ${({ $isKeyNavigating }) =>
      $isKeyNavigating &&
      css`
        opacity: 0;
      `};
  `
}
