import React, { useMemo } from 'react'
import { useRoutes } from 'hooks/useRoutes'
import { SiteNavigationMenuCompact } from './SiteNavigationMenuCompact'
import { SiteNavigationMenuDesktop } from './SiteNavigationMenuDesktop'
import { SiteNavigationSubMenu } from './SiteNavigationSubMenu'
import { useBreakpoints } from 'hooks/useBreakpoints'
import { isBrowser } from 'utils/isBrowser'

export const SiteNavigationMenu = () => {
  const { hierarchical: routes } = useRoutes()
  const { isCompact, isDesktop } = useBreakpoints()
  const showDesktopMenu = isDesktop || !isBrowser
  const showCompactMenu = isCompact || !isBrowser

  const menuLinks = useMemo(() => {
    return routes.map((route) => (
      <li key={route.id}>
        <SiteNavigationSubMenu route={route} />
      </li>
    ))
  }, [routes])

  return (
    <>
      {showDesktopMenu && (
        <SiteNavigationMenuDesktop>{menuLinks}</SiteNavigationMenuDesktop>
      )}
      {showCompactMenu && (
        <SiteNavigationMenuCompact>{menuLinks}</SiteNavigationMenuCompact>
      )}
    </>
  )
}
