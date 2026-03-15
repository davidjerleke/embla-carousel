import { Metadata } from 'next'
import { getHomePageContent, getHomePageJsonLd } from '@/utils/home-page'
import { getMetadataFromMdxContent } from '@/utils/mdx'
import { Hero } from '@/components/Hero/Hero'
import { PAGE_LAYOUTS } from '@/utils/page'
import { PageGrid } from '@/components/Page/PageGrid'
import { PageJsonLd } from '@/components/Page/PageJsonLd'
import { MdxStyles } from '@/components/Mdx/Styles'
import { GLOBAL_DATA } from '@/utils/global-data'

export async function generateMetadata(): Promise<Metadata> {
  const module = await getHomePageContent()

  return {
    ...getMetadataFromMdxContent(module),
    metadataBase: GLOBAL_DATA.HOME_PAGE,
    alternates: { canonical: '/' }
  }
}

export default async function HomePage() {
  const { default: Page } = await getHomePageContent()
  const jsonLd = await getHomePageJsonLd()

  return (
    <>
      <PageJsonLd jsonLd={jsonLd} />

      <PageGrid layout={PAGE_LAYOUTS.HOME}>
        <Hero />

        {Page && (
          <article>
            <MdxStyles>{<Page />}</MdxStyles>
          </article>
        )}
      </PageGrid>
    </>
  )
}
