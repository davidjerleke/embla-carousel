import { THEME_PREFIX } from 'consts/themes'
import { URLS } from 'consts/urls'
import { SANDBOX_VANILLA_FOLDERS } from './sandboxVanillaFolders'
import { getThemeFromDocument } from 'utils/getThemeFromDocument'
import { kebabCaseToPascalCase } from 'utils/kebabCaseToPascalCase'
import { SandboxVanillaExtensionType } from '../sandboxTypes'
import {
  SANDBOX_REGEX_THEME,
  SANDBOX_REGEX_TITLE,
  SANDBOX_REGEX_REPOSITORY_URL,
} from '../sandboxUtils'

const SANDBOX_SCRIPT_SRC_REGEX = /__replace_sandbox_script_src__/g
const SANDBOX_CODE_REGEX = /__replace_sandbox_code__/g

export const createSandboxVanillaEntry = async (
  id: string,
  languageExtension: SandboxVanillaExtensionType,
  carouselHtml: string,
): Promise<string> => {
  const indexHTML = await import(
    '!!raw-loader!components/CodeSandbox/Vanilla/SandboxFilesDist/index.html'
  )
  const theme = THEME_PREFIX + getThemeFromDocument()
  const title = kebabCaseToPascalCase(id, ' ')
  const scriptSrc = `${SANDBOX_VANILLA_FOLDERS.JS}/index.${languageExtension}`
  return indexHTML.default
    .replace(SANDBOX_REGEX_THEME, theme)
    .replace(SANDBOX_REGEX_TITLE, title)
    .replace(SANDBOX_SCRIPT_SRC_REGEX, scriptSrc)
    .replace(SANDBOX_REGEX_REPOSITORY_URL, URLS.GITHUB_ROOT)
    .replace(SANDBOX_CODE_REGEX, carouselHtml)
}
