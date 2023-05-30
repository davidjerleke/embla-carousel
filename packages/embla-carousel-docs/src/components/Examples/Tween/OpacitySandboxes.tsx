import React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import { SANDBOX_VANILLA_FOLDERS } from 'components/Sandbox/Vanilla/sandboxVanillaFolders'
import CarouselOpacity from 'components/Sandbox/React/SandboxFilesSrc/Opacity/EmblaCarousel'
import { createSandboxVanilla } from 'components/Sandbox/Vanilla/createSandboxVanilla'
import { createSandboxReact } from 'components/Sandbox/React/createSandboxReact'
import { SandboxSelection } from 'components/Sandbox/SandboxSelection'
import { ID, SLIDES, OPTIONS, STYLES } from 'components/Examples/Tween/Opacity'
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

const SHARED_CONFIG = {
  slides: SLIDES,
  options: OPTIONS,
  styles: STYLES,
  id: ID
}

const VANILLA_TWEEN_FILE_NAME = 'tween-opacity'

const sandboxVanilla = async (
  language: SandboxLanguageType
): Promise<string> => {
  const { isTypeScript, vanillaScriptExtension, formatScript } =
    await sandboxLanguageUtils(language)
  let carouselScript: SandboxModuleType
  let tweenScript: SandboxModuleType

  if (isTypeScript) {
    carouselScript = await import(
      '!!raw-loader!components/Sandbox/Vanilla/SandboxFilesDist/Opacity/EmblaCarousel.ts'
    )
    tweenScript = await import(
      `!!raw-loader!components/Sandbox/Vanilla/SandboxFilesDist/Opacity/tween-opacity.ts`
    )
  } else {
    carouselScript = await import(
      '!!raw-loader!components/Sandbox/Vanilla/SandboxFilesDist/Opacity/EmblaCarousel.js'
    )
    tweenScript = await import(
      `!!raw-loader!components/Sandbox/Vanilla/SandboxFilesDist/Opacity/tween-opacity.js`
    )
  }

  return createSandboxVanilla({
    ...SHARED_CONFIG,
    language,
    carouselScript: carouselScript.default,
    carouselHtml: ReactDOMServer.renderToStaticMarkup(
      <CarouselOpacity options={OPTIONS} slides={SLIDES} />
    ),
    sandboxOverrides: {
      [`${SANDBOX_VANILLA_FOLDERS.JS}/${VANILLA_TWEEN_FILE_NAME}.${vanillaScriptExtension}`]:
        {
          isBinary: false,
          content: formatScript(tweenScript.default)
        }
    }
  })
}

const sandboxReact = async (language: SandboxLanguageType): Promise<string> => {
  const { isTypeScript } = await sandboxLanguageUtils(language)
  let carouselScript: SandboxModuleType

  if (isTypeScript) {
    carouselScript = await import(
      `!!raw-loader!components/Sandbox/React/SandboxFilesDist/Opacity/EmblaCarousel.tsx`
    )
  } else {
    carouselScript = await import(
      `!!raw-loader!components/Sandbox/React/SandboxFilesDist/Opacity/EmblaCarousel.jsx`
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

export const ExampleCarouselOpacitySandboxes = () => {
  return <SandboxSelection sandboxes={SANDBOXES} />
}
