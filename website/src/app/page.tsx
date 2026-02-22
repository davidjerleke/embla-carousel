import { Metadata } from 'next'
import { getHomePageContent } from '@/utils/home-page'
import { getMetadataFromMdxContent } from '@/utils/mdx'
import { Hero } from '@/components/Hero/Hero'
import { PAGE_LAYOUTS } from '@/utils/page'
import { PageGrid } from '@/components/Page/PageGrid'
import { MdxStyles } from '@/components/Mdx/Styles'

export async function generateMetadata(): Promise<Metadata> {
  const module = await getHomePageContent()
  return getMetadataFromMdxContent(module)
}

export default async function HomePage() {
  const { default: Page } = await getHomePageContent()

  return (
    <PageGrid layout={PAGE_LAYOUTS.HOME}>
      <Hero />

      {Page && (
        <article>
          <MdxStyles>{<Page />}</MdxStyles>
        </article>
      )}
    </PageGrid>
  )
}
