import { Metadata } from 'next'
import { getMetadataFromMdxContent } from '@/utils/mdx'
import { PAGE_LAYOUTS } from '@/utils/page'
import { getDocsPagePagination } from '@/utils/docs-pagination'
import { getDocsPageEditThisPagePath } from '@/utils/docs-edit-this-page'
import { PagePagination } from '@/components/Page/PagePagination'
import { PageBreadcrumbs } from '@/components/Page/PageBreadcrumbs'
import { PageGrid } from '@/components/Page/PageGrid'
import { PageJsonLd } from '@/components/Page/PageJsonLd'
import { PageMainContent } from '@/components/Page/PageMainContent'
import { PageEditThisPage } from '@/components/Page/PageEditThisPage'
import { MdxStyles } from '@/components/Mdx/Styles'
import {
  type DocsPageParamsType,
  getDocsPageContent,
  getDocsPageJsonLd
} from '@/utils/docs-page'

type PropType = DocsPageParamsType

export async function generateMetadata(
  props: DocsPageParamsType
): Promise<Metadata> {
  const { params } = props
  const { slug } = await params
  const module = await getDocsPageContent(slug)
  return getMetadataFromMdxContent(module)
}

export default async function DocsPage(props: PropType) {
  const { params } = props
  const { slug } = await params
  const pagination = await getDocsPagePagination(slug)
  const editThisPagePath = await getDocsPageEditThisPagePath(slug)
  const { default: Page } = await getDocsPageContent(slug)
  const jsonLd = await getDocsPageJsonLd(slug)

  return (
    <>
      <PageJsonLd jsonLd={jsonLd} />

      <PageGrid layout={PAGE_LAYOUTS.DOCS}>
        <PageBreadcrumbs />

        {Page && (
          <PageMainContent as="article">
            <MdxStyles>
              <Page />
            </MdxStyles>
          </PageMainContent>
        )}

        <PageEditThisPage filePath={editThisPagePath} />
        <PagePagination {...pagination} />
      </PageGrid>
    </>
  )
}
