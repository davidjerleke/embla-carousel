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

export type SandboxModuleType = { default: string }

export type SandboxLanguageType = 'javascript' | 'typescript'

export type SandboxVanillaExtensionType = 'js' | 'ts'

export type SandboxReactExtensionType = 'jsx' | 'tsx'

export type SandboxPluginsType = {
  ['embla-carousel-autoplay']?: string
  ['embla-carousel-class-names']?: string
}

export type SandboxVanillaCreateType = {
  id: string
  carouselScript: string
  carouselHtml: string
  options: EmblaOptionsType
  slides: number[]
  styles: string
  slidesHtml?: string
  plugins?: SandboxPluginsType
  language?: SandboxLanguageType
  sandboxOverrides?: SandboxConfigType['files']
}

export type SandboxReactCreateType = {
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
