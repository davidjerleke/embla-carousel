import { useMemo } from 'react'
import { useLocation } from '@reach/router'
import { isRouteActive, isRoutePartiallyActive } from 'utils'
import { RouteType } from 'components/Routes'

type UseRouteActiveType = {
  isActive: boolean
  isPartiallyActive: boolean
}

export const useRouteActive = (route: RouteType): UseRouteActiveType => {
  const { pathname } = useLocation()
  const routeState = useMemo(
    () => ({
      isActive: isRouteActive(route, pathname),
      isPartiallyActive: isRoutePartiallyActive(route, pathname),
    }),
    [route, pathname],
  )

  return routeState
}
