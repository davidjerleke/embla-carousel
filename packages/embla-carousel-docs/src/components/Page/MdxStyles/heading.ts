import { css } from 'styled-components'
import { FRAME_SPACING } from 'components/SiteLayout'
import { createSquareSizeStyles } from 'utils'
import { breakpoints } from 'consts'

export const headingStyles = css`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 700;
    color: var(--text-high-contrast);
  }

  h1,
  h2,
  h3 {
    margin-top: 4.8rem;
  }

  h1 {
    font-weight: 800;
    font-size: 3.2rem;
    line-height: 1.25;
  }

  h2 {
    font-size: 2.5rem;
    line-height: 1.35;
  }

  h3 {
    font-size: 2.15rem;
    line-height: 1.5;
  }

  h4 {
    font-size: 1.8rem;
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
      ${breakpoints.minSm} {
        width: 2.8rem;
      }

      > svg {
        color: var(--text-low-contrast);
        transform: translate(-50%, -50%);
        position: absolute;
        top: 50%;
        left: 50%;
        ${createSquareSizeStyles('1.6rem')};
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
