import type { ReactNode } from 'react'
import { DocsPageParamsType } from '@/utils/docs-page'
import { getDocsPageRoutes } from '@/utils/docs-routes'
import { RoutesProvider } from '@/components/Routes/RoutesContext'

type PropType = DocsPageParamsType & {
  children: ReactNode
}

export default async function DocsLayout(props: PropType) {
  const { children, params } = props
  const { slug } = await params
  const routes = await getDocsPageRoutes(slug)

  console.log(routes, 'layout routes')

  return <RoutesProvider routes={routes}>{children}</RoutesProvider>
}
