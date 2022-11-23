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

export type SandboxLanguageExtensionType = 'jsx' | 'tsx'

export type SandboxCreateType = {
  carouselScript: string
  options: EmblaOptionsType
  slides: number[]
  styles: string
  language?: SandboxLanguageType
  packageJsonOverrides?: PackageJsonType
  sandboxOverrides?: SandboxConfigType['files']
}

export const languageToExtension = (
  language: SandboxLanguageType,
): SandboxLanguageExtensionType => {
  return language === 'javascript' ? 'jsx' : 'tsx'
}

export const isLanguageTypeScript = (
  language: SandboxLanguageType,
): boolean => {
  return language === 'typescript'
}

export type SandboxModuleType = { default: string }
