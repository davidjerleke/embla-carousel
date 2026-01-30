import { DocsPageParamsType } from '@/consts/docs-page'
import { resolveDocsPage } from '@/utils/docs-page'

type PropType = DocsPageParamsType

export default async function DocPage({ params }: PropType) {
  const { slug } = await params
  const content = await resolveDocsPage(slug)

  console.log(await params, 'docs page params')

  return <article>{content}</article>
}
