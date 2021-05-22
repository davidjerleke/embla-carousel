import { RouteType, MdxAllRoutesType } from 'components/Routes'
import { createFlatRoutes } from './createFlatRoutes'
import { isRoutePartiallyActive } from 'utils'

const addRouteChildren = (
  parent: RouteType,
  routes: RouteType[],
): RouteType => {
  parent.children = routes
    .filter(({ slug }) => isRoutePartiallyActive(parent, slug))
    .filter(({ level }) => level - 1 === parent.level)
  parent.children.forEach((child) => addRouteChildren(child, routes))
  return parent
}

export const createHierarchicalRoutes = (
  data: MdxAllRoutesType,
): RouteType[] => {
  const routes = createFlatRoutes(data)
  const topLevelRoutes = routes.filter(({ level }) => level === 1)
  return topLevelRoutes.map((route) => addRouteChildren({ ...route }, routes))
}
