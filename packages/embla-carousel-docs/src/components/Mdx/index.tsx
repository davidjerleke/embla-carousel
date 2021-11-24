import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import { MdxStyles } from './Styles'
import {
  Div,
  Link,
  Pre,
  PageChildLinks,
  BrandPrimaryText,
  BrandSecondaryText,
  BrandAlternativeText,
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
          PageChildLinks,
          BrandPrimaryText,
          BrandSecondaryText,
          BrandAlternativeText,
        }}
      >
        <MDXRenderer>{body}</MDXRenderer>
      </MDXProvider>
    </MdxStyles>
  )
}
