import { css } from 'styled-components'
import { FRAME_SPACING } from 'components/SiteLayout/Frame'
import { frameCollapseStyles } from 'components/SiteLayout/FrameCollapse'
import { LAYERS } from 'consts/layers'
import { COLORS } from 'consts/themes'
import { SPACINGS } from 'consts/spacings'
import { FONT_SIZES } from 'consts/fontSizes'
import { CODE_HIGHLIGHT_CLASS_NAME } from '../Components/Code'
import { AdmonitionWrapper } from '../Components/Admonition'
import { createScrollBarStyles } from 'consts/scrollBars'
import {
  PRISM_HIGHLIGHT_CLASS_NAME,
  PRISM_HIGHLIGHT_LINE_CLASS_NAME,
} from 'components/Mdx/Components/PrismSyntaxHighlight'

const BORDER_RADIUS = '0.4rem'

export const codeStyles = css`
  .${CODE_HIGHLIGHT_CLASS_NAME} {
    background-color: ${COLORS.BACKGROUND_CODE};
    border-radius: ${BORDER_RADIUS};
    border: 0.1rem solid ${COLORS.DETAIL_LOW_CONTRAST};
    padding: ${SPACINGS.CUSTOM(({ ONE }) => ONE / 2)} ${SPACINGS.ONE};
    font-size: ${FONT_SIZES.CUSTOM(
      ({ COMPLEMENTARY }) => COMPLEMENTARY + 0.04,
    )};
    box-sizing: border-box;
  }

  ${AdmonitionWrapper} .${CODE_HIGHLIGHT_CLASS_NAME} {
    background-color: ${COLORS.BACKGROUND_SITE};
    border-color: ${COLORS.DETAIL_MEDIUM_CONTRAST};
  }

  .${PRISM_HIGHLIGHT_CLASS_NAME} {
    ${frameCollapseStyles};
    position: relative;

    &:before {
      z-index: ${LAYERS.STEP};
      display: block;
      content: attr(data-language);
      line-height: 1;
      font-size: ${FONT_SIZES.DETAIL};
      text-transform: uppercase;
      position: absolute;
      top: 0.1rem;
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
  }

  .${PRISM_HIGHLIGHT_LINE_CLASS_NAME} {
    position: relative;
    display: block;
    margin-left: -${SPACINGS.FOUR};
    margin-right: -${SPACINGS.FOUR};
    padding-left: ${SPACINGS.FOUR};
    padding-right: ${SPACINGS.FOUR};

    &:before,
    &:after {
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
      z-index: ${LAYERS.STEP};
    }
    &:before {
      right: 0;
      left: 0;
      opacity: 0.07;
    }
  }

  .${PRISM_HIGHLIGHT_CLASS_NAME} pre[class*='language-'] {
    padding: ${FRAME_SPACING} 0;
    background-color: transparent;
    border: 0;
    margin-bottom: 0;
  }

  .${PRISM_HIGHLIGHT_CLASS_NAME} pre code {
    padding: 0 ${FRAME_SPACING};
    background-color: transparent;
    display: block;
    font-size: 100%;
    line-height: 1.5;
    float: left;
    min-width: 100%;
  }

  pre {
    ${createScrollBarStyles('x')};
    color: ${COLORS.TEXT_BODY};
    overflow: auto;
    white-space: pre;
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
  .token.unit,
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
  .token.number,
  .token.n-th.number,
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
  .token.dom {
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
