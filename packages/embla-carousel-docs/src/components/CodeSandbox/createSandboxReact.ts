import { EmblaOptionsType } from 'embla-carousel-react'
import { getParameters } from 'codesandbox/lib/api/define'
import { PackageJsonType, SandboxConfigType } from './types'
import { resetStyles } from 'components/Layout/GlobalStyles/reset'
import { baseStyles } from 'components/Layout/GlobalStyles/base'
import { fontStyles } from 'components/Layout/GlobalStyles/font'
import { themeStyles } from 'consts/themes'
import { styledComponentsStylesToString } from 'utils/styledComponentStylesToString'
import { createSandboxReactIndexHtml } from './createSandboxReactIndexHtml'
import { createSandboxReactDefaultEntry } from './createSandboxReactEntry'
import { createCarouselDefaultStyles } from 'components/Examples/createCarouselStyles'
import { createSandboxReactHeader } from './createSandboxReactHeader'
import { createSandboxReactFooter } from './createSandboxReactFooter'
import { createSandboxReactImages } from './createSandboxReactImages'
import { loadPrettier } from 'utils/loadPrettier'
import { URLS } from 'consts/urls'
import {
  sandboxCarouselStyles,
  sandboxFooterStyles,
  sandboxHeaderStyles,
  sandboxWrapperStyles,
} from 'components/Examples/sandboxStyles'

const BASE_CSS = styledComponentsStylesToString(
  themeStyles,
  resetStyles,
  baseStyles,
  fontStyles,
)

const SANDBOX_CSS = styledComponentsStylesToString(
  sandboxWrapperStyles,
  sandboxHeaderStyles,
  sandboxFooterStyles,
)

const SANDBOX_CAROUSEL_CSS = styledComponentsStylesToString(
  sandboxCarouselStyles,
)

export const createSandboxReact = async (
  packageJson: PackageJsonType,
  carousel: string,
  slideCount: number = 5,
  options: EmblaOptionsType = {},
  styles: string = createCarouselDefaultStyles(),
  customConfig?: SandboxConfigType['files'],
): Promise<string> => {
  const { prettierConfig, formatCss, formatJs } = await loadPrettier()

  const DEFAULT_CONFIG: SandboxConfigType['files'] = {
    '.prettierrc': {
      isBinary: false,
      content: JSON.stringify(prettierConfig, null, '\t'),
    },
    'package.json': {
      isBinary: false,
      content: JSON.stringify(packageJson, null, '\t'),
    },
    'public/index.html': {
      isBinary: false,
      content: createSandboxReactIndexHtml(packageJson.name),
    },
    'src/css/base.css': {
      isBinary: false,
      content: formatCss(BASE_CSS),
    },
    'src/css/sandbox.css': {
      isBinary: false,
      content: formatCss(SANDBOX_CSS),
    },
    'src/css/embla.css': {
      isBinary: false,
      content: formatCss(SANDBOX_CAROUSEL_CSS + styles),
    },
    'src/js/index.js': {
      isBinary: false,
      content: formatJs(createSandboxReactDefaultEntry(slideCount, options)),
    },
    'src/js/Header.js': {
      isBinary: false,
      content: formatJs(createSandboxReactHeader(packageJson.name)),
    },
    'src/js/Footer.js': {
      isBinary: false,
      content: formatJs(createSandboxReactFooter()),
    },
    'src/js/EmblaCarousel.js': {
      isBinary: false,
      content: formatJs(carousel),
    },
    'src/js/imageByIndex.js': {
      isBinary: false,
      content: formatJs(createSandboxReactImages()),
    },
    'src/images/slide-1.jpg': {
      isBinary: true,
      content: `${URLS.GITHUB_DOCUMENTATION_RAW}/src/assets/images/slide-1.jpg`,
    },
    'src/images/slide-2.jpg': {
      isBinary: true,
      content: `${URLS.GITHUB_DOCUMENTATION_RAW}/src/assets/images/slide-2.jpg`,
    },
    'src/images/slide-3.jpg': {
      isBinary: true,
      content: `${URLS.GITHUB_DOCUMENTATION_RAW}/src/assets/images/slide-3.jpg`,
    },
    'src/images/slide-4.jpg': {
      isBinary: true,
      content: `${URLS.GITHUB_DOCUMENTATION_RAW}/src/assets/images/slide-4.jpg`,
    },
  }

  return getParameters({
    files: Object.assign({}, DEFAULT_CONFIG, customConfig),
  })
}
