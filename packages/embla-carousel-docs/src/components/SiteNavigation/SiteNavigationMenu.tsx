import React, { useMemo } from 'react'
import { useRoutes } from 'hooks/useRoutes'
import { SiteNavigationMenuCompact } from './SiteNavigationMenuCompact'
import { SiteNavigationMenuDesktop } from './SiteNavigationMenuDesktop'
import { SiteNavigationSubMenu } from './SiteNavigationSubMenu'

export const SiteNavigationMenu = () => {
  const { hierarchical: routes } = useRoutes()

  const menuLinks = useMemo(() => {
    return routes.map((route) => (
      <li key={route.id}>
        <SiteNavigationSubMenu route={route} />
      </li>
    ))
  }, [routes])

  return (
    <>
      <SiteNavigationMenuDesktop>{menuLinks}</SiteNavigationMenuDesktop>
      <SiteNavigationMenuCompact>{menuLinks}</SiteNavigationMenuCompact>
    </>
  )
}
