import { RouteType } from 'components/Routes/RoutesContext'
import { GraphQLAllDataType } from 'consts/graphQL'

export const addRouteChildren = (
  parent: RouteType,
  routes: RouteType[]
): RouteType => {
  parent.children = routes
    .filter(({ slug }) => isRoutePartiallyActive(parent.slug, slug))
    .filter(({ level }) => level - 1 === parent.level)
  parent.children.forEach((child) => addRouteChildren(child, routes))
  return parent
}

export const createHierarchicalRoutes = (
  data: GraphQLAllDataType
): RouteType[] => {
  const routes = createFlatRoutes(data)
  const topLevelRoutes = routes.filter(({ level }) => level === 1)
  return topLevelRoutes.map((route) => addRouteChildren({ ...route }, routes))
}

export const createFlatRoutes = (data: GraphQLAllDataType): RouteType[] => {
  return data.allMdx.edges
    .map(({ node }) => node)
    .map(({ id, fields, frontmatter }) => ({
      id,
      slug: fields.slug,
      title: frontmatter.title || '',
      order: frontmatter.order || 0,
      description: frontmatter.description || '',
      level: fields.slug.split('/').filter(Boolean).length,
      children: []
    }))
}

export const isRouteActive = (
  slug: RouteType['slug'],
  locationPathname: string
): boolean => {
  return locationPathname === slug
}

export const isRoutePartiallyActive = (
  slug: RouteType['slug'],
  locationPathname: string
): boolean => {
  return locationPathname.substring(0, slug.length) === slug
}
