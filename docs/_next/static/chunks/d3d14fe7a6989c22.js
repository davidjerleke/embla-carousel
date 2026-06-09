(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,285950,e=>{e.v({name:"embla-carousel-website",version:"9.0.0-rc02",author:"David Jerleke",description:"A lightweight carousel library with fluid motion and great swipe precision",repository:{type:"git",url:"git+https://github.com/davidjerleke/embla-carousel"},bugs:{url:"https://github.com/davidjerleke/embla-carousel/issues"},homepage:"https://www.embla-carousel.com",license:"MIT",private:!0,scripts:{dev:"next dev",build:"next build",start:"next start",lint:"eslint","predeploy:sandboxfiles-build":"npx ts-node --project ../scripts/tsconfig.json ../scripts/create-sandboxes/index.ts","predeploy:format":"yarn workspace embla-carousel-monorepo run format","predeploy:clean":"shx rm -rf ../docs",predeploy:"npm-run-all predeploy:clean predeploy:sandboxfiles-build predeploy:format build"},dependencies:{"@docsearch/react":"^4.6.2","@mdx-js/loader":"^3.1.1","@mdx-js/mdx":"^2.2.1","@mdx-js/react":"^3.1.1","@next/mdx":"^16.1.6","@reduxjs/toolkit":"^2.11.2","@types/mdx":"^2.0.13",codesandbox:"^2.2.3","embla-carousel":"9.0.0-rc02","embla-carousel-accessibility":"9.0.0-rc02","embla-carousel-auto-height":"9.0.0-rc02","embla-carousel-auto-scroll":"9.0.0-rc02","embla-carousel-autoplay":"9.0.0-rc02","embla-carousel-class-names":"9.0.0-rc02","embla-carousel-fade":"9.0.0-rc02","embla-carousel-react":"9.0.0-rc02","focus-trap-react":"12.0.0","gray-matter":"^4.0.3",hast:"^1.0.0",hastscript:"^9.0.1",lodash:"^4.17.21",next:"16.1.7","prism-react-renderer":"^1.3.5",prismjs:"1.30.0","raw-loader":"^4.0.2",react:"19.2.3","react-dom":"19.2.3","react-intersection-observer":"^8.33.1","react-redux":"^9.2.0","rehype-autolink-headings":"^7.1.0","rehype-slug":"^6.0.0","styled-components":"^6.3.8","unist-util-visit":"^5.1.0"},devDependencies:{"@svgr/webpack":"^8.1.0","@types/lodash":"^4.14.178","@types/node":"^20","@types/prettier":"2.7.3","@types/prismjs":"^1.26.5","@types/react":"^19","@types/react-dom":"^19",eslint:"^9","eslint-config-next":"16.1.6","npm-run-all":"^4.1.5",prettier:"2.8.8",shx:"^0.3.4","ts-node":"^10.9.1","type-fest":"^3.2.0",typescript:"^5"}})},434140,(e,a,t)=>{a.exports={bracketSpacing:!0,printWidth:80,semi:!1,singleQuote:!0,trailingComma:"none",tabWidth:2,useTabs:!1}},855984,e=>{"use strict";let a=e.i(434140).default;async function t(){let[t,i,o,r]=await Promise.all([e.A(860320),e.A(844165),e.A(635290),e.A(996551)]),l={...a,parser:"html",plugins:[i]},n={...a,parser:"css",plugins:[o]},s={...a,parser:"babel",plugins:[r]},d={...a,parser:"babel-ts",plugins:[r]},c=(e,a)=>{let i="";try{i=t.format(e,a)}catch(e){console.warn("Prettier was not able to format file",e)}return i};return{prettierConfig:a,formatHtml:e=>c(e,l),formatCss:e=>c(e,n),formatJs:e=>c(e,s),formatTs:e=>c(e,d)}}e.s(["loadPrettier",()=>t])},521321,e=>{"use strict";var a=e.i(285950),t=e.i(855984),i=e.i(801770);let o={VANILLA_JS:"Vanilla",VANILLA_TS:"Vanilla + TypeScript",REACT_TS:"React + TypeScript",REACT_JS:"React"},r={JAVASCRIPT:"javascript",TYPESCRIPT:"typescript"},l=i.SPACINGS.ONE;async function n(e){let{formatTs:a,formatJs:i}=await (0,t.loadPrettier)(),o=e===r.TYPESCRIPT,l=!o;return{isJavaScript:l,isTypeScript:o,vanillaScriptExtension:l?"js":"ts",reactScriptExtension:l?"jsx":"tsx",formatScript:o?a:i}}function s(e){return Object.keys(e).map(a=>{let t=e[a];return{key:a,label:o[a],createSandbox:t}})}function d(e){return{plugins:{...(Array.isArray(e)?e:[e]).reduce((e,t)=>({...e,[t]:a.default.dependencies[t]}),{})}}}function c(e){return a=>a.replace("{}",JSON.stringify(e))}function p(e){return(e||"").replace(/from\s'..(.*)\/EmblaCarousel/g,"from './EmblaCarousel")}e.s(["SANDBOX_LANGUAGES",0,r,"SANDBOX_PLUGINS",0,{ACCESSIBILITY:"embla-carousel-accessibility",AUTOPLAY:"embla-carousel-autoplay",AUTO_SCROLL:"embla-carousel-auto-scroll",AUTO_HEIGHT:"embla-carousel-auto-height",CLASS_NAMES:"embla-carousel-class-names",FADE:"embla-carousel-fade"},"SANDBOX_REGEX_OPTIONS",0,/const\sOPTIONS(.*)/,"SANDBOX_REGEX_REPOSITORY_URL",0,/__replace_sandbox_repository_url__/g,"SANDBOX_REGEX_THEME",0,/__replace_sandbox_theme__/g,"SANDBOX_REGEX_TITLE",0,/__replace_sandbox_title__/g,"SANDBOX_SELECTION_SPACING",0,l,"addSandboxPlugins",()=>d,"createSandboxFunctionsWithLabels",()=>s,"flattenEmblaCarouselImportPath",()=>p,"sandboxInjectOptions",()=>c,"sandboxLanguageUtils",()=>n])},237865,e=>{"use strict";let a,t,i,o;var r,l,n=e.i(843476),s=e.i(997053),d=e.i(840535),c=e.i(224583),p=e.i(350437),S=e.i(907827),u=e.i(801770),b=e.i(506390),m=e.i(989023),_=e.i(380999),f=e.i(271645),h=e.i(925866),C=e.i(291543),E=e.i(174776),I=e.i(521321),x=e.i(32957),A=e.i(109950),g=e.i(850056),O=e.i(671249),R=e.i(266349),T=e.i(166734),y=e.i(946078);let N="2.5rem",L=s.default.span.withConfig({displayName:"CreateRadioOrCheckboxDefault__RadioOrCheckboxDefaultWrapper",componentId:"sc-36db0e7-0"})`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
`,D=s.default.span.withConfig({displayName:"CreateRadioOrCheckboxDefault__InputWrapper",componentId:"sc-36db0e7-1"})`
  flex: 0 0 ${N};
  position: relative;
  min-width: 0;
`,$=s.default.span.withConfig({displayName:"CreateRadioOrCheckboxDefault__InputLineHeight",componentId:"sc-36db0e7-2"})`
  color: ${p.COLORS.BACKGROUND_SITE};
  width: ${N};
  display: inline-block;
  line-height: inherit;
`,k=s.default.input.withConfig({displayName:"CreateRadioOrCheckboxDefault__Input",componentId:"sc-36db0e7-3"})`
  ${(0,_.createSquareSizeStyles)(N)};
  ${T.TAP_HIGHLIGHT_STYLES};
  ${y.KEY_NAVIGATING_STYLES};
  appearance: none;
  -webkit-appearance: none;
  position: absolute;
  top: 50%;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  background-color: ${p.COLORS.DETAIL_MEDIUM_CONTRAST};
  cursor: pointer;

  &:before,
  &:after {
    display: block;
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &:before {
    ${(0,_.createSquareSizeStyles)("2rem")};
    background-color: ${p.COLORS.BACKGROUND_CODE};
  }

  &:after {
    ${(0,_.createSquareSizeStyles)("1.2rem")};
  }

  &:checked {
    &:after {
      ${R.BRAND_GRADIENT_BACKGROUND_STYLES};
    }
  }

  &[disabled] {
    cursor: not-allowed;
  }

  &[disabled]:checked {
    &:after {
      background-image: none;
      background-color: ${p.COLORS.DETAIL_HIGH_CONTRAST};
    }
  }
`,w=(0,s.default)(k).withConfig({displayName:"CreateRadioOrCheckboxDefault__InputRadio",componentId:"sc-36db0e7-4"})`
  border-radius: ${O.BORDER_RADIUSES.CIRCLE};

  &:before {
    border-radius: ${O.BORDER_RADIUSES.CIRCLE};
  }
  &:after {
    border-radius: ${O.BORDER_RADIUSES.CIRCLE};
  }
`,G=(0,s.default)(k).withConfig({displayName:"CreateRadioOrCheckboxDefault__InputCheckbox",componentId:"sc-36db0e7-5"})`
  border-radius: ${O.BORDER_RADIUSES.LINE};

  &:before {
    border-radius: ${O.BORDER_RADIUSES.LINE};
  }

  &:after {
    border-radius: 0;
  }
`,P=s.default.label.withConfig({displayName:"CreateRadioOrCheckboxDefault__Label",componentId:"sc-36db0e7-6"})`
  ${T.TAP_HIGHLIGHT_STYLES};
  padding-left: ${u.SPACINGS.TWO};
  min-width: 0;
  flex: 0 0 calc(100% - ${N});

  ${({$disabled:e})=>e&&s.css`
      color: ${p.COLORS.TEXT_LOW_CONTRAST};
    `};
`;var v=e.i(878612);let j=s.default.label.withConfig({displayName:"CreateRadioOrCheckboxCard__RadioOrCheckboxCardWrapper",componentId:"sc-b581c1a9-0"})`
  ${T.TAP_HIGHLIGHT_STYLES};
  ${v.CARD_STYLES};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100%;
`,B=s.default.span.withConfig({displayName:"CreateRadioOrCheckboxCard__LabelContent",componentId:"sc-b581c1a9-1"})`
  z-index: ${S.LAYERS.STEP};
  position: relative;
  display: block;
  width: 100%;
  cursor: pointer;
`,U=s.default.span.withConfig({displayName:"CreateRadioOrCheckboxCard__Highlight",componentId:"sc-b581c1a9-2"})`
  ${R.BRAND_GRADIENT_BACKGROUND_STYLES};
  top: -${O.BORDER_SIZES.DETAIL};
  left: -${O.BORDER_SIZES.DETAIL};
  bottom: -${O.BORDER_SIZES.DETAIL};
  right: -${O.BORDER_SIZES.DETAIL};
  display: block;
  position: absolute;
  border-radius: inherit;
  pointer-events: none;
  visibility: hidden;

  &:after {
    background-color: ${p.COLORS.BACKGROUND_CODE};
    border-radius: inherit;
    position: absolute;
    top: ${O.BORDER_SIZES.OUTLINE};
    left: ${O.BORDER_SIZES.OUTLINE};
    bottom: ${O.BORDER_SIZES.OUTLINE};
    right: ${O.BORDER_SIZES.OUTLINE};
    content: '';
  }
`,H=s.default.input.withConfig({displayName:"CreateRadioOrCheckboxCard__Input",componentId:"sc-b581c1a9-3"})`
  ${T.TAP_HIGHLIGHT_STYLES};
  ${y.KEY_NAVIGATING_STYLES};
  position: absolute;
  border-radius: ${O.BORDER_RADIUSES.CARD};
  top: 0;
  left: 0;
  ${(0,_.createSquareSizeStyles)("100%")};
  appearance: none;
  -webkit-appearance: none;
  border: 0;
  background-color: transparent;
  pointer-events: none;

  &:after {
    display: block;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    ${(0,_.createSquareSizeStyles)("100%")};
  }

  &:checked + ${U} {
    visibility: visible;
  }

  &[disabled] + ${U} + ${B} {
    cursor: not-allowed;
  }

  &[disabled]:checked + ${U} {
    background-image: none;
    background-color: ${p.COLORS.DETAIL_HIGH_CONTRAST};
  }
`;a="radio"==(r="radio")?w:G,t=(0,x.kebabCaseToPascalCase)(`input-${r}-default`);let F=(l="radio",i=(0,x.kebabCaseToPascalCase)(`input-${l}-card`),(o=e=>{let{children:a,...t}=e,i=(0,A.useAppSelector)(g.selectKeyNavigating);return(0,n.jsxs)(j,{htmlFor:t.id,children:[(0,n.jsx)(H,{type:l,$isKeyNavigating:i,...t}),(0,n.jsx)(U,{}),(0,n.jsx)(B,{children:a})]})}).displayName=i,o),Y={VANILLA_JS:"javascript",VANILLA_TS:"typescript",REACT_JS:"react",REACT_TS:"react"},M=s.default.span.withConfig({displayName:"SandboxSelectionInput__RadioLabelContent",componentId:"sc-18c6d0d9-0"})`
  display: flex;
  flex-direction: column;
  padding: ${u.SPACINGS.TWO};
  line-height: 1;
  text-align: center;
  align-items: center;
  font-size: ${h.FONT_SIZES.DETAIL};
  font-weight: ${h.FONT_WEIGHTS.MEDIUM};
`,W=(0,s.default)(m.Icon).withConfig({displayName:"SandboxSelectionInput__RadioLabelSvg",componentId:"sc-18c6d0d9-1"})`
  ${(0,_.createSquareSizeStyles)("3rem")};
  margin-bottom: ${u.SPACINGS.TWO};
`;function K(e){let{children:a,framework:t,...i}=e;return(0,n.jsx)(F,{...i,children:(0,n.jsxs)(M,{children:[(0,n.jsx)(W,{svg:Y[t]}),a]})})}var X=e.i(343869);let z="choose-sandbox",V=s.default.form.withConfig({displayName:"SandboxSelectionForm__SandboxSelectionFormWrapper",componentId:"sc-5d344c3-0"})`
  display: flex;
  flex-direction: column;
`,Z=s.default.div.withConfig({displayName:"SandboxSelectionForm__Fieldset",componentId:"sc-5d344c3-1"})`
  padding-bottom: ${u.SPACINGS.FIVE};
`,J=s.default.h3.withConfig({displayName:"SandboxSelectionForm__Legend",componentId:"sc-5d344c3-2"})`
  margin-bottom: ${u.SPACINGS.FOUR};
  font-size: ${h.FONT_SIZES.H3};

  width: 100%;
  font-weight: ${h.FONT_WEIGHTS.BOLD};
  line-height: 1.5;
`,q=s.default.ul.withConfig({displayName:"SandboxSelectionForm__SandboxSelectionList",componentId:"sc-5d344c3-3"})`
  ${(0,E.createGapStyles)(I.SANDBOX_SELECTION_SPACING,I.SANDBOX_SELECTION_SPACING,"li")};
  display: flex;
  flex-wrap: wrap;
`,Q=s.default.li.withConfig({displayName:"SandboxSelectionForm__SandboxSelection",componentId:"sc-5d344c3-4"})`
  position: relative;
  flex: 0 0 50%;
  min-width: 0;
`;function ee(e){let{sandboxes:a=[]}=e,{URLS:t}=X.GLOBAL_DATA,[i,o]=(0,f.useState)(""),[r,l]=(0,f.useState)(""),s=!!(i&&!r),d=(0,f.useCallback)(async e=>{let t=a.find(a=>a.key===e);t&&l(await t.createSandbox())},[a]),c=(0,f.useCallback)(e=>{let a=e.currentTarget.value;l(""),o(a)},[]);return(0,f.useEffect)(()=>{i&&d(i)},[i]),(0,n.jsxs)(V,{action:t.CODESANDBOX_DEFINE,method:"POST",target:"_blank",children:[(0,n.jsxs)(Z,{role:"radiogroup","aria-label":z,children:[(0,n.jsx)(J,{children:"Select CodeSandbox"}),(0,n.jsx)(q,{children:a.map(e=>(0,n.jsx)(Q,{children:(0,n.jsx)(K,{framework:e.key,name:z,id:`${z}-${(0,x.snakeCaseToKebabCase)(e.key)}`,value:e.key,onChange:c,checked:i===e.key,children:e.label})},e.key))})]}),(0,n.jsx)("input",{type:"hidden",name:"parameters",value:r}),(0,n.jsx)(C.ButtonPrimaryFilledWithLoading,{isLoading:s,disabled:!r,type:"submit",children:"Create Sandbox"})]})}var ea=e.i(728191);let et="select-codesandbox-dialog",ei=u.SPACINGS.TWELVE,eo="4rem",er="1.8rem",el=s.default.div.withConfig({displayName:"SandboxSelectionModal__SandboxSelectionModalWrapper",componentId:"sc-1efe8406-0"})`
  z-index: ${S.LAYERS.SEARCH+S.LAYERS.STEP};
  padding: ${ea.PAGE_FRAME_SPACING} 0;
  background-color: ${p.COLORS.BACKGROUND_SITE};
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  margin: auto;
  width: 100%;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  height: 100dvh;
  max-width: ${"36rem"};

  ${b.MEDIA.DESKTOP} {
    box-shadow: 0 0 0 0.1rem ${p.COLORS.DETAIL_LOW_CONTRAST};
    top: ${ei};
    max-height: calc(100dvh - ${ei} * 2);
    height: auto;
    border-radius: ${O.BORDER_RADIUSES.SOFT};
  }
`,en=s.default.div.withConfig({displayName:"SandboxSelectionModal__Overlay",componentId:"sc-1efe8406-1"})`
  z-index: ${S.LAYERS.SEARCH};
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: ${p.COLORS.BACKGROUND_SITE};

  ${b.MEDIA.DESKTOP} {
    opacity: 0.9;
  }
`,es=(0,s.default)(c.ButtonBare).withConfig({displayName:"SandboxSelectionModal__CloseButton",componentId:"sc-1efe8406-2"})`
  ${(0,_.createSquareSizeStyles)(eo)};
  z-index: ${S.LAYERS.STEP};
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: ${ea.PAGE_FRAME_SPACING};
  right: ${ea.PAGE_FRAME_SPACING};
  margin-right: calc((${eo} - ${er}) / 2 * -1);
  margin-top: -${u.SPACINGS.CUSTOM(()=>.4)};

  ${c.ButtonBareText} {
    display: flex;
  }
`,ed=s.default.div.withConfig({displayName:"SandboxSelectionModal__ScrollArea",componentId:"sc-1efe8406-3"})`
  padding: 0 ${ea.PAGE_FRAME_SPACING};
  overflow: auto;
  position: relative;
  max-height: 100%;
`;function ec(e){let{closeModal:a}=e,t=e.sandboxes||[];return(0,n.jsx)(d.FocusTrap,{children:(0,n.jsxs)("div",{children:[(0,n.jsx)(en,{onClick:a}),(0,n.jsxs)(el,{role:"dialog","aria-modal":"true","aria-label":"Select CodeSandbox Dialog","aria-labelledby":et,children:[(0,n.jsx)(es,{"aria-label":"Hide Select CodeSandbox Dialog",onClick:a,children:(0,n.jsx)(m.Icon,{svg:"cross",size:er})}),(0,n.jsx)(ed,{children:(0,n.jsx)(ee,{sandboxes:t})})]})]})})}e.s(["SELECT_CODESANDBOX_DIALOG_ID",0,et,"SandboxSelectionModal",()=>ec],237865)},860320,e=>{e.v(a=>Promise.all(["static/chunks/ff280447772cecf8.js"].map(a=>e.l(a))).then(()=>a(297747)))},844165,e=>{e.v(a=>Promise.all(["static/chunks/9b86cab0ad740a79.js"].map(a=>e.l(a))).then(()=>a(71988)))},635290,e=>{e.v(a=>Promise.all(["static/chunks/bc98626dfa12af22.js"].map(a=>e.l(a))).then(()=>a(38669)))},996551,e=>{e.v(a=>Promise.all(["static/chunks/db1907250879a508.js"].map(a=>e.l(a))).then(()=>a(631191)))}]);