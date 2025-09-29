import { css } from 'styled-components'
import { PAGE_FRAME_SPACING } from 'components/Page/PageFrame'
import { pageFrameCollapseStyles } from 'components/Page/PageFrameCollapse'
import { LAYERS } from 'consts/layers'
import { COLORS } from 'consts/themes'
import { SPACINGS } from 'consts/spacings'
import { BORDER_SIZES } from 'consts/border'
import { FONT_SIZES, FONT_WEIGHTS } from 'consts/fontSizes'
import { CODE_HIGHLIGHT_CLASS_NAME } from '../Components/Code'
import { PRISM_FRAME_RADIUS } from '../Components/PrismSyntaxFrame'
import { AdmonitionWrapper } from '../Components/Admonition'
import { SCROLLBAR_SIZE, createScrollBarStyles } from 'consts/scrollBars'
import {
  PRISM_HIGHLIGHT_CLASS_NAME,
  PRISM_HIGHLIGHT_CODE_LANGUAGE_CLASS_NAME,
  PRISM_HIGHLIGHT_LINE_CLASS_NAME
} from 'consts/prismHighlight'

export const codeStyles = css`
  .${CODE_HIGHLIGHT_CLASS_NAME} {
    background-color: ${COLORS.BACKGROUND_CODE};
    border-radius: ${PRISM_FRAME_RADIUS};
    border: ${BORDER_SIZES.DETAIL} solid ${COLORS.DETAIL_LOW_CONTRAST};
    padding: ${SPACINGS.CUSTOM(({ ONE }) => ONE / 2)} ${SPACINGS.ONE};
    font-size: ${FONT_SIZES.CUSTOM(
      ({ COMPLEMENTARY }) => COMPLEMENTARY + 0.04
    )};
    box-sizing: border-box;
  }

  ${AdmonitionWrapper} .${CODE_HIGHLIGHT_CLASS_NAME} {
    background-color: ${COLORS.BACKGROUND_SITE};
    border-color: ${COLORS.DETAIL_MEDIUM_CONTRAST};
  }

  ${AdmonitionWrapper} .${PRISM_HIGHLIGHT_CLASS_NAME} {
    display: inline-grid;
    margin: 0;
    width: 100%;
  }

  .${PRISM_HIGHLIGHT_CLASS_NAME} {
    ${pageFrameCollapseStyles};
    position: relative;
  }

  .${PRISM_HIGHLIGHT_CODE_LANGUAGE_CLASS_NAME} {
    font-weight: ${FONT_WEIGHTS.SEMI_BOLD};
    z-index: ${LAYERS.STEP};
    display: block;
    content: attr(data-display-language);
    line-height: 1;
    font-size: ${FONT_SIZES.DETAIL};
    text-transform: uppercase;
    position: absolute;
    top: 0.1rem;
    left: ${PAGE_FRAME_SPACING};
    padding: ${SPACINGS.CUSTOM(({ ONE }) => ONE - 0.2)}
      ${SPACINGS.CUSTOM(({ ONE }) => ONE + 0.2)};
    border-bottom-left-radius: ${PRISM_FRAME_RADIUS};
    border-bottom-right-radius: ${PRISM_FRAME_RADIUS};

    &[data-display-language='jsx'] {
      background-color: #61dafb;
      color: #000000;
    }
    &[data-display-language='js'] {
      background-color: #f7de1e;
      color: #000000;
    }
    &[data-display-language='ts'] {
      background-color: #007acc;
      color: #ffffff;
    }
    &[data-display-language='tsx'] {
      background-color: #294f80;
      color: #ffffff;
    }
    &[data-display-language='html'] {
      background-color: #005b9c;
      color: #ffffff;
    }
    &[data-display-language='vue'] {
      background-color: #42b883;
      color: #000000;
    }
    &[data-display-language='css'] {
      background-color: #2965f1;
      color: #ffffff;
    }
    &[data-display-language='svelte'] {
      background-color: #ff3e00;
      color: #ffffff;
    }
    &[data-display-language='shell'] {
      background-color: #d9d7e0;
      color: #232129;
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
      width: ${BORDER_SIZES.ACCENT_VERTICAL};
      z-index: ${LAYERS.STEP};
    }
    &:before {
      right: 0;
      left: 0;
      opacity: 0.07;
    }
  }

  .${PRISM_HIGHLIGHT_CLASS_NAME} pre[class*='language-'] {
    background-color: transparent;
    border: 0;
    margin-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: ${PAGE_FRAME_SPACING};
    padding-bottom: calc(${PAGE_FRAME_SPACING} - ${SCROLLBAR_SIZE});

    @media (hover: none), (hover: on-demand) {
      padding-bottom: ${PAGE_FRAME_SPACING};
    }
  }

  .${PRISM_HIGHLIGHT_CLASS_NAME} pre code {
    padding: 0 ${PAGE_FRAME_SPACING};
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
    white-space: pre;
    overflow-x: scroll;

    @media (hover: none), (hover: on-demand) {
      overflow-x: auto;
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
  .token.property:not(.parameter),
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
  .token.literal-property.property,
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
    font-weight: ${FONT_WEIGHTS.SEMI_BOLD};
  }
  .token.entity {
    cursor: help;
  }
`
