import { Metadata } from 'next'
import { filePathToMdxFrontmatter } from '@/utils/mdx'
import {
  getNotFoundPageContent,
  getNotFoundPageFilePath
} from '@/utils/not-found-page'

export async function generateMetadata(): Promise<Metadata> {
  const filePath = await getNotFoundPageFilePath()
  const frontmatter = filePathToMdxFrontmatter(filePath)

  return {
    title: frontmatter.title,
    description: frontmatter.description
  }
}

export default async function NotFoundPage() {
  const content = await getNotFoundPageContent()

  return <article>{content}</article>
}
