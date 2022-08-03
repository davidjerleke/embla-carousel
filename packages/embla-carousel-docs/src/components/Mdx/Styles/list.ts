import { SPACINGS } from 'consts/spacings'
import { css } from 'styled-components'

export const listStyles = css`
  ol,
  ul {
    margin-left: ${SPACINGS.FOUR};
  }

  ol > li,
  ul > li {
    margin-bottom: ${SPACINGS.TWO};
  }

  ul {
    list-style: disc outside none;
  }
`
