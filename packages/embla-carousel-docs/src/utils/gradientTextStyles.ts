import { supportsStyles } from 'consts'
import { css } from 'styled-components'

export const gradientTextStyles = css`
  color: var(--brand-primary);
  ${supportsStyles.gradientText} {
    background-image: linear-gradient(
      45deg,
      var(--brand-primary),
      var(--brand-secondary)
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`
