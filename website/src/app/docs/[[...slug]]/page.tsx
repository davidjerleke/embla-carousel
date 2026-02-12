import { Metadata } from 'next'
import { filePathToMdxFrontmatter } from '@/utils/mdx'
import { PageBreadcrumbs } from '@/components/Page/PageBreadcrumbs'
import { PageGrid } from '@/components/Page/PageGrid'
import { MAIN_CONTENT_ID, PAGE_LAYOUTS } from '@/utils/page'
import { getDocsPagePagination } from '@/utils/docs-pagination'
import { PagePagination } from '@/components/Page/PagePagination'
import { getDocsPageEditThisPagePath } from '@/utils/docs-edit-this-page'
import { PageEditThisPage } from '@/components/Page/PageEditThisPage'
import { MdxStyles } from '@/components/Mdx/Styles'
import {
  type DocsPageParamsType,
  getDocsPageContent,
  getDocsPageFilePath
} from '@/utils/docs-page'

type PropType = DocsPageParamsType

export async function generateMetadata(
  props: DocsPageParamsType
): Promise<Metadata> {
  const { params } = props
  const { slug } = await params
  const filePath = await getDocsPageFilePath(slug)
  const frontmatter = filePathToMdxFrontmatter(filePath)

  return {
    title: frontmatter.title,
    description: frontmatter.description
  }
}

export default async function DocsPage(props: PropType) {
  const { params } = props
  const { slug } = await params
  const content = await getDocsPageContent(slug)
  const pagination = await getDocsPagePagination(slug)
  const editThisPagePath = await getDocsPageEditThisPagePath(slug)

  return (
    <PageGrid layout={PAGE_LAYOUTS.DOCS}>
      <PageBreadcrumbs />

      {content && (
        <article id={MAIN_CONTENT_ID}>
          <MdxStyles>{content}</MdxStyles>
        </article>
      )}

      <PageEditThisPage filePath={editThisPagePath} />
      <PagePagination {...pagination} />
    </PageGrid>
  )
}
