import { EmblaOptionsType } from 'embla-carousel'
import { SandboxModuleType, SandboxReactExtensionType } from 'consts/sandbox'
import { sandboxInjectOptions } from 'utils/sandbox'
import { SANDBOX_REGEX_OPTIONS } from 'consts/sandbox'

const CAROUSEL_IMPORT_REGEX = /import\sEmblaCarousel\sfrom\s'(.*)'/
const SLIDE_COUNT_REGEX = /const\sSLIDE_COUNT\s=\s\d{1,}/
const CAROUSEL_IMPORT_REPLACE = 'import EmblaCarousel from "./EmblaCarousel"'

export const createSandboxReactDefaultEntry = async (
  reactScriptExtension: SandboxReactExtensionType,
  slides: number[],
  options: EmblaOptionsType
): Promise<string> => {
  const slideCount = slides.length.toString()
  const entry: SandboxModuleType = await import(
    `!!raw-loader!components/Sandbox/React/SandboxFilesDist/CarouselDefaultEntry.${reactScriptExtension}`
  )
  return entry.default
    .replace(CAROUSEL_IMPORT_REGEX, CAROUSEL_IMPORT_REPLACE)
    .replace(SANDBOX_REGEX_OPTIONS, sandboxInjectOptions(options))
    .replace(SLIDE_COUNT_REGEX, (match) => match.replace(/\d{1,}/, slideCount))
}

export const createSandboxReactIosPickerEntry = async (
  reactScriptExtension: SandboxReactExtensionType,
  options: EmblaOptionsType
): Promise<string> => {
  const entry: SandboxModuleType = await import(
    `!!raw-loader!components/Sandbox/React/SandboxFilesDist/CarouselIosPickerEntry.${reactScriptExtension}`
  )
  return entry.default
    .replace(CAROUSEL_IMPORT_REGEX, CAROUSEL_IMPORT_REPLACE)
    .replace(SANDBOX_REGEX_OPTIONS, sandboxInjectOptions(options))
}

export const createSandboxReactEntry = async (
  reactScriptExtension: SandboxReactExtensionType,
  slides: number[],
  options: EmblaOptionsType,
  id: string
): Promise<string> => {
  if (
    id === 'embla-carousel-ios-style-picker' ||
    id === 'embla-carousel-ios-style-picker-loop'
  ) {
    return createSandboxReactIosPickerEntry(reactScriptExtension, options)
  }
  return createSandboxReactDefaultEntry(reactScriptExtension, slides, options)
}
