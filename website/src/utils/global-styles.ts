import { COLORS } from '@/utils/theme'
import { FONT_SIZES, FONT_WEIGHTS } from '@/utils/font-sizes'
import { css } from 'styled-components'
import { LightThemeSvg, DarkThemeSvg } from '@/components/Theme/ThemeToggle'
import {
  THEME_CLASSNAME_DARK,
  THEME_CLASSNAME_LIGHT,
  THEME_KEYS
} from '@/utils/theme'
import {
  LogoLightIcon,
  LogoDarkIcon,
  LogoLightImage,
  LogoDarkImage
} from '@/components/SiteLogo/SiteLogo'

/* CONSTS */
export const BASE_FONT_STYLES = '62.5%'

export const BASE_STYLES = css`
  html {
    background-color: ${COLORS.BACKGROUND_SITE};
    font-size: ${BASE_FONT_STYLES};
  }
  body {
    background-color: ${COLORS.BACKGROUND_SITE};
    color: ${COLORS.TEXT_HIGH_CONTRAST};
    font-size: ${FONT_SIZES.BODY};
    line-height: 1.65;
  }
`

export const FONT_STYLES = css`
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
`

export const THEME_STYLES = css`
  .${THEME_CLASSNAME_LIGHT} {
    color-scheme: ${THEME_KEYS.LIGHT};

    ${LogoDarkIcon}, ${LogoDarkImage}, ${LightThemeSvg} {
      display: none;
    }
  }
  .${THEME_CLASSNAME_DARK} {
    color-scheme: ${THEME_KEYS.DARK};

    ${LogoLightIcon}, ${LogoLightImage}, ${DarkThemeSvg} {
      display: none;
    }
  }
`

export const RESET_STYLES = css`
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
    font-weight: ${FONT_WEIGHTS.NORMAL};
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
`
