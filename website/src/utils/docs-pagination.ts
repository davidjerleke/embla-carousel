import { getDocsRoutes } from '@/utils/docs-routes'
import { createRoutesWithAdjacentChildren, RouteType } from '@/utils/routes'
import { joinSlugs, prefixSlugWithDocs } from '@/utils/slug'

/* CONSTS */
export type DocsPagePaginationType = {
  next: RouteType | null
  previous: RouteType | null
}

/* UTILS */
export async function getDocsPagePagination(
  slugOrEmpty?: string[]
): Promise<DocsPagePaginationType> {
  const slug = slugOrEmpty || []
  const slugPath = prefixSlugWithDocs(joinSlugs('', ...slug))
  const { flatRoutes } = await getDocsRoutes(slugOrEmpty)
  const routes = createRoutesWithAdjacentChildren(flatRoutes)
  const index = routes.findIndex((route) => route.slug === slugPath)
  const next = routes[index + 1] || null
  const previous = routes[index - 1] || null

  return { next, previous }
}
