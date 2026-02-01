import { getHomePageContent, getHomePageFilePath } from '@/utils/home-page'
import { filePathToMdxFrontmatter } from '@/utils/mdx'
import { Metadata } from 'next'

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

  return <article>{content}</article>
}
