import { RouteType, MdxAllRoutesType } from 'components/Routes/Context'
import { addRouteChildren } from './addRouteChildren'
import { createFlatRoutes } from './createFlatRoutes'

export const createHierarchicalRoutes = (
  data: MdxAllRoutesType,
): RouteType[] => {
  const routes = createFlatRoutes(data)
  const topLevelRoutes = routes.filter(({ level }) => level === 1)
  return topLevelRoutes.map((route) => addRouteChildren({ ...route }, routes))
}
