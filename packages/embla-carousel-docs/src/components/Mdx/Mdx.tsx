import React, { PropsWithChildren } from 'react'
import { MDXProvider } from '@mdx-js/react'
import { MdxStyles } from './Styles'
import { Link } from 'components/Mdx/Components/Link'
import { Pre } from 'components/Mdx/Components/Pre'
import { Code } from 'components/Mdx/Components/Code'
import { H1 } from 'components/Mdx/Components/H1'
import { RepositoryLink } from 'components/Mdx/Components/RepositoryLink'
import { PageChildLinks } from 'components/Mdx/Components/PageChildLinks'
import { Admonition } from 'components/Mdx/Components/Admonition'
import {
  BrandAlternativeText,
  BrandPrimaryText,
  BrandSecondaryText,
} from 'components/Mdx/Components/ColoredText'

type PropType = PropsWithChildren<{}>

export const Mdx = (props: PropType) => {
  const { children } = props

  return (
    <MdxStyles>
      <MDXProvider
        components={{
          a: Link,
          pre: Pre,
          code: Code,
          h1: H1,
          RepositoryLink,
          PageChildLinks,
          BrandPrimaryText,
          BrandSecondaryText,
          BrandAlternativeText,
          Admonition,
        }}
      >
        {children}
      </MDXProvider>
    </MdxStyles>
  )
}
