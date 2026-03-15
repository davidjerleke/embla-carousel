(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,192770,o=>{"use strict";var e=o.i(997053),t=o.i(350437),n=o.i(801770),a=o.i(372729),i=o.i(233127),r=o.i(734568),l=o.i(294801),s=o.i(380999),d=o.i(925866),c=o.i(506390),S=o.i(784613),p=o.i(728191);let g=n.SPACINGS.EIGHT,h=n.SPACINGS.CUSTOM(({THREE:o})=>o-.2),f=e.css`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    scroll-margin-top: calc(${S.HEADER_HEIGHT} + ${n.SPACINGS.FOUR});
    color: ${t.COLORS.TEXT_HIGH_CONTRAST};
    font-weight: ${d.FONT_WEIGHTS.BOLD};
    position: relative;
  }

  h1,
  h2,
  h3 {
    margin-top: ${g};
  }

  h1 {
    font-size: ${d.FONT_SIZES.H1};
    font-weight: ${d.FONT_WEIGHTS.EXTRA_BOLD};
    line-height: 1.25;
  }

  h2 {
    font-size: ${d.FONT_SIZES.H2};
    line-height: 1.35;
  }

  h3 {
    font-size: ${d.FONT_SIZES.H3};
    line-height: 1.5;
  }

  h4 {
    font-size: ${d.FONT_SIZES.H4};
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
      width: ${p.PAGE_FRAME_SPACING};

      ${c.MEDIA.DESKTOP} {
        width: ${n.SPACINGS.FIVE};
      }

      &:before {
        color: ${t.COLORS.BACKGROUND_SITE};
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
        ${(0,s.createSquareSizeStyles)(h)};
        color: ${t.COLORS.TEXT_LOW_CONTRAST};
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
`,A=e.css`
  ol,
  ul {
    margin-left: ${n.SPACINGS.FOUR};
  }

  ol > li:not(:last-child),
  ul > li:not(:last-child) {
    margin-bottom: ${n.SPACINGS.TWO};
  }

  ul {
    list-style: disc outside none;
  }
`;var _=o.i(431480),I=o.i(907827),C=o.i(671249),O=o.i(893060),$=o.i(668347),E=o.i(654938);let u=e.css`
  .${O.CODE_HIGHLIGHT_CLASS_NAME} {
    background-color: ${t.COLORS.BACKGROUND_CODE};
    border-radius: ${$.PRISM_FRAME_RADIUS};
    border: ${C.BORDER_SIZES.DETAIL} solid ${t.COLORS.DETAIL_LOW_CONTRAST};
    padding: ${n.SPACINGS.CUSTOM(({ONE:o})=>o/2)} ${n.SPACINGS.ONE};
    font-size: ${d.FONT_SIZES.CUSTOM(({COMPLEMENTARY:o})=>o+.04)};
    box-sizing: border-box;
  }

  ${l.AdmonitionWrapper} .${O.CODE_HIGHLIGHT_CLASS_NAME} {
    background-color: ${t.COLORS.BACKGROUND_SITE};
    border-color: ${t.COLORS.DETAIL_MEDIUM_CONTRAST};
  }

  ${l.AdmonitionWrapper} .${a.PRISM_HIGHLIGHT_CLASS_NAME} {
    display: inline-grid;
    margin: 0;
    width: 100%;
  }

  .${a.PRISM_HIGHLIGHT_CLASS_NAME} {
    ${_.pageFrameCollapseStyles};
    position: relative;
  }

  .${a.PRISM_HIGHLIGHT_CODE_LANGUAGE_CLASS_NAME} {
    font-weight: ${d.FONT_WEIGHTS.SEMI_BOLD};
    z-index: ${I.LAYERS.STEP};
    display: block;
    content: attr(data-display-language);
    line-height: 1;
    font-size: ${d.FONT_SIZES.DETAIL};
    text-transform: uppercase;
    position: absolute;
    top: 0.1rem;
    left: ${p.PAGE_FRAME_SPACING};
    padding: ${n.SPACINGS.CUSTOM(({ONE:o})=>o-.2)}
      ${n.SPACINGS.CUSTOM(({ONE:o})=>o+.2)};
    border-bottom-left-radius: ${$.PRISM_FRAME_RADIUS};
    border-bottom-right-radius: ${$.PRISM_FRAME_RADIUS};

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

  .${a.PRISM_HIGHLIGHT_LINE_CLASS_NAME} {
    position: relative;
    display: block;
    margin-left: -${n.SPACINGS.FOUR};
    margin-right: -${n.SPACINGS.FOUR};
    padding-left: ${n.SPACINGS.FOUR};
    padding-right: ${n.SPACINGS.FOUR};

    &:before,
    &:after {
      position: absolute;
      top: 0;
      bottom: 0;
      content: '';
      pointer-events: none;
      background-image: linear-gradient(
        90deg,
        ${t.COLORS.BRAND_PRIMARY},
        ${t.COLORS.BRAND_SECONDARY}
      );
    }

    &:after {
      left: 0;
      width: ${C.BORDER_SIZES.ACCENT_VERTICAL};
      z-index: ${I.LAYERS.STEP};
    }
    &:before {
      right: 0;
      left: 0;
      opacity: 0.07;
    }
  }

  .${a.PRISM_HIGHLIGHT_CLASS_NAME} pre[class*='language-'] {
    background-color: transparent;
    border: 0;
    margin-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: ${p.PAGE_FRAME_SPACING};
    padding-bottom: calc(${p.PAGE_FRAME_SPACING} - ${E.SCROLLBAR_SIZE});

    @media (hover: none), (hover: on-demand) {
      padding-bottom: ${p.PAGE_FRAME_SPACING};
    }
  }

  .${a.PRISM_HIGHLIGHT_CLASS_NAME} pre code {
    padding: 0 ${p.PAGE_FRAME_SPACING};
    background-color: transparent;
    display: block;
    font-size: 100%;
    line-height: 1.5;
    float: left;
    min-width: 100%;
  }

  pre {
    ${(0,E.createScrollBarStyles)("x")};
    color: ${t.COLORS.TEXT_BODY};
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
    color: ${t.COLORS.TEXT_COMMENT};
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
    color: ${t.COLORS.BRAND_ALTERNATIVE};
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
    color: ${t.COLORS.BRAND_SECONDARY};
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
    color: ${t.COLORS.BRAND_PRIMARY};
  }

  .token.console,
  .token.punctuation,
  .token.tag.script:not(.punctuation):not(.function),
  .token.literal-property.property,
  .token.plain-text {
    color: ${t.COLORS.TEXT_HIGH_CONTRAST};
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
    font-weight: ${d.FONT_WEIGHTS.SEMI_BOLD};
  }
  .token.entity {
    cursor: help;
  }
`;o.i(843476);let m=e.default.div.withConfig({displayName:"ApiMetaData__ApiMetaDataWrapper",componentId:"sc-7fc4547e-0"})``;e.default.div.withConfig({displayName:"ApiMetaData__Row",componentId:"sc-7fc4547e-1"})`
  font-size: ${d.FONT_SIZES.COMPLEMENTARY};
  display: flex;
  align-items: center;
  column-gap: ${n.SPACINGS.ONE};

  ${c.MEDIA.COMPACT} {
    margin-right: -${p.PAGE_FRAME_SPACING};
  }
`,e.default.span.withConfig({displayName:"ApiMetaData__Key",componentId:"sc-7fc4547e-2"})`
  flex: 0 0 auto;
`,e.default.span.withConfig({displayName:"ApiMetaData__Scrollable",componentId:"sc-7fc4547e-3"})`
  display: flex;
  flex: 0 1 auto;
  overflow-x: scroll;
  ${(0,E.createScrollBarStyles)("x")};
  column-gap: ${n.SPACINGS.ONE};
  margin-bottom: -${E.SCROLLBAR_SIZE};
  padding: 0;

  @media (hover: none), (hover: on-demand) {
    visibility: visible;
    margin-bottom: 0;
  }
`,e.default.code.withConfig({displayName:"ApiMetaData__ColoredCode",componentId:"sc-7fc4547e-4"})`
  color: ${({$color:o})=>o};
  font-size: 1.3rem !important;
  flex: 0 0 auto;
`;let R=e.default.div.withConfig({displayName:"Styles__MdxStyles",componentId:"sc-41f18efa-0"})`
  ${u};

  color: ${t.COLORS.TEXT_BODY};

  ${r.TabsPanelWrapper} >,
  ${l.AdmonitionContent} >,
  > {
    ${A};
    ${f};

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    ul,
    ol,
    dl,
    p,
    hgroup,
    address,
    table,
    fieldset,
    figure,
    pre,
    dd,
    blockquote,
    blockquote code,
    kbd,
    samp,
    .${a.PRISM_HIGHLIGHT_CLASS_NAME},
      ${i.TabsWrapper},
      ${l.AdmonitionWrapper},
      ${m} {
      margin-bottom: ${n.SPACINGS.FOUR};
    }
  }

  ${r.TabsPanelWrapper} > *:first-child,
  ${l.AdmonitionContent} > *:first-child,
  > *:first-child {
    margin-top: 0;
  }

  ${r.TabsPanelWrapper} > *:last-child, 
  ${l.AdmonitionContent} > *:last-child, 
  > *:last-child {
    margin-bottom: 0;
  }
`;o.s(["MdxStyles",0,R],192770)}]);