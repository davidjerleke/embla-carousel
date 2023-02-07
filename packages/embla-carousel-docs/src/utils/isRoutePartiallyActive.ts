import { RouteType } from 'components/Routes/Context'

export const isRoutePartiallyActive = (
  slug: RouteType['slug'],
  locationPathname: string,
): boolean => {
  return locationPathname.substring(0, slug.length) === slug
}
