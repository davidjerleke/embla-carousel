import { EmblaOptionsType } from 'embla-carousel'
import { OptionsType } from 'embla-carousel/components/Options'
import { SPACINGS } from './spacings'
import {
  PackageJson as BasePackageJsonType,
  TsConfigJson as TsConfigType
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

export type SandboxGeneratorSettingsType = OptionsType & {
  id: string
  framework: SandboxLabelKeyType | ''
  slideList: number[]
  accessibility: boolean
  slideSize: string
  slideGapSize: string
  edgeGap: string
  navigationPrevNextButtons: boolean
  navigationDots: boolean
  selectedSnapDisplay: boolean
  autoplay: boolean
  classNames: boolean
  wheelGestures: boolean
  styles?: string
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
  AUTOPLAY: 'embla-carousel-autoplay',
  AUTO_SCROLL: 'embla-carousel-auto-scroll',
  AUTO_HEIGHT: 'embla-carousel-auto-height',
  CLASS_NAMES: 'embla-carousel-class-names'
} as const

export const SANDBOX_GENERATOR_FORM_FIELDS = {
  FRAMEWORK: 'framework',
  LOOP: 'loop',
  DRAG_FREE: 'dragFree',
  AXIS: 'axis',
  DIRECTION: 'direction',
  ACCESSIBILITY: 'accessibility',
  SLIDE_SIZE: 'slideSize',
  SLIDE_GAP_SIZE: 'slideGapSize',
  EDGE_GAP: 'edgeGap',
  ALIGN: 'align',
  CONTAIN_SCROLL: 'containScroll',
  NAVIGATION_PREV_NEXT_BUTTONS: 'navigationPrevNextButtons',
  NAVIGATION_DOTS: 'navigationDots',
  AUTOPLAY: 'autoplay',
  WHEEL_GESTURES: 'wheelGestures'
} as const

export const SANDBOX_GENERATOR_FORM_PREFIX = 'carousel-generator-form'

export const SANDBOX_SELECTION_SPACING = SPACINGS.ONE

export const SANDBOX_REGEX_REPOSITORY_URL =
  /__replace_sandbox_repository_url__/g

export const SANDBOX_REGEX_TITLE = /__replace_sandbox_title__/g

export const SANDBOX_REGEX_THEME = /__replace_sandbox_theme__/g

export const SANDBOX_REGEX_OPTIONS = /const\sOPTIONS(.*)/

export const SANDBOX_REGEX_IOS_PICKER_LOOP = /const\sLOOP\s=\sfalse/
