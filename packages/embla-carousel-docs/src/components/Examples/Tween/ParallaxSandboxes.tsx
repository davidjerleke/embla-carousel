import React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import { SANDBOX_VANILLA_FOLDERS } from 'components/Sandbox/Vanilla/sandboxVanillaFolders'
import CarouselParallax from 'components/Sandbox/React/SandboxFilesSrc/Parallax/EmblaCarousel'
import { createSandboxVanilla } from 'components/Sandbox/Vanilla/createSandboxVanilla'
import { createSandboxReact } from 'components/Sandbox/React/createSandboxReact'
import { SandboxSelection } from 'components/Sandbox/SandboxSelection'
import { ID, SLIDES, OPTIONS, STYLES } from 'components/Examples/Tween/Parallax'
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

const VANILLA_TWEEN_FILE_NAME = 'tween-parallax'

const sandboxVanilla = async (
  language: SandboxLanguageType
): Promise<string> => {
  const { isTypeScript, vanillaScriptExtension, formatScript } =
    await sandboxLanguageUtils(language)
  let carouselScript: SandboxModuleType
  let tweenScript: SandboxModuleType

  if (isTypeScript) {
    carouselScript = await import(
      '!!raw-loader!components/Sandbox/Vanilla/SandboxFilesDist/Parallax/EmblaCarousel.ts'
    )
    tweenScript = await import(
      `!!raw-loader!components/Sandbox/Vanilla/SandboxFilesDist/Parallax/tween-parallax.ts`
    )
  } else {
    carouselScript = await import(
      '!!raw-loader!components/Sandbox/Vanilla/SandboxFilesDist/Parallax/EmblaCarousel.js'
    )
    tweenScript = await import(
      `!!raw-loader!components/Sandbox/Vanilla/SandboxFilesDist/Parallax/tween-parallax.js`
    )
  }

  return createSandboxVanilla({
    ...SHARED_CONFIG,
    language,
    carouselScript: carouselScript.default,
    carouselHtml: ReactDOMServer.renderToStaticMarkup(
      <CarouselParallax options={OPTIONS} slides={SLIDES} />
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
      `!!raw-loader!components/Sandbox/React/SandboxFilesDist/Parallax/EmblaCarousel.tsx`
    )
  } else {
    carouselScript = await import(
      `!!raw-loader!components/Sandbox/React/SandboxFilesDist/Parallax/EmblaCarousel.jsx`
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

export const ExampleCarouselParallaxSandboxes = () => {
  return <SandboxSelection sandboxes={SANDBOXES} />
}
