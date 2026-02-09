'use client'

import { useMemo } from 'react'
// import { useAppSelector } from '@/hooks/redux'
import { usePathname } from 'next/navigation'
// import { selectFlatRoutes } from 'components/Routes/routesReducer'
import {
  type RouteType,
  //   addRouteChildren,
  isRouteActive,
  isRoutePartiallyActive
} from '@/utils/routes'
import { useSidebarNavigationContext } from '@/components/SidebarNavigation/SidebarNavigationContext'
import { useSiteNavigationContext } from '@/components/SiteNavigation/SiteNavigationContext'

type UseRouteActiveType = {
  isActive: boolean
  isPartiallyActive: boolean
}

export function useRouteActive(slug: RouteType['slug']): UseRouteActiveType {
  const pathname = usePathname()
  const routeState = useMemo(
    () => ({
      isActive: isRouteActive(slug, pathname),
      isPartiallyActive: isRoutePartiallyActive(slug, pathname)
    }),
    [slug, pathname]
  )

  return routeState
}

export const useRouteBreadcrumbs = (): RouteType[] => {
  const pathname = usePathname()
  const rootRoutes = useSiteNavigationContext()
  const sidebarRoutes = useSidebarNavigationContext()
  const routes = [rootRoutes.homeRoute, ...sidebarRoutes.flatRoutes]
  const activeRoute = routes.find((route) => route.slug === pathname)

  return routes
    .filter((route) =>
      isRoutePartiallyActive(route.slug, activeRoute?.slug || '')
    )
    .sort((a, b) => a.level - b.level)
}

// TODO: Clean up
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
