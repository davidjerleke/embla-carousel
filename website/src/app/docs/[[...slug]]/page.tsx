import { DocsPageParamsType } from '@/consts/docs-page'
import { resolveDocsPage } from '@/utils/docs-page'

type PropType = DocsPageParamsType

export default async function DocsPage(props: PropType) {
  const { params } = props
  const { slug } = await params
  const content = await resolveDocsPage(slug)

  return <article>{content}</article>
}
