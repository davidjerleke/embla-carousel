'use client'

import styled from 'styled-components'
import { COLORS } from '@/utils/theme'
import { SPACINGS } from '@/utils/spacings'
import { PRISM_HIGHLIGHT_CLASS_NAME } from '@/utils/prism'
import { TabsWrapper } from '@/components/Tabs/Tabs'
import { TabsPanelWrapper } from '@/components/Tabs/TabsPanel'
import {
  AdmonitionWrapper,
  AdmonitionContent
} from '@/components/Mdx/Components/Admonition'
import { headingStyles } from '@/components/Mdx/Styles/heading'
import { listStyles } from '@/components/Mdx/Styles/list'
import { codeStyles } from '@/components/Mdx/Styles/code'

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
