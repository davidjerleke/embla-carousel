(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,192770,e=>{"use strict";var t=e.i(997053),i=e.i(350437),o=e.i(801770),n=e.i(372729),a=e.i(233127),r=e.i(734568),l=e.i(294801),s=e.i(380999),d=e.i(925866),c=e.i(506390),S=e.i(784613),p=e.i(728191);let f=o.SPACINGS.EIGHT,I=o.SPACINGS.CUSTOM(({THREE:e})=>e-.2),A=t.css`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    scroll-margin-top: calc(${S.HEADER_HEIGHT} + ${o.SPACINGS.FOUR});
    color: ${i.COLORS.TEXT_HIGH_CONTRAST};
    font-weight: ${d.FONT_WEIGHTS.BOLD};
    position: relative;
  }

  h1,
  h2,
  h3 {
    margin-top: ${f};
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
        width: ${o.SPACINGS.FIVE};
      }

      &:before {
        color: ${i.COLORS.BACKGROUND_SITE};
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
        ${(0,s.createSquareSizeStyles)(I)};
        color: ${i.COLORS.TEXT_LOW_CONTRAST};
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
`,h=t.css`
  ol,
  ul {
    margin-left: ${o.SPACINGS.FOUR};
  }

  ol > li:not(:last-child),
  ul > li:not(:last-child) {
    margin-bottom: ${o.SPACINGS.TWO};
  }

  ul {
    list-style: disc outside none;
  }
`;var g=e.i(431480),_=e.i(907827),E=e.i(671249),C=e.i(893060),$=e.i(668347),m=e.i(654938);let O=t.css`
  .${C.CODE_HIGHLIGHT_CLASS_NAME} {
    background-color: ${i.COLORS.BACKGROUND_CODE};
    border-radius: ${$.PRISM_FRAME_RADIUS};
    border: ${E.BORDER_SIZES.DETAIL} solid ${i.COLORS.DETAIL_LOW_CONTRAST};
    padding: ${o.SPACINGS.CUSTOM(({ONE:e})=>e/2)} ${o.SPACINGS.ONE};
    font-size: ${d.FONT_SIZES.CUSTOM(({COMPLEMENTARY:e})=>e+.04)};
    box-sizing: border-box;
  }

  ${l.AdmonitionWrapper} .${C.CODE_HIGHLIGHT_CLASS_NAME} {
    background-color: ${i.COLORS.BACKGROUND_SITE};
    border-color: ${i.COLORS.DETAIL_MEDIUM_CONTRAST};
  }

  ${l.AdmonitionWrapper} .${n.PRISM_HIGHLIGHT_CLASS_NAME} {
    display: inline-grid;
    margin: 0;
    width: 100%;
  }

  .${n.PRISM_HIGHLIGHT_CLASS_NAME} {
    ${g.pageFrameCollapseStyles};
    position: relative;
  }

  .${n.PRISM_HIGHLIGHT_CODE_LANGUAGE_CLASS_NAME} {
    font-weight: ${d.FONT_WEIGHTS.SEMI_BOLD};
    z-index: ${_.LAYERS.STEP};
    display: block;
    content: attr(data-display-language);
    line-height: 1;
    font-size: ${d.FONT_SIZES.DETAIL};
    text-transform: uppercase;
    position: absolute;
    top: 0.1rem;
    left: ${p.PAGE_FRAME_SPACING};
    padding: ${o.SPACINGS.CUSTOM(({ONE:e})=>e-.2)}
      ${o.SPACINGS.CUSTOM(({ONE:e})=>e+.2)};
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

  .${n.PRISM_HIGHLIGHT_LINE_CLASS_NAME} {
    position: relative;
    display: block;
    margin-left: -${o.SPACINGS.FOUR};
    margin-right: -${o.SPACINGS.FOUR};
    padding-left: ${o.SPACINGS.FOUR};
    padding-right: ${o.SPACINGS.FOUR};

    &:before,
    &:after {
      position: absolute;
      top: 0;
      bottom: 0;
      content: '';
      pointer-events: none;
      background-image: linear-gradient(
        90deg,
        ${i.COLORS.BRAND_PRIMARY},
        ${i.COLORS.BRAND_SECONDARY}
      );
    }

    &:after {
      left: 0;
      width: ${E.BORDER_SIZES.ACCENT_VERTICAL};
      z-index: ${_.LAYERS.STEP};
    }
    &:before {
      right: 0;
      left: 0;
      opacity: 0.07;
    }
  }

  .${n.PRISM_HIGHLIGHT_CLASS_NAME} pre[class*='language-'] {
    background-color: transparent;
    border: 0;
    margin-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: ${p.PAGE_FRAME_SPACING};
    padding-bottom: calc(${p.PAGE_FRAME_SPACING} - ${m.SCROLLBAR_SIZE});

    @media (hover: none), (hover: on-demand) {
      padding-bottom: ${p.PAGE_FRAME_SPACING};
    }
  }

  .${n.PRISM_HIGHLIGHT_CLASS_NAME} pre code {
    padding: 0 ${p.PAGE_FRAME_SPACING};
    background-color: transparent;
    display: block;
    font-size: 100%;
    line-height: 1.5;
    float: left;
    min-width: 100%;
  }

  pre {
    ${(0,m.createScrollBarStyles)("x")};
    color: ${i.COLORS.TEXT_BODY};
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
    color: ${i.COLORS.TEXT_COMMENT};
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
    color: ${i.COLORS.BRAND_ALTERNATIVE};
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
    color: ${i.COLORS.BRAND_SECONDARY};
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
    color: ${i.COLORS.BRAND_PRIMARY};
  }

  .token.console,
  .token.punctuation,
  .token.tag.script:not(.punctuation):not(.function),
  .token.literal-property.property,
  .token.plain-text {
    color: ${i.COLORS.TEXT_HIGH_CONTRAST};
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
`;e.i(843476);let N=t.default.div.withConfig({displayName:"ApiMetaData__ApiMetaDataWrapper",componentId:"sc-7fc4547e-0"})``;t.default.div.withConfig({displayName:"ApiMetaData__Row",componentId:"sc-7fc4547e-1"})`
  font-size: ${d.FONT_SIZES.COMPLEMENTARY};
  display: flex;
  align-items: center;
  column-gap: ${o.SPACINGS.ONE};

  ${c.MEDIA.COMPACT} {
    margin-right: -${p.PAGE_FRAME_SPACING};
  }
`,t.default.span.withConfig({displayName:"ApiMetaData__Key",componentId:"sc-7fc4547e-2"})`
  flex: 0 0 auto;
`,t.default.span.withConfig({displayName:"ApiMetaData__Scrollable",componentId:"sc-7fc4547e-3"})`
  display: flex;
  flex: 0 1 auto;
  overflow-x: scroll;
  ${(0,m.createScrollBarStyles)("x")};
  column-gap: ${o.SPACINGS.ONE};
  margin-bottom: -${m.SCROLLBAR_SIZE};
  padding: 0;

  @media (hover: none), (hover: on-demand) {
    visibility: visible;
    margin-bottom: 0;
  }
`,t.default.code.withConfig({displayName:"ApiMetaData__ColoredCode",componentId:"sc-7fc4547e-4"})`
  color: ${({$color:e})=>e};
  font-size: 1.3rem !important;
  flex: 0 0 auto;
`;let u=t.default.div.withConfig({displayName:"Styles__MdxStyles",componentId:"sc-41f18efa-0"})`
  ${O};

  color: ${i.COLORS.TEXT_BODY};

  ${r.TabsPanelWrapper} >,
  ${l.AdmonitionContent} >,
  > {
    ${h};
    ${A};

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
    .${n.PRISM_HIGHLIGHT_CLASS_NAME},
      ${a.TabsWrapper},
      ${l.AdmonitionWrapper},
      ${N} {
      margin-bottom: ${o.SPACINGS.FOUR};
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
`;e.s(["MdxStyles",0,u],192770)},617199,e=>{"use strict";var t=e.i(843476),i=e.i(271645);let o=(0,i.createContext)([]);function n(e){let{tableOfContents:i,children:n}=e;return(0,t.jsx)(o.Provider,{value:i,children:n})}function a(){return(0,i.useContext)(o)}e.s(["TableOfContentsProvider",()=>n,"useTableOfContentsContext",()=>a])},145360,e=>{"use strict";var t=e.i(843476),i=e.i(997053),o=e.i(109950),n=e.i(850056),a=e.i(271645),r=e.i(350437),l=e.i(801770),s=e.i(506390),d=e.i(671249),c=e.i(925866),S=e.i(764268),p=e.i(654938),f=e.i(728191),I=e.i(617199),A=e.i(202623);let h=i.default.div.withConfig({displayName:"TableOfContentsMenu__TableOfContentsMenuWrapper",componentId:"sc-eca85ec3-0"})`
  ${(0,p.createScrollBarStyles)("y")};
  overflow: auto;
  position: relative;
  max-height: 100%;

  ${s.MEDIA.DESKTOP} {
    padding-top: ${f.PAGE_FRAME_SPACING};
    padding-bottom: ${f.PAGE_FRAME_SPACING};
  }
`,g=i.default.div.withConfig({displayName:"TableOfContentsMenu__Heading",componentId:"sc-eca85ec3-1"})`
  color: ${r.COLORS.TEXT_BODY};
  padding-top: ${l.SPACINGS.ONE};
  padding-bottom: ${l.SPACINGS.ONE};
  font-weight: ${c.FONT_WEIGHTS.SEMI_BOLD};
  text-transform: uppercase;

  ${s.MEDIA.COMPACT} {
    padding-top: ${l.SPACINGS.TWO};
    border-bottom: ${d.BORDER_SIZES.DETAIL} solid ${r.COLORS.DETAIL_LOW_CONTRAST};
    margin-bottom: ${l.SPACINGS.TWO};
  }
`,_=i.default.ol.withConfig({displayName:"TableOfContentsMenu__TableOfContentsMenuItemsWrapper",componentId:"sc-eca85ec3-2"})`
  list-style: none;
`,E=(0,i.default)(S.LinkNavigation).withConfig({displayName:"TableOfContentsMenu__Link",componentId:"sc-eca85ec3-3"})`
  padding-top: ${l.SPACINGS.ONE};
  padding-bottom: ${l.SPACINGS.ONE};
  outline-offset: -${d.BORDER_SIZES.OUTLINE};

  ${({$level:e})=>e>0&&i.css`
      margin-left: ${l.SPACINGS.CUSTOM(()=>1.6*e)};

      > ${S.InactiveText} {
        color: ${r.COLORS.TEXT_LOW_CONTRAST};
      }
    `};
`;function C(){let[e,i]=(0,a.useState)(""),o=(0,I.useTableOfContentsContext)(),n=(0,a.useMemo)(()=>o.map(e=>e.id||"").filter(Boolean),[o]);return((0,a.useEffect)(()=>{let e=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&i(e.target.id)})},{rootMargin:"0% 0% -80% 0%"});return n.forEach(t=>{let i=document.getElementById(t);i&&e.observe(i)}),()=>{n.forEach(t=>{let i=document.getElementById(t);i&&e.unobserve(i)})}},[n]),(0,A.arrayHasItems)(o))?(0,t.jsxs)(h,{children:[(0,t.jsx)(g,{children:"On this page"}),(0,t.jsx)(_,{children:o.map(i=>(0,t.jsx)("li",{children:(0,t.jsx)(E,{slug:`#${i.id||""}`,isActive:e===i.id,$level:i.level,children:i.text})},i.id))})]}):null}var $=e.i(907827),m=e.i(784613);let O=i.default.nav.withConfig({displayName:"TableOfContents__TableOfContentsWrapper",componentId:"sc-9a3f5612-0"})`
  ${s.MEDIA.DESKTOP} {
    position: fixed;
    z-index: ${$.LAYERS.NAVIGATION};
    top: ${m.HEADER_HEIGHT};
    font-size: ${c.FONT_SIZES.COMPLEMENTARY};
    bottom: 0;
    width: inherit;
    max-width: inherit;
  }

  ${s.MEDIA.MIN_LG} {
    padding-left: ${l.SPACINGS.SEVEN};
  }
`,N=i.default.div.withConfig({displayName:"TableOfContents__MenuWrapper",componentId:"sc-9a3f5612-1"})`
  height: 100%;

  ${s.MEDIA.DESKTOP} {
    &:before,
    &:after {
      position: absolute;
      z-index: ${$.LAYERS.STEP};
      left: -${f.PAGE_FRAME_SPACING};
      right: -${f.PAGE_FRAME_SPACING};
      content: '';
    }

    &:before {
      ${(0,p.createScrollBarShadowStyles)("top")};
      top: -${p.SCROLL_BAR_SHADOW_SIZE};
    }

    &:after {
      ${(0,p.createScrollBarShadowStyles)("bottom")};
      bottom: -${p.SCROLL_BAR_SHADOW_SIZE};
    }
  }
`;function u(){let e=(0,o.useAppSelector)(n.selectKeyNavigating);return(0,t.jsx)(O,{"aria-label":"table of contents",children:(0,t.jsx)(N,{$isKeyNavigating:e,children:(0,t.jsx)(C,{})})})}e.s(["TableOfContents",()=>u],145360)},707095,e=>{"use strict";var t=e.i(843476),i=e.i(997053),o=e.i(109950),n=e.i(646107),a=e.i(515681),r=e.i(506390),l=e.i(801770),s=e.i(907827),d=e.i(728191),c=e.i(475086),S=e.i(112426),p=e.i(202623),f=e.i(145360);let I="28rem",A="21rem",h=l.SPACINGS.SEVEN,g=i.css`
  min-width: 0;
  flex: 0 0 auto;

  ${r.MEDIA.DESKTOP} {
    width: ${A};
    max-width: ${A};
  }

  ${r.MEDIA.MIN_LG} {
    width: ${I};
    max-width: ${I};
  }
`,_=(0,i.default)(a.PageFrame).withConfig({displayName:"PageGrid__PageGridWrapper",componentId:"sc-4288d600-0"})`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  padding-top: ${d.PAGE_FRAME_SPACING};
  padding-bottom: ${d.PAGE_FRAME_SPACING};
`,E=i.default.main.withConfig({displayName:"PageGrid__Main",componentId:"sc-4288d600-1"})`
  flex: 1;
  min-width: 0;
  max-width: 100%;
  position: relative;
  z-index: ${s.LAYERS.STEP};

  ${({$isStartPage:e})=>!e&&i.css`
      ${r.MEDIA.DESKTOP} {
        padding-right: ${h};
        padding-left: ${h};
      }
    `};
`,C=i.default.div.withConfig({displayName:"PageGrid__SidebarNavigationWrapper",componentId:"sc-4288d600-2"})`
  ${g};

  ${r.MEDIA.DESKTOP} {
    ${({$isStartPage:e})=>e&&i.css`
        position: fixed;
        visibility: hidden;
        left: 0;
        transform: translateX(-100%);
      `};
  }
`,$=i.default.div.withConfig({displayName:"PageGrid__TableOfContentsWrapper",componentId:"sc-4288d600-3"})`
  ${g};

  ${r.MEDIA.COMPACT} {
    display: none;
  }

  ${({$isStartPage:e})=>e&&i.css`
      display: none;
    `};
`;function m(e){let{children:i,layout:a}=e,r=(0,o.useAppSelector)(n.selectRoutesLoading),l=a===d.PAGE_LAYOUTS.HOME,s=l?"MD":void 0,I=(0,c.useSidebarNavigationContext)(),A=(0,p.arrayHasItems)(I.flatRoutes);return(0,t.jsxs)(_,{size:s,children:[A&&(0,t.jsx)(C,{$isStartPage:l,children:(0,t.jsx)(S.SidebarNavigation,{})}),(0,t.jsx)(E,{role:"main","aria-live":"polite",$isStartPage:l,"aria-busy":r,children:i}),(0,t.jsx)($,{$isStartPage:l,children:(0,t.jsx)(f.TableOfContents,{})})]})}e.s(["MAIN_CONTENT_SPACING",0,h,"PageGrid",()=>m,"SIDEBAR_LG_DOWN_WIDTH",0,A,"SIDEBAR_LG_UP_WIDTH",0,I,"sidebarStyles",0,g])},959941,e=>{"use strict";var t=e.i(843476),i=e.i(997053),o=e.i(506390),n=e.i(350437),a=e.i(801770),r=e.i(925866),l=e.i(857355),s=e.i(380999),d=e.i(266349),c=e.i(174776),S=e.i(728191),p=e.i(784613);let f=i.default.div.attrs({id:S.MAIN_CONTENT_ID}).withConfig({displayName:"PageMainContent",componentId:"sc-ddfdd52f-0"})`
  scroll-margin-top: calc(${p.HEADER_HEIGHT} + ${a.SPACINGS.FOUR});
`;var I=e.i(343869),A=e.i(725266);let h=i.default.div.withConfig({displayName:"HeroBrand__HeroBrandWrapper",componentId:"sc-130d8deb-0"})`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  ${o.MEDIA.MIN_SM} {
    padding-top: ${a.SPACINGS.SIX};
  }

  ${o.MEDIA.MIN_MD} {
    padding-top: ${a.SPACINGS.TWELVE};
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: row-reverse;
  }
`,g=(0,i.default)(l.SiteLogo).withConfig({displayName:"HeroBrand__HeroLogo",componentId:"sc-130d8deb-1"})`
  flex: 0 0 auto;
  ${(0,s.createSquareSizeStyles)("15rem")};

  ${o.MEDIA.MIN_SM} {
    ${(0,s.createSquareSizeStyles)("22rem")};
  }

  ${o.MEDIA.MIN_MD} {
    ${(0,s.createSquareSizeStyles)("32rem")};
  }

  ${o.MEDIA.MIN_LG} {
    ${(0,s.createSquareSizeStyles)("34rem")};
  }
`,_=i.default.div.withConfig({displayName:"HeroBrand__Content",componentId:"sc-130d8deb-2"})`
  max-width: ${"50rem"};

  ${o.MEDIA.MAX_MD} {
    padding-top: ${a.SPACINGS.FOUR};
    text-align: center;
  }

  ${o.MEDIA.MAX_SM} {
    padding-top: ${a.SPACINGS.TWO};
  }
`,E=i.default.h1.withConfig({displayName:"HeroBrand__H1",componentId:"sc-130d8deb-3"})`
  color: ${n.COLORS.TEXT_HIGH_CONTRAST};
  margin-bottom: ${a.SPACINGS.FOUR};
  font-size: ${r.FONT_SIZES.CUSTOM(()=>5)};
  line-height: 0.9;
  font-weight: ${r.FONT_WEIGHTS.BLACK};

  > span {
    display: block;
  }

  > span:nth-child(2) {
    ${d.BRAND_GRADIENT_TEXT_STYLES};
  }

  ${o.MEDIA.MIN_XS} {
    font-size: ${r.FONT_SIZES.CUSTOM(()=>5.6)};
  }

  ${o.MEDIA.MIN_SM} {
    font-size: ${r.FONT_SIZES.CUSTOM(()=>6.2)};
  }

  ${o.MEDIA.MIN_MD} {
    font-size: ${r.FONT_SIZES.CUSTOM(()=>8)};
  }
`,C=i.default.h2.withConfig({displayName:"HeroBrand__H2",componentId:"sc-130d8deb-4"})`
  color: ${n.COLORS.TEXT_MEDIUM_CONTRAST};
  font-size: ${r.FONT_SIZES.H4};
  line-height: 1.5;

  ${o.MEDIA.MIN_SM} {
    font-size: ${r.FONT_SIZES.CUSTOM(()=>2.1)};
  }
`,$=(0,i.default)(f).withConfig({displayName:"HeroBrand__CtaWrapper",componentId:"sc-130d8deb-5"})`
  ${(0,c.createGapStyles)(a.SPACINGS.TWO,a.SPACINGS.TWO)};
  display: flex;
  flex-wrap: wrap;
  padding-top: ${a.SPACINGS.FOUR};

  ${o.MEDIA.MIN_SM} {
    padding-top: ${a.SPACINGS.SIX};
  }
  ${o.MEDIA.COMPACT} {
    justify-content: center;
  }
`;function m(){let{TITLE:e,DESCRIPTION:i}=I.GLOBAL_DATA;return(0,t.jsxs)(h,{children:[(0,t.jsx)(g,{appearance:"blur"}),(0,t.jsxs)(_,{children:[(0,t.jsx)(E,{children:e.split(" ").map((e,i)=>(0,t.jsx)("span",{children:e},`${e}-${i}`))}),(0,t.jsx)(C,{children:i}),(0,t.jsxs)($,{as:"ul",children:[(0,t.jsx)("li",{children:(0,t.jsx)(A.LinkButtonPrimaryFilled,{href:"/docs/examples/predefined/",children:"Examples"})}),(0,t.jsx)("li",{children:(0,t.jsx)(A.LinkButtonPrimaryOutlined,{href:I.DOCS_LATEST_VERSION.SLUG,children:"Get started"})})]})]})]})}var O=e.i(747251),N=e.i(878612);let u=i.default.ul.withConfig({displayName:"HeroUsps__HeroUspsWrapper",componentId:"sc-a6f0ef1f-0"})`
  ${(0,c.createGapStyles)(N.CARD_SPACING,N.CARD_SPACING,"li")};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: ${a.SPACINGS.EIGHT};

  ${o.MEDIA.MIN_SM} {
    padding-top: ${a.SPACINGS.ELEVEN};
    padding-bottom: ${a.SPACINGS.THREE};
  }

  ${o.MEDIA.MIN_MD} {
    padding-top: ${a.SPACINGS.TWELVE};
    padding-bottom: ${a.SPACINGS.EIGHT};
  }
`,T=i.default.li.withConfig({displayName:"HeroUsps__Usp",componentId:"sc-a6f0ef1f-1"})`
  min-width: 0;
  flex: 0 0 100%;

  ${o.MEDIA.MIN_XS} {
    flex: 0 0 calc(100% / 2);
  }

  ${o.MEDIA.MIN_SM} {
    flex: 0 0 calc(100% / 3);
  }
`,M=i.default.h3.withConfig({displayName:"HeroUsps__UspHeader",componentId:"sc-a6f0ef1f-2"})`
  color: ${n.COLORS.TEXT_BODY};
  margin-bottom: ${a.SPACINGS.CUSTOM(({ONE:e})=>e+.2)};
  font-size: ${r.FONT_SIZES.H4};
  font-weight: ${r.FONT_WEIGHTS.BOLD};
`,b=i.default.p.withConfig({displayName:"HeroUsps__UspText",componentId:"sc-a6f0ef1f-3"})`
  margin-bottom: ${a.SPACINGS.THREE};
  color: ${n.COLORS.TEXT_LOW_CONTRAST};
`;function R(){return(0,t.jsxs)(u,{children:[(0,t.jsx)(T,{children:(0,t.jsx)(O.LinkCard,{href:"/docs/api/",children:(0,t.jsxs)("div",{children:[(0,t.jsx)(M,{children:"Highly Extensible"}),(0,t.jsx)(b,{children:"An API designed with flexibility and extensibility in mind."})]})})}),(0,t.jsx)(T,{children:(0,t.jsx)(O.LinkCard,{href:"/docs/plugins/",children:(0,t.jsxs)("div",{children:[(0,t.jsx)(M,{children:"Plugin System"}),(0,t.jsx)(b,{children:"Add functionality and customize your carousels as you go."})]})})}),(0,t.jsx)(T,{children:(0,t.jsx)(O.LinkCard,{href:"/docs/guides/server-side-rendering",children:(0,t.jsxs)("div",{children:[(0,t.jsx)(M,{children:"Server-Side Rendering"}),(0,t.jsx)(b,{children:"Works seamlessly with SSR frameworks."})]})})})]})}let G=i.default.div.withConfig({displayName:"Hero__HeroWrapper",componentId:"sc-8b051c39-0"})``;function P(){return(0,t.jsxs)(G,{children:[(0,t.jsx)(m,{}),(0,t.jsx)(R,{})]})}e.s(["Hero",()=>P],959941)}]);