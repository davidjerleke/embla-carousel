import styled from 'styled-components'
import { COLORS } from 'consts/themes'
import { SPACINGS } from 'consts/spacings'
import { TabsWrapper, TabPanel } from 'components/Tabs/Tabs'
import { headingStyles } from './heading'
import { blockquoteStyles } from './blockquote'
import { listStyles } from './list'
import { codeStyles } from './code'
import { linkStyles } from './link'
import { hrStyles } from './hr'

export const MdxStyles = styled.div`
  ${blockquoteStyles};
  ${codeStyles};
  ${hrStyles};
  ${linkStyles};

  color: ${COLORS.TEXT_BODY};

  ${TabPanel} >,
  > {
    ${listStyles};
    ${headingStyles};

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
    samp,
    ${TabsWrapper} {
      margin-bottom: ${SPACINGS.FOUR};
    }
  }

  > *:first-child {
    margin-top: 0;
  }

  > *:last-child {
    margin-bottom: 0;
  }
`
