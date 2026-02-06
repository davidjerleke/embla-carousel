import { Metadata } from 'next'
import { getHomePageContent, getHomePageFilePath } from '@/utils/home-page'
import { filePathToMdxFrontmatter } from '@/utils/mdx'
import { Hero } from '@/components/Hero/Hero'
import { PAGE_LAYOUTS } from '@/utils/page'
import { PageGrid } from '@/components/Page/PageGrid'

export async function generateMetadata(): Promise<Metadata> {
  const filePath = await getHomePageFilePath()
  const frontmatter = filePathToMdxFrontmatter(filePath)

  return {
    title: frontmatter.title,
    description: frontmatter.description
  }
}

export default async function HomePage() {
  const content = await getHomePageContent()

  return (
    <PageGrid layout={PAGE_LAYOUTS.HOME}>
      <Hero />
      {content}
    </PageGrid>
  )
}
