import { SPACINGS } from 'consts/spacings'
import { css } from 'styled-components'

export const listStyles = css`
  ol,
  ul {
    margin-left: ${SPACINGS.FOUR};
  }

  ol > li:not(:last-child),
  ul > li:not(:last-child) {
    margin-bottom: ${SPACINGS.TWO};
  }

  ul {
    list-style: disc outside none;
  }
`
