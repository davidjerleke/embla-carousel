import { getParameters } from 'codesandbox/lib/api/define'
import { SANDBOX_BASE_CSS, SANDBOX_CSS } from '../sandboxStyles'
import { SANDBOX_VANILLA_FOLDERS } from './sandboxVanillaFolders'
import { loadPrettier } from 'utils/loadPrettier'
import { createSandboxVanillaPackageJson } from './createSandboxVanillaPackageJson'
import { createSandboxVanillaTsConfig } from './createSandboxVanillaTsConfig'
import { createSandboxVanillaEntry } from './createSandboxVanillaEntry'
import { createSandboxVanillaImagePaths } from './createSandboxVanillaImagePaths'
import { createSandboxVanillaOptions } from './createSandboxVanillaOptions'
import { sandboxLanguageUtils } from 'utils/sandbox'
import {
  SandboxVanillaCreateType,
  SandboxConfigType,
  SANDBOX_LANGUAGES
} from 'consts/sandbox'

export const createSandboxVanilla = async (
  config: SandboxVanillaCreateType
): Promise<string> => {
  const {
    id,
    carouselScript,
    carouselHtml,
    options,
    styles,
    plugins,
    sandboxOverrides,
    language = SANDBOX_LANGUAGES.JAVASCRIPT
  } = config
  const title = `${id}-vanilla`
  const { prettierConfig, formatHtml, formatCss } = await loadPrettier()
  const { isTypeScript, vanillaScriptExtension, formatScript } =
    await sandboxLanguageUtils(language)
  const packageJson = await createSandboxVanillaPackageJson(
    language,
    title,
    plugins
  )
  const tsConfig = createSandboxVanillaTsConfig()
  const entryScript = createSandboxVanillaOptions(carouselScript, options)
  const entryHtml = await createSandboxVanillaEntry(
    title,
    vanillaScriptExtension,
    createSandboxVanillaImagePaths(carouselHtml)
  )

  const sandboxConfig: SandboxConfigType['files'] = {
    [`.prettierrc`]: {
      isBinary: false,
      content: JSON.stringify(prettierConfig, null, '\t')
    },
    [`package.json`]: {
      isBinary: false,
      content: JSON.stringify(packageJson, null, '\t')
    },
    [`index.html`]: {
      isBinary: false,
      content: formatHtml(entryHtml)
    },
    [`${SANDBOX_VANILLA_FOLDERS.CSS}/base.css`]: {
      isBinary: false,
      content: formatCss(SANDBOX_BASE_CSS)
    },
    [`${SANDBOX_VANILLA_FOLDERS.CSS}/sandbox.css`]: {
      isBinary: false,
      content: formatCss(SANDBOX_CSS)
    },
    [`${SANDBOX_VANILLA_FOLDERS.CSS}/embla.css`]: {
      isBinary: false,
      content: formatCss(styles)
    },
    [`${SANDBOX_VANILLA_FOLDERS.JS}/index.${vanillaScriptExtension}`]: {
      isBinary: false,
      content: formatScript(entryScript)
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
