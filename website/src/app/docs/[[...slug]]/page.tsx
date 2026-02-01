import { Metadata } from 'next'
import { filePathToMdxFrontmatter } from '@/utils/mdx'
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

  return <article>{content}</article>
}
