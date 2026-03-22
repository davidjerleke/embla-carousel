(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,617199,e=>{"use strict";var t=e.i(843476),i=e.i(271645);let o=(0,i.createContext)([]);function a(e){let{tableOfContents:i,children:a}=e;return(0,t.jsx)(o.Provider,{value:i,children:a})}function n(){return(0,i.useContext)(o)}e.s(["TableOfContentsProvider",()=>a,"useTableOfContentsContext",()=>n])},145360,e=>{"use strict";var t=e.i(843476),i=e.i(997053),o=e.i(109950),a=e.i(850056),n=e.i(271645),r=e.i(350437),d=e.i(801770),l=e.i(506390),s=e.i(671249),c=e.i(925866),S=e.i(764268),E=e.i(654938),p=e.i(728191),A=e.i(617199),g=e.i(202623);let T=i.default.div.withConfig({displayName:"TableOfContentsMenu__TableOfContentsMenuWrapper",componentId:"sc-eca85ec3-0"})`
  ${(0,E.createScrollBarStyles)("y")};
  overflow: auto;
  position: relative;
  max-height: 100%;

  ${l.MEDIA.DESKTOP} {
    padding-top: ${p.PAGE_FRAME_SPACING};
    padding-bottom: ${p.PAGE_FRAME_SPACING};
  }
`,f=i.default.div.withConfig({displayName:"TableOfContentsMenu__Heading",componentId:"sc-eca85ec3-1"})`
  color: ${r.COLORS.TEXT_BODY};
  padding-top: ${d.SPACINGS.ONE};
  padding-bottom: ${d.SPACINGS.ONE};
  font-weight: ${c.FONT_WEIGHTS.SEMI_BOLD};
  text-transform: uppercase;

  ${l.MEDIA.COMPACT} {
    padding-top: ${d.SPACINGS.TWO};
    border-bottom: ${s.BORDER_SIZES.DETAIL} solid ${r.COLORS.DETAIL_LOW_CONTRAST};
    margin-bottom: ${d.SPACINGS.TWO};
  }
`,_=i.default.ol.withConfig({displayName:"TableOfContentsMenu__TableOfContentsMenuItemsWrapper",componentId:"sc-eca85ec3-2"})`
  list-style: none;
`,m=(0,i.default)(S.LinkNavigation).withConfig({displayName:"TableOfContentsMenu__Link",componentId:"sc-eca85ec3-3"})`
  padding-top: ${d.SPACINGS.ONE};
  padding-bottom: ${d.SPACINGS.ONE};
  outline-offset: -${s.BORDER_SIZES.OUTLINE};

  ${({$level:e})=>e>0&&i.css`
      margin-left: ${d.SPACINGS.CUSTOM(()=>1.6*e)};

      > ${S.InactiveText} {
        color: ${r.COLORS.TEXT_LOW_CONTRAST};
      }
    `};
`;function I(){let[e,i]=(0,n.useState)(""),o=(0,A.useTableOfContentsContext)(),a=(0,n.useMemo)(()=>o.map(e=>e.id||"").filter(Boolean),[o]);return((0,n.useEffect)(()=>{let e=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&i(e.target.id)})},{rootMargin:"0% 0% -80% 0%"});return a.forEach(t=>{let i=document.getElementById(t);i&&e.observe(i)}),()=>{a.forEach(t=>{let i=document.getElementById(t);i&&e.unobserve(i)})}},[a]),(0,g.arrayHasItems)(o))?(0,t.jsxs)(T,{children:[(0,t.jsx)(f,{children:"On this page"}),(0,t.jsx)(_,{children:o.map(i=>(0,t.jsx)("li",{children:(0,t.jsx)(m,{slug:`#${i.id||""}`,isActive:e===i.id,$level:i.level,children:i.text})},i.id))})]}):null}var u=e.i(907827),h=e.i(784613);let C=i.default.nav.withConfig({displayName:"TableOfContents__TableOfContentsWrapper",componentId:"sc-9a3f5612-0"})`
  ${l.MEDIA.DESKTOP} {
    position: fixed;
    z-index: ${u.LAYERS.NAVIGATION};
    top: ${h.HEADER_HEIGHT};
    font-size: ${c.FONT_SIZES.COMPLEMENTARY};
    bottom: 0;
    width: inherit;
    max-width: inherit;
  }

  ${l.MEDIA.MIN_LG} {
    padding-left: ${d.SPACINGS.SEVEN};
  }
`,O=i.default.div.withConfig({displayName:"TableOfContents__MenuWrapper",componentId:"sc-9a3f5612-1"})`
  height: 100%;

  ${l.MEDIA.DESKTOP} {
    &:before,
    &:after {
      position: absolute;
      z-index: ${u.LAYERS.STEP};
      left: -${p.PAGE_FRAME_SPACING};
      right: -${p.PAGE_FRAME_SPACING};
      content: '';
    }

    &:before {
      ${(0,E.createScrollBarShadowStyles)("top")};
      top: -${E.SCROLL_BAR_SHADOW_SIZE};
    }

    &:after {
      ${(0,E.createScrollBarShadowStyles)("bottom")};
      bottom: -${E.SCROLL_BAR_SHADOW_SIZE};
    }
  }
`;function $(){let e=(0,o.useAppSelector)(a.selectKeyNavigating);return(0,t.jsx)(C,{"aria-label":"table of contents",children:(0,t.jsx)(O,{$isKeyNavigating:e,children:(0,t.jsx)(I,{})})})}e.s(["TableOfContents",()=>$],145360)},991527,e=>{"use strict";var t=e.i(843476),i=e.i(997053),o=e.i(109950),a=e.i(808758),n=e.i(850056),r=e.i(350437),d=e.i(801770),l=e.i(506390),s=e.i(784613),c=e.i(907827),S=e.i(671249),E=e.i(172539),p=e.i(728191),A=e.i(371728),g=e.i(233127),T=e.i(145360),f=e.i(354873),_=e.i(156877),m=e.i(852079),I=e.i(734568),u=e.i(237672),h=e.i(654938),C=e.i(25110);let O="36rem",$=d.SPACINGS.THREE,b=i.default.div.withConfig({displayName:"SidebarNavigationMenuCompact__SidebarNavigationMenuCompactWrapper",componentId:"sc-c4a1d61c-0"})`
  background-color: ${r.COLORS.BACKGROUND_SITE};
  position: relative;
  height: 100%;
  z-index: ${c.LAYERS.STEP};
  padding-right: ${p.PAGE_FRAME_SPACING};
  padding-left: ${p.PAGE_FRAME_SPACING};
  padding-bottom: ${s.HEADER_HEIGHT};
  padding-top: ${s.HEADER_HEIGHT};

  ${l.MEDIA.DESKTOP} {
    display: none;
  }
`,N=(0,i.default)(g.Tabs).withConfig({displayName:"SidebarNavigationMenuCompact__MenuTabs",componentId:"sc-c4a1d61c-1"})`
  height: 100%;

  ${f.TabsListWrapper} {
    height: ${s.HEADER_HEIGHT};
    z-index: ${2*c.LAYERS.STEP};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding-left: ${p.PAGE_FRAME_SPACING};
    padding-right: ${p.PAGE_FRAME_SPACING};
    margin-bottom: 0;
    background-color: ${r.COLORS.BACKGROUND_SITE};
    border-top: ${S.BORDER_SIZES.DETAIL} solid ${r.COLORS.DETAIL_LOW_CONTRAST};
    border-bottom: 0;
    justify-content: center;

    &:before,
    &:after {
      display: none;
    }
  }

  ${f.TabsListScrollArea} {
    max-width: ${O};
    overflow: visible;
    padding-bottom: 0;

    &:before,
    &:after {
      display: none;
    }
  }

  ${I.TabsPanelWrapper} {
    position: relative;
    height: calc(100% - ${$} * 2 - ${"2.7rem"});
    outline-offset: -${S.BORDER_SIZES.OUTLINE};
    overflow: hidden;

    &:before,
    &:after {
      position: absolute;
      z-index: ${c.LAYERS.STEP};
      left: -${p.PAGE_FRAME_SPACING};
      right: -${p.PAGE_FRAME_SPACING};
      content: '';
    }

    &:before {
      ${(0,h.createScrollBarShadowStyles)("top")};
      top: -${h.SCROLL_BAR_SHADOW_SIZE};
      z-index: ${c.LAYERS.STEP};
    }

    &:after {
      ${(0,h.createScrollBarShadowStyles)("bottom")};
      bottom: -${h.SCROLL_BAR_SHADOW_SIZE};
      z-index: ${c.LAYERS.STEP};
    }

    &:focus {
      z-index: ${c.LAYERS.HEADER};
    }
  }

  ${m.TabsButtonWrapper} {
    flex-grow: 1;
    justify-content: center;
    max-width: calc(${O} / 2);
  }
`,R=i.default.div.withConfig({displayName:"SidebarNavigationMenuCompact__ScrollArea",componentId:"sc-c4a1d61c-2"})`
  ${(0,h.createScrollBarStyles)("y")};
  padding-bottom: ${d.SPACINGS.FOUR};
  max-width: ${O};
  overflow: auto;
  scrollbar-gutter: stable both-edges;
  position: relative;
  max-height: 100%;
  margin-left: auto;
  margin-right: auto;
`,M=i.default.ul.withConfig({displayName:"SidebarNavigationMenuCompact__MenuItemList",componentId:"sc-c4a1d61c-3"})`
  > li:first-child {
    position: relative;

    &:before {
      content: '';
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
      right: 0;
      height: ${S.BORDER_SIZES.DETAIL};
      background-color: ${r.COLORS.DETAIL_MEDIUM_CONTRAST};
      z-index: ${c.LAYERS.STEP};
    }
  }
`,P=i.default.div.withConfig({displayName:"SidebarNavigationMenuCompact__VersionBadgeWrapper",componentId:"sc-c4a1d61c-4"})`
  display: flex;
  padding-top: ${d.SPACINGS.THREE};
  padding-bottom: ${d.SPACINGS.THREE};
  justify-content: center;
`,v=(0,i.default)(C.ThemeToggle).withConfig({displayName:"SidebarNavigationMenuCompact__ThemeToggleButton",componentId:"sc-c4a1d61c-5"})`
  background-color: ${r.COLORS.BACKGROUND_CODE};
  width: 100%;
  justify-content: space-between;
  padding: 1.8rem 2rem;
  margin-top: ${d.SPACINGS.FOUR};
  height: auto;
  margin-right: 0;
  margin-left: 0;
  border-radius: ${S.BORDER_RADIUSES.CARD};
  overflow: hidden;

  ${C.LightThemeSvg}, ${C.DarkThemeSvg} {
    left: auto;
    right: 2rem;
    transform: translateY(-50%);
  }
`,x=i.default.span.withConfig({displayName:"SidebarNavigationMenuCompact__ThemeToggleText",componentId:"sc-c4a1d61c-6"})`
  color: ${r.COLORS.TEXT_MEDIUM_CONTRAST};
`;function G(){let e=(0,o.useAppSelector)(n.selectKeyNavigating),i=(0,o.useAppSelector)(a.selectTheme)===r.THEME_KEYS.LIGHT?r.THEME_KEYS.DARK:r.THEME_KEYS.LIGHT;return(0,t.jsxs)(b,{children:[(0,t.jsx)(P,{children:(0,t.jsx)(_.VersionBadge,{})}),(0,t.jsxs)(N,{$isKeyNavigating:e,children:[(0,t.jsx)(A.TabsItem,{tab:E.TABS_SIDEBAR_NAVIGATION.TABS.MAIN_MENU,children:(0,t.jsx)(R,{children:(0,t.jsxs)(M,{children:[(0,t.jsx)(u.SidebarNavigationSubMenus,{}),(0,t.jsx)("li",{children:(0,t.jsx)(v,{children:(0,t.jsxs)(x,{children:["Activate ",i," theme"]})})})]})})}),(0,t.jsx)(A.TabsItem,{tab:E.TABS_SIDEBAR_NAVIGATION.TABS.ON_THIS_PAGE,children:(0,t.jsx)(R,{children:(0,t.jsx)(T.TableOfContents,{})})})]})]})}e.s(["SidebarNavigationMenuCompact",()=>G])}]);