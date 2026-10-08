(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,863552,e=>{"use strict";var t=e.i(997053),i=e.i(907827),s=e.i(350437),a=e.i(801770),r=e.i(671249),n=e.i(925866),o=e.i(380999),l=e.i(700810),c=e.i(166734),u=e.i(266349),d=e.i(772798);let p="48rem",S="19rem",m="1rem",_="22.2rem",E="3.6rem",h="1.8rem",g="2.5rem",f="0.6rem",b=s.COLORS.BRAND_PRIMARY,A=t.css`
  border-radius: ${r.BORDER_RADIUSES.SOFT};
`,O=t.css`
  border: ${r.BORDER_SIZES.OUTLINE} solid ${s.COLORS.DETAIL_MEDIUM_CONTRAST};
`,T=t.css`
  display: block;
  height: var(--slide-height);
  width: 100%;
  object-fit: cover;
`,R=t.css`
  ${c.TAP_HIGHLIGHT_STYLES};
  -webkit-appearance: none;
  appearance: none;
  background-color: transparent;
  touch-action: manipulation;
  display: inline-flex;
  text-decoration: none;
  cursor: pointer;
  border: 0;
  padding: 0;
  margin: 0;
`,L=t.css`
  ${c.TAP_HIGHLIGHT_STYLES};
  ${R};
  ${O};
  ${A};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${s.COLORS.TEXT_BODY};
  font-weight: ${n.FONT_WEIGHTS.BOLD};
  font-size: ${n.FONT_SIZES.COMPLEMENTARY};
  padding: 0 ${a.SPACINGS.FOUR};
  min-height: ${E};
`,I=t.css`
  .embla__text-input {
    ${c.TAP_HIGHLIGHT_STYLES};
    -webkit-appearance: none;
    appearance: none;
    touch-action: manipulation;
    color: ${s.COLORS.TEXT_BODY};
    background-color: ${s.COLORS.BACKGROUND_CODE};
    border: ${r.BORDER_SIZES.DETAIL} solid ${s.COLORS.DETAIL_LOW_CONTRAST};
    padding: ${a.SPACINGS.ONE} ${a.SPACINGS.ONE};
    font-size: ${n.FONT_SIZES.BODY};
    min-height: ${E};
    text-align: center;
  }

  .embla__text-input {
    -moz-appearance: textfield;
  }

  .embla__text-input::-webkit-inner-spin-button,
  .embla__text-input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`,v=t.css`
  ${I};

  .embla__text-form {
    display: flex;
    justify-content: space-between;
    gap: ${a.SPACINGS.TWO};
    margin-bottom: ${h};
    font-size: ${n.FONT_SIZES.COMPLEMENTARY};
  }

  .embla__text-form__label {
    display: flex;
    align-items: center;
    gap: ${a.SPACINGS.ONE};
    font-weight: ${n.FONT_WEIGHTS.SEMI_BOLD};
  }

  .embla__text-form__submit {
    ${L};
    padding: 0 ${a.SPACINGS.THREE};
  }
`,x=t.css`
  .embla__radio-form {
    min-height: ${E};
    display: flex;
    align-items: center;
    font-size: ${n.FONT_SIZES.COMPLEMENTARY};
  }

  .embla__radio-wrapper {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .embla__radio-input__wrapper {
    flex: 0 0 ${g};
    position: relative;
    min-width: 0;
    margin-right: ${a.SPACINGS.ONE};
  }

  .embla__radio-input__line-height {
    color: ${s.COLORS.BACKGROUND_SITE};
    width: ${g};
    display: inline-block;
    line-height: inherit;
  }

  .embla__radio-form__label {
    display: flex;
    align-items: center;
    font-size: ${n.FONT_SIZES.COMPLEMENTARY};
    font-weight: ${n.FONT_WEIGHTS.SEMI_BOLD};
    gap: ${a.SPACINGS.ONE};
  }

  .embla__radio-wrapper input {
    ${c.TAP_HIGHLIGHT_STYLES};
    ${(0,o.createSquareSizeStyles)(g)};
    ${c.TAP_HIGHLIGHT_STYLES};
    -webkit-appearance: none;
    appearance: none;
    touch-action: manipulation;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    background-color: ${s.COLORS.DETAIL_MEDIUM_CONTRAST};
    cursor: pointer;
    border-radius: ${r.BORDER_RADIUSES.CIRCLE};

    &:before,
    &:after {
      border-radius: ${r.BORDER_RADIUSES.CIRCLE};
      display: block;
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    &:before {
      ${(0,o.createSquareSizeStyles)("2rem")};
      background-color: ${s.COLORS.BACKGROUND_CODE};
    }

    &:after {
      ${(0,o.createSquareSizeStyles)("1.2rem")};
    }

    &:checked {
      &:after {
        ${u.BRAND_GRADIENT_BACKGROUND_STYLES};
      }
    }

    &[disabled] {
      cursor: not-allowed;
    }

    &[disabled]:checked {
      &:after {
        background-image: none;
        background-color: ${s.COLORS.DETAIL_HIGH_CONTRAST};
      }
    }
  }
`,y=t.css`
  ${x};

  .embla__radio-form {
    display: flex;
    gap: ${a.SPACINGS.TWO};
    margin-bottom: ${h};
  }

  .embla__text-form__label {
    display: flex;
    align-items: center;
    font-size: ${n.FONT_SIZES.COMPLEMENTARY};
    font-weight: ${n.FONT_WEIGHTS.SEMI_BOLD};
    gap: ${a.SPACINGS.ONE};
  }
`,C=t.css`
  .embla__viewport {
    position: relative;
  }

  .embla__align-indicator {
    position: absolute;
    pointer-events: none;
    top: 10%;
    bottom: 10%;
    width: 0.8rem;
    opacity: 0.8;
    border-radius: ${r.BORDER_RADIUSES.CARD};
    ${u.BRAND_GRADIENT_BACKGROUND_STYLES};
    border: ${r.BORDER_SIZES.OUTLINE} solid ${s.COLORS.BACKGROUND_SITE};

    &:after {
      display: block;
      content: '';
      position: absolute;
      border-radius: ${r.BORDER_RADIUSES.CARD};
      border: ${r.BORDER_SIZES.OUTLINE} solid ${s.COLORS.TEXT_BODY};
      top: -${r.BORDER_SIZES.ACCENT_VERTICAL};
      bottom: -${r.BORDER_SIZES.ACCENT_VERTICAL};
      left: -${r.BORDER_SIZES.ACCENT_VERTICAL};
      right: -${r.BORDER_SIZES.ACCENT_VERTICAL};
    }
  }

  .embla__align-indicator--start {
    left: ${r.BORDER_SIZES.OUTLINE};
  }

  .embla__align-indicator--center {
    left: 50%;
    transform: translateX(-50%);
  }

  .embla__align-indicator--end {
    right: ${r.BORDER_SIZES.OUTLINE};
  }
`,$=t.css`
  .embla__slide {
    position: relative;
  }

  .embla__group__indicator {
    display: block;
    pointer-events: none;
    position: absolute;
    top: 0;
    bottom: 0;
  }

  .embla__group__indicator--start {
    left: var(--slide-spacing);
    right: 0;
    border-top: ${f} solid ${b};
    border-bottom: ${f} solid ${b};
    border-left: ${f} solid ${b};
  }

  .embla__group__indicator--end {
    left: 0;
    right: 0;
    border-top: ${f} solid ${b};
    border-bottom: ${f} solid ${b};
    border-right: ${f} solid ${b};
  }

  .embla__group__indicator--center {
    left: 0;
    right: 0;
    border-top: ${f} solid ${b};
    border-bottom: ${f} solid ${b};
  }

  .embla__group__indicator--single {
    left: var(--slide-spacing);
    right: 0px;
    border: ${f} solid ${b};
  }

  .embla--group-indicator-hidden .embla__group__indicator {
    display: none;
  }
`,k=t.css`
  .embla {
    max-width: ${p};
    margin: auto;

    --slide-height: ${S};
    --slide-spacing: 1rem;
    --slide-size: 100%;
  }

  .embla__viewport {
    overflow: hidden;
  }

  .embla__container {
    display: flex;
    touch-action: pan-y pinch-zoom;
    margin-left: calc(var(--slide-spacing) * -1);
  }

  .embla__slide {
    transform: translate3d(0, 0, 0);
    flex: 0 0 var(--slide-size);
    min-width: 0;
    padding-left: var(--slide-spacing);
  }
`,N=t.css`
  .embla {
    max-width: ${p};
    margin: auto;

    --slide-height: ${S};
    --slide-spacing: 1rem;
    --slide-size: 100%;
  }

  .embla__viewport {
    overflow: hidden;
  }

  .embla__container {
    display: flex;
    touch-action: pan-x pinch-zoom;
    margin-top: calc(var(--slide-spacing) * -1);
    height: calc(var(--slide-spacing) + var(--slide-height));
    flex-direction: column;
  }

  .embla__slide {
    transform: translate3d(0, 0, 0);
    flex: 0 0 var(--slide-size);
    min-height: 0;
    padding-top: var(--slide-spacing);
  }
`,j=t.css`
  .embla__slide__number {
    ${O};
    ${A};
    font-size: ${n.FONT_SIZES.CUSTOM(()=>4)};
    font-weight: ${n.FONT_WEIGHTS.SEMI_BOLD};
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--slide-height);
    user-select: none;
  }
`,D=t.css`
  .embla__slide__img {
    ${T};
  }
`,w=t.css`
  .embla__slide__img {
    ${T};
    ${A};
  }
`,P=t.css`
  .embla__controls {
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    gap: ${a.SPACINGS.TWO};
    margin-top: ${h};
  }
`,G=t.css`
  .embla__buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${a.SPACINGS.ONE};
    align-items: center;
  }

  .embla__button {
    ${R};
    ${O};
    ${(0,o.createSquareSizeStyles)(E)}
    z-index: ${i.LAYERS.STEP};
    border-radius: ${r.BORDER_RADIUSES.CIRCLE};
    color: ${s.COLORS.TEXT_BODY};
    display: flex;
    align-items: center;
    justify-content: center;
    transform: rotate(0deg);
  }

  .embla__button--disabled {
    color: ${s.COLORS.DETAIL_HIGH_CONTRAST};
  }

  .embla__button__svg {
    ${(0,o.createSquareSizeStyles)("35%")}
  }
`,M=t.css`
  .embla__dots {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: center;
    margin-right: calc((2.6rem - 1.4rem) / 2 * -1);
  }

  .embla__dot {
    ${R};
    ${(0,o.createSquareSizeStyles)("2.6rem")}
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: ${r.BORDER_RADIUSES.CIRCLE};
    position: relative;
  }

  .embla__dot:before,
  .embla__dot:after {
    ${(0,o.createSquareSizeStyles)("1.4rem")}
    border-radius: ${r.BORDER_RADIUSES.CIRCLE};
    position: absolute;
    display: flex;
    align-items: center;
    content: '';
  }

  .embla__dot:before {
    border: ${r.BORDER_SIZES.OUTLINE} solid ${s.COLORS.DETAIL_MEDIUM_CONTRAST};
  }

  .embla__dot:after {
    border: ${r.BORDER_SIZES.OUTLINE} solid ${s.COLORS.TEXT_BODY};
    opacity: 0;
  }

  .embla__dot--selected:after {
    opacity: 1;
  }
`;t.css`
  .embla__live-region {
    ${d.visuallyHiddenStyles};
  }
`;let B=t.css`
  .embla__selected-snap-display {
    justify-self: flex-end;
    align-self: center;
    color: ${s.COLORS.TEXT_LOW_CONTRAST};
    font-weight: ${n.FONT_WEIGHTS.SEMI_BOLD};
  }
`,H=t.css`
  .embla__play {
    ${L};
    min-width: ${a.SPACINGS.FIFTEEN};
    justify-self: flex-end;
  }
`,U=t.css`
  .embla__progress {
    ${A};
    box-shadow: inset 0 0 0 ${r.BORDER_SIZES.OUTLINE}
      ${s.COLORS.DETAIL_MEDIUM_CONTRAST};
    background-color: ${s.COLORS.BACKGROUND_SITE};
    position: relative;
    height: 0.6rem;
    justify-self: flex-end;
    align-self: center;
    width: 13rem;
    max-width: 90%;
    overflow: hidden;
  }

  .embla__progress__bar {
    background-color: ${s.COLORS.TEXT_BODY};
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    left: -100%;
  }
`,z=t.css`
  .embla {
    position: relative;
    display: flex;
    width: 100%;
    height: ${_};
    max-width: 30rem;
    margin-left: auto;
    margin-right: auto;
  }

  .embla:before,
  .embla:after {
    position: absolute;
    left: 0;
    right: 0;
    content: '';
    display: block;
    height: calc(50% - 32px / 2);
    z-index: ${i.LAYERS.STEP};
    pointer-events: none;
  }

  .embla:before {
    top: -0.5px;
    border-bottom: 0.5px solid rgba(${s.COLORS.TEXT_HIGH_CONTRAST_RGB_VALUE}, 0.3);
    background: linear-gradient(
      to top,
      rgba(${s.COLORS.BACKGROUND_SITE_RGB_VALUE}, 0.65) 0%,
      rgba(${s.COLORS.BACKGROUND_SITE_RGB_VALUE}, 1) 100%
    );
  }

  .embla:after {
    bottom: -0.5px;
    border-top: 0.5px solid rgba(${s.COLORS.TEXT_HIGH_CONTRAST_RGB_VALUE}, 0.3);
    background: linear-gradient(
      to bottom,
      rgba(${s.COLORS.BACKGROUND_SITE_RGB_VALUE}, 0.65) 0%,
      rgba(${s.COLORS.BACKGROUND_SITE_RGB_VALUE}, 1) 100%
    );
  }

  .embla__ios-picker {
    height: 100%;
    display: flex;
    align-items: center;
    min-width: 50%;
    justify-content: center;
    line-height: 1;
    font-size: 1.8rem;
  }

  .embla__ios-picker__scene {
    min-width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    touch-action: pan-x;
  }

  .embla__ios-picker__viewport {
    height: 32px;
    width: 100%;
    perspective: 1000px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-touch-callout: none;
    -khtml-user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  .embla__ios-picker__viewport--perspective-left {
    perspective-origin: calc(50% + 130px) 50%;
    transform: translateX(27px);
  }

  .embla__ios-picker__viewport--perspective-right {
    perspective-origin: calc(50% - 130px) 50%;
    transform: translateX(-27px);
  }

  .embla__ios-picker__container {
    height: 100%;
    width: 100%;
    transform-style: preserve-3d;
    will-change: transform;
  }

  .embla__ios-picker__slide {
    width: 100%;
    height: 100%;
    font-size: 19px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    backface-visibility: hidden;
    opacity: 0;
  }

  .embla__ios-picker__label {
    font-weight: ${n.FONT_WEIGHTS.BOLD};
    transform: translateX(-55px);
    pointer-events: none;
  }
`,W=/--slide-size:\s*100%;/gi,F=/--slide-spacing:\s*1rem;/gi,Y=/height\s*:\s*var\(\s*--slide-height\s*\)\s*;?/,q=/transform\s*:\s*rotate\(0deg\)\s*;?/,K=/\.embla__slide__number\s*\{[\s\S]*?\bheight\s*:\s*var\(\s*--slide-height\s*\)\s*;?[\s\S]*?\}/,V=/\.embla__button\s*\{[\s\S]*?\btransform\s*:\s*rotate\(0deg\)\s*;?[\s\S]*?\}/;e.s(["ALIGNMENT_INDICATOR_STYLES",0,C,"ARROWS_STYLES",0,G,"CAROUSEL_BORDER_STYLES",0,O,"CAROUSEL_BUTTON_BASE_STYLES",0,R,"CAROUSEL_CONTROLS_SPACING",0,h,"CAROUSEL_DEFAULT_HEIGHT",0,S,"CAROUSEL_IOS_PICKER_HEIGHT",0,_,"CAROUSEL_MAX_WIDTH",0,p,"CAROUSEL_NAV_BUTTON_SIZE",0,E,"CAROUSEL_SCROLLBAR_HEIGHT",0,"1.6rem","CAROUSEL_SCROLLBAR_SPACING",0,h,"CAROUSEL_SCROLLBAR_TRACK_HEIGHT",0,"0.6rem","CAROUSEL_SLIDE_RADIUS_STYLES",0,A,"CAROUSEL_THUMB_SLIDES_HEIGHT",0,"6rem","CAROUSEL_THUMB_SLIDES_SPACING",0,"0.8rem","CONTROLS_STYLES",0,P,"DOTS_STYLES",0,M,"GROUP_INDICATOR_STYLES",0,$,"IMAGE_ROUNDED_STYLES",0,w,"IMAGE_STYLES",0,D,"IOS_PICKER_STYLES",0,z,"PLAY_BUTTON_STYLES",0,H,"PROGRESS_STYLES",0,U,"RADIO_INPUT_FORM_STYLES",0,y,"SLIDE_NUMBER_STYLES",0,j,"SNAP_DISPLAY_STYLES",0,B,"TEXT_INPUT_FORM_STYLES",0,v,"examplesCarouselStyles",0,(e="100%",t=m,i={},s="",a="")=>{let r="y"!==i.axis,n="rtl"===i.direction;return((a||(0,l.styledComponentsStylesToString)(r?k:N))+s).replace(W,`--slide-size: ${e};`).replace(F,`--slide-spacing: ${t};`).replace(K,e=>{let t=`height: ${r?"var(--slide-height)":"100%"};`;return e.replace(Y,t)}).replace(V,e=>{let t="";r&&(t=n?"rotate(-180deg)":"rotate(0deg)"),r||(t="rotate(90deg)");let i=t?`transform: ${t};`:"";return e.replace(q,i)})}])},772798,e=>{"use strict";var t=e.i(997053);let i=t.css`
  border: 0;
  padding: 0;
  clip: rect(0 0 0 0);
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  position: absolute;
`;e.s(["visuallyHiddenStyles",0,i])},193451,(e,t,i)=>{t.exports={name:"embla-carousel",version:"9.0.0-rc04",author:"David Jerleke",description:"A lightweight carousel library with fluid motion and great swipe precision",repository:{type:"git",url:"git+https://github.com/davidjerleke/embla-carousel"},bugs:{url:"https://github.com/davidjerleke/embla-carousel/issues"},homepage:"https://www.embla-carousel.com",license:"MIT",keywords:["slider","carousel","slideshow","gallery","lightweight","touch","javascript","typescript","react","vue","svelte","solid"],main:"embla-carousel.umd.js",unpkg:"embla-carousel.umd.js",module:"./esm/embla-carousel.esm.js",types:"index.d.ts",sideEffects:!1,files:["embla-carousel*","components/**/*","index.d.ts","esm/**/*","cjs/**/*"],scripts:{test:"jest --config jest.config.js",build:"rollup --bundleConfigAsCjs -c",start:"rollup --bundleConfigAsCjs -c --watch --environment BUILD:development","eslint:report":'eslint "src/**/*.{js,tsx,ts}"'},devDependencies:{"@types/jest":"^29.5.6",jest:"^29.5.0","jest-environment-jsdom":"^29.5.0",prettier:"2.8.8",rollup:"^4.61.1","ts-jest":"^29.1.1",typescript:"^5.2.2"},exports:{"./package.json":"./package.json",".":{import:{types:"./esm/index.d.ts",default:"./esm/embla-carousel.esm.js"},require:{types:"./cjs/index.d.ts",default:"./cjs/embla-carousel.cjs.js"}}}}},741790,(e,t,i)=>{!function(){"use strict";var e={114:function(e){function t(e){if("string"!=typeof e)throw TypeError("Path must be a string. Received "+JSON.stringify(e))}function i(e,t){for(var i,s="",a=0,r=-1,n=0,o=0;o<=e.length;++o){if(o<e.length)i=e.charCodeAt(o);else if(47===i)break;else i=47;if(47===i){if(r===o-1||1===n);else if(r!==o-1&&2===n){if(s.length<2||2!==a||46!==s.charCodeAt(s.length-1)||46!==s.charCodeAt(s.length-2)){if(s.length>2){var l=s.lastIndexOf("/");if(l!==s.length-1){-1===l?(s="",a=0):a=(s=s.slice(0,l)).length-1-s.lastIndexOf("/"),r=o,n=0;continue}}else if(2===s.length||1===s.length){s="",a=0,r=o,n=0;continue}}t&&(s.length>0?s+="/..":s="..",a=2)}else s.length>0?s+="/"+e.slice(r+1,o):s=e.slice(r+1,o),a=o-r-1;r=o,n=0}else 46===i&&-1!==n?++n:n=-1}return s}var s={resolve:function(){for(var e,s,a="",r=!1,n=arguments.length-1;n>=-1&&!r;n--)n>=0?s=arguments[n]:(void 0===e&&(e=""),s=e),t(s),0!==s.length&&(a=s+"/"+a,r=47===s.charCodeAt(0));if(a=i(a,!r),r)if(a.length>0)return"/"+a;else return"/";return a.length>0?a:"."},normalize:function(e){if(t(e),0===e.length)return".";var s=47===e.charCodeAt(0),a=47===e.charCodeAt(e.length-1);return(0!==(e=i(e,!s)).length||s||(e="."),e.length>0&&a&&(e+="/"),s)?"/"+e:e},isAbsolute:function(e){return t(e),e.length>0&&47===e.charCodeAt(0)},join:function(){if(0==arguments.length)return".";for(var e,i=0;i<arguments.length;++i){var a=arguments[i];t(a),a.length>0&&(void 0===e?e=a:e+="/"+a)}return void 0===e?".":s.normalize(e)},relative:function(e,i){if(t(e),t(i),e===i||(e=s.resolve(e))===(i=s.resolve(i)))return"";for(var a=1;a<e.length&&47===e.charCodeAt(a);++a);for(var r=e.length,n=r-a,o=1;o<i.length&&47===i.charCodeAt(o);++o);for(var l=i.length-o,c=n<l?n:l,u=-1,d=0;d<=c;++d){if(d===c){if(l>c){if(47===i.charCodeAt(o+d))return i.slice(o+d+1);else if(0===d)return i.slice(o+d)}else n>c&&(47===e.charCodeAt(a+d)?u=d:0===d&&(u=0));break}var p=e.charCodeAt(a+d);if(p!==i.charCodeAt(o+d))break;47===p&&(u=d)}var S="";for(d=a+u+1;d<=r;++d)(d===r||47===e.charCodeAt(d))&&(0===S.length?S+="..":S+="/..");return S.length>0?S+i.slice(o+u):(o+=u,47===i.charCodeAt(o)&&++o,i.slice(o))},_makeLong:function(e){return e},dirname:function(e){if(t(e),0===e.length)return".";for(var i=e.charCodeAt(0),s=47===i,a=-1,r=!0,n=e.length-1;n>=1;--n)if(47===(i=e.charCodeAt(n))){if(!r){a=n;break}}else r=!1;return -1===a?s?"/":".":s&&1===a?"//":e.slice(0,a)},basename:function(e,i){if(void 0!==i&&"string"!=typeof i)throw TypeError('"ext" argument must be a string');t(e);var s,a=0,r=-1,n=!0;if(void 0!==i&&i.length>0&&i.length<=e.length){if(i.length===e.length&&i===e)return"";var o=i.length-1,l=-1;for(s=e.length-1;s>=0;--s){var c=e.charCodeAt(s);if(47===c){if(!n){a=s+1;break}}else -1===l&&(n=!1,l=s+1),o>=0&&(c===i.charCodeAt(o)?-1==--o&&(r=s):(o=-1,r=l))}return a===r?r=l:-1===r&&(r=e.length),e.slice(a,r)}for(s=e.length-1;s>=0;--s)if(47===e.charCodeAt(s)){if(!n){a=s+1;break}}else -1===r&&(n=!1,r=s+1);return -1===r?"":e.slice(a,r)},extname:function(e){t(e);for(var i=-1,s=0,a=-1,r=!0,n=0,o=e.length-1;o>=0;--o){var l=e.charCodeAt(o);if(47===l){if(!r){s=o+1;break}continue}-1===a&&(r=!1,a=o+1),46===l?-1===i?i=o:1!==n&&(n=1):-1!==i&&(n=-1)}return -1===i||-1===a||0===n||1===n&&i===a-1&&i===s+1?"":e.slice(i,a)},format:function(e){var t,i;if(null===e||"object"!=typeof e)throw TypeError('The "pathObject" argument must be of type Object. Received type '+typeof e);return t=e.dir||e.root,i=e.base||(e.name||"")+(e.ext||""),t?t===e.root?t+i:t+"/"+i:i},parse:function(e){t(e);var i,s={root:"",dir:"",base:"",ext:"",name:""};if(0===e.length)return s;var a=e.charCodeAt(0),r=47===a;r?(s.root="/",i=1):i=0;for(var n=-1,o=0,l=-1,c=!0,u=e.length-1,d=0;u>=i;--u){if(47===(a=e.charCodeAt(u))){if(!c){o=u+1;break}continue}-1===l&&(c=!1,l=u+1),46===a?-1===n?n=u:1!==d&&(d=1):-1!==n&&(d=-1)}return -1===n||-1===l||0===d||1===d&&n===l-1&&n===o+1?-1!==l&&(0===o&&r?s.base=s.name=e.slice(1,l):s.base=s.name=e.slice(o,l)):(0===o&&r?(s.name=e.slice(1,n),s.base=e.slice(1,l)):(s.name=e.slice(o,n),s.base=e.slice(o,l)),s.ext=e.slice(n,l)),o>0?s.dir=e.slice(0,o-1):r&&(s.dir="/"),s},sep:"/",delimiter:":",win32:null,posix:null};s.posix=s,e.exports=s}},i={};function s(t){var a=i[t];if(void 0!==a)return a.exports;var r=i[t]={exports:{}},n=!0;try{e[t](r,r.exports,s),n=!1}finally{n&&delete i[t]}return r.exports}s.ab="/ROOT/node_modules/next/dist/compiled/path-browserify/",t.exports=s(114)}()},202623,e=>{"use strict";e.s(["arrayFromNumber",0,function(e){return Array.from(Array(e).keys())},"arrayHasItems",0,function(e,t){return!!Array.isArray(e)&&e.length>(t??0)}])},542336,e=>{"use strict";e.s(["getIsDocsStartPage",()=>l,"getPathnameForVersion",()=>o,"getVersionFromPathname",()=>n,"joinSlugs",()=>a,"prefixSlugWithDocs",()=>r]),e.i(741790);var t=e.i(202623),i=e.i(343869);let s=/^\/|\/$/g;function a(e,...i){let r=[e,...i].filter(Boolean).map(e=>e.replace(s,""));return(0,t.arrayHasItems)(r)?r.join("/"):e}function r(e){let t=e||"";return t.startsWith("/docs")?t:t?"/"+a("docs",t):"/docs"}function n(e){let t=RegExp(`${r("")}/v\\d+/?`),s=((e||"").match(t)?.[0]||"").replace(/\/$/,"");return i.DOCS_VERSIONS.find(({SLUG:e})=>e===s)||i.DOCS_LATEST_VERSION}function o(e,t){let s;return r(a(t===i.DOCS_LATEST_VERSION.MAJOR?"":`v${t}`,...(s=e||""||"").startsWith("/docs")?s.replace(c,"").split("/").filter(Boolean):[]))}function l(e){let t=(e||"").split("/").filter(Boolean).pop()||"";return/docs$/.test(t)||/v\d+$/.test(t)}let c=/^\/docs(?:\/v\d+)?/},343869,e=>{"use strict";e.s(["DOCS_LATEST_VERSION",()=>l,"DOCS_VERSIONS",()=>c,"GLOBAL_DATA",()=>u]);var t=e.i(193451),i=e.i(32957),s=e.i(542336);let a=t.default.repository.url.replace(/^(git\+)/,""),[r,n]=a.replace("https://github.com/","").split("/"),o={GITHUB_ROOT:a,GITHUB_DOCUMENTATION:(0,s.joinSlugs)(a,"blob","master"),GITHUB_PACKAGES:(0,s.joinSlugs)(a,"tree","master","packages"),GITHUB_SPONSORS_PAGE:(0,s.joinSlugs)("https://github.com/sponsors",r),ALGOLIA_DOCSEARCH:"https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js",NPM_PACKAGE:(0,s.joinSlugs)("https://www.npmjs.com/package",n),CODESANDBOX_DEFINE:"https://codesandbox.io/api/v1/sandboxes/define"},l={NAME:t.default.version,MAJOR:Number(t.default.version.split(".")[0]),SLUG:(0,s.prefixSlugWithDocs)(""),SUFFIX:"latest"},c=[l,{NAME:"8.6.0",MAJOR:8,SLUG:(0,s.prefixSlugWithDocs)("v8"),SUFFIX:"stable"}],u={TITLE:t.default.name.split("-").map(e=>(0,i.capitalizeFirstLetter)(e)).join(" "),DESCRIPTION:t.default.description,AUTHOR:t.default.author,HOME_PAGE:d(),SHARE_IMAGE:(0,s.joinSlugs)(d(),"share-image.png"),MASKABLE_ICON:(0,s.joinSlugs)(d(),"maskable.png"),URLS:o};function d(){return t.default.homepage}},930877,e=>{"use strict";e.s(["isBrowser",0,function(){return!!window.document?.createElement}])},808758,e=>{"use strict";var t=e.i(164645),i=e.i(350437);let s={currentTheme:i.THEME_KEYS.LIGHT},a=(0,t.createSlice)({name:"theme",initialState:s,reducers:{setTheme:(e,t)=>{e.currentTheme=t.payload},toggleTheme:e=>{let t=e.currentTheme===i.THEME_KEYS.LIGHT?i.THEME_KEYS.DARK:i.THEME_KEYS.LIGHT;e.currentTheme=t}}}),{name:r,reducer:n}=a,{setTheme:o,toggleTheme:l}=a.actions;e.s(["selectTheme",0,function(e){return e.theme.currentTheme},"setTheme",0,o,"themeName",0,r,"themeReducer",0,n,"toggleTheme",0,l])},700810,e=>{"use strict";e.s(["styledComponentsStylesToString",0,function(...e){return e.reduce((e,t)=>e+t.join(""),"")}])},277260,e=>{e.q("/_next/static/media/embla-logo-light-theme.32b9m6v-dz078.svg")},999995,e=>{e.q("/_next/static/media/embla-logo-dark-theme.1jjrpuh3f5hwp.svg")},730371,e=>{e.q("/_next/static/media/embla-logo-light-theme-blur.0qq9-ohp0sqf3.svg")},406504,e=>{e.q("/_next/static/media/embla-logo-dark-theme-blur.3xbd75dfz1tq0.svg")},857355,e=>{"use strict";var t=e.i(843476),i=e.i(271645),s=e.i(997053);let a={src:e.i(277260).default,width:160,height:160,blurWidth:0,blurHeight:0},r={src:e.i(999995).default,width:160,height:160,blurWidth:0,blurHeight:0},n={src:e.i(730371).default,width:160,height:160,blurWidth:0,blurHeight:0},o={src:e.i(406504).default,width:160,height:160,blurWidth:0,blurHeight:0};var l=e.i(343869),c=e.i(350437),u=e.i(907827),d=e.i(989023);let p=s.default.div.withConfig({displayName:"SiteLogo__SiteLogoWrapper",componentId:"sc-f85e6015-0"})`
  width: 100%;
  position: relative;
  &:before {
    content: '';
    display: block;
    padding-bottom: 100%;
    width: 100%;
  }
`,S=s.css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  text-indent: 100%;
  white-space: nowrap;
  overflow: hidden;
  z-index: ${u.LAYERS.STEP};
`,m=s.css`
  opacity: ${({$opacity:e})=>e};
  transition: opacity 1s;
`,_=s.default.img.withConfig({displayName:"SiteLogo__LogoLightImage",componentId:"sc-f85e6015-1"})`
  ${S};
`,E=s.default.img.withConfig({displayName:"SiteLogo__LogoDarkImage",componentId:"sc-f85e6015-2"})`
  ${S};
`,h=(0,s.default)(d.Icon).withConfig({displayName:"SiteLogo__LogoLightIcon",componentId:"sc-f85e6015-3"})`
  ${S};
  ${m};
`,g=(0,s.default)(d.Icon).withConfig({displayName:"SiteLogo__LogoDarkIcon",componentId:"sc-f85e6015-4"})`
  ${S};
  ${m};
`,f={default:{[c.THEME_KEYS.LIGHT]:a.src,[c.THEME_KEYS.DARK]:r.src},blur:{[c.THEME_KEYS.LIGHT]:n.src,[c.THEME_KEYS.DARK]:o.src}},b={default:{[c.THEME_KEYS.LIGHT]:"emblaLightDefault",[c.THEME_KEYS.DARK]:"emblaDarkDefault"},blur:{[c.THEME_KEYS.LIGHT]:"emblaLightBlur",[c.THEME_KEYS.DARK]:"emblaDarkBlur"}};e.s(["LogoDarkIcon",0,g,"LogoDarkImage",0,E,"LogoLightIcon",0,h,"LogoLightImage",0,_,"SiteLogo",0,function(e){let{appearance:s,...a}=e,{TITLE:r}=l.GLOBAL_DATA,[n,o]=(0,i.useState)(!1),c=s||"default",u=b[c].light,d=b[c].dark,S=n?"0":"1",m=(0,i.useRef)(null),A=(0,i.useRef)(null),O=`An illustrated atom like body which is the logotype of ${r}`;return(0,i.useEffect)(()=>{let e=m.current,t=A.current;e?.complete&&t?.complete&&o(!0)},[]),(0,t.jsxs)(p,{...a,children:[(0,t.jsx)(h,{svg:u,fill:void 0,$opacity:S}),(0,t.jsx)(g,{svg:d,fill:void 0,$opacity:S}),(0,t.jsx)(_,{ref:m,src:f[c].light,alt:O,onLoad:()=>o(!0)}),(0,t.jsx)(E,{ref:A,src:f[c].dark,alt:O,onLoad:()=>o(!0)})]})}],857355)},25110,e=>{"use strict";var t=e.i(843476),i=e.i(271645),s=e.i(997053),a=e.i(109950),r=e.i(224583),n=e.i(380999),o=e.i(808758),l=e.i(350437),c=e.i(989023);let u="3rem",d="2rem",p=(0,s.default)(r.ButtonBare).withConfig({displayName:"ThemeToggle__ThemeToggleWrapper",componentId:"sc-780f52fc-0"})`
  ${(0,n.createSquareSizeStyles)(u)};
  color: ${l.COLORS.TEXT_HIGH_CONTRAST};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: calc((${u} - ${d}) / 2 * -1);
  margin-left: calc((${u} - ${d}) / 2 * -1);
`,S=s.css`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
`,m=(0,s.default)(c.Icon).withConfig({displayName:"ThemeToggle__LightThemeSvg",componentId:"sc-780f52fc-1"})`
  ${S};
`,_=(0,s.default)(c.Icon).withConfig({displayName:"ThemeToggle__DarkThemeSvg",componentId:"sc-780f52fc-2"})`
  ${S};
`;e.s(["DarkThemeSvg",0,_,"LightThemeSvg",0,m,"ThemeToggle",0,function(e){let{children:s,...r}=e,n=(0,a.useAppSelector)(o.selectTheme)===l.THEME_KEYS.LIGHT?l.THEME_KEYS.DARK:l.THEME_KEYS.LIGHT,c=(0,a.useAppDispatch)(),u=(0,i.useCallback)(()=>{c((0,o.toggleTheme)())},[c]);return(0,t.jsxs)(p,{type:"button",onClick:u,"aria-label":`Activate ${n} theme`,...r,children:[s,(0,t.jsx)(_,{svg:"moon",size:d}),(0,t.jsx)(m,{svg:"sun",size:d})]})}])},313313,e=>{"use strict";var t=e.i(843476),i=e.i(997053),s=e.i(350437),a=e.i(671249);let r=i.default.div.withConfig({displayName:"HeaderGradient__GradientWrapper",componentId:"sc-7c5282d0-0"})`
  position: relative;
`,n=i.default.span.withConfig({displayName:"HeaderGradient__GradientLine",componentId:"sc-7c5282d0-1"})`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${a.BORDER_SIZES.OUTLINE};
  background: linear-gradient(
    to right,
    transparent,
    ${s.COLORS.BRAND_SECONDARY} 39.5%,
    transparent
  );
`,o=i.default.div.withConfig({displayName:"HeaderGradient__GradientDropShadow",componentId:"sc-7c5282d0-2"})`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5.5rem;
  background: linear-gradient(to bottom, ${s.COLORS.BRAND_PRIMARY}, transparent);
  pointer-events: none;
`;e.s(["GradientDropShadow",0,o,"HeaderGradient",0,function(){return(0,t.jsxs)(r,{"aria-hidden":!0,children:[(0,t.jsx)(n,{}),(0,t.jsx)(o,{})]})}])},658339,e=>{"use strict";var t=e.i(350437),i=e.i(925866),s=e.i(997053),a=e.i(25110),r=e.i(857355),n=e.i(313313);let o="62.5%",l=s.css`
  html {
    background-color: ${t.COLORS.BACKGROUND_SITE};
    font-size: ${o};
  }
  body {
    background-color: ${t.COLORS.BACKGROUND_SITE};
    color: ${t.COLORS.TEXT_HIGH_CONTRAST};
    font-size: ${i.FONT_SIZES.BODY};
    line-height: 1.65;
  }
`,c=s.css`
  html {
    font-family: 'system-ui', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji',
      'Segoe UI Emoji', 'Segoe UI Symbol';
    letter-spacing: -0.02rem;
  }

  html {
    font-family: 'Inter var', 'system-ui', -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji',
      'Segoe UI Emoji', 'Segoe UI Symbol';
  }
`,u=s.css`
  .${t.THEME_CLASSNAME_LIGHT} {
    color-scheme: ${t.THEME_KEYS.LIGHT};

    ${r.LogoDarkIcon}, ${r.LogoDarkImage}, ${a.LightThemeSvg} {
      display: none;
    }

    ${n.GradientDropShadow} {
      opacity: 0.05;
    }
  }
  .${t.THEME_CLASSNAME_DARK} {
    color-scheme: ${t.THEME_KEYS.DARK};

    ${r.LogoLightIcon}, ${r.LogoLightImage}, ${a.DarkThemeSvg} {
      display: none;
    }

    ${n.GradientDropShadow} {
      opacity: 0.1;
    }
  }
`,d=s.css`
  html {
    box-sizing: border-box;
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html,
  body,
  p,
  ol,
  ul,
  li,
  dl,
  dt,
  dd,
  blockquote,
  figure,
  fieldset,
  legend,
  textarea,
  pre,
  iframe,
  hr,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    padding: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 100%;
    font-weight: ${i.FONT_WEIGHTS.NORMAL};
  }

  ul {
    list-style: none;
  }

  :root {
    -moz-tab-size: 4;
    tab-size: 4;
  }

  hr {
    height: 0;
  }

  abbr[title] {
    text-decoration: underline dotted;
  }

  b,
  strong {
    font-weight: bolder;
  }

  code,
  kbd,
  samp,
  pre {
    font-family: SFMono-Regular, Consolas, 'Liberation Mono', Menlo, Courier,
      monospace;
    font-size: 1em;
  }

  small {
    font-size: 80%;
  }

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sub {
    bottom: -0.25em;
    top: -0.5em;
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
  }

  button,
  select {
    text-transform: none;
  }

  button,
  [type='button'],
  [type='reset'],
  [type='submit'] {
    -webkit-appearance: none;
    appearance: none;
  }

  button::-moz-focus-inner,
  [type='button']::-moz-focus-inner,
  [type='reset']::-moz-focus-inner,
  [type='submit']::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  button:-moz-focusring,
  [type='button']:-moz-focusring,
  [type='reset']:-moz-focusring,
  [type='submit']:-moz-focusring {
    outline: 1px dotted ButtonText;
  }

  img,
  embed,
  iframe,
  object,
  audio,
  video {
    height: auto;
    max-width: 100%;
  }
`;e.s(["BASE_FONT_STYLES",0,o,"BASE_STYLES",0,l,"FONT_STYLES",0,c,"RESET_STYLES",0,d,"THEME_STYLES",0,u])},602545,e=>{"use strict";var t=e.i(997053),i=e.i(907827),s=e.i(350437),a=e.i(801770),r=e.i(671249),n=e.i(925866),o=e.i(380999),l=e.i(700810),c=e.i(166734),u=e.i(266349),d=e.i(772798);let p="48rem",S="19rem",m="1rem",_="22.2rem",E="3.6rem",h="1.8rem",g="2.5rem",f="0.6rem",b=s.COLORS.BRAND_PRIMARY,A=t.css`
  border-radius: ${r.BORDER_RADIUSES.SOFT};
`,O=t.css`
  border: ${r.BORDER_SIZES.OUTLINE} solid ${s.COLORS.DETAIL_MEDIUM_CONTRAST};
`,T=t.css`
  display: block;
  height: var(--slide-height);
  width: 100%;
  object-fit: cover;
`,R=t.css`
  ${c.TAP_HIGHLIGHT_STYLES};
  -webkit-appearance: none;
  appearance: none;
  background-color: transparent;
  touch-action: manipulation;
  display: inline-flex;
  text-decoration: none;
  cursor: pointer;
  border: 0;
  padding: 0;
  margin: 0;
`,L=t.css`
  ${c.TAP_HIGHLIGHT_STYLES};
  ${R};
  ${O};
  ${A};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${s.COLORS.TEXT_BODY};
  font-weight: ${n.FONT_WEIGHTS.BOLD};
  font-size: ${n.FONT_SIZES.COMPLEMENTARY};
  padding: 0 ${a.SPACINGS.FOUR};
  min-height: ${E};
`,I=t.css`
  .embla__text-input {
    ${c.TAP_HIGHLIGHT_STYLES};
    -webkit-appearance: none;
    appearance: none;
    touch-action: manipulation;
    color: ${s.COLORS.TEXT_BODY};
    background-color: ${s.COLORS.BACKGROUND_CODE};
    border: ${r.BORDER_SIZES.DETAIL} solid ${s.COLORS.DETAIL_LOW_CONTRAST};
    padding: ${a.SPACINGS.ONE} ${a.SPACINGS.ONE};
    font-size: ${n.FONT_SIZES.BODY};
    min-height: ${E};
    text-align: center;
  }

  .embla__text-input {
    -moz-appearance: textfield;
  }

  .embla__text-input::-webkit-inner-spin-button,
  .embla__text-input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`,v=t.css`
  ${I};

  .embla__text-form {
    display: flex;
    justify-content: space-between;
    gap: ${a.SPACINGS.TWO};
    margin-bottom: ${h};
    font-size: ${n.FONT_SIZES.COMPLEMENTARY};
  }

  .embla__text-form__label {
    display: flex;
    align-items: center;
    gap: ${a.SPACINGS.ONE};
    font-weight: ${n.FONT_WEIGHTS.SEMI_BOLD};
  }

  .embla__text-form__submit {
    ${L};
    padding: 0 ${a.SPACINGS.THREE};
  }
`,x=t.css`
  .embla__radio-form {
    min-height: ${E};
    display: flex;
    align-items: center;
    font-size: ${n.FONT_SIZES.COMPLEMENTARY};
  }

  .embla__radio-wrapper {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .embla__radio-input__wrapper {
    flex: 0 0 ${g};
    position: relative;
    min-width: 0;
    margin-right: ${a.SPACINGS.ONE};
  }

  .embla__radio-input__line-height {
    color: ${s.COLORS.BACKGROUND_SITE};
    width: ${g};
    display: inline-block;
    line-height: inherit;
  }

  .embla__radio-form__label {
    display: flex;
    align-items: center;
    font-size: ${n.FONT_SIZES.COMPLEMENTARY};
    font-weight: ${n.FONT_WEIGHTS.SEMI_BOLD};
    gap: ${a.SPACINGS.ONE};
  }

  .embla__radio-wrapper input {
    ${c.TAP_HIGHLIGHT_STYLES};
    ${(0,o.createSquareSizeStyles)(g)};
    ${c.TAP_HIGHLIGHT_STYLES};
    -webkit-appearance: none;
    appearance: none;
    touch-action: manipulation;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    background-color: ${s.COLORS.DETAIL_MEDIUM_CONTRAST};
    cursor: pointer;
    border-radius: ${r.BORDER_RADIUSES.CIRCLE};

    &:before,
    &:after {
      border-radius: ${r.BORDER_RADIUSES.CIRCLE};
      display: block;
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    &:before {
      ${(0,o.createSquareSizeStyles)("2rem")};
      background-color: ${s.COLORS.BACKGROUND_CODE};
    }

    &:after {
      ${(0,o.createSquareSizeStyles)("1.2rem")};
    }

    &:checked {
      &:after {
        ${u.BRAND_GRADIENT_BACKGROUND_STYLES};
      }
    }

    &[disabled] {
      cursor: not-allowed;
    }

    &[disabled]:checked {
      &:after {
        background-image: none;
        background-color: ${s.COLORS.DETAIL_HIGH_CONTRAST};
      }
    }
  }
`,y=t.css`
  ${x};

  .embla__radio-form {
    display: flex;
    gap: ${a.SPACINGS.TWO};
    margin-bottom: ${h};
  }

  .embla__text-form__label {
    display: flex;
    align-items: center;
    font-size: ${n.FONT_SIZES.COMPLEMENTARY};
    font-weight: ${n.FONT_WEIGHTS.SEMI_BOLD};
    gap: ${a.SPACINGS.ONE};
  }
`,C=t.css`
  .embla__viewport {
    position: relative;
  }

  .embla__align-indicator {
    position: absolute;
    pointer-events: none;
    top: 10%;
    bottom: 10%;
    width: 0.8rem;
    opacity: 0.8;
    border-radius: ${r.BORDER_RADIUSES.CARD};
    ${u.BRAND_GRADIENT_BACKGROUND_STYLES};
    border: ${r.BORDER_SIZES.OUTLINE} solid ${s.COLORS.BACKGROUND_SITE};

    &:after {
      display: block;
      content: '';
      position: absolute;
      border-radius: ${r.BORDER_RADIUSES.CARD};
      border: ${r.BORDER_SIZES.OUTLINE} solid ${s.COLORS.TEXT_BODY};
      top: -${r.BORDER_SIZES.ACCENT_VERTICAL};
      bottom: -${r.BORDER_SIZES.ACCENT_VERTICAL};
      left: -${r.BORDER_SIZES.ACCENT_VERTICAL};
      right: -${r.BORDER_SIZES.ACCENT_VERTICAL};
    }
  }

  .embla__align-indicator--start {
    left: ${r.BORDER_SIZES.OUTLINE};
  }

  .embla__align-indicator--center {
    left: 50%;
    transform: translateX(-50%);
  }

  .embla__align-indicator--end {
    right: ${r.BORDER_SIZES.OUTLINE};
  }
`,$=t.css`
  .embla__slide {
    position: relative;
  }

  .embla__group__indicator {
    display: block;
    pointer-events: none;
    position: absolute;
    top: 0;
    bottom: 0;
  }

  .embla__group__indicator--start {
    left: var(--slide-spacing);
    right: 0;
    border-top: ${f} solid ${b};
    border-bottom: ${f} solid ${b};
    border-left: ${f} solid ${b};
  }

  .embla__group__indicator--end {
    left: 0;
    right: 0;
    border-top: ${f} solid ${b};
    border-bottom: ${f} solid ${b};
    border-right: ${f} solid ${b};
  }

  .embla__group__indicator--center {
    left: 0;
    right: 0;
    border-top: ${f} solid ${b};
    border-bottom: ${f} solid ${b};
  }

  .embla__group__indicator--single {
    left: var(--slide-spacing);
    right: 0px;
    border: ${f} solid ${b};
  }

  .embla--group-indicator-hidden .embla__group__indicator {
    display: none;
  }
`,k=t.css`
  .embla {
    max-width: ${p};
    margin: auto;

    --slide-height: ${S};
    --slide-spacing: 1rem;
    --slide-size: 100%;
  }

  .embla__viewport {
    overflow: hidden;
  }

  .embla__container {
    display: flex;
    touch-action: pan-y pinch-zoom;
    margin-left: calc(var(--slide-spacing) * -1);
  }

  .embla__slide {
    transform: translate3d(0, 0, 0);
    flex: 0 0 var(--slide-size);
    min-width: 0;
    padding-left: var(--slide-spacing);
  }
`,N=t.css`
  .embla {
    max-width: ${p};
    margin: auto;

    --slide-height: ${S};
    --slide-spacing: 1rem;
    --slide-size: 100%;
  }

  .embla__viewport {
    overflow: hidden;
  }

  .embla__container {
    display: flex;
    touch-action: pan-x pinch-zoom;
    margin-top: calc(var(--slide-spacing) * -1);
    height: calc(var(--slide-spacing) + var(--slide-height));
    flex-direction: column;
  }

  .embla__slide {
    transform: translate3d(0, 0, 0);
    flex: 0 0 var(--slide-size);
    min-height: 0;
    padding-top: var(--slide-spacing);
  }
`,j=t.css`
  .embla__slide__number {
    ${O};
    ${A};
    font-size: ${n.FONT_SIZES.CUSTOM(()=>4)};
    font-weight: ${n.FONT_WEIGHTS.SEMI_BOLD};
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--slide-height);
    user-select: none;
  }
`,D=t.css`
  .embla__slide__img {
    ${T};
  }
`,w=t.css`
  .embla__slide__img {
    ${T};
    ${A};
  }
`,P=t.css`
  .embla__controls {
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    gap: ${a.SPACINGS.TWO};
    margin-top: ${h};
  }
`,G=t.css`
  .embla__buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${a.SPACINGS.ONE};
    align-items: center;
  }

  .embla__button {
    ${R};
    ${O};
    ${(0,o.createSquareSizeStyles)(E)}
    z-index: ${i.LAYERS.STEP};
    border-radius: ${r.BORDER_RADIUSES.CIRCLE};
    color: ${s.COLORS.TEXT_BODY};
    display: flex;
    align-items: center;
    justify-content: center;
    transform: rotate(0deg);
  }

  .embla__button--disabled {
    color: ${s.COLORS.DETAIL_HIGH_CONTRAST};
  }

  .embla__button__svg {
    ${(0,o.createSquareSizeStyles)("35%")}
  }
`,M=t.css`
  .embla__dots {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: center;
    margin-right: calc((2.6rem - 1.4rem) / 2 * -1);
  }

  .embla__dot {
    ${R};
    ${(0,o.createSquareSizeStyles)("2.6rem")}
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: ${r.BORDER_RADIUSES.CIRCLE};
    position: relative;
  }

  .embla__dot:before,
  .embla__dot:after {
    ${(0,o.createSquareSizeStyles)("1.4rem")}
    border-radius: ${r.BORDER_RADIUSES.CIRCLE};
    position: absolute;
    display: flex;
    align-items: center;
    content: '';
  }

  .embla__dot:before {
    border: ${r.BORDER_SIZES.OUTLINE} solid ${s.COLORS.DETAIL_MEDIUM_CONTRAST};
  }

  .embla__dot:after {
    border: ${r.BORDER_SIZES.OUTLINE} solid ${s.COLORS.TEXT_BODY};
    opacity: 0;
  }

  .embla__dot--selected:after {
    opacity: 1;
  }
`,B=t.css`
  .embla__live-region {
    ${d.visuallyHiddenStyles};
  }
`,H=t.css`
  .embla__selected-snap-display {
    justify-self: flex-end;
    align-self: center;
    color: ${s.COLORS.TEXT_LOW_CONTRAST};
    font-weight: ${n.FONT_WEIGHTS.SEMI_BOLD};
  }
`,U=t.css`
  .embla__play {
    ${L};
    min-width: ${a.SPACINGS.FIFTEEN};
    justify-self: flex-end;
  }
`,z=t.css`
  .embla__progress {
    ${A};
    box-shadow: inset 0 0 0 ${r.BORDER_SIZES.OUTLINE}
      ${s.COLORS.DETAIL_MEDIUM_CONTRAST};
    background-color: ${s.COLORS.BACKGROUND_SITE};
    position: relative;
    height: 0.6rem;
    justify-self: flex-end;
    align-self: center;
    width: 13rem;
    max-width: 90%;
    overflow: hidden;
  }

  .embla__progress__bar {
    background-color: ${s.COLORS.TEXT_BODY};
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    left: -100%;
  }
`,W=t.css`
  .embla {
    position: relative;
    display: flex;
    width: 100%;
    height: ${_};
    max-width: 30rem;
    margin-left: auto;
    margin-right: auto;
  }

  .embla:before,
  .embla:after {
    position: absolute;
    left: 0;
    right: 0;
    content: '';
    display: block;
    height: calc(50% - 32px / 2);
    z-index: ${i.LAYERS.STEP};
    pointer-events: none;
  }

  .embla:before {
    top: -0.5px;
    border-bottom: 0.5px solid rgba(${s.COLORS.TEXT_HIGH_CONTRAST_RGB_VALUE}, 0.3);
    background: linear-gradient(
      to top,
      rgba(${s.COLORS.BACKGROUND_SITE_RGB_VALUE}, 0.65) 0%,
      rgba(${s.COLORS.BACKGROUND_SITE_RGB_VALUE}, 1) 100%
    );
  }

  .embla:after {
    bottom: -0.5px;
    border-top: 0.5px solid rgba(${s.COLORS.TEXT_HIGH_CONTRAST_RGB_VALUE}, 0.3);
    background: linear-gradient(
      to bottom,
      rgba(${s.COLORS.BACKGROUND_SITE_RGB_VALUE}, 0.65) 0%,
      rgba(${s.COLORS.BACKGROUND_SITE_RGB_VALUE}, 1) 100%
    );
  }

  .embla__ios-picker {
    height: 100%;
    display: flex;
    align-items: center;
    min-width: 50%;
    justify-content: center;
    line-height: 1;
    font-size: 1.8rem;
  }

  .embla__ios-picker__scene {
    min-width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    touch-action: pan-x;
  }

  .embla__ios-picker__viewport {
    height: 32px;
    width: 100%;
    perspective: 1000px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-touch-callout: none;
    -khtml-user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  .embla__ios-picker__viewport--perspective-left {
    perspective-origin: calc(50% + 130px) 50%;
    transform: translateX(27px);
  }

  .embla__ios-picker__viewport--perspective-right {
    perspective-origin: calc(50% - 130px) 50%;
    transform: translateX(-27px);
  }

  .embla__ios-picker__container {
    height: 100%;
    width: 100%;
    transform-style: preserve-3d;
    will-change: transform;
  }

  .embla__ios-picker__slide {
    width: 100%;
    height: 100%;
    font-size: 19px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    backface-visibility: hidden;
    opacity: 0;
  }

  .embla__ios-picker__label {
    font-weight: ${n.FONT_WEIGHTS.BOLD};
    transform: translateX(-55px);
    pointer-events: none;
  }
`,F=/--slide-size:\s*100%;/gi,Y=/--slide-spacing:\s*1rem;/gi,q=/height\s*:\s*var\(\s*--slide-height\s*\)\s*;?/,K=/transform\s*:\s*rotate\(0deg\)\s*;?/,V=/\.embla__slide__number\s*\{[\s\S]*?\bheight\s*:\s*var\(\s*--slide-height\s*\)\s*;?[\s\S]*?\}/,X=/\.embla__button\s*\{[\s\S]*?\btransform\s*:\s*rotate\(0deg\)\s*;?[\s\S]*?\}/;e.s(["ACCESSIBILITY_STYLES",0,B,"ALIGNMENT_INDICATOR_STYLES",0,C,"ARROWS_STYLES",0,G,"CAROUSEL_BORDER_STYLES",0,O,"CAROUSEL_BUTTON_BASE_STYLES",0,R,"CAROUSEL_CONTROLS_SPACING",0,h,"CAROUSEL_DEFAULT_HEIGHT",0,S,"CAROUSEL_IOS_PICKER_HEIGHT",0,_,"CAROUSEL_MAX_WIDTH",0,p,"CAROUSEL_NAV_BUTTON_SIZE",0,E,"CAROUSEL_SCROLLBAR_HEIGHT",0,"1.6rem","CAROUSEL_SCROLLBAR_SPACING",0,h,"CAROUSEL_SCROLLBAR_TRACK_HEIGHT",0,"0.6rem","CAROUSEL_SLIDE_RADIUS_STYLES",0,A,"CAROUSEL_THUMB_SLIDES_HEIGHT",0,"6rem","CAROUSEL_THUMB_SLIDES_SPACING",0,"0.8rem","CONTROLS_STYLES",0,P,"DOTS_STYLES",0,M,"GROUP_INDICATOR_STYLES",0,$,"IMAGE_ROUNDED_STYLES",0,w,"IMAGE_STYLES",0,D,"IOS_PICKER_STYLES",0,W,"PLAY_BUTTON_STYLES",0,U,"PROGRESS_STYLES",0,z,"RADIO_INPUT_FORM_STYLES",0,y,"SLIDE_NUMBER_STYLES",0,j,"SNAP_DISPLAY_STYLES",0,H,"TEXT_INPUT_FORM_STYLES",0,v,"examplesCarouselStyles",0,(e="100%",t=m,i={},s="",a="")=>{let r="y"!==i.axis,n="rtl"===i.direction;return((a||(0,l.styledComponentsStylesToString)(r?k:N))+s).replace(F,`--slide-size: ${e};`).replace(Y,`--slide-spacing: ${t};`).replace(V,e=>{let t=`height: ${r?"var(--slide-height)":"100%"};`;return e.replace(q,t)}).replace(X,e=>{let t="";r&&(t=n?"rotate(-180deg)":"rotate(0deg)"),r||(t="rotate(90deg)");let i=t?`transform: ${t};`:"";return e.replace(K,i)})}])},878612,e=>{"use strict";var t=e.i(997053),i=e.i(671249),s=e.i(350437),a=e.i(801770);let r=t.css`
  background-color: ${s.COLORS.BACKGROUND_CODE};
  border-radius: ${i.BORDER_RADIUSES.CARD};
`,n=a.SPACINGS.ONE;e.s(["CARD_SPACING",0,n,"CARD_STYLES",0,r])},174776,e=>{"use strict";var t=e.i(997053);e.s(["createGapStyles",0,function(e,i,s="*"){return t.css`
    ${e&&t.css`
      margin-left: -${e};
      > ${s} {
        padding-left: ${e};
      }
    `}

    ${i&&t.css`
      margin-bottom: -${i};

      > ${s} {
        padding-bottom: ${i};
      }
    `}
  `}])},747251,e=>{"use strict";var t=e.i(843476),i=e.i(997053),s=e.i(801770),a=e.i(350437),r=e.i(925866),n=e.i(923035),o=e.i(615632),l=e.i(266349),c=e.i(878612);let u=(0,i.default)(o.LinkBare).withConfig({displayName:"LinkCard__LinkCardWrapper",componentId:"sc-3a19ae4a-0"})`
  ${c.CARD_STYLES};
  padding: ${s.SPACINGS.FOUR};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`,d=i.default.div.withConfig({displayName:"LinkCard__ReadMoreText",componentId:"sc-3a19ae4a-1"})`
  ${n.IconWithTextText} {
    ${l.BRAND_GRADIENT_TEXT_STYLES};
    font-size: ${r.FONT_SIZES.COMPLEMENTARY};
    font-weight: ${r.FONT_WEIGHTS.MEDIUM};
  }

  svg {
    color: ${a.COLORS.BRAND_SECONDARY};
  }
`;e.s(["LinkCard",0,function(e){let{children:i,...s}=e;return(0,t.jsxs)(u,{...s,children:[i,(0,t.jsx)(d,{children:(0,t.jsx)(n.IconWithText,{iconSvg:"arrowRight",iconSide:"right",children:"Read more"})})]})}])},371728,e=>{"use strict";var t=e.i(843476),i=e.i(271645);e.s(["TabsItem",0,function(e){return(0,t.jsx)(i.default.Fragment,{...e})}])},405213,e=>{"use strict";var t=e.i(843476),i=e.i(997053),s=e.i(615632),a=e.i(266349),r=e.i(925866);let n=i.css`
  ${a.BRAND_GRADIENT_TEXT_STYLES};
  display: inline-block;
  font-weight: ${r.FONT_WEIGHTS.MEDIUM};
`,o=(0,i.default)(s.LinkBare).withConfig({displayName:"LinkContent__LinkContentWrapper",componentId:"sc-aecb113e-0"})`
  ${n};
`;e.s(["LinkContent",0,function(e){return(0,t.jsx)(o,{...e})},"linkContentStyles",0,n])},431480,e=>{"use strict";var t=e.i(997053),i=e.i(506390),s=e.i(728191);let a=t.css`
  ${i.MEDIA.MAX_XS} {
    width: calc(100% + ${s.PAGE_FRAME_SPACING} * 2);
    margin-left: -${s.PAGE_FRAME_SPACING};
    margin-right: -${s.PAGE_FRAME_SPACING};
  }
`;e.s(["pageFrameCollapseStyles",0,a])},236420,e=>{"use strict";var t=e.i(843476),i=e.i(997053),s=e.i(671249),a=e.i(350437),r=e.i(380999);let n=i.default.span.withConfig({displayName:"LoadSpinner__LoadSpinnerWrapper",componentId:"sc-49e3603d-0"})`
  ${({$size:e})=>(0,r.createSquareSizeStyles)(e)}
  display: inline-flex;
  position: relative;

  > span {
    ${({$size:e,$thickness:t,$color:s})=>i.css`
      ${(0,r.createSquareSizeStyles)(e)}
      border: ${t} solid ${s};
      border-color: ${s} transparent transparent transparent;
    `}
    display: block;
    position: absolute;
    border-radius: ${s.BORDER_RADIUSES.CIRCLE};
    animation: rotate 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  }

  > span:nth-child(1) {
    animation-delay: -0.45s;
  }
  > span:nth-child(2) {
    animation-delay: -0.3s;
  }
  > span:nth-child(3) {
    animation-delay: -0.15s;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;e.s(["LoadSpinner",0,function(e){let{size:i="3rem",thickness:s="0.2rem",color:r=a.COLORS.DETAIL_HIGH_CONTRAST,...o}=e;return(0,t.jsxs)(n,{$size:i,$thickness:s,$color:r,...o,children:[(0,t.jsx)("span",{}),(0,t.jsx)("span",{}),(0,t.jsx)("span",{}),(0,t.jsx)("span",{})]})}])},38817,e=>{"use strict";var t=e.i(930877);let i="portal-root";e.s(["MODALS",0,{MAIN_NAVIGATION:"main-navigation",SIDEBAR_NAVIGATION:"sidebar-navigation",SITE_SEARCH:"site-search",EDIT_CODE:e=>`edit-code-${e}`},"MODAL_CLOSE_KEYS",0,["Escape","Esc"],"MODAL_SEARCH_TOGGLE_KEYS_1",0,["Control","k"],"MODAL_SEARCH_TOGGLE_KEYS_2",0,["Meta","k"],"getExistingOrCreatePortalWrapper",0,function(){if(!(0,t.isBrowser)())return null;let e=document.getElementById(i);return e||((e=document.createElement("div")).id=i,document.body.appendChild(e)),e}])},784613,e=>{"use strict";let t=e.i(801770).SPACINGS.TEN;e.s(["HEADER_HEIGHT",0,t,"HEADER_ID",0,"site-header"])},651379,e=>{"use strict";var t=e.i(271645);e.s(["useEventListener",0,function(e,i,s,a){let r=(0,t.useRef)(i);(0,t.useEffect)(()=>{r.current=i},[i]),(0,t.useEffect)(()=>{let t=s?.current??window;if(!(t&&t.addEventListener))return;let i=e=>r.current(e);return t.addEventListener(e,i,a),()=>{t.removeEventListener(e,i)}},[e,s,a])}])},991790,350287,e=>{"use strict";var t=e.i(843476),i=e.i(271645),s=e.i(350437),a=e.i(997053),r=e.i(236420),n=e.i(380999),o=e.i(907827),l=e.i(671249),c=e.i(651379),u=e.i(784613),d=e.i(174080),p=e.i(930877),S=e.i(38817);function m(e){let{children:t}=e,s=(0,i.useRef)((0,S.getExistingOrCreatePortalWrapper)()),a=(0,i.useRef)((0,p.isBrowser)()?document.createElement("div"):null);return(0,i.useEffect)(()=>{if(s.current&&a.current)return s.current.appendChild(a.current),()=>{s.current&&a.current&&s.current.removeChild(a.current)}},[]),(0,d.createPortal)(t,a.current)}var _=e.i(728191);let E=a.default.div.withConfig({displayName:"LoadSpinnerSuspense__LoadSpinnerSuspenseWrapper",componentId:"sc-f4af42b6-0"})`
  background-color: rgba(${s.COLORS.BACKGROUND_SITE_RGB_VALUE}, 0.9);
  border-radius: ${l.BORDER_RADIUSES.CIRCLE};
  z-index: ${({$isPortal:e})=>e?o.LAYERS.MODAL_LOADING:o.LAYERS.STEP};
  ${(0,n.createSquareSizeStyles)("6rem")};
  top: calc(${u.HEADER_HEIGHT} + ${_.PAGE_FRAME_SPACING});
  position: ${({$isPortal:e})=>e?"fixed":"absolute"};
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({$opacity:e})=>e};
  transition: ${({$opacity:e})=>`opacity ${.6*(1!==e)}s`};
  box-shadow: 0 0 0 ${l.BORDER_SIZES.DETAIL} ${s.COLORS.DETAIL_LOW_CONTRAST};
  pointer-events: none;
`;function h(e){let{isVisible:a,usePortal:n}=e,[o,l]=(0,i.useState)(!1),[u,d]=(0,i.useState)(0),p=(0,i.useRef)(null),S=n??!0,_=S?m:i.default.Fragment,h=(0,i.useCallback)(()=>{u||l(!1)},[u]);return((0,i.useEffect)(()=>{d(a&&o?1:0)},[a,o]),(0,i.useEffect)(()=>{a&&l(!0)},[a]),(0,c.useEventListener)("transitionend",h,p),a||o)?(0,t.jsx)(_,{children:(0,t.jsx)(E,{$opacity:u,$isPortal:S,ref:p,children:(0,t.jsx)(r.LoadSpinner,{size:"4rem",color:s.COLORS.TEXT_BODY})})}):null}function g(e){let{setIsLoading:t}=e;return(0,i.useEffect)(()=>(t(!0),()=>{t(!1)}),[t]),null}e.s(["LoadSpinnerSuspense",0,h],350287),e.s(["LoadSpinnerWithSuspense",0,function(e){let[s,a]=(0,i.useState)(!1),{children:r,fallback:n,usePortal:o}=e;return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(h,{isVisible:s,usePortal:o}),(0,t.jsx)(i.Suspense,{fallback:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(g,{setIsLoading:a}),n&&n]}),children:r})]})}],991790)},705670,875421,e=>{"use strict";var t=e.i(271645);function i(){return(i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var s in i)Object.prototype.hasOwnProperty.call(i,s)&&(e[s]=i[s])}return e}).apply(this,arguments)}function s(e,t){return(s=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var a=new Map,r=new WeakMap,n=0,o=void 0;function l(e,t,i,s){if(void 0===i&&(i={}),void 0===s&&(s=o),void 0===window.IntersectionObserver&&void 0!==s){var l=e.getBoundingClientRect();return t(s,{isIntersecting:s,target:e,intersectionRatio:"number"==typeof i.threshold?i.threshold:0,time:0,boundingClientRect:l,intersectionRect:l,rootBounds:l}),function(){}}var c=function(e){var t=Object.keys(e).sort().filter(function(t){return void 0!==e[t]}).map(function(t){var i;return t+"_"+("root"===t?(i=e.root)?(r.has(i)||(n+=1,r.set(i,n.toString())),r.get(i)):"0":e[t])}).toString(),i=a.get(t);if(!i){var s,o=new Map,l=new IntersectionObserver(function(t){t.forEach(function(t){var i,a=t.isIntersecting&&s.some(function(e){return t.intersectionRatio>=e});e.trackVisibility&&void 0===t.isVisible&&(t.isVisible=a),null==(i=o.get(t.target))||i.forEach(function(e){e(a,t)})})},e);s=l.thresholds||(Array.isArray(e.threshold)?e.threshold:[e.threshold||0]),i={id:t,observer:l,elements:o},a.set(t,i)}return i}(i),u=c.id,d=c.observer,p=c.elements,S=p.get(e)||[];return p.has(e)||p.set(e,S),S.push(t),d.observe(e),function(){S.splice(S.indexOf(t),1),0===S.length&&(p.delete(e),d.unobserve(e)),0===p.size&&(d.disconnect(),a.delete(u))}}var c=["children","as","triggerOnce","threshold","root","rootMargin","onChange","skip","trackVisibility","delay","initialInView","fallbackInView"];function u(e){return"function"!=typeof e.children}var d=function(e){function a(t){var i;return(i=e.call(this,t)||this).node=null,i._unobserveCb=null,i.handleNode=function(e){i.node&&(i.unobserve(),e||i.props.triggerOnce||i.props.skip||i.setState({inView:!!i.props.initialInView,entry:void 0})),i.node=e||null,i.observeNode()},i.handleChange=function(e,t){e&&i.props.triggerOnce&&i.unobserve(),u(i.props)||i.setState({inView:e,entry:t}),i.props.onChange&&i.props.onChange(e,t)},i.state={inView:!!t.initialInView,entry:void 0},i}a.prototype=Object.create(e.prototype),a.prototype.constructor=a,s(a,e);var r=a.prototype;return r.componentDidUpdate=function(e){(e.rootMargin!==this.props.rootMargin||e.root!==this.props.root||e.threshold!==this.props.threshold||e.skip!==this.props.skip||e.trackVisibility!==this.props.trackVisibility||e.delay!==this.props.delay)&&(this.unobserve(),this.observeNode())},r.componentWillUnmount=function(){this.unobserve(),this.node=null},r.observeNode=function(){if(this.node&&!this.props.skip){var e=this.props,t=e.threshold,i=e.root,s=e.rootMargin,a=e.trackVisibility,r=e.delay,n=e.fallbackInView;this._unobserveCb=l(this.node,this.handleChange,{threshold:t,root:i,rootMargin:s,trackVisibility:a,delay:r},n)}},r.unobserve=function(){this._unobserveCb&&(this._unobserveCb(),this._unobserveCb=null)},r.render=function(){if(!u(this.props)){var e=this.state,s=e.inView,a=e.entry;return this.props.children({inView:s,entry:a,ref:this.handleNode})}var r=this.props,n=r.children,o=r.as,l=function(e,t){if(null==e)return{};var i,s,a={},r=Object.keys(e);for(s=0;s<r.length;s++)i=r[s],t.indexOf(i)>=0||(a[i]=e[i]);return a}(r,c);return t.createElement(o||"div",i({ref:this.handleNode},l),n)},a}(t.Component);d.displayName="InView",d.defaultProps={threshold:0,triggerOnce:!1,initialInView:!1},e.s(["useInView",0,function(e){var i=void 0===e?{}:e,s=i.threshold,a=i.delay,r=i.trackVisibility,n=i.rootMargin,o=i.root,c=i.triggerOnce,u=i.skip,d=i.initialInView,p=i.fallbackInView,S=t.useRef(),m=t.useState({inView:!!d}),_=m[0],E=m[1],h=t.useCallback(function(e){void 0!==S.current&&(S.current(),S.current=void 0),!u&&e&&(S.current=l(e,function(e,t){E({inView:e,entry:t}),t.isIntersecting&&c&&S.current&&(S.current(),S.current=void 0)},{root:o,rootMargin:n,threshold:s,trackVisibility:r,delay:a},p))},[Array.isArray(s)?s.toString():s,o,n,c,u,r,p,a]);(0,t.useEffect)(function(){S.current||!_.entry||c||u||E({inView:!!d})});var g=[h,_.inView,_.entry];return g.ref=g[0],g.inView=g[1],g.entry=g[2],g}],705670);var p=e.i(843476),S=e.i(997053),m=e.i(991790),_=e.i(224583),E=e.i(266349),h=e.i(923035),g=e.i(350437),f=e.i(801770),b=e.i(671249),A=e.i(925866),O=e.i(651379),T=e.i(109950),R=e.i(38817),L=e.i(385658),I=e.i(228678);let v=(0,t.lazy)(async()=>({default:(await e.A(409072)).SandboxSelectionModal})),x=["Escape","Esc"],y=S.default.div.withConfig({displayName:"SandboxSelection__SandboxSelectionWrapper",componentId:"sc-d2d43ddf-0"})`
  margin-top: -${f.SPACINGS.TWO};
`,C=(0,S.default)(_.ButtonBare).withConfig({displayName:"SandboxSelection__SandboxSelectionOpenModalButton",componentId:"sc-d2d43ddf-1"})`
  color: ${g.COLORS.TEXT_LOW_CONTRAST};
  font-size: ${A.FONT_SIZES.COMPLEMENTARY};
  margin-bottom: -${f.SPACINGS.TWO};
  padding: ${f.SPACINGS.TWO} 0 ${f.SPACINGS.TWO} 0;
  border-radius: ${b.BORDER_RADIUSES.BOX};
  align-items: center;
  font-weight: ${A.FONT_WEIGHTS.MEDIUM};

  ${h.IconWithTextText} {
    ${E.BRAND_GRADIENT_TEXT_STYLES};
  }
`;e.s(["SandboxSelection",0,function(i){let{sandboxes:s}=i,a=(0,t.useRef)(R.MODALS.EDIT_CODE((0,L.default)())),r=(0,T.useAppSelector)((0,I.selectIsModalOpen)(a.current)),n=(0,t.useRef)(null),o=(0,T.useAppDispatch)(),l=(0,t.useCallback)(()=>{o((0,I.setModalOpen)(a.current))},[o]),c=(0,t.useCallback)(()=>{o((0,I.setModalClosed)())},[o]),u=(0,t.useCallback)(({key:e})=>{x.includes(e)&&c()},[c]);(0,O.useEventListener)("keyup",u);let d=(0,t.useCallback)(async()=>({default:(await e.A(409072)).SandboxSelectionModal}),[]);return(0,O.useEventListener)("mouseenter",d,n,{passive:!0}),(0,O.useEventListener)("touchstart",d,n,{passive:!0}),(0,p.jsxs)(y,{children:[(0,p.jsx)(C,{id:"select-codesandbox-dialog",ref:n,"aria-expanded":r,"aria-label":"Show Select CodeSandbox Dialog",onClick:l,type:"button",children:(0,p.jsx)(h.IconWithText,{iconSvg:"pen",iconSize:"1.4rem",children:"Edit Code"})}),r&&(0,p.jsx)(m.LoadSpinnerWithSuspense,{children:(0,p.jsx)(v,{sandboxes:s,closeModal:c})})]})}],875421)},503392,608256,e=>{"use strict";var t=e.i(843476),i=e.i(271645),s=e.i(997053),a=e.i(705670),r=e.i(350287),n=e.i(875421),o=e.i(431480),l=e.i(801770),c=e.i(602545);let u=s.css`
  margin-top: ${l.SPACINGS.FOUR};
  margin-bottom: ${l.SPACINGS.FOUR};
  position: relative;
`,d=s.css`
  ${u};
  min-height: calc(
    ${c.CAROUSEL_DEFAULT_HEIGHT} + ${c.CAROUSEL_NAV_BUTTON_SIZE} +
      ${c.CAROUSEL_CONTROLS_SPACING}
  );
`,p=s.css`
  ${u};
  min-height: calc(
    ${c.CAROUSEL_DEFAULT_HEIGHT} + ${c.CAROUSEL_THUMB_SLIDES_HEIGHT} +
      ${c.CAROUSEL_THUMB_SLIDES_SPACING}
  );
`,S=s.css`
  ${u};
  min-height: calc(
    ${c.CAROUSEL_DEFAULT_HEIGHT} + ${c.CAROUSEL_NAV_BUTTON_SIZE} +
      ${c.CAROUSEL_CONTROLS_SPACING} + ${c.CAROUSEL_SCROLLBAR_HEIGHT} +
      ${c.CAROUSEL_SCROLLBAR_SPACING}
  );
`,m=s.css`
  ${o.pageFrameCollapseStyles};
  min-height: ${c.CAROUSEL_IOS_PICKER_HEIGHT};
  touch-action: none;
  position: relative;
`,_=s.css`
  ${u};
  min-height: calc(
    ${c.CAROUSEL_DEFAULT_HEIGHT} + (${c.CAROUSEL_NAV_BUTTON_SIZE} * 2) +
      (${c.CAROUSEL_CONTROLS_SPACING} * 2)
  );
`,E=s.css`
  ${u};
  min-height: calc(
    ${c.CAROUSEL_DEFAULT_HEIGHT} + (${c.CAROUSEL_NAV_BUTTON_SIZE} * 3) +
      (${c.CAROUSEL_CONTROLS_SPACING} * 3)
  );
`,h={rootMargin:"0px 0px 0px 0px"},g={DEFAULT:"default",THUMBS:"thumbs",SCROLL_BAR:"scrollBar",IOS_PICKER:"iosPicker",ONE_FORM_ROW:"oneFormRow",TWO_FORM_ROWS:"twoFormRows"},f={[g.DEFAULT]:d,[g.THUMBS]:p,[g.SCROLL_BAR]:S,[g.IOS_PICKER]:m,[g.ONE_FORM_ROW]:_,[g.TWO_FORM_ROWS]:E};e.s(["EXAMPLES_INTERSECTION_OPTIONS",0,h,"EXAMPLES_WRAPPERS",0,g,"EXAMPLES_WRAPPER_STYLES",0,f],608256);let b={config:{id:"",slides:[],options:{},styles:""},sandboxes:[],Carousel:void 0},A=s.default.div.withConfig({displayName:"ExamplesLazy__Wrapper",componentId:"sc-b8d30a6c-0"})`
  ${({$id:e,$styles:t,$wrapper:i})=>s.css`
      ${f[i]};

      &.${e} {
        ${t};
      }
    `}
`;e.s(["ExamplesLazy",0,e=>{let{wrapper:s,loader:o}=e,[l,c]=(0,a.useInView)(h),[u,d]=(0,i.useState)(!1),[p,S]=(0,i.useState)(b),m=s||g.DEFAULT,_=(0,i.useCallback)(async e=>{d(!0);let{EXAMPLE:t}=await e();t&&S(t),d(!1)},[]);return(0,i.useEffect)(()=>{c&&o&&_(o)},[c,o]),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.SandboxSelection,{sandboxes:p.sandboxes}),(0,t.jsx)(A,{className:p.config.id,ref:l,$id:p.config.id,$styles:p.config.styles,$wrapper:m,children:c?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.LoadSpinnerSuspense,{usePortal:!1,isVisible:u}),p.Carousel&&(0,t.jsx)(p.Carousel,{options:p.config.options,slides:p.config.slides})]}):null})]})}],503392)},892384,596555,e=>{"use strict";var t=e.i(843476),i=e.i(271645),s=e.i(997053),a=e.i(705670),r=e.i(350287),n=e.i(875421),o=e.i(431480),l=e.i(801770),c=e.i(863552);let u=s.css`
  margin-top: ${l.SPACINGS.FOUR};
  margin-bottom: ${l.SPACINGS.FOUR};
  position: relative;
`,d=s.css`
  ${u};
  min-height: calc(
    ${c.CAROUSEL_DEFAULT_HEIGHT} + ${c.CAROUSEL_NAV_BUTTON_SIZE} +
      ${c.CAROUSEL_CONTROLS_SPACING}
  );
`,p=s.css`
  ${u};
  min-height: calc(
    ${c.CAROUSEL_DEFAULT_HEIGHT} + ${c.CAROUSEL_THUMB_SLIDES_HEIGHT} +
      ${c.CAROUSEL_THUMB_SLIDES_SPACING}
  );
`,S=s.css`
  ${u};
  min-height: calc(
    ${c.CAROUSEL_DEFAULT_HEIGHT} + ${c.CAROUSEL_NAV_BUTTON_SIZE} +
      ${c.CAROUSEL_CONTROLS_SPACING} + ${c.CAROUSEL_SCROLLBAR_HEIGHT} +
      ${c.CAROUSEL_SCROLLBAR_SPACING}
  );
`,m=s.css`
  ${o.pageFrameCollapseStyles};
  min-height: ${c.CAROUSEL_IOS_PICKER_HEIGHT};
  touch-action: none;
  position: relative;
`,_=s.css`
  ${u};
  min-height: calc(
    ${c.CAROUSEL_DEFAULT_HEIGHT} + (${c.CAROUSEL_NAV_BUTTON_SIZE} * 2) +
      (${c.CAROUSEL_CONTROLS_SPACING} * 2)
  );
`,E=s.css`
  ${u};
  min-height: calc(
    ${c.CAROUSEL_DEFAULT_HEIGHT} + (${c.CAROUSEL_NAV_BUTTON_SIZE} * 3) +
      (${c.CAROUSEL_CONTROLS_SPACING} * 3)
  );
`,h={rootMargin:"0px 0px 0px 0px"},g={DEFAULT:"default",THUMBS:"thumbs",SCROLL_BAR:"scrollBar",IOS_PICKER:"iosPicker",ONE_FORM_ROW:"oneFormRow",TWO_FORM_ROWS:"twoFormRows"},f={[g.DEFAULT]:d,[g.THUMBS]:p,[g.SCROLL_BAR]:S,[g.IOS_PICKER]:m,[g.ONE_FORM_ROW]:_,[g.TWO_FORM_ROWS]:E};e.s(["EXAMPLES_INTERSECTION_OPTIONS",0,h,"EXAMPLES_WRAPPERS",0,g,"EXAMPLES_WRAPPER_STYLES",0,f],596555);let b={config:{id:"",slides:[],options:{},styles:""},sandboxes:[],Carousel:void 0},A=s.default.div.withConfig({displayName:"ExamplesLazy__Wrapper",componentId:"sc-f0878424-0"})`
  ${({$id:e,$styles:t,$wrapper:i})=>s.css`
      ${f[i]};

      &.${e} {
        ${t};
      }
    `}
`;e.s(["ExamplesLazy",0,e=>{let{wrapper:s,loader:o}=e,[l,c]=(0,a.useInView)(h),[u,d]=(0,i.useState)(!1),[p,S]=(0,i.useState)(b),m=s||g.DEFAULT,_=(0,i.useCallback)(async e=>{d(!0);let{EXAMPLE:t}=await e();t&&S(t),d(!1)},[]);return(0,i.useEffect)(()=>{c&&o&&_(o)},[c,o]),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.SandboxSelection,{sandboxes:p.sandboxes}),(0,t.jsx)(A,{className:p.config.id,ref:l,$id:p.config.id,$styles:p.config.styles,$wrapper:m,children:c?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.LoadSpinnerSuspense,{usePortal:!1,isVisible:u}),p.Carousel&&(0,t.jsx)(p.Carousel,{options:p.config.options,slides:p.config.slides})]}):null})]})}],892384)},400227,e=>{"use strict";var t=e.i(843476),i=e.i(892384);e.s(["ExampleAutoHeight",0,function(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(125897)})}])},17775,e=>{"use strict";var t=e.i(843476),i=e.i(892384);e.s(["ExampleAutoplay",0,function(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(818122)})}])},387950,e=>{"use strict";var t=e.i(843476),i=e.i(892384);e.s(["ExampleClassNames",0,function(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(398209)})}])},812967,e=>{"use strict";var t=e.i(843476),i=e.i(503392);e.s(["ExampleAccessibility",0,function(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(643267)})}])},319660,e=>{"use strict";var t=e.i(843476),i=e.i(892384);e.s(["ExampleAutoScroll",0,function(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(703697)})}])},542412,e=>{"use strict";var t=e.i(843476),i=e.i(503392);e.s(["ExampleAutoHeight",0,function(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(733996)})}])},725542,e=>{"use strict";var t=e.i(843476),i=e.i(503392);e.s(["ExampleClassNames",0,function(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(313316)})}])},968016,e=>{"use strict";var t=e.i(843476),i=e.i(503392);e.s(["ExampleAutoScroll",0,function(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(230095)})}])},281165,e=>{"use strict";var t=e.i(843476),i=e.i(503392);e.s(["ExampleFade",0,function(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(430642)})}])},146089,e=>{"use strict";var t=e.i(843476),i=e.i(503392);e.s(["ExampleAutoplay",0,function(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(822087)})}])},699905,e=>{"use strict";var t=e.i(843476),i=e.i(892384);e.s(["ExampleFade",0,function(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(850751)})}])},377495,e=>{"use strict";var t=e.i(997053),i=e.i(224583),s=e.i(380999),a=e.i(989023),r=e.i(801770),n=e.i(350437),o=e.i(506390);let l=t.css`
  ${(0,s.createSquareSizeStyles)("4rem")};
  ${i.buttonBareStyles};
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: -${r.SPACINGS.CUSTOM(({ONE:e})=>e+.15)};
  margin-left: -${r.SPACINGS.CUSTOM(({ONE:e})=>e+.15)};

  ${o.MEDIA.DESKTOP} {
    ${(0,s.createSquareSizeStyles)("3rem")};
  }
`,c=(0,t.default)(i.ButtonBare).withConfig({displayName:"SearchButton",componentId:"sc-e27f3bba-0"})`
  ${l};
`,u=t.css`
  ${(0,s.createSquareSizeStyles)("2.35rem")};
  color: ${n.COLORS.TEXT_HIGH_CONTRAST};
  stroke-width: 0.2rem;
  display: flex;

  ${o.MEDIA.DESKTOP} {
    ${(0,s.createSquareSizeStyles)("1.8rem")};
  }
`,d=(0,t.default)(a.Icon).withConfig({displayName:"SearchButton__SearchButtonIcon",componentId:"sc-e27f3bba-1"})`
  ${u};
`;e.s(["SearchButton",0,c,"SearchButtonIcon",0,d,"searchButtonIconStyles",0,u,"searchButtonStyles",0,l])},287388,e=>{"use strict";var t=e.i(843476),i=e.i(271645),s=e.i(997053),a=e.i(878612),r=e.i(801770),n=e.i(671249),o=e.i(350437),l=e.i(618566),c=e.i(343869),u=e.i(542336),d=e.i(224583),p=e.i(907827),S=e.i(764268),m=e.i(651379),_=e.i(676282),E=e.i(925866),h=e.i(38817);let g=s.default.div.withConfig({displayName:"VersionSelector__DropdownWrapper",componentId:"sc-97907ff1-0"})`
  position: relative;
`,f=(0,s.default)(d.ButtonBare).withConfig({displayName:"VersionSelector__DropdownToggle",componentId:"sc-97907ff1-1"})`
  ${a.CARD_STYLES};
  border-radius: ${n.BORDER_RADIUSES.SOFT};
  padding: ${r.SPACINGS.ONE} ${r.SPACINGS.THREE};
  line-height: 1.65;
`,b=s.default.span.withConfig({displayName:"VersionSelector__DropdownToggleLabel",componentId:"sc-97907ff1-2"})`
  font-weight: ${E.FONT_WEIGHTS.BOLD};
  color: ${o.COLORS.TEXT_LOW_CONTRAST};
`,A=s.default.nav.withConfig({displayName:"VersionSelector__DropdownContent",componentId:"sc-97907ff1-3"})`
  position: absolute;
  top: calc(100% + ${r.SPACINGS.ONE});
  background-color: ${o.COLORS.BACKGROUND_SITE};
  padding: ${r.SPACINGS.ONE} 0;
  z-index: ${p.LAYERS.HEADER};
  width: max-content;
  left: 50%;
  transform: translateX(-50%);
  border-radius: ${n.BORDER_RADIUSES.CARD};
  border: ${n.BORDER_SIZES.DETAIL} solid ${o.COLORS.DETAIL_LOW_CONTRAST};
  display: flex;
  flex-direction: column;

  &[hidden] {
    display: none;
  }
`,O=(0,s.default)(S.LinkNavigation).withConfig({displayName:"VersionSelector__DropdownLink",componentId:"sc-97907ff1-4"})`
  padding: ${r.SPACINGS.ONE} 0;
  margin-left: ${r.SPACINGS.THREE};
  margin-right: ${r.SPACINGS.THREE};
  display: block;
`;e.s(["VersionSelector",0,function(e){var s;let a,{...r}=e,[n,o]=(0,i.useState)(!1),d=(0,l.usePathname)(),p=(0,u.getVersionFromPathname)(d),S=(0,i.useId)(),E=(0,i.useId)(),{isCompact:T}=(0,_.useBreakpoints)(),R=(0,i.useRef)(null),L=(0,i.useRef)(null),I=(0,i.useCallback)(({key:e})=>{n&&h.MODAL_CLOSE_KEYS.includes(e)&&(o(!1),L.current?.focus())},[n]),v=(0,i.useCallback)(({relatedTarget:e})=>{R.current?.contains(e)||o(!1)},[]);return(0,i.useEffect)(()=>{o(!1)},[T]),(0,m.useEventListener)("keyup",I),s=()=>o(!1),a=e=>{!R.current||R.current.contains(e.target)||s(e)},(0,m.useEventListener)("mousedown",a),(0,m.useEventListener)("touchstart",a),(0,t.jsxs)(g,{ref:R,onBlur:v,...r,children:[(0,t.jsx)("div",{children:(0,t.jsxs)(f,{id:S,"aria-expanded":n,"aria-controls":E,onClick:()=>o(e=>!e),type:"button",ref:L,children:[(0,t.jsx)(b,{children:"Version: "}),(0,t.jsxs)("strong",{children:[p.MAJOR," (",p.SUFFIX,")"]})]})}),(0,t.jsx)(A,{"aria-label":"Documentation versions",id:E,hidden:!n,children:(0,t.jsx)("ul",{children:c.DOCS_VERSIONS.map(e=>{let i=(0,u.getPathnameForVersion)(d,e.MAJOR),s=e.MAJOR===p.MAJOR,a=`v${e.MAJOR}`,r=e.SUFFIX?` (${e.SUFFIX})`:"";return(0,t.jsx)("li",{children:(0,t.jsxs)(O,{slug:i,onClick:()=>o(!1),isActive:s,"aria-current":s?"page":void 0,children:[e.NAME,r]})},a)})})})]})}],287388)},113595,e=>{"use strict";e.s(["ALGOLIA_CLASSNAMES",0,{LVL_0:"algolia-docsearch-lvl-0",SEARCH_ACTIVE:"DocSearch--active",SEARCH_INPUT:"DocSearch-Input",SEARCH_TOGGLE_BUTTON:"DocSearch-Button"},"ALGOLIA_SEARCH_CONFIG",0,{APP_ID:"8P0OOFSVUV",API_KEY:"5b82ccc7721ce8d7693691c6a81b7c2a",INDEX_NAME:"embla-carousel"}])},12447,(e,t,i)=>{t.exports=function(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}},631926,(e,t,i)=>{var s=e.r(139088);t.exports=function(){return s.Date.now()}},748891,(e,t,i)=>{var s=/\s/;t.exports=function(e){for(var t=e.length;t--&&s.test(e.charAt(t)););return t}},830364,(e,t,i)=>{var s=e.r(748891),a=/^\s+/;t.exports=function(e){return e?e.slice(0,s(e)+1).replace(a,""):e}},773759,(e,t,i)=>{var s=e.r(830364),a=e.r(12447),r=e.r(361884),n=0/0,o=/^[-+]0x[0-9a-f]+$/i,l=/^0b[01]+$/i,c=/^0o[0-7]+$/i,u=parseInt;t.exports=function(e){if("number"==typeof e)return e;if(r(e))return n;if(a(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=a(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=s(e);var i=l.test(e);return i||c.test(e)?u(e.slice(2),i?2:8):o.test(e)?n:+e}},374009,(e,t,i)=>{var s=e.r(12447),a=e.r(631926),r=e.r(773759),n=Math.max,o=Math.min;t.exports=function(e,t,i){var l,c,u,d,p,S,m=0,_=!1,E=!1,h=!0;if("function"!=typeof e)throw TypeError("Expected a function");function g(t){var i=l,s=c;return l=c=void 0,m=t,d=e.apply(s,i)}function f(e){var i=e-S,s=e-m;return void 0===S||i>=t||i<0||E&&s>=u}function b(){var e,i,s,r=a();if(f(r))return A(r);p=setTimeout(b,(e=r-S,i=r-m,s=t-e,E?o(s,u-i):s))}function A(e){return(p=void 0,h&&l)?g(e):(l=c=void 0,d)}function O(){var e,i=a(),s=f(i);if(l=arguments,c=this,S=i,s){if(void 0===p)return m=e=S,p=setTimeout(b,t),_?g(e):d;if(E)return clearTimeout(p),p=setTimeout(b,t),g(S)}return void 0===p&&(p=setTimeout(b,t)),d}return t=r(t)||0,s(i)&&(_=!!i.leading,u=(E="maxWait"in i)?n(r(i.maxWait)||0,t):u,h="trailing"in i?!!i.trailing:h),O.cancel=function(){void 0!==p&&clearTimeout(p),m=0,l=S=c=p=void 0},O.flush=function(){return void 0===p?d:A(a())},O}},676282,237672,e=>{"use strict";var t=e.i(506390),i=e.i(271645),s=e.i(651379),a=e.i(374009),r=e.i(930877);e.s(["useBreakpoints",0,function(){let{windowWidth:e}=function(e=0){let t=(0,i.useCallback)(()=>({windowWidth:(0,r.isBrowser)()?window.innerWidth:0,windowHeight:(0,r.isBrowser)()?window.innerHeight:0}),[]),[n,o]=(0,i.useState)(t);return!function(e){let{callback:t,wait:r=300}=e,n=(0,i.useMemo)(()=>0!==r?(0,a.default)(e=>t(e),r):e=>t(e),[r,t]);(0,s.useEventListener)("resize",n)}({wait:e,callback:()=>o(t)}),n}(),n=e<t.BREAKPOINTS.MD;return{isCompact:n,isDesktop:!n}}],676282);var n=e.i(843476),o=e.i(997053),l=e.i(113595),c=e.i(350437),u=e.i(801770),d=e.i(671249),p=e.i(266349),S=e.i(925866),m=e.i(224583),_=e.i(764268),E=e.i(955596),h=e.i(989023);let g=u.SPACINGS.ONE,f=u.SPACINGS.CUSTOM(({ONE:e})=>e+.2),b=o.default.div.withConfig({displayName:"SidebarNavigationSubMenu__SidebarNavigationSubMenuWrapper",componentId:"sc-98717780-0"})`
  display: flex;
  flex-direction: column;
  line-height: 1.65;

  ${t.MEDIA.COMPACT} {
    border-bottom: ${d.BORDER_SIZES.DETAIL} solid ${c.COLORS.DETAIL_MEDIUM_CONTRAST};
  }
`,A=(0,o.default)(m.ButtonBare).withConfig({displayName:"SidebarNavigationSubMenu__Toggle",componentId:"sc-98717780-1"})`
  font-weight: ${S.FONT_WEIGHTS.SEMI_BOLD};
  color: ${c.COLORS.TEXT_BODY};
  padding: ${g} 0 ${g}
    calc(${f} + ${u.SPACINGS.TWO});
  margin: 0 0;
  position: relative;
  line-height: inherit;
  display: flex;
  align-items: center;
  text-align: left;
  width: 100%;

  ${({$isActive:e})=>o.css`
    > span {
      ${e&&p.BRAND_GRADIENT_TEXT_STYLES};
    }
  `};

  ${t.MEDIA.COMPACT} {
    padding: ${u.SPACINGS.TWO} 0 ${u.SPACINGS.TWO}
      calc(${f} + ${u.SPACINGS.TWO});
  }
`,O=(0,o.default)(h.Icon).withConfig({displayName:"SidebarNavigationSubMenu__ToggleSvg",componentId:"sc-98717780-2"})`
  transform: ${({$isOpen:e})=>e&&"rotate(90deg)"};
  color: ${c.COLORS.TEXT_LOW_CONTRAST};
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
`,T=o.default.ul.withConfig({displayName:"SidebarNavigationSubMenu__Menu",componentId:"sc-98717780-3"})`
  ${({$isOpen:e})=>o.css`
    height: ${!e&&"0px"};
    overflow: ${!e&&"hidden"};
    visibility: ${!e&&"hidden"};

    ${t.MEDIA.COMPACT} {
      margin-top: ${e&&`-${u.SPACINGS.ONE}`};
      padding-bottom: ${e&&u.SPACINGS.TWO};
    }
  `};
  padding-left: calc(${f} + ${u.SPACINGS.FOUR});
  position: relative;

  ${t.MEDIA.DESKTOP} {
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0.3rem;
      width: ${d.BORDER_SIZES.DETAIL};
      bottom: 0;
      background-color: ${c.COLORS.DETAIL_MEDIUM_CONTRAST};
    }
  }
`,R=(0,o.default)(_.LinkNavigation).withConfig({displayName:"SidebarNavigationSubMenu__Link",componentId:"sc-98717780-4"})`
  margin: 0 0;
  text-align: left;
  padding: ${g} 0;
`;function L(e){let{route:t,isDesktopMenu:s,isActiveOverride:a}=e,{title:r,children:o}=t,{isPartiallyActive:c,isActive:u}=(0,E.useRouteActive)(t.slug),[d,p]=(0,i.useState)(c||a),S=d?"Hide":"Show",m=c&&s?l.ALGOLIA_CLASSNAMES.LVL_0:void 0,_=function(e="",t){let i=e.toLowerCase().split(" ").join("-");return`${i}-navigation-${t?"desktop":"compact"}-menu`}(r,s),h=(0,i.useCallback)(e=>{e.preventDefault(),p(e=>!e)},[]);return(0,n.jsxs)(b,{"aria-labelledby":_,children:[(0,n.jsxs)(A,{id:_,onClick:h,$isActive:c,"aria-expanded":d,"aria-label":`${S} Navigation Menu`,children:[(0,n.jsx)(O,{$isOpen:d,svg:"chevronRight",size:f}),(0,n.jsx)("span",{className:m,children:r})]}),(0,n.jsxs)(T,{$isOpen:d,children:[(0,n.jsx)("li",{children:(0,n.jsx)(R,{slug:t.slug,isActive:u,children:"Intro"})}),o.map(e=>(0,n.jsx)("li",{children:(0,n.jsx)(R,{slug:e.slug,children:e.title})},e.slug))]})]})}var I=e.i(475086),v=e.i(542336),x=e.i(618566);e.s(["SidebarNavigationSubMenus",0,function(e){let{isDesktopMenu:t=!1}=e,{hierarchicalRoutes:i}=(0,I.useSidebarNavigationContext)(),s=(0,v.getIsDocsStartPage)((0,x.usePathname)());return(0,n.jsx)(n.Fragment,{children:i.map((e,i)=>(0,n.jsx)("li",{children:(0,n.jsx)(L,{route:e,isActiveOverride:!i&&s,isDesktopMenu:t})},e.slug))})}],237672)},515681,112426,e=>{"use strict";var t=e.i(843476),i=e.i(997053),s=e.i(728191);let a=i.default.div.withConfig({displayName:"PageFrame__PageFrameWrapper",componentId:"sc-73ebe679-0"})`
  margin-left: auto;
  margin-right: auto;
  padding-left: ${s.PAGE_FRAME_SPACING};
  padding-right: ${s.PAGE_FRAME_SPACING};
  max-width: ${({$size:e})=>e};
  width: 100%;
`;e.s(["PageFrame",0,function(e){let{size:i="DEFAULT",children:r,...n}=e,o=s.PAGE_FRAME_SIZES[i];return(0,t.jsx)(a,{$size:o,...n,children:r})}],515681);var r=e.i(271645),n=e.i(109950),o=e.i(840535),l=e.i(651379),c=e.i(676282),u=e.i(506390),d=e.i(907827),p=e.i(38817),S=e.i(801770),m=e.i(784613),_=e.i(930877),E=e.i(850056),h=e.i(350437),g=e.i(925866),f=e.i(615632),b=e.i(923035),A=e.i(671249),O=e.i(174776),T=e.i(343869);let R=S.SPACINGS.FIVE,L=S.SPACINGS.ONE,I="1.4rem",v=i.default.ul.withConfig({displayName:"FooterLinks__FooterLinksWrapper",componentId:"sc-9b2a805c-0"})`
  ${(0,O.createGapStyles)(R,"","li")};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`,x=(0,i.default)(f.LinkBare).withConfig({displayName:"FooterLinks__Link",componentId:"sc-9b2a805c-1"})`
  font-size: ${g.FONT_SIZES.COMPLEMENTARY};
  margin-right: -${A.BORDER_SIZES.OUTLINE};
  padding: ${S.SPACINGS.ONE} ${A.BORDER_SIZES.OUTLINE};
  outline-offset: -${A.BORDER_SIZES.OUTLINE};
  color: ${h.COLORS.TEXT_LOW_CONTRAST};
  display: inline-flex;
  align-items: center;
`;var y=e.i(237672),C=e.i(654938);let $=i.default.div.withConfig({displayName:"SidebarNavigationMenuDesktop__SidebarNavigationMenuDesktopWrapper",componentId:"sc-64efcc2c-0"})`
  background-color: ${h.COLORS.BACKGROUND_SITE};
  font-size: ${g.FONT_SIZES.COMPLEMENTARY};
  position: relative;
  height: 100%;

  &:before,
  &:after {
    position: absolute;
    z-index: ${d.LAYERS.STEP};
    left: -${s.PAGE_FRAME_SPACING};
    right: -${s.PAGE_FRAME_SPACING};
    content: '';
  }

  &:before {
    ${(0,C.createScrollBarShadowStyles)("top")};
    top: -${C.SCROLL_BAR_SHADOW_SIZE};
  }

  &:after {
    ${(0,C.createScrollBarShadowStyles)("bottom")};
    bottom: -${C.SCROLL_BAR_SHADOW_SIZE};
  }

  ${u.MEDIA.COMPACT} {
    display: none;
  }
`,k=i.default.ul.withConfig({displayName:"SidebarNavigationMenuDesktop__ScrollArea",componentId:"sc-64efcc2c-1"})`
  ${(0,C.createScrollBarStyles)("y")};
  padding-top: ${s.PAGE_FRAME_SPACING};
  padding-bottom: ${s.PAGE_FRAME_SPACING};
  max-height: calc(100dvh - ${m.HEADER_HEIGHT});
  overflow: auto;
`,N=(0,i.default)(function(e){let{...i}=e,{URLS:s}=T.GLOBAL_DATA;return(0,t.jsxs)(v,{...i,children:[(0,t.jsx)("li",{children:(0,t.jsx)(x,{href:s.NPM_PACKAGE,children:(0,t.jsx)(b.IconWithText,{iconSvg:"npm",spacing:L,iconSize:I,children:"Npm"})})}),(0,t.jsx)("li",{children:(0,t.jsx)(x,{href:s.GITHUB_ROOT,children:(0,t.jsx)(b.IconWithText,{iconSvg:"github",spacing:L,iconSize:I,children:"GitHub"})})}),(0,t.jsx)("li",{children:(0,t.jsx)(x,{href:s.GITHUB_SPONSORS_PAGE,children:(0,t.jsx)(b.IconWithText,{iconSvg:"heartOutlined",spacing:L,iconSize:I,children:"Sponsor"})})})]})}).withConfig({displayName:"SidebarNavigationMenuDesktop__MiscLinks",componentId:"sc-64efcc2c-2"})`
  padding-top: ${S.SPACINGS.THREE};
  flex-direction: column;
`;function j(){let e=(0,n.useAppSelector)(E.selectKeyNavigating);return(0,t.jsx)($,{$isKeyNavigating:e,children:(0,t.jsxs)(k,{children:[(0,t.jsx)(y.SidebarNavigationSubMenus,{isDesktopMenu:!0}),(0,t.jsx)("li",{children:(0,t.jsx)(N,{})})]})})}var D=e.i(991790),w=e.i(32957),P=e.i(228678);let G=(0,r.lazy)(async()=>({default:(await e.A(336036)).SidebarNavigationMenuCompact})),M="sidebar-navigation-menu",B=(0,w.kebabCaseToPascalCase)(M," "),H="sidebar-menu",U=i.default.nav.withConfig({displayName:"SidebarNavigation__SidebarNavigationWrapper",componentId:"sc-d75f319f-0"})`
  position: sticky;

  ${u.MEDIA.COMPACT} {
    position: fixed;
    z-index: ${d.LAYERS.NAVIGATION};
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    ${({$isOpen:e})=>i.css`
      transform: ${!e&&"translateX(-100%)"};
      visibility: ${!e&&"hidden"};
    `};
  }

  ${u.MEDIA.DESKTOP} {
    width: inherit;
    max-width: inherit;
    top: ${m.HEADER_HEIGHT};
    bottom: 0;
  }

  ${u.MEDIA.MIN_LG} {
    padding-right: ${S.SPACINGS.SEVEN};
  }
`;e.s(["SIDEBAR_NAVIGATION_ID",0,M,"SIDEBAR_NAVIGATION_ID_PRETTY",0,B,"SidebarNavigation",0,function(e){let{isCompact:i}=(0,c.useBreakpoints)(),s=(0,n.useAppSelector)((0,P.selectIsModalOpen)(p.MODALS.SIDEBAR_NAVIGATION)),a=(0,n.useAppDispatch)(),u=(0,r.useCallback)(()=>{a((0,P.setModalClosed)())},[a]),d=(0,r.useCallback)(()=>{if(!(0,_.isBrowser)())return[];let e=document.getElementById(m.HEADER_ID),t=document.getElementById(H);return e&&t?[e,t]:[]},[]),S=(0,r.useCallback)(({key:e})=>{p.MODAL_CLOSE_KEYS.includes(e)&&u()},[u]);return(0,l.useEventListener)("keyup",S),(0,r.useEffect)(()=>(i||u(),u),[i,u]),(0,t.jsx)(o.FocusTrap,{active:s,containerElements:d(),children:(0,t.jsxs)(U,{id:H,role:"dialog","aria-modal":"true","aria-labelledby":M,"aria-label":B,$isOpen:s,...e,children:[(0,t.jsx)(j,{}),s&&(0,t.jsx)(D.LoadSpinnerWithSuspense,{children:(0,t.jsx)(G,{})})]})})}],112426)},291543,402044,e=>{"use strict";let t,i,s;var a,r,n,o=e.i(997053),l=e.i(224583),c=e.i(350437),u=e.i(801770),d=e.i(266349),p=e.i(925866);let S={MD:o.css`
    padding-left: 2.6rem;
    padding-right: 2.6rem;
    min-height: 4.26rem;
    border-radius: 3rem;
  `};e.s(["BUTTON_SIZES",0,S],402044);var m=e.i(843476),_=e.i(236420);let E=(0,o.default)(_.LoadSpinner).withConfig({displayName:"CreateButtonWithLoading__ButtonLoadSpinner",componentId:"sc-123af70d-0"})`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`,h=o.default.span.withConfig({displayName:"CreateButtonWithLoading__ButtonLoadSpinnerText",componentId:"sc-123af70d-1"})``,g=o.css`
  position: relative;
  width: 100%;
  text-align: center;
  justify-content: center;

  ${({$isLoading:e})=>e&&o.css`
      ${h} {
        opacity: 0;
      }
    `}
`,f=o.css`
  ${S.MD}
  ${d.BRAND_GRADIENT_BACKGROUND_STYLES};
  color: ${c.COLORS.BACKGROUND_SITE};
  line-height: 1.15;
  font-weight: ${p.FONT_WEIGHTS.BOLD};
  display: inline-flex;
  align-items: center;
`,b=(a=(0,o.default)(l.ButtonBare).withConfig({displayName:"ButtonPrimaryFilled",componentId:"sc-ae976bb2-0"})`
  ${f};

  &:disabled {
    background-image: none;
    background-color: ${c.COLORS.DETAIL_HIGH_CONTRAST};
  }
`,r=u.SPACINGS.FOUR,n=c.COLORS.TEXT_BODY,t=`${a.displayName}WithLoading`,i=(0,o.default)(a).withConfig({displayName:"CreateButtonWithLoading__Button",componentId:"sc-123af70d-2"})`
    ${g};
  `,(s=e=>{let{children:t,isLoading:s,...a}=e;return(0,m.jsxs)(i,{$isLoading:s,...a,children:[(0,m.jsx)(h,{children:t}),s&&(0,m.jsx)(E,{size:r,color:n})]})}).displayName=t,s);e.s(["ButtonPrimaryFilledWithLoading",0,b,"buttonPrimaryFilledStyles",0,f],291543)},725266,e=>{"use strict";var t=e.i(843476),i=e.i(997053),s=e.i(291543),a=e.i(224583),r=e.i(350437),n=e.i(925866),o=e.i(907827),l=e.i(671249),c=e.i(402044),u=e.i(266349);let d=i.css`
  ${c.BUTTON_SIZES.MD};
  line-height: 1.15;
  font-weight: ${n.FONT_WEIGHTS.BOLD};
  display: inline-flex;
  align-items: center;
  position: relative;

  &:before,
  &:after {
    content: '';
    position: absolute;
    pointer-events: none;
    border-radius: inherit;
  }

  &:before {
    ${u.BRAND_GRADIENT_BACKGROUND_STYLES};
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  &:after {
    background-color: ${r.COLORS.BACKGROUND_SITE};
    top: ${l.BORDER_SIZES.OUTLINE};
    left: ${l.BORDER_SIZES.OUTLINE};
    bottom: ${l.BORDER_SIZES.OUTLINE};
    right: ${l.BORDER_SIZES.OUTLINE};
  }

  ${a.ButtonBareText} {
    ${u.BRAND_GRADIENT_TEXT_STYLES};
    z-index: ${o.LAYERS.STEP};
  }
`;(0,i.default)(a.ButtonBare).withConfig({displayName:"ButtonPrimaryOutlined",componentId:"sc-704e1638-0"})`
  ${d};

  &:disabled {
    &:before {
      background-image: none;
      background-color: ${r.COLORS.DETAIL_HIGH_CONTRAST};
    }

    ${a.ButtonBareText} {
      background-image: none;
      background-clip: border-box;
      -webkit-background-clip: border-box;
      -webkit-text-fill-color: currentcolor;
      color: ${r.COLORS.DETAIL_HIGH_CONTRAST};
    }
  }
`;var p=e.i(615632);let S=(0,i.default)(p.LinkBare).withConfig({displayName:"LinkButton__LinkButtonPrimaryFilledWrapper",componentId:"sc-8707cd70-0"})`
  ${s.buttonPrimaryFilledStyles};
`,m=(0,i.default)(p.LinkBare).withConfig({displayName:"LinkButton__LinkButtonPrimaryOutlinedWrapper",componentId:"sc-8707cd70-1"})`
  ${d};
`;e.s(["LinkButtonPrimaryFilled",0,function(e){let{children:i,...s}=e;return(0,t.jsx)(S,{...s,children:(0,t.jsx)(a.ButtonBareText,{children:i})})},"LinkButtonPrimaryOutlined",0,function(e){let{children:i,...s}=e;return(0,t.jsx)(m,{...s,children:(0,t.jsx)(a.ButtonBareText,{children:i})})}],725266)},494549,e=>{"use strict";var t=e.i(843476),i=e.i(503392);e.s(["ExampleMinimalDomManipulation",0,function(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(239020)})}])},759739,e=>{"use strict";var t=e.i(843476),i=e.i(892384);e.s(["ExampleMinimalDomManipulation",0,function(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(406090)})}])},948225,e=>{"use strict";var t=e.i(843476),i=e.i(596555),s=e.i(892384);e.s(["ExamplePreviousAndNextButtons",0,function(){return(0,t.jsx)(s.ExamplesLazy,{wrapper:i.EXAMPLES_WRAPPERS.ONE_FORM_ROW,loader:()=>e.A(502971)})}])},994521,e=>{"use strict";var t=e.i(843476),i=e.i(608256),s=e.i(503392);e.s(["ExampleDotButtons",0,function(){return(0,t.jsx)(s.ExamplesLazy,{wrapper:i.EXAMPLES_WRAPPERS.ONE_FORM_ROW,loader:()=>e.A(326290)})}])},315704,e=>{"use strict";var t=e.i(843476),i=e.i(608256),s=e.i(503392);e.s(["ExamplePreviousAndNextButtons",0,function(){return(0,t.jsx)(s.ExamplesLazy,{wrapper:i.EXAMPLES_WRAPPERS.ONE_FORM_ROW,loader:()=>e.A(791876)})}])},907147,e=>{"use strict";var t=e.i(843476),i=e.i(596555),s=e.i(892384);e.s(["ExampleDotButtons",0,function(){return(0,t.jsx)(s.ExamplesLazy,{wrapper:i.EXAMPLES_WRAPPERS.ONE_FORM_ROW,loader:()=>e.A(168325)})}])},557046,e=>{"use strict";var t=e.i(843476),i=e.i(596555),s=e.i(892384);e.s(["ExampleSlideSizesInteractive",0,function(){return(0,t.jsx)(s.ExamplesLazy,{wrapper:i.EXAMPLES_WRAPPERS.ONE_FORM_ROW,loader:()=>e.A(704187)})}])},967902,e=>{"use strict";var t=e.i(843476),i=e.i(892384);e.s(["ExampleSlideSizesVariableWidths",0,function(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(84394)})}])},999264,e=>{"use strict";var t=e.i(843476),i=e.i(608256),s=e.i(503392);e.s(["ExampleGroupingSlidesInteractive",0,function(){return(0,t.jsx)(s.ExamplesLazy,{wrapper:i.EXAMPLES_WRAPPERS.TWO_FORM_ROWS,loader:()=>e.A(799308)})}])},40292,e=>{"use strict";var t=e.i(843476),i=e.i(608256),s=e.i(503392);e.s(["ExampleGroupingSlidesVariableWidths",0,function(){return(0,t.jsx)(s.ExamplesLazy,{wrapper:i.EXAMPLES_WRAPPERS.TWO_FORM_ROWS,loader:()=>e.A(80891)})}])},445813,e=>{"use strict";var t=e.i(843476),i=e.i(596555),s=e.i(892384);e.s(["ExampleAlignmentsInteractive",0,function(){return(0,t.jsx)(s.ExamplesLazy,{wrapper:i.EXAMPLES_WRAPPERS.TWO_FORM_ROWS,loader:()=>e.A(867910)})}])},157445,e=>{"use strict";var t=e.i(843476),i=e.i(596555),s=e.i(892384);e.s(["ExampleAlignmentsContainScroll",0,function(){return(0,t.jsx)(s.ExamplesLazy,{wrapper:i.EXAMPLES_WRAPPERS.TWO_FORM_ROWS,loader:()=>e.A(180971)})}])},245281,e=>{"use strict";var t=e.i(843476),i=e.i(596555),s=e.i(892384);e.s(["ExampleSlideGapsInteractive",0,function(){return(0,t.jsx)(s.ExamplesLazy,{wrapper:i.EXAMPLES_WRAPPERS.TWO_FORM_ROWS,loader:()=>e.A(159592)})}])},87768,e=>{"use strict";var t=e.i(843476),i=e.i(596555),s=e.i(892384);e.s(["ExampleSlideGapsCssGap",0,function(){return(0,t.jsx)(s.ExamplesLazy,{wrapper:i.EXAMPLES_WRAPPERS.TWO_FORM_ROWS,loader:()=>e.A(657506)})}])},871618,e=>{"use strict";var t=e.i(843476),i=e.i(596555),s=e.i(892384);e.s(["ExampleGroupingSlidesInteractive",0,function(){return(0,t.jsx)(s.ExamplesLazy,{wrapper:i.EXAMPLES_WRAPPERS.TWO_FORM_ROWS,loader:()=>e.A(63358)})}])},178095,e=>{"use strict";var t=e.i(843476),i=e.i(596555),s=e.i(892384);e.s(["ExampleGroupingSlidesVariableWidths",0,function(){return(0,t.jsx)(s.ExamplesLazy,{wrapper:i.EXAMPLES_WRAPPERS.TWO_FORM_ROWS,loader:()=>e.A(687171)})}])},854605,e=>{"use strict";var t=e.i(843476),i=e.i(608256),s=e.i(503392);e.s(["ExampleSlideGapsInteractive",0,function(){return(0,t.jsx)(s.ExamplesLazy,{wrapper:i.EXAMPLES_WRAPPERS.TWO_FORM_ROWS,loader:()=>e.A(198251)})}])},798501,e=>{"use strict";var t=e.i(843476),i=e.i(608256),s=e.i(503392);e.s(["ExampleSlideGapsCssGap",0,function(){return(0,t.jsx)(s.ExamplesLazy,{wrapper:i.EXAMPLES_WRAPPERS.TWO_FORM_ROWS,loader:()=>e.A(76927)})}])},383851,e=>{"use strict";var t=e.i(843476),i=e.i(608256),s=e.i(503392);e.s(["ExampleAlignmentsInteractive",0,function(){return(0,t.jsx)(s.ExamplesLazy,{wrapper:i.EXAMPLES_WRAPPERS.TWO_FORM_ROWS,loader:()=>e.A(888324)})}])},308914,e=>{"use strict";var t=e.i(843476),i=e.i(608256),s=e.i(503392);e.s(["ExampleAlignmentsContainScroll",0,function(){return(0,t.jsx)(s.ExamplesLazy,{wrapper:i.EXAMPLES_WRAPPERS.TWO_FORM_ROWS,loader:()=>e.A(30376)})}])},254708,e=>{"use strict";var t=e.i(843476),i=e.i(608256),s=e.i(503392);e.s(["ExampleSlideSizesInteractive",0,function(){return(0,t.jsx)(s.ExamplesLazy,{wrapper:i.EXAMPLES_WRAPPERS.ONE_FORM_ROW,loader:()=>e.A(958547)})}])},411515,e=>{"use strict";var t=e.i(843476),i=e.i(503392);e.s(["ExampleSlideSizesVariableWidths",0,function(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(103799)})}])},785832,e=>{"use strict";var t=e.i(843476),i=e.i(892384);e.s(["ExampleDefault",0,function(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(929660)})}])},93113,e=>{"use strict";var t=e.i(843476),i=e.i(892384);e.s(["ExampleLoop",0,function(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(35740)})}])},672128,e=>{"use strict";var t=e.i(843476),i=e.i(892384);e.s(["ExampleRightToLeft",0,function(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(800797)})}])},501090,e=>{"use strict";var t=e.i(843476),i=e.i(892384);e.s(["ExampleSlidesToScroll",0,function(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(991167)})}])},960153,e=>{"use strict";var t=e.i(843476),i=e.i(892384);e.s(["ExampleDragFree",0,function(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(96321)})}])},596568,e=>{"use strict";var t=e.i(843476),i=e.i(892384);e.s(["ExampleAlign",0,function(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(976870)})}])},470280,e=>{"use strict";var t=e.i(843476),i=e.i(892384);e.s(["ExampleVariableWidths",0,function(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(686409)})}])},334935,e=>{"use strict";var t=e.i(843476),i=e.i(892384);e.s(["ExampleYAxis",0,function(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(2575)})}])},958805,e=>{"use strict";var t=e.i(843476),i=e.i(892384);e.s(["ExampleSlidesPerView",0,function(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(485243)})}])},886235,e=>{"use strict";var t=e.i(843476),i=e.i(892384),s=e.i(596555);e.s(["ExampleThumbs",0,function(){return(0,t.jsx)(i.ExamplesLazy,{wrapper:s.EXAMPLES_WRAPPERS.THUMBS,loader:()=>e.A(674811)})}])},368643,e=>{"use strict";var t=e.i(843476),i=e.i(892384);e.s(["ExampleParallax",0,function(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(135635)})}])},574870,e=>{"use strict";var t=e.i(843476),i=e.i(892384);e.s(["ExampleScale",0,function(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(135526)})}])},171793,e=>{"use strict";var t=e.i(843476),i=e.i(892384);e.s(["ExampleOpacity",0,function(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(864407)})}])},106649,e=>{"use strict";var t=e.i(843476),i=e.i(892384);e.s(["ExampleProgress",0,function(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(289794)})}])},314284,e=>{"use strict";var t=e.i(843476),i=e.i(892384);e.s(["ExampleLazyLoad",0,function(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(673525)})}])},411771,e=>{"use strict";var t=e.i(843476),i=e.i(892384),s=e.i(596555);e.s(["ExampleScrollBar",0,function(){return(0,t.jsx)(i.ExamplesLazy,{wrapper:s.EXAMPLES_WRAPPERS.SCROLL_BAR,loader:()=>e.A(330741)})}])},222193,e=>{"use strict";var t=e.i(843476),i=e.i(892384);e.s(["ExampleInfiniteScroll",0,function(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(582682)})}])},870132,e=>{"use strict";var t=e.i(843476),i=e.i(892384),s=e.i(596555);e.s(["ExampleIosPicker",0,function(){return(0,t.jsx)(i.ExamplesLazy,{wrapper:s.EXAMPLES_WRAPPERS.IOS_PICKER,loader:()=>e.A(827998)})}])},82464,e=>{"use strict";var t=e.i(843476),i=e.i(892384),s=e.i(596555);e.s(["ExampleIosPickerLoop",0,function(){return(0,t.jsx)(i.ExamplesLazy,{wrapper:s.EXAMPLES_WRAPPERS.IOS_PICKER,loader:()=>e.A(482524)})}])},937093,e=>{"use strict";var t=e.i(843476),i=e.i(503392);e.s(["ExampleDefault",0,function(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(211232)})}])},111681,e=>{"use strict";var t=e.i(843476),i=e.i(503392);e.s(["ExampleLoop",0,function(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(718133)})}])},566137,e=>{"use strict";var t=e.i(843476),i=e.i(503392);e.s(["ExampleRightToLeft",0,function(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(602743)})}])},417347,e=>{"use strict";var t=e.i(843476),i=e.i(503392);e.s(["ExampleSlidesToScroll",0,function(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(126725)})}])},493396,e=>{"use strict";var t=e.i(843476),i=e.i(503392);e.s(["ExampleDragFree",0,function(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(809964)})}])},883026,e=>{"use strict";var t=e.i(843476),i=e.i(503392);e.s(["ExampleDragFreeSnap",0,function(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(720744)})}])},943217,e=>{"use strict";var t=e.i(843476),i=e.i(503392);e.s(["ExampleAlign",0,function(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(732475)})}])},401628,e=>{"use strict";var t=e.i(843476),i=e.i(503392);e.s(["ExampleVariableWidths",0,function(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(262001)})}])},554491,e=>{"use strict";var t=e.i(843476),i=e.i(503392);e.s(["ExampleYAxis",0,function(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(474088)})}])},464751,e=>{"use strict";var t=e.i(843476),i=e.i(503392);e.s(["ExampleSlidesPerView",0,function(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(189029)})}])},356163,e=>{"use strict";var t=e.i(843476),i=e.i(503392),s=e.i(608256);e.s(["ExampleThumbs",0,function(){return(0,t.jsx)(i.ExamplesLazy,{wrapper:s.EXAMPLES_WRAPPERS.THUMBS,loader:()=>e.A(321556)})}])},114359,e=>{"use strict";var t=e.i(843476),i=e.i(503392);e.s(["ExampleParallax",0,function(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(240333)})}])},957777,e=>{"use strict";var t=e.i(843476),i=e.i(503392);e.s(["ExampleScale",0,function(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(653436)})}])},831060,e=>{"use strict";var t=e.i(843476),i=e.i(503392);e.s(["ExampleOpacity",0,function(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(764557)})}])},817333,e=>{"use strict";var t=e.i(843476),i=e.i(503392);e.s(["ExampleProgress",0,function(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(511493)})}])},236260,e=>{"use strict";var t=e.i(843476),i=e.i(503392);e.s(["ExampleLazyLoad",0,function(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(781565)})}])},584290,e=>{"use strict";var t=e.i(843476),i=e.i(503392),s=e.i(608256);e.s(["ExampleScrollBar",0,function(){return(0,t.jsx)(i.ExamplesLazy,{wrapper:s.EXAMPLES_WRAPPERS.SCROLL_BAR,loader:()=>e.A(343858)})}])},619941,e=>{"use strict";var t=e.i(843476),i=e.i(503392);e.s(["ExampleInfiniteScroll",0,function(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(597704)})}])},392544,e=>{"use strict";var t=e.i(843476),i=e.i(503392),s=e.i(608256);e.s(["ExampleIosPicker",0,function(){return(0,t.jsx)(i.ExamplesLazy,{wrapper:s.EXAMPLES_WRAPPERS.IOS_PICKER,loader:()=>e.A(548014)})}])},71747,e=>{"use strict";var t=e.i(843476),i=e.i(503392),s=e.i(608256);e.s(["ExampleIosPickerLoop",0,function(){return(0,t.jsx)(i.ExamplesLazy,{wrapper:s.EXAMPLES_WRAPPERS.IOS_PICKER,loader:()=>e.A(498060)})}])},629829,e=>{"use strict";var t=e.i(843476),i=e.i(271645),s=e.i(618566),a=e.i(997053);e.s(["default",0,function(e){let{children:r}=e,[n]=(0,i.useState)(()=>new a.ServerStyleSheet);return(0,s.useServerInsertedHTML)(()=>{let e=n.getStyleElement();return n.instance.clearTag(),(0,t.jsx)(t.Fragment,{children:e})}),(0,t.jsx)(t.Fragment,{children:r})}])},404686,e=>{"use strict";var t=e.i(843476),i=e.i(155487),s=e.i(164645),a=e.i(808758),r=e.i(228678),n=e.i(646107),o=e.i(897364),l=e.i(850056);let c=(0,s.configureStore)({reducer:{[a.themeName]:a.themeReducer,[l.keyEventsName]:l.keyEventsReducer,[r.modalName]:r.modalReducer,[n.routesName]:n.routesReducer,[o.tabsName]:o.tabsReducer}});e.s(["ReduxProvider",0,function(e){let{children:s}=e;return(0,t.jsx)(i.Provider,{store:c,children:s})}],404686)},352450,e=>{"use strict";var t=e.i(271645),i=e.i(109950),s=e.i(808758),a=e.i(930877),r=e.i(350437);e.s(["ThemeInit",0,function(){var e;let{setLocalStorageItem:n}=(e="theme",{getLocalStorageItem:(0,t.useCallback)(()=>{let t;if(!(0,a.isBrowser)())return'""';try{t=localStorage.getItem(e)}catch(e){console.error(e)}return t||'""'},[]),setLocalStorageItem:(0,t.useCallback)(t=>{if((0,a.isBrowser)())try{localStorage.setItem(e,t)}catch(e){console.error(e)}},[])}),o=(0,i.useAppSelector)(s.selectTheme),l=(0,i.useAppDispatch)();return(0,t.useEffect)(()=>{let e=document.querySelector(r.THEME_META_SELECTOR);n(JSON.stringify({currentTheme:o}));let t=Object.values(r.THEME_KEYS).map(e=>`${r.THEME_PREFIX}${e}`);if(document.documentElement.classList.remove(...t),document.documentElement.classList.add(`${r.THEME_PREFIX}${o}`),e){let t=(r.THEME_COLORS[o]||r.THEME_COLORS[r.THEME_KEYS.LIGHT]).BACKGROUND_SITE;e.setAttribute("content",t)}},[o]),(0,t.useEffect)(()=>{let e=(0,a.isBrowser)()?window.__THEME__:r.THEME_KEYS.LIGHT;l((0,s.setTheme)(e))},[l]),null}],352450)},471572,e=>{"use strict";var t=e.i(997053),i=e.i(658339);let s=t.createGlobalStyle`
  ${i.FONT_STYLES};
  ${i.RESET_STYLES};
  ${i.BASE_STYLES};
  ${i.THEME_STYLES};
`;e.s(["GlobalStyles",0,s])},98881,e=>{"use strict";var t=e.i(271645),i=e.i(651379),s=e.i(109950),a=e.i(850056);e.s(["KeyEventsInit",0,function(){let e=(0,s.useAppDispatch)(),r=(0,s.useAppSelector)(a.selectKeyNavigating),n=(0,t.useCallback)(()=>{r&&e((0,a.setIsKeyNavigating)(!1))},[e,r]),o=(0,t.useCallback)(({key:t})=>{"Tab"!==t||r||e((0,a.setIsKeyNavigating)(!0))},[e,r]);return(0,i.useEventListener)("keydown",o),(0,i.useEventListener)("mousedown",n),null}])},101806,e=>{"use strict";var t=e.i(843476),i=e.i(271645),s=e.i(997053),a=e.i(725266),r=e.i(907827),n=e.i(728191),o=e.i(946078);let l=(0,s.default)(a.LinkButtonPrimaryOutlined).withConfig({displayName:"KeyEventsSkipToContent__KeyEventsSkipToContentWrapper",componentId:"sc-e63b38e8-0"})`
  z-index: ${r.LAYERS.SEARCH+1};
  top: 1rem;
  left: 1rem;
  position: absolute;
  transform: translateX(-1000rem);

  &:focus,
  &:active {
    ${o.KEY_NAVIGATING_STYLES};
    position: fixed;
    transform: translateX(0);
  }
`;e.s(["KeyEventsSkipToContent",0,function(){let[e,s]=(0,i.useState)(null),a=(0,i.useCallback)(t=>{t.currentTarget.blur(),t.preventDefault(),e?.scrollIntoView(),e?.focus()},[e]);return((0,i.useEffect)(()=>{s(document.getElementById(n.MAIN_CONTENT_ID))},[s]),e)?(0,t.jsx)(l,{href:`#${n.MAIN_CONTENT_ID}`,onClick:a,$isKeyNavigating:!0,children:"Skip to content"}):null}])},857825,e=>{"use strict";var t=e.i(843476),i=e.i(997053),s=e.i(515681),a=e.i(506390),r=e.i(907827),n=e.i(350437),o=e.i(784613),l=e.i(671249),c=e.i(25110),u=e.i(764268),d=e.i(287388),p=e.i(801770),S=e.i(925866),m=e.i(271645),_=e.i(109950),E=e.i(850056),h=e.i(651379),g=e.i(38817),f=e.i(377495);let b=(e,t)=>t.every(t=>e.includes(t));function A(i){let{toggleSearch:s,closeSearch:a}=i,[r,n]=(0,m.useState)([]),o=(0,_.useAppSelector)(E.selectKeyNavigating),l=(0,m.useRef)(null),c=g.MODAL_CLOSE_KEYS.some(e=>r.includes(e)),u=b(r,g.MODAL_SEARCH_TOGGLE_KEYS_1),d=b(r,g.MODAL_SEARCH_TOGGLE_KEYS_2),p=(0,m.useCallback)(({key:e})=>{n(t=>t.includes(e)?t:[...t,e])},[]),S=(0,m.useCallback)(({key:e})=>{"Meta"===e&&n([]),n(t=>t.filter(t=>t!==e))},[]);(0,h.useEventListener)("keydown",p),(0,h.useEventListener)("keyup",S),(0,m.useEffect)(()=>c?a():u||d?s():void 0,[s,a,c,u,d]);let A=(0,m.useCallback)(async()=>({default:(await e.A(676327)).SearchAlgolia}),[]);return(0,h.useEventListener)("mouseenter",A,l,{passive:!0}),(0,h.useEventListener)("touchstart",A,l,{passive:!0}),(0,t.jsx)(f.SearchButton,{ref:l,$isKeyNavigating:o,onClick:s,"aria-label":"Search",type:"button",children:(0,t.jsx)(f.SearchButtonIcon,{svg:"search"})})}var O=e.i(991790),T=e.i(228678);let R=(0,m.lazy)(async()=>({default:(await e.A(676327)).SearchAlgolia}));function L(){let e=(0,_.useAppDispatch)(),i=(0,_.useAppSelector)((0,T.selectIsModalOpen)(g.MODALS.SITE_SEARCH)),s=(0,m.useRef)(i),a=(0,m.useCallback)(()=>{s.current?e((0,T.setModalClosed)()):e((0,T.setModalOpen)(g.MODALS.SITE_SEARCH))},[e]),r=(0,m.useCallback)(()=>{e((0,T.setModalClosed)())},[e]);return((0,m.useEffect)(()=>{s.current=i},[i]),i)?(0,t.jsx)(O.LoadSpinnerWithSuspense,{fallback:(0,t.jsx)(A,{toggleSearch:a,closeSearch:r}),children:(0,t.jsx)(R,{})}):(0,t.jsx)(A,{toggleSearch:a,closeSearch:r})}var I=e.i(174776),v=e.i(255130);let x=p.SPACINGS.CUSTOM(()=>2.8),y=p.SPACINGS.TWO,C=i.default.ul.withConfig({displayName:"HeaderActions__HeaderActionsWrapper",componentId:"sc-8ebbdd46-0"})`
  display: flex;
  align-items: center;
  line-height: 1.65;
  font-size: ${S.FONT_SIZES.COMPLEMENTARY};

  ${a.MEDIA.DESKTOP} {
    ${(0,I.createGapStyles)(x,"","li")};
  }
  ${a.MEDIA.COMPACT} {
    ${(0,I.createGapStyles)(y,"","li")};
  }
`,$=i.default.li.withConfig({displayName:"HeaderActions__Item",componentId:"sc-8ebbdd46-1"})`
  display: flex;
  align-items: center;

  ${({$hiddenAtCompact:e})=>e&&i.css`
      ${a.MEDIA.COMPACT} {
        display: none;
      }
    `};
`,k=(0,i.default)(u.LinkNavigation).withConfig({displayName:"HeaderActions__Link",componentId:"sc-8ebbdd46-2"})`
  color: ${n.COLORS.TEXT_MEDIUM_CONTRAST};
  display: inline-flex;
  text-align: center;
  padding: ${p.SPACINGS.ONE} 0;
`;function N(){let{flatRoutes:e}=(0,v.useHeaderNavigationContext)();return(0,t.jsxs)(C,{children:[(0,t.jsx)($,{$hiddenAtCompact:!0,children:(0,t.jsx)("nav",{"aria-label":"Quick Navigation Menu",children:(0,t.jsx)(C,{children:e.map(e=>(0,t.jsx)($,{children:(0,t.jsx)(k,{slug:e.slug,children:e.title})},e.slug))})})}),(0,t.jsx)($,{$hiddenAtCompact:!0,children:(0,t.jsx)(d.VersionSelector,{})}),(0,t.jsx)($,{children:(0,t.jsx)(L,{})}),(0,t.jsx)($,{$hiddenAtCompact:!0,children:(0,t.jsx)(c.ThemeToggle,{})})]})}var j=e.i(380999),D=e.i(615632),w=e.i(343869),P=e.i(857355);let G=(0,i.default)(D.LinkBare).withConfig({displayName:"HeaderLogo__HeaderLogoWrapper",componentId:"sc-1c24f778-0"})`
  color: ${n.COLORS.TEXT_HIGH_CONTRAST};
  font-size: ${S.FONT_SIZES.H4};
  display: flex;
  align-items: center;
  text-decoration: none;
  line-height: 1;
  font-weight: ${S.FONT_WEIGHTS.EXTRA_BOLD};

  ${a.MEDIA.MIN_XXS} {
    font-size: ${S.FONT_SIZES.CUSTOM(({H4:e})=>e+.2)};
  }
`,M=(0,i.default)(P.SiteLogo).withConfig({displayName:"HeaderLogo__HeaderLogoImage",componentId:"sc-1c24f778-1"})`
  ${(0,j.createSquareSizeStyles)("4rem")};
  border: ${l.BORDER_SIZES.DETAIL} solid ${n.COLORS.DETAIL_LOW_CONTRAST};
  border-radius: 50%;
  margin-right: ${p.SPACINGS.CUSTOM(({ONE:e})=>e)};
  display: flex;

  ${a.MEDIA.MIN_XXS} {
    ${(0,j.createSquareSizeStyles)("4.4rem")};
  }

  > ${P.LogoLightImage},
    > ${P.LogoDarkImage},
    > ${P.LogoLightIcon},
    > ${P.LogoDarkIcon} {
    ${(0,j.createSquareSizeStyles)("100%")};
    padding: ${p.SPACINGS.ONE};
  }
`,B=i.default.span.withConfig({displayName:"HeaderLogo__HeaderLogoText",componentId:"sc-1c24f778-2"})`
  display: flex;
`;function H(){let{TITLE:e}=w.GLOBAL_DATA,{homeRoute:i}=(0,v.useHeaderNavigationContext)();return(0,t.jsxs)(G,{"aria-label":"Permalink to home page",href:i.slug,children:[(0,t.jsx)(M,{}),(0,t.jsx)(B,{children:e})]})}var U=e.i(112426),z=e.i(224583);let W="4rem",F="2.35rem",Y=(0,i.default)(z.ButtonBare).withConfig({displayName:"SidebarNavigationToggle__MainNavigationToggleWrapper",componentId:"sc-24a5efb0-0"})`
  ${(0,j.createSquareSizeStyles)(W)};
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin-left: calc((${W} - ${F}) / 2 * -1);
  margin-right: calc((${W} - ${F}) / 2 * -1);
`,q=i.default.div.withConfig({displayName:"SidebarNavigationToggle__Burger",componentId:"sc-24a5efb0-1"})`
  position: relative;
  > span {
    background-color: ${n.COLORS.TEXT_HIGH_CONTRAST};
    display: block;
    height: 0.2rem;
    border-radius: ${l.BORDER_RADIUSES.LINE};
    position: relative;
    width: ${F};
    &:before,
    &:after {
      background-color: ${n.COLORS.TEXT_HIGH_CONTRAST};
      position: absolute;
      content: "";
      border-radius: ${l.BORDER_RADIUSES.LINE};
      display: block;
      height: 100%;
      width: 100%;
    }
    &:before {
      transform: translateY(0.8rem);
    }
    &:after {
      transform: translateY(-0.8rem);
    }

    ${({$isOpen:e})=>i.css`
      background-color: ${e&&"transparent"};
      &:before {
        transform: ${e&&"rotate(-45deg) translateY(0)"};
      }
      &:after {
        transform: ${e&&"rotate(45deg) translateY(0)"};
      }
    `}};
  }
`;var K=e.i(313313),V=e.i(618566),X=e.i(266349),Z=e.i(169075),J=e.i(646107);let Q="routes-loading-progress",ee=i.default.div.withConfig({displayName:"RoutesLoading__RoutesLoadingWrapper",componentId:"sc-e34cadcf-0"})`
  z-index: ${r.LAYERS.NAVIGATION+r.LAYERS.STEP};
  top: ${o.HEADER_HEIGHT};
  height: ${Z.ROUTES_LOADING_BAR_HEIGHT};
  left: 0;
  right: 0;
  position: absolute;
  pointer-events: none;
  overflow: hidden;
`,et=i.default.div.withConfig({displayName:"RoutesLoading__ProgressBar",componentId:"sc-e34cadcf-1"})`
  ${X.BRAND_GRADIENT_BACKGROUND_STYLES};
  z-index: ${r.LAYERS.STEP};
  height: ${Z.ROUTES_LOADING_BAR_HEIGHT};
  width: 100%;
  opacity: 1;
  animation-duration: ${({$loading:e})=>e?"15s":"1s"};
  animation-name: ${({$animating:e})=>e?Q:"none"};
  animation-fill-mode: forwards;
  animation-timing-function: linear;
  transition: opacity 0.6s;
  pointer-events: none;

  @keyframes ${Q} {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0%);
    }
  }
`;function ei(){let e=(0,_.useAppSelector)(J.selectRoutesLoading),i=(0,_.useAppSelector)((0,T.selectIsModalOpen)(g.MODALS.SIDEBAR_NAVIGATION)),[s,a]=(0,m.useState)(!0),r=(0,V.usePathname)(),n=(0,m.useRef)(r),o=(0,m.useRef)(null),l=(0,m.useRef)(0),c=(0,m.useRef)(0),u=(0,_.useAppDispatch)(),d=(0,m.useCallback)(()=>a(!1),[]);return(0,h.useEventListener)("animationend",d,o),(0,m.useEffect)(()=>{if(!e)return;let t=o.current;t&&(a(!0),t.style.animationName="none",t.style.opacity="0",l.current=window.requestAnimationFrame(()=>{c.current=window.setTimeout(()=>{t.style.animationName="",t.style.opacity="1"},0)}))},[e]),(0,m.useEffect)(()=>{if(e)return;let t=l.current,i=c.current;t&&cancelAnimationFrame(t),i&&clearTimeout(i),o.current&&(o.current.style.opacity="0")},[e]),(0,m.useEffect)(()=>{r!==n.current&&i&&u((0,T.setModalClosed)()),n.current=r,u((0,J.setRoutesLoading)(!1))},[r,i,u]),(0,m.useEffect)(()=>()=>{let e=l.current,t=c.current;e&&cancelAnimationFrame(e),t&&clearTimeout(t)},[]),(0,t.jsx)(ee,{children:(0,t.jsx)(et,{ref:o,$loading:e,$animating:s})})}let es=i.css`
  height: ${o.HEADER_HEIGHT};
`,ea=i.default.header.withConfig({displayName:"Header__HeaderWrapper",componentId:"sc-935d5c1a-0"})`
  ${es};
  z-index: ${r.LAYERS.HEADER};
  background-color: rgba(${n.COLORS.BACKGROUND_SITE_RGB_VALUE}, 0.85);
  border-bottom: ${l.BORDER_SIZES.DETAIL} solid ${n.COLORS.DETAIL_LOW_CONTRAST};
  backdrop-filter: saturate(180%) blur(5px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  ${a.MEDIA.DESKTOP} {
    position: sticky;
    z-index: ${r.LAYERS.NAVIGATION+1};
  }
`,er=(0,i.default)(s.PageFrame).withConfig({displayName:"Header__Content",componentId:"sc-935d5c1a-1"})`
  ${es};
  display: flex;
  align-items: center;
  justify-content: space-between;
`,en=(0,i.default)(function(i){let s=(0,_.useAppSelector)((0,T.selectIsModalOpen)(g.MODALS.SIDEBAR_NAVIGATION)),a=s?"Hide":"Show",r=(0,m.useRef)(null),n=(0,_.useAppDispatch)(),o=(0,m.useCallback)(()=>{s?n((0,T.setModalClosed)()):n((0,T.setModalOpen)(g.MODALS.SIDEBAR_NAVIGATION))},[n,s]),l=(0,m.useCallback)(async()=>({default:(await e.A(336036)).SidebarNavigationMenuCompact}),[]);return(0,h.useEventListener)("mouseenter",l,r,{passive:!0}),(0,h.useEventListener)("touchstart",l,r,{passive:!0}),(0,t.jsx)(Y,{id:U.SIDEBAR_NAVIGATION_ID,onClick:o,"aria-expanded":s,"aria-label":`${a} ${U.SIDEBAR_NAVIGATION_ID_PRETTY}`,ref:r,type:"button",...i,children:(0,t.jsx)(q,{$isOpen:s,"aria-hidden":"true",children:(0,t.jsx)("span",{})})})}).withConfig({displayName:"Header__NavigationToggle",componentId:"sc-935d5c1a-2"})`
  ${a.MEDIA.DESKTOP} {
    display: none;
  }
`,eo=i.default.div.withConfig({displayName:"Header__Placeholder",componentId:"sc-935d5c1a-3"})`
  height: ${o.HEADER_HEIGHT};

  ${a.MEDIA.DESKTOP} {
    display: none;
  }
`;e.s(["Header",0,function(){return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(ea,{id:o.HEADER_ID,children:[(0,t.jsxs)(er,{children:[(0,t.jsx)(en,{}),(0,t.jsx)(H,{}),(0,t.jsx)(N,{})]}),(0,t.jsx)(ei,{}),(0,t.jsx)(K.HeaderGradient,{})]}),(0,t.jsx)(eo,{})]})}],857825)},828525,e=>{"use strict";var t=e.i(271645),i=e.i(618566),s=e.i(689368);e.s(["ScrollToHashInit",0,function(){let e=(0,i.usePathname)();return(0,t.useEffect)(()=>{(0,s.scrollToHash)(window.location.hash)},[e]),(0,t.useEffect)(()=>{function e(){(0,s.scrollToHash)(window.location.hash)}return window.addEventListener("hashchange",e),()=>window.removeEventListener("hashchange",e)},[]),null}])},676327,e=>{e.v(t=>Promise.all(["static/chunks/2yn7yp736v3hc.js","static/chunks/0gqnpwqhyhmgr.js"].map(t=>e.l(t))).then(()=>t(974800)))},336036,e=>{e.v(t=>Promise.all(["static/chunks/4543p21ce5ib7.js"].map(t=>e.l(t))).then(()=>t(991527)))},409072,e=>{e.v(t=>Promise.all(["static/chunks/2s-fg1pdqw5dt.js"].map(t=>e.l(t))).then(()=>t(237865)))},929660,e=>{e.v(t=>Promise.all(["static/chunks/2xxeoqbt1g4u6.js","static/chunks/0bryf2u4-6-ky.js","static/chunks/2wegbe4auqm53.js"].map(t=>e.l(t))).then(()=>t(338438)))},35740,e=>{e.v(t=>Promise.all(["static/chunks/0fv136wt9kaxd.js","static/chunks/0bryf2u4-6-ky.js","static/chunks/2wegbe4auqm53.js"].map(t=>e.l(t))).then(()=>t(988610)))},800797,e=>{e.v(t=>Promise.all(["static/chunks/2qgmuqc8-e17y.js","static/chunks/0bryf2u4-6-ky.js","static/chunks/2wegbe4auqm53.js"].map(t=>e.l(t))).then(()=>t(944314)))},991167,e=>{e.v(t=>Promise.all(["static/chunks/2z6pujqz8tns3.js","static/chunks/0bryf2u4-6-ky.js","static/chunks/2wegbe4auqm53.js"].map(t=>e.l(t))).then(()=>t(834512)))},96321,e=>{e.v(t=>Promise.all(["static/chunks/0zii81svsbt3o.js","static/chunks/0bryf2u4-6-ky.js","static/chunks/2wegbe4auqm53.js"].map(t=>e.l(t))).then(()=>t(480128)))},976870,e=>{e.v(t=>Promise.all(["static/chunks/32d3n0vef38xp.js","static/chunks/0bryf2u4-6-ky.js","static/chunks/2wegbe4auqm53.js"].map(t=>e.l(t))).then(()=>t(521755)))},686409,e=>{e.v(t=>Promise.all(["static/chunks/1gq3r_ep1n74-.js","static/chunks/0bryf2u4-6-ky.js","static/chunks/2wegbe4auqm53.js"].map(t=>e.l(t))).then(()=>t(530257)))},2575,e=>{e.v(t=>Promise.all(["static/chunks/2avkt38tvabkw.js","static/chunks/0bryf2u4-6-ky.js","static/chunks/2wegbe4auqm53.js"].map(t=>e.l(t))).then(()=>t(45684)))},485243,e=>{e.v(t=>Promise.all(["static/chunks/40y7gl87p4hfj.js","static/chunks/0bryf2u4-6-ky.js","static/chunks/2wegbe4auqm53.js"].map(t=>e.l(t))).then(()=>t(498519)))},674811,e=>{e.v(t=>Promise.all(["static/chunks/3xcx1d6k_mw7-.js","static/chunks/0bryf2u4-6-ky.js","static/chunks/2wegbe4auqm53.js"].map(t=>e.l(t))).then(()=>t(673263)))},818122,e=>{e.v(t=>Promise.all(["static/chunks/2vim4bie_w_ud.js","static/chunks/0bryf2u4-6-ky.js","static/chunks/2wegbe4auqm53.js"].map(t=>e.l(t))).then(()=>t(122455)))},703697,e=>{e.v(t=>Promise.all(["static/chunks/30s69ukm4hdtq.js","static/chunks/0bryf2u4-6-ky.js","static/chunks/2wegbe4auqm53.js"].map(t=>e.l(t))).then(()=>t(78629)))},125897,e=>{e.v(t=>Promise.all(["static/chunks/25318bolpfkph.js","static/chunks/0bryf2u4-6-ky.js","static/chunks/2wegbe4auqm53.js"].map(t=>e.l(t))).then(()=>t(668123)))},850751,e=>{e.v(t=>Promise.all(["static/chunks/0kssb9xuvs_ok.js","static/chunks/0bryf2u4-6-ky.js","static/chunks/2wegbe4auqm53.js"].map(t=>e.l(t))).then(()=>t(992209)))},398209,e=>{e.v(t=>Promise.all(["static/chunks/3av5ac1kcc51p.js","static/chunks/0bryf2u4-6-ky.js","static/chunks/2wegbe4auqm53.js"].map(t=>e.l(t))).then(()=>t(874785)))},135635,e=>{e.v(t=>Promise.all(["static/chunks/3v6m_gf4-6gzb.js","static/chunks/0bryf2u4-6-ky.js","static/chunks/2wegbe4auqm53.js"].map(t=>e.l(t))).then(()=>t(601874)))},135526,e=>{e.v(t=>Promise.all(["static/chunks/2u0_nnau8l688.js","static/chunks/0bryf2u4-6-ky.js","static/chunks/2wegbe4auqm53.js"].map(t=>e.l(t))).then(()=>t(331587)))},864407,e=>{e.v(t=>Promise.all(["static/chunks/41jaepjjcaljs.js","static/chunks/0bryf2u4-6-ky.js","static/chunks/2wegbe4auqm53.js"].map(t=>e.l(t))).then(()=>t(1712)))},289794,e=>{e.v(t=>Promise.all(["static/chunks/25-dnxblco0n-.js","static/chunks/0bryf2u4-6-ky.js","static/chunks/2wegbe4auqm53.js"].map(t=>e.l(t))).then(()=>t(704255)))},673525,e=>{e.v(t=>Promise.all(["static/chunks/1ok1ry5vccgll.js","static/chunks/0bryf2u4-6-ky.js","static/chunks/2wegbe4auqm53.js"].map(t=>e.l(t))).then(()=>t(433790)))},330741,e=>{e.v(t=>Promise.all(["static/chunks/09nb4dz45e0cu.js","static/chunks/0bryf2u4-6-ky.js","static/chunks/2wegbe4auqm53.js"].map(t=>e.l(t))).then(()=>t(275449)))},582682,e=>{e.v(t=>Promise.all(["static/chunks/01ulhd8jtx0gx.js","static/chunks/0bryf2u4-6-ky.js","static/chunks/2wegbe4auqm53.js"].map(t=>e.l(t))).then(()=>t(707027)))},827998,e=>{e.v(t=>Promise.all(["static/chunks/0keyfohuhz7to.js","static/chunks/0bryf2u4-6-ky.js","static/chunks/2wegbe4auqm53.js"].map(t=>e.l(t))).then(()=>t(891220)))},482524,e=>{e.v(t=>Promise.all(["static/chunks/1z3mc_r8r0m1z.js","static/chunks/0bryf2u4-6-ky.js","static/chunks/2wegbe4auqm53.js"].map(t=>e.l(t))).then(()=>t(830213)))},867910,e=>{e.v(t=>Promise.all(["static/chunks/38gvus9yk9xhb.js","static/chunks/0bryf2u4-6-ky.js","static/chunks/2wegbe4auqm53.js"].map(t=>e.l(t))).then(()=>t(230037)))},180971,e=>{e.v(t=>Promise.all(["static/chunks/1kmc9_dl8efz1.js","static/chunks/0bryf2u4-6-ky.js","static/chunks/2wegbe4auqm53.js"].map(t=>e.l(t))).then(()=>t(968738)))},168325,e=>{e.v(t=>Promise.all(["static/chunks/0sto0acawm9on.js","static/chunks/0bryf2u4-6-ky.js","static/chunks/2wegbe4auqm53.js"].map(t=>e.l(t))).then(()=>t(364516)))},63358,e=>{e.v(t=>Promise.all(["static/chunks/2cisz4q31fl5x.js","static/chunks/0bryf2u4-6-ky.js","static/chunks/2wegbe4auqm53.js"].map(t=>e.l(t))).then(()=>t(217488)))},687171,e=>{e.v(t=>Promise.all(["static/chunks/3z3e3681-kswc.js","static/chunks/0bryf2u4-6-ky.js","static/chunks/2wegbe4auqm53.js"].map(t=>e.l(t))).then(()=>t(516838)))},406090,e=>{e.v(t=>Promise.all(["static/chunks/26zgp_d9fqmm1.js","static/chunks/0bryf2u4-6-ky.js","static/chunks/2wegbe4auqm53.js"].map(t=>e.l(t))).then(()=>t(587636)))},502971,e=>{e.v(t=>Promise.all(["static/chunks/1zva3mtf5xkab.js","static/chunks/0bryf2u4-6-ky.js","static/chunks/2wegbe4auqm53.js"].map(t=>e.l(t))).then(()=>t(238353)))},159592,e=>{e.v(t=>Promise.all(["static/chunks/1ke8vjnt_jmbn.js","static/chunks/0bryf2u4-6-ky.js","static/chunks/2wegbe4auqm53.js"].map(t=>e.l(t))).then(()=>t(700675)))},657506,e=>{e.v(t=>Promise.all(["static/chunks/17fd14s_a1y7y.js","static/chunks/0bryf2u4-6-ky.js","static/chunks/2wegbe4auqm53.js"].map(t=>e.l(t))).then(()=>t(27207)))},704187,e=>{e.v(t=>Promise.all(["static/chunks/1f2dzqgktq1wo.js","static/chunks/0bryf2u4-6-ky.js","static/chunks/2wegbe4auqm53.js"].map(t=>e.l(t))).then(()=>t(236442)))},84394,e=>{e.v(t=>Promise.all(["static/chunks/028b_m0rqzlm-.js","static/chunks/0bryf2u4-6-ky.js","static/chunks/2wegbe4auqm53.js"].map(t=>e.l(t))).then(()=>t(143025)))},211232,e=>{e.v(t=>Promise.all(["static/chunks/0i_dx70784ad8.js","static/chunks/2a_1qgvtx0sr6.js","static/chunks/1ua6xv9g6vbuw.js","static/chunks/0bryf2u4-6-ky.js"].map(t=>e.l(t))).then(()=>t(372090)))},718133,e=>{e.v(t=>Promise.all(["static/chunks/0a7urknu8p6an.js","static/chunks/2a_1qgvtx0sr6.js","static/chunks/1ua6xv9g6vbuw.js","static/chunks/0bryf2u4-6-ky.js"].map(t=>e.l(t))).then(()=>t(352293)))},602743,e=>{e.v(t=>Promise.all(["static/chunks/15fjy5fv12sy8.js","static/chunks/2a_1qgvtx0sr6.js","static/chunks/1ua6xv9g6vbuw.js","static/chunks/0bryf2u4-6-ky.js"].map(t=>e.l(t))).then(()=>t(144895)))},126725,e=>{e.v(t=>Promise.all(["static/chunks/2qgrdi8dhqkls.js","static/chunks/2a_1qgvtx0sr6.js","static/chunks/1ua6xv9g6vbuw.js","static/chunks/0bryf2u4-6-ky.js"].map(t=>e.l(t))).then(()=>t(71632)))},809964,e=>{e.v(t=>Promise.all(["static/chunks/1nml68ulifswb.js","static/chunks/2a_1qgvtx0sr6.js","static/chunks/1ua6xv9g6vbuw.js","static/chunks/0bryf2u4-6-ky.js"].map(t=>e.l(t))).then(()=>t(343418)))},720744,e=>{e.v(t=>Promise.all(["static/chunks/0v-6f_793v4at.js","static/chunks/2a_1qgvtx0sr6.js","static/chunks/1ua6xv9g6vbuw.js","static/chunks/0bryf2u4-6-ky.js"].map(t=>e.l(t))).then(()=>t(178191)))},732475,e=>{e.v(t=>Promise.all(["static/chunks/30s64z4m2p2he.js","static/chunks/2a_1qgvtx0sr6.js","static/chunks/1ua6xv9g6vbuw.js","static/chunks/0bryf2u4-6-ky.js"].map(t=>e.l(t))).then(()=>t(304381)))},262001,e=>{e.v(t=>Promise.all(["static/chunks/3xxvfhanc-y-2.js","static/chunks/2a_1qgvtx0sr6.js","static/chunks/1ua6xv9g6vbuw.js","static/chunks/0bryf2u4-6-ky.js"].map(t=>e.l(t))).then(()=>t(996389)))},474088,e=>{e.v(t=>Promise.all(["static/chunks/0qp0ulpdvpy_f.js","static/chunks/2a_1qgvtx0sr6.js","static/chunks/1ua6xv9g6vbuw.js","static/chunks/0bryf2u4-6-ky.js"].map(t=>e.l(t))).then(()=>t(24840)))},189029,e=>{e.v(t=>Promise.all(["static/chunks/2cgvz8ngynr1z.js","static/chunks/2a_1qgvtx0sr6.js","static/chunks/1ua6xv9g6vbuw.js","static/chunks/0bryf2u4-6-ky.js"].map(t=>e.l(t))).then(()=>t(462721)))},321556,e=>{e.v(t=>Promise.all(["static/chunks/1xom42qeyyn1s.js","static/chunks/453cczs4l2und.js","static/chunks/1ua6xv9g6vbuw.js","static/chunks/0bryf2u4-6-ky.js"].map(t=>e.l(t))).then(()=>t(13074)))},643267,e=>{e.v(t=>Promise.all(["static/chunks/1lun1v741r8c5.js","static/chunks/2a_1qgvtx0sr6.js","static/chunks/1ua6xv9g6vbuw.js","static/chunks/0bryf2u4-6-ky.js"].map(t=>e.l(t))).then(()=>t(110491)))},822087,e=>{e.v(t=>Promise.all(["static/chunks/0do75vx97_nyw.js","static/chunks/2a_1qgvtx0sr6.js","static/chunks/1ua6xv9g6vbuw.js","static/chunks/0bryf2u4-6-ky.js"].map(t=>e.l(t))).then(()=>t(224909)))},230095,e=>{e.v(t=>Promise.all(["static/chunks/1lfo0rawiec9j.js","static/chunks/2a_1qgvtx0sr6.js","static/chunks/1ua6xv9g6vbuw.js","static/chunks/0bryf2u4-6-ky.js"].map(t=>e.l(t))).then(()=>t(274185)))},733996,e=>{e.v(t=>Promise.all(["static/chunks/2x7fryy51a-5s.js","static/chunks/2a_1qgvtx0sr6.js","static/chunks/1ua6xv9g6vbuw.js","static/chunks/0bryf2u4-6-ky.js"].map(t=>e.l(t))).then(()=>t(713571)))},430642,e=>{e.v(t=>Promise.all(["static/chunks/2a_1qgvtx0sr6.js","static/chunks/0044ofm5a116n.js","static/chunks/1ua6xv9g6vbuw.js","static/chunks/0bryf2u4-6-ky.js"].map(t=>e.l(t))).then(()=>t(360860)))},313316,e=>{e.v(t=>Promise.all(["static/chunks/0d0ke-v1gy_lo.js","static/chunks/2a_1qgvtx0sr6.js","static/chunks/1ua6xv9g6vbuw.js","static/chunks/0bryf2u4-6-ky.js"].map(t=>e.l(t))).then(()=>t(297674)))},240333,e=>{e.v(t=>Promise.all(["static/chunks/3bub-r39san-e.js","static/chunks/2a_1qgvtx0sr6.js","static/chunks/1ua6xv9g6vbuw.js","static/chunks/0bryf2u4-6-ky.js"].map(t=>e.l(t))).then(()=>t(446556)))},653436,e=>{e.v(t=>Promise.all(["static/chunks/1gbu6z3ubga97.js","static/chunks/2a_1qgvtx0sr6.js","static/chunks/1ua6xv9g6vbuw.js","static/chunks/0bryf2u4-6-ky.js"].map(t=>e.l(t))).then(()=>t(991359)))},764557,e=>{e.v(t=>Promise.all(["static/chunks/13j0iz1aq4ycc.js","static/chunks/2a_1qgvtx0sr6.js","static/chunks/1ua6xv9g6vbuw.js","static/chunks/0bryf2u4-6-ky.js"].map(t=>e.l(t))).then(()=>t(664715)))},511493,e=>{e.v(t=>Promise.all(["static/chunks/3lk1l23qfh7qa.js","static/chunks/2a_1qgvtx0sr6.js","static/chunks/1ua6xv9g6vbuw.js","static/chunks/0bryf2u4-6-ky.js"].map(t=>e.l(t))).then(()=>t(413044)))},781565,e=>{e.v(t=>Promise.all(["static/chunks/35in26_l94oth.js","static/chunks/2a_1qgvtx0sr6.js","static/chunks/1ua6xv9g6vbuw.js","static/chunks/0bryf2u4-6-ky.js"].map(t=>e.l(t))).then(()=>t(826276)))},343858,e=>{e.v(t=>Promise.all(["static/chunks/3mqaynlv86eew.js","static/chunks/2a_1qgvtx0sr6.js","static/chunks/1ua6xv9g6vbuw.js","static/chunks/0bryf2u4-6-ky.js"].map(t=>e.l(t))).then(()=>t(362926)))},597704,e=>{e.v(t=>Promise.all(["static/chunks/3nuwjkdl3koc1.js","static/chunks/2a_1qgvtx0sr6.js","static/chunks/1ua6xv9g6vbuw.js","static/chunks/0bryf2u4-6-ky.js"].map(t=>e.l(t))).then(()=>t(507596)))},548014,e=>{e.v(t=>Promise.all(["static/chunks/1qlpenqmhwe1f.js","static/chunks/453cczs4l2und.js","static/chunks/1ua6xv9g6vbuw.js","static/chunks/0bryf2u4-6-ky.js"].map(t=>e.l(t))).then(()=>t(938301)))},498060,e=>{e.v(t=>Promise.all(["static/chunks/44df8i-en_yy-.js","static/chunks/453cczs4l2und.js","static/chunks/1ua6xv9g6vbuw.js","static/chunks/0bryf2u4-6-ky.js"].map(t=>e.l(t))).then(()=>t(605015)))},888324,e=>{e.v(t=>Promise.all(["static/chunks/227uh58ob0_fu.js","static/chunks/2a_1qgvtx0sr6.js","static/chunks/1ua6xv9g6vbuw.js","static/chunks/0bryf2u4-6-ky.js"].map(t=>e.l(t))).then(()=>t(698552)))},30376,e=>{e.v(t=>Promise.all(["static/chunks/2kmto1r2epn-k.js","static/chunks/2a_1qgvtx0sr6.js","static/chunks/1ua6xv9g6vbuw.js","static/chunks/0bryf2u4-6-ky.js"].map(t=>e.l(t))).then(()=>t(489209)))},326290,e=>{e.v(t=>Promise.all(["static/chunks/2t1_h1l6gfbi6.js","static/chunks/2a_1qgvtx0sr6.js","static/chunks/1ua6xv9g6vbuw.js","static/chunks/0bryf2u4-6-ky.js"].map(t=>e.l(t))).then(()=>t(984648)))},799308,e=>{e.v(t=>Promise.all(["static/chunks/1d7mcc8qipk4j.js","static/chunks/2a_1qgvtx0sr6.js","static/chunks/1ua6xv9g6vbuw.js","static/chunks/0bryf2u4-6-ky.js"].map(t=>e.l(t))).then(()=>t(416104)))},80891,e=>{e.v(t=>Promise.all(["static/chunks/11f8z0r2n6z2q.js","static/chunks/2a_1qgvtx0sr6.js","static/chunks/1ua6xv9g6vbuw.js","static/chunks/0bryf2u4-6-ky.js"].map(t=>e.l(t))).then(()=>t(155921)))},239020,e=>{e.v(t=>Promise.all(["static/chunks/3g41j93qp4zzb.js","static/chunks/2a_1qgvtx0sr6.js","static/chunks/1ua6xv9g6vbuw.js","static/chunks/0bryf2u4-6-ky.js"].map(t=>e.l(t))).then(()=>t(706189)))},791876,e=>{e.v(t=>Promise.all(["static/chunks/0ja8ti21xpx2r.js","static/chunks/2a_1qgvtx0sr6.js","static/chunks/1ua6xv9g6vbuw.js","static/chunks/0bryf2u4-6-ky.js"].map(t=>e.l(t))).then(()=>t(699321)))},198251,e=>{e.v(t=>Promise.all(["static/chunks/093clo0isf-s3.js","static/chunks/2a_1qgvtx0sr6.js","static/chunks/1ua6xv9g6vbuw.js","static/chunks/0bryf2u4-6-ky.js"].map(t=>e.l(t))).then(()=>t(485064)))},76927,e=>{e.v(t=>Promise.all(["static/chunks/1x2ngipyann6i.js","static/chunks/2a_1qgvtx0sr6.js","static/chunks/1ua6xv9g6vbuw.js","static/chunks/0bryf2u4-6-ky.js"].map(t=>e.l(t))).then(()=>t(205465)))},958547,e=>{e.v(t=>Promise.all(["static/chunks/3l1qgnvj2s7y0.js","static/chunks/2a_1qgvtx0sr6.js","static/chunks/1ua6xv9g6vbuw.js","static/chunks/0bryf2u4-6-ky.js"].map(t=>e.l(t))).then(()=>t(551454)))},103799,e=>{e.v(t=>Promise.all(["static/chunks/3lq-d4zc6ri2f.js","static/chunks/2a_1qgvtx0sr6.js","static/chunks/1ua6xv9g6vbuw.js","static/chunks/0bryf2u4-6-ky.js"].map(t=>e.l(t))).then(()=>t(116848)))}]);