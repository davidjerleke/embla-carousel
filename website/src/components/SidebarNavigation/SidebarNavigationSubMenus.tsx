import { SidebarNavigationSubMenu } from '@/components/SidebarNavigation/SidebarNavigationSubMenu'
import { useSidebarNavigationContext } from '@/components/SidebarNavigation/SidebarNavigationContext'
import { getIsDocsStartPage } from '@/utils/slug'
import { usePathname } from 'next/navigation'

type PropType = {
  isDesktopMenu?: boolean
}

export function SidebarNavigationSubMenus(props: PropType) {
  const { isDesktopMenu = false } = props
  const { hierarchicalRoutes } = useSidebarNavigationContext()
  const isDocsStartPage = getIsDocsStartPage(usePathname())

  return (
    <>
      {hierarchicalRoutes.map((route, index) => (
        <li key={route.slug}>
          <SidebarNavigationSubMenu
            route={route}
            isActiveOverride={!index && isDocsStartPage}
            isDesktopMenu={isDesktopMenu}
          />
        </li>
      ))}
    </>
  )
}
