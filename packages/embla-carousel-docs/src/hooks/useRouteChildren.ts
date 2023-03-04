import { RouteType } from 'components/Routes/RoutesContext'
import { addRouteChildren } from 'utils/addRouteChildren'
import { useRoutes } from 'hooks/useRoutes'

export const useRouteChildren = (route: RouteType): RouteType[] => {
  const { flat: routes } = useRoutes()
  return addRouteChildren(route, routes).children
}
