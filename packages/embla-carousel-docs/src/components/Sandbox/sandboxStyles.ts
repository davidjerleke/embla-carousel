import { css } from 'styled-components'
import { styledComponentsStylesToString } from 'utils/styledComponentStylesToString'
import { FONT_SIZES, FONT_WEIGHTS } from 'consts/fontSizes'
import { COLORS, THEME_STYLES } from 'consts/themes'
import { BASE_FONT_STYLES } from 'components/Layout/GlobalStyles/base'

const SANDBOX_BASE_STYLES = css`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');

  html {
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
    line-height: 1.15;

    background-color: ${COLORS.BACKGROUND_SITE};
    font-size: ${BASE_FONT_STYLES};

    font-family: Inter, 'system-ui', -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji',
      'Segoe UI Emoji', 'Segoe UI Symbol';
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  body {
    background-color: ${COLORS.BACKGROUND_SITE};
    color: ${COLORS.TEXT_HIGH_CONTRAST};
    font-size: ${FONT_SIZES.BODY};
    line-height: 1.65;
  }
`

const SANDBOX_HEADER_STYLES = css`
  .header {
    font-size: 2rem;
    font-weight: ${FONT_WEIGHTS.BOLD};
    text-align: center;
    padding: 4rem 2rem 2rem 2rem;
    margin: 0;
  }
`

const SANDBOX_FOOTER_STYLES = css`
  .footer {
    display: flex;
    justify-content: center;
    padding: 2rem 2rem 4rem 2rem;
  }

  .footer__link {
    display: flex;
    align-items: center;
    background-color: transparent;
    text-decoration: none;
    text-align: center;
    font-weight: ${FONT_WEIGHTS.SEMI_BOLD};
    color: ${COLORS.TEXT_LOW_CONTRAST};
    font-size: 1.4rem;
  }

  .footer__link__svg {
    display: block;
    width: 2rem;
    height: 2rem;
    margin-right: 1rem;
    fill: currentColor;
  }
`

export const SANDBOX_BASE_CSS = styledComponentsStylesToString(
  SANDBOX_BASE_STYLES,
  THEME_STYLES
)

export const SANDBOX_CSS = styledComponentsStylesToString(
  SANDBOX_HEADER_STYLES,
  SANDBOX_FOOTER_STYLES
)
