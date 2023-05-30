import React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import CarouselClassNames from 'components/Sandbox/React/SandboxFilesSrc/ClassNames/EmblaCarousel'
import { createSandboxVanilla } from 'components/Sandbox/Vanilla/createSandboxVanilla'
import { createSandboxReact } from 'components/Sandbox/React/createSandboxReact'
import { SandboxSelection } from 'components/Sandbox/SandboxSelection'
import {
  ID,
  SLIDES,
  OPTIONS,
  STYLES
} from 'components/Examples/Plugins/ClassNames'
import {
  SandboxLanguageType,
  SandboxModuleType,
  SandboxSelectionType,
  SANDBOX_LANGUAGES,
  SANDBOX_PLUGINS
} from 'consts/sandbox'
import {
  addSandboxPlugins,
  createSandboxFunctionsWithLabels,
  sandboxLanguageUtils
} from 'utils/sandbox'

const SHARED_CONFIG = {
  slides: SLIDES,
  options: OPTIONS,
  styles: STYLES,
  id: ID,
  ...addSandboxPlugins(SANDBOX_PLUGINS.CLASS_NAMES)
}

const sandboxVanilla = async (
  language: SandboxLanguageType
): Promise<string> => {
  const { isTypeScript } = await sandboxLanguageUtils(language)
  let carouselScript: SandboxModuleType

  if (isTypeScript) {
    carouselScript = await import(
      '!!raw-loader!components/Sandbox/Vanilla/SandboxFilesDist/ClassNames/EmblaCarousel.ts'
    )
  } else {
    carouselScript = await import(
      '!!raw-loader!components/Sandbox/Vanilla/SandboxFilesDist/ClassNames/EmblaCarousel.js'
    )
  }

  return createSandboxVanilla({
    ...SHARED_CONFIG,
    language,
    carouselScript: carouselScript.default,
    carouselHtml: ReactDOMServer.renderToStaticMarkup(
      <CarouselClassNames options={OPTIONS} slides={SLIDES} />
    )
  })
}

const sandboxReact = async (language: SandboxLanguageType): Promise<string> => {
  const { isTypeScript } = await sandboxLanguageUtils(language)
  let carouselScript: SandboxModuleType

  if (isTypeScript) {
    carouselScript = await import(
      `!!raw-loader!components/Sandbox/React/SandboxFilesDist/ClassNames/EmblaCarousel.tsx`
    )
  } else {
    carouselScript = await import(
      `!!raw-loader!components/Sandbox/React/SandboxFilesDist/ClassNames/EmblaCarousel.jsx`
    )
  }

  return createSandboxReact({
    ...SHARED_CONFIG,
    language,
    carouselScript: carouselScript.default
  })
}

const SANDBOXES: SandboxSelectionType[] = createSandboxFunctionsWithLabels({
  VANILLA_JS: () => sandboxVanilla(SANDBOX_LANGUAGES.JAVASCRIPT),
  VANILLA_TS: () => sandboxVanilla(SANDBOX_LANGUAGES.TYPESCRIPT),
  REACT_JS: () => sandboxReact(SANDBOX_LANGUAGES.JAVASCRIPT),
  REACT_TS: () => sandboxReact(SANDBOX_LANGUAGES.TYPESCRIPT)
})

export const ExampleCarouselClassNamesSandboxes = () => {
  return <SandboxSelection sandboxes={SANDBOXES} />
}
