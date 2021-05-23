import { MdxAllRoutesType, RouteType } from 'components/Routes'

export const createFlatRoutes = (data: MdxAllRoutesType): RouteType[] => {
  return data.allMdx.edges
    .map(({ node }) => node)
    .map(({ id, fields, frontmatter }) => ({
      id,
      slug: fields.slug,
      title: frontmatter.title,
      order: frontmatter.order || 0,
      level: fields.slug.split('/').filter(Boolean).length,
      children: [],
    }))
}
