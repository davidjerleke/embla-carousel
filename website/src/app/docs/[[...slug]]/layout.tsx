import type { ReactNode } from 'react'
import { DocsPageParamsType } from '@/utils/docs-page'
import { getDocsRoutes } from '@/utils/docs-routes'
import { SidebarNavigationProvider } from '@/components/SidebarNavigation/SidebarNavigationContext'

type PropType = DocsPageParamsType & {
  children: ReactNode
}

export default async function DocsLayout(props: PropType) {
  const { children, params } = props
  const { slug } = await params
  const routes = await getDocsRoutes(slug)

  console.log(routes, 'docs routes')

  return (
    <SidebarNavigationProvider routes={routes}>
      {children}
    </SidebarNavigationProvider>
  )
}
