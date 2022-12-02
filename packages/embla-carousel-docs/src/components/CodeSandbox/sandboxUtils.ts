import {
  SandboxLanguageType,
  SandboxReactExtensionType,
  SandboxVanillaExtensionType,
} from './sandboxTypes'

export const languageToReactExtension = (
  language: SandboxLanguageType,
): SandboxReactExtensionType => {
  return language === 'javascript' ? 'jsx' : 'tsx'
}

export const languageToVanillaExtension = (
  language: SandboxLanguageType,
): SandboxVanillaExtensionType => {
  return language === 'javascript' ? 'js' : 'ts'
}

export const isLanguageTypeScript = (
  language: SandboxLanguageType,
): boolean => {
  return language === 'typescript'
}

export const renameImportPath =
  (oldName: string, newName: string) => (rawFile: string) => {
    return rawFile.replace(
      new RegExp(`(?<=from\\s'|")(.*)${oldName}(?='|")`),
      newName,
    )
  }
