import {
  SandboxGeneratorSettingsType,
  SandboxModuleScriptType
} from 'consts/sandbox'
import {
  sandboxStaticExtractReactModules,
  sandboxStaticExtractVanillaModules
} from './sandboxStaticExtractModules'
import { sandboxStaticExtractPlugins } from './sandboxStaticExtractPlugins'
import { sandboxGeneratorCreateStyles } from 'components/Sandbox/sandboxGeneratorCreateStyles'
import { sandboxGeneratorToggleFeatures } from 'components/Sandbox/sandboxGeneratorToggleFeatures'
import { sandboxGeneratorCreateOptions } from 'components/Sandbox/sandboxGeneratorCreateOptions'
import { CONTEXT_DEFAULT_VALUE } from 'components/CarouselGenerator/CarouselGeneratorContext'
import { createSandboxReact } from 'components/Sandbox/React/createSandboxReact'
import { createSandboxVanilla } from 'components/Sandbox/Vanilla/createSandboxVanilla'
import { createSandboxVanillaSlidesHtml } from 'components/Sandbox/Vanilla/createSandboxVanillaSlidesHtml'
import { SANDBOX_REACT_FOLDERS } from 'components/Sandbox/React/sandboxReactFolders'
import { SANDBOX_VANILLA_FOLDERS } from 'components/Sandbox/Vanilla/sandboxVanillaFolders'
import {
  SandboxLanguageType,
  SandboxModuleType,
  SandboxSelectionType,
  SANDBOX_LANGUAGES
} from 'consts/sandbox'
import {
  createSandboxFunctionsWithLabels,
  sandboxLanguageUtils
} from 'utils/sandbox'

const DEFAULT_SETTINGS = CONTEXT_DEFAULT_VALUE.formData

const sandboxVanilla = async (
  settings: SandboxGeneratorSettingsType = DEFAULT_SETTINGS,
  language: SandboxLanguageType,
  path: string = 'Generator'
): Promise<string> => {
  const { vanillaScriptExtension, formatScript } = await sandboxLanguageUtils(
    language
  )
  const carouselHtml = await import(
    `!!raw-loader!components/Sandbox/Vanilla/SandboxFilesDist/${path}/embla-carousel.html`
  )
  const slideHTML = await import(
    `!!raw-loader!components/Sandbox/Vanilla/SandboxFilesDist/${path}/slide.html`
  )
  const carouselScript = await import(
    `!!raw-loader!components/Sandbox/Vanilla/SandboxFilesDist/${path}/EmblaCarousel.${vanillaScriptExtension}`
  )
  const carouselScriptWithFeatures = sandboxGeneratorToggleFeatures(
    carouselScript,
    settings
  )
  const moduleScripts: SandboxModuleScriptType[] =
    await sandboxStaticExtractVanillaModules(
      language,
      carouselScriptWithFeatures,
      path
    )
  const options = sandboxGeneratorCreateOptions(settings)

  return createSandboxVanilla({
    id: settings.id,
    language,
    options,
    styles: sandboxGeneratorCreateStyles({ ...settings, ...options }),
    carouselScript: carouselScriptWithFeatures,
    plugins: sandboxStaticExtractPlugins(carouselScriptWithFeatures),
    carouselHtml: createSandboxVanillaSlidesHtml(
      settings,
      slideHTML,
      sandboxGeneratorToggleFeatures(carouselHtml, settings)
    ),
    sandboxOverrides: {
      ...moduleScripts.reduce((allModules, moduleScript) => {
        const moduleScriptWithFeatures = sandboxGeneratorToggleFeatures(
          moduleScript.script,
          settings
        )

        return {
          ...allModules,
          [`${SANDBOX_VANILLA_FOLDERS.JS}/${moduleScript.name}.${vanillaScriptExtension}`]:
            {
              isBinary: false,
              content: formatScript(moduleScriptWithFeatures)
            }
        }
      }, {})
    }
  })
}

const sandboxReact = async (
  settings: SandboxGeneratorSettingsType = DEFAULT_SETTINGS,
  language: SandboxLanguageType,
  path: string = 'Generator'
): Promise<string> => {
  const { reactScriptExtension, formatScript } = await sandboxLanguageUtils(
    language
  )
  const carouselScript: SandboxModuleType = await import(
    `!!raw-loader!components/Sandbox/React/SandboxFilesDist/${path}/EmblaCarousel.${reactScriptExtension}`
  )
  const carouselScriptWithFeatures = sandboxGeneratorToggleFeatures(
    carouselScript,
    settings
  )
  const moduleScripts: SandboxModuleScriptType[] =
    await sandboxStaticExtractReactModules(
      language,
      carouselScriptWithFeatures,
      path
    )
  const options = sandboxGeneratorCreateOptions(settings)

  return createSandboxReact({
    id: settings.id,
    language,
    slides: settings.slideList,
    options,
    styles: sandboxGeneratorCreateStyles({ ...settings, ...options }),
    carouselScript: carouselScriptWithFeatures,
    plugins: sandboxStaticExtractPlugins(carouselScriptWithFeatures),
    sandboxOverrides: {
      ...moduleScripts.reduce((allModules, moduleScript) => {
        const moduleScriptWithFeatures = sandboxGeneratorToggleFeatures(
          moduleScript.script,
          settings
        )

        return {
          ...allModules,
          [`${SANDBOX_REACT_FOLDERS.JS}/${moduleScript.name}.${reactScriptExtension}`]:
            {
              isBinary: false,
              content: formatScript(moduleScriptWithFeatures)
            }
        }
      }, {})
    }
  })
}

export const dynamicGeneratorSandboxes: SandboxSelectionType<SandboxGeneratorSettingsType>[] =
  createSandboxFunctionsWithLabels({
    VANILLA_JS: (settings?: SandboxGeneratorSettingsType) =>
      sandboxVanilla(settings, SANDBOX_LANGUAGES.JAVASCRIPT),
    VANILLA_TS: (settings?: SandboxGeneratorSettingsType) =>
      sandboxVanilla(settings, SANDBOX_LANGUAGES.TYPESCRIPT),
    REACT_JS: (settings?: SandboxGeneratorSettingsType) =>
      sandboxReact(settings, SANDBOX_LANGUAGES.JAVASCRIPT),
    REACT_TS: (settings?: SandboxGeneratorSettingsType) =>
      sandboxReact(settings, SANDBOX_LANGUAGES.TYPESCRIPT)
  })
