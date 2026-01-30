import {
  type DocsPageStaticParamsType,
  docsPageStaticParams,
  resolveDocsPage
} from '@/utils/docs-page'

type PropType = {
  params: Promise<{
    slug?: string[]
  }>
}

export async function generateStaticParams(): DocsPageStaticParamsType {
  return docsPageStaticParams()
}

export default async function DocPage({ params }: PropType) {
  const { slug } = await params
  const content = await resolveDocsPage(slug)

  return <article>{content}</article>
}
