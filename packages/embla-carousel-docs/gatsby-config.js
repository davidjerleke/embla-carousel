const capitalizeFirstLetter = (s) => `${s.charAt(0).toUpperCase()}${s.slice(1)}`
const packageJson = require('../embla-carousel/package.json')
const siteMetadata = {
  title: packageJson.name.split('-').map(capitalizeFirstLetter).join(' '),
  author: packageJson.author,
  siteUrl: packageJson.homepage,
  description: packageJson.description,
  version: packageJson.version,
}

module.exports = {
  siteMetadata,
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-typescript',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-sitemap',
      query: `
          {
            allSitePage {
              edges {
                node {
                  path
                }
              }
            }
          }
        `,
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: siteMetadata.title,
        short_name: siteMetadata.title,
        description: siteMetadata.description,
        start_url: '/',
        background_color: '#8ab4f8',
        theme_color: '#8ab4f8',
        display: 'standalone',
        lang: 'en',
        theme_color_in_head: false,
        legacy: false,
        icon: 'src/assets/images/favicon.svg',
        icons: [
          {
            src: `favicon-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `favicon-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.md', '.mdx'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              offsetY: '60',
              className: 'anchor',
              elements: ['h2', 'h3', 'h4', 'h5', 'h6'],
              icon: `<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z" fill="currentColor" /></svg>`,
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              inlineCodeMarker: '±',
              languageExtensions: [
                {
                  language: 'css-with-json',
                  extend: 'css',
                  definition: {
                    boolean: /\b(true|false)\b/g,
                    number: /\d/g,
                    singlequote: /'/g,
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets\/icons/,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-layout',
      options: {
        component: `${__dirname}/src/components/Layout/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/content/pages/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/assets/images/`,
      },
    },
  ],
}
