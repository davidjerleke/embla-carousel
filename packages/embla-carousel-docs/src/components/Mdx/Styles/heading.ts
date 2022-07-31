import { css } from 'styled-components'
import { FRAME_SPACING } from 'components/SiteLayout'
import { createSquareSizeStyles } from 'utils'
import { COLORS, FONT_SIZES, MEDIA, SPACINGS } from 'consts'

const ANCHOR_SVG_SIZE = SPACINGS.CUSTOM(({ THREE }) => THREE - 0.2)

export const headingStyles = css`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
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
      right: 100%;
      top: 0;
      bottom: 0;
      width: ${FRAME_SPACING};

      ${MEDIA.DESKTOP} {
        width: ${SPACINGS.FIVE};
      }

      > svg {
        ${createSquareSizeStyles(ANCHOR_SVG_SIZE)};
        color: ${COLORS.TEXT_LOW_CONTRAST};
        transform: translate(-50%, -50%);
        position: absolute;
        top: 50%;
        left: 50%;
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

  h1:hover .anchor > svg,
  h2:hover .anchor > svg,
  h3:hover .anchor > svg,
  h4:hover .anchor > svg,
  h5:hover .anchor > svg,
  h6:hover .anchor > svg,
  h1 .anchor:focus > svg,
  h2 .anchor:focus > svg,
  h3 .anchor:focus > svg,
  h4 .anchor:focus > svg,
  h5 .anchor:focus > svg,
  h6 .anchor:focus > svg {
    visibility: visible;
  }
`
