import { getParameters } from 'codesandbox/lib/api/define'
import { BASE_CSS, SANDBOX_CSS } from '../sandboxStyles'
import { SANDBOX_IMAGES } from '../sandboxImages'
import { SANDBOX_REGEX_OPTIONS } from '../sandboxRegex'
import { loadPrettier } from 'utils/loadPrettier'
import { createSandboxVanillaPackageJson } from './createSandboxVanillaPackageJson'
import { createSandboxVanillaTsConfig } from './createSandboxVanillaTsConfig'
import { createSandboxVanillaTsDeclarations } from './createSandboxVanillaTsDeclarations'
import { createSandboxVanillaEntry } from './createSandboxVanillaEntry'
import { createSandboxVanillaImagePaths } from './createSandboxVanillaImagePaths'
import { SandboxVanillaCreateType, SandboxConfigType } from '../sandboxTypes'
import {
  languageToVanillaExtension,
  isLanguageTypeScript,
} from '../sandboxUtils'

export const createSandboxVanilla = async (
  config: SandboxVanillaCreateType,
): Promise<string> => {
  const {
    id,
    carouselScript,
    carouselHtml,
    options,
    styles,
    plugins,
    sandboxOverrides,
    language = 'javascript',
  } = config
  const title = `${id}-vanilla`
  const { prettierConfig, formatHtml, formatCss, formatJs, formatTs } =
    await loadPrettier()
  const scriptExtension = languageToVanillaExtension(language)
  const isTypeScript = isLanguageTypeScript(language)
  const formatScript = isTypeScript ? formatTs : formatJs
  const packageJson = createSandboxVanillaPackageJson(language, title, plugins)
  const tsConfig = createSandboxVanillaTsConfig()
  const entryScript = carouselScript.replace(
    SANDBOX_REGEX_OPTIONS,
    JSON.stringify(options),
  )

  const [entryHtml, tsDeclarations] = await Promise.all([
    createSandboxVanillaEntry(
      title,
      scriptExtension,
      createSandboxVanillaImagePaths(carouselHtml),
    ),
    createSandboxVanillaTsDeclarations(),
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
    [`index.html`]: {
      isBinary: false,
      content: formatHtml(entryHtml),
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
    files: Object.assign({}, sandboxConfig, SANDBOX_IMAGES, sandboxOverrides),
  })
}
