import { RouteType } from 'components/Routes/RoutesContext'

export const isRoutePartiallyActive = (
  slug: RouteType['slug'],
  locationPathname: string,
): boolean => {
  return locationPathname.substring(0, slug.length) === slug
}
