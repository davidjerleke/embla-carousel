import { THEME_PREFIX } from '@/utils/theme'
import { GLOBAL_DATA } from '@/utils/global-data'
import { SANDBOX_VANILLA_FOLDERS } from '@/content/v9/sandboxes/Vanilla/sandbox-vanilla-folders'
import { getThemeFromDocument } from '@/utils/get-theme-from-document'
import { kebabCaseToPascalCase } from '@/utils/string-casing'
import { SandboxVanillaExtensionType } from '@/content/v9/sandboxes/sandbox-utils'
import {
  SANDBOX_REGEX_THEME,
  SANDBOX_REGEX_TITLE,
  SANDBOX_REGEX_REPOSITORY_URL
} from '@/content/v9/sandboxes/sandbox-utils'

const SANDBOX_SCRIPT_SRC_REGEX = /__replace_sandbox_script_src__/g
const SANDBOX_CODE_REGEX = /__replace_sandbox_code__/g

export async function createSandboxVanillaEntry(
  id: string,
  languageExtension: SandboxVanillaExtensionType,
  carouselHtml: string
): Promise<string> {
  const indexHTML = await import(
    '@/content/v9/sandboxes/Vanilla/SandboxFilesDist/index.html'
  )
  const theme = THEME_PREFIX + getThemeFromDocument()
  const title = kebabCaseToPascalCase(id, ' ')
  const scriptSrc = `${SANDBOX_VANILLA_FOLDERS.JS}/index.${languageExtension}`
  return indexHTML.default
    .replace(SANDBOX_REGEX_THEME, theme)
    .replace(SANDBOX_REGEX_TITLE, title)
    .replace(SANDBOX_SCRIPT_SRC_REGEX, scriptSrc)
    .replace(SANDBOX_REGEX_REPOSITORY_URL, GLOBAL_DATA.URLS.GITHUB_ROOT)
    .replace(SANDBOX_CODE_REGEX, carouselHtml)
}
