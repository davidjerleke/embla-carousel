import type { ReactNode } from 'react'
import { DocsPageParamsType } from '@/consts/docs-page'
import { getDocsPageRoutes } from '@/utils/docs-routes'

type PropType = DocsPageParamsType & {
  children: ReactNode
}

export default async function DocsLayout(props: PropType) {
  const { children, params } = props
  const { slug } = await params
  const routes = await getDocsPageRoutes(slug)

  console.log(routes, 'layout routes')

  return <div>{children}</div>
}
