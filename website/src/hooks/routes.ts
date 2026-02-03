import { useMemo } from 'react'
// import { useAppSelector } from '@/hooks/redux'
import { useLocation } from '@reach/router'
// import { selectFlatRoutes } from 'components/Routes/routesReducer'
import {
  type RouteType,
  //   addRouteChildren,
  isRouteActive,
  isRoutePartiallyActive
} from '@/utils/routes'

type UseRouteActiveType = {
  isActive: boolean
  isPartiallyActive: boolean
}

export function useRouteActive(slug: RouteType['slug']): UseRouteActiveType {
  const { pathname } = useLocation()
  const routeState = useMemo(
    () => ({
      isActive: isRouteActive(slug, pathname),
      isPartiallyActive: isRoutePartiallyActive(slug, pathname)
    }),
    [slug, pathname]
  )

  return routeState
}

// TODO: Clean up

// export const useRouteBreadcrumbs = (id: string): RouteType[] => {
//   const flatRoutes = useAppSelector(selectFlatRoutes)
//   const currentRoute = flatRoutes.find((route) => route.id === id)

//   return flatRoutes
//     .filter((route) =>
//       isRoutePartiallyActive(route.slug, currentRoute?.slug || '')
//     )
//     .sort((a, b) => a.level - b.level)
// }

// export const useRouteCurrent = (): RouteType => {
//   const flatRoutes = useAppSelector(selectFlatRoutes)
//   const { pathname } = useLocation()
//   return flatRoutes.filter((route) => isRouteActive(route.slug, pathname))[0]
// }

// export const useRouteChildren = (route: RouteType): RouteType[] => {
//   const flatRoutes = useAppSelector(selectFlatRoutes)
//   const routeWithChildren = addRouteChildren(route, flatRoutes)
//   return routeWithChildren?.children || []
// }
