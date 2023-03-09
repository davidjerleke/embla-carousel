import styled from 'styled-components'
import { COLORS } from 'consts/themes'
import { SPACINGS } from 'consts/spacings'
import { PRISM_HIGHLIGHT_CLASS_NAME } from '../Components/PrismSyntaxHighlight'
import { TabsWrapper, TabPanel } from 'components/Tabs/Tabs'
import { AdmonitionWrapper, AdmonitionContent } from '../Components/Admonition'
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
  ${AdmonitionContent} >,
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
    .${PRISM_HIGHLIGHT_CLASS_NAME}, ${TabsWrapper}, ${AdmonitionWrapper} {
      margin-bottom: ${SPACINGS.FOUR};
    }
  }

  ${TabPanel} > *:first-child,
  ${AdmonitionContent} > *:first-child,
  > *:first-child {
    margin-top: 0;
  }

  ${TabPanel} > *:last-child, 
  ${AdmonitionContent} > *:last-child, 
  > *:last-child {
    margin-bottom: 0;
  }
`
