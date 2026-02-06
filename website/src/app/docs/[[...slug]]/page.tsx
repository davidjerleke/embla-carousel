import { Metadata } from 'next'
import { filePathToMdxFrontmatter } from '@/utils/mdx'
import {
  type DocsPageParamsType,
  getDocsPageContent,
  getDocsPageFilePath
} from '@/utils/docs-page'
import { PageGrid } from '@/components/Page/PageGrid'
import { PAGE_LAYOUTS } from '@/utils/page'
import { useRoutesContext } from '@/components/SidebarNavigation/SidebarNavigationContext'

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

  return <PageGrid layout={PAGE_LAYOUTS.DOCS}>{content}</PageGrid>
}
