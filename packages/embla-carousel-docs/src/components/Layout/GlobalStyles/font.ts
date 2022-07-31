import { css } from 'styled-components'

export const fontStyles = css`
  html {
    font-family: 'Inter', 'system-ui', -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji',
      'Segoe UI Emoji', 'Segoe UI Symbol';
    letter-spacing: -0.02rem;
  }

  @supports (font-variation-settings: normal) {
    html {
      font-family: 'Inter var', 'system-ui', -apple-system, BlinkMacSystemFont,
        'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji',
        'Segoe UI Emoji', 'Segoe UI Symbol';
    }
  }
`
