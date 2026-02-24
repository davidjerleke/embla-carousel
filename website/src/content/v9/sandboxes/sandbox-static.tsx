import React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import { SANDBOX_VANILLA_FOLDERS } from '@/content/v9/sandboxes/Vanilla/sandbox-vanilla-folders'
import { SANDBOX_REACT_FOLDERS } from '@/content/v9/sandboxes/React/sandbox-react-folders'
import { createSandboxVanilla } from '@/content/v9/sandboxes/Vanilla/create-sandbox-vanilla'
import { createSandboxReact } from '@/content/v9/sandboxes/React/create-sandbox-react'
import { sandboxStaticExtractPlugins } from '@/content/v9/sandboxes/sandbox-static-extract-plugins'
import {
  sandboxStaticExtractVanillaModules,
  sandboxStaticExtractReactModules
} from '@/content/v9/sandboxes/sandbox-static-extract-modules'
import {
  SandboxLanguageType,
  SandboxModuleType,
  SandboxSelectionType,
  SANDBOX_LANGUAGES,
  SandboxStaticSettingsType,
  SandboxModuleScriptType,
  createSandboxFunctionsWithLabels,
  sandboxLanguageUtils
} from '@/content/v9/sandboxes/sandbox-utils'

async function sandboxVanilla(
  settings: SandboxStaticSettingsType,
  path: string,
  language: SandboxLanguageType
): Promise<string> {
  const { vanillaScriptExtension, formatScript } = await sandboxLanguageUtils(
    language
  )
  const carouselComponent: {
    default: React.FC<{
      options: SandboxStaticSettingsType['options']
      slides: SandboxStaticSettingsType['slides']
    }>
  } = await import(
    `@/content/v9/sandboxes/React/SandboxFilesSrc/${path}/EmblaCarousel`
  )
  const carouselScript: SandboxModuleType = await import(
    `@/content/v9/sandboxes/Vanilla/SandboxFilesDist/${path}/EmblaCarousel.${vanillaScriptExtension}`
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
      /from\s'..(.*)\/EmblaCarousel/g,
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

async function sandboxReact(
  settings: SandboxStaticSettingsType,
  path: string,
  language: SandboxLanguageType
): Promise<string> {
  const { reactScriptExtension, formatScript } = await sandboxLanguageUtils(
    language
  )
  const carouselScript: SandboxModuleType = await import(
    `@/content/v9/sandboxes/React/SandboxFilesDist/${path}/EmblaCarousel.${reactScriptExtension}`
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
      /from\s'..(.*)\/EmblaCarousel/g,
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

export function sandboxStaticSandboxes(
  settings: SandboxStaticSettingsType,
  path: string
): SandboxSelectionType[] {
  return createSandboxFunctionsWithLabels({
    VANILLA_JS: () =>
      sandboxVanilla(settings, path, SANDBOX_LANGUAGES.JAVASCRIPT),
    VANILLA_TS: () =>
      sandboxVanilla(settings, path, SANDBOX_LANGUAGES.TYPESCRIPT),
    REACT_JS: () => sandboxReact(settings, path, SANDBOX_LANGUAGES.JAVASCRIPT),
    REACT_TS: () => sandboxReact(settings, path, SANDBOX_LANGUAGES.TYPESCRIPT)
  })
}
