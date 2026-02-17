import { css } from 'styled-components'
import { createSquareSizeStyles } from '@/utils/create-square-size-styles'
import { COLORS } from '@/utils/theme'
import { FONT_SIZES, FONT_WEIGHTS } from '@/utils/font-sizes'
import { MEDIA } from '@/utils/breakpoints'
import { SPACINGS } from '@/utils/spacings'
import { HEADER_HEIGHT } from '@/utils/header'
import { PAGE_FRAME_SPACING } from '@/utils/page'

export const HEADING_TOP_SPACING = SPACINGS.EIGHT
const ANCHOR_SVG_SIZE = SPACINGS.CUSTOM(({ THREE }) => THREE - 0.2)

export const headingStyles = css`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    scroll-margin-top: calc(${HEADER_HEIGHT} + ${SPACINGS.TWO});
    color: ${COLORS.TEXT_HIGH_CONTRAST};
    font-weight: ${FONT_WEIGHTS.BOLD};
    position: relative;
  }

  h1,
  h2,
  h3 {
    margin-top: ${HEADING_TOP_SPACING};
  }

  h1 {
    font-size: ${FONT_SIZES.H1};
    font-weight: ${FONT_WEIGHTS.EXTRA_BOLD};
    line-height: 1.25;
  }

  h2 {
    font-size: ${FONT_SIZES.H2};
    line-height: 1.35;
  }

  h3 {
    font-size: ${FONT_SIZES.H3};
    line-height: 1.5;
  }

  h4 {
    font-size: ${FONT_SIZES.H4};
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    > .anchor {
      transform: translateX(-100%);
      position: absolute;
      top: 0;
      left: 0;
      padding-right: 0;
      width: ${PAGE_FRAME_SPACING};

      ${MEDIA.DESKTOP} {
        width: ${SPACINGS.FIVE};
      }

      &:before {
        color: ${COLORS.BACKGROUND_SITE};
        line-height: inherit;
        text-align: center;
        display: inline-block;
        width: 100%;
        content: '-';
        pointer-events: none;
      }
    }

    > .anchor > span {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;

      > svg {
        ${createSquareSizeStyles(ANCHOR_SVG_SIZE)};
        color: ${COLORS.TEXT_LOW_CONTRAST};
        visibility: hidden;

        @media (hover: none), (hover: on-demand) {
          visibility: visible;
        }
      }

      &:hover > svg {
        visibility: visible;
      }
    }
  }

  h1:hover .anchor > span > svg,
  h2:hover .anchor > span > svg,
  h3:hover .anchor > span > svg,
  h4:hover .anchor > span > svg,
  h5:hover .anchor > span > svg,
  h6:hover .anchor > span > svg,
  h1 .anchor:focus > span > svg,
  h2 .anchor:focus > span > svg,
  h3 .anchor:focus > span > svg,
  h4 .anchor:focus > span > svg,
  h5 .anchor:focus > span > svg,
  h6 .anchor:focus > span > svg {
    visibility: visible;
  }
`
