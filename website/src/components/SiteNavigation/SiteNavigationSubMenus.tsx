import { SiteNavigationSubMenu } from './SiteNavigationSubMenu'
import { useAppSelector } from '@/hooks/redux'
import { selectHierarchalRoutes } from '@/components/Routes/routes-reducer'

type PropType = {
  isDesktopMenu?: boolean
}

export function SiteNavigationSubMenus(props: PropType) {
  const { isDesktopMenu = false } = props
  const hierarchicalRoutes = useAppSelector(selectHierarchalRoutes)

  return (
    <>
      {hierarchicalRoutes.map((route) => (
        <li key={route.slug}>
          <SiteNavigationSubMenu route={route} isDesktopMenu={isDesktopMenu} />
        </li>
      ))}
    </>
  )
}
