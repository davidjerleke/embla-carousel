import { useLocation } from '@reach/router'
import { useRoutes } from './useRoutes'
import { RouteType } from 'components/Routes'
import { isRouteActive } from 'utils'

export const useRouteCurrent = (): RouteType => {
  const { flat: routes } = useRoutes()
  const { pathname } = useLocation()
  return routes.filter((route) => isRouteActive(route, pathname))[0]
}
