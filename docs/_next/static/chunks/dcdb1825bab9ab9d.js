(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,863552,e=>{"use strict";var t=e.i(997053),i=e.i(907827),a=e.i(350437),s=e.i(801770),n=e.i(671249),r=e.i(925866),o=e.i(380999),l=e.i(700810),c=e.i(166734),d=e.i(266349),u=e.i(772798);let p="48rem",f="19rem",S="1rem",_="22.2rem",E="3.6rem",m="1.8rem",h="2.5rem",g="0.6rem",A=a.COLORS.BRAND_PRIMARY,O=t.css`
  border-radius: ${n.BORDER_RADIUSES.SOFT};
`,b=t.css`
  border: ${n.BORDER_SIZES.OUTLINE} solid ${a.COLORS.DETAIL_MEDIUM_CONTRAST};
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
  ${b};
  ${O};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${a.COLORS.TEXT_BODY};
  font-weight: ${r.FONT_WEIGHTS.BOLD};
  font-size: ${r.FONT_SIZES.COMPLEMENTARY};
  padding: 0 ${s.SPACINGS.FOUR};
  min-height: ${E};
`,I=t.css`
  .embla__text-input {
    ${c.TAP_HIGHLIGHT_STYLES};
    -webkit-appearance: none;
    appearance: none;
    touch-action: manipulation;
    color: ${a.COLORS.TEXT_BODY};
    background-color: ${a.COLORS.BACKGROUND_CODE};
    border: ${n.BORDER_SIZES.DETAIL} solid ${a.COLORS.DETAIL_LOW_CONTRAST};
    padding: ${s.SPACINGS.ONE} ${s.SPACINGS.ONE};
    font-size: ${r.FONT_SIZES.BODY};
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
`,C=t.css`
  ${I};

  .embla__text-form {
    display: flex;
    justify-content: space-between;
    gap: ${s.SPACINGS.TWO};
    margin-bottom: ${m};
    font-size: ${r.FONT_SIZES.COMPLEMENTARY};
  }

  .embla__text-form__label {
    display: flex;
    align-items: center;
    gap: ${s.SPACINGS.ONE};
    font-weight: ${r.FONT_WEIGHTS.SEMI_BOLD};
  }

  .embla__text-form__submit {
    ${L};
    padding: 0 ${s.SPACINGS.THREE};
  }
`,$=t.css`
  .embla__radio-form {
    min-height: ${E};
    display: flex;
    align-items: center;
    font-size: ${r.FONT_SIZES.COMPLEMENTARY};
  }

  .embla__radio-wrapper {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .embla__radio-input__wrapper {
    flex: 0 0 ${h};
    position: relative;
    min-width: 0;
    margin-right: ${s.SPACINGS.ONE};
  }

  .embla__radio-input__line-height {
    color: ${a.COLORS.BACKGROUND_SITE};
    width: ${h};
    display: inline-block;
    line-height: inherit;
  }

  .embla__radio-form__label {
    display: flex;
    align-items: center;
    font-size: ${r.FONT_SIZES.COMPLEMENTARY};
    font-weight: ${r.FONT_WEIGHTS.SEMI_BOLD};
    gap: ${s.SPACINGS.ONE};
  }

  .embla__radio-wrapper input {
    ${c.TAP_HIGHLIGHT_STYLES};
    ${(0,o.createSquareSizeStyles)(h)};
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
    background-color: ${a.COLORS.DETAIL_MEDIUM_CONTRAST};
    cursor: pointer;
    border-radius: ${n.BORDER_RADIUSES.CIRCLE};

    &:before,
    &:after {
      border-radius: ${n.BORDER_RADIUSES.CIRCLE};
      display: block;
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    &:before {
      ${(0,o.createSquareSizeStyles)("2rem")};
      background-color: ${a.COLORS.BACKGROUND_CODE};
    }

    &:after {
      ${(0,o.createSquareSizeStyles)("1.2rem")};
    }

    &:checked {
      &:after {
        ${d.BRAND_GRADIENT_BACKGROUND_STYLES};
      }
    }

    &[disabled] {
      cursor: not-allowed;
    }

    &[disabled]:checked {
      &:after {
        background-image: none;
        background-color: ${a.COLORS.DETAIL_HIGH_CONTRAST};
      }
    }
  }
`,x=t.css`
  ${$};

  .embla__radio-form {
    display: flex;
    gap: ${s.SPACINGS.TWO};
    margin-bottom: ${m};
  }

  .embla__text-form__label {
    display: flex;
    align-items: center;
    font-size: ${r.FONT_SIZES.COMPLEMENTARY};
    font-weight: ${r.FONT_WEIGHTS.SEMI_BOLD};
    gap: ${s.SPACINGS.ONE};
  }
`,v=t.css`
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
    border-radius: ${n.BORDER_RADIUSES.CARD};
    ${d.BRAND_GRADIENT_BACKGROUND_STYLES};
    border: ${n.BORDER_SIZES.OUTLINE} solid ${a.COLORS.BACKGROUND_SITE};

    &:after {
      display: block;
      content: '';
      position: absolute;
      border-radius: ${n.BORDER_RADIUSES.CARD};
      border: ${n.BORDER_SIZES.OUTLINE} solid ${a.COLORS.TEXT_BODY};
      top: -${n.BORDER_SIZES.ACCENT_VERTICAL};
      bottom: -${n.BORDER_SIZES.ACCENT_VERTICAL};
      left: -${n.BORDER_SIZES.ACCENT_VERTICAL};
      right: -${n.BORDER_SIZES.ACCENT_VERTICAL};
    }
  }

  .embla__align-indicator--start {
    left: ${n.BORDER_SIZES.OUTLINE};
  }

  .embla__align-indicator--center {
    left: 50%;
    transform: translateX(-50%);
  }

  .embla__align-indicator--end {
    right: ${n.BORDER_SIZES.OUTLINE};
  }
`,N=t.css`
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
    border-top: ${g} solid ${A};
    border-bottom: ${g} solid ${A};
    border-left: ${g} solid ${A};
  }

  .embla__group__indicator--end {
    left: 0;
    right: 0;
    border-top: ${g} solid ${A};
    border-bottom: ${g} solid ${A};
    border-right: ${g} solid ${A};
  }

  .embla__group__indicator--center {
    left: 0;
    right: 0;
    border-top: ${g} solid ${A};
    border-bottom: ${g} solid ${A};
  }

  .embla__group__indicator--single {
    left: var(--slide-spacing);
    right: 0px;
    border: ${g} solid ${A};
  }

  .embla--group-indicator-hidden .embla__group__indicator {
    display: none;
  }
`,y=t.css`
  .embla {
    max-width: ${p};
    margin: auto;

    --slide-height: ${f};
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
`,j=t.css`
  .embla {
    max-width: ${p};
    margin: auto;

    --slide-height: ${f};
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
`,k=t.css`
  .embla__slide__number {
    ${b};
    ${O};
    font-size: ${r.FONT_SIZES.CUSTOM(()=>4)};
    font-weight: ${r.FONT_WEIGHTS.SEMI_BOLD};
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
`,P=t.css`
  .embla__slide__img {
    ${T};
    ${O};
  }
`,w=t.css`
  .embla__controls {
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    gap: ${s.SPACINGS.TWO};
    margin-top: ${m};
  }
`,G=t.css`
  .embla__buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${s.SPACINGS.ONE};
    align-items: center;
  }

  .embla__button {
    ${R};
    ${b};
    ${(0,o.createSquareSizeStyles)(E)}
    z-index: ${i.LAYERS.STEP};
    border-radius: ${n.BORDER_RADIUSES.CIRCLE};
    color: ${a.COLORS.TEXT_BODY};
    display: flex;
    align-items: center;
    justify-content: center;
    transform: rotate(0deg);
  }

  .embla__button--disabled {
    color: ${a.COLORS.DETAIL_HIGH_CONTRAST};
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
    border-radius: ${n.BORDER_RADIUSES.CIRCLE};
    position: relative;
  }

  .embla__dot:before,
  .embla__dot:after {
    ${(0,o.createSquareSizeStyles)("1.4rem")}
    border-radius: ${n.BORDER_RADIUSES.CIRCLE};
    position: absolute;
    display: flex;
    align-items: center;
    content: '';
  }

  .embla__dot:before {
    border: ${n.BORDER_SIZES.OUTLINE} solid ${a.COLORS.DETAIL_MEDIUM_CONTRAST};
  }

  .embla__dot:after {
    border: ${n.BORDER_SIZES.OUTLINE} solid ${a.COLORS.TEXT_BODY};
    opacity: 0;
  }

  .embla__dot--selected:after {
    opacity: 1;
  }
`;t.css`
  .embla__live-region {
    ${u.visuallyHiddenStyles};
  }
`;let B=t.css`
  .embla__selected-snap-display {
    justify-self: flex-end;
    align-self: center;
    color: ${a.COLORS.TEXT_LOW_CONTRAST};
    font-weight: ${r.FONT_WEIGHTS.SEMI_BOLD};
  }
`,H=t.css`
  .embla__play {
    ${L};
    min-width: ${s.SPACINGS.FIFTEEN};
    justify-self: flex-end;
  }
`,U=t.css`
  .embla__progress {
    ${O};
    box-shadow: inset 0 0 0 ${n.BORDER_SIZES.OUTLINE}
      ${a.COLORS.DETAIL_MEDIUM_CONTRAST};
    background-color: ${a.COLORS.BACKGROUND_SITE};
    position: relative;
    height: 0.6rem;
    justify-self: flex-end;
    align-self: center;
    width: 13rem;
    max-width: 90%;
    overflow: hidden;
  }

  .embla__progress__bar {
    background-color: ${a.COLORS.TEXT_BODY};
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
    border-bottom: 0.5px solid rgba(${a.COLORS.TEXT_HIGH_CONTRAST_RGB_VALUE}, 0.3);
    background: linear-gradient(
      to top,
      rgba(${a.COLORS.BACKGROUND_SITE_RGB_VALUE}, 0.65) 0%,
      rgba(${a.COLORS.BACKGROUND_SITE_RGB_VALUE}, 1) 100%
    );
  }

  .embla:after {
    bottom: -0.5px;
    border-top: 0.5px solid rgba(${a.COLORS.TEXT_HIGH_CONTRAST_RGB_VALUE}, 0.3);
    background: linear-gradient(
      to bottom,
      rgba(${a.COLORS.BACKGROUND_SITE_RGB_VALUE}, 0.65) 0%,
      rgba(${a.COLORS.BACKGROUND_SITE_RGB_VALUE}, 1) 100%
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
    font-weight: ${r.FONT_WEIGHTS.BOLD};
    transform: translateX(-55px);
    pointer-events: none;
  }
`,W=/--slide-size:\s*100%;/gi,F=/--slide-spacing:\s*1rem;/gi,Y=/height\s*:\s*var\(\s*--slide-height\s*\)\s*;?/,K=/transform\s*:\s*rotate\(0deg\)\s*;?/,V=/\.embla__slide__number\s*\{[\s\S]*?\bheight\s*:\s*var\(\s*--slide-height\s*\)\s*;?[\s\S]*?\}/,X=/\.embla__button\s*\{[\s\S]*?\btransform\s*:\s*rotate\(0deg\)\s*;?[\s\S]*?\}/;e.s(["ALIGNMENT_INDICATOR_STYLES",0,v,"ARROWS_STYLES",0,G,"CAROUSEL_BORDER_STYLES",0,b,"CAROUSEL_BUTTON_BASE_STYLES",0,R,"CAROUSEL_CONTROLS_SPACING",0,m,"CAROUSEL_DEFAULT_HEIGHT",0,f,"CAROUSEL_IOS_PICKER_HEIGHT",0,_,"CAROUSEL_MAX_WIDTH",0,p,"CAROUSEL_NAV_BUTTON_SIZE",0,E,"CAROUSEL_SCROLLBAR_HEIGHT",0,"1.6rem","CAROUSEL_SCROLLBAR_SPACING",0,m,"CAROUSEL_SCROLLBAR_TRACK_HEIGHT",0,"0.6rem","CAROUSEL_SLIDE_RADIUS_STYLES",0,O,"CAROUSEL_THUMB_SLIDES_HEIGHT",0,"6rem","CAROUSEL_THUMB_SLIDES_SPACING",0,"0.8rem","CONTROLS_STYLES",0,w,"DOTS_STYLES",0,M,"GROUP_INDICATOR_STYLES",0,N,"IMAGE_ROUNDED_STYLES",0,P,"IMAGE_STYLES",0,D,"IOS_PICKER_STYLES",0,z,"PLAY_BUTTON_STYLES",0,H,"PROGRESS_STYLES",0,U,"RADIO_INPUT_FORM_STYLES",0,x,"SLIDE_NUMBER_STYLES",0,k,"SNAP_DISPLAY_STYLES",0,B,"TEXT_INPUT_FORM_STYLES",0,C,"examplesCarouselStyles",0,(e="100%",t=S,i={},a="",s="")=>{let n="y"!==i.axis,r="rtl"===i.direction;return((s||(0,l.styledComponentsStylesToString)(n?y:j))+a).replace(W,`--slide-size: ${e};`).replace(F,`--slide-spacing: ${t};`).replace(V,e=>{let t=`height: ${n?"var(--slide-height)":"100%"};`;return e.replace(Y,t)}).replace(X,e=>{let t="";n&&(t=r?"rotate(-180deg)":"rotate(0deg)"),n||(t="rotate(90deg)");let i=t?`transform: ${t};`:"";return e.replace(K,i)})}])},772798,e=>{"use strict";var t=e.i(997053);let i=t.css`
  border: 0;
  padding: 0;
  clip: rect(0 0 0 0);
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  position: absolute;
`;e.s(["visuallyHiddenStyles",0,i])},930877,e=>{"use strict";function t(){return!!window.document?.createElement}e.s(["isBrowser",()=>t])},808758,e=>{"use strict";var t=e.i(164645),i=e.i(350437);let a={currentTheme:i.THEME_KEYS.LIGHT},s=(0,t.createSlice)({name:"theme",initialState:a,reducers:{setTheme:(e,t)=>{e.currentTheme=t.payload},toggleTheme:e=>{let t=e.currentTheme===i.THEME_KEYS.LIGHT?i.THEME_KEYS.DARK:i.THEME_KEYS.LIGHT;e.currentTheme=t}}}),{name:n,reducer:r}=s,{setTheme:o,toggleTheme:l}=s.actions;function c(e){return e.theme.currentTheme}e.s(["selectTheme",()=>c,"setTheme",0,o,"themeName",()=>n,"themeReducer",()=>r,"toggleTheme",0,l])},741790,(e,t,i)=>{!function(){"use strict";var e={114:function(e){function t(e){if("string"!=typeof e)throw TypeError("Path must be a string. Received "+JSON.stringify(e))}function i(e,t){for(var i,a="",s=0,n=-1,r=0,o=0;o<=e.length;++o){if(o<e.length)i=e.charCodeAt(o);else if(47===i)break;else i=47;if(47===i){if(n===o-1||1===r);else if(n!==o-1&&2===r){if(a.length<2||2!==s||46!==a.charCodeAt(a.length-1)||46!==a.charCodeAt(a.length-2)){if(a.length>2){var l=a.lastIndexOf("/");if(l!==a.length-1){-1===l?(a="",s=0):s=(a=a.slice(0,l)).length-1-a.lastIndexOf("/"),n=o,r=0;continue}}else if(2===a.length||1===a.length){a="",s=0,n=o,r=0;continue}}t&&(a.length>0?a+="/..":a="..",s=2)}else a.length>0?a+="/"+e.slice(n+1,o):a=e.slice(n+1,o),s=o-n-1;n=o,r=0}else 46===i&&-1!==r?++r:r=-1}return a}var a={resolve:function(){for(var e,a,s="",n=!1,r=arguments.length-1;r>=-1&&!n;r--)r>=0?a=arguments[r]:(void 0===e&&(e=""),a=e),t(a),0!==a.length&&(s=a+"/"+s,n=47===a.charCodeAt(0));if(s=i(s,!n),n)if(s.length>0)return"/"+s;else return"/";return s.length>0?s:"."},normalize:function(e){if(t(e),0===e.length)return".";var a=47===e.charCodeAt(0),s=47===e.charCodeAt(e.length-1);return(0!==(e=i(e,!a)).length||a||(e="."),e.length>0&&s&&(e+="/"),a)?"/"+e:e},isAbsolute:function(e){return t(e),e.length>0&&47===e.charCodeAt(0)},join:function(){if(0==arguments.length)return".";for(var e,i=0;i<arguments.length;++i){var s=arguments[i];t(s),s.length>0&&(void 0===e?e=s:e+="/"+s)}return void 0===e?".":a.normalize(e)},relative:function(e,i){if(t(e),t(i),e===i||(e=a.resolve(e))===(i=a.resolve(i)))return"";for(var s=1;s<e.length&&47===e.charCodeAt(s);++s);for(var n=e.length,r=n-s,o=1;o<i.length&&47===i.charCodeAt(o);++o);for(var l=i.length-o,c=r<l?r:l,d=-1,u=0;u<=c;++u){if(u===c){if(l>c){if(47===i.charCodeAt(o+u))return i.slice(o+u+1);else if(0===u)return i.slice(o+u)}else r>c&&(47===e.charCodeAt(s+u)?d=u:0===u&&(d=0));break}var p=e.charCodeAt(s+u);if(p!==i.charCodeAt(o+u))break;47===p&&(d=u)}var f="";for(u=s+d+1;u<=n;++u)(u===n||47===e.charCodeAt(u))&&(0===f.length?f+="..":f+="/..");return f.length>0?f+i.slice(o+d):(o+=d,47===i.charCodeAt(o)&&++o,i.slice(o))},_makeLong:function(e){return e},dirname:function(e){if(t(e),0===e.length)return".";for(var i=e.charCodeAt(0),a=47===i,s=-1,n=!0,r=e.length-1;r>=1;--r)if(47===(i=e.charCodeAt(r))){if(!n){s=r;break}}else n=!1;return -1===s?a?"/":".":a&&1===s?"//":e.slice(0,s)},basename:function(e,i){if(void 0!==i&&"string"!=typeof i)throw TypeError('"ext" argument must be a string');t(e);var a,s=0,n=-1,r=!0;if(void 0!==i&&i.length>0&&i.length<=e.length){if(i.length===e.length&&i===e)return"";var o=i.length-1,l=-1;for(a=e.length-1;a>=0;--a){var c=e.charCodeAt(a);if(47===c){if(!r){s=a+1;break}}else -1===l&&(r=!1,l=a+1),o>=0&&(c===i.charCodeAt(o)?-1==--o&&(n=a):(o=-1,n=l))}return s===n?n=l:-1===n&&(n=e.length),e.slice(s,n)}for(a=e.length-1;a>=0;--a)if(47===e.charCodeAt(a)){if(!r){s=a+1;break}}else -1===n&&(r=!1,n=a+1);return -1===n?"":e.slice(s,n)},extname:function(e){t(e);for(var i=-1,a=0,s=-1,n=!0,r=0,o=e.length-1;o>=0;--o){var l=e.charCodeAt(o);if(47===l){if(!n){a=o+1;break}continue}-1===s&&(n=!1,s=o+1),46===l?-1===i?i=o:1!==r&&(r=1):-1!==i&&(r=-1)}return -1===i||-1===s||0===r||1===r&&i===s-1&&i===a+1?"":e.slice(i,s)},format:function(e){var t,i;if(null===e||"object"!=typeof e)throw TypeError('The "pathObject" argument must be of type Object. Received type '+typeof e);return t=e.dir||e.root,i=e.base||(e.name||"")+(e.ext||""),t?t===e.root?t+i:t+"/"+i:i},parse:function(e){t(e);var i,a={root:"",dir:"",base:"",ext:"",name:""};if(0===e.length)return a;var s=e.charCodeAt(0),n=47===s;n?(a.root="/",i=1):i=0;for(var r=-1,o=0,l=-1,c=!0,d=e.length-1,u=0;d>=i;--d){if(47===(s=e.charCodeAt(d))){if(!c){o=d+1;break}continue}-1===l&&(c=!1,l=d+1),46===s?-1===r?r=d:1!==u&&(u=1):-1!==r&&(u=-1)}return -1===r||-1===l||0===u||1===u&&r===l-1&&r===o+1?-1!==l&&(0===o&&n?a.base=a.name=e.slice(1,l):a.base=a.name=e.slice(o,l)):(0===o&&n?(a.name=e.slice(1,r),a.base=e.slice(1,l)):(a.name=e.slice(o,r),a.base=e.slice(o,l)),a.ext=e.slice(r,l)),o>0?a.dir=e.slice(0,o-1):n&&(a.dir="/"),a},sep:"/",delimiter:":",win32:null,posix:null};a.posix=a,e.exports=a}},i={};function a(t){var s=i[t];if(void 0!==s)return s.exports;var n=i[t]={exports:{}},r=!0;try{e[t](n,n.exports,a),r=!1}finally{r&&delete i[t]}return n.exports}a.ab="/ROOT/node_modules/next/dist/compiled/path-browserify/",t.exports=a(114)}()},202623,e=>{"use strict";function t(e,t){return!!Array.isArray(e)&&e.length>(t??0)}function i(e){return Array.from(Array(e).keys())}e.s(["arrayFromNumber",()=>i,"arrayHasItems",()=>t])},542336,e=>{"use strict";e.s(["getIsDocsStartPage",()=>o,"getVersionFromPathname",()=>r,"joinSlugs",()=>s,"prefixSlugWithDocs",()=>n]),e.i(741790);var t=e.i(202623),i=e.i(343869);let a=/^\/|\/$/g;function s(e,...i){let n=[e,...i].filter(Boolean).map(e=>e.replace(a,""));return(0,t.arrayHasItems)(n)?n.join("/"):e}function n(e){let t=e||"";return t.startsWith("/docs")?t:t?"/"+s("docs",t):"/docs"}function r(e){let t=RegExp(`${n("")}/v\\d+/?`),a=((e||"").match(t)?.[0]||"").replace(/\/$/,"");return i.DOCS_VERSIONS.find(({SLUG:e})=>e===a)||i.DOCS_LATEST_VERSION}function o(e){let t=(e||"").split("/").filter(Boolean).pop()||"";return/docs$/.test(t)||/v\d+$/.test(t)}},343869,e=>{"use strict";e.s(["DOCS_LATEST_VERSION",()=>l,"DOCS_VERSIONS",()=>c,"GLOBAL_DATA",()=>d]);var t=e.i(971735),i=e.i(32957),a=e.i(542336);let s=t.default.repository.url.replace(/^(git\+)/,""),[n,r]=s.replace("https://github.com/","").split("/"),o={GITHUB_ROOT:s,GITHUB_DOCUMENTATION:(0,a.joinSlugs)(s,"blob","master"),GITHUB_PACKAGES:(0,a.joinSlugs)(s,"tree","master","packages"),GITHUB_SPONSORS_PAGE:(0,a.joinSlugs)("https://github.com/sponsors",n),ALGOLIA_DOCSEARCH:"https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js",NPM_PACKAGE:(0,a.joinSlugs)("https://www.npmjs.com/package",r),CODESANDBOX_DEFINE:"https://codesandbox.io/api/v1/sandboxes/define"},l={NAME:t.default.version,MAJOR:Number(t.default.version.split(".")[0]),SLUG:(0,a.prefixSlugWithDocs)("")},c=[l,{NAME:"8.6.0",MAJOR:8,SLUG:(0,a.prefixSlugWithDocs)("v8")}],d={TITLE:t.default.name.split("-").map(e=>(0,i.capitalizeFirstLetter)(e)).join(" "),DESCRIPTION:t.default.description,AUTHOR:t.default.author,HOME_PAGE:u(),SHARE_IMAGE:(0,a.joinSlugs)(u(),"share-image.png"),MASKABLE_ICON:(0,a.joinSlugs)(u(),"maskable.png"),URLS:o};function u(){return t.default.homepage}},700810,e=>{"use strict";function t(...e){return e.reduce((e,t)=>e+t.join(""),"")}e.s(["styledComponentsStylesToString",()=>t])},313313,e=>{"use strict";var t=e.i(843476),i=e.i(997053),a=e.i(350437),s=e.i(907827),n=e.i(671249);let r=i.default.div.withConfig({displayName:"HeaderGradient__GradientWrapper",componentId:"sc-7c5282d0-0"})`
  position: relative;
  z-index: ${s.LAYERS.HEADER-s.LAYERS.STEP};
`,o=i.default.span.withConfig({displayName:"HeaderGradient__GradientLine",componentId:"sc-7c5282d0-1"})`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${n.BORDER_SIZES.OUTLINE};
  background: linear-gradient(
    to right,
    transparent,
    ${a.COLORS.BRAND_SECONDARY} 39.5%,
    transparent
  );
`,l=i.default.div.withConfig({displayName:"HeaderGradient__GradientDropShadow",componentId:"sc-7c5282d0-2"})`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 55px;
  background: linear-gradient(to bottom, ${a.COLORS.BRAND_PRIMARY}, transparent);
  pointer-events: none;
  z-index: ${s.LAYERS.NAVIGATION+s.LAYERS.STEP};
`;function c(){return(0,t.jsxs)(r,{"aria-hidden":!0,children:[(0,t.jsx)(o,{}),(0,t.jsx)(l,{})]})}e.s(["GradientDropShadow",0,l,"HeaderGradient",()=>c])},658339,e=>{"use strict";var t=e.i(350437),i=e.i(925866),a=e.i(997053),s=e.i(25110),n=e.i(857355),r=e.i(313313);let o="62.5%",l=a.css`
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
`,c=a.css`
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
`,d=a.css`
  .${t.THEME_CLASSNAME_LIGHT} {
    color-scheme: ${t.THEME_KEYS.LIGHT};

    ${n.LogoDarkIcon}, ${n.LogoDarkImage}, ${s.LightThemeSvg} {
      display: none;
    }

    ${r.GradientDropShadow} {
      opacity: 0.05;
    }
  }
  .${t.THEME_CLASSNAME_DARK} {
    color-scheme: ${t.THEME_KEYS.DARK};

    ${n.LogoLightIcon}, ${n.LogoLightImage}, ${s.DarkThemeSvg} {
      display: none;
    }

    ${r.GradientDropShadow} {
      opacity: 0.1;
    }
  }
`,u=a.css`
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
`;e.s(["BASE_FONT_STYLES",0,o,"BASE_STYLES",0,l,"FONT_STYLES",0,c,"RESET_STYLES",0,u,"THEME_STYLES",0,d])},25110,e=>{"use strict";var t=e.i(843476),i=e.i(271645),a=e.i(997053),s=e.i(109950),n=e.i(224583),r=e.i(380999),o=e.i(808758),l=e.i(350437),c=e.i(989023);let d="3rem",u="2rem",p=(0,a.default)(n.ButtonBare).withConfig({displayName:"ThemeToggle__ThemeToggleWrapper",componentId:"sc-780f52fc-0"})`
  ${(0,r.createSquareSizeStyles)(d)};
  color: ${l.COLORS.TEXT_HIGH_CONTRAST};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: calc((${d} - ${u}) / 2 * -1);
  margin-left: calc((${d} - ${u}) / 2 * -1);
`,f=a.css`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
`,S=(0,a.default)(c.Icon).withConfig({displayName:"ThemeToggle__LightThemeSvg",componentId:"sc-780f52fc-1"})`
  ${f};
`,_=(0,a.default)(c.Icon).withConfig({displayName:"ThemeToggle__DarkThemeSvg",componentId:"sc-780f52fc-2"})`
  ${f};
`;function E(e){let{children:a,...n}=e,r=(0,s.useAppSelector)(o.selectTheme)===l.THEME_KEYS.LIGHT?l.THEME_KEYS.DARK:l.THEME_KEYS.LIGHT,c=(0,s.useAppDispatch)(),d=(0,i.useCallback)(()=>{c((0,o.toggleTheme)())},[c]);return(0,t.jsxs)(p,{type:"button",onClick:d,"aria-label":`Activate ${r} theme`,...n,children:[a,(0,t.jsx)(_,{svg:"moon",size:u}),(0,t.jsx)(S,{svg:"sun",size:u})]})}e.s(["DarkThemeSvg",0,_,"LightThemeSvg",0,S,"ThemeToggle",()=>E])},971735,e=>{e.v({name:"embla-carousel",version:"9.0.0-rc02",author:"David Jerleke",description:"A lightweight carousel library with fluid motion and great swipe precision",repository:{type:"git",url:"git+https://github.com/davidjerleke/embla-carousel"},bugs:{url:"https://github.com/davidjerleke/embla-carousel/issues"},homepage:"https://www.embla-carousel.com",license:"MIT",keywords:["slider","carousel","slideshow","gallery","lightweight","touch","javascript","typescript","react","vue","svelte","solid"],main:"embla-carousel.umd.js",unpkg:"embla-carousel.umd.js",module:"./esm/embla-carousel.esm.js",types:"index.d.ts",sideEffects:!1,files:["embla-carousel*","components/**/*","index.d.ts","esm/**/*","cjs/**/*"],scripts:{test:"jest --config jest.config.js",build:"rollup --bundleConfigAsCjs -c",start:"rollup --bundleConfigAsCjs -c --watch --environment BUILD:development","eslint:report":'eslint "src/**/*.{js,tsx,ts}"'},devDependencies:{"@types/jest":"^29.5.6",jest:"^29.5.0","jest-environment-jsdom":"^29.5.0",prettier:"2.8.8",rollup:"^4.59.0","ts-jest":"^29.1.1",typescript:"^5.2.2"},exports:{"./package.json":"./package.json",".":{import:{types:"./esm/index.d.ts",default:"./esm/embla-carousel.esm.js"},require:{types:"./cjs/index.d.ts",default:"./cjs/embla-carousel.cjs.js"}}}})},277260,e=>{e.v("/_next/static/media/embla-logo-light-theme.164c8f0f.svg")},999995,e=>{e.v("/_next/static/media/embla-logo-dark-theme.0852edfa.svg")},730371,e=>{e.v("/_next/static/media/embla-logo-light-theme-blur.8763fbde.svg")},406504,e=>{e.v("/_next/static/media/embla-logo-dark-theme-blur.de427c93.svg")},857355,e=>{"use strict";var t=e.i(843476),i=e.i(271645),a=e.i(997053);let s={src:e.i(277260).default,width:160,height:160,blurWidth:0,blurHeight:0},n={src:e.i(999995).default,width:160,height:160,blurWidth:0,blurHeight:0},r={src:e.i(730371).default,width:160,height:160,blurWidth:0,blurHeight:0},o={src:e.i(406504).default,width:160,height:160,blurWidth:0,blurHeight:0};var l=e.i(343869),c=e.i(350437),d=e.i(907827),u=e.i(989023);let p=a.default.div.withConfig({displayName:"SiteLogo__SiteLogoWrapper",componentId:"sc-f85e6015-0"})`
  width: 100%;
  position: relative;
  &:before {
    content: '';
    display: block;
    padding-bottom: 100%;
    width: 100%;
  }
`,f=a.css`
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
  z-index: ${d.LAYERS.STEP};
`,S=a.css`
  opacity: ${({$opacity:e})=>e};
  transition: opacity 1s;
`,_=a.default.img.withConfig({displayName:"SiteLogo__LogoLightImage",componentId:"sc-f85e6015-1"})`
  ${f};
`,E=a.default.img.withConfig({displayName:"SiteLogo__LogoDarkImage",componentId:"sc-f85e6015-2"})`
  ${f};
`,m=(0,a.default)(u.Icon).withConfig({displayName:"SiteLogo__LogoLightIcon",componentId:"sc-f85e6015-3"})`
  ${f};
  ${S};
`,h=(0,a.default)(u.Icon).withConfig({displayName:"SiteLogo__LogoDarkIcon",componentId:"sc-f85e6015-4"})`
  ${f};
  ${S};
`,g={default:{[c.THEME_KEYS.LIGHT]:s.src,[c.THEME_KEYS.DARK]:n.src},blur:{[c.THEME_KEYS.LIGHT]:r.src,[c.THEME_KEYS.DARK]:o.src}},A={default:{[c.THEME_KEYS.LIGHT]:"emblaLightDefault",[c.THEME_KEYS.DARK]:"emblaDarkDefault"},blur:{[c.THEME_KEYS.LIGHT]:"emblaLightBlur",[c.THEME_KEYS.DARK]:"emblaDarkBlur"}};function O(e){let{appearance:a,...s}=e,{TITLE:n}=l.GLOBAL_DATA,[r,o]=(0,i.useState)(!1),c=a||"default",d=A[c].light,u=A[c].dark,f=r?"0":"1",S=(0,i.useRef)(null),O=(0,i.useRef)(null),b=`An illustrated atom like body which is the logotype of ${n}`;return(0,i.useEffect)(()=>{let e=S.current,t=O.current;e?.complete&&t?.complete&&o(!0)},[]),(0,t.jsxs)(p,{...s,children:[(0,t.jsx)(m,{svg:d,fill:void 0,$opacity:f}),(0,t.jsx)(h,{svg:u,fill:void 0,$opacity:f}),(0,t.jsx)(_,{ref:S,src:g[c].light,alt:b,onLoad:()=>o(!0)}),(0,t.jsx)(E,{ref:O,src:g[c].dark,alt:b,onLoad:()=>o(!0)})]})}e.s(["LogoDarkIcon",0,h,"LogoDarkImage",0,E,"LogoLightIcon",0,m,"LogoLightImage",0,_,"SiteLogo",()=>O],857355)},602545,e=>{"use strict";var t=e.i(997053),i=e.i(907827),a=e.i(350437),s=e.i(801770),n=e.i(671249),r=e.i(925866),o=e.i(380999),l=e.i(700810),c=e.i(166734),d=e.i(266349),u=e.i(772798);let p="48rem",f="19rem",S="1rem",_="22.2rem",E="3.6rem",m="1.8rem",h="2.5rem",g="0.6rem",A=a.COLORS.BRAND_PRIMARY,O=t.css`
  border-radius: ${n.BORDER_RADIUSES.SOFT};
`,b=t.css`
  border: ${n.BORDER_SIZES.OUTLINE} solid ${a.COLORS.DETAIL_MEDIUM_CONTRAST};
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
  ${b};
  ${O};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${a.COLORS.TEXT_BODY};
  font-weight: ${r.FONT_WEIGHTS.BOLD};
  font-size: ${r.FONT_SIZES.COMPLEMENTARY};
  padding: 0 ${s.SPACINGS.FOUR};
  min-height: ${E};
`,I=t.css`
  .embla__text-input {
    ${c.TAP_HIGHLIGHT_STYLES};
    -webkit-appearance: none;
    appearance: none;
    touch-action: manipulation;
    color: ${a.COLORS.TEXT_BODY};
    background-color: ${a.COLORS.BACKGROUND_CODE};
    border: ${n.BORDER_SIZES.DETAIL} solid ${a.COLORS.DETAIL_LOW_CONTRAST};
    padding: ${s.SPACINGS.ONE} ${s.SPACINGS.ONE};
    font-size: ${r.FONT_SIZES.BODY};
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
`,C=t.css`
  ${I};

  .embla__text-form {
    display: flex;
    justify-content: space-between;
    gap: ${s.SPACINGS.TWO};
    margin-bottom: ${m};
    font-size: ${r.FONT_SIZES.COMPLEMENTARY};
  }

  .embla__text-form__label {
    display: flex;
    align-items: center;
    gap: ${s.SPACINGS.ONE};
    font-weight: ${r.FONT_WEIGHTS.SEMI_BOLD};
  }

  .embla__text-form__submit {
    ${L};
    padding: 0 ${s.SPACINGS.THREE};
  }
`,$=t.css`
  .embla__radio-form {
    min-height: ${E};
    display: flex;
    align-items: center;
    font-size: ${r.FONT_SIZES.COMPLEMENTARY};
  }

  .embla__radio-wrapper {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .embla__radio-input__wrapper {
    flex: 0 0 ${h};
    position: relative;
    min-width: 0;
    margin-right: ${s.SPACINGS.ONE};
  }

  .embla__radio-input__line-height {
    color: ${a.COLORS.BACKGROUND_SITE};
    width: ${h};
    display: inline-block;
    line-height: inherit;
  }

  .embla__radio-form__label {
    display: flex;
    align-items: center;
    font-size: ${r.FONT_SIZES.COMPLEMENTARY};
    font-weight: ${r.FONT_WEIGHTS.SEMI_BOLD};
    gap: ${s.SPACINGS.ONE};
  }

  .embla__radio-wrapper input {
    ${c.TAP_HIGHLIGHT_STYLES};
    ${(0,o.createSquareSizeStyles)(h)};
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
    background-color: ${a.COLORS.DETAIL_MEDIUM_CONTRAST};
    cursor: pointer;
    border-radius: ${n.BORDER_RADIUSES.CIRCLE};

    &:before,
    &:after {
      border-radius: ${n.BORDER_RADIUSES.CIRCLE};
      display: block;
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    &:before {
      ${(0,o.createSquareSizeStyles)("2rem")};
      background-color: ${a.COLORS.BACKGROUND_CODE};
    }

    &:after {
      ${(0,o.createSquareSizeStyles)("1.2rem")};
    }

    &:checked {
      &:after {
        ${d.BRAND_GRADIENT_BACKGROUND_STYLES};
      }
    }

    &[disabled] {
      cursor: not-allowed;
    }

    &[disabled]:checked {
      &:after {
        background-image: none;
        background-color: ${a.COLORS.DETAIL_HIGH_CONTRAST};
      }
    }
  }
`,x=t.css`
  ${$};

  .embla__radio-form {
    display: flex;
    gap: ${s.SPACINGS.TWO};
    margin-bottom: ${m};
  }

  .embla__text-form__label {
    display: flex;
    align-items: center;
    font-size: ${r.FONT_SIZES.COMPLEMENTARY};
    font-weight: ${r.FONT_WEIGHTS.SEMI_BOLD};
    gap: ${s.SPACINGS.ONE};
  }
`,v=t.css`
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
    border-radius: ${n.BORDER_RADIUSES.CARD};
    ${d.BRAND_GRADIENT_BACKGROUND_STYLES};
    border: ${n.BORDER_SIZES.OUTLINE} solid ${a.COLORS.BACKGROUND_SITE};

    &:after {
      display: block;
      content: '';
      position: absolute;
      border-radius: ${n.BORDER_RADIUSES.CARD};
      border: ${n.BORDER_SIZES.OUTLINE} solid ${a.COLORS.TEXT_BODY};
      top: -${n.BORDER_SIZES.ACCENT_VERTICAL};
      bottom: -${n.BORDER_SIZES.ACCENT_VERTICAL};
      left: -${n.BORDER_SIZES.ACCENT_VERTICAL};
      right: -${n.BORDER_SIZES.ACCENT_VERTICAL};
    }
  }

  .embla__align-indicator--start {
    left: ${n.BORDER_SIZES.OUTLINE};
  }

  .embla__align-indicator--center {
    left: 50%;
    transform: translateX(-50%);
  }

  .embla__align-indicator--end {
    right: ${n.BORDER_SIZES.OUTLINE};
  }
`,N=t.css`
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
    border-top: ${g} solid ${A};
    border-bottom: ${g} solid ${A};
    border-left: ${g} solid ${A};
  }

  .embla__group__indicator--end {
    left: 0;
    right: 0;
    border-top: ${g} solid ${A};
    border-bottom: ${g} solid ${A};
    border-right: ${g} solid ${A};
  }

  .embla__group__indicator--center {
    left: 0;
    right: 0;
    border-top: ${g} solid ${A};
    border-bottom: ${g} solid ${A};
  }

  .embla__group__indicator--single {
    left: var(--slide-spacing);
    right: 0px;
    border: ${g} solid ${A};
  }

  .embla--group-indicator-hidden .embla__group__indicator {
    display: none;
  }
`,y=t.css`
  .embla {
    max-width: ${p};
    margin: auto;

    --slide-height: ${f};
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
`,j=t.css`
  .embla {
    max-width: ${p};
    margin: auto;

    --slide-height: ${f};
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
`,k=t.css`
  .embla__slide__number {
    ${b};
    ${O};
    font-size: ${r.FONT_SIZES.CUSTOM(()=>4)};
    font-weight: ${r.FONT_WEIGHTS.SEMI_BOLD};
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
`,P=t.css`
  .embla__slide__img {
    ${T};
    ${O};
  }
`,w=t.css`
  .embla__controls {
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    gap: ${s.SPACINGS.TWO};
    margin-top: ${m};
  }
`,G=t.css`
  .embla__buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${s.SPACINGS.ONE};
    align-items: center;
  }

  .embla__button {
    ${R};
    ${b};
    ${(0,o.createSquareSizeStyles)(E)}
    z-index: ${i.LAYERS.STEP};
    border-radius: ${n.BORDER_RADIUSES.CIRCLE};
    color: ${a.COLORS.TEXT_BODY};
    display: flex;
    align-items: center;
    justify-content: center;
    transform: rotate(0deg);
  }

  .embla__button--disabled {
    color: ${a.COLORS.DETAIL_HIGH_CONTRAST};
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
    border-radius: ${n.BORDER_RADIUSES.CIRCLE};
    position: relative;
  }

  .embla__dot:before,
  .embla__dot:after {
    ${(0,o.createSquareSizeStyles)("1.4rem")}
    border-radius: ${n.BORDER_RADIUSES.CIRCLE};
    position: absolute;
    display: flex;
    align-items: center;
    content: '';
  }

  .embla__dot:before {
    border: ${n.BORDER_SIZES.OUTLINE} solid ${a.COLORS.DETAIL_MEDIUM_CONTRAST};
  }

  .embla__dot:after {
    border: ${n.BORDER_SIZES.OUTLINE} solid ${a.COLORS.TEXT_BODY};
    opacity: 0;
  }

  .embla__dot--selected:after {
    opacity: 1;
  }
`,B=t.css`
  .embla__live-region {
    ${u.visuallyHiddenStyles};
  }
`,H=t.css`
  .embla__selected-snap-display {
    justify-self: flex-end;
    align-self: center;
    color: ${a.COLORS.TEXT_LOW_CONTRAST};
    font-weight: ${r.FONT_WEIGHTS.SEMI_BOLD};
  }
`,U=t.css`
  .embla__play {
    ${L};
    min-width: ${s.SPACINGS.FIFTEEN};
    justify-self: flex-end;
  }
`,z=t.css`
  .embla__progress {
    ${O};
    box-shadow: inset 0 0 0 ${n.BORDER_SIZES.OUTLINE}
      ${a.COLORS.DETAIL_MEDIUM_CONTRAST};
    background-color: ${a.COLORS.BACKGROUND_SITE};
    position: relative;
    height: 0.6rem;
    justify-self: flex-end;
    align-self: center;
    width: 13rem;
    max-width: 90%;
    overflow: hidden;
  }

  .embla__progress__bar {
    background-color: ${a.COLORS.TEXT_BODY};
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
    border-bottom: 0.5px solid rgba(${a.COLORS.TEXT_HIGH_CONTRAST_RGB_VALUE}, 0.3);
    background: linear-gradient(
      to top,
      rgba(${a.COLORS.BACKGROUND_SITE_RGB_VALUE}, 0.65) 0%,
      rgba(${a.COLORS.BACKGROUND_SITE_RGB_VALUE}, 1) 100%
    );
  }

  .embla:after {
    bottom: -0.5px;
    border-top: 0.5px solid rgba(${a.COLORS.TEXT_HIGH_CONTRAST_RGB_VALUE}, 0.3);
    background: linear-gradient(
      to bottom,
      rgba(${a.COLORS.BACKGROUND_SITE_RGB_VALUE}, 0.65) 0%,
      rgba(${a.COLORS.BACKGROUND_SITE_RGB_VALUE}, 1) 100%
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
    font-weight: ${r.FONT_WEIGHTS.BOLD};
    transform: translateX(-55px);
    pointer-events: none;
  }
`,F=/--slide-size:\s*100%;/gi,Y=/--slide-spacing:\s*1rem;/gi,K=/height\s*:\s*var\(\s*--slide-height\s*\)\s*;?/,V=/transform\s*:\s*rotate\(0deg\)\s*;?/,X=/\.embla__slide__number\s*\{[\s\S]*?\bheight\s*:\s*var\(\s*--slide-height\s*\)\s*;?[\s\S]*?\}/,Z=/\.embla__button\s*\{[\s\S]*?\btransform\s*:\s*rotate\(0deg\)\s*;?[\s\S]*?\}/;e.s(["ACCESSIBILITY_STYLES",0,B,"ALIGNMENT_INDICATOR_STYLES",0,v,"ARROWS_STYLES",0,G,"CAROUSEL_BORDER_STYLES",0,b,"CAROUSEL_BUTTON_BASE_STYLES",0,R,"CAROUSEL_CONTROLS_SPACING",0,m,"CAROUSEL_DEFAULT_HEIGHT",0,f,"CAROUSEL_IOS_PICKER_HEIGHT",0,_,"CAROUSEL_MAX_WIDTH",0,p,"CAROUSEL_NAV_BUTTON_SIZE",0,E,"CAROUSEL_SCROLLBAR_HEIGHT",0,"1.6rem","CAROUSEL_SCROLLBAR_SPACING",0,m,"CAROUSEL_SCROLLBAR_TRACK_HEIGHT",0,"0.6rem","CAROUSEL_SLIDE_RADIUS_STYLES",0,O,"CAROUSEL_THUMB_SLIDES_HEIGHT",0,"6rem","CAROUSEL_THUMB_SLIDES_SPACING",0,"0.8rem","CONTROLS_STYLES",0,w,"DOTS_STYLES",0,M,"GROUP_INDICATOR_STYLES",0,N,"IMAGE_ROUNDED_STYLES",0,P,"IMAGE_STYLES",0,D,"IOS_PICKER_STYLES",0,W,"PLAY_BUTTON_STYLES",0,U,"PROGRESS_STYLES",0,z,"RADIO_INPUT_FORM_STYLES",0,x,"SLIDE_NUMBER_STYLES",0,k,"SNAP_DISPLAY_STYLES",0,H,"TEXT_INPUT_FORM_STYLES",0,C,"examplesCarouselStyles",0,(e="100%",t=S,i={},a="",s="")=>{let n="y"!==i.axis,r="rtl"===i.direction;return((s||(0,l.styledComponentsStylesToString)(n?y:j))+a).replace(F,`--slide-size: ${e};`).replace(Y,`--slide-spacing: ${t};`).replace(X,e=>{let t=`height: ${n?"var(--slide-height)":"100%"};`;return e.replace(K,t)}).replace(Z,e=>{let t="";n&&(t=r?"rotate(-180deg)":"rotate(0deg)"),n||(t="rotate(90deg)");let i=t?`transform: ${t};`:"";return e.replace(V,i)})}])},174776,e=>{"use strict";var t=e.i(997053);function i(e,a,s="*"){return t.css`
    ${e&&t.css`
      margin-left: -${e};
      > ${s} {
        padding-left: ${e};
      }
    `}

    ${a&&t.css`
      margin-bottom: -${a};

      > ${s} {
        padding-bottom: ${a};
      }
    `}
  `}e.s(["createGapStyles",()=>i])},878612,e=>{"use strict";var t=e.i(997053),i=e.i(671249),a=e.i(350437),s=e.i(801770);let n=t.css`
  background-color: ${a.COLORS.BACKGROUND_CODE};
  border-radius: ${i.BORDER_RADIUSES.CARD};
`,r=s.SPACINGS.ONE;e.s(["CARD_SPACING",0,r,"CARD_STYLES",0,n])},747251,e=>{"use strict";var t=e.i(843476),i=e.i(997053),a=e.i(801770),s=e.i(350437),n=e.i(925866),r=e.i(923035),o=e.i(615632),l=e.i(266349),c=e.i(878612);let d=(0,i.default)(o.LinkBare).withConfig({displayName:"LinkCard__LinkCardWrapper",componentId:"sc-3a19ae4a-0"})`
  ${c.CARD_STYLES};
  padding: ${a.SPACINGS.FOUR};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`,u=i.default.div.withConfig({displayName:"LinkCard__ReadMoreText",componentId:"sc-3a19ae4a-1"})`
  ${r.IconWithTextText} {
    ${l.BRAND_GRADIENT_TEXT_STYLES};
    font-size: ${n.FONT_SIZES.COMPLEMENTARY};
    font-weight: ${n.FONT_WEIGHTS.MEDIUM};
  }

  svg {
    color: ${s.COLORS.BRAND_SECONDARY};
  }
`;function p(e){let{children:i,...a}=e;return(0,t.jsxs)(d,{...a,children:[i,(0,t.jsx)(u,{children:(0,t.jsx)(r.IconWithText,{iconSvg:"arrowRight",iconSide:"right",children:"Read more"})})]})}e.s(["LinkCard",()=>p])},371728,e=>{"use strict";var t=e.i(843476),i=e.i(271645);function a(e){return(0,t.jsx)(i.default.Fragment,{...e})}e.s(["TabsItem",()=>a])},405213,e=>{"use strict";var t=e.i(843476),i=e.i(997053),a=e.i(615632),s=e.i(266349),n=e.i(925866);let r=i.css`
  ${s.BRAND_GRADIENT_TEXT_STYLES};
  display: inline-block;
  font-weight: ${n.FONT_WEIGHTS.MEDIUM};
`,o=(0,i.default)(a.LinkBare).withConfig({displayName:"LinkContent__LinkContentWrapper",componentId:"sc-aecb113e-0"})`
  ${r};
`;function l(e){return(0,t.jsx)(o,{...e})}e.s(["LinkContent",()=>l,"linkContentStyles",0,r])},784613,e=>{"use strict";let t=e.i(801770).SPACINGS.TEN;e.s(["HEADER_HEIGHT",0,t,"HEADER_ID",0,"site-header"])},431480,e=>{"use strict";var t=e.i(997053),i=e.i(506390),a=e.i(728191);let s=t.css`
  ${i.MEDIA.MAX_XS} {
    width: calc(100% + ${a.PAGE_FRAME_SPACING} * 2);
    margin-left: -${a.PAGE_FRAME_SPACING};
    margin-right: -${a.PAGE_FRAME_SPACING};
  }
`;e.s(["pageFrameCollapseStyles",0,s])},38817,e=>{"use strict";var t=e.i(930877);let i="portal-root";function a(){if(!(0,t.isBrowser)())return null;let e=document.getElementById(i);return e||((e=document.createElement("div")).id=i,document.body.appendChild(e)),e}e.s(["MODALS",0,{MAIN_NAVIGATION:"main-navigation",SIDEBAR_NAVIGATION:"sidebar-navigation",SITE_SEARCH:"site-search",EDIT_CODE:e=>`edit-code-${e}`},"MODAL_CLOSE_KEYS",0,["Escape","Esc"],"MODAL_SEARCH_TOGGLE_KEYS_1",0,["Control","k"],"MODAL_SEARCH_TOGGLE_KEYS_2",0,["Meta","k"],"getExistingOrCreatePortalWrapper",()=>a])},236420,e=>{"use strict";var t=e.i(843476),i=e.i(997053),a=e.i(671249),s=e.i(350437),n=e.i(380999);let r=i.default.span.withConfig({displayName:"LoadSpinner__LoadSpinnerWrapper",componentId:"sc-49e3603d-0"})`
  ${({$size:e})=>(0,n.createSquareSizeStyles)(e)}
  display: inline-flex;
  position: relative;

  > span {
    ${({$size:e,$thickness:t,$color:a})=>i.css`
      ${(0,n.createSquareSizeStyles)(e)}
      border: ${t} solid ${a};
      border-color: ${a} transparent transparent transparent;
    `}
    display: block;
    position: absolute;
    border-radius: ${a.BORDER_RADIUSES.CIRCLE};
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
`;function o(e){let{size:i="3rem",thickness:a="0.2rem",color:n=s.COLORS.DETAIL_HIGH_CONTRAST,...o}=e;return(0,t.jsxs)(r,{$size:i,$thickness:a,$color:n,...o,children:[(0,t.jsx)("span",{}),(0,t.jsx)("span",{}),(0,t.jsx)("span",{}),(0,t.jsx)("span",{})]})}e.s(["LoadSpinner",()=>o])},651379,e=>{"use strict";var t=e.i(271645);function i(e,i,a,s){let n=(0,t.useRef)(i);(0,t.useEffect)(()=>{n.current=i},[i]),(0,t.useEffect)(()=>{let t=a?.current??window;if(!(t&&t.addEventListener))return;let i=e=>n.current(e);return t.addEventListener(e,i,s),()=>{t.removeEventListener(e,i)}},[e,a,s])}e.s(["useEventListener",()=>i])},991790,350287,e=>{"use strict";var t=e.i(843476),i=e.i(271645),a=e.i(350437),s=e.i(997053),n=e.i(236420),r=e.i(380999),o=e.i(907827),l=e.i(671249),c=e.i(651379),d=e.i(784613),u=e.i(174080),p=e.i(930877),f=e.i(38817);function S(e){let{children:t}=e,a=(0,i.useRef)((0,f.getExistingOrCreatePortalWrapper)()),s=(0,i.useRef)((0,p.isBrowser)()?document.createElement("div"):null);return(0,i.useEffect)(()=>{if(a.current&&s.current)return a.current.appendChild(s.current),()=>{a.current&&s.current&&a.current.removeChild(s.current)}},[]),(0,u.createPortal)(t,s.current)}var _=e.i(728191);let E=s.default.div.withConfig({displayName:"LoadSpinnerSuspense__LoadSpinnerSuspenseWrapper",componentId:"sc-f4af42b6-0"})`
  background-color: rgba(${a.COLORS.BACKGROUND_SITE_RGB_VALUE}, 0.9);
  border-radius: ${l.BORDER_RADIUSES.CIRCLE};
  z-index: ${o.LAYERS.MODAL_LOADING};
  ${(0,r.createSquareSizeStyles)("6rem")};
  top: calc(${d.HEADER_HEIGHT} + ${_.PAGE_FRAME_SPACING});
  position: ${({$isPortal:e})=>e?"fixed":"absolute"};
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({$opacity:e})=>e};
  transition: ${({$opacity:e})=>`opacity ${.6*(1!==e)}s`};
  box-shadow: 0 0 0 ${l.BORDER_SIZES.DETAIL} ${a.COLORS.DETAIL_LOW_CONTRAST};
  pointer-events: none;
`;function m(e){let{isVisible:s,usePortal:r}=e,[o,l]=(0,i.useState)(!1),[d,u]=(0,i.useState)(0),p=(0,i.useRef)(null),f=r??!0,_=f?S:i.default.Fragment,m=(0,i.useCallback)(()=>{d||l(!1)},[d]);return((0,i.useEffect)(()=>{u(s&&o?1:0)},[s,o]),(0,i.useEffect)(()=>{s&&l(!0)},[s]),(0,c.useEventListener)("transitionend",m,p),s||o)?(0,t.jsx)(_,{children:(0,t.jsx)(E,{$opacity:d,$isPortal:f,ref:p,children:(0,t.jsx)(n.LoadSpinner,{size:"4rem",color:a.COLORS.TEXT_BODY})})}):null}function h(e){let{setIsLoading:t}=e;return(0,i.useEffect)(()=>(t(!0),()=>{t(!1)}),[t]),null}function g(e){let[a,s]=(0,i.useState)(!1),{children:n,fallback:r,usePortal:o}=e;return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(m,{isVisible:a,usePortal:o}),(0,t.jsx)(i.Suspense,{fallback:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(h,{setIsLoading:s}),r&&r]}),children:n})]})}e.s(["LoadSpinnerSuspense",()=>m],350287),e.s(["LoadSpinnerWithSuspense",()=>g],991790)},705670,875421,e=>{"use strict";var t=e.i(271645);function i(){return(i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(e[a]=i[a])}return e}).apply(this,arguments)}function a(e,t){return(a=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var s=new Map,n=new WeakMap,r=0,o=void 0;function l(e,t,i,a){if(void 0===i&&(i={}),void 0===a&&(a=o),void 0===window.IntersectionObserver&&void 0!==a){var l=e.getBoundingClientRect();return t(a,{isIntersecting:a,target:e,intersectionRatio:"number"==typeof i.threshold?i.threshold:0,time:0,boundingClientRect:l,intersectionRect:l,rootBounds:l}),function(){}}var c=function(e){var t=Object.keys(e).sort().filter(function(t){return void 0!==e[t]}).map(function(t){var i;return t+"_"+("root"===t?(i=e.root)?(n.has(i)||(r+=1,n.set(i,r.toString())),n.get(i)):"0":e[t])}).toString(),i=s.get(t);if(!i){var a,o=new Map,l=new IntersectionObserver(function(t){t.forEach(function(t){var i,s=t.isIntersecting&&a.some(function(e){return t.intersectionRatio>=e});e.trackVisibility&&void 0===t.isVisible&&(t.isVisible=s),null==(i=o.get(t.target))||i.forEach(function(e){e(s,t)})})},e);a=l.thresholds||(Array.isArray(e.threshold)?e.threshold:[e.threshold||0]),i={id:t,observer:l,elements:o},s.set(t,i)}return i}(i),d=c.id,u=c.observer,p=c.elements,f=p.get(e)||[];return p.has(e)||p.set(e,f),f.push(t),u.observe(e),function(){f.splice(f.indexOf(t),1),0===f.length&&(p.delete(e),u.unobserve(e)),0===p.size&&(u.disconnect(),s.delete(d))}}var c=["children","as","triggerOnce","threshold","root","rootMargin","onChange","skip","trackVisibility","delay","initialInView","fallbackInView"];function d(e){return"function"!=typeof e.children}var u=function(e){function s(t){var i;return(i=e.call(this,t)||this).node=null,i._unobserveCb=null,i.handleNode=function(e){i.node&&(i.unobserve(),e||i.props.triggerOnce||i.props.skip||i.setState({inView:!!i.props.initialInView,entry:void 0})),i.node=e||null,i.observeNode()},i.handleChange=function(e,t){e&&i.props.triggerOnce&&i.unobserve(),d(i.props)||i.setState({inView:e,entry:t}),i.props.onChange&&i.props.onChange(e,t)},i.state={inView:!!t.initialInView,entry:void 0},i}s.prototype=Object.create(e.prototype),s.prototype.constructor=s,a(s,e);var n=s.prototype;return n.componentDidUpdate=function(e){(e.rootMargin!==this.props.rootMargin||e.root!==this.props.root||e.threshold!==this.props.threshold||e.skip!==this.props.skip||e.trackVisibility!==this.props.trackVisibility||e.delay!==this.props.delay)&&(this.unobserve(),this.observeNode())},n.componentWillUnmount=function(){this.unobserve(),this.node=null},n.observeNode=function(){if(this.node&&!this.props.skip){var e=this.props,t=e.threshold,i=e.root,a=e.rootMargin,s=e.trackVisibility,n=e.delay,r=e.fallbackInView;this._unobserveCb=l(this.node,this.handleChange,{threshold:t,root:i,rootMargin:a,trackVisibility:s,delay:n},r)}},n.unobserve=function(){this._unobserveCb&&(this._unobserveCb(),this._unobserveCb=null)},n.render=function(){if(!d(this.props)){var e=this.state,a=e.inView,s=e.entry;return this.props.children({inView:a,entry:s,ref:this.handleNode})}var n=this.props,r=n.children,o=n.as,l=function(e,t){if(null==e)return{};var i,a,s={},n=Object.keys(e);for(a=0;a<n.length;a++)i=n[a],t.indexOf(i)>=0||(s[i]=e[i]);return s}(n,c);return t.createElement(o||"div",i({ref:this.handleNode},l),r)},s}(t.Component);function p(e){var i=void 0===e?{}:e,a=i.threshold,s=i.delay,n=i.trackVisibility,r=i.rootMargin,o=i.root,c=i.triggerOnce,d=i.skip,u=i.initialInView,p=i.fallbackInView,f=t.useRef(),S=t.useState({inView:!!u}),_=S[0],E=S[1],m=t.useCallback(function(e){void 0!==f.current&&(f.current(),f.current=void 0),!d&&e&&(f.current=l(e,function(e,t){E({inView:e,entry:t}),t.isIntersecting&&c&&f.current&&(f.current(),f.current=void 0)},{root:o,rootMargin:r,threshold:a,trackVisibility:n,delay:s},p))},[Array.isArray(a)?a.toString():a,o,r,c,d,n,p,s]);(0,t.useEffect)(function(){f.current||!_.entry||c||d||E({inView:!!u})});var h=[m,_.inView,_.entry];return h.ref=h[0],h.inView=h[1],h.entry=h[2],h}u.displayName="InView",u.defaultProps={threshold:0,triggerOnce:!1,initialInView:!1},e.s(["useInView",()=>p],705670);var f=e.i(843476),S=e.i(997053),_=e.i(991790),E=e.i(224583),m=e.i(266349),h=e.i(923035),g=e.i(350437),A=e.i(801770),O=e.i(671249),b=e.i(925866),T=e.i(651379),R=e.i(109950),L=e.i(38817),I=e.i(385658),C=e.i(228678);let $=(0,t.lazy)(async()=>({default:(await e.A(409072)).SandboxSelectionModal})),x=["Escape","Esc"],v=S.default.div.withConfig({displayName:"SandboxSelection__SandboxSelectionWrapper",componentId:"sc-d2d43ddf-0"})`
  margin-top: -${A.SPACINGS.TWO};
`,N=(0,S.default)(E.ButtonBare).withConfig({displayName:"SandboxSelection__SandboxSelectionOpenModalButton",componentId:"sc-d2d43ddf-1"})`
  color: ${g.COLORS.TEXT_LOW_CONTRAST};
  font-size: ${b.FONT_SIZES.COMPLEMENTARY};
  margin-bottom: -${A.SPACINGS.TWO};
  padding: ${A.SPACINGS.TWO} 0 ${A.SPACINGS.TWO} 0;
  border-radius: ${O.BORDER_RADIUSES.BOX};
  align-items: center;
  font-weight: ${b.FONT_WEIGHTS.MEDIUM};

  ${h.IconWithTextText} {
    ${m.BRAND_GRADIENT_TEXT_STYLES};
  }
`;function y(i){let{sandboxes:a}=i,s=(0,t.useRef)(L.MODALS.EDIT_CODE((0,I.default)())),n=(0,R.useAppSelector)((0,C.selectIsModalOpen)(s.current)),r=(0,t.useRef)(null),o=(0,R.useAppDispatch)(),l=(0,t.useCallback)(()=>{o((0,C.setModalOpen)(s.current))},[o]),c=(0,t.useCallback)(()=>{o((0,C.setModalClosed)())},[o]),d=(0,t.useCallback)(({key:e})=>{x.includes(e)&&c()},[c]);(0,T.useEventListener)("keyup",d);let u=(0,t.useCallback)(async()=>({default:(await e.A(409072)).SandboxSelectionModal}),[]);return(0,T.useEventListener)("mouseenter",u,r,{passive:!0}),(0,T.useEventListener)("touchstart",u,r,{passive:!0}),(0,f.jsxs)(v,{children:[(0,f.jsx)(N,{id:"select-codesandbox-dialog",ref:r,"aria-expanded":n,"aria-label":"Show Select CodeSandbox Dialog",onClick:l,type:"button",children:(0,f.jsx)(h.IconWithText,{iconSvg:"pen",iconSize:"1.4rem",children:"Edit Code"})}),n&&(0,f.jsx)(_.LoadSpinnerWithSuspense,{children:(0,f.jsx)($,{sandboxes:a,closeModal:c})})]})}e.s(["SandboxSelection",()=>y],875421)},503392,608256,e=>{"use strict";var t=e.i(843476),i=e.i(271645),a=e.i(997053),s=e.i(705670),n=e.i(350287),r=e.i(875421),o=e.i(431480),l=e.i(801770),c=e.i(602545);let d=a.css`
  margin-top: ${l.SPACINGS.FOUR};
  margin-bottom: ${l.SPACINGS.FOUR};
  position: relative;
`,u=a.css`
  ${d};
  min-height: calc(
    ${c.CAROUSEL_DEFAULT_HEIGHT} + ${c.CAROUSEL_NAV_BUTTON_SIZE} +
      ${c.CAROUSEL_CONTROLS_SPACING}
  );
`,p=a.css`
  ${d};
  min-height: calc(
    ${c.CAROUSEL_DEFAULT_HEIGHT} + ${c.CAROUSEL_THUMB_SLIDES_HEIGHT} +
      ${c.CAROUSEL_THUMB_SLIDES_SPACING}
  );
`,f=a.css`
  ${d};
  min-height: calc(
    ${c.CAROUSEL_DEFAULT_HEIGHT} + ${c.CAROUSEL_NAV_BUTTON_SIZE} +
      ${c.CAROUSEL_CONTROLS_SPACING} + ${c.CAROUSEL_SCROLLBAR_HEIGHT} +
      ${c.CAROUSEL_SCROLLBAR_SPACING}
  );
`,S=a.css`
  ${o.pageFrameCollapseStyles};
  min-height: ${c.CAROUSEL_IOS_PICKER_HEIGHT};
  touch-action: none;
  position: relative;
`,_=a.css`
  ${d};
  min-height: calc(
    ${c.CAROUSEL_DEFAULT_HEIGHT} + (${c.CAROUSEL_NAV_BUTTON_SIZE} * 2) +
      (${c.CAROUSEL_CONTROLS_SPACING} * 2)
  );
`,E=a.css`
  ${d};
  min-height: calc(
    ${c.CAROUSEL_DEFAULT_HEIGHT} + (${c.CAROUSEL_NAV_BUTTON_SIZE} * 3) +
      (${c.CAROUSEL_CONTROLS_SPACING} * 3)
  );
`,m={rootMargin:"0px 0px 0px 0px"},h={DEFAULT:"default",THUMBS:"thumbs",SCROLL_BAR:"scrollBar",IOS_PICKER:"iosPicker",ONE_FORM_ROW:"oneFormRow",TWO_FORM_ROWS:"twoFormRows"},g={[h.DEFAULT]:u,[h.THUMBS]:p,[h.SCROLL_BAR]:f,[h.IOS_PICKER]:S,[h.ONE_FORM_ROW]:_,[h.TWO_FORM_ROWS]:E};e.s(["EXAMPLES_INTERSECTION_OPTIONS",0,m,"EXAMPLES_WRAPPERS",0,h,"EXAMPLES_WRAPPER_STYLES",0,g],608256);let A={config:{id:"",slides:[],options:{},styles:""},sandboxes:[],Carousel:void 0},O=a.default.div.withConfig({displayName:"ExamplesLazy__Wrapper",componentId:"sc-b8d30a6c-0"})`
  ${({$id:e,$styles:t,$wrapper:i})=>a.css`
      ${g[i]};

      &.${e} {
        ${t};
      }
    `}
`;e.s(["ExamplesLazy",0,e=>{let{wrapper:a,loader:o}=e,[l,c]=(0,s.useInView)(m),[d,u]=(0,i.useState)(!1),[p,f]=(0,i.useState)(A),S=a||h.DEFAULT,_=(0,i.useCallback)(async e=>{u(!0);let{EXAMPLE:t}=await e();t&&f(t),u(!1)},[]);return(0,i.useEffect)(()=>{c&&o&&_(o)},[c,o]),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.SandboxSelection,{sandboxes:p.sandboxes}),(0,t.jsx)(O,{className:p.config.id,ref:l,$id:p.config.id,$styles:p.config.styles,$wrapper:S,children:c?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.LoadSpinnerSuspense,{usePortal:!1,isVisible:d}),p.Carousel&&(0,t.jsx)(p.Carousel,{options:p.config.options,slides:p.config.slides})]}):null})]})}],503392)},892384,596555,e=>{"use strict";var t=e.i(843476),i=e.i(271645),a=e.i(997053),s=e.i(705670),n=e.i(350287),r=e.i(875421),o=e.i(431480),l=e.i(801770),c=e.i(863552);let d=a.css`
  margin-top: ${l.SPACINGS.FOUR};
  margin-bottom: ${l.SPACINGS.FOUR};
  position: relative;
`,u=a.css`
  ${d};
  min-height: calc(
    ${c.CAROUSEL_DEFAULT_HEIGHT} + ${c.CAROUSEL_NAV_BUTTON_SIZE} +
      ${c.CAROUSEL_CONTROLS_SPACING}
  );
`,p=a.css`
  ${d};
  min-height: calc(
    ${c.CAROUSEL_DEFAULT_HEIGHT} + ${c.CAROUSEL_THUMB_SLIDES_HEIGHT} +
      ${c.CAROUSEL_THUMB_SLIDES_SPACING}
  );
`,f=a.css`
  ${d};
  min-height: calc(
    ${c.CAROUSEL_DEFAULT_HEIGHT} + ${c.CAROUSEL_NAV_BUTTON_SIZE} +
      ${c.CAROUSEL_CONTROLS_SPACING} + ${c.CAROUSEL_SCROLLBAR_HEIGHT} +
      ${c.CAROUSEL_SCROLLBAR_SPACING}
  );
`,S=a.css`
  ${o.pageFrameCollapseStyles};
  min-height: ${c.CAROUSEL_IOS_PICKER_HEIGHT};
  touch-action: none;
  position: relative;
`,_=a.css`
  ${d};
  min-height: calc(
    ${c.CAROUSEL_DEFAULT_HEIGHT} + (${c.CAROUSEL_NAV_BUTTON_SIZE} * 2) +
      (${c.CAROUSEL_CONTROLS_SPACING} * 2)
  );
`,E=a.css`
  ${d};
  min-height: calc(
    ${c.CAROUSEL_DEFAULT_HEIGHT} + (${c.CAROUSEL_NAV_BUTTON_SIZE} * 3) +
      (${c.CAROUSEL_CONTROLS_SPACING} * 3)
  );
`,m={rootMargin:"0px 0px 0px 0px"},h={DEFAULT:"default",THUMBS:"thumbs",SCROLL_BAR:"scrollBar",IOS_PICKER:"iosPicker",ONE_FORM_ROW:"oneFormRow",TWO_FORM_ROWS:"twoFormRows"},g={[h.DEFAULT]:u,[h.THUMBS]:p,[h.SCROLL_BAR]:f,[h.IOS_PICKER]:S,[h.ONE_FORM_ROW]:_,[h.TWO_FORM_ROWS]:E};e.s(["EXAMPLES_INTERSECTION_OPTIONS",0,m,"EXAMPLES_WRAPPERS",0,h,"EXAMPLES_WRAPPER_STYLES",0,g],596555);let A={config:{id:"",slides:[],options:{},styles:""},sandboxes:[],Carousel:void 0},O=a.default.div.withConfig({displayName:"ExamplesLazy__Wrapper",componentId:"sc-f0878424-0"})`
  ${({$id:e,$styles:t,$wrapper:i})=>a.css`
      ${g[i]};

      &.${e} {
        ${t};
      }
    `}
`;e.s(["ExamplesLazy",0,e=>{let{wrapper:a,loader:o}=e,[l,c]=(0,s.useInView)(m),[d,u]=(0,i.useState)(!1),[p,f]=(0,i.useState)(A),S=a||h.DEFAULT,_=(0,i.useCallback)(async e=>{u(!0);let{EXAMPLE:t}=await e();t&&f(t),u(!1)},[]);return(0,i.useEffect)(()=>{c&&o&&_(o)},[c,o]),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.SandboxSelection,{sandboxes:p.sandboxes}),(0,t.jsx)(O,{className:p.config.id,ref:l,$id:p.config.id,$styles:p.config.styles,$wrapper:S,children:c?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.LoadSpinnerSuspense,{usePortal:!1,isVisible:d}),p.Carousel&&(0,t.jsx)(p.Carousel,{options:p.config.options,slides:p.config.slides})]}):null})]})}],892384)},542412,e=>{"use strict";var t=e.i(843476),i=e.i(503392);function a(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(733996)})}e.s(["ExampleAutoHeight",()=>a])},968016,e=>{"use strict";var t=e.i(843476),i=e.i(503392);function a(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(230095)})}e.s(["ExampleAutoScroll",()=>a])},400227,e=>{"use strict";var t=e.i(843476),i=e.i(892384);function a(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(125897)})}e.s(["ExampleAutoHeight",()=>a])},725542,e=>{"use strict";var t=e.i(843476),i=e.i(503392);function a(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(313316)})}e.s(["ExampleClassNames",()=>a])},699905,e=>{"use strict";var t=e.i(843476),i=e.i(892384);function a(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(850751)})}e.s(["ExampleFade",()=>a])},319660,e=>{"use strict";var t=e.i(843476),i=e.i(892384);function a(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(703697)})}e.s(["ExampleAutoScroll",()=>a])},812967,e=>{"use strict";var t=e.i(843476),i=e.i(503392);function a(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(643267)})}e.s(["ExampleAccessibility",()=>a])},17775,e=>{"use strict";var t=e.i(843476),i=e.i(892384);function a(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(818122)})}e.s(["ExampleAutoplay",()=>a])},146089,e=>{"use strict";var t=e.i(843476),i=e.i(503392);function a(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(822087)})}e.s(["ExampleAutoplay",()=>a])},387950,e=>{"use strict";var t=e.i(843476),i=e.i(892384);function a(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(398209)})}e.s(["ExampleClassNames",()=>a])},281165,e=>{"use strict";var t=e.i(843476),i=e.i(503392);function a(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(430642)})}e.s(["ExampleFade",()=>a])},377495,e=>{"use strict";var t=e.i(997053),i=e.i(224583),a=e.i(380999),s=e.i(989023),n=e.i(801770),r=e.i(350437),o=e.i(506390);let l=t.css`
  ${(0,a.createSquareSizeStyles)("4rem")};
  ${i.buttonBareStyles};
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: -${n.SPACINGS.CUSTOM(({ONE:e})=>e+.15)};
  margin-left: -${n.SPACINGS.CUSTOM(({ONE:e})=>e+.15)};

  ${o.MEDIA.DESKTOP} {
    ${(0,a.createSquareSizeStyles)("3rem")};
  }
`,c=(0,t.default)(i.ButtonBare).withConfig({displayName:"SearchButton",componentId:"sc-e27f3bba-0"})`
  ${l};
`,d=t.css`
  ${(0,a.createSquareSizeStyles)("2.35rem")};
  color: ${r.COLORS.TEXT_HIGH_CONTRAST};
  stroke-width: 0.2rem;
  display: flex;

  ${o.MEDIA.DESKTOP} {
    ${(0,a.createSquareSizeStyles)("1.8rem")};
  }
`,u=(0,t.default)(s.Icon).withConfig({displayName:"SearchButton__SearchButtonIcon",componentId:"sc-e27f3bba-1"})`
  ${d};
`;e.s(["SearchButton",0,c,"SearchButtonIcon",0,u,"searchButtonIconStyles",0,d,"searchButtonStyles",0,l])},156877,e=>{"use strict";var t=e.i(843476),i=e.i(997053),a=e.i(878612),s=e.i(801770),n=e.i(671249),r=e.i(925866),o=e.i(350437),l=e.i(618566),c=e.i(542336);let d=i.default.div.withConfig({displayName:"VersionBadge__VersionBadgeWrapper",componentId:"sc-b80ecc28-0"})`
  ${a.CARD_STYLES};
  display: inline-flex;
  padding: 0.2rem ${s.SPACINGS.THREE};
  border-radius: ${n.BORDER_RADIUSES.SOFT};
  font-size: ${r.FONT_SIZES.COMPLEMENTARY};
  color: ${o.COLORS.TEXT_LOW_CONTRAST};
`,u=i.default.span.withConfig({displayName:"VersionBadge__VersionBadgeKey",componentId:"sc-b80ecc28-1"})`
  font-weight: ${r.FONT_WEIGHTS.SEMI_BOLD};
  margin-right: 0.4rem;
`;function p(e){let{...i}=e,a=(0,l.usePathname)(),s=(0,c.getVersionFromPathname)(a);return(0,t.jsxs)(d,{...i,children:[(0,t.jsx)(u,{children:"Version:"})," ",s.NAME]})}e.s(["VersionBadge",()=>p])},113595,e=>{"use strict";e.s(["ALGOLIA_CLASSNAMES",0,{LVL_0:"algolia-docsearch-lvl-0",SEARCH_ACTIVE:"DocSearch--active",SEARCH_INPUT:"DocSearch-Input",SEARCH_TOGGLE_BUTTON:"DocSearch-Button"},"ALGOLIA_SEARCH_CONFIG",0,{APP_ID:"8P0OOFSVUV",API_KEY:"5b82ccc7721ce8d7693691c6a81b7c2a",INDEX_NAME:"embla-carousel"}])},237672,e=>{"use strict";var t=e.i(843476),i=e.i(271645),a=e.i(997053),s=e.i(113595),n=e.i(350437),r=e.i(801770),o=e.i(506390),l=e.i(671249),c=e.i(266349),d=e.i(925866),u=e.i(224583),p=e.i(764268),f=e.i(955596),S=e.i(989023);let _=r.SPACINGS.ONE,E=r.SPACINGS.CUSTOM(({ONE:e})=>e+.2),m=a.default.div.withConfig({displayName:"SidebarNavigationSubMenu__SidebarNavigationSubMenuWrapper",componentId:"sc-98717780-0"})`
  display: flex;
  flex-direction: column;
  line-height: 1.65;

  ${o.MEDIA.COMPACT} {
    border-bottom: ${l.BORDER_SIZES.DETAIL} solid ${n.COLORS.DETAIL_MEDIUM_CONTRAST};
  }
`,h=(0,a.default)(u.ButtonBare).withConfig({displayName:"SidebarNavigationSubMenu__Toggle",componentId:"sc-98717780-1"})`
  font-weight: ${d.FONT_WEIGHTS.SEMI_BOLD};
  color: ${n.COLORS.TEXT_BODY};
  padding: ${_} 0 ${_}
    calc(${E} + ${r.SPACINGS.TWO});
  margin: 0 0;
  position: relative;
  line-height: inherit;
  display: flex;
  align-items: center;
  text-align: left;
  width: 100%;

  ${({$isActive:e})=>a.css`
    > span {
      ${e&&c.BRAND_GRADIENT_TEXT_STYLES};
    }
  `};

  ${o.MEDIA.COMPACT} {
    padding: ${r.SPACINGS.TWO} 0 ${r.SPACINGS.TWO}
      calc(${E} + ${r.SPACINGS.TWO});
  }
`,g=(0,a.default)(S.Icon).withConfig({displayName:"SidebarNavigationSubMenu__ToggleSvg",componentId:"sc-98717780-2"})`
  transform: ${({$isOpen:e})=>e&&"rotate(90deg)"};
  color: ${n.COLORS.TEXT_LOW_CONTRAST};
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
`,A=a.default.ul.withConfig({displayName:"SidebarNavigationSubMenu__Menu",componentId:"sc-98717780-3"})`
  ${({$isOpen:e})=>a.css`
    height: ${!e&&"0px"};
    overflow: ${!e&&"hidden"};
    visibility: ${!e&&"hidden"};

    ${o.MEDIA.COMPACT} {
      margin-top: ${e&&`-${r.SPACINGS.ONE}`};
      padding-bottom: ${e&&r.SPACINGS.TWO};
    }
  `};
  padding-left: calc(${E} + ${r.SPACINGS.FOUR});
  position: relative;

  ${o.MEDIA.DESKTOP} {
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0.3rem;
      width: ${l.BORDER_SIZES.DETAIL};
      bottom: 0;
      background-color: ${n.COLORS.DETAIL_MEDIUM_CONTRAST};
    }
  }
`,O=(0,a.default)(p.LinkNavigation).withConfig({displayName:"SidebarNavigationSubMenu__Link",componentId:"sc-98717780-4"})`
  margin: 0 0;
  text-align: left;
  padding: ${_} 0;
`;function b(e){let{route:a,isDesktopMenu:n,isActiveOverride:r}=e,{title:o,children:l}=a,{isPartiallyActive:c,isActive:d}=(0,f.useRouteActive)(a.slug),[u,p]=(0,i.useState)(c||r),S=u?"Hide":"Show",_=c&&n?s.ALGOLIA_CLASSNAMES.LVL_0:void 0,b=function(e="",t){let i=e.toLowerCase().split(" ").join("-");return`${i}-navigation-${t?"desktop":"compact"}-menu`}(o,n),T=(0,i.useCallback)(e=>{e.preventDefault(),p(e=>!e)},[]);return(0,t.jsxs)(m,{"aria-labelledby":b,children:[(0,t.jsxs)(h,{id:b,onClick:T,$isActive:c,"aria-expanded":u,"aria-label":`${S} Navigation Menu`,children:[(0,t.jsx)(g,{$isOpen:u,svg:"chevronRight",size:E}),(0,t.jsx)("span",{className:_,children:o})]}),(0,t.jsxs)(A,{$isOpen:u,children:[(0,t.jsx)("li",{children:(0,t.jsx)(O,{slug:a.slug,isActive:d,children:"Intro"})}),l.map(e=>(0,t.jsx)("li",{children:(0,t.jsx)(O,{slug:e.slug,children:e.title})},e.slug))]})]})}var T=e.i(475086),R=e.i(542336),L=e.i(618566);function I(e){let{isDesktopMenu:i=!1}=e,{hierarchicalRoutes:a}=(0,T.useSidebarNavigationContext)(),s=(0,R.getIsDocsStartPage)((0,L.usePathname)());return(0,t.jsx)(t.Fragment,{children:a.map((e,a)=>(0,t.jsx)("li",{children:(0,t.jsx)(b,{route:e,isActiveOverride:!a&&s,isDesktopMenu:i})},e.slug))})}e.s(["SidebarNavigationSubMenus",()=>I],237672)},12447,(e,t,i)=>{t.exports=function(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}},631926,(e,t,i)=>{var a=e.r(139088);t.exports=function(){return a.Date.now()}},748891,(e,t,i)=>{var a=/\s/;t.exports=function(e){for(var t=e.length;t--&&a.test(e.charAt(t)););return t}},830364,(e,t,i)=>{var a=e.r(748891),s=/^\s+/;t.exports=function(e){return e?e.slice(0,a(e)+1).replace(s,""):e}},773759,(e,t,i)=>{var a=e.r(830364),s=e.r(12447),n=e.r(361884),r=0/0,o=/^[-+]0x[0-9a-f]+$/i,l=/^0b[01]+$/i,c=/^0o[0-7]+$/i,d=parseInt;t.exports=function(e){if("number"==typeof e)return e;if(n(e))return r;if(s(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=s(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=a(e);var i=l.test(e);return i||c.test(e)?d(e.slice(2),i?2:8):o.test(e)?r:+e}},374009,(e,t,i)=>{var a=e.r(12447),s=e.r(631926),n=e.r(773759),r=Math.max,o=Math.min;t.exports=function(e,t,i){var l,c,d,u,p,f,S=0,_=!1,E=!1,m=!0;if("function"!=typeof e)throw TypeError("Expected a function");function h(t){var i=l,a=c;return l=c=void 0,S=t,u=e.apply(a,i)}function g(e){var i=e-f,a=e-S;return void 0===f||i>=t||i<0||E&&a>=d}function A(){var e,i,a,n=s();if(g(n))return O(n);p=setTimeout(A,(e=n-f,i=n-S,a=t-e,E?o(a,d-i):a))}function O(e){return(p=void 0,m&&l)?h(e):(l=c=void 0,u)}function b(){var e,i=s(),a=g(i);if(l=arguments,c=this,f=i,a){if(void 0===p)return S=e=f,p=setTimeout(A,t),_?h(e):u;if(E)return clearTimeout(p),p=setTimeout(A,t),h(f)}return void 0===p&&(p=setTimeout(A,t)),u}return t=n(t)||0,a(i)&&(_=!!i.leading,d=(E="maxWait"in i)?r(n(i.maxWait)||0,t):d,m="trailing"in i?!!i.trailing:m),b.cancel=function(){void 0!==p&&clearTimeout(p),S=0,l=f=c=p=void 0},b.flush=function(){return void 0===p?u:O(s())},b}},515681,112426,e=>{"use strict";var t=e.i(843476),i=e.i(997053),a=e.i(728191);let s=i.default.div.withConfig({displayName:"PageFrame__PageFrameWrapper",componentId:"sc-73ebe679-0"})`
  margin-left: auto;
  margin-right: auto;
  padding-left: ${a.PAGE_FRAME_SPACING};
  padding-right: ${a.PAGE_FRAME_SPACING};
  max-width: ${({$size:e})=>e};
  width: 100%;
`;function n(e){let{size:i="DEFAULT",children:n,...r}=e,o=a.PAGE_FRAME_SIZES[i];return(0,t.jsx)(s,{$size:o,...r,children:n})}e.s(["PageFrame",()=>n],515681);var r=e.i(271645),o=e.i(109950),l=e.i(840535),c=e.i(651379),d=e.i(506390),u=e.i(374009),p=e.i(930877),f=e.i(907827),S=e.i(38817),_=e.i(801770),E=e.i(784613),m=e.i(850056),h=e.i(350437),g=e.i(925866),A=e.i(615632),O=e.i(923035),b=e.i(671249),T=e.i(174776),R=e.i(343869);let L=_.SPACINGS.FIVE,I=_.SPACINGS.ONE,C="1.4rem",$=i.default.ul.withConfig({displayName:"FooterLinks__FooterLinksWrapper",componentId:"sc-9b2a805c-0"})`
  ${(0,T.createGapStyles)(L,"","li")};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`,x=(0,i.default)(A.LinkBare).withConfig({displayName:"FooterLinks__Link",componentId:"sc-9b2a805c-1"})`
  font-size: ${g.FONT_SIZES.COMPLEMENTARY};
  margin-right: -${b.BORDER_SIZES.OUTLINE};
  padding: ${_.SPACINGS.ONE} ${b.BORDER_SIZES.OUTLINE};
  outline-offset: -${b.BORDER_SIZES.OUTLINE};
  color: ${h.COLORS.TEXT_LOW_CONTRAST};
  display: inline-flex;
  align-items: center;
`;var v=e.i(237672),N=e.i(654938);let y=i.default.div.withConfig({displayName:"SidebarNavigationMenuDesktop__SidebarNavigationMenuDesktopWrapper",componentId:"sc-64efcc2c-0"})`
  background-color: ${h.COLORS.BACKGROUND_SITE};
  font-size: ${g.FONT_SIZES.COMPLEMENTARY};
  position: relative;
  height: 100%;

  &:before,
  &:after {
    position: absolute;
    z-index: ${f.LAYERS.STEP};
    left: -${a.PAGE_FRAME_SPACING};
    right: -${a.PAGE_FRAME_SPACING};
    content: '';
  }

  &:before {
    ${(0,N.createScrollBarShadowStyles)("top")};
    top: -${N.SCROLL_BAR_SHADOW_SIZE};
  }

  &:after {
    ${(0,N.createScrollBarShadowStyles)("bottom")};
    bottom: -${N.SCROLL_BAR_SHADOW_SIZE};
  }

  ${d.MEDIA.COMPACT} {
    display: none;
  }
`,j=i.default.ul.withConfig({displayName:"SidebarNavigationMenuDesktop__ScrollArea",componentId:"sc-64efcc2c-1"})`
  ${(0,N.createScrollBarStyles)("y")};
  padding-top: ${a.PAGE_FRAME_SPACING};
  padding-bottom: ${a.PAGE_FRAME_SPACING};
  max-height: calc(100dvh - ${E.HEADER_HEIGHT});
  overflow: auto;
`,k=(0,i.default)(function(e){let{...i}=e,{URLS:a}=R.GLOBAL_DATA;return(0,t.jsxs)($,{...i,children:[(0,t.jsx)("li",{children:(0,t.jsx)(x,{href:a.NPM_PACKAGE,children:(0,t.jsx)(O.IconWithText,{iconSvg:"npm",spacing:I,iconSize:C,children:"Npm"})})}),(0,t.jsx)("li",{children:(0,t.jsx)(x,{href:a.GITHUB_ROOT,children:(0,t.jsx)(O.IconWithText,{iconSvg:"github",spacing:I,iconSize:C,children:"GitHub"})})}),(0,t.jsx)("li",{children:(0,t.jsx)(x,{href:a.GITHUB_SPONSORS_PAGE,children:(0,t.jsx)(O.IconWithText,{iconSvg:"heartOutlined",spacing:I,iconSize:C,children:"Sponsor"})})})]})}).withConfig({displayName:"SidebarNavigationMenuDesktop__MiscLinks",componentId:"sc-64efcc2c-2"})`
  padding-top: ${_.SPACINGS.THREE};
  flex-direction: column;
`;function D(){let e=(0,o.useAppSelector)(m.selectKeyNavigating);return(0,t.jsx)(y,{$isKeyNavigating:e,children:(0,t.jsxs)(j,{children:[(0,t.jsx)(v.SidebarNavigationSubMenus,{isDesktopMenu:!0}),(0,t.jsx)("li",{children:(0,t.jsx)(k,{})})]})})}var P=e.i(991790),w=e.i(32957),G=e.i(228678);let M=(0,r.lazy)(async()=>({default:(await e.A(336036)).SidebarNavigationMenuCompact})),B="sidebar-navigation-menu",H=(0,w.kebabCaseToPascalCase)(B," "),U="sidebar-menu",z=i.default.nav.withConfig({displayName:"SidebarNavigation__SidebarNavigationWrapper",componentId:"sc-d75f319f-0"})`
  position: sticky;

  ${d.MEDIA.COMPACT} {
    position: fixed;
    z-index: ${f.LAYERS.NAVIGATION};
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    ${({$isOpen:e})=>i.css`
      transform: ${!e&&"translateX(-100%)"};
      visibility: ${!e&&"hidden"};
    `};
  }

  ${d.MEDIA.DESKTOP} {
    width: inherit;
    max-width: inherit;
    top: ${E.HEADER_HEIGHT};
    bottom: 0;
  }

  ${d.MEDIA.MIN_LG} {
    padding-right: ${_.SPACINGS.SEVEN};
  }
`;function W(e){let{isCompact:i}=function(){let{windowWidth:e}=function(e=0){let t=(0,r.useCallback)(()=>({windowWidth:(0,p.isBrowser)()?window.innerWidth:0,windowHeight:(0,p.isBrowser)()?window.innerHeight:0}),[]),[i,a]=(0,r.useState)(t);return!function(e){let{callback:t,wait:i=300}=e,a=(0,r.useMemo)(()=>0!==i?(0,u.default)(e=>t(e),i):e=>t(e),[i,t]);(0,c.useEventListener)("resize",a)}({wait:e,callback:()=>a(t)}),i}(),t=e<d.BREAKPOINTS.MD;return{isCompact:t,isDesktop:!t}}(),a=(0,o.useAppSelector)((0,G.selectIsModalOpen)(S.MODALS.SIDEBAR_NAVIGATION)),s=(0,o.useAppDispatch)(),n=(0,r.useCallback)(()=>{s((0,G.setModalClosed)())},[s]),f=(0,r.useCallback)(()=>{if(!(0,p.isBrowser)())return[];let e=document.getElementById(E.HEADER_ID),t=document.getElementById(U);return e&&t?[e,t]:[]},[]),_=(0,r.useCallback)(({key:e})=>{S.MODAL_CLOSE_KEYS.includes(e)&&n()},[n]);return(0,c.useEventListener)("keyup",_),(0,r.useEffect)(()=>(i||n(),n),[i,n]),(0,t.jsx)(l.FocusTrap,{active:a,containerElements:f(),children:(0,t.jsxs)(z,{id:U,role:"dialog","aria-modal":"true","aria-labelledby":B,"aria-label":H,$isOpen:a,...e,children:[(0,t.jsx)(D,{}),a&&(0,t.jsx)(P.LoadSpinnerWithSuspense,{children:(0,t.jsx)(M,{})})]})})}e.s(["SIDEBAR_NAVIGATION_ID",0,B,"SIDEBAR_NAVIGATION_ID_PRETTY",0,H,"SidebarNavigation",()=>W],112426)},291543,402044,e=>{"use strict";let t,i,a;var s,n,r,o=e.i(997053),l=e.i(224583),c=e.i(350437),d=e.i(801770),u=e.i(266349),p=e.i(925866);let f={MD:o.css`
    padding-left: 2.6rem;
    padding-right: 2.6rem;
    min-height: 4.26rem;
    border-radius: 3rem;
  `};e.s(["BUTTON_SIZES",0,f],402044);var S=e.i(843476),_=e.i(236420);let E=(0,o.default)(_.LoadSpinner).withConfig({displayName:"CreateButtonWithLoading__ButtonLoadSpinner",componentId:"sc-123af70d-0"})`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`,m=o.default.span.withConfig({displayName:"CreateButtonWithLoading__ButtonLoadSpinnerText",componentId:"sc-123af70d-1"})``,h=o.css`
  position: relative;
  width: 100%;
  text-align: center;
  justify-content: center;

  ${({$isLoading:e})=>e&&o.css`
      ${m} {
        opacity: 0;
      }
    `}
`,g=o.css`
  ${f.MD}
  ${u.BRAND_GRADIENT_BACKGROUND_STYLES};
  color: ${c.COLORS.BACKGROUND_SITE};
  line-height: 1.15;
  font-weight: ${p.FONT_WEIGHTS.BOLD};
  display: inline-flex;
  align-items: center;
`,A=(s=(0,o.default)(l.ButtonBare).withConfig({displayName:"ButtonPrimaryFilled",componentId:"sc-ae976bb2-0"})`
  ${g};

  &:disabled {
    background-image: none;
    background-color: ${c.COLORS.DETAIL_HIGH_CONTRAST};
  }
`,n=d.SPACINGS.FOUR,r=c.COLORS.TEXT_BODY,t=`${s.displayName}WithLoading`,i=(0,o.default)(s).withConfig({displayName:"CreateButtonWithLoading__Button",componentId:"sc-123af70d-2"})`
    ${h};
  `,(a=e=>{let{children:t,isLoading:a,...s}=e;return(0,S.jsxs)(i,{$isLoading:a,...s,children:[(0,S.jsx)(m,{children:t}),a&&(0,S.jsx)(E,{size:n,color:r})]})}).displayName=t,a);e.s(["ButtonPrimaryFilledWithLoading",0,A,"buttonPrimaryFilledStyles",0,g],291543)},725266,e=>{"use strict";var t=e.i(843476),i=e.i(997053),a=e.i(291543),s=e.i(224583),n=e.i(350437),r=e.i(925866),o=e.i(907827),l=e.i(671249),c=e.i(402044),d=e.i(266349);let u=i.css`
  ${c.BUTTON_SIZES.MD};
  line-height: 1.15;
  font-weight: ${r.FONT_WEIGHTS.BOLD};
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
    ${d.BRAND_GRADIENT_BACKGROUND_STYLES};
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  &:after {
    background-color: ${n.COLORS.BACKGROUND_SITE};
    top: ${l.BORDER_SIZES.OUTLINE};
    left: ${l.BORDER_SIZES.OUTLINE};
    bottom: ${l.BORDER_SIZES.OUTLINE};
    right: ${l.BORDER_SIZES.OUTLINE};
  }

  ${s.ButtonBareText} {
    ${d.BRAND_GRADIENT_TEXT_STYLES};
    z-index: ${o.LAYERS.STEP};
  }
`;(0,i.default)(s.ButtonBare).withConfig({displayName:"ButtonPrimaryOutlined",componentId:"sc-704e1638-0"})`
  ${u};

  &:disabled {
    &:before {
      background-image: none;
      background-color: ${n.COLORS.DETAIL_HIGH_CONTRAST};
    }

    ${s.ButtonBareText} {
      background-image: none;
      background-clip: border-box;
      -webkit-background-clip: border-box;
      -webkit-text-fill-color: currentcolor;
      color: ${n.COLORS.DETAIL_HIGH_CONTRAST};
    }
  }
`;var p=e.i(615632);let f=(0,i.default)(p.LinkBare).withConfig({displayName:"LinkButton__LinkButtonPrimaryFilledWrapper",componentId:"sc-8707cd70-0"})`
  ${a.buttonPrimaryFilledStyles};
`;function S(e){let{children:i,...a}=e;return(0,t.jsx)(f,{...a,children:(0,t.jsx)(s.ButtonBareText,{children:i})})}let _=(0,i.default)(p.LinkBare).withConfig({displayName:"LinkButton__LinkButtonPrimaryOutlinedWrapper",componentId:"sc-8707cd70-1"})`
  ${u};
`;function E(e){let{children:i,...a}=e;return(0,t.jsx)(_,{...a,children:(0,t.jsx)(s.ButtonBareText,{children:i})})}e.s(["LinkButtonPrimaryFilled",()=>S,"LinkButtonPrimaryOutlined",()=>E],725266)},759739,e=>{"use strict";var t=e.i(843476),i=e.i(892384);function a(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(406090)})}e.s(["ExampleMinimalDomManipulation",()=>a])},494549,e=>{"use strict";var t=e.i(843476),i=e.i(503392);function a(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(239020)})}e.s(["ExampleMinimalDomManipulation",()=>a])},907147,e=>{"use strict";var t=e.i(843476),i=e.i(596555),a=e.i(892384);function s(){return(0,t.jsx)(a.ExamplesLazy,{wrapper:i.EXAMPLES_WRAPPERS.ONE_FORM_ROW,loader:()=>e.A(168325)})}e.s(["ExampleDotButtons",()=>s])},994521,e=>{"use strict";var t=e.i(843476),i=e.i(608256),a=e.i(503392);function s(){return(0,t.jsx)(a.ExamplesLazy,{wrapper:i.EXAMPLES_WRAPPERS.ONE_FORM_ROW,loader:()=>e.A(326290)})}e.s(["ExampleDotButtons",()=>s])},948225,e=>{"use strict";var t=e.i(843476),i=e.i(596555),a=e.i(892384);function s(){return(0,t.jsx)(a.ExamplesLazy,{wrapper:i.EXAMPLES_WRAPPERS.ONE_FORM_ROW,loader:()=>e.A(502971)})}e.s(["ExamplePreviousAndNextButtons",()=>s])},315704,e=>{"use strict";var t=e.i(843476),i=e.i(608256),a=e.i(503392);function s(){return(0,t.jsx)(a.ExamplesLazy,{wrapper:i.EXAMPLES_WRAPPERS.ONE_FORM_ROW,loader:()=>e.A(791876)})}e.s(["ExamplePreviousAndNextButtons",()=>s])},245281,e=>{"use strict";var t=e.i(843476),i=e.i(596555),a=e.i(892384);function s(){return(0,t.jsx)(a.ExamplesLazy,{wrapper:i.EXAMPLES_WRAPPERS.TWO_FORM_ROWS,loader:()=>e.A(159592)})}e.s(["ExampleSlideGapsInteractive",()=>s])},87768,e=>{"use strict";var t=e.i(843476),i=e.i(596555),a=e.i(892384);function s(){return(0,t.jsx)(a.ExamplesLazy,{wrapper:i.EXAMPLES_WRAPPERS.TWO_FORM_ROWS,loader:()=>e.A(657506)})}e.s(["ExampleSlideGapsCssGap",()=>s])},871618,e=>{"use strict";var t=e.i(843476),i=e.i(596555),a=e.i(892384);function s(){return(0,t.jsx)(a.ExamplesLazy,{wrapper:i.EXAMPLES_WRAPPERS.TWO_FORM_ROWS,loader:()=>e.A(63358)})}e.s(["ExampleGroupingSlidesInteractive",()=>s])},178095,e=>{"use strict";var t=e.i(843476),i=e.i(596555),a=e.i(892384);function s(){return(0,t.jsx)(a.ExamplesLazy,{wrapper:i.EXAMPLES_WRAPPERS.TWO_FORM_ROWS,loader:()=>e.A(687171)})}e.s(["ExampleGroupingSlidesVariableWidths",()=>s])},557046,e=>{"use strict";var t=e.i(843476),i=e.i(596555),a=e.i(892384);function s(){return(0,t.jsx)(a.ExamplesLazy,{wrapper:i.EXAMPLES_WRAPPERS.ONE_FORM_ROW,loader:()=>e.A(704187)})}e.s(["ExampleSlideSizesInteractive",()=>s])},967902,e=>{"use strict";var t=e.i(843476),i=e.i(892384);function a(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(84394)})}e.s(["ExampleSlideSizesVariableWidths",()=>a])},999264,e=>{"use strict";var t=e.i(843476),i=e.i(608256),a=e.i(503392);function s(){return(0,t.jsx)(a.ExamplesLazy,{wrapper:i.EXAMPLES_WRAPPERS.TWO_FORM_ROWS,loader:()=>e.A(799308)})}e.s(["ExampleGroupingSlidesInteractive",()=>s])},40292,e=>{"use strict";var t=e.i(843476),i=e.i(608256),a=e.i(503392);function s(){return(0,t.jsx)(a.ExamplesLazy,{wrapper:i.EXAMPLES_WRAPPERS.TWO_FORM_ROWS,loader:()=>e.A(80891)})}e.s(["ExampleGroupingSlidesVariableWidths",()=>s])},383851,e=>{"use strict";var t=e.i(843476),i=e.i(608256),a=e.i(503392);function s(){return(0,t.jsx)(a.ExamplesLazy,{wrapper:i.EXAMPLES_WRAPPERS.TWO_FORM_ROWS,loader:()=>e.A(888324)})}e.s(["ExampleAlignmentsInteractive",()=>s])},308914,e=>{"use strict";var t=e.i(843476),i=e.i(608256),a=e.i(503392);function s(){return(0,t.jsx)(a.ExamplesLazy,{wrapper:i.EXAMPLES_WRAPPERS.TWO_FORM_ROWS,loader:()=>e.A(30376)})}e.s(["ExampleAlignmentsContainScroll",()=>s])},445813,e=>{"use strict";var t=e.i(843476),i=e.i(596555),a=e.i(892384);function s(){return(0,t.jsx)(a.ExamplesLazy,{wrapper:i.EXAMPLES_WRAPPERS.TWO_FORM_ROWS,loader:()=>e.A(867910)})}e.s(["ExampleAlignmentsInteractive",()=>s])},157445,e=>{"use strict";var t=e.i(843476),i=e.i(596555),a=e.i(892384);function s(){return(0,t.jsx)(a.ExamplesLazy,{wrapper:i.EXAMPLES_WRAPPERS.TWO_FORM_ROWS,loader:()=>e.A(180971)})}e.s(["ExampleAlignmentsContainScroll",()=>s])},254708,e=>{"use strict";var t=e.i(843476),i=e.i(608256),a=e.i(503392);function s(){return(0,t.jsx)(a.ExamplesLazy,{wrapper:i.EXAMPLES_WRAPPERS.ONE_FORM_ROW,loader:()=>e.A(958547)})}e.s(["ExampleSlideSizesInteractive",()=>s])},411515,e=>{"use strict";var t=e.i(843476),i=e.i(503392);function a(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(103799)})}e.s(["ExampleSlideSizesVariableWidths",()=>a])},854605,e=>{"use strict";var t=e.i(843476),i=e.i(608256),a=e.i(503392);function s(){return(0,t.jsx)(a.ExamplesLazy,{wrapper:i.EXAMPLES_WRAPPERS.TWO_FORM_ROWS,loader:()=>e.A(198251)})}e.s(["ExampleSlideGapsInteractive",()=>s])},798501,e=>{"use strict";var t=e.i(843476),i=e.i(608256),a=e.i(503392);function s(){return(0,t.jsx)(a.ExamplesLazy,{wrapper:i.EXAMPLES_WRAPPERS.TWO_FORM_ROWS,loader:()=>e.A(76927)})}e.s(["ExampleSlideGapsCssGap",()=>s])},937093,e=>{"use strict";var t=e.i(843476),i=e.i(503392);function a(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(211232)})}e.s(["ExampleDefault",()=>a])},111681,e=>{"use strict";var t=e.i(843476),i=e.i(503392);function a(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(718133)})}e.s(["ExampleLoop",()=>a])},566137,e=>{"use strict";var t=e.i(843476),i=e.i(503392);function a(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(602743)})}e.s(["ExampleRightToLeft",()=>a])},417347,e=>{"use strict";var t=e.i(843476),i=e.i(503392);function a(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(126725)})}e.s(["ExampleSlidesToScroll",()=>a])},493396,e=>{"use strict";var t=e.i(843476),i=e.i(503392);function a(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(809964)})}e.s(["ExampleDragFree",()=>a])},943217,e=>{"use strict";var t=e.i(843476),i=e.i(503392);function a(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(732475)})}e.s(["ExampleAlign",()=>a])},401628,e=>{"use strict";var t=e.i(843476),i=e.i(503392);function a(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(262001)})}e.s(["ExampleVariableWidths",()=>a])},554491,e=>{"use strict";var t=e.i(843476),i=e.i(503392);function a(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(474088)})}e.s(["ExampleYAxis",()=>a])},464751,e=>{"use strict";var t=e.i(843476),i=e.i(503392);function a(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(189029)})}e.s(["ExampleSlidesPerView",()=>a])},356163,e=>{"use strict";var t=e.i(843476),i=e.i(503392),a=e.i(608256);function s(){return(0,t.jsx)(i.ExamplesLazy,{wrapper:a.EXAMPLES_WRAPPERS.THUMBS,loader:()=>e.A(321556)})}e.s(["ExampleThumbs",()=>s])},114359,e=>{"use strict";var t=e.i(843476),i=e.i(503392);function a(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(240333)})}e.s(["ExampleParallax",()=>a])},957777,e=>{"use strict";var t=e.i(843476),i=e.i(503392);function a(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(653436)})}e.s(["ExampleScale",()=>a])},831060,e=>{"use strict";var t=e.i(843476),i=e.i(503392);function a(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(764557)})}e.s(["ExampleOpacity",()=>a])},817333,e=>{"use strict";var t=e.i(843476),i=e.i(503392);function a(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(511493)})}e.s(["ExampleProgress",()=>a])},236260,e=>{"use strict";var t=e.i(843476),i=e.i(503392);function a(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(781565)})}e.s(["ExampleLazyLoad",()=>a])},584290,e=>{"use strict";var t=e.i(843476),i=e.i(503392),a=e.i(608256);function s(){return(0,t.jsx)(i.ExamplesLazy,{wrapper:a.EXAMPLES_WRAPPERS.SCROLL_BAR,loader:()=>e.A(343858)})}e.s(["ExampleScrollBar",()=>s])},619941,e=>{"use strict";var t=e.i(843476),i=e.i(503392);function a(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(597704)})}e.s(["ExampleInfiniteScroll",()=>a])},392544,e=>{"use strict";var t=e.i(843476),i=e.i(503392),a=e.i(608256);function s(){return(0,t.jsx)(i.ExamplesLazy,{wrapper:a.EXAMPLES_WRAPPERS.IOS_PICKER,loader:()=>e.A(548014)})}e.s(["ExampleIosPicker",()=>s])},71747,e=>{"use strict";var t=e.i(843476),i=e.i(503392),a=e.i(608256);function s(){return(0,t.jsx)(i.ExamplesLazy,{wrapper:a.EXAMPLES_WRAPPERS.IOS_PICKER,loader:()=>e.A(498060)})}e.s(["ExampleIosPickerLoop",()=>s])},785832,e=>{"use strict";var t=e.i(843476),i=e.i(892384);function a(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(929660)})}e.s(["ExampleDefault",()=>a])},93113,e=>{"use strict";var t=e.i(843476),i=e.i(892384);function a(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(35740)})}e.s(["ExampleLoop",()=>a])},672128,e=>{"use strict";var t=e.i(843476),i=e.i(892384);function a(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(800797)})}e.s(["ExampleRightToLeft",()=>a])},501090,e=>{"use strict";var t=e.i(843476),i=e.i(892384);function a(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(991167)})}e.s(["ExampleSlidesToScroll",()=>a])},960153,e=>{"use strict";var t=e.i(843476),i=e.i(892384);function a(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(96321)})}e.s(["ExampleDragFree",()=>a])},596568,e=>{"use strict";var t=e.i(843476),i=e.i(892384);function a(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(976870)})}e.s(["ExampleAlign",()=>a])},470280,e=>{"use strict";var t=e.i(843476),i=e.i(892384);function a(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(686409)})}e.s(["ExampleVariableWidths",()=>a])},334935,e=>{"use strict";var t=e.i(843476),i=e.i(892384);function a(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(2575)})}e.s(["ExampleYAxis",()=>a])},958805,e=>{"use strict";var t=e.i(843476),i=e.i(892384);function a(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(485243)})}e.s(["ExampleSlidesPerView",()=>a])},886235,e=>{"use strict";var t=e.i(843476),i=e.i(892384),a=e.i(596555);function s(){return(0,t.jsx)(i.ExamplesLazy,{wrapper:a.EXAMPLES_WRAPPERS.THUMBS,loader:()=>e.A(674811)})}e.s(["ExampleThumbs",()=>s])},368643,e=>{"use strict";var t=e.i(843476),i=e.i(892384);function a(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(135635)})}e.s(["ExampleParallax",()=>a])},574870,e=>{"use strict";var t=e.i(843476),i=e.i(892384);function a(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(135526)})}e.s(["ExampleScale",()=>a])},171793,e=>{"use strict";var t=e.i(843476),i=e.i(892384);function a(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(864407)})}e.s(["ExampleOpacity",()=>a])},106649,e=>{"use strict";var t=e.i(843476),i=e.i(892384);function a(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(289794)})}e.s(["ExampleProgress",()=>a])},314284,e=>{"use strict";var t=e.i(843476),i=e.i(892384);function a(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(673525)})}e.s(["ExampleLazyLoad",()=>a])},411771,e=>{"use strict";var t=e.i(843476),i=e.i(892384),a=e.i(596555);function s(){return(0,t.jsx)(i.ExamplesLazy,{wrapper:a.EXAMPLES_WRAPPERS.SCROLL_BAR,loader:()=>e.A(330741)})}e.s(["ExampleScrollBar",()=>s])},222193,e=>{"use strict";var t=e.i(843476),i=e.i(892384);function a(){return(0,t.jsx)(i.ExamplesLazy,{loader:()=>e.A(582682)})}e.s(["ExampleInfiniteScroll",()=>a])},870132,e=>{"use strict";var t=e.i(843476),i=e.i(892384),a=e.i(596555);function s(){return(0,t.jsx)(i.ExamplesLazy,{wrapper:a.EXAMPLES_WRAPPERS.IOS_PICKER,loader:()=>e.A(827998)})}e.s(["ExampleIosPicker",()=>s])},82464,e=>{"use strict";var t=e.i(843476),i=e.i(892384),a=e.i(596555);function s(){return(0,t.jsx)(i.ExamplesLazy,{wrapper:a.EXAMPLES_WRAPPERS.IOS_PICKER,loader:()=>e.A(482524)})}e.s(["ExampleIosPickerLoop",()=>s])},629829,e=>{"use strict";var t=e.i(843476),i=e.i(271645),a=e.i(618566),s=e.i(997053);function n(e){let{children:n}=e,[r]=(0,i.useState)(()=>new s.ServerStyleSheet);return(0,a.useServerInsertedHTML)(()=>{let e=r.getStyleElement();return r.instance.clearTag(),(0,t.jsx)(t.Fragment,{children:e})}),(0,t.jsx)(t.Fragment,{children:n})}e.s(["default",()=>n])},404686,e=>{"use strict";var t=e.i(843476),i=e.i(155487),a=e.i(164645),s=e.i(808758),n=e.i(228678),r=e.i(646107),o=e.i(897364),l=e.i(850056);let c=(0,a.configureStore)({reducer:{[s.themeName]:s.themeReducer,[l.keyEventsName]:l.keyEventsReducer,[n.modalName]:n.modalReducer,[r.routesName]:r.routesReducer,[o.tabsName]:o.tabsReducer}});function d(e){let{children:a}=e;return(0,t.jsx)(i.Provider,{store:c,children:a})}e.s(["ReduxProvider",()=>d],404686)},352450,e=>{"use strict";var t=e.i(271645),i=e.i(109950),a=e.i(808758),s=e.i(930877),n=e.i(350437);function r(){var e;let{setLocalStorageItem:r}=(e="theme",{getLocalStorageItem:(0,t.useCallback)(()=>{let t;if(!(0,s.isBrowser)())return'""';try{t=localStorage.getItem(e)}catch(e){console.error(e)}return t||'""'},[]),setLocalStorageItem:(0,t.useCallback)(t=>{if((0,s.isBrowser)())try{localStorage.setItem(e,t)}catch(e){console.error(e)}},[])}),o=(0,i.useAppSelector)(a.selectTheme),l=(0,i.useAppDispatch)();return(0,t.useEffect)(()=>{let e=document.querySelector(n.THEME_META_SELECTOR);r(JSON.stringify({currentTheme:o}));let t=Object.values(n.THEME_KEYS).map(e=>`${n.THEME_PREFIX}${e}`);if(document.documentElement.classList.remove(...t),document.documentElement.classList.add(`${n.THEME_PREFIX}${o}`),e){let t=(n.THEME_COLORS[o]||n.THEME_COLORS[n.THEME_KEYS.LIGHT]).BACKGROUND_SITE;e.setAttribute("content",t)}},[o]),(0,t.useEffect)(()=>{let e=(0,s.isBrowser)()?window.__THEME__:n.THEME_KEYS.LIGHT;l((0,a.setTheme)(e))},[l]),null}e.s(["ThemeInit",()=>r],352450)},471572,e=>{"use strict";var t=e.i(997053),i=e.i(658339);let a=t.createGlobalStyle`
  ${i.FONT_STYLES};
  ${i.RESET_STYLES};
  ${i.BASE_STYLES};
  ${i.THEME_STYLES};
`;e.s(["GlobalStyles",0,a])},98881,e=>{"use strict";var t=e.i(271645),i=e.i(651379),a=e.i(109950),s=e.i(850056);function n(){let e=(0,a.useAppDispatch)(),n=(0,a.useAppSelector)(s.selectKeyNavigating),r=(0,t.useCallback)(()=>{n&&e((0,s.setIsKeyNavigating)(!1))},[e,n]),o=(0,t.useCallback)(({key:t})=>{"Tab"!==t||n||e((0,s.setIsKeyNavigating)(!0))},[e,n]);return(0,i.useEventListener)("keydown",o),(0,i.useEventListener)("mousedown",r),null}e.s(["KeyEventsInit",()=>n])},101806,e=>{"use strict";var t=e.i(843476),i=e.i(271645),a=e.i(997053),s=e.i(725266),n=e.i(907827),r=e.i(728191),o=e.i(946078);let l=(0,a.default)(s.LinkButtonPrimaryOutlined).withConfig({displayName:"KeyEventsSkipToContent__KeyEventsSkipToContentWrapper",componentId:"sc-e63b38e8-0"})`
  z-index: ${n.LAYERS.SEARCH+1};
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
`;function c(){let[e,a]=(0,i.useState)(null),s=(0,i.useCallback)(t=>{t.currentTarget.blur(),t.preventDefault(),e?.scrollIntoView(),e?.focus()},[e]);return((0,i.useEffect)(()=>{a(document.getElementById(r.MAIN_CONTENT_ID))},[a]),e)?(0,t.jsx)(l,{href:`#${r.MAIN_CONTENT_ID}`,onClick:s,$isKeyNavigating:!0,children:"Skip to content"}):null}e.s(["KeyEventsSkipToContent",()=>c])},857825,e=>{"use strict";var t=e.i(843476),i=e.i(997053),a=e.i(515681),s=e.i(506390),n=e.i(907827),r=e.i(350437),o=e.i(784613),l=e.i(671249),c=e.i(25110),d=e.i(764268),u=e.i(156877),p=e.i(801770),f=e.i(925866),S=e.i(271645),_=e.i(109950),E=e.i(850056),m=e.i(651379),h=e.i(38817),g=e.i(377495);let A=(e,t)=>t.every(t=>e.includes(t));function O(i){let{toggleSearch:a,closeSearch:s}=i,[n,r]=(0,S.useState)([]),o=(0,_.useAppSelector)(E.selectKeyNavigating),l=(0,S.useRef)(null),c=h.MODAL_CLOSE_KEYS.some(e=>n.includes(e)),d=A(n,h.MODAL_SEARCH_TOGGLE_KEYS_1),u=A(n,h.MODAL_SEARCH_TOGGLE_KEYS_2),p=(0,S.useCallback)(({key:e})=>{r(t=>t.includes(e)?t:[...t,e])},[]),f=(0,S.useCallback)(({key:e})=>{"Meta"===e&&r([]),r(t=>t.filter(t=>t!==e))},[]);(0,m.useEventListener)("keydown",p),(0,m.useEventListener)("keyup",f),(0,S.useEffect)(()=>c?s():d||u?a():void 0,[a,s,c,d,u]);let O=(0,S.useCallback)(async()=>({default:(await e.A(676327)).SearchAlgolia}),[]);return(0,m.useEventListener)("mouseenter",O,l,{passive:!0}),(0,m.useEventListener)("touchstart",O,l,{passive:!0}),(0,t.jsx)(g.SearchButton,{ref:l,$isKeyNavigating:o,onClick:a,"aria-label":"Search",type:"button",children:(0,t.jsx)(g.SearchButtonIcon,{svg:"search"})})}var b=e.i(991790),T=e.i(228678);let R=(0,S.lazy)(async()=>({default:(await e.A(676327)).SearchAlgolia}));function L(){let e=(0,_.useAppDispatch)(),i=(0,_.useAppSelector)((0,T.selectIsModalOpen)(h.MODALS.SITE_SEARCH)),a=(0,S.useRef)(i),s=(0,S.useCallback)(()=>{a.current?e((0,T.setModalClosed)()):e((0,T.setModalOpen)(h.MODALS.SITE_SEARCH))},[e]),n=(0,S.useCallback)(()=>{e((0,T.setModalClosed)())},[e]);return((0,S.useEffect)(()=>{a.current=i},[i]),i)?(0,t.jsx)(b.LoadSpinnerWithSuspense,{fallback:(0,t.jsx)(O,{toggleSearch:s,closeSearch:n}),children:(0,t.jsx)(R,{})}):(0,t.jsx)(O,{toggleSearch:s,closeSearch:n})}var I=e.i(174776),C=e.i(255130);let $=p.SPACINGS.CUSTOM(()=>2.8),x=p.SPACINGS.TWO,v=i.default.ul.withConfig({displayName:"HeaderActions__HeaderActionsWrapper",componentId:"sc-8ebbdd46-0"})`
  display: flex;
  align-items: center;
  line-height: 1.65;
  font-size: ${f.FONT_SIZES.COMPLEMENTARY};

  ${s.MEDIA.DESKTOP} {
    ${(0,I.createGapStyles)($,"","li")};
  }
  ${s.MEDIA.COMPACT} {
    ${(0,I.createGapStyles)(x,"","li")};
  }
`,N=i.default.li.withConfig({displayName:"HeaderActions__Item",componentId:"sc-8ebbdd46-1"})`
  display: flex;
  align-items: center;

  ${({$hiddenAtCompact:e})=>e&&i.css`
      ${s.MEDIA.COMPACT} {
        display: none;
      }
    `};
`,y=(0,i.default)(d.LinkNavigation).withConfig({displayName:"HeaderActions__Link",componentId:"sc-8ebbdd46-2"})`
  color: ${r.COLORS.TEXT_MEDIUM_CONTRAST};
  display: inline-flex;
  text-align: center;
  padding: ${p.SPACINGS.ONE} 0;
`;function j(){let{flatRoutes:e}=(0,C.useHeaderNavigationContext)();return(0,t.jsxs)(v,{children:[(0,t.jsx)(N,{$hiddenAtCompact:!0,children:(0,t.jsx)("nav",{"aria-label":"Quick Navigation Menu",children:(0,t.jsx)(v,{children:e.map(e=>(0,t.jsx)(N,{children:(0,t.jsx)(y,{slug:e.slug,children:e.title})},e.slug))})})}),(0,t.jsx)(N,{$hiddenAtCompact:!0,children:(0,t.jsx)(u.VersionBadge,{})}),(0,t.jsx)(N,{children:(0,t.jsx)(L,{})}),(0,t.jsx)(N,{$hiddenAtCompact:!0,children:(0,t.jsx)(c.ThemeToggle,{})})]})}var k=e.i(380999),D=e.i(615632),P=e.i(343869),w=e.i(857355);let G=(0,i.default)(D.LinkBare).withConfig({displayName:"HeaderLogo__HeaderLogoWrapper",componentId:"sc-1c24f778-0"})`
  color: ${r.COLORS.TEXT_HIGH_CONTRAST};
  font-size: ${f.FONT_SIZES.H4};
  display: flex;
  align-items: center;
  text-decoration: none;
  line-height: 1;
  font-weight: ${f.FONT_WEIGHTS.EXTRA_BOLD};

  ${s.MEDIA.MIN_XXS} {
    font-size: ${f.FONT_SIZES.CUSTOM(({H4:e})=>e+.2)};
  }
`,M=(0,i.default)(w.SiteLogo).withConfig({displayName:"HeaderLogo__HeaderLogoImage",componentId:"sc-1c24f778-1"})`
  ${(0,k.createSquareSizeStyles)("4rem")};
  border: ${l.BORDER_SIZES.DETAIL} solid ${r.COLORS.DETAIL_LOW_CONTRAST};
  border-radius: 50%;
  margin-right: ${p.SPACINGS.CUSTOM(({ONE:e})=>e)};
  display: flex;

  ${s.MEDIA.MIN_XXS} {
    ${(0,k.createSquareSizeStyles)("4.4rem")};
  }

  > ${w.LogoLightImage},
    > ${w.LogoDarkImage},
    > ${w.LogoLightIcon},
    > ${w.LogoDarkIcon} {
    ${(0,k.createSquareSizeStyles)("100%")};
    padding: ${p.SPACINGS.ONE};
  }
`,B=i.default.span.withConfig({displayName:"HeaderLogo__HeaderLogoText",componentId:"sc-1c24f778-2"})`
  display: flex;
`;function H(){let{TITLE:e}=P.GLOBAL_DATA,{homeRoute:i}=(0,C.useHeaderNavigationContext)();return(0,t.jsxs)(G,{"aria-label":"Permalink to home page",href:i.slug,children:[(0,t.jsx)(M,{}),(0,t.jsx)(B,{children:e})]})}var U=e.i(112426),z=e.i(224583);let W="4rem",F="2.35rem",Y=(0,i.default)(z.ButtonBare).withConfig({displayName:"SidebarNavigationToggle__MainNavigationToggleWrapper",componentId:"sc-24a5efb0-0"})`
  ${(0,k.createSquareSizeStyles)(W)};
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin-left: calc((${W} - ${F}) / 2 * -1);
  margin-right: calc((${W} - ${F}) / 2 * -1);
`,K=i.default.div.withConfig({displayName:"SidebarNavigationToggle__Burger",componentId:"sc-24a5efb0-1"})`
  position: relative;
  > span {
    background-color: ${r.COLORS.TEXT_HIGH_CONTRAST};
    display: block;
    height: 0.2rem;
    border-radius: ${l.BORDER_RADIUSES.LINE};
    position: relative;
    width: ${F};
    &:before,
    &:after {
      background-color: ${r.COLORS.TEXT_HIGH_CONTRAST};
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
`;var V=e.i(313313),X=e.i(618566),Z=e.i(266349),q=e.i(169075),J=e.i(646107);let Q="routes-loading-progress",ee=i.default.div.withConfig({displayName:"RoutesLoading__RoutesLoadingWrapper",componentId:"sc-e34cadcf-0"})`
  z-index: ${n.LAYERS.NAVIGATION+n.LAYERS.STEP};
  top: ${o.HEADER_HEIGHT};
  height: ${q.ROUTES_LOADING_BAR_HEIGHT};
  left: 0;
  right: 0;
  position: absolute;
  pointer-events: none;
  overflow: hidden;
`,et=i.default.div.withConfig({displayName:"RoutesLoading__ProgressBar",componentId:"sc-e34cadcf-1"})`
  ${Z.BRAND_GRADIENT_BACKGROUND_STYLES};
  z-index: ${n.LAYERS.STEP};
  height: ${q.ROUTES_LOADING_BAR_HEIGHT};
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
`;function ei(){let e=(0,_.useAppSelector)(J.selectRoutesLoading),i=(0,_.useAppSelector)((0,T.selectIsModalOpen)(h.MODALS.SIDEBAR_NAVIGATION)),[a,s]=(0,S.useState)(!0),n=(0,X.usePathname)(),r=(0,S.useRef)(n),o=(0,S.useRef)(null),l=(0,S.useRef)(0),c=(0,S.useRef)(0),d=(0,_.useAppDispatch)(),u=(0,S.useCallback)(()=>s(!1),[]);return(0,m.useEventListener)("animationend",u,o),(0,S.useEffect)(()=>{if(!e)return;let t=o.current;t&&(s(!0),t.style.animationName="none",t.style.opacity="0",l.current=window.requestAnimationFrame(()=>{c.current=window.setTimeout(()=>{t.style.animationName="",t.style.opacity="1"},0)}))},[e]),(0,S.useEffect)(()=>{if(e)return;let t=l.current,i=c.current;t&&cancelAnimationFrame(t),i&&clearTimeout(i),o.current&&(o.current.style.opacity="0")},[e]),(0,S.useEffect)(()=>{n!==r.current&&i&&d((0,T.setModalClosed)()),r.current=n,d((0,J.setRoutesLoading)(!1))},[n,i,d]),(0,S.useEffect)(()=>()=>{let e=l.current,t=c.current;e&&cancelAnimationFrame(e),t&&clearTimeout(t)},[]),(0,t.jsx)(ee,{children:(0,t.jsx)(et,{ref:o,$loading:e,$animating:a})})}let ea=i.css`
  height: ${o.HEADER_HEIGHT};
`,es=i.default.header.withConfig({displayName:"Header__HeaderWrapper",componentId:"sc-935d5c1a-0"})`
  ${ea};
  z-index: ${n.LAYERS.HEADER};
  background-color: rgba(${r.COLORS.BACKGROUND_SITE_RGB_VALUE}, 0.85);
  border-bottom: ${l.BORDER_SIZES.DETAIL} solid ${r.COLORS.DETAIL_LOW_CONTRAST};
  backdrop-filter: saturate(180%) blur(5px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  ${s.MEDIA.DESKTOP} {
    position: sticky;
    z-index: ${n.LAYERS.NAVIGATION+1};
  }
`,en=(0,i.default)(a.PageFrame).withConfig({displayName:"Header__Content",componentId:"sc-935d5c1a-1"})`
  ${ea};
  display: flex;
  align-items: center;
  justify-content: space-between;
`,er=(0,i.default)(function(i){let a=(0,_.useAppSelector)((0,T.selectIsModalOpen)(h.MODALS.SIDEBAR_NAVIGATION)),s=a?"Hide":"Show",n=(0,S.useRef)(null),r=(0,_.useAppDispatch)(),o=(0,S.useCallback)(()=>{a?r((0,T.setModalClosed)()):r((0,T.setModalOpen)(h.MODALS.SIDEBAR_NAVIGATION))},[r,a]),l=(0,S.useCallback)(async()=>({default:(await e.A(336036)).SidebarNavigationMenuCompact}),[]);return(0,m.useEventListener)("mouseenter",l,n,{passive:!0}),(0,m.useEventListener)("touchstart",l,n,{passive:!0}),(0,t.jsx)(Y,{id:U.SIDEBAR_NAVIGATION_ID,onClick:o,"aria-expanded":a,"aria-label":`${s} ${U.SIDEBAR_NAVIGATION_ID_PRETTY}`,ref:n,type:"button",...i,children:(0,t.jsx)(K,{$isOpen:a,"aria-hidden":"true",children:(0,t.jsx)("span",{})})})}).withConfig({displayName:"Header__NavigationToggle",componentId:"sc-935d5c1a-2"})`
  ${s.MEDIA.DESKTOP} {
    display: none;
  }
`,eo=i.default.div.withConfig({displayName:"Header__Placeholder",componentId:"sc-935d5c1a-3"})`
  height: ${o.HEADER_HEIGHT};

  ${s.MEDIA.DESKTOP} {
    display: none;
  }
`;function el(){return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(es,{id:o.HEADER_ID,children:[(0,t.jsxs)(en,{children:[(0,t.jsx)(er,{}),(0,t.jsx)(H,{}),(0,t.jsx)(j,{})]}),(0,t.jsx)(ei,{}),(0,t.jsx)(V.HeaderGradient,{})]}),(0,t.jsx)(eo,{})]})}e.s(["Header",()=>el],857825)},828525,e=>{"use strict";var t=e.i(271645),i=e.i(618566),a=e.i(689368);function s(){let e=(0,i.usePathname)();return(0,t.useEffect)(()=>{(0,a.scrollToHash)(window.location.hash)},[e]),(0,t.useEffect)(()=>{function e(){(0,a.scrollToHash)(window.location.hash)}return window.addEventListener("hashchange",e),()=>window.removeEventListener("hashchange",e)},[]),null}e.s(["ScrollToHashInit",()=>s])},676327,e=>{e.v(t=>Promise.all(["static/chunks/2a9c149fd8600c03.js"].map(t=>e.l(t))).then(()=>t(974800)))},336036,e=>{e.v(t=>Promise.all(["static/chunks/d6f8ce9ec63c632b.js"].map(t=>e.l(t))).then(()=>t(991527)))},409072,e=>{e.v(t=>Promise.all(["static/chunks/639d4ea838100f37.js"].map(t=>e.l(t))).then(()=>t(237865)))},929660,e=>{e.v(t=>Promise.all(["static/chunks/7cff8f6e72d4ddd8.js","static/chunks/7fa936741f7775df.js","static/chunks/4b9d03144d657510.js"].map(t=>e.l(t))).then(()=>t(338438)))},35740,e=>{e.v(t=>Promise.all(["static/chunks/6ec8a73b5afb8cb4.js","static/chunks/7fa936741f7775df.js","static/chunks/4b9d03144d657510.js"].map(t=>e.l(t))).then(()=>t(988610)))},800797,e=>{e.v(t=>Promise.all(["static/chunks/12bca886d1a37281.js","static/chunks/7fa936741f7775df.js","static/chunks/4b9d03144d657510.js"].map(t=>e.l(t))).then(()=>t(944314)))},991167,e=>{e.v(t=>Promise.all(["static/chunks/0665d0d615af4ad2.js","static/chunks/7fa936741f7775df.js","static/chunks/4b9d03144d657510.js"].map(t=>e.l(t))).then(()=>t(834512)))},96321,e=>{e.v(t=>Promise.all(["static/chunks/9d1f14930641b9cb.js","static/chunks/7fa936741f7775df.js","static/chunks/4b9d03144d657510.js"].map(t=>e.l(t))).then(()=>t(480128)))},976870,e=>{e.v(t=>Promise.all(["static/chunks/38b02334339ddf11.js","static/chunks/7fa936741f7775df.js","static/chunks/4b9d03144d657510.js"].map(t=>e.l(t))).then(()=>t(521755)))},686409,e=>{e.v(t=>Promise.all(["static/chunks/c5bacf049c9a41d4.js","static/chunks/7fa936741f7775df.js","static/chunks/4b9d03144d657510.js"].map(t=>e.l(t))).then(()=>t(530257)))},2575,e=>{e.v(t=>Promise.all(["static/chunks/b327c6f3267148da.js","static/chunks/7fa936741f7775df.js","static/chunks/4b9d03144d657510.js"].map(t=>e.l(t))).then(()=>t(45684)))},485243,e=>{e.v(t=>Promise.all(["static/chunks/0a0ddfb7e3030bab.js","static/chunks/7fa936741f7775df.js","static/chunks/4b9d03144d657510.js"].map(t=>e.l(t))).then(()=>t(498519)))},674811,e=>{e.v(t=>Promise.all(["static/chunks/4794f884a8325e91.js","static/chunks/7fa936741f7775df.js","static/chunks/4b9d03144d657510.js"].map(t=>e.l(t))).then(()=>t(673263)))},818122,e=>{e.v(t=>Promise.all(["static/chunks/8158b30ccf38e6e3.js","static/chunks/7fa936741f7775df.js","static/chunks/4b9d03144d657510.js"].map(t=>e.l(t))).then(()=>t(122455)))},703697,e=>{e.v(t=>Promise.all(["static/chunks/7c5d1ae8ae266a7f.js","static/chunks/7fa936741f7775df.js","static/chunks/4b9d03144d657510.js"].map(t=>e.l(t))).then(()=>t(78629)))},125897,e=>{e.v(t=>Promise.all(["static/chunks/810c2670245d001a.js","static/chunks/7fa936741f7775df.js","static/chunks/4b9d03144d657510.js"].map(t=>e.l(t))).then(()=>t(668123)))},850751,e=>{e.v(t=>Promise.all(["static/chunks/3eb66a5d1aefb87b.js","static/chunks/7fa936741f7775df.js","static/chunks/4b9d03144d657510.js"].map(t=>e.l(t))).then(()=>t(992209)))},398209,e=>{e.v(t=>Promise.all(["static/chunks/4678912c195782c0.js","static/chunks/7fa936741f7775df.js","static/chunks/4b9d03144d657510.js"].map(t=>e.l(t))).then(()=>t(874785)))},135635,e=>{e.v(t=>Promise.all(["static/chunks/822188de786ba4c0.js","static/chunks/7fa936741f7775df.js","static/chunks/4b9d03144d657510.js"].map(t=>e.l(t))).then(()=>t(601874)))},135526,e=>{e.v(t=>Promise.all(["static/chunks/f15509677637dc69.js","static/chunks/7fa936741f7775df.js","static/chunks/4b9d03144d657510.js"].map(t=>e.l(t))).then(()=>t(331587)))},864407,e=>{e.v(t=>Promise.all(["static/chunks/1e0cd1aff6164704.js","static/chunks/7fa936741f7775df.js","static/chunks/4b9d03144d657510.js"].map(t=>e.l(t))).then(()=>t(1712)))},289794,e=>{e.v(t=>Promise.all(["static/chunks/3de2dfaebfbee7a4.js","static/chunks/7fa936741f7775df.js","static/chunks/4b9d03144d657510.js"].map(t=>e.l(t))).then(()=>t(704255)))},673525,e=>{e.v(t=>Promise.all(["static/chunks/b5113eb10405d293.js","static/chunks/7fa936741f7775df.js","static/chunks/4b9d03144d657510.js"].map(t=>e.l(t))).then(()=>t(433790)))},330741,e=>{e.v(t=>Promise.all(["static/chunks/f87ef770c87d1e9d.js","static/chunks/7fa936741f7775df.js","static/chunks/4b9d03144d657510.js"].map(t=>e.l(t))).then(()=>t(275449)))},582682,e=>{e.v(t=>Promise.all(["static/chunks/72503c23ceb0b9f4.js","static/chunks/7fa936741f7775df.js","static/chunks/4b9d03144d657510.js"].map(t=>e.l(t))).then(()=>t(707027)))},827998,e=>{e.v(t=>Promise.all(["static/chunks/d66584d62c0ee7c1.js","static/chunks/7fa936741f7775df.js","static/chunks/4b9d03144d657510.js"].map(t=>e.l(t))).then(()=>t(891220)))},482524,e=>{e.v(t=>Promise.all(["static/chunks/061b487cb167cf72.js","static/chunks/7fa936741f7775df.js","static/chunks/4b9d03144d657510.js"].map(t=>e.l(t))).then(()=>t(830213)))},867910,e=>{e.v(t=>Promise.all(["static/chunks/701316b68a3e8f6c.js","static/chunks/7fa936741f7775df.js","static/chunks/4b9d03144d657510.js"].map(t=>e.l(t))).then(()=>t(230037)))},180971,e=>{e.v(t=>Promise.all(["static/chunks/259952e781abbb27.js","static/chunks/7fa936741f7775df.js","static/chunks/4b9d03144d657510.js"].map(t=>e.l(t))).then(()=>t(968738)))},168325,e=>{e.v(t=>Promise.all(["static/chunks/c5dc52fa44f6693c.js","static/chunks/7fa936741f7775df.js","static/chunks/4b9d03144d657510.js"].map(t=>e.l(t))).then(()=>t(364516)))},63358,e=>{e.v(t=>Promise.all(["static/chunks/e9a0857fc54b67d3.js","static/chunks/7fa936741f7775df.js","static/chunks/4b9d03144d657510.js"].map(t=>e.l(t))).then(()=>t(217488)))},687171,e=>{e.v(t=>Promise.all(["static/chunks/b95d10be6dff8e6a.js","static/chunks/7fa936741f7775df.js","static/chunks/4b9d03144d657510.js"].map(t=>e.l(t))).then(()=>t(516838)))},406090,e=>{e.v(t=>Promise.all(["static/chunks/6f19018b47273747.js","static/chunks/7fa936741f7775df.js","static/chunks/4b9d03144d657510.js"].map(t=>e.l(t))).then(()=>t(587636)))},502971,e=>{e.v(t=>Promise.all(["static/chunks/ae9308637331701d.js","static/chunks/7fa936741f7775df.js","static/chunks/4b9d03144d657510.js"].map(t=>e.l(t))).then(()=>t(238353)))},159592,e=>{e.v(t=>Promise.all(["static/chunks/0469d120406d76c6.js","static/chunks/7fa936741f7775df.js","static/chunks/4b9d03144d657510.js"].map(t=>e.l(t))).then(()=>t(700675)))},657506,e=>{e.v(t=>Promise.all(["static/chunks/1f995e3fb6256238.js","static/chunks/7fa936741f7775df.js","static/chunks/4b9d03144d657510.js"].map(t=>e.l(t))).then(()=>t(27207)))},704187,e=>{e.v(t=>Promise.all(["static/chunks/2dc2e3128882dff3.js","static/chunks/7fa936741f7775df.js","static/chunks/4b9d03144d657510.js"].map(t=>e.l(t))).then(()=>t(236442)))},84394,e=>{e.v(t=>Promise.all(["static/chunks/84842ea9dd0531a3.js","static/chunks/7fa936741f7775df.js","static/chunks/4b9d03144d657510.js"].map(t=>e.l(t))).then(()=>t(143025)))},211232,e=>{e.v(t=>Promise.all(["static/chunks/f10245f572f1c80b.js","static/chunks/97796e389acfa283.js","static/chunks/02ac26f1d63124f2.js","static/chunks/7fa936741f7775df.js"].map(t=>e.l(t))).then(()=>t(372090)))},718133,e=>{e.v(t=>Promise.all(["static/chunks/c2dd4fd669225d2d.js","static/chunks/97796e389acfa283.js","static/chunks/02ac26f1d63124f2.js","static/chunks/7fa936741f7775df.js"].map(t=>e.l(t))).then(()=>t(352293)))},602743,e=>{e.v(t=>Promise.all(["static/chunks/f1df0d1a0683c961.js","static/chunks/97796e389acfa283.js","static/chunks/02ac26f1d63124f2.js","static/chunks/7fa936741f7775df.js"].map(t=>e.l(t))).then(()=>t(144895)))},126725,e=>{e.v(t=>Promise.all(["static/chunks/72076b98513b6b7a.js","static/chunks/97796e389acfa283.js","static/chunks/02ac26f1d63124f2.js","static/chunks/7fa936741f7775df.js"].map(t=>e.l(t))).then(()=>t(71632)))},809964,e=>{e.v(t=>Promise.all(["static/chunks/86198e827e8881eb.js","static/chunks/97796e389acfa283.js","static/chunks/02ac26f1d63124f2.js","static/chunks/7fa936741f7775df.js"].map(t=>e.l(t))).then(()=>t(343418)))},732475,e=>{e.v(t=>Promise.all(["static/chunks/d809d0ba2c80cfac.js","static/chunks/97796e389acfa283.js","static/chunks/02ac26f1d63124f2.js","static/chunks/7fa936741f7775df.js"].map(t=>e.l(t))).then(()=>t(304381)))},262001,e=>{e.v(t=>Promise.all(["static/chunks/12439322614a3ce1.js","static/chunks/97796e389acfa283.js","static/chunks/02ac26f1d63124f2.js","static/chunks/7fa936741f7775df.js"].map(t=>e.l(t))).then(()=>t(996389)))},474088,e=>{e.v(t=>Promise.all(["static/chunks/06342cb4b7d68f3a.js","static/chunks/97796e389acfa283.js","static/chunks/02ac26f1d63124f2.js","static/chunks/7fa936741f7775df.js"].map(t=>e.l(t))).then(()=>t(24840)))},189029,e=>{e.v(t=>Promise.all(["static/chunks/a0937acbcc18d024.js","static/chunks/97796e389acfa283.js","static/chunks/02ac26f1d63124f2.js","static/chunks/7fa936741f7775df.js"].map(t=>e.l(t))).then(()=>t(462721)))},321556,e=>{e.v(t=>Promise.all(["static/chunks/a04a33a54711fbc8.js","static/chunks/584f54978f44e3de.js","static/chunks/02ac26f1d63124f2.js","static/chunks/7fa936741f7775df.js"].map(t=>e.l(t))).then(()=>t(13074)))},643267,e=>{e.v(t=>Promise.all(["static/chunks/2d3aff9d84f799d9.js","static/chunks/97796e389acfa283.js","static/chunks/02ac26f1d63124f2.js","static/chunks/7fa936741f7775df.js"].map(t=>e.l(t))).then(()=>t(110491)))},822087,e=>{e.v(t=>Promise.all(["static/chunks/e7384a3be257897e.js","static/chunks/97796e389acfa283.js","static/chunks/02ac26f1d63124f2.js","static/chunks/7fa936741f7775df.js"].map(t=>e.l(t))).then(()=>t(224909)))},230095,e=>{e.v(t=>Promise.all(["static/chunks/ca4af7833a01f871.js","static/chunks/97796e389acfa283.js","static/chunks/02ac26f1d63124f2.js","static/chunks/7fa936741f7775df.js"].map(t=>e.l(t))).then(()=>t(274185)))},733996,e=>{e.v(t=>Promise.all(["static/chunks/1752cf44611e9fcb.js","static/chunks/97796e389acfa283.js","static/chunks/02ac26f1d63124f2.js","static/chunks/7fa936741f7775df.js"].map(t=>e.l(t))).then(()=>t(713571)))},430642,e=>{e.v(t=>Promise.all(["static/chunks/97796e389acfa283.js","static/chunks/0704f76357a75720.js","static/chunks/02ac26f1d63124f2.js","static/chunks/7fa936741f7775df.js"].map(t=>e.l(t))).then(()=>t(360860)))},313316,e=>{e.v(t=>Promise.all(["static/chunks/2c79be54f201b096.js","static/chunks/97796e389acfa283.js","static/chunks/02ac26f1d63124f2.js","static/chunks/7fa936741f7775df.js"].map(t=>e.l(t))).then(()=>t(297674)))},240333,e=>{e.v(t=>Promise.all(["static/chunks/ec5b200e89cc150b.js","static/chunks/97796e389acfa283.js","static/chunks/02ac26f1d63124f2.js","static/chunks/7fa936741f7775df.js"].map(t=>e.l(t))).then(()=>t(446556)))},653436,e=>{e.v(t=>Promise.all(["static/chunks/7e7b181fa6cd0c53.js","static/chunks/97796e389acfa283.js","static/chunks/02ac26f1d63124f2.js","static/chunks/7fa936741f7775df.js"].map(t=>e.l(t))).then(()=>t(991359)))},764557,e=>{e.v(t=>Promise.all(["static/chunks/2e36c060c48fbae0.js","static/chunks/97796e389acfa283.js","static/chunks/02ac26f1d63124f2.js","static/chunks/7fa936741f7775df.js"].map(t=>e.l(t))).then(()=>t(664715)))},511493,e=>{e.v(t=>Promise.all(["static/chunks/8b380b3b9f6adc73.js","static/chunks/97796e389acfa283.js","static/chunks/02ac26f1d63124f2.js","static/chunks/7fa936741f7775df.js"].map(t=>e.l(t))).then(()=>t(413044)))},781565,e=>{e.v(t=>Promise.all(["static/chunks/b2f09e249bda1600.js","static/chunks/97796e389acfa283.js","static/chunks/02ac26f1d63124f2.js","static/chunks/7fa936741f7775df.js"].map(t=>e.l(t))).then(()=>t(826276)))},343858,e=>{e.v(t=>Promise.all(["static/chunks/c3462a34fcbdc3f1.js","static/chunks/97796e389acfa283.js","static/chunks/02ac26f1d63124f2.js","static/chunks/7fa936741f7775df.js"].map(t=>e.l(t))).then(()=>t(362926)))},597704,e=>{e.v(t=>Promise.all(["static/chunks/9db72345ae9baaeb.js","static/chunks/97796e389acfa283.js","static/chunks/02ac26f1d63124f2.js","static/chunks/7fa936741f7775df.js"].map(t=>e.l(t))).then(()=>t(507596)))},548014,e=>{e.v(t=>Promise.all(["static/chunks/b9fd515923f54c78.js","static/chunks/584f54978f44e3de.js","static/chunks/02ac26f1d63124f2.js","static/chunks/7fa936741f7775df.js"].map(t=>e.l(t))).then(()=>t(938301)))},498060,e=>{e.v(t=>Promise.all(["static/chunks/01f5136d8a325088.js","static/chunks/584f54978f44e3de.js","static/chunks/02ac26f1d63124f2.js","static/chunks/7fa936741f7775df.js"].map(t=>e.l(t))).then(()=>t(605015)))},888324,e=>{e.v(t=>Promise.all(["static/chunks/caf3d70b81813b55.js","static/chunks/97796e389acfa283.js","static/chunks/02ac26f1d63124f2.js","static/chunks/7fa936741f7775df.js"].map(t=>e.l(t))).then(()=>t(698552)))},30376,e=>{e.v(t=>Promise.all(["static/chunks/aea4fb0e647f7237.js","static/chunks/97796e389acfa283.js","static/chunks/02ac26f1d63124f2.js","static/chunks/7fa936741f7775df.js"].map(t=>e.l(t))).then(()=>t(489209)))},326290,e=>{e.v(t=>Promise.all(["static/chunks/78efc79c7267c483.js","static/chunks/97796e389acfa283.js","static/chunks/02ac26f1d63124f2.js","static/chunks/7fa936741f7775df.js"].map(t=>e.l(t))).then(()=>t(984648)))},799308,e=>{e.v(t=>Promise.all(["static/chunks/d5fcc24e66c6aee0.js","static/chunks/97796e389acfa283.js","static/chunks/02ac26f1d63124f2.js","static/chunks/7fa936741f7775df.js"].map(t=>e.l(t))).then(()=>t(416104)))},80891,e=>{e.v(t=>Promise.all(["static/chunks/419d72b7f4c1d1e6.js","static/chunks/97796e389acfa283.js","static/chunks/02ac26f1d63124f2.js","static/chunks/7fa936741f7775df.js"].map(t=>e.l(t))).then(()=>t(155921)))},239020,e=>{e.v(t=>Promise.all(["static/chunks/662b0bdb61663a01.js","static/chunks/97796e389acfa283.js","static/chunks/02ac26f1d63124f2.js","static/chunks/7fa936741f7775df.js"].map(t=>e.l(t))).then(()=>t(706189)))},791876,e=>{e.v(t=>Promise.all(["static/chunks/c9b8fd0a99d0fa42.js","static/chunks/97796e389acfa283.js","static/chunks/02ac26f1d63124f2.js","static/chunks/7fa936741f7775df.js"].map(t=>e.l(t))).then(()=>t(699321)))},198251,e=>{e.v(t=>Promise.all(["static/chunks/6ea8f9f8e691c805.js","static/chunks/97796e389acfa283.js","static/chunks/02ac26f1d63124f2.js","static/chunks/7fa936741f7775df.js"].map(t=>e.l(t))).then(()=>t(485064)))},76927,e=>{e.v(t=>Promise.all(["static/chunks/227d89ddac7c7cfb.js","static/chunks/97796e389acfa283.js","static/chunks/02ac26f1d63124f2.js","static/chunks/7fa936741f7775df.js"].map(t=>e.l(t))).then(()=>t(205465)))},958547,e=>{e.v(t=>Promise.all(["static/chunks/4f5ed591158dfda5.js","static/chunks/97796e389acfa283.js","static/chunks/02ac26f1d63124f2.js","static/chunks/7fa936741f7775df.js"].map(t=>e.l(t))).then(()=>t(551454)))},103799,e=>{e.v(t=>Promise.all(["static/chunks/f10aef95fcf269cf.js","static/chunks/97796e389acfa283.js","static/chunks/02ac26f1d63124f2.js","static/chunks/7fa936741f7775df.js"].map(t=>e.l(t))).then(()=>t(116848)))}]);