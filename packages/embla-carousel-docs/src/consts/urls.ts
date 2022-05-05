import packageJson from '../../package.json'

const GITHUB_ROOT = packageJson.repository.url.replace(/^(git\+)/, '')

export const URLS = {
  GITHUB_ROOT,
  GITHUB_DOCUMENTATION: `${GITHUB_ROOT}/blob/master/packages/embla-carousel-docs`,
  ALGOLIA_DOCSEARCH: `https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js`,
  NPM_PACKAGE: `https://www.npmjs.com/package/embla-carousel`,
}
