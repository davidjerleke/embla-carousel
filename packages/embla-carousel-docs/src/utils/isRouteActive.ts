import { RouteType } from 'components/Routes'

export const isRouteActive = (
  route: RouteType,
  locationPathname: string,
): boolean => {
  const { slug } = route
  return locationPathname === slug
}
