(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,730475,i=>{"use strict";var e=i.i(843476),t=i.i(997053),a=i.i(109950),o=i.i(808758),n=i.i(350437),l=i.i(801770),r=i.i(506390),d=i.i(784613),g=i.i(907827),c=i.i(671249),s=i.i(728191),m=i.i(713489),p=i.i(764268),h=i.i(654938),S=i.i(25110);let u=l.SPACINGS.ONE,E=t.default.div.withConfig({displayName:"SiteNavigationMenuCompact__SidebarNavigationMenuCompactWrapper",componentId:"sc-53a8716-0"})`
  background-color: ${n.COLORS.BACKGROUND_SITE};
  position: relative;
  height: 100%;
  z-index: ${g.LAYERS.STEP};
  padding-right: ${s.PAGE_FRAME_SPACING};
  padding-left: ${s.PAGE_FRAME_SPACING};
  padding-bottom: ${d.HEADER_HEIGHT};
  padding-top: ${d.HEADER_HEIGHT};

  ${r.MEDIA.DESKTOP} {
    display: none;
  }
`,T=t.default.div.withConfig({displayName:"SiteNavigationMenuCompact__ScrollArea",componentId:"sc-53a8716-1"})`
  ${(0,h.createScrollBarStyles)("y")};
  padding-top: ${l.SPACINGS.TWO};
  padding-bottom: ${l.SPACINGS.FOUR};
  max-width: ${"36rem"};
  overflow: auto;
  scrollbar-gutter: stable both-edges;
  position: relative;
  max-height: 100%;
  margin-left: auto;
  margin-right: auto;
`,C=(0,t.default)(p.LinkNavigation).withConfig({displayName:"SiteNavigationMenuCompact__Link",componentId:"sc-53a8716-2"})`
  margin: 0 0;
  text-align: left;
  padding: ${u} 0;
`,A=(0,t.default)(S.ThemeToggle).withConfig({displayName:"SiteNavigationMenuCompact__ThemeToggleButton",componentId:"sc-53a8716-3"})`
  background-color: ${n.COLORS.BACKGROUND_CODE};
  width: 100%;
  justify-content: space-between;
  padding: 1.8rem 2rem;
  margin-top: ${l.SPACINGS.FOUR};
  height: auto;
  margin-right: 0;
  margin-left: 0;
  border-radius: ${c.BORDER_RADIUSES.BOX};
  overflow: hidden;

  ${S.LightThemeSvg}, ${S.DarkThemeSvg} {
    left: auto;
    right: 2rem;
    transform: translateY(-50%);
  }
`,N=t.default.span.withConfig({displayName:"SiteNavigationMenuCompact__ThemeToggleText",componentId:"sc-53a8716-4"})`
  color: ${n.COLORS.TEXT_MEDIUM_CONTRAST};
`;function _(){let{flatRoutes:i}=(0,m.useSiteNavigationContext)(),t=(0,a.useAppSelector)(o.selectTheme)===n.THEME_KEYS.LIGHT?n.THEME_KEYS.DARK:n.THEME_KEYS.LIGHT;return(0,e.jsx)(E,{children:(0,e.jsx)(T,{children:(0,e.jsxs)("ul",{children:[i.map(i=>(0,e.jsx)("li",{children:(0,e.jsx)(C,{slug:i.slug,children:i.title})},i.slug)),(0,e.jsx)("li",{children:(0,e.jsx)(A,{children:(0,e.jsxs)(N,{children:["Activate ",t," theme"]})})})]})})})}i.s(["SiteNavigationMenuCompact",()=>_])}]);