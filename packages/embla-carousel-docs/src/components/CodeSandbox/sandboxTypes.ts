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
  'embla-carousel-autoplay'?: string
  'embla-carousel-class-names'?: string
}

export type SandboxSharedCreateType = {
  id: string
  options: EmblaOptionsType
  styles: string
  plugins?: SandboxPluginsType
  language?: SandboxLanguageType
  sandboxOverrides?: SandboxConfigType['files']
}

export type SandboxVanillaCreateType = SandboxSharedCreateType & {
  carouselScript: string
  carouselHtml: string
}

export type SandboxReactCreateType = SandboxSharedCreateType & {
  carouselScript: string
  slides: number[]
  indexScript?: string
}
