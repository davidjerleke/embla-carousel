import { getParameters } from 'codesandbox/lib/api/define'
import { BASE_CSS, SANDBOX_CSS } from 'components/CodeSandbox/sandboxStyles'
import { SANDBOX_IMAGES } from '../sandboxImages'
import { loadPrettier } from 'utils/loadPrettier'
import { createSandboxReactPackageJson } from './createSandboxReactPackageJson'
import { createSandboxReactIndexHtml } from './createSandboxReactIndexHtml'
import { createSandboxReactDefaultEntry } from './createSandboxReactEntry'
import { createSandboxReactHeader } from './createSandboxReactHeader'
import { createSandboxReactFooter } from './createSandboxReactFooter'
import { createSandboxReactImages } from './createSandboxReactImages'
import { createSandboxReactTsConfig } from './createSandboxReactTsConfig'
import { createSandboxReactTsDeclarations } from './createSandboxReactTsDeclarations'
import { isLanguageTypeScript, languageToReactExtension } from '../sandboxUtils'
import { SandboxConfigType, SandboxReactCreateType } from '../sandboxTypes'

export const createSandboxReact = async (
  config: SandboxReactCreateType,
): Promise<string> => {
  const {
    id,
    carouselScript,
    indexScript,
    slides,
    options,
    styles,
    plugins,
    sandboxOverrides,
    language = 'javascript',
  } = config
  const title = `${id}-react`
  const { prettierConfig, formatCss, formatJs, formatTs } = await loadPrettier()
  const scriptExtension = languageToReactExtension(language)
  const isTypeScript = isLanguageTypeScript(language)
  const formatScript = isTypeScript ? formatTs : formatJs
  const packageJson = createSandboxReactPackageJson(language, title, plugins)
  const tsConfig = createSandboxReactTsConfig()
  const [
    entryHtml,
    entryScript,
    headerScript,
    footerScript,
    imagesScript,
    tsDeclarations,
  ] = await Promise.all([
    createSandboxReactIndexHtml(title),
    indexScript || createSandboxReactDefaultEntry(language, slides, options),
    createSandboxReactHeader(language, title),
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
      content: formatCss(styles),
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
    ...SANDBOX_IMAGES,
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
