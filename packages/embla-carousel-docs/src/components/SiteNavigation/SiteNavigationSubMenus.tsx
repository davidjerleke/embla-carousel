import React from 'react'
import { SiteNavigationSubMenu } from './SiteNavigationSubMenu'
import { useAppSelector } from 'hooks/useRedux'
import { selectHierarchalRoutes } from 'components/Routes/routesReducer'

type PropType = {
  isDesktopMenu?: boolean
}

export const SiteNavigationSubMenus = (props: PropType) => {
  const { isDesktopMenu = false } = props
  const hierarchicalRoutes = useAppSelector(selectHierarchalRoutes)

  return (
    <>
      {hierarchicalRoutes.map((route) => (
        <li key={route.id}>
          <SiteNavigationSubMenu route={route} isDesktopMenu={isDesktopMenu} />
        </li>
      ))}
    </>
  )
}
