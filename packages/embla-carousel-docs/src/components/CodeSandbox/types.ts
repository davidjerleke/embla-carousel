import { EmblaOptionsType } from 'embla-carousel-react'
import {
  PackageJson as BasePackageJsonType,
  TsConfigJson as TsConfigType,
} from 'type-fest'

export type PackageJsonType = BasePackageJsonType & {
  browserslist?: string[]
}

export type { TsConfigType }

export type SandboxConfigType = {
  files: {
    [key: string]: {
      content: string
      isBinary: boolean
    }
  }
}

export type SandboxLanguageType = 'javascript' | 'typescript'

export type SandboxReactExtensionType = 'jsx' | 'tsx'

export type SandboxVanillaExtensionType = 'js' | 'ts'

export type SandboxPluginsType = {
  ['embla-carousel-autoplay']?: string
  ['embla-carousel-class-names']?: string
}

export type SandboxCreateType = {
  id: string
  carouselScript: string
  options: EmblaOptionsType
  slides: number[]
  styles: string
  indexScript?: string
  plugins?: SandboxPluginsType
  language?: SandboxLanguageType
  sandboxOverrides?: SandboxConfigType['files']
}

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

export type SandboxModuleType = { default: string }
