import { Metadata } from 'next'
import { MdxStyles } from '@/components/Mdx/Styles'
import { getMetadataFromMdxContent } from '@/utils/mdx'
import { PageFrame } from '@/components/Page/PageFrame'
import { styled } from 'styled-components'
import { getNotFoundPageContent } from '@/utils/not-found-page'

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
  const module = await getNotFoundPageContent()
  return getMetadataFromMdxContent(module)
}

export default async function NotFoundPage() {
  const { default: Page } = await getNotFoundPageContent()

  return (
    <PageNotFoundWrapper size="SM">
      {Page && (
        <article>
          <MdxStyles>
            <Page />
          </MdxStyles>
        </article>
      )}
    </PageNotFoundWrapper>
  )
}
