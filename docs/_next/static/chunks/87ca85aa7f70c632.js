(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,192770,e=>{"use strict";var t=e.i(997053),o=e.i(350437),i=e.i(801770),a=e.i(372729),n=e.i(233127),r=e.i(734568),l=e.i(294801),s=e.i(380999),d=e.i(925866),c=e.i(506390),S=e.i(784613),p=e.i(728191);let g=i.SPACINGS.EIGHT,A=i.SPACINGS.CUSTOM(({THREE:e})=>e-.2),f=t.css`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    scroll-margin-top: calc(${S.HEADER_HEIGHT} + ${i.SPACINGS.FOUR});
    color: ${o.COLORS.TEXT_HIGH_CONTRAST};
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
        width: ${i.SPACINGS.FIVE};
      }

      &:before {
        color: ${o.COLORS.BACKGROUND_SITE};
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
        ${(0,s.createSquareSizeStyles)(A)};
        color: ${o.COLORS.TEXT_LOW_CONTRAST};
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
`,_=t.css`
  ol,
  ul {
    margin-left: ${i.SPACINGS.FOUR};
  }

  ol > li:not(:last-child),
  ul > li:not(:last-child) {
    margin-bottom: ${i.SPACINGS.TWO};
  }

  ul {
    list-style: disc outside none;
  }
`;var h=e.i(431480),E=e.i(907827),I=e.i(671249),$=e.i(893060),m=e.i(668347),C=e.i(654938);let O=t.css`
  .${$.CODE_HIGHLIGHT_CLASS_NAME} {
    background-color: ${o.COLORS.BACKGROUND_CODE};
    border-radius: ${m.PRISM_FRAME_RADIUS};
    border: ${I.BORDER_SIZES.DETAIL} solid ${o.COLORS.DETAIL_LOW_CONTRAST};
    padding: ${i.SPACINGS.CUSTOM(({ONE:e})=>e/2)} ${i.SPACINGS.ONE};
    font-size: ${d.FONT_SIZES.CUSTOM(({COMPLEMENTARY:e})=>e+.04)};
    box-sizing: border-box;
  }

  ${l.AdmonitionWrapper} .${$.CODE_HIGHLIGHT_CLASS_NAME} {
    background-color: ${o.COLORS.BACKGROUND_SITE};
    border-color: ${o.COLORS.DETAIL_MEDIUM_CONTRAST};
  }

  ${l.AdmonitionWrapper} .${a.PRISM_HIGHLIGHT_CLASS_NAME} {
    display: inline-grid;
    margin: 0;
    width: 100%;
  }

  .${a.PRISM_HIGHLIGHT_CLASS_NAME} {
    ${h.pageFrameCollapseStyles};
    position: relative;
  }

  .${a.PRISM_HIGHLIGHT_CODE_LANGUAGE_CLASS_NAME} {
    font-weight: ${d.FONT_WEIGHTS.SEMI_BOLD};
    z-index: ${E.LAYERS.STEP};
    display: block;
    content: attr(data-display-language);
    line-height: 1;
    font-size: ${d.FONT_SIZES.DETAIL};
    text-transform: uppercase;
    position: absolute;
    top: 0.1rem;
    left: ${p.PAGE_FRAME_SPACING};
    padding: ${i.SPACINGS.CUSTOM(({ONE:e})=>e-.2)}
      ${i.SPACINGS.CUSTOM(({ONE:e})=>e+.2)};
    border-bottom-left-radius: ${m.PRISM_FRAME_RADIUS};
    border-bottom-right-radius: ${m.PRISM_FRAME_RADIUS};

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
    margin-left: -${i.SPACINGS.FOUR};
    margin-right: -${i.SPACINGS.FOUR};
    padding-left: ${i.SPACINGS.FOUR};
    padding-right: ${i.SPACINGS.FOUR};

    &:before,
    &:after {
      position: absolute;
      top: 0;
      bottom: 0;
      content: '';
      pointer-events: none;
      background-image: linear-gradient(
        90deg,
        ${o.COLORS.BRAND_PRIMARY},
        ${o.COLORS.BRAND_SECONDARY}
      );
    }

    &:after {
      left: 0;
      width: ${I.BORDER_SIZES.ACCENT_VERTICAL};
      z-index: ${E.LAYERS.STEP};
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
    padding-bottom: calc(${p.PAGE_FRAME_SPACING} - ${C.SCROLLBAR_SIZE});

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
    ${(0,C.createScrollBarStyles)("x")};
    color: ${o.COLORS.TEXT_BODY};
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
    color: ${o.COLORS.TEXT_COMMENT};
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
    color: ${o.COLORS.BRAND_ALTERNATIVE};
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
    color: ${o.COLORS.BRAND_SECONDARY};
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
    color: ${o.COLORS.BRAND_PRIMARY};
  }

  .token.console,
  .token.punctuation,
  .token.tag.script:not(.punctuation):not(.function),
  .token.literal-property.property,
  .token.plain-text {
    color: ${o.COLORS.TEXT_HIGH_CONTRAST};
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
`;e.i(843476);let u=t.default.div.withConfig({displayName:"ApiMetaData__ApiMetaDataWrapper",componentId:"sc-7fc4547e-0"})``;t.default.div.withConfig({displayName:"ApiMetaData__Row",componentId:"sc-7fc4547e-1"})`
  font-size: ${d.FONT_SIZES.COMPLEMENTARY};
  display: flex;
  align-items: center;
  column-gap: ${i.SPACINGS.ONE};

  ${c.MEDIA.COMPACT} {
    margin-right: -${p.PAGE_FRAME_SPACING};
  }
`,t.default.span.withConfig({displayName:"ApiMetaData__Key",componentId:"sc-7fc4547e-2"})`
  flex: 0 0 auto;
`,t.default.span.withConfig({displayName:"ApiMetaData__Scrollable",componentId:"sc-7fc4547e-3"})`
  display: flex;
  flex: 0 1 auto;
  overflow-x: scroll;
  ${(0,C.createScrollBarStyles)("x")};
  column-gap: ${i.SPACINGS.ONE};
  margin-bottom: -${C.SCROLLBAR_SIZE};
  padding: 0;

  @media (hover: none), (hover: on-demand) {
    visibility: visible;
    margin-bottom: 0;
  }
`,t.default.code.withConfig({displayName:"ApiMetaData__ColoredCode",componentId:"sc-7fc4547e-4"})`
  color: ${({$color:e})=>e};
  font-size: 1.3rem !important;
  flex: 0 0 auto;
`;let N=t.default.div.withConfig({displayName:"Styles__MdxStyles",componentId:"sc-41f18efa-0"})`
  ${O};

  color: ${o.COLORS.TEXT_BODY};

  ${r.TabsPanelWrapper} >,
  ${l.AdmonitionContent} >,
  > {
    ${_};
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
      ${n.TabsWrapper},
      ${l.AdmonitionWrapper},
      ${u} {
      margin-bottom: ${i.SPACINGS.FOUR};
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
`;e.s(["MdxStyles",0,N],192770)},145360,e=>{"use strict";var t=e.i(843476),o=e.i(997053),i=e.i(109950),a=e.i(850056),n=e.i(271645),r=e.i(350437),l=e.i(801770),s=e.i(506390),d=e.i(671249),c=e.i(925866),S=e.i(764268),p=e.i(654938),g=e.i(728191),A=e.i(617199),f=e.i(202623);let _=o.default.div.withConfig({displayName:"TableOfContentsMenu__TableOfContentsMenuWrapper",componentId:"sc-eca85ec3-0"})`
  ${(0,p.createScrollBarStyles)("y")};
  overflow: auto;
  position: relative;
  max-height: 100%;

  ${s.MEDIA.DESKTOP} {
    padding-top: ${g.PAGE_FRAME_SPACING};
    padding-bottom: ${g.PAGE_FRAME_SPACING};
  }
`,h=o.default.div.withConfig({displayName:"TableOfContentsMenu__Heading",componentId:"sc-eca85ec3-1"})`
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
`,E=o.default.ol.withConfig({displayName:"TableOfContentsMenu__TableOfContentsMenuItemsWrapper",componentId:"sc-eca85ec3-2"})`
  list-style: none;
`,I=(0,o.default)(S.LinkNavigation).withConfig({displayName:"TableOfContentsMenu__Link",componentId:"sc-eca85ec3-3"})`
  padding-top: ${l.SPACINGS.ONE};
  padding-bottom: ${l.SPACINGS.ONE};
  outline-offset: -${d.BORDER_SIZES.OUTLINE};

  ${({$level:e})=>e>0&&o.css`
      margin-left: ${l.SPACINGS.CUSTOM(()=>1.6*e)};

      > ${S.InactiveText} {
        color: ${r.COLORS.TEXT_LOW_CONTRAST};
      }
    `};
`;function $(){let[e,o]=(0,n.useState)(""),i=(0,A.useTableOfContentsContext)(),a=(0,n.useMemo)(()=>i.map(e=>e.id||"").filter(Boolean),[i]);return((0,n.useEffect)(()=>{let e=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&o(e.target.id)})},{rootMargin:"0% 0% -80% 0%"});return a.forEach(t=>{let o=document.getElementById(t);o&&e.observe(o)}),()=>{a.forEach(t=>{let o=document.getElementById(t);o&&e.unobserve(o)})}},[a]),(0,f.arrayHasItems)(i))?(0,t.jsxs)(_,{children:[(0,t.jsx)(h,{children:"On this page"}),(0,t.jsx)(E,{children:i.map(o=>(0,t.jsx)("li",{children:(0,t.jsx)(I,{slug:`#${o.id||""}`,isActive:e===o.id,$level:o.level,children:o.text})},o.id))})]}):null}var m=e.i(907827),C=e.i(784613);let O=o.default.nav.withConfig({displayName:"TableOfContents__TableOfContentsWrapper",componentId:"sc-9a3f5612-0"})`
  ${s.MEDIA.DESKTOP} {
    position: fixed;
    z-index: ${m.LAYERS.NAVIGATION};
    top: ${C.HEADER_HEIGHT};
    font-size: ${c.FONT_SIZES.COMPLEMENTARY};
    bottom: 0;
    width: inherit;
    max-width: inherit;
  }

  ${s.MEDIA.MIN_LG} {
    padding-left: ${l.SPACINGS.SEVEN};
  }
`,u=o.default.div.withConfig({displayName:"TableOfContents__MenuWrapper",componentId:"sc-9a3f5612-1"})`
  height: 100%;

  ${s.MEDIA.DESKTOP} {
    &:before,
    &:after {
      position: absolute;
      z-index: ${m.LAYERS.STEP};
      left: -${g.PAGE_FRAME_SPACING};
      right: -${g.PAGE_FRAME_SPACING};
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
`;function N(){let e=(0,i.useAppSelector)(a.selectKeyNavigating);return(0,t.jsx)(O,{"aria-label":"table of contents",children:(0,t.jsx)(u,{$isKeyNavigating:e,children:(0,t.jsx)($,{})})})}e.s(["TableOfContents",()=>N],145360)},707095,e=>{"use strict";var t=e.i(843476),o=e.i(997053),i=e.i(109950),a=e.i(646107),n=e.i(515681),r=e.i(506390),l=e.i(801770),s=e.i(907827),d=e.i(728191),c=e.i(475086),S=e.i(112426),p=e.i(202623),g=e.i(145360);let A="28rem",f="21rem",_=l.SPACINGS.SEVEN,h=o.css`
  min-width: 0;
  flex: 0 0 auto;

  ${r.MEDIA.DESKTOP} {
    width: ${f};
    max-width: ${f};
  }

  ${r.MEDIA.MIN_LG} {
    width: ${A};
    max-width: ${A};
  }
`,E=(0,o.default)(n.PageFrame).withConfig({displayName:"PageGrid__PageGridWrapper",componentId:"sc-4288d600-0"})`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  padding-top: ${d.PAGE_FRAME_SPACING};
  padding-bottom: ${d.PAGE_FRAME_SPACING};
`,I=o.default.main.withConfig({displayName:"PageGrid__Main",componentId:"sc-4288d600-1"})`
  flex: 1;
  min-width: 0;
  max-width: 100%;
  position: relative;
  z-index: ${s.LAYERS.STEP};

  ${({$isStartPage:e})=>!e&&o.css`
      ${r.MEDIA.DESKTOP} {
        padding-right: ${_};
        padding-left: ${_};
      }
    `};
`,$=o.default.div.withConfig({displayName:"PageGrid__SidebarNavigationWrapper",componentId:"sc-4288d600-2"})`
  ${h};

  ${r.MEDIA.DESKTOP} {
    ${({$isStartPage:e})=>e&&o.css`
        position: fixed;
        visibility: hidden;
        left: 0;
        transform: translateX(-100%);
      `};
  }
`,m=o.default.div.withConfig({displayName:"PageGrid__TableOfContentsWrapper",componentId:"sc-4288d600-3"})`
  ${h};

  ${r.MEDIA.COMPACT} {
    display: none;
  }

  ${({$isStartPage:e})=>e&&o.css`
      display: none;
    `};
`;function C(e){let{children:o,layout:n}=e,r=(0,i.useAppSelector)(a.selectRoutesLoading),l=n===d.PAGE_LAYOUTS.HOME,s=l?"MD":void 0,A=(0,c.useSidebarNavigationContext)(),f=(0,p.arrayHasItems)(A.flatRoutes);return(0,t.jsxs)(E,{size:s,children:[f&&(0,t.jsx)($,{$isStartPage:l,children:(0,t.jsx)(S.SidebarNavigation,{})}),(0,t.jsx)(I,{role:"main","aria-live":"polite",$isStartPage:l,"aria-busy":r,children:o}),(0,t.jsx)(m,{$isStartPage:l,children:(0,t.jsx)(g.TableOfContents,{})})]})}e.s(["MAIN_CONTENT_SPACING",0,_,"PageGrid",()=>C,"SIDEBAR_LG_DOWN_WIDTH",0,f,"SIDEBAR_LG_UP_WIDTH",0,A,"sidebarStyles",0,h])},922275,e=>{"use strict";var t=e.i(843476),o=e.i(271645),i=e.i(997053),a=e.i(615632),n=e.i(955596),r=e.i(989023),l=e.i(350437),s=e.i(925866),d=e.i(801770),c=e.i(202623),S=e.i(907827),p=e.i(850056),g=e.i(109950),A=e.i(728191),f=e.i(654938);let _=i.default.nav.withConfig({displayName:"PageBreadcrumbs__PageBreadcrumbsWrapper",componentId:"sc-6318225-0"})`
  width: calc(100% + ${A.PAGE_FRAME_SPACING} * 2);
  margin-left: -${A.PAGE_FRAME_SPACING};
  margin-right: -${A.PAGE_FRAME_SPACING};
  font-size: ${s.FONT_SIZES.COMPLEMENTARY};
  margin-bottom: ${d.SPACINGS.THREE};
  position: relative;
  overflow: hidden;

  &:before,
  &:after {
    position: absolute;
    z-index: ${S.LAYERS.STEP};
    top: -${A.PAGE_FRAME_SPACING};
    bottom: -${A.PAGE_FRAME_SPACING};
    content: '';
  }

  &:before {
    ${(0,f.createScrollBarShadowStyles)("left")};
    left: -${f.SCROLL_BAR_SHADOW_SIZE};
  }

  &:after {
    ${(0,f.createScrollBarShadowStyles)("right")};
    right: -${f.SCROLL_BAR_SHADOW_SIZE};
  }
`,h=i.default.div.withConfig({displayName:"PageBreadcrumbs__ScrollArea",componentId:"sc-6318225-1"})`
  ${(0,f.createScrollBarStyles)("x")};
  overflow-x: scroll;
  display: flex;
  align-items: center;

  padding-left: ${A.PAGE_FRAME_SPACING};
  padding-right: ${A.PAGE_FRAME_SPACING};
`,E=i.css`
  flex: 0 0 auto;
  min-width: 0;
  color: ${l.COLORS.TEXT_LOW_CONTRAST};
  padding: ${d.SPACINGS.ONE} 0;
`,I=(0,i.default)(a.LinkBare).withConfig({displayName:"PageBreadcrumbs__Link",componentId:"sc-6318225-2"})`
  ${E};
`,$=i.default.span.withConfig({displayName:"PageBreadcrumbs__ActiveTitle",componentId:"sc-6318225-3"})`
  ${E};
  color: ${l.COLORS.TEXT_BODY};
`,m=(0,i.default)(r.Icon).withConfig({displayName:"PageBreadcrumbs__Separator",componentId:"sc-6318225-4"})`
  flex: 0 0 auto;
  color: ${l.COLORS.TEXT_LOW_CONTRAST};
  margin: 0 ${d.SPACINGS.ONE};
`;function C(){let e=(0,n.useRouteBreadcrumbs)(),i=(0,g.useAppSelector)(p.selectKeyNavigating);return(0,c.arrayHasItems)(e)?(0,t.jsx)(_,{"aria-label":"Breadcrumb Navigation",$isKeyNavigating:i,children:(0,t.jsx)(h,{children:e.map(({slug:i,title:a},n)=>n!==e.length-1?(0,t.jsxs)(o.Fragment,{children:[(0,t.jsx)(I,{href:i,children:a}),(0,t.jsx)(m,{size:"0.8rem",svg:"chevronRight",role:"presentation","aria-hidden":"false"})]},i):(0,t.jsx)($,{children:a},i))})}):null}e.s(["PageBreadcrumbs",()=>C])}]);