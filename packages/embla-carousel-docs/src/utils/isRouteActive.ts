import { RouteType } from 'components/Routes/Context'

export const isRouteActive = (
  slug: RouteType['slug'],
  locationPathname: string,
): boolean => {
  return locationPathname === slug
}
