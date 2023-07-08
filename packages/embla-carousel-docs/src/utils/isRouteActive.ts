import { RouteType } from 'components/Routes/RoutesContext'

export const isRouteActive = (
  slug: RouteType['slug'],
  locationPathname: string
): boolean => {
  return locationPathname === slug
}
