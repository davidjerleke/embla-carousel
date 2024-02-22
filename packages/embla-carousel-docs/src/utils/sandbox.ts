import docsPackageJson from 'embla-carousel-docs/package.json'
import { EmblaOptionsType } from 'embla-carousel'
import { loadPrettier } from './loadPrettier'
import { camelOrPascalToKebabCase } from './stringCasing'
import {
  SandboxCreateFunctionType,
  SandboxLabelKeyType,
  SandboxSelectionType,
  SANDBOX_LABELS,
  SandboxLanguageType,
  SandboxReactExtensionType,
  SandboxVanillaExtensionType,
  SANDBOX_LANGUAGES,
  SandboxSharedCreateType,
  SandboxPluginNameType,
  SandboxGeneratorSettingsType,
  SANDBOX_GENERATOR_FORM_PREFIX
} from 'consts/sandbox'

type SandboxLanguageUtilsType = {
  isJavaScript: boolean
  isTypeScript: boolean
  vanillaScriptExtension: SandboxVanillaExtensionType
  reactScriptExtension: SandboxReactExtensionType
  formatScript: (jsOrTs: string) => string
}

export const sandboxLanguageUtils = async (
  language: SandboxLanguageType
): Promise<SandboxLanguageUtilsType> => {
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

export const createSandboxFunctionsWithLabels = <SettingsType>(
  createSandboxFunction: Partial<SandboxCreateType<SettingsType>>
): SandboxSelectionType<SettingsType>[] => {
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

export const addSandboxPlugins = (
  pluginNames: SandboxPluginNameType | SandboxPluginNameType[]
): SandboxAddPluginsType => {
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

export const sandboxInjectOptions = (
  options: EmblaOptionsType
): ((match: string) => string) => {
  return (match: string) => match.replace('{}', JSON.stringify(options))
}

export const sandboxInjectIosPickerLoop = (
  loop: boolean = false
): ((match: string) => string) => {
  return (match) => match.replace('false', loop.toString())
}

type SandboxGeneratorInputIdType<
  Key extends keyof SandboxGeneratorSettingsType
> = {
  ID: string
  FIELD_NAME: Key
}

export type SandboxGeneratorRadioType<
  Key extends keyof SandboxGeneratorSettingsType
> = SandboxGeneratorInputIdType<Key> & {
  OPTIONS: {
    LABEL: string
    VALUE: SandboxGeneratorSettingsType[Key]
  }[]
}

export type SandboxGeneratorCheckboxType<
  Key extends keyof SandboxGeneratorSettingsType
> = SandboxGeneratorInputIdType<Key> & {
  LABEL: string
}

export type SandboxGeneratorInputTextType<
  Key extends keyof SandboxGeneratorSettingsType
> = SandboxGeneratorInputIdType<Key> & {
  LABEL: string
}

export const createSandboxGeneratorInputId = <
  Key extends keyof SandboxGeneratorSettingsType
>(
  fieldName: Key
): SandboxGeneratorInputIdType<Key> => {
  return {
    FIELD_NAME: fieldName,
    ID: `${SANDBOX_GENERATOR_FORM_PREFIX}-${camelOrPascalToKebabCase(
      fieldName
    )}`
  }
}
