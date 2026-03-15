import packageJson from '@packages/embla-carousel/package.json'
import { capitalizeFirstLetter } from '@/utils/string-casing'
import { prefixSlugWithDocs, joinSlugs } from '@/utils/slug'

/* CONSTS */
const GIT_PREFIX_REGEX = /^(git\+)/ // Matches git+ from git+https://github.com/davidjerleke/embla-carousel
const GITHUB_ROOT_REGEX = 'https://github.com/'

const GITHUB_ROOT = packageJson.repository.url.replace(GIT_PREFIX_REGEX, '')
const [AUTHOR, REPOSITORY] = GITHUB_ROOT.replace(GITHUB_ROOT_REGEX, '').split(
  '/'
)

const URLS = {
  GITHUB_ROOT,
  GITHUB_DOCUMENTATION: joinSlugs(GITHUB_ROOT, 'blob', 'master'),
  GITHUB_PACKAGES: joinSlugs(GITHUB_ROOT, 'tree', 'master', 'packages'),
  GITHUB_SPONSORS_PAGE: joinSlugs('https://github.com/sponsors', AUTHOR),
  ALGOLIA_DOCSEARCH: `https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js`,
  NPM_PACKAGE: joinSlugs('https://www.npmjs.com/package', REPOSITORY),
  CODESANDBOX_DEFINE: `https://codesandbox.io/api/v1/sandboxes/define`
}

export type VersionType = {
  NAME: string
  MAJOR: number
  SLUG: string
}

export const DOCS_LATEST_VERSION: VersionType = {
  NAME: packageJson.version,
  MAJOR: Number(packageJson.version.split('.')[0]),
  SLUG: prefixSlugWithDocs('')
}

export const DOCS_VERSIONS: VersionType[] = [
  DOCS_LATEST_VERSION,
  {
    NAME: '8.6.0',
    MAJOR: 8,
    SLUG: prefixSlugWithDocs('v8')
  }
]

const title = packageJson.name
  .split('-')
  .map((part) => capitalizeFirstLetter(part))
  .join(' ')

export const GLOBAL_DATA = {
  TITLE: title,
  DESCRIPTION: packageJson.description,
  AUTHOR: packageJson.author,
  HOME_PAGE: getBaseUrl(),
  SHARE_IMAGE: joinSlugs(getBaseUrl(), 'share-image.png'),
  MASKABLE_ICON: joinSlugs(getBaseUrl(), 'maskable.png'),
  URLS
}

/* UTILS */
function getBaseUrl(): string {
  const isDev = process.env.NODE_ENV === 'development'
  if (isDev) return 'http://localhost:3000'
  return packageJson.homepage
}
