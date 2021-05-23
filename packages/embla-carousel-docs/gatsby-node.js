const { createFilePath } = require('gatsby-source-filesystem')
const path = require('path')

const PAGE_TEMPLATES = {
  HOME: `Home`,
  PAGE: `Page`,
  NOT_FOUND: `404`,
}

const addPageChildren = (parent, pages) =>
  pages
    .filter((page) => page.slug.match(parent.slug))
    .filter((page) => page.level - 1 === parent.level)
    .reduce((acc, page) => [...acc, ...addPageChildren(page, pages)], [parent])

const createPageListWithChildren = (pages) =>
  pages
    .filter((page) => page.level === 1)
    .reduce((acc, page) => [...acc, ...addPageChildren(page, pages)], [])

exports.onCreateNode = ({ node, actions: { createNodeField }, getNode }) => {
  if (node.internal.type === 'Mdx') {
    const value = createFilePath({ node, getNode })
    createNodeField({ node, value, name: 'slug' })
  }
}

exports.createPages = async ({
  graphql,
  actions: { createPage },
  reporter,
}) => {
  const { errors, data } = await graphql(`
    query {
      allMdx(sort: { fields: [frontmatter___order], order: ASC }) {
        edges {
          node {
            id
            fileAbsolutePath
            fields {
              slug
            }
            frontmatter {
              title
              order
            }
          }
        }
      }
    }
  `)

  if (errors) {
    reporter.panicOnBuild(`Error while running GraphQL query for createPages`)
    return
  }

  const { edges } = data.allMdx
  const pageList = edges
    .map(({ node }) => ({
      id: node.id,
      slug: node.fields.slug,
      title: node.frontmatter.title,
      order: node.frontmatter.order || 0,
      level: node.fields.slug.split('/').filter(Boolean).length,
    }))
    .filter(({ slug }) => slug !== '/404/')
  const pageListWithChildren = createPageListWithChildren(pageList)
  const startPage = edges.find(({ node }) => node.fields.slug === '/')
  const notFoundPage = edges.find(({ node }) => node.fields.slug === '/404/')
  const exclude = [startPage.node.fields.slug, notFoundPage.node.fields.slug]
  const pages = edges.filter(({ node }) => !exclude.includes(node.fields.slug))

  createPage({
    path: startPage.node.fields.slug,
    component: path.resolve(`./src/templates/${PAGE_TEMPLATES.HOME}.tsx`),
    context: {
      id: startPage.node.id,
      layout: PAGE_TEMPLATES.HOME,
    },
  })

  createPage({
    path: notFoundPage.node.fields.slug,
    component: path.resolve(`./src/templates/${PAGE_TEMPLATES.NOT_FOUND}.tsx`),
    context: {
      id: notFoundPage.node.id,
      layout: PAGE_TEMPLATES.NOT_FOUND,
    },
  })

  pages.forEach(({ node }) => {
    const { id, fields, fileAbsolutePath: filePath } = node
    const index = pageListWithChildren.findIndex((page) => page.id === id)

    createPage({
      path: fields.slug,
      component: path.resolve(`./src/templates/${PAGE_TEMPLATES.PAGE}.tsx`),
      context: {
        id,
        layout: PAGE_TEMPLATES.PAGE,
        slug: fields.slug,
        filePath: filePath.substring(filePath.indexOf('src'), filePath.length),
        next: pageListWithChildren[index + 1],
        previous: pageListWithChildren[index - 1],
      },
    })
  })
}

exports.onCreateWebpackConfig = ({ actions: { setWebpackConfig } }) => {
  setWebpackConfig({
    resolve: {
      modules: ['node_modules', 'src'],
    },
  })
}
