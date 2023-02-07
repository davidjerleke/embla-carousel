import { useMemo } from 'react'
import { useLocation } from '@reach/router'
import { isRouteActive } from 'utils/isRouteActive'
import { isRoutePartiallyActive } from 'utils/isRoutePartiallyActive'
import { RouteType } from 'components/Routes/Context'

type UseRouteActiveType = {
  isActive: boolean
  isPartiallyActive: boolean
}

export const useRouteActive = (slug: RouteType['slug']): UseRouteActiveType => {
  const { pathname } = useLocation()
  const routeState = useMemo(
    () => ({
      isActive: isRouteActive(slug, pathname),
      isPartiallyActive: isRoutePartiallyActive(slug, pathname),
    }),
    [slug, pathname],
  )

  return routeState
}
