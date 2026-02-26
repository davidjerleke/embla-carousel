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

export type FlatAndHierarchicalRoutesType = {
  flatRoutes: RouteType[]
  hierarchicalRoutes: RouteType[]
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
    .sort(sortRoutesByOrder)
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

export function createHierarchicalRoutes(
  routes: RouteType[],
  baseLevel?: number
): RouteType[] {
  const startLevel = baseLevel ?? 1
  const baseLevelRoutes = routes.filter(({ level }) => level === startLevel)
  return baseLevelRoutes.map((route) => addRouteChildren({ ...route }, routes))
}

export function sortRoutesByOrder(a: RouteType, b: RouteType): number {
  return a.order - b.order
}

function addAdjacentRouteChildren(
  parent: RouteType,
  pages: RouteType[]
): RouteType[] {
  return pages
    .filter((page) => new RegExp(`^${parent.slug}`).test(page.slug))
    .filter((page) => page.level - 1 === parent.level)
    .reduce(
      (acc, page) => [...acc, ...addAdjacentRouteChildren(page, pages)],
      [parent]
    )
}

export function createRoutesWithAdjacentChildren(
  pages: RouteType[]
): RouteType[] {
  return pages
    .filter((page) => page.level === 1)
    .reduce(
      (acc, page) => [...acc, ...addAdjacentRouteChildren(page, pages)],
      <RouteType[]>[]
    )
}
