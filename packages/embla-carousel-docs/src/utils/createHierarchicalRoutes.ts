import { GraphQLAllDataType } from 'consts/graphQL'
import { RouteType } from 'components/Routes/RoutesContext'
import { addRouteChildren } from './addRouteChildren'
import { createFlatRoutes } from './createFlatRoutes'

export const createHierarchicalRoutes = (
  data: GraphQLAllDataType
): RouteType[] => {
  const routes = createFlatRoutes(data)
  const topLevelRoutes = routes.filter(({ level }) => level === 1)
  return topLevelRoutes.map((route) => addRouteChildren({ ...route }, routes))
}
