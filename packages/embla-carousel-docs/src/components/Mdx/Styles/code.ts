import { css } from 'styled-components'
import { FRAME_SPACING } from 'components/SiteLayout/Frame'
import { frameCollapseStyles } from 'components/SiteLayout/FrameCollapse'
import { MEDIA } from 'consts/breakpoints'
import { LAYERS } from 'consts/layers'
import { COLORS } from 'consts/themes'
import { SPACINGS } from 'consts/spacings'
import { FONT_SIZES } from 'consts/fontSizes'

const BORDER_RADIUS = '0.4rem'

export const codeStyles = css`
  .language-text {
    background-color: ${COLORS.DETAIL_LOW_CONTRAST};
    border-radius: ${BORDER_RADIUS};
    padding: ${SPACINGS.CUSTOM(({ ONE }) => ONE / 2)} ${SPACINGS.ONE};
    font-size: ${FONT_SIZES.CUSTOM(
      ({ COMPLEMENTARY }) => COMPLEMENTARY + 0.04,
    )};
    box-sizing: border-box;
  }

  .gatsby-highlight {
    ${frameCollapseStyles};
    background-color: ${COLORS.BACKGROUND_CODE};
    margin-bottom: ${SPACINGS.FOUR};
    overflow: hidden;
    position: relative;
    font-size: ${FONT_SIZES.CUSTOM(
      ({ COMPLEMENTARY }) => COMPLEMENTARY - 0.04,
    )};

    &:before {
      display: block;
      content: attr(data-language);
      line-height: 1;
      font-size: ${FONT_SIZES.DETAIL};
      text-transform: uppercase;
      position: absolute;
      top: 0;
      left: ${FRAME_SPACING};
      padding: ${SPACINGS.CUSTOM(({ ONE }) => ONE - 0.2)}
        ${SPACINGS.CUSTOM(({ ONE }) => ONE + 0.2)};
      border-bottom-left-radius: ${BORDER_RADIUS};
      border-bottom-right-radius: ${BORDER_RADIUS};
    }

    &[data-language='jsx'] {
      &:before {
        background-color: #61dafb;
        color: #000000;
      }
    }
    &[data-language='js'] {
      &:before {
        background-color: #f7de1e;
        color: #000000;
      }
    }
    &[data-language='ts'] {
      &:before {
        background-color: #007acc;
        color: #ffffff;
      }
    }
    &[data-language='tsx'] {
      &:before {
        background-color: #294f80;
        color: #ffffff;
      }
    }
    &[data-language='html'] {
      &:before {
        background-color: #005b9c;
        color: #ffffff;
      }
    }
    &[data-language='css'] {
      &:before {
        background-color: #2965f1;
        color: #ffffff;
      }
    }
    &[data-language='shell'] {
      &:before {
        background-color: #d9d7e0;
        color: #232129;
      }
    }

    ${MEDIA.MIN_XS} {
      border-radius: ${BORDER_RADIUS};
    }
  }

  .gatsby-highlight-code-line {
    position: relative;
    display: block;
    margin-left: -${SPACINGS.FOUR};
    margin-right: -${SPACINGS.FOUR};
    padding-left: ${SPACINGS.FOUR};
    padding-right: ${SPACINGS.FOUR};

    &:before,
    &:after {
      z-index: ${LAYERS.STEP};
      position: absolute;
      top: 0;
      bottom: 0;
      content: '';
      pointer-events: none;
      background-image: linear-gradient(
        90deg,
        ${COLORS.BRAND_PRIMARY},
        ${COLORS.BRAND_SECONDARY}
      );
    }

    &:after {
      left: 0;
      width: ${SPACINGS.CUSTOM(({ ONE }) => ONE - 0.2)};
    }
    &:before {
      right: 0;
      left: 0;
      opacity: 0.07;
    }
  }

  .gatsby-highlight pre[class*='language-'] {
    padding: ${FRAME_SPACING} 0;
    background-color: transparent;
    border: 0;
    margin-bottom: 0;
  }

  .gatsby-highlight pre code {
    padding: 0 ${FRAME_SPACING};
    background-color: transparent;
    display: block;
    font-size: 100%;
    line-height: 1.5;
    float: left;
    min-width: 100%;
  }

  pre {
    color: ${COLORS.TEXT_BODY};
    overflow: auto;
    white-space: pre;

    ::-webkit-scrollbar-thumb {
      background-color: ${COLORS.SCROLL_THUMB};
    }
    ::-webkit-scrollbar-track {
      background-color: ${COLORS.DETAIL_LOW_CONTRAST};
    }
    ::-webkit-scrollbar {
      width: 0.4rem;
      height: 0.5rem;
    }
  }

  .token-line {
    display: block;
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: ${COLORS.TEXT_COMMENT};
  }

  .token.tag,
  .token.function-name,
  .token.constant,
  .token.function-variable,
  .token.function,
  .token.class-name,
  .token.maybe-class-name:not(.imports),
  .token.literal-property.property,
  .token.symbol {
    color: ${COLORS.BRAND_ALTERNATIVE};
  }

  .token.string,
  .token.string-property,
  .token.attr-name,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string,
  .token.statement,
  .token.regex,
  .token.atrule,
  .token.placeholder,
  .token.variable {
    color: ${COLORS.BRAND_SECONDARY};
  }

  .token.attr-value,
  .token.keyword,
  .token.property,
  .token.control,
  .token.directive,
  .token.selector,
  .token.singlequote,
  .token.boolean,
  .token.operator,
  .token.number,
  .token.dom,
  .token.unit {
    color: ${COLORS.BRAND_PRIMARY};
  }

  .token.console,
  .token.punctuation,
  .token.tag.script:not(.punctuation):not(.function),
  .token.plain-text {
    color: ${COLORS.TEXT_HIGH_CONTRAST};
  }

  .token.namespace {
    opacity: 0.75;
  }
  .token.deleted {
    text-decoration: line-through;
  }
  .token.italic {
    font-style: italic;
  }
  .token.important,
  .token.bold {
    font-weight: 600;
  }
  .token.entity {
    cursor: help;
  }
`
