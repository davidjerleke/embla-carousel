import { css, RuleSet } from 'styled-components'
import { BORDER_RADIUSES } from '@/utils/border'
import { COLORS } from '@/utils/theme'
import { SPACINGS } from '@/utils/spacings'
import { KeyNavigatingPropType } from '@/utils/key-events'
import { MEDIA } from '@/utils/breakpoints'

/* CONSTS */
export const SCROLLBAR_SIZE = SPACINGS.ONE
const SCROLL_BAR_SHADOW_OFFSET = '1.2rem'
const SCROLL_BAR_SHADOW_BLUR = '1.6rem'
export const SCROLL_BAR_SHADOW_SIZE = `${
  parseFloat(SCROLL_BAR_SHADOW_BLUR) * 2
}rem`

const SCROLL_BAR_SHADOWS = {
  left: `${SCROLL_BAR_SHADOW_OFFSET} 0 ${SCROLL_BAR_SHADOW_BLUR}`,
  right: `-${SCROLL_BAR_SHADOW_OFFSET} 0 ${SCROLL_BAR_SHADOW_BLUR}`,
  top: `0 ${SCROLL_BAR_SHADOW_OFFSET} ${SCROLL_BAR_SHADOW_BLUR}`,
  bottom: `0 -${SCROLL_BAR_SHADOW_OFFSET} ${SCROLL_BAR_SHADOW_BLUR}`
}

type ScrollBarAxisType = 'x' | 'y'
type ScrollBarShadowSideType = keyof typeof SCROLL_BAR_SHADOWS

/* UTILS */
export function createScrollBarStyles(axis: ScrollBarAxisType): RuleSet {
  const sizeProperty = axis === 'x' ? 'height' : 'width'

  return css`
    ::-webkit-scrollbar-thumb {
      background-color: ${COLORS.BACKGROUND_SITE};
      border-radius: ${BORDER_RADIUSES.BOX};
    }
    ::-webkit-scrollbar-track {
      background-color: ${COLORS.BACKGROUND_SITE};
    }
    ::-webkit-scrollbar {
      ${sizeProperty}: ${SCROLLBAR_SIZE};
    }

    scrollbar-color: ${COLORS.BACKGROUND_SITE} ${COLORS.BACKGROUND_SITE};
    scrollbar-width: thin;

    &:hover {
      ::-webkit-scrollbar-thumb {
        background-color: ${COLORS.DETAIL_MEDIUM_CONTRAST};
      }

      scrollbar-color: ${COLORS.DETAIL_MEDIUM_CONTRAST}
        ${COLORS.BACKGROUND_SITE};
    }

    ${MEDIA.NO_HOVER} {
      &:hover {
        ::-webkit-scrollbar-thumb {
          background-color: ${COLORS.BACKGROUND_SITE};
        }
      }

      ::-webkit-scrollbar {
        ${sizeProperty}: 0;
      }
    }
  `
}

export function createScrollBarShadowStyles(
  side: ScrollBarShadowSideType,
  color: string = COLORS.BACKGROUND_SITE
): RuleSet<KeyNavigatingPropType> {
  const sizeProperty = side === 'left' || side === 'right' ? 'width' : 'height'

  return css<KeyNavigatingPropType>`
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
