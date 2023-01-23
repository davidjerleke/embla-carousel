import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import { Frame } from 'components/SiteLayout/Frame'
import { Mdx } from 'components/Mdx/Mdx'

const MAX_WIDTH = '68.2rem'

const Wrapper = styled.div`
  max-width: ${MAX_WIDTH};
  margin: 0 auto;
  text-align: center;
  &:before {
    content: '';
    display: block;
    height: 10vw;
    max-height: 100px;
  }
`

export const query = graphql`
  query NotFoundQuery($id: String) {
    mdx(id: { eq: $id }) {
      body
    }
  }
`

type PropType = PropsWithChildren<{
  pageContext: {
    id: string
  }
}>

const NotFound = (props: PropType) => {
  const { children } = props

  return (
    <Wrapper>
      <Frame>
        <Mdx>{children}</Mdx>
      </Frame>
      <code />
    </Wrapper>
  )
}

export default NotFound
