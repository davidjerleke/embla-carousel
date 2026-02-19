import type { ReactNode } from 'react'
import { DocsPageParamsType } from '@/utils/docs-page'
import { getDocsRoutes } from '@/utils/docs-routes'
import { SidebarNavigationProvider } from '@/components/SidebarNavigation/SidebarNavigationContext'
import { getDocsTableOfContents } from '@/utils/docs-table-of-contents'
import { TableOfContentsProvider } from '@/components/TableOfContents/TableOfContentsContext'

type PropType = DocsPageParamsType & {
  children: ReactNode
}

export default async function DocsLayout(props: PropType) {
  const { children, params } = props
  const { slug } = await params
  const routes = await getDocsRoutes(slug)
  const tableOfContents = await getDocsTableOfContents(slug)

  return (
    <TableOfContentsProvider tableOfContents={tableOfContents}>
      <SidebarNavigationProvider routes={routes}>
        {children}
      </SidebarNavigationProvider>
    </TableOfContentsProvider>
  )
}
