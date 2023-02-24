import { css } from 'styled-components'
import { FRAME_SPACING } from 'components/SiteLayout/Frame'
import { createSquareSizeStyles } from 'utils/createSquareSizeStyles'
import { COLORS } from 'consts/themes'
import { FONT_SIZES } from 'consts/fontSizes'
import { MEDIA } from 'consts/breakpoints'
import { SPACINGS } from 'consts/spacings'
import { HEADER_HEIGHT } from 'components/Header/Header'

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
    font-weight: 700;
  }

  h1,
  h2,
  h3 {
    margin-top: ${SPACINGS.EIGHT};
  }

  h1 {
    font-size: ${FONT_SIZES.H1};
    font-weight: 800;
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
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      padding-right: 0;
      ${createSquareSizeStyles(FRAME_SPACING)};
      margin-left: -${FRAME_SPACING};

      ${MEDIA.DESKTOP} {
        ${createSquareSizeStyles(SPACINGS.FIVE)};
        margin-left: -${SPACINGS.FIVE};
      }
    }

    > .anchor > div {
      width: 100%;
      height: 100%;
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

  h1:hover .anchor > div > svg,
  h2:hover .anchor > div > svg,
  h3:hover .anchor > div > svg,
  h4:hover .anchor > div > svg,
  h5:hover .anchor > div > svg,
  h6:hover .anchor > div > svg,
  h1 .anchor:focus > div > svg,
  h2 .anchor:focus > div > svg,
  h3 .anchor:focus > div > svg,
  h4 .anchor:focus > div > svg,
  h5 .anchor:focus > div > svg,
  h6 .anchor:focus > div > svg {
    visibility: visible;
  }
`
