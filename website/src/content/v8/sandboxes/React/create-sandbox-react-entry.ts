import { EmblaOptionsType } from '@vendor/embla-carousel-v8/embla-carousel'
import {
  sandboxInjectOptions,
  SANDBOX_REGEX_OPTIONS,
  SandboxModuleType,
  SandboxReactExtensionType
} from '@/content/v8/sandboxes/sandbox-utils'

const CAROUSEL_IMPORT_REGEX = /import\sEmblaCarousel\sfrom\s'(.*)'/
const SLIDE_COUNT_REGEX = /const\sSLIDE_COUNT\s=\s\d{1,}/
const CAROUSEL_IMPORT_REPLACE = 'import EmblaCarousel from "./EmblaCarousel"'

export async function createSandboxReactDefaultEntry(
  reactScriptExtension: SandboxReactExtensionType,
  slides: number[],
  options: EmblaOptionsType
): Promise<string> {
  const slideCount = slides.length.toString()
  const entry: SandboxModuleType = await import(
    `@/content/v8/sandboxes/React/SandboxFilesDist/CarouselDefaultEntry.${reactScriptExtension}`
  )
  return entry.default
    .replace(CAROUSEL_IMPORT_REGEX, CAROUSEL_IMPORT_REPLACE)
    .replace(SANDBOX_REGEX_OPTIONS, sandboxInjectOptions(options))
    .replace(SLIDE_COUNT_REGEX, (match) => match.replace(/\d{1,}/, slideCount))
}

export async function createSandboxReactIosPickerEntry(
  reactScriptExtension: SandboxReactExtensionType,
  options: EmblaOptionsType
): Promise<string> {
  const entry: SandboxModuleType = await import(
    `@/content/v8/sandboxes/React/SandboxFilesDist/CarouselIosPickerEntry.${reactScriptExtension}`
  )
  return entry.default
    .replace(CAROUSEL_IMPORT_REGEX, CAROUSEL_IMPORT_REPLACE)
    .replace(SANDBOX_REGEX_OPTIONS, sandboxInjectOptions(options))
}

export async function createSandboxReactEntry(
  reactScriptExtension: SandboxReactExtensionType,
  slides: number[],
  options: EmblaOptionsType,
  id: string
): Promise<string> {
  if (
    id === 'embla-carousel-ios-style-picker' ||
    id === 'embla-carousel-ios-style-picker-loop'
  ) {
    return createSandboxReactIosPickerEntry(reactScriptExtension, options)
  }
  return createSandboxReactDefaultEntry(reactScriptExtension, slides, options)
}
