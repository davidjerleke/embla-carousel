import { getParameters } from 'codesandbox/lib/api/define'
import { resetStyles } from 'components/Layout/GlobalStyles/reset'
import { baseStyles } from 'components/Layout/GlobalStyles/base'
import { fontStyles } from 'components/Layout/GlobalStyles/font'
import { themeStyles } from 'consts/themes'
import { styledComponentsStylesToString } from 'utils/styledComponentStylesToString'
import { createSandboxReactPackageJson } from './createSandboxReactPackageJson'
import { createSandboxReactIndexHtml } from './createSandboxReactIndexHtml'
import { createSandboxReactDefaultEntry } from './createSandboxReactEntry'
import { createSandboxReactHeader } from './createSandboxReactHeader'
import { createSandboxReactFooter } from './createSandboxReactFooter'
import { createSandboxReactImages } from './createSandboxReactImages'
import { createSandboxReactTsConfig } from './createSandboxReactTsConfig'
import { createSandboxReactTsDeclarations } from './createSandboxReactTsDeclarations'
import { loadPrettier } from 'utils/loadPrettier'
import { URLS } from 'consts/urls'
import {
  sandboxCarouselStyles,
  sandboxFooterStyles,
  sandboxHeaderStyles,
  sandboxWrapperStyles,
} from 'components/Examples/sandboxStyles'
import {
  isLanguageTypeScript,
  languageToExtension,
  SandboxConfigType,
  SandboxCreateType,
} from '../types'

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
  config: SandboxCreateType,
): Promise<string> => {
  const {
    carouselScript,
    slides,
    options,
    styles,
    packageJsonOverrides,
    sandboxOverrides,
    language = 'javascript',
  } = config
  const { prettierConfig, formatCss, formatJs, formatTs } = await loadPrettier()
  const scriptExtension = languageToExtension(language)
  const isTypeScript = isLanguageTypeScript(language)
  const formatScript = isTypeScript ? formatTs : formatJs
  const packageJson = createSandboxReactPackageJson(
    language,
    packageJsonOverrides,
  )
  const tsConfig = createSandboxReactTsConfig()
  const [
    entryHtml,
    entryScript,
    headerScript,
    footerScript,
    imagesScript,
    tsDeclarations,
  ] = await Promise.all([
    createSandboxReactIndexHtml(packageJson.name),
    createSandboxReactDefaultEntry(language, slides, options),
    createSandboxReactHeader(language, packageJson.name),
    createSandboxReactFooter(language),
    createSandboxReactImages(language),
    createSandboxReactTsDeclarations(),
  ])

  const sandboxConfig: SandboxConfigType['files'] = {
    [`.prettierrc`]: {
      isBinary: false,
      content: JSON.stringify(prettierConfig, null, '\t'),
    },
    [`package.json`]: {
      isBinary: false,
      content: JSON.stringify(packageJson, null, '\t'),
    },
    [`public/index.html`]: {
      isBinary: false,
      content: entryHtml,
    },
    [`src/css/base.css`]: {
      isBinary: false,
      content: formatCss(BASE_CSS),
    },
    [`src/css/sandbox.css`]: {
      isBinary: false,
      content: formatCss(SANDBOX_CSS),
    },
    [`src/css/embla.css`]: {
      isBinary: false,
      content: formatCss(SANDBOX_CAROUSEL_CSS + styles),
    },
    [`src/js/index.${scriptExtension}`]: {
      isBinary: false,
      content: formatScript(entryScript),
    },
    [`src/js/Header.${scriptExtension}`]: {
      isBinary: false,
      content: formatScript(headerScript),
    },
    [`src/js/Footer.${scriptExtension}`]: {
      isBinary: false,
      content: formatScript(footerScript),
    },
    [`src/js/EmblaCarousel.${scriptExtension}`]: {
      isBinary: false,
      content: formatScript(carouselScript),
    },
    [`src/js/imageByIndex.${scriptExtension}`]: {
      isBinary: false,
      content: formatScript(imagesScript),
    },
    [`src/images/slide-1.jpg`]: {
      isBinary: true,
      content: `${URLS.GITHUB_DOCUMENTATION_RAW}/src/assets/images/slide-1.jpg`,
    },
    [`src/images/slide-2.jpg`]: {
      isBinary: true,
      content: `${URLS.GITHUB_DOCUMENTATION_RAW}/src/assets/images/slide-2.jpg`,
    },
    [`src/images/slide-3.jpg`]: {
      isBinary: true,
      content: `${URLS.GITHUB_DOCUMENTATION_RAW}/src/assets/images/slide-3.jpg`,
    },
    [`src/images/slide-4.jpg`]: {
      isBinary: true,
      content: `${URLS.GITHUB_DOCUMENTATION_RAW}/src/assets/images/slide-4.jpg`,
    },
  }

  if (isTypeScript) {
    Object.assign(sandboxConfig, {
      [`tsconfig.json`]: {
        isBinary: false,
        content: JSON.stringify(tsConfig, null, '\t'),
      },
      [`declarations.d.ts`]: {
        isBinary: false,
        content: tsDeclarations,
      },
    })
  }

  return getParameters({
    files: Object.assign({}, sandboxConfig, sandboxOverrides),
  })
}
