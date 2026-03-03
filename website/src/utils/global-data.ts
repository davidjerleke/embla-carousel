import packageJson from '../../../packages/embla-carousel/package.json'
import { capitalizeFirstLetter } from '@/utils/string-casing'
import { joinSlugs } from '@/utils/slug'

/* CONSTS */
const GIT_PREFIX_REGEX = /^(git\+)/ // Matches git+ from git+https://github.com/davidjerleke/embla-carousel
const GITHUB_ROOT_REGEX = 'https://github.com/'

const GITHUB_ROOT = packageJson.repository.url.replace(GIT_PREFIX_REGEX, '')
const [AUTHOR, REPOSITORY] = GITHUB_ROOT.replace(GITHUB_ROOT_REGEX, '').split(
  '/'
)

const URLS = {
  GITHUB_ROOT,
  GITHUB_DISCUSSIONS: joinSlugs(GITHUB_ROOT, 'discussions'),
  GITHUB_DOCUMENTATION: joinSlugs(GITHUB_ROOT, 'blob', 'master'),
  GITHUB_SPONSORS_PAGE: joinSlugs('https://github.com/sponsors', AUTHOR),
  ALGOLIA_DOCSEARCH: `https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js`,
  NPM_PACKAGE: joinSlugs('https://www.npmjs.com/package', REPOSITORY),
  CODESANDBOX_DEFINE: `https://codesandbox.io/api/v1/sandboxes/define`
}

type GlobalDataType = {
  TITLE: string
  DESCRIPTION: string
  AUTHOR: string
  LATEST_VERSION: string
  HOME_PAGE: string
  SHARE_IMAGE: string
  MASKABLE_ICON: string
  URLS: typeof URLS
}

const title = packageJson.name
  .split('-')
  .map((part) => capitalizeFirstLetter(part))
  .join(' ')

export const GLOBAL_DATA: GlobalDataType = {
  TITLE: title,
  DESCRIPTION: packageJson.description,
  AUTHOR: packageJson.author,
  LATEST_VERSION: packageJson.version,
  HOME_PAGE: packageJson.homepage,
  SHARE_IMAGE: joinSlugs(packageJson.homepage, 'share-image.png'),
  MASKABLE_ICON: joinSlugs(packageJson.homepage, 'maskable.png'),
  URLS
}
