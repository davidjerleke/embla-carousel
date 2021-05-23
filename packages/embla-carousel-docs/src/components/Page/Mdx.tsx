import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import { MdxStyles } from './MdxStyles'
import { Div, Link, Pre } from './MdxComponents'

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
        }}
      >
        <MDXRenderer>{body}</MDXRenderer>
      </MDXProvider>
    </MdxStyles>
  )
}
