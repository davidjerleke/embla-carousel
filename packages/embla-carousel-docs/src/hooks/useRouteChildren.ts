import { RouteType } from 'components/Routes'
import { addRouteChildren } from 'utils'
import { useRoutes } from 'hooks'

export const useRouteChildren = (route: RouteType): RouteType[] => {
  const { flat: routes } = useRoutes()
  return addRouteChildren(route, routes).children
}
