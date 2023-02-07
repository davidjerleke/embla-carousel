import { useLocation } from '@reach/router'
import { useRoutes } from './useRoutes'
import { RouteType } from 'components/Routes/Context'
import { isRouteActive } from 'utils/isRouteActive'

export const useRouteCurrent = (): RouteType => {
  const { flat: routes } = useRoutes()
  const { pathname } = useLocation()
  return routes.filter((route) => isRouteActive(route.slug, pathname))[0]
}
