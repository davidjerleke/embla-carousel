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
import { GLOBAL_DATA } from '@/utils/global-data'
import { joinSlugs, prefixSlugWithDocs } from '@/utils/slug'
import {
  type DocsPageParamsType,
  DocsPageStaticParamsType,
  getDocsPageContent,
  getDocsPageJsonLd
} from '@/utils/docs-page'

import { DOCS_VERSIONS } from '@/utils/global-data'
import { getDocsRoutes } from '@/utils/docs-routes'

export async function generateStaticParams(): Promise<DocsPageStaticParamsType> {
  const params: DocsPageStaticParamsType = []

  for (const version of DOCS_VERSIONS) {
    const { flatRoutes } = await getDocsRoutes([`v${version.MAJOR}`])

    flatRoutes.forEach((route) => {
      const slug = route.slug.replace('/docs', '').split('/').filter(Boolean)
      params.push({ slug })
    })
  }

  return params
}

export async function generateMetadata(
  props: DocsPageParamsType
): Promise<Metadata> {
  const { params } = props
  const { slug } = await params
  const module = await getDocsPageContent(slug)
  const canonical = prefixSlugWithDocs(joinSlugs('', ...(slug || [])))

  return {
    ...getMetadataFromMdxContent(module),
    metadataBase: GLOBAL_DATA.HOME_PAGE,
    alternates: { canonical }
  }
}

type PropType = DocsPageParamsType

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
