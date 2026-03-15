import { getParameters } from 'codesandbox/lib/api/define'
import {
  SANDBOX_BASE_CSS,
  SANDBOX_CSS
} from '@/content/v8/sandboxes/sandbox-styles'
import { SANDBOX_REACT_FOLDERS } from '@/content/v8/sandboxes/React/sandbox-react-folders'
import { loadPrettier } from '@/utils/load-prettier'
import { createSandboxReactPackageJson } from '@/content/v8/sandboxes/React/create-sandbox-react-package-json'
import { createSandboxReactIndexHtml } from '@/content/v8/sandboxes/React/create-sandbox-react-index-html'
import { createSandboxReactEntry } from '@/content/v8/sandboxes/React/create-sandbox-react-entry'
import { createSandboxReactImagePaths } from '@/content/v8/sandboxes/React/create-sandbox-react-image-paths'
import { createSandboxReactHeader } from '@/content/v8/sandboxes/React/create-sandbox-react-header'
import { createSandboxReactFooter } from '@/content/v8/sandboxes/React/create-sandbox-react-footer'
import { createSandboxReactTsConfig } from '@/content/v8/sandboxes/React/create-sandbox-react-ts-config'
import {
  sandboxLanguageUtils,
  SandboxConfigType,
  SandboxReactCreateType,
  SANDBOX_LANGUAGES
} from '@/content/v8/sandboxes/sandbox-utils'

export async function createSandboxReact(
  config: SandboxReactCreateType
): Promise<string> {
  const {
    id,
    carouselScript,
    slides,
    options,
    styles,
    plugins,
    sandboxOverrides,
    language = SANDBOX_LANGUAGES.JAVASCRIPT
  } = config
  const title = `${id}-react`
  const { prettierConfig, formatCss } = await loadPrettier()
  const { isTypeScript, reactScriptExtension, formatScript } =
    await sandboxLanguageUtils(language)
  const packageJson = await createSandboxReactPackageJson(
    language,
    title,
    plugins
  )
  const tsConfig = createSandboxReactTsConfig()
  const carouselScriptWithImages = createSandboxReactImagePaths(carouselScript)
  const [entryHtml, entryScript, headerScript, footerScript] =
    await Promise.all([
      createSandboxReactIndexHtml(title),
      createSandboxReactEntry(reactScriptExtension, slides, options, id),
      createSandboxReactHeader(reactScriptExtension, title),
      createSandboxReactFooter(reactScriptExtension)
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
      content: formatCss(SANDBOX_BASE_CSS)
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
      content: formatScript(carouselScriptWithImages)
    }
  }

  if (isTypeScript) {
    Object.assign(sandboxConfig, {
      [`tsconfig.json`]: {
        isBinary: false,
        content: JSON.stringify(tsConfig, null, '\t')
      }
    })
  }

  return getParameters({
    files: Object.assign({}, sandboxConfig, sandboxOverrides)
  })
}
