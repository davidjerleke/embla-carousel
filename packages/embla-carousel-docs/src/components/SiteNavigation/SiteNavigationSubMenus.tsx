import React from 'react'
import { useRoutes } from 'hooks/useRoutes'
import { SiteNavigationSubMenu } from './SiteNavigationSubMenu'

type PropType = {
  isDesktopMenu?: boolean
}

export const SiteNavigationSubMenus = (props: PropType) => {
  const { isDesktopMenu = false } = props
  const { hierarchical: routes } = useRoutes()

  return (
    <>
      {routes.map((route) => (
        <li key={route.id}>
          <SiteNavigationSubMenu route={route} isDesktopMenu={isDesktopMenu} />
        </li>
      ))}
    </>
  )
}
