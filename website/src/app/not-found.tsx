import { Metadata } from 'next'
import { MdxStyles } from '@/components/Mdx/Styles'
import { filePathToMdxFrontmatter } from '@/utils/mdx'
import { PageFrame } from '@/components/Page/PageFrame'
import { styled } from 'styled-components'
import {
  getNotFoundPageContent,
  getNotFoundPageFilePath
} from '@/utils/not-found-page'

const PageNotFoundWrapper = styled(PageFrame)`
  text-align: center;
  &:before {
    content: '';
    display: block;
    height: 10vw;
    max-height: 100px;
  }
`

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

  return (
    <PageNotFoundWrapper size="SM">
      {content && (
        <article>
          <MdxStyles>{content}</MdxStyles>
        </article>
      )}
    </PageNotFoundWrapper>
  )
}
