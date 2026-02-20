import docsPackageJson from '@/../package.json'
import { EmblaOptionsType } from 'embla-carousel'
import { loadPrettier } from '@/utils/load-prettier'
import { SPACINGS } from '@/utils/spacings'
import {
  PackageJson as BasePackageJsonType,
  TsConfigJson as TsConfigType
} from 'type-fest'

/* CONSTS */
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

export type SandboxVanillaExtensionType = 'js' | 'ts'

export type SandboxReactExtensionType = 'jsx' | 'tsx'

export type SandboxPluginNameType =
  (typeof SANDBOX_PLUGINS)[keyof typeof SANDBOX_PLUGINS]

export type SandboxLanguageType =
  (typeof SANDBOX_LANGUAGES)[keyof typeof SANDBOX_LANGUAGES]

export type SandboxPluginsType = {
  [key in SandboxPluginNameType]?: string
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
}

export type SandboxStaticSettingsType = {
  id: string
  options: EmblaOptionsType
  styles: string
  language?: SandboxLanguageType
  slides: number[]
}

export type SandboxModuleScriptType = {
  script: SandboxModuleType
  name: string
}

export type SandboxSelectionType<SettingsType = undefined> = {
  key: SandboxLabelKeyType
  label: SandboxLabelValueType
  createSandbox: (settings?: SettingsType) => Promise<string>
}

export type SandboxLabelValueType = (typeof SANDBOX_LABELS)[SandboxLabelKeyType]
export type SandboxLabelKeyType = keyof typeof SANDBOX_LABELS
export type SandboxCreateFunctionType<SettingsType> =
  SandboxSelectionType<SettingsType>['createSandbox']

export const SANDBOX_LABELS = {
  VANILLA_JS: 'Vanilla',
  VANILLA_TS: 'Vanilla + TypeScript',
  REACT_TS: 'React + TypeScript',
  REACT_JS: 'React'
} as const

export const SANDBOX_LANGUAGES = {
  JAVASCRIPT: 'javascript',
  TYPESCRIPT: 'typescript'
} as const

export const SANDBOX_PLUGINS = {
  ACCESSIBILITY: 'embla-carousel-accessibility',
  AUTOPLAY: 'embla-carousel-autoplay',
  AUTO_SCROLL: 'embla-carousel-auto-scroll',
  AUTO_HEIGHT: 'embla-carousel-auto-height',
  CLASS_NAMES: 'embla-carousel-class-names',
  FADE: 'embla-carousel-fade'
} as const

export const SANDBOX_SELECTION_SPACING = SPACINGS.ONE

export const SANDBOX_REGEX_REPOSITORY_URL =
  /__replace_sandbox_repository_url__/g

export const SANDBOX_REGEX_TITLE = /__replace_sandbox_title__/g

export const SANDBOX_REGEX_THEME = /__replace_sandbox_theme__/g

export const SANDBOX_REGEX_OPTIONS = /const\sOPTIONS(.*)/

type SandboxLanguageUtilsType = {
  isJavaScript: boolean
  isTypeScript: boolean
  vanillaScriptExtension: SandboxVanillaExtensionType
  reactScriptExtension: SandboxReactExtensionType
  formatScript: (jsOrTs: string) => string
}

export async function sandboxLanguageUtils(
  language: SandboxLanguageType
): Promise<SandboxLanguageUtilsType> {
  const { formatTs, formatJs } = await loadPrettier()
  const isTypeScript = language === SANDBOX_LANGUAGES.TYPESCRIPT
  const isJavaScript = !isTypeScript
  const formatScript = isTypeScript ? formatTs : formatJs
  const reactScriptExtension = isJavaScript ? 'jsx' : 'tsx'
  const vanillaScriptExtension = isJavaScript ? 'js' : 'ts'

  return {
    isJavaScript,
    isTypeScript,
    vanillaScriptExtension,
    reactScriptExtension,
    formatScript
  }
}

type SandboxCreateType<SettingsType> = {
  [key in SandboxLabelKeyType]: SandboxCreateFunctionType<SettingsType>
}

export function createSandboxFunctionsWithLabels<SettingsType>(
  createSandboxFunction: Partial<SandboxCreateType<SettingsType>>
): SandboxSelectionType<SettingsType>[] {
  return Object.keys(createSandboxFunction).map((sandboxLabelKey) => {
    const key = <SandboxLabelKeyType>sandboxLabelKey
    const createSandbox = <SandboxCreateFunctionType<SettingsType>>(
      createSandboxFunction[key]
    )
    const label = SANDBOX_LABELS[key]

    return { key, label, createSandbox }
  })
}

type SandboxAddPluginsType = Pick<SandboxSharedCreateType, 'plugins'>

export function addSandboxPlugins(
  pluginNames: SandboxPluginNameType | SandboxPluginNameType[]
): SandboxAddPluginsType {
  const pluginsArray = Array.isArray(pluginNames) ? pluginNames : [pluginNames]

  return {
    plugins: {
      ...pluginsArray.reduce(
        (allPlugins, pluginName) => ({
          ...allPlugins,
          [pluginName]: docsPackageJson.dependencies[pluginName]
        }),
        {}
      )
    }
  }
}

export function sandboxInjectOptions(
  options: EmblaOptionsType
): (match: string) => string {
  return (match: string) => match.replace('{}', JSON.stringify(options))
}
