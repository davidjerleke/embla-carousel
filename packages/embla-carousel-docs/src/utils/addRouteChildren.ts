import { RouteType } from 'components/Routes/RoutesContext'
import { isRoutePartiallyActive } from 'utils/isRoutePartiallyActive'

export const addRouteChildren = (
  parent: RouteType,
  routes: RouteType[],
): RouteType => {
  parent.children = routes
    .filter(({ slug }) => isRoutePartiallyActive(parent.slug, slug))
    .filter(({ level }) => level - 1 === parent.level)
  parent.children.forEach((child) => addRouteChildren(child, routes))
  return parent
}
