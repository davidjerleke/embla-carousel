'use client'

import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import {
  type RouteType,
  addRouteChildren,
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

export function useRouteBreadcrumbs(): RouteType[] {
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

export function useRouteCurrent(flatRoutes: RouteType[]): RouteType {
  const pathname = usePathname()
  return flatRoutes.filter((route) => isRouteActive(route.slug, pathname))[0]
}

export function useRouteChildren(
  flatRoutes: RouteType[],
  route: RouteType
): RouteType[] {
  const routeWithChildren = addRouteChildren(route, flatRoutes)
  return routeWithChildren?.children || []
}
