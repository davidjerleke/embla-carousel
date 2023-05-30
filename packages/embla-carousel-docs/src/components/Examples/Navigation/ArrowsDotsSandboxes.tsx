import React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import { SANDBOX_VANILLA_FOLDERS } from 'components/Sandbox/Vanilla/sandboxVanillaFolders'
import { SANDBOX_REACT_FOLDERS } from 'components/Sandbox/React/sandboxReactFolders'
import CarouselArrowsDots from 'components/Sandbox/React/SandboxFilesSrc/ArrowsDots/EmblaCarousel'
import { createSandboxVanilla } from 'components/Sandbox/Vanilla/createSandboxVanilla'
import { createSandboxReact } from 'components/Sandbox/React/createSandboxReact'
import { SandboxSelection } from 'components/Sandbox/SandboxSelection'
import {
  ID,
  SLIDES,
  OPTIONS,
  STYLES
} from 'components/Examples/Navigation/ArrowsDots'
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

const VANILLA_BUTTONS_FILE_NAME = 'arrows-dots-buttons'
const REACT_BUTTONS_FILE_NAME = 'EmblaCarouselArrowsDotsButtons'

const sandboxVanilla = async (
  language: SandboxLanguageType
): Promise<string> => {
  const { isTypeScript, vanillaScriptExtension, formatScript } =
    await sandboxLanguageUtils(language)
  let carouselScript: SandboxModuleType
  let buttonsScript: SandboxModuleType

  if (isTypeScript) {
    carouselScript = await import(
      '!!raw-loader!components/Sandbox/Vanilla/SandboxFilesDist/ArrowsDots/EmblaCarousel.ts'
    )
    buttonsScript = await import(
      `!!raw-loader!components/Sandbox/Vanilla/SandboxFilesDist/ArrowsDots/arrows-dots-buttons.ts`
    )
  } else {
    carouselScript = await import(
      '!!raw-loader!components/Sandbox/Vanilla/SandboxFilesDist/ArrowsDots/EmblaCarousel.js'
    )
    buttonsScript = await import(
      `!!raw-loader!components/Sandbox/Vanilla/SandboxFilesDist/ArrowsDots/arrows-dots-buttons.js`
    )
  }

  return createSandboxVanilla({
    ...SHARED_CONFIG,
    language,
    carouselScript: carouselScript.default,
    carouselHtml: ReactDOMServer.renderToStaticMarkup(
      <CarouselArrowsDots options={OPTIONS} slides={SLIDES} />
    ),
    sandboxOverrides: {
      [`${SANDBOX_VANILLA_FOLDERS.JS}/${VANILLA_BUTTONS_FILE_NAME}.${vanillaScriptExtension}`]:
        {
          isBinary: false,
          content: formatScript(buttonsScript.default)
        }
    }
  })
}

const sandboxReact = async (language: SandboxLanguageType): Promise<string> => {
  const { isTypeScript, reactScriptExtension, formatScript } =
    await sandboxLanguageUtils(language)
  let carouselScript: SandboxModuleType
  let buttonsScript: SandboxModuleType

  if (isTypeScript) {
    carouselScript = await import(
      `!!raw-loader!components/Sandbox/React/SandboxFilesDist/ArrowsDots/EmblaCarousel.tsx`
    )
    buttonsScript = await import(
      `!!raw-loader!components/Sandbox/React/SandboxFilesDist/ArrowsDots/EmblaCarouselArrowsDotsButtons.tsx`
    )
  } else {
    carouselScript = await import(
      `!!raw-loader!components/Sandbox/React/SandboxFilesDist/ArrowsDots/EmblaCarousel.jsx`
    )
    buttonsScript = await import(
      `!!raw-loader!components/Sandbox/React/SandboxFilesDist/ArrowsDots/EmblaCarouselArrowsDotsButtons.jsx`
    )
  }

  return createSandboxReact({
    ...SHARED_CONFIG,
    language,
    carouselScript: carouselScript.default,
    sandboxOverrides: {
      [`${SANDBOX_REACT_FOLDERS.JS}/${REACT_BUTTONS_FILE_NAME}.${reactScriptExtension}`]:
        {
          isBinary: false,
          content: formatScript(buttonsScript.default)
        }
    }
  })
}

const SANDBOXES: SandboxSelectionType[] = createSandboxFunctionsWithLabels({
  VANILLA_JS: () => sandboxVanilla(SANDBOX_LANGUAGES.JAVASCRIPT),
  VANILLA_TS: () => sandboxVanilla(SANDBOX_LANGUAGES.TYPESCRIPT),
  REACT_JS: () => sandboxReact(SANDBOX_LANGUAGES.JAVASCRIPT),
  REACT_TS: () => sandboxReact(SANDBOX_LANGUAGES.TYPESCRIPT)
})

export const ExampleCarouselArrowsDotsSandboxes = () => {
  return <SandboxSelection sandboxes={SANDBOXES} />
}
