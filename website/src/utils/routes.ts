import { SPACINGS } from '@/utils/spacings'

/* CONSTS */
export const ROUTES_LOADING_BAR_HEIGHT = SPACINGS.CUSTOM(({ ONE }) => ONE / 2)

export type RouteType = {
  slug: string
  title: string
  description: string
  level: number
  order: number
  children: RouteType[]
}

/* UTILS */
export function addRouteChildren(
  parentWithoutChildren: RouteType,
  routes: RouteType[]
): RouteType {
  if (!parentWithoutChildren) return parentWithoutChildren

  const parent = { ...parentWithoutChildren }
  parent.children = routes
    .filter(({ slug }) => isRoutePartiallyActive(parent.slug, slug))
    .filter(({ level }) => level - 1 === parent.level)
  parent.children.forEach((child) => addRouteChildren(child, routes))
  return parent
}

export function isRouteActive(
  slug: RouteType['slug'],
  locationPathname: string
): boolean {
  return locationPathname === slug
}

export function isRoutePartiallyActive(
  slug: RouteType['slug'],
  locationPathname: string
): boolean {
  return locationPathname.substring(0, slug.length) === slug
}

// TODO: Clean up

// export const createHierarchicalRoutes = (
//   data: GraphQLAllDataType
// ): RouteType[] => {
//   const routes = createFlatRoutes(data)
//   const topLevelRoutes = routes.filter(({ level }) => level === 1)
//   return topLevelRoutes.map((route) => addRouteChildren({ ...route }, routes))
// }

// export const createFlatRoutes = (data: GraphQLAllDataType): RouteType[] => {
//   return data.allMdx.edges
//     .map(({ node }) => node)
//     .map(({ id, fields, frontmatter }) => ({
//       id,
//       slug: fields.slug,
//       title: frontmatter.title || '',
//       order: frontmatter.order || 0,
//       description: frontmatter.description || '',
//       level: fields.slug.split('/').filter(Boolean).length,
//       children: []
//     }))
// }
