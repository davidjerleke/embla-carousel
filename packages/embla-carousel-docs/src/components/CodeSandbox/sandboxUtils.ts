import { EmblaOptionsType } from 'embla-carousel-react'
import {
  SandboxLanguageType,
  SandboxReactExtensionType,
  SandboxVanillaExtensionType,
} from './sandboxTypes'

export const SANDBOX_REGEX_REPOSITORY_URL =
  /__replace_sandbox_repository_url__/g

export const SANDBOX_REGEX_TITLE = /__replace_sandbox_title__/g

export const SANDBOX_REGEX_THEME = /__replace_sandbox_theme__/g

export const SANDBOX_REGEX_OPTIONS = /const\sOPTIONS(.*)/

export const SANDBOX_REGEX_IOS_PICKER_LOOP = /const\sLOOP\s=\sfalse/

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

export const injectSandboxOptions = (
  options: EmblaOptionsType,
): ((match: string) => string) => {
  return (match: string) => match.replace('{}', JSON.stringify(options))
}

export const injectSandboxIosPickerLoop = (
  loop: boolean = false,
): ((match: string) => string) => {
  return (match) => match.replace('false', loop.toString())
}
