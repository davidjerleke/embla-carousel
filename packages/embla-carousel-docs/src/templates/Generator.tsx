import React, { PropsWithChildren } from 'react'
import { graphql } from 'gatsby'
import { PageEditThisPage } from 'components/Page/PageEditThisPage'
import { PagePagination } from 'components/Page/PagePagination'
import { PageBreadcrumbs } from 'components/Page/PageBreadcrumbs'
import { MAIN_CONTENT_ID } from 'components/KeyNavigating/KeyNavigatingSkipToContent'
import { CarouselGeneratorForm } from 'components/CarouselGenerator/CarouselGeneratorForm'
import { CarouselGeneratorProvider } from 'components/CarouselGenerator/CarouselGeneratorContext'
import { Mdx } from 'components/Mdx/Mdx'
import { Head } from './Default'
import {
  PagePropType,
  PageGeneratorLayoutType,
  PagePaginationType
} from 'consts/page'

export const query = graphql`
  query PageGeneratorQuery($id: String) {
    mdx(id: { eq: $id }) {
      tableOfContents
      frontmatter {
        title
        description
        date(formatString: "DD MMMM YYYY")
      }
    }
  }
`

export { Head }

export type PropType = PropsWithChildren<
  PagePropType<PageGeneratorLayoutType, PagePaginationType>
>

const PageGenerator = (props: PropType) => {
  const { pageContext, children } = props
  const { next, previous, filePath, id } = pageContext

  return (
    <>
      <PageBreadcrumbs id={id} />
      <CarouselGeneratorProvider>
        <CarouselGeneratorForm id={MAIN_CONTENT_ID}>
          <Mdx>{children}</Mdx>
        </CarouselGeneratorForm>
      </CarouselGeneratorProvider>
      <PageEditThisPage pageUrl={filePath} />
      <PagePagination previous={previous} next={next} />
    </>
  )
}

export default PageGenerator
