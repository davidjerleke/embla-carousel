import path from 'path'
import { GatsbyNode } from 'gatsby'
import { createFilePath } from 'gatsby-source-filesystem'
import { GraphQLAllDataType, GraphQLNodeType } from './src/consts/graphQL'
import {
  PAGE_LAYOUTS,
  PageOverviewType,
  PageHomeLayoutType,
  SetupGatsbyPageType,
  PageNotFoundLayoutType,
  PageDefaultLayoutType,
  PageGeneratorLayoutType,
  PagePaginationType
} from './src/consts/page'

const PAGE_LAYOUTS_ROOT = './src/templates'

const PAGE_TEMPLATES = {
  HOME: path.resolve(`${PAGE_LAYOUTS_ROOT}/${PAGE_LAYOUTS.HOME}.tsx`),
  DEFAULT: path.resolve(`${PAGE_LAYOUTS_ROOT}/${PAGE_LAYOUTS.DEFAULT}.tsx`),
  NOT_FOUND: path.resolve(`${PAGE_LAYOUTS_ROOT}/${PAGE_LAYOUTS.NOT_FOUND}.tsx`),
  GENERATOR: path.resolve(`${PAGE_LAYOUTS_ROOT}/${PAGE_LAYOUTS.GENERATOR}.tsx`)
}

const isHomePage = (node: GraphQLNodeType): boolean => {
  return /pages\/index.mdx?$/i.test(node.internal.contentFilePath)
}

const isNotFoundPage = (node: GraphQLNodeType): boolean => {
  return /\/404.mdx?$/i.test(node.internal.contentFilePath)
}

const isGeneratorPage = (node: GraphQLNodeType): boolean => {
  return /\/generator.mdx?$/i.test(node.internal.contentFilePath)
}

const resolveFilePath = (node: GraphQLNodeType): string => {
  return node.internal.contentFilePath.replace(/.+?embla-carousel-docs\//, '')
}

const resolveComponentPath = (
  layout: string,
  node: GraphQLNodeType
): string => {
  return `${layout}?__contentFilePath=${node.internal.contentFilePath}`
}

const addPageChildren = (
  parent: PageOverviewType,
  pages: PageOverviewType[]
): PageOverviewType[] => {
  return pages
    .filter((page) => new RegExp(`^${parent.slug}`).test(page.slug))
    .filter((page) => page.level - 1 === parent.level)
    .reduce((acc, page) => [...acc, ...addPageChildren(page, pages)], [parent])
}

const createPageListWithChildren = (
  pages: PageOverviewType[]
): PageOverviewType[] => {
  return pages
    .filter((page) => page.level === 1)
    .reduce(
      (acc, page) => [...acc, ...addPageChildren(page, pages)],
      <PageOverviewType[]>[]
    )
}

export const onCreateNode: GatsbyNode['onCreateNode'] = ({
  node,
  actions: { createNodeField },
  getNode
}) => {
  if (node.internal.type === 'Mdx') {
    const value = createFilePath({ node, getNode })
    createNodeField({ node, value, name: 'slug' })
  }
}

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions: { createPage },
  reporter
}) => {
  const { errors, data } = await graphql<GraphQLAllDataType>(`
    {
      allMdx(sort: { frontmatter: { order: ASC } }) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
              order
            }
            internal {
              contentFilePath
            }
          }
        }
      }
    }
  `)

  if (!data) {
    reporter.panicOnBuild(`No data was returned when running GraphQL query`)
    return
  }

  if (errors) {
    reporter.panicOnBuild(`Error while running GraphQL query for createPages`)
    return
  }

  const { edges } = data.allMdx
  const pageList: PageOverviewType[] = edges
    .filter(({ node }) => !isNotFoundPage(node))
    .map(({ node }) => ({
      id: node.id,
      slug: node.fields.slug,
      title: node.frontmatter.title,
      order: node.frontmatter.order || 0,
      level: node.fields.slug.split('/').filter(Boolean).length
    }))
  const pageListWithChildren = createPageListWithChildren(pageList)

  edges.forEach(({ node }) => {
    const {
      id,
      fields: { slug }
    } = node
    const index = pageListWithChildren.findIndex((page) => page.id === id)
    const filePath = resolveFilePath(node)
    const next = pageListWithChildren[index + 1]
    const previous = pageListWithChildren[index - 1]

    if (isHomePage(node)) {
      const homePageSetup: SetupGatsbyPageType<PageHomeLayoutType> = {
        path: slug,
        component: resolveComponentPath(PAGE_TEMPLATES.HOME, node),
        context: {
          id,
          layout: PAGE_LAYOUTS.HOME,
          slug,
          filePath
        }
      }

      return createPage(homePageSetup)
    }

    if (isNotFoundPage(node)) {
      const notFoundPageSetup: SetupGatsbyPageType<PageNotFoundLayoutType> = {
        path: slug,
        component: resolveComponentPath(PAGE_TEMPLATES.NOT_FOUND, node),
        context: {
          id,
          layout: PAGE_LAYOUTS.NOT_FOUND,
          slug,
          filePath
        }
      }

      return createPage(notFoundPageSetup)
    }

    if (isGeneratorPage(node)) {
      const pageSetup: SetupGatsbyPageType<
        PageGeneratorLayoutType,
        PagePaginationType
      > = {
        path: slug,
        component: resolveComponentPath(PAGE_TEMPLATES.GENERATOR, node),
        context: {
          id,
          layout: PAGE_LAYOUTS.GENERATOR,
          slug,
          filePath,
          next,
          previous
        }
      }

      return createPage(pageSetup)
    }

    const pageSetup: SetupGatsbyPageType<
      PageDefaultLayoutType,
      PagePaginationType
    > = {
      path: slug,
      component: resolveComponentPath(PAGE_TEMPLATES.DEFAULT, node),
      context: {
        id,
        layout: PAGE_LAYOUTS.DEFAULT,
        slug,
        filePath,
        next,
        previous
      }
    }

    return createPage(pageSetup)
  })
}

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  actions: { setWebpackConfig }
}) => {
  setWebpackConfig({
    resolve: {
      modules: ['node_modules', 'src']
    }
  })
}
