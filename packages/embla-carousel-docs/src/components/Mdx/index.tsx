import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import { MdxStyles } from './Styles'
import {
  Div,
  Link,
  Pre,
  PageChildLinks,
  RepositoryLink,
  BrandPrimaryText,
  BrandSecondaryText,
  BrandAlternativeText,
  Admonition,
} from './Components'

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
