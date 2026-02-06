import type { ReactNode } from 'react'
import { DocsPageParamsType } from '@/utils/docs-page'
import { getDocsPageRoutes } from '@/utils/docs-routes'
import { SidebarNavigationProvider } from '@/components/SidebarNavigation/SidebarNavigationContext'

type PropType = DocsPageParamsType & {
  children: ReactNode
}

export default async function DocsLayout(props: PropType) {
  const { children, params } = props
  const { slug } = await params
  const routes = await getDocsPageRoutes(slug)

  console.log(routes, 'layout routes')

  return (
    <SidebarNavigationProvider routes={routes}>
      {children}
    </SidebarNavigationProvider>
  )
}
