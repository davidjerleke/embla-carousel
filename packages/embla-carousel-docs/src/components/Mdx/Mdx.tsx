import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import { MdxStyles } from './Styles'
import { Link } from 'components/Mdx/Components/Link'
import { Pre } from 'components/Mdx/Components/Pre'
import { Div } from 'components/Mdx/Components/Div'
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

type PropType = { body: string }

export const Mdx = (props: PropType) => {
  const { body } = props

  return (
    <MdxStyles>
      <MDXProvider
        components={{
          a: Link,
          pre: Pre,
          div: Div,
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
        <MDXRenderer>{body}</MDXRenderer>
      </MDXProvider>
    </MdxStyles>
  )
}
