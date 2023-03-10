import {
  css,
  FlattenInterpolation,
  FlattenSimpleInterpolation,
  ThemedStyledProps,
} from 'styled-components'
import { COLORS } from './themes'

type ScrollBarAxisType = 'x' | 'y'

export const createScrollBarStyles = (
  axis: ScrollBarAxisType,
): FlattenSimpleInterpolation => {
  const sizeProperty = axis === 'x' ? 'height' : 'width'

  return css`
    ::-webkit-scrollbar-thumb {
      background-color: transparent;
      border-radius: 0.4rem;
    }
    ::-webkit-scrollbar-track {
      background-color: transparent;
    }
    ::-webkit-scrollbar {
      ${sizeProperty}: 0.6rem;
    }

    &:hover {
      ::-webkit-scrollbar-thumb {
        background-color: ${COLORS.DETAIL_MEDIUM_CONTRAST};
      }
    }

    @media (hover: none), (hover: on-demand) {
      &:hover {
        ::-webkit-scrollbar-thumb {
          background-color: transparent;
        }
      }

      ::-webkit-scrollbar {
        ${sizeProperty}: 0;
      }
    }
  `
}

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

type ScrollBarShadowSideType = keyof typeof SCROLL_BAR_SHADOWS

export const createScrollBarShadowStyles = (
  side: ScrollBarShadowSideType,
  color: string = COLORS.BACKGROUND_SITE,
): FlattenInterpolation<
  ThemedStyledProps<
    {
      $isKeyNavigating: boolean
    },
    unknown
  >
> => {
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
