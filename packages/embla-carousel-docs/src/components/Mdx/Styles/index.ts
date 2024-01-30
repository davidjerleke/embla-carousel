import styled from 'styled-components'
import { COLORS } from 'consts/themes'
import { SPACINGS } from 'consts/spacings'
import { PRISM_HIGHLIGHT_CLASS_NAME } from 'consts/prismHighlight'
import { TabsWrapper } from 'components/Tabs/Tabs'
import { TabsPanelWrapper } from 'components/Tabs/TabsPanel'
import { AdmonitionWrapper, AdmonitionContent } from '../Components/Admonition'
import { headingStyles } from './heading'
import { listStyles } from './list'
import { codeStyles } from './code'

export const MdxStyles = styled.div`
  ${codeStyles};

  color: ${COLORS.TEXT_BODY};

  ${TabsPanelWrapper} >,
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
    ul,
    ol,
    dl,
    p,
    hgroup,
    address,
    table,
    fieldset,
    figure,
    pre,
    dd,
    blockquote,
    blockquote code,
    kbd,
    samp,
    .${PRISM_HIGHLIGHT_CLASS_NAME}, ${TabsWrapper}, ${AdmonitionWrapper} {
      margin-bottom: ${SPACINGS.FOUR};
    }
  }

  ${TabsPanelWrapper} > *:first-child,
  ${AdmonitionContent} > *:first-child,
  > *:first-child {
    margin-top: 0;
  }

  ${TabsPanelWrapper} > *:last-child, 
  ${AdmonitionContent} > *:last-child, 
  > *:last-child {
    margin-bottom: 0;
  }
`
