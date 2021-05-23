import React from 'react'
import { Mdx } from 'components/Page'
import { graphql } from 'gatsby'
import { Frame } from 'components/SiteLayout'
import styled from 'styled-components'

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

type PropType = {
  data: {
    mdx: {
      body: string
    }
  }
  pageContext: {
    id: string
  }
}

const NotFound = (props: PropType) => {
  const { body } = props.data.mdx

  return (
    <Wrapper>
      <Frame>
        <Mdx body={body} />
      </Frame>
    </Wrapper>
  )
}

export default NotFound
