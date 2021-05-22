import { RouteType } from 'components/Routes'

export const isRoutePartiallyActive = (
  route: RouteType,
  locationPathname: string,
): boolean => {
  const { slug } = route
  return locationPathname.substring(0, slug.length) === slug
}
