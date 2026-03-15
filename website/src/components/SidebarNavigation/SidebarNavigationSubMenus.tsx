import { SidebarNavigationSubMenu } from '@/components/SidebarNavigation/SidebarNavigationSubMenu'
import { useSidebarNavigationContext } from '@/components/SidebarNavigation/SidebarNavigationContext'

type PropType = {
  isDesktopMenu?: boolean
}

export function SidebarNavigationSubMenus(props: PropType) {
  const { isDesktopMenu = false } = props
  const { hierarchicalRoutes } = useSidebarNavigationContext()

  return (
    <>
      {hierarchicalRoutes.map((route) => (
        <li key={route.slug}>
          <SidebarNavigationSubMenu
            route={route}
            isDesktopMenu={isDesktopMenu}
          />
        </li>
      ))}
    </>
  )
}
