import { css } from 'styled-components'

export const blockquoteStyles = css`
  blockquote {
    padding-left: 2.4rem;
    border-left: 0.4rem solid var(--detail-low-contrast);

    > *:last-child {
      margin-bottom: 0;
    }
  }
`
