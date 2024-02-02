import React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import { SANDBOX_VANILLA_FOLDERS } from 'components/Sandbox/Vanilla/sandboxVanillaFolders'
import { SANDBOX_REACT_FOLDERS } from './React/sandboxReactFolders'
import { createSandboxVanilla } from 'components/Sandbox/Vanilla/createSandboxVanilla'
import { createSandboxReact } from 'components/Sandbox/React/createSandboxReact'
import { sandboxStaticExtractPlugins } from './sandboxStaticExtractPlugins'
import {
  sandboxStaticExtractVanillaModules,
  sandboxStaticExtractReactModules
} from './sandboxStaticExtractModules'
import {
  SandboxLanguageType,
  SandboxModuleType,
  SandboxSelectionType,
  SANDBOX_LANGUAGES,
  SandboxStaticSettingsType,
  SandboxModuleScriptType
} from 'consts/sandbox'
import {
  createSandboxFunctionsWithLabels,
  sandboxLanguageUtils
} from 'utils/sandbox'

const sandboxVanilla = async (
  settings: SandboxStaticSettingsType,
  path: string,
  language: SandboxLanguageType
): Promise<string> => {
  const { vanillaScriptExtension, formatScript } = await sandboxLanguageUtils(
    language
  )
  const carouselComponent: {
    default: React.FC<{
      options: SandboxStaticSettingsType['options']
      slides: SandboxStaticSettingsType['slides']
    }>
  } = await import(
    `components/Sandbox/React/SandboxFilesSrc/${path}/EmblaCarousel`
  )
  const carouselScript: SandboxModuleType = await import(
    `!!raw-loader!components/Sandbox/Vanilla/SandboxFilesDist/${path}/EmblaCarousel.${vanillaScriptExtension}`
  )
  const moduleScripts: SandboxModuleScriptType[] =
    await sandboxStaticExtractVanillaModules(
      language,
      carouselScript.default,
      path
    )

  return createSandboxVanilla({
    ...settings,
    language,
    plugins: sandboxStaticExtractPlugins(carouselScript.default),
    carouselScript: carouselScript.default.replace(
      /from\s'..\/EmblaCarousel/g,
      "from './EmblaCarousel"
    ),
    carouselHtml: ReactDOMServer.renderToStaticMarkup(
      <carouselComponent.default
        options={settings.options}
        slides={settings.slides}
      />
    ),
    sandboxOverrides: {
      ...moduleScripts.reduce((allScripts, moduleScript) => {
        return {
          ...allScripts,
          [`${SANDBOX_VANILLA_FOLDERS.JS}/${moduleScript.name}.${vanillaScriptExtension}`]:
            {
              isBinary: false,
              content: formatScript(moduleScript.script.default)
            }
        }
      }, {})
    }
  })
}

const sandboxReact = async (
  settings: SandboxStaticSettingsType,
  path: string,
  language: SandboxLanguageType
): Promise<string> => {
  const { reactScriptExtension, formatScript } = await sandboxLanguageUtils(
    language
  )
  const carouselScript: SandboxModuleType = await import(
    `!!raw-loader!components/Sandbox/React/SandboxFilesDist/${path}/EmblaCarousel.${reactScriptExtension}`
  )
  const moduleScripts: SandboxModuleScriptType[] =
    await sandboxStaticExtractReactModules(
      language,
      carouselScript.default,
      path
    )

  return createSandboxReact({
    ...settings,
    slides: settings.slides,
    language,
    plugins: sandboxStaticExtractPlugins(carouselScript.default),
    carouselScript: carouselScript.default.replace(
      /from\s'..\/EmblaCarousel/g,
      "from './EmblaCarousel"
    ),
    sandboxOverrides: {
      ...moduleScripts.reduce((allScripts, moduleScript) => {
        return {
          ...allScripts,
          [`${SANDBOX_REACT_FOLDERS.JS}/${moduleScript.name}.${reactScriptExtension}`]:
            {
              isBinary: false,
              content: formatScript(moduleScript.script.default)
            }
        }
      }, {})
    }
  })
}

export const sandboxStaticSandboxes = (
  settings: SandboxStaticSettingsType,
  path: string
): SandboxSelectionType[] =>
  createSandboxFunctionsWithLabels({
    VANILLA_JS: () =>
      sandboxVanilla(settings, path, SANDBOX_LANGUAGES.JAVASCRIPT),
    VANILLA_TS: () =>
      sandboxVanilla(settings, path, SANDBOX_LANGUAGES.TYPESCRIPT),
    REACT_JS: () => sandboxReact(settings, path, SANDBOX_LANGUAGES.JAVASCRIPT),
    REACT_TS: () => sandboxReact(settings, path, SANDBOX_LANGUAGES.TYPESCRIPT)
  })
