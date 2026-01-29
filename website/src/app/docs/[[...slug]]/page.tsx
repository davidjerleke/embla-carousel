import {
  docPageStaticParams,
  getVersionedRoutes,
  resolveDocPage
} from '@/utils/doc-page'

type Props = {
  params: Promise<{
    slug?: string[]
  }>
}

export async function generateStaticParams() {
  return docPageStaticParams()
}

export default async function DocPage({ params }: Props) {
  const { slug } = await params
  console.log(await params)
  const content = await resolveDocPage(slug)
  // console.log(await getVersionedRoutes(slug))

  return <article>{content}</article>
}
