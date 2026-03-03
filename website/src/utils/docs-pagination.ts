import { getDocsRoutes, prefixSlugWithDocs } from '@/utils/docs-routes'
import { createRoutesWithAdjacentChildren, RouteType } from '@/utils/routes'
import { pathToSlug } from '@/utils/path-to-slug'

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
  const slugString = prefixSlugWithDocs(slug.join('/'))
  const slugPath = pathToSlug(slugString)
  const { flatRoutes } = await getDocsRoutes(slugOrEmpty)
  const routes = createRoutesWithAdjacentChildren(flatRoutes)
  const index = routes.findIndex((route) => route.slug === slugPath)
  const next = routes[index + 1] || null
  const previous = routes[index - 1] || null

  return {
    next,
    previous
  }
}
