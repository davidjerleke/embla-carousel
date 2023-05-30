import { getParameters } from 'codesandbox/lib/api/define'
import { BASE_CSS, SANDBOX_CSS } from 'components/Sandbox/sandboxStyles'
import { SANDBOX_REACT_FOLDERS } from './sandboxReactFolders'
import { createSandboxImages } from '../sandboxImages'
import { loadPrettier } from 'utils/loadPrettier'
import { createSandboxReactPackageJson } from './createSandboxReactPackageJson'
import { createSandboxReactIndexHtml } from './createSandboxReactIndexHtml'
import { createSandboxReactDefaultEntry } from './createSandboxReactEntry'
import { createSandboxReactHeader } from './createSandboxReactHeader'
import { createSandboxReactFooter } from './createSandboxReactFooter'
import { createSandboxReactImages } from './createSandboxReactImages'
import { createSandboxReactImagePath } from './createSandboxReactImagePath'
import { createSandboxReactTsConfig } from './createSandboxReactTsConfig'
import { createSandboxReactTsDeclarations } from './createSandboxReactTsDeclarations'
import { sandboxLanguageUtils } from 'utils/sandbox'
import {
  SandboxConfigType,
  SandboxReactCreateType,
  SANDBOX_LANGUAGES
} from 'consts/sandbox'

export const createSandboxReact = async (
  config: SandboxReactCreateType
): Promise<string> => {
  const {
    id,
    carouselScript: carouselScriptRaw,
    indexScript,
    slides,
    options,
    styles,
    plugins,
    sandboxOverrides,
    language = SANDBOX_LANGUAGES.JAVASCRIPT
  } = config
  const title = `${id}-react`
  const sandboxImages = createSandboxImages(SANDBOX_REACT_FOLDERS.IMAGES)
  const { prettierConfig, formatCss } = await loadPrettier()
  const {
    isTypeScript,
    reactScriptExtension,
    vanillaScriptExtension,
    formatScript
  } = await sandboxLanguageUtils(language)
  const packageJson = await createSandboxReactPackageJson(
    language,
    title,
    plugins
  )
  const tsConfig = createSandboxReactTsConfig()
  const carouselScript = createSandboxReactImagePath(carouselScriptRaw)
  const [
    entryHtml,
    entryScript,
    headerScript,
    footerScript,
    imagesScript,
    tsDeclarations
  ] = await Promise.all([
    createSandboxReactIndexHtml(title),
    indexScript ||
      createSandboxReactDefaultEntry(isTypeScript, slides, options),
    createSandboxReactHeader(isTypeScript, title),
    createSandboxReactFooter(isTypeScript),
    createSandboxReactImages(isTypeScript),
    createSandboxReactTsDeclarations()
  ])

  const sandboxConfig: SandboxConfigType['files'] = {
    [`.prettierrc`]: {
      isBinary: false,
      content: JSON.stringify(prettierConfig, null, '\t')
    },
    [`package.json`]: {
      isBinary: false,
      content: JSON.stringify(packageJson, null, '\t')
    },
    [`${SANDBOX_REACT_FOLDERS.PUBLIC}/index.html`]: {
      isBinary: false,
      content: entryHtml
    },
    [`${SANDBOX_REACT_FOLDERS.CSS}/base.css`]: {
      isBinary: false,
      content: formatCss(BASE_CSS)
    },
    [`${SANDBOX_REACT_FOLDERS.CSS}/sandbox.css`]: {
      isBinary: false,
      content: formatCss(SANDBOX_CSS)
    },
    [`${SANDBOX_REACT_FOLDERS.CSS}/embla.css`]: {
      isBinary: false,
      content: formatCss(styles)
    },
    [`${SANDBOX_REACT_FOLDERS.JS}/index.${reactScriptExtension}`]: {
      isBinary: false,
      content: formatScript(entryScript)
    },
    [`${SANDBOX_REACT_FOLDERS.JS}/Header.${reactScriptExtension}`]: {
      isBinary: false,
      content: formatScript(headerScript)
    },
    [`${SANDBOX_REACT_FOLDERS.JS}/Footer.${reactScriptExtension}`]: {
      isBinary: false,
      content: formatScript(footerScript)
    },
    [`${SANDBOX_REACT_FOLDERS.JS}/EmblaCarousel.${reactScriptExtension}`]: {
      isBinary: false,
      content: formatScript(carouselScript)
    },
    [`${SANDBOX_REACT_FOLDERS.JS}/imageByIndex.${vanillaScriptExtension}`]: {
      isBinary: false,
      content: formatScript(imagesScript)
    }
  }

  if (isTypeScript) {
    Object.assign(sandboxConfig, {
      [`tsconfig.json`]: {
        isBinary: false,
        content: JSON.stringify(tsConfig, null, '\t')
      },
      [`declarations.d.ts`]: {
        isBinary: false,
        content: tsDeclarations
      }
    })
  }

  return getParameters({
    files: Object.assign({}, sandboxConfig, sandboxImages, sandboxOverrides)
  })
}
