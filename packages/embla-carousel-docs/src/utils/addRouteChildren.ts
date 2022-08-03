import { RouteType } from 'components/Routes/Context'
import { isRoutePartiallyActive } from 'utils/isRoutePartiallyActive'

export const addRouteChildren = (
  parent: RouteType,
  routes: RouteType[],
): RouteType => {
  parent.children = routes
    .filter(({ slug }) => isRoutePartiallyActive(parent, slug))
    .filter(({ level }) => level - 1 === parent.level)
  parent.children.forEach((child) => addRouteChildren(child, routes))
  return parent
}
