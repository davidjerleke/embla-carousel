import { RouteType } from 'components/Routes'
import { isRoutePartiallyActive } from 'utils'
import { useRoutes } from './useRoutes'

export const useRouteBreadcrumbs = (id: string): RouteType[] => {
  const { flat: routes } = useRoutes()
  const currentRoute = routes.find((route) => route.id === id)
  return routes
    .filter((route) => isRoutePartiallyActive(route, currentRoute?.slug || ''))
    .sort((a, b) => a.level - b.level)
}
