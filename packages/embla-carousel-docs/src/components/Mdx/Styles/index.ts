import styled from 'styled-components'
import { COLORS } from 'consts/themes'
import { headingStyles } from './heading'
import { blockquoteStyles } from './blockquote'
import { listStyles } from './list'
import { codeStyles } from './code'
import { linkStyles } from './link'
import { hrStyles } from './hr'

export const MdxStyles = styled.div`
  ${blockquoteStyles};
  ${listStyles};
  ${codeStyles};
  ${headingStyles};
  ${hrStyles};
  ${linkStyles};

  color: ${COLORS.TEXT_BODY};

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  hgroup,
  ul,
  ol,
  dl,
  blockquote,
  p,
  address,
  table,
  fieldset,
  figure,
  pre,
  hr,
  ul,
  ol,
  dd,
  blockquote code,
  kbd,
  samp {
    margin-bottom: 2.4rem;
  }

  > *:first-child {
    margin-top: 0;
  }

  > *:last-child {
    margin-bottom: 0;
  }
`
