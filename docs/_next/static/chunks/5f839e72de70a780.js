(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,617199,e=>{"use strict";var t=e.i(843476),i=e.i(271645);let o=(0,i.createContext)([]);function n(e){let{tableOfContents:i,children:n}=e;return(0,t.jsx)(o.Provider,{value:i,children:n})}function a(){return(0,i.useContext)(o)}e.s(["TableOfContentsProvider",()=>n,"useTableOfContentsContext",()=>a])},145360,e=>{"use strict";var t=e.i(843476),i=e.i(997053),o=e.i(109950),n=e.i(850056),a=e.i(271645),r=e.i(350437),l=e.i(801770),s=e.i(506390),d=e.i(671249),c=e.i(925866),S=e.i(764268),p=e.i(654938),E=e.i(728191),A=e.i(617199),f=e.i(202623);let g=i.default.div.withConfig({displayName:"TableOfContentsMenu__TableOfContentsMenuWrapper",componentId:"sc-eca85ec3-0"})`
  ${(0,p.createScrollBarStyles)("y")};
  overflow: auto;
  position: relative;
  max-height: 100%;

  ${s.MEDIA.DESKTOP} {
    padding-top: ${E.PAGE_FRAME_SPACING};
    padding-bottom: ${E.PAGE_FRAME_SPACING};
  }
`,I=i.default.div.withConfig({displayName:"TableOfContentsMenu__Heading",componentId:"sc-eca85ec3-1"})`
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
`,u=(0,i.default)(S.LinkNavigation).withConfig({displayName:"TableOfContentsMenu__Link",componentId:"sc-eca85ec3-3"})`
  padding-top: ${l.SPACINGS.ONE};
  padding-bottom: ${l.SPACINGS.ONE};
  outline-offset: -${d.BORDER_SIZES.OUTLINE};

  ${({$level:e})=>e>0&&i.css`
      margin-left: ${l.SPACINGS.CUSTOM(()=>1.6*e)};

      > ${S.InactiveText} {
        color: ${r.COLORS.TEXT_LOW_CONTRAST};
      }
    `};
`;function C(){let[e,i]=(0,a.useState)(""),o=(0,A.useTableOfContentsContext)(),n=(0,a.useMemo)(()=>o.map(e=>e.id||"").filter(Boolean),[o]);return((0,a.useEffect)(()=>{let e=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&i(e.target.id)})},{rootMargin:"0% 0% -80% 0%"});return n.forEach(t=>{let i=document.getElementById(t);i&&e.observe(i)}),()=>{n.forEach(t=>{let i=document.getElementById(t);i&&e.unobserve(i)})}},[n]),(0,f.arrayHasItems)(o))?(0,t.jsxs)(g,{children:[(0,t.jsx)(I,{children:"On this page"}),(0,t.jsx)(_,{children:o.map(i=>(0,t.jsx)("li",{children:(0,t.jsx)(u,{slug:`#${i.id||""}`,isActive:e===i.id,$level:i.level,children:i.text})},i.id))})]}):null}var O=e.i(907827),T=e.i(784613);let b=i.default.nav.withConfig({displayName:"TableOfContents__TableOfContentsWrapper",componentId:"sc-9a3f5612-0"})`
  ${s.MEDIA.DESKTOP} {
    position: fixed;
    z-index: ${O.LAYERS.NAVIGATION};
    top: ${T.HEADER_HEIGHT};
    font-size: ${c.FONT_SIZES.COMPLEMENTARY};
    bottom: 0;
    width: inherit;
    max-width: inherit;
  }

  ${s.MEDIA.MIN_LG} {
    padding-left: ${l.SPACINGS.SEVEN};
  }
`,$=i.default.div.withConfig({displayName:"TableOfContents__MenuWrapper",componentId:"sc-9a3f5612-1"})`
  height: 100%;

  ${s.MEDIA.DESKTOP} {
    &:before,
    &:after {
      position: absolute;
      z-index: ${O.LAYERS.STEP};
      left: -${E.PAGE_FRAME_SPACING};
      right: -${E.PAGE_FRAME_SPACING};
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
`;function h(){let e=(0,o.useAppSelector)(n.selectKeyNavigating);return(0,t.jsx)(b,{"aria-label":"table of contents",children:(0,t.jsx)($,{$isKeyNavigating:e,children:(0,t.jsx)(C,{})})})}e.s(["TableOfContents",()=>h],145360)},991527,e=>{"use strict";var t=e.i(843476),i=e.i(997053),o=e.i(109950),n=e.i(850056),a=e.i(350437),r=e.i(801770),l=e.i(506390),s=e.i(784613),d=e.i(907827),c=e.i(671249),S=e.i(172539),p=e.i(728191),E=e.i(371728),A=e.i(233127),f=e.i(145360),g=e.i(354873),I=e.i(156877),_=e.i(852079),u=e.i(734568),C=e.i(237672),O=e.i(654938);let T="36rem",b=i.default.div.withConfig({displayName:"SidebarNavigationMenuCompact__SidebarNavigationMenuCompactWrapper",componentId:"sc-c4a1d61c-0"})`
  background-color: ${a.COLORS.BACKGROUND_SITE};
  position: relative;
  height: 100%;
  z-index: ${d.LAYERS.STEP};
  padding-right: ${p.PAGE_FRAME_SPACING};
  padding-left: ${p.PAGE_FRAME_SPACING};
  padding-bottom: ${s.HEADER_HEIGHT};
  padding-top: ${s.HEADER_HEIGHT};

  ${l.MEDIA.DESKTOP} {
    display: none;
  }
`,$=(0,i.default)(A.Tabs).withConfig({displayName:"SidebarNavigationMenuCompact__MenuTabs",componentId:"sc-c4a1d61c-1"})`
  height: 100%;

  ${g.TabsListWrapper} {
    height: ${s.HEADER_HEIGHT};
    z-index: ${2*d.LAYERS.STEP};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding-left: ${p.PAGE_FRAME_SPACING};
    padding-right: ${p.PAGE_FRAME_SPACING};
    margin-bottom: 0;
    background-color: ${a.COLORS.BACKGROUND_SITE};
    border-top: ${c.BORDER_SIZES.DETAIL} solid ${a.COLORS.DETAIL_LOW_CONTRAST};
    border-bottom: 0;
    justify-content: center;

    &:before,
    &:after {
      display: none;
    }
  }

  ${g.TabsListScrollArea} {
    max-width: ${T};
    overflow: visible;
    padding-bottom: 0;

    &:before,
    &:after {
      display: none;
    }
  }

  ${u.TabsPanelWrapper} {
    position: relative;
    height: 100%;
    outline-offset: -${c.BORDER_SIZES.OUTLINE};
    overflow: hidden;

    &:before,
    &:after {
      position: absolute;
      z-index: ${d.LAYERS.STEP};
      left: -${p.PAGE_FRAME_SPACING};
      right: -${p.PAGE_FRAME_SPACING};
      content: '';
    }

    &:before {
      ${(0,O.createScrollBarShadowStyles)("top")};
      top: -${O.SCROLL_BAR_SHADOW_SIZE};
    }

    &:after {
      ${(0,O.createScrollBarShadowStyles)("bottom")};
      bottom: -${O.SCROLL_BAR_SHADOW_SIZE};
    }

    &:focus {
      z-index: ${d.LAYERS.HEADER};
    }
  }

  ${_.TabsButtonWrapper} {
    flex-grow: 1;
    justify-content: center;
    max-width: calc(${T} / 2);
  }
`,h=i.default.div.withConfig({displayName:"SidebarNavigationMenuCompact__ScrollArea",componentId:"sc-c4a1d61c-2"})`
  ${(0,O.createScrollBarStyles)("y")};
  padding-top: ${r.SPACINGS.TWO};
  padding-bottom: ${r.SPACINGS.FOUR};
  max-width: ${T};
  overflow: auto;
  scrollbar-gutter: stable both-edges;
  position: relative;
  max-height: 100%;
  margin-left: auto;
  margin-right: auto;
`,m=i.default.div.withConfig({displayName:"SidebarNavigationMenuCompact__VersionBadgeWrapper",componentId:"sc-c4a1d61c-3"})`
  display: flex;
  padding-top: ${r.SPACINGS.THREE};
  justify-content: center;
`;function N(){let e=(0,o.useAppSelector)(n.selectKeyNavigating);return(0,t.jsx)(b,{children:(0,t.jsxs)($,{$isKeyNavigating:e,children:[(0,t.jsx)(E.TabsItem,{tab:S.TABS_SIDEBAR_NAVIGATION.TABS.MAIN_MENU,children:(0,t.jsx)(h,{children:(0,t.jsxs)("ul",{children:[(0,t.jsx)(C.SidebarNavigationSubMenus,{}),(0,t.jsx)("li",{children:(0,t.jsx)(m,{children:(0,t.jsx)(I.VersionBadge,{})})})]})})}),(0,t.jsx)(E.TabsItem,{tab:S.TABS_SIDEBAR_NAVIGATION.TABS.ON_THIS_PAGE,children:(0,t.jsx)(h,{children:(0,t.jsx)(f.TableOfContents,{})})})]})})}e.s(["SidebarNavigationMenuCompact",()=>N])}]);