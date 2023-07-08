import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import { Mdx } from 'components/Mdx/Mdx'
import { PageFrame } from 'components/Page/PageFrame'
import { PagePropType, PageNotFoundLayoutType } from 'consts/page'

const PageNotFoundWrapper = styled(PageFrame)`
  text-align: center;
  &:before {
    content: '';
    display: block;
    height: 10vw;
    max-height: 100px;
  }
`

export const query = graphql`
  query PageNotFoundQuery($id: String) {
    mdx(id: { eq: $id }) {
      body
    }
  }
`

type PropType = PropsWithChildren<PagePropType<PageNotFoundLayoutType>>

const PageNotFound = (props: PropType) => {
  const { children } = props

  return (
    <PageNotFoundWrapper size="SM">
      <Mdx>{children}</Mdx>
    </PageNotFoundWrapper>
  )
}

export default PageNotFound
