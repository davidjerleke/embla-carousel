import packageJson from '../../package.json'

const GITHUB_ROOT = packageJson.repository.url.replace(/^(git\+)/, '')

export const URLS = {
  GITHUB_ROOT,
  GITHUB_DOCUMENTATION: `${GITHUB_ROOT}/blob/master/packages/embla-carousel-docs`,
  GITHUB_DOCUMENTATION_RAW: `https://raw.githubusercontent.com/davidjerleke/embla-carousel/master/packages/embla-carousel-docs`,
  ALGOLIA_DOCSEARCH: `https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js`,
  NPM_PACKAGE: `https://www.npmjs.com/package/embla-carousel`,
  CODESANDBOX_DEFINE: `https://codesandbox.io/api/v1/sandboxes/define`,
}

// https://github.com/davidjerleke/embla-carousel/blob/master/packages/embla-carousel-docs/src/content/pages/get-started/react.md
