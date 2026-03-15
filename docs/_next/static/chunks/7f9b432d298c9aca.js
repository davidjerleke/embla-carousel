(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,893060,e=>{"use strict";e.i(843476),e.s(["CODE_HIGHLIGHT_CLASS_NAME",0,"code-highlight"])},668347,e=>{"use strict";var t=e.i(843476),r=e.i(271645),n=e.i(997053),i=e.i(109950),o=e.i(850056),a=e.i(224583),l=e.i(350437),s=e.i(925866),c=e.i(907827),u=e.i(801770),d=e.i(671249),f=e.i(506390),p=e.i(728191),S=e.i(266349),h=e.i(772798),A=e.i(654938);let m=d.BORDER_RADIUSES.BOX,b=u.SPACINGS.CUSTOM(({ONE:e})=>e+.2),g=u.SPACINGS.FOUR,_=n.default.div.withConfig({displayName:"PrismSyntaxFrame__PrismSyntaxFrameWrapper",componentId:"sc-f238798-0"})`
  position: relative;
  overflow: hidden;
  font-size: ${s.FONT_SIZES.CUSTOM(({COMPLEMENTARY:e})=>e-.04)};
  background-color: ${l.COLORS.BACKGROUND_CODE};

  ${f.MEDIA.MIN_XS} {
    border-radius: ${m};
    border: ${d.BORDER_SIZES.DETAIL} solid ${l.COLORS.DETAIL_LOW_CONTRAST};
  }
  ${f.MEDIA.MAX_XS} {
    border-top: ${d.BORDER_SIZES.DETAIL} solid ${l.COLORS.DETAIL_LOW_CONTRAST};
    border-bottom: ${d.BORDER_SIZES.DETAIL} solid ${l.COLORS.DETAIL_LOW_CONTRAST};
  }

  &:before,
  &:after {
    z-index: ${c.LAYERS.STEP};
    width: ${p.PAGE_FRAME_SPACING};
    display: block;
    position: absolute;
    content: '';
    top: 0;
    bottom: 0;
  }
  &:before {
    ${(0,A.createScrollBarShadowStyles)("left",l.COLORS.BACKGROUND_CODE)};
    left: -${A.SCROLL_BAR_SHADOW_SIZE};
  }
  &:after {
    ${(0,A.createScrollBarShadowStyles)("right",l.COLORS.BACKGROUND_CODE)};
    right: -${A.SCROLL_BAR_SHADOW_SIZE};
  }
`,T=n.default.div.withConfig({displayName:"PrismSyntaxFrame__CopyCode",componentId:"sc-f238798-1"})`
  display: flex;
  justify-content: flex-end;
  height: 0;
`,E=(0,n.default)(a.ButtonBare).withConfig({displayName:"PrismSyntaxFrame__CopyCodeButton",componentId:"sc-f238798-2"})`
  position: relative;
  z-index: ${2*c.LAYERS.STEP};
  margin-right: calc(${p.PAGE_FRAME_SPACING} - ${b});
  color: ${l.COLORS.TEXT_LOW_CONTRAST};
  padding: 0 ${b};
  height: ${g};
  line-height: ${g};
  font-size: ${s.FONT_SIZES.DETAIL};
  align-items: center;

  &:before {
    content: '';
    visibility: hidden;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: ${m};
    ${S.BRAND_GRADIENT_BACKGROUND_STYLES};
  }

  &:hover {
    color: ${l.COLORS.BACKGROUND_SITE};
    &:before {
      visibility: visible;
    }
  }

  @media (hover: none), (hover: on-demand) {
    &:hover {
      color: ${l.COLORS.TEXT_LOW_CONTRAST};
      &:before {
        display: none;
      }
    }
  }
`,I=n.default.span.withConfig({displayName:"PrismSyntaxFrame__ButtonStatus",componentId:"sc-f238798-3"})`
  ${h.visuallyHiddenStyles};
`,v=n.default.span.withConfig({displayName:"PrismSyntaxFrame__ButtonText",componentId:"sc-f238798-4"})`
  position: relative;
  z-index: ${c.LAYERS.STEP};
`;function R(e){let{children:n,code:a}=e,l=(0,i.useAppSelector)(o.selectKeyNavigating),[s,c]=(0,r.useState)(!1),u=(0,r.useRef)(0),d=(0,r.useCallback)(()=>{let e;(e=document.createElement("textarea")).value=a,e.setAttribute("readonly",""),e.style.position="absolute",e.style.left="-9999px",document.body.appendChild(e),e.select(),document.execCommand("copy"),document.body.removeChild(e),c(!0),u.current=window.setTimeout(()=>c(!1),3e3)},[a,c]);return(0,r.useEffect)(()=>()=>{window.clearTimeout(u.current)},[]),(0,t.jsxs)(_,{$isKeyNavigating:l,children:[(0,t.jsx)(T,{children:(0,t.jsxs)(E,{"aria-label":"Copy code snippet to clipboard",onClick:d,disabled:s,type:"button",children:[(0,t.jsx)(I,{"aria-roledescription":"status",children:s?"Code snipped copied to clipboard":"Copy code snippet to clipboard"}),(0,t.jsx)(v,{children:s?"Copied":"Copy"})]})}),n]})}e.s(["PRISM_FRAME_RADIUS",0,m,"PrismSyntaxFrame",()=>R],668347)},372729,e=>{"use strict";let t="prism-highlight",r=`${t}-code-language`,n=`${t}-code-line`,i=/\d{1,}-\d{1,}/,o=/-\d{1,}/,a=/\d{1,}-/;function l(e=""){return e.replace(/{|}/g,"").split(",").reduce((e,t)=>{if(i.test(t)){let r=parseInt(t.replace(o,""),10),n=parseInt(t.replace(a,""),10);for(let t=r;t<=n;t+=1)e.push(t)}else/\d{1,}/.test(t)&&e.push(parseInt(t,10));return e},[])}function s(e){return["/** @jsxImportSource solid-js */","// @ts-nocheck"].reduce((e,t)=>{let r=t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),n=RegExp(`^.*${r}.*(?:\\r?\\n)?`,"gm");return e.replace(n,"")},e).trim()}e.s(["PRISM_HIGHLIGHT_CLASS_NAME",0,t,"PRISM_HIGHLIGHT_CODE_LANGUAGE_CLASS_NAME",0,r,"PRISM_HIGHLIGHT_LINE_CLASS_NAME",0,n,"parseHighlightedLines",()=>l,"removeUnwantedStrings",()=>s])},294801,e=>{"use strict";var t=e.i(843476),r=e.i(997053),n=e.i(109950),i=e.i(808758),o=e.i(350437),a=e.i(801770),l=e.i(671249),s=e.i(923035);let c={note:{color:o.COLORS.ADMONITION_NOTE,colorRgbValue:o.COLORS.ADMONITION_NOTE_RGB_VALUE,icon:"info"},warning:{color:o.COLORS.ADMONITION_WARNING,colorRgbValue:o.COLORS.ADMONITION_WARNING_RGB_VALUE,icon:"warning"},danger:{color:o.COLORS.ADMONITION_DANGER,colorRgbValue:o.COLORS.ADMONITION_DANGER_RGB_VALUE,icon:"danger"}},u=r.default.div.withConfig({displayName:"Admonition__AdmonitionWrapper",componentId:"sc-135632d6-0"})`
  display: flex;
  padding: ${a.SPACINGS.TWO};
  border-top-right-radius: ${l.BORDER_RADIUSES.BOX};
  border-bottom-right-radius: ${l.BORDER_RADIUSES.BOX};
  position: relative;

  ${({$admonition:e,$opacity:t})=>r.css`
    border-left: ${l.BORDER_SIZES.ACCENT_VERTICAL} solid ${e.color};
    background-color: rgba(${e.colorRgbValue}, ${t});
  `};

  ${s.IconWithTextIcon} {
    color: ${({$color:e})=>e};
  }
`,d=r.default.div.withConfig({displayName:"Admonition__AdmonitionContent",componentId:"sc-135632d6-1"})`
  padding-left: ${a.SPACINGS.TWO};
  flex: 1;
  min-width: 0;
`;function f(e){let{children:r,type:l="note"}=e,d=c[l],f=(0,n.useAppSelector)(i.selectTheme)===o.THEME_KEYS.LIGHT?.07:.1;return(0,t.jsx)(u,{$admonition:d,$opacity:f,$color:d.color,children:(0,t.jsx)(s.IconWithText,{iconSvg:d.icon,iconSize:a.SPACINGS.THREE,spacing:a.SPACINGS.TWO,children:r})})}e.s(["Admonition",()=>f,"AdmonitionContent",0,d,"AdmonitionWrapper",0,u])},892708,(e,t,r)=>{t.exports=function(e,t){for(var r=-1,n=null==e?0:e.length,i=Array(n);++r<n;)i[r]=t(e[r],r,e);return i}},45350,(e,t,r)=>{t.exports=Array.isArray},372537,(e,t,r)=>{var n=e.r(630353),i=e.r(892708),o=e.r(45350),a=e.r(361884),l=1/0,s=n?n.prototype:void 0,c=s?s.toString:void 0;t.exports=function e(t){if("string"==typeof t)return t;if(o(t))return i(t,e)+"";if(a(t))return c?c.call(t):"";var r=t+"";return"0"==r&&1/t==-l?"-0":r}},702922,(e,t,r)=>{var n=e.r(372537);t.exports=function(e){return null==e?"":n(e)}},385658,(e,t,r)=>{var n=e.r(702922),i=0;t.exports=function(e){var t=++i;return n(e)+t}},233127,734568,852079,354873,e=>{"use strict";var t=e.i(843476),r=e.i(271645),n=e.i(109950),i=e.i(850056);let o=(0,e.i(930877).isBrowser)()?r.useLayoutEffect:r.useEffect;var a=e.i(897364),l=e.i(385658),s=e.i(997053),c=e.i(946078);let u=s.default.section.withConfig({displayName:"TabsPanel__TabsPanelWrapper",componentId:"sc-24ec9263-0"})`
  ${c.KEY_NAVIGATING_STYLES};
`;function d(e){let{tab:o,activeTab:a,groupId:l,setActiveTab:s}=e,c=(0,n.useAppSelector)(i.selectKeyNavigating),d=o.value!==a.value,f=(0,r.useCallback)(()=>{s(o)},[s,o]);return(0,t.jsx)(u,{role:"tabpanel",id:`panel-id-${o.value}-${l}`,tabIndex:0,"aria-labelledby":`tab-id-${o.value}-${l}`,hidden:d,$isKeyNavigating:c,onClick:f,children:o.children})}e.s(["TabsPanel",()=>d,"TabsPanelWrapper",0,u],734568);var f=e.i(266349),p=e.i(801770),S=e.i(224583),h=e.i(350437),A=e.i(671249),m=e.i(907827),b=e.i(925866),g=e.i(764268);let _=(0,s.default)(S.ButtonBare).withConfig({displayName:"TabsButton__TabsButtonWrapper",componentId:"sc-994f2e2-0"})`
  padding: ${p.SPACINGS.TWO} ${p.SPACINGS.TWO};
  font-size: ${b.FONT_SIZES.COMPLEMENTARY};
  position: relative;
  display: inline-flex;
  align-items: center;
  position: relative;

  &:disabled > ${S.ButtonBareText} > ${g.InactiveText} {
    color: ${h.COLORS.DETAIL_HIGH_CONTRAST};
  }

  ${({$selected:e})=>e&&s.css`
      &:after {
        ${f.BRAND_GRADIENT_BACKGROUND_STYLES};
        z-index: ${m.LAYERS.STEP};
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: ${A.BORDER_SIZES.ACCENT_HORIZONTAL};
        pointer-events: none;
      }
    `};
`,T=r.default.forwardRef(function(e,n){let{tab:i,activeTab:o,groupId:a,setActiveTab:l,...s}=e,c=i.value===o.value,u=(0,r.useCallback)(e=>{l(i,e.currentTarget)},[l]);return(0,t.jsxs)(_,{role:"tab",id:`tab-id-${i.value}-${a}`,tabIndex:c?0:-1,"aria-controls":`panel-id-${i.value}-${a}`,"aria-selected":c,$selected:c,disabled:i.disabled,onClick:u,ref:n,...s,children:[(0,t.jsx)(g.InactiveText,{$isActive:c,children:i.label}),(0,t.jsx)(g.ActiveText,{$isActive:c,"aria-hidden":"true",children:i.label})]})});e.s(["TabsButton",0,T,"TabsButtonWrapper",0,_],852079);var E=e.i(728191),I=e.i(654938);let v=s.default.div.withConfig({displayName:"TabsList__TabsListWrapper",componentId:"sc-35f9540d-0"})`
  display: flex;
  position: relative;
  margin-bottom: calc(${p.SPACINGS.FOUR} - ${I.SCROLLBAR_SIZE});
  overflow: hidden;

  &:after {
    position: absolute;
    content: '';
    height: ${A.BORDER_SIZES.DETAIL};
    background-color: ${h.COLORS.DETAIL_LOW_CONTRAST};
    width: 100%;
    display: block;
    bottom: calc(${I.SCROLLBAR_SIZE} - ${A.BORDER_SIZES.DETAIL});
    z-index: ${m.LAYERS.STEP};

    @media (hover: none), (hover: on-demand) {
      bottom: ${I.SCROLLBAR_SIZE};
    }
  }
`,R=s.default.div.withConfig({displayName:"TabsList__TabsListScrollArea",componentId:"sc-35f9540d-1"})`
  ${(0,I.createScrollBarStyles)("x")};

  display: flex;
  width: 100%;
  overflow-x: scroll;

  @media (hover: none), (hover: on-demand) {
    overflow-x: auto;
    padding-bottom: ${I.SCROLLBAR_SIZE};
  }

  &:before,
  &:after {
    z-index: ${m.LAYERS.STEP};
    width: ${E.PAGE_FRAME_SPACING};
    display: block;
    position: absolute;
    content: '';
    top: 0;
    bottom: 0;
  }
  &:before {
    ${(0,I.createScrollBarShadowStyles)("left")};
    left: -4rem;
  }
  &:after {
    ${(0,I.createScrollBarShadowStyles)("right")};
    right: -4rem;
  }
`;function O(e){let{children:r,...o}=e,a=(0,n.useAppSelector)(i.selectKeyNavigating);return(0,t.jsx)(v,{...o,children:(0,t.jsx)(R,{$isKeyNavigating:a,children:r})})}e.s(["TabsList",()=>O,"TabsListScrollArea",0,R,"TabsListWrapper",0,v],354873);var y=e.i(172539);function L(e){return e?{offsetTop:e.offsetTop,rectTop:e.getBoundingClientRect().top}:{offsetTop:0,rectTop:0}}let C=s.default.div.withConfig({displayName:"Tabs__TabsWrapper",componentId:"sc-80591a53-0"})``;function N(e){let{groupId:s="",children:c,...u}=e,f=(0,n.useAppDispatch)(),p=(0,n.useAppSelector)(a.selectTabSelections)[s],S=(0,r.useMemo)(()=>(0,y.mapChildrenToTabs)(c),[c]),h=(0,r.useMemo)(()=>S.filter(e=>!e.disabled),[S]),[A,m]=(0,r.useState)((0,y.getDefaultTab)(h,p)),b=(0,r.useRef)(null),g=(0,r.useRef)(h.map(()=>r.default.createRef())),_=(0,r.useRef)((0,l.default)()),E=(0,r.useRef)(null),I=(0,r.useRef)(A.index),v=(0,r.useRef)(L(E.current)),R=(0,r.useCallback)(e=>{let t=h[e],r=g.current[e].current;t&&r&&(b.current=r,m(t),f((0,i.setIsKeyNavigating)(!0)),r.focus())},[h,f]),N=(0,r.useCallback)(e=>{let t=h.length,r=I.current,n={ArrowRight:()=>{R((r+1)%t)},ArrowLeft:()=>{R((r-1+t)%t)},Home:()=>{R(0)},End:()=>{R(t-1)}}[e.key];n&&(e.preventDefault(),n())},[h,R]),$=(0,r.useCallback)((e,t)=>{b.current=t,m(e)},[]);return o(()=>{I.current=A.index,s&&(v.current=L(E.current),f((0,a.setTabSelection)({key:s,value:A.value})),queueMicrotask(()=>{var e,t;let r,n;if(!b.current)return;b.current=null;let i=(e=L(E.current),t=v.current,r=e.offsetTop-t.offsetTop,Math.abs(r-(n=e.rectTop-t.rectTop))>1?n:r);i&&window.scrollBy({top:i}),v.current=L(E.current)}))},[h,A]),o(()=>{if(!s)return;let e=h.find(e=>e.value===p);e&&e.value!==h[I.current].value&&m(e)},[h,p]),(0,t.jsxs)(C,{ref:E,...u,children:[(0,t.jsx)(O,{role:"tablist","aria-orientation":"horizontal",children:S.map(e=>(0,t.jsx)(T,{groupId:_.current,tab:e,ref:g.current[e.index],activeTab:A,setActiveTab:$,onKeyDown:N},`${e.value}-${_.current}`))}),h.map(e=>(0,t.jsx)(d,{groupId:_.current,tab:e,activeTab:A,setActiveTab:m},`${e.value}-${_.current}`))]})}e.s(["Tabs",()=>N,"TabsWrapper",0,C],233127)},169075,e=>{"use strict";let t=e.i(801770).SPACINGS.CUSTOM(({ONE:e})=>e/2);function r(e,t){return t===e}function n(e,t){return t.substring(0,e.length)===e}function i(e,t){return e.order-t.order}e.s(["ROUTES_LOADING_BAR_HEIGHT",0,t,"addRouteChildren",()=>function e(t,r){if(!t)return t;let o={...t};return o.children=r.filter(({slug:e})=>n(o.slug,e)).filter(({level:e})=>e-1===o.level).sort(i),o.children.forEach(t=>e(t,r)),o},"isRouteActive",()=>r,"isRoutePartiallyActive",()=>n])},713489,e=>{"use strict";var t=e.i(843476),r=e.i(271645);let n=(0,r.createContext)({flatRoutes:[],homeRoute:{title:"",description:"",level:0,order:0,children:[],slug:"/"}});function i(e){let{routes:r,children:i}=e;return(0,t.jsx)(n.Provider,{value:r,children:i})}function o(){return(0,r.useContext)(n)}e.s(["SiteNavigationProvider",()=>i,"useSiteNavigationContext",()=>o])},955596,e=>{"use strict";var t=e.i(271645),r=e.i(618566),n=e.i(169075),i=e.i(475086),o=e.i(713489);function a(e){let i=(0,r.usePathname)();return(0,t.useMemo)(()=>({isActive:(0,n.isRouteActive)(e,i),isPartiallyActive:(0,n.isRoutePartiallyActive)(e,i)}),[e,i])}function l(){let e=(0,r.usePathname)(),t=(0,o.useSiteNavigationContext)(),a=(0,i.useSidebarNavigationContext)(),l=[t.homeRoute,...a.flatRoutes],s=l.find(t=>t.slug===e);return l.filter(e=>(0,n.isRoutePartiallyActive)(e.slug,s?.slug||"")).sort((e,t)=>e.level-t.level)}function s(e){let t=(0,r.usePathname)();return e.filter(e=>(0,n.isRouteActive)(e.slug,t))[0]}function c(e,t){let r=(0,n.addRouteChildren)(t,e);return r?.children||[]}e.s(["useRouteActive",()=>a,"useRouteBreadcrumbs",()=>l,"useRouteChildren",()=>c,"useRouteCurrent",()=>s])},764268,e=>{"use strict";var t=e.i(843476),r=e.i(997053),n=e.i(955596),i=e.i(615632),o=e.i(266349),a=e.i(925866),l=e.i(350437),s=e.i(989023),c=e.i(331588);let u=(0,r.default)(i.LinkBare).withConfig({displayName:"LinkNavigation__LinkNavigationWrapper",componentId:"sc-8d505702-0"})`
  position: relative;
  display: inline-flex;
  align-items: center;
`,d=r.default.span.withConfig({displayName:"LinkNavigation__InactiveText",componentId:"sc-8d505702-1"})`
  color: ${l.COLORS.TEXT_LOW_CONTRAST};
  opacity: ${({$isActive:e})=>+!e};
  transform: translateY(-50%);
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
`,f=r.default.span.withConfig({displayName:"LinkNavigation__ActiveText",componentId:"sc-8d505702-2"})`
  opacity: ${({$isActive:e})=>+!!e};
  font-weight: ${a.FONT_WEIGHTS.MEDIUM};
  ${o.BRAND_GRADIENT_TEXT_STYLES};
`,p=(0,r.default)(s.Icon).withConfig({displayName:"LinkNavigation__ExternalLinkIcon",componentId:"sc-8d505702-3"})`
  position: absolute;
  top: 0.2rem;
  left: calc(100% + 0.2rem);
`;function S(e){let{slug:r,isActive:i,children:o,...a}=e,{isPartiallyActive:s}=(0,n.useRouteActive)(r),S=i??s;return(0,t.jsxs)(u,{href:r,...a,children:[(0,t.jsx)(d,{$isActive:S,children:(0,t.jsxs)(t.Fragment,{children:[o,!(0,c.isInternalLink)(r)&&(0,t.jsx)(p,{svg:"externalLink",size:"0.8rem",color:l.COLORS.DETAIL_HIGH_CONTRAST})]})}),(0,t.jsx)(f,{$isActive:S,"aria-hidden":"true",children:o})]})}e.s(["ActiveText",0,f,"InactiveText",0,d,"LinkNavigation",()=>S])},654938,e=>{"use strict";var t=e.i(997053),r=e.i(671249),n=e.i(350437);let i=e.i(801770).SPACINGS.ONE,o="1.2rem",a="1.6rem",l=`${2*parseFloat(a)}rem`,s={left:`${o} 0 ${a}`,right:`-${o} 0 ${a}`,top:`0 ${o} ${a}`,bottom:`0 -${o} ${a}`};function c(e){let o="x"===e?"height":"width";return t.css`
    ::-webkit-scrollbar-thumb {
      background-color: transparent;
      border-radius: ${r.BORDER_RADIUSES.BOX};
    }
    ::-webkit-scrollbar-track {
      background-color: transparent;
    }
    ::-webkit-scrollbar {
      ${o}: ${i};
    }

    &:hover {
      ::-webkit-scrollbar-thumb {
        background-color: ${n.COLORS.DETAIL_MEDIUM_CONTRAST};
      }
    }

    @media (hover: none), (hover: on-demand) {
      &:hover {
        ::-webkit-scrollbar-thumb {
          background-color: transparent;
        }
      }

      ::-webkit-scrollbar {
        ${o}: 0;
      }
    }
  `}function u(e,r=n.COLORS.BACKGROUND_SITE){return t.css`
    ${"left"===e||"right"===e?"width":"height"}: ${l};
    box-shadow: ${s[e]} ${r};
    pointer-events: none;

    ${({$isKeyNavigating:e})=>e&&t.css`
        opacity: 0;
      `};
  `}e.s(["SCROLLBAR_SIZE",0,i,"SCROLL_BAR_SHADOW_SIZE",0,l,"createScrollBarShadowStyles",()=>u,"createScrollBarStyles",()=>c])},506390,e=>{"use strict";let t={DEFAULT:0,XXS:350,XS:576,SM:750,MD:992,LG:1200},r=t.MD,n={COMPACT:i(r,"max"),DESKTOP:i(r,"min"),MIN_XXS:i(t.XXS,"min"),MIN_XS:i(t.XS,"min"),MIN_SM:i(t.SM,"min"),MIN_MD:i(t.MD,"min"),MIN_LG:i(t.LG,"min"),MAX_XXS:i(t.XXS,"max"),MAX_XS:i(t.XS,"max"),MAX_SM:i(t.SM,"max"),MAX_MD:i(t.MD,"max"),MAX_LG:i(t.LG,"max")};function i(e,t="min",r="width"){return`@media (${t}-${r}: ${"max"===t?e-1:e}px)`}e.s(["BREAKPOINTS",0,t,"MEDIA",0,n])},233525,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"warnOnce",{enumerable:!0,get:function(){return n}});let n=e=>{}},618566,(e,t,r)=>{t.exports=e.r(976562)},228678,e=>{"use strict";let t=(0,e.i(164645).createSlice)({name:"modal",initialState:{openModal:null},reducers:{setModalOpen:(e,t)=>{e.openModal=t.payload},setModalClosed:e=>{e.openModal=null}}}),{name:r,reducer:n}=t,{setModalOpen:i,setModalClosed:o}=t.actions;function a(e){return t=>t.modal.openModal===e}e.s(["modalName",()=>r,"modalReducer",()=>n,"selectIsModalOpen",()=>a,"setModalClosed",0,o,"setModalOpen",0,i])},646107,e=>{"use strict";let t=(0,e.i(164645).createSlice)({name:"routes",initialState:{isLoading:!1},reducers:{setRoutesLoading:(e,t)=>{e.isLoading=t.payload}}}),{name:r,reducer:n}=t,{setRoutesLoading:i}=t.actions;function o(e){return e.routes.isLoading}e.s(["routesName",()=>r,"routesReducer",()=>n,"selectRoutesLoading",()=>o,"setRoutesLoading",0,i])},998183,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={assign:function(){return s},searchParamsToUrlQuery:function(){return o},urlQueryToSearchParams:function(){return l}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});function o(e){let t={};for(let[r,n]of e.entries()){let e=t[r];void 0===e?t[r]=n:Array.isArray(e)?e.push(n):t[r]=[e,n]}return t}function a(e){return"string"==typeof e?e:("number"!=typeof e||isNaN(e))&&"boolean"!=typeof e?"":String(e)}function l(e){let t=new URLSearchParams;for(let[r,n]of Object.entries(e))if(Array.isArray(n))for(let e of n)t.append(r,a(e));else t.set(r,a(n));return t}function s(e,...t){for(let r of t){for(let t of r.keys())e.delete(t);for(let[t,n]of r.entries())e.append(t,n)}return e}},195057,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={formatUrl:function(){return l},formatWithValidation:function(){return c},urlObjectKeys:function(){return s}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});let o=e.r(190809)._(e.r(998183)),a=/https?|ftp|gopher|file/;function l(e){let{auth:t,hostname:r}=e,n=e.protocol||"",i=e.pathname||"",l=e.hash||"",s=e.query||"",c=!1;t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?c=t+e.host:r&&(c=t+(~r.indexOf(":")?`[${r}]`:r),e.port&&(c+=":"+e.port)),s&&"object"==typeof s&&(s=String(o.urlQueryToSearchParams(s)));let u=e.search||s&&`?${s}`||"";return n&&!n.endsWith(":")&&(n+=":"),e.slashes||(!n||a.test(n))&&!1!==c?(c="//"+(c||""),i&&"/"!==i[0]&&(i="/"+i)):c||(c=""),l&&"#"!==l[0]&&(l="#"+l),u&&"?"!==u[0]&&(u="?"+u),i=i.replace(/[?#]/g,encodeURIComponent),u=u.replace("#","%23"),`${n}${c}${i}${u}${l}`}let s=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"];function c(e){return l(e)}},818581,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useMergedRef",{enumerable:!0,get:function(){return i}});let n=e.r(271645);function i(e,t){let r=(0,n.useRef)(null),i=(0,n.useRef)(null);return(0,n.useCallback)(n=>{if(null===n){let e=r.current;e&&(r.current=null,e());let t=i.current;t&&(i.current=null,t())}else e&&(r.current=o(e,n)),t&&(i.current=o(t,n))},[e,t])}function o(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},718967,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={DecodeError:function(){return m},MiddlewareNotFoundError:function(){return T},MissingStaticPage:function(){return _},NormalizeError:function(){return b},PageNotFoundError:function(){return g},SP:function(){return h},ST:function(){return A},WEB_VITALS:function(){return o},execOnce:function(){return a},getDisplayName:function(){return d},getLocationOrigin:function(){return c},getURL:function(){return u},isAbsoluteUrl:function(){return s},isResSent:function(){return f},loadGetInitialProps:function(){return S},normalizeRepeatedSlashes:function(){return p},stringifyError:function(){return E}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});let o=["CLS","FCP","FID","INP","LCP","TTFB"];function a(e){let t,r=!1;return(...n)=>(r||(r=!0,t=e(...n)),t)}let l=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,s=e=>l.test(e);function c(){let{protocol:e,hostname:t,port:r}=window.location;return`${e}//${t}${r?":"+r:""}`}function u(){let{href:e}=window.location,t=c();return e.substring(t.length)}function d(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function f(e){return e.finished||e.headersSent}function p(e){let t=e.split("?");return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?`?${t.slice(1).join("?")}`:"")}async function S(e,t){let r=t.res||t.ctx&&t.ctx.res;if(!e.getInitialProps)return t.ctx&&t.Component?{pageProps:await S(t.Component,t.ctx)}:{};let n=await e.getInitialProps(t);if(r&&f(r))return n;if(!n)throw Object.defineProperty(Error(`"${d(e)}.getInitialProps()" should resolve to an object. But found "${n}" instead.`),"__NEXT_ERROR_CODE",{value:"E394",enumerable:!1,configurable:!0});return n}let h="u">typeof performance,A=h&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);class m extends Error{}class b extends Error{}class g extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message=`Cannot find module for page: ${e}`}}class _ extends Error{constructor(e,t){super(),this.message=`Failed to load static file for page: ${e} ${t}`}}class T extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}}function E(e){return JSON.stringify({message:e.message,stack:e.stack})}},573668,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"isLocalURL",{enumerable:!0,get:function(){return o}});let n=e.r(718967),i=e.r(652817);function o(e){if(!(0,n.isAbsoluteUrl)(e))return!0;try{let t=(0,n.getLocationOrigin)(),r=new URL(e,t);return r.origin===t&&(0,i.hasBasePath)(r.pathname)}catch(e){return!1}}},284508,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"errorOnce",{enumerable:!0,get:function(){return n}});let n=e=>{}},522016,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={default:function(){return m},useLinkStatus:function(){return g}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});let o=e.r(190809),a=e.r(843476),l=o._(e.r(271645)),s=e.r(195057),c=e.r(8372),u=e.r(818581),d=e.r(718967),f=e.r(405550);e.r(233525);let p=e.r(91949),S=e.r(573668),h=e.r(509396);function A(e){return"string"==typeof e?e:(0,s.formatUrl)(e)}function m(t){var r;let n,i,o,[s,m]=(0,l.useOptimistic)(p.IDLE_LINK_STATUS),g=(0,l.useRef)(null),{href:_,as:T,children:E,prefetch:I=null,passHref:v,replace:R,shallow:O,scroll:y,onClick:L,onMouseEnter:C,onTouchStart:N,legacyBehavior:$=!1,onNavigate:x,ref:P,unstable_dynamicOnHover:D,...M}=t;n=E,$&&("string"==typeof n||"number"==typeof n)&&(n=(0,a.jsx)("a",{children:n}));let B=l.default.useContext(c.AppRouterContext),w=!1!==I,G=!1!==I?null===(r=I)||"auto"===r?h.FetchStrategy.PPR:h.FetchStrategy.Full:h.FetchStrategy.PPR,{href:j,as:k}=l.default.useMemo(()=>{let e=A(_);return{href:e,as:T?A(T):e}},[_,T]);if($){if(n?.$$typeof===Symbol.for("react.lazy"))throw Object.defineProperty(Error("`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."),"__NEXT_ERROR_CODE",{value:"E863",enumerable:!1,configurable:!0});i=l.default.Children.only(n)}let U=$?i&&"object"==typeof i&&i.ref:P,W=l.default.useCallback(e=>(null!==B&&(g.current=(0,p.mountLinkInstance)(e,j,B,G,w,m)),()=>{g.current&&((0,p.unmountLinkForCurrentNavigation)(g.current),g.current=null),(0,p.unmountPrefetchableInstance)(e)}),[w,j,B,G,m]),F={ref:(0,u.useMergedRef)(W,U),onClick(t){$||"function"!=typeof L||L(t),$&&i.props&&"function"==typeof i.props.onClick&&i.props.onClick(t),!B||t.defaultPrevented||function(t,r,n,i,o,a,s){if("u">typeof window){let c,{nodeName:u}=t.currentTarget;if("A"===u.toUpperCase()&&((c=t.currentTarget.getAttribute("target"))&&"_self"!==c||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.nativeEvent&&2===t.nativeEvent.which)||t.currentTarget.hasAttribute("download"))return;if(!(0,S.isLocalURL)(r)){o&&(t.preventDefault(),location.replace(r));return}if(t.preventDefault(),s){let e=!1;if(s({preventDefault:()=>{e=!0}}),e)return}let{dispatchNavigateAction:d}=e.r(699781);l.default.startTransition(()=>{d(n||r,o?"replace":"push",a??!0,i.current)})}}(t,j,k,g,R,y,x)},onMouseEnter(e){$||"function"!=typeof C||C(e),$&&i.props&&"function"==typeof i.props.onMouseEnter&&i.props.onMouseEnter(e),B&&w&&(0,p.onNavigationIntent)(e.currentTarget,!0===D)},onTouchStart:function(e){$||"function"!=typeof N||N(e),$&&i.props&&"function"==typeof i.props.onTouchStart&&i.props.onTouchStart(e),B&&w&&(0,p.onNavigationIntent)(e.currentTarget,!0===D)}};return(0,d.isAbsoluteUrl)(k)?F.href=k:$&&!v&&("a"!==i.type||"href"in i.props)||(F.href=(0,f.addBasePath)(k)),o=$?l.default.cloneElement(i,F):(0,a.jsx)("a",{...M,...F,children:n}),(0,a.jsx)(b.Provider,{value:s,children:o})}e.r(284508);let b=(0,l.createContext)(p.IDLE_LINK_STATUS),g=()=>(0,l.useContext)(b);("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},689368,e=>{"use strict";let t={behavior:"instant",block:"start"};function r(e){let r=(e||"").replace("#",""),n=document.getElementById(r);n&&n.scrollIntoView(t)}e.s(["scrollToHash",()=>r])},615632,331588,e=>{"use strict";var t=e.i(843476),r=e.i(271645),n=e.i(109950),i=e.i(850056),o=e.i(997053),a=e.i(618566),l=e.i(522016),s=e.i(166734),c=e.i(946078),u=e.i(228678),d=e.i(646107);let f=/^https?:\/\/|^\/\//;function p(e){return!S(e)}function S(e){return f.test(e)}e.s(["isExternalLink",()=>S,"isInternalLink",()=>p],331588);var h=e.i(689368);let A=o.css`
  ${c.KEY_NAVIGATING_STYLES};
  ${s.TAP_HIGHLIGHT_STYLES};
  text-decoration: none;
  touch-action: manipulation;
`,m=(0,o.default)(l.default).withConfig({displayName:"LinkBare__InternalLink",componentId:"sc-9847dffd-0"})`
  ${A};
`,b=o.default.a.withConfig({displayName:"LinkBare__ExternalLink",componentId:"sc-9847dffd-1"})`
  ${A};
`;function g(e){let{href:o,id:l,tabIndex:s,children:c,onClick:f,...S}=e,A="string"==typeof o?o:o?.pathname||"",g=(0,r.useRef)(null),_=(0,n.useAppSelector)(i.selectKeyNavigating),T=(0,a.usePathname)(),E=(0,n.useAppDispatch)(),I=(0,r.useCallback)(()=>{E((0,u.setModalClosed)())},[E]),v=(0,r.useCallback)(e=>{f&&f(e),g.current||(g.current=document.createElement("a")),g.current.href=A;let t=T===g.current.pathname,r=e.metaKey||e.ctrlKey;t||r?g.current.hash?(setTimeout(()=>I(),0),(0,h.scrollToHash)(g.current.hash)):I():E((0,d.setRoutesLoading)(!0))},[T,A,I,E,f]);return p(A)?(0,t.jsx)(m,{href:A,id:l,tabIndex:s,onClick:v,$isKeyNavigating:_,...S,children:c}):(0,t.jsx)(b,{href:A,id:l,tabIndex:s,$isKeyNavigating:_,target:"_blank",rel:"noreferrer",...S,children:c})}e.s(["LinkBare",()=>g,"linkBareStyles",0,A],615632)},728191,e=>{"use strict";let t=e.i(801770).SPACINGS.FOUR;e.s(["MAIN_CONTENT_ID",0,"main-content","PAGE_FRAME_SIZES",0,{DEFAULT:"144rem",MD:"110rem",SM:"68rem"},"PAGE_FRAME_SPACING",0,t,"PAGE_LAYOUTS",0,{HOME:"Home",NOT_FOUND:"404",GENERATOR:"Generator",DOCS:"Docs"}])},475086,e=>{"use strict";var t=e.i(843476),r=e.i(271645);let n=(0,r.createContext)({hierarchicalRoutes:[],flatRoutes:[]});function i(e){let{routes:r,children:i}=e;return(0,t.jsx)(n.Provider,{value:r,children:i})}function o(){return(0,r.useContext)(n)}e.s(["SidebarNavigationProvider",()=>i,"useSidebarNavigationContext",()=>o])},897364,172539,e=>{"use strict";var t=e.i(164645),r=e.i(271645);let n={GROUP_ID:"package-manager",TABS:{CDN:{LABEL:"CDN",VALUE:"cdn"},NPM:{LABEL:"npm",VALUE:"npm"},PNPM:{LABEL:"pnpm",VALUE:"pnpm"},YARN:{LABEL:"yarn",VALUE:"yarn"}}},i={GROUP_ID:"library",TABS:{VANILLA:{LABEL:"Vanilla",VALUE:"vanilla"},REACT:{LABEL:"React",VALUE:"react"},VUE:{LABEL:"Vue",VALUE:"vue"},SVELTE:{LABEL:"Svelte",VALUE:"svelte"},SOLID:{LABEL:"Solid",VALUE:"solid"}}};function o(e){let t=0;return r.default.Children.toArray(e).reduce((e,n)=>{if(!r.default.isValidElement(n)||!("tab"in n.props))return e;let{props:i}=n,o=r.default.cloneElement(n,{index:i.disabled?-1:t,label:i.tab.LABEL,value:i.tab.VALUE,...i});return i.disabled||(t+=1),[...e,o.props]},[])}function a(e,t){return e.find(e=>e.value===t)||e.find(e=>e.default)||e[0]}e.s(["TABS_LIBRARY",0,i,"TABS_PACKAGE_MANAGER",0,n,"TABS_SIDEBAR_NAVIGATION",0,{GROUP_ID:"",TABS:{MAIN_MENU:{LABEL:"Docs menu",VALUE:"docs-menu"},ON_THIS_PAGE:{LABEL:"On this page",VALUE:"table-of-contents"}}},"getDefaultTab",()=>a,"mapChildrenToTabs",()=>o],172539);let l={tabSelections:{[n.GROUP_ID]:n.TABS.NPM.VALUE,[i.GROUP_ID]:i.TABS.VANILLA.VALUE}},s=(0,t.createSlice)({name:"tabs",initialState:l,reducers:{setTabSelection:(e,t)=>{let{key:r,value:n}=t.payload;e.tabSelections[r]=n}}}),{name:c,reducer:u}=s,{setTabSelection:d}=s.actions;function f(e){return e.tabs.tabSelections}e.s(["selectTabSelections",()=>f,"setTabSelection",0,d,"tabsName",()=>c,"tabsReducer",()=>u],897364)},100236,(e,t,r)=>{t.exports=e.g&&e.g.Object===Object&&e.g},139088,(e,t,r)=>{var n=e.r(100236),i="object"==typeof self&&self&&self.Object===Object&&self;t.exports=n||i||Function("return this")()},630353,(e,t,r)=>{t.exports=e.r(139088).Symbol},243436,(e,t,r)=>{var n=e.r(630353),i=Object.prototype,o=i.hasOwnProperty,a=i.toString,l=n?n.toStringTag:void 0;t.exports=function(e){var t=o.call(e,l),r=e[l];try{e[l]=void 0;var n=!0}catch(e){}var i=a.call(e);return n&&(t?e[l]=r:delete e[l]),i}},223243,(e,t,r)=>{var n=Object.prototype.toString;t.exports=function(e){return n.call(e)}},377684,(e,t,r)=>{var n=e.r(630353),i=e.r(243436),o=e.r(223243),a=n?n.toStringTag:void 0;t.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":a&&a in Object(e)?i(e):o(e)}},877289,(e,t,r)=>{t.exports=function(e){return null!=e&&"object"==typeof e}},361884,(e,t,r)=>{var n=e.r(377684),i=e.r(877289);t.exports=function(e){return"symbol"==typeof e||i(e)&&"[object Symbol]"==n(e)}},923035,e=>{"use strict";var t=e.i(843476),r=e.i(997053),n=e.i(989023),i=e.i(801770);let o=r.default.span.withConfig({displayName:"IconWithText__IconWithTextWrapper",componentId:"sc-14b7e1d1-0"})`
  display: flex;
  align-items: flex-start;
  text-align: left;

  > :first-child {
    margin-right: ${({$spacing:e})=>e};
  }
`,a=r.default.span.withConfig({displayName:"IconWithText__IconWrapper",componentId:"sc-14b7e1d1-1"})`
  position: relative;
  width: ${({$iconSize:e})=>e};

  &:before {
    width: ${({$iconSize:e})=>e};
    content: '-';
    display: inline-block;
    line-height: inherit;
    opacity: 0;
  }
`,l=(0,r.default)(n.Icon).withConfig({displayName:"IconWithText__IconWithTextIcon",componentId:"sc-14b7e1d1-2"})`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`,s=r.default.span.withConfig({displayName:"IconWithText__IconWithTextText",componentId:"sc-14b7e1d1-3"})``;function c(e){let{spacing:r=i.SPACINGS.ONE,iconSize:n=i.SPACINGS.THREE,iconSide:c="left",iconSvg:u,children:d,...f}=e,p="left"===c,S=(0,t.jsx)(a,{$iconSize:n,children:(0,t.jsx)(l,{svg:u,size:n})});return(0,t.jsxs)(o,{$spacing:r,...f,children:[p&&S,(0,t.jsx)(s,{children:d}),!p&&S]})}e.s(["IconWithText",()=>c,"IconWithTextIcon",0,l,"IconWithTextText",0,s])}]);