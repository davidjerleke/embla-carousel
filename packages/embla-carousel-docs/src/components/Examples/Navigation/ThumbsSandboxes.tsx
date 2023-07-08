import React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import { SANDBOX_VANILLA_FOLDERS } from 'components/Sandbox/Vanilla/sandboxVanillaFolders'
import { SANDBOX_REACT_FOLDERS } from 'components/Sandbox/React/sandboxReactFolders'
import CarouselThumbs from 'components/Sandbox/React/SandboxFilesSrc/Thumbs/EmblaCarousel'
import { createSandboxVanilla } from 'components/Sandbox/Vanilla/createSandboxVanilla'
import { createSandboxReact } from 'components/Sandbox/React/createSandboxReact'
import { SandboxSelection } from 'components/Sandbox/SandboxSelection'
import {
  ID,
  SLIDES,
  OPTIONS,
  STYLES
} from 'components/Examples/Navigation/Thumbs'
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

const VANILLA_THUMBS_FILE_NAME = 'thumb-buttons'
const REACT_THUMBS_FILE_NAME = 'EmblaCarouselThumbsButton'

const sandboxVanilla = async (
  language: SandboxLanguageType
): Promise<string> => {
  const { isTypeScript, vanillaScriptExtension, formatScript } =
    await sandboxLanguageUtils(language)
  let carouselScript: SandboxModuleType
  let buttonsScript: SandboxModuleType

  if (isTypeScript) {
    carouselScript = await import(
      '!!raw-loader!components/Sandbox/Vanilla/SandboxFilesDist/Thumbs/EmblaCarousel.ts'
    )
    buttonsScript = await import(
      `!!raw-loader!components/Sandbox/Vanilla/SandboxFilesDist/Thumbs/thumb-buttons.ts`
    )
  } else {
    carouselScript = await import(
      '!!raw-loader!components/Sandbox/Vanilla/SandboxFilesDist/Thumbs/EmblaCarousel.js'
    )
    buttonsScript = await import(
      `!!raw-loader!components/Sandbox/Vanilla/SandboxFilesDist/Thumbs/thumb-buttons.js`
    )
  }

  return createSandboxVanilla({
    ...SHARED_CONFIG,
    language,
    carouselScript: carouselScript.default,
    carouselHtml: ReactDOMServer.renderToStaticMarkup(
      <CarouselThumbs options={OPTIONS} slides={SLIDES} />
    ),
    sandboxOverrides: {
      [`${SANDBOX_VANILLA_FOLDERS.JS}/${VANILLA_THUMBS_FILE_NAME}.${vanillaScriptExtension}`]:
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
      `!!raw-loader!components/Sandbox/React/SandboxFilesDist/Thumbs/EmblaCarousel.tsx`
    )
    buttonsScript = await import(
      `!!raw-loader!components/Sandbox/React/SandboxFilesDist/Thumbs/EmblaCarouselThumbsButton.tsx`
    )
  } else {
    carouselScript = await import(
      `!!raw-loader!components/Sandbox/React/SandboxFilesDist/Thumbs/EmblaCarousel.jsx`
    )
    buttonsScript = await import(
      `!!raw-loader!components/Sandbox/React/SandboxFilesDist/Thumbs/EmblaCarouselThumbsButton.jsx`
    )
  }

  return createSandboxReact({
    ...SHARED_CONFIG,
    language,
    carouselScript: carouselScript.default,
    sandboxOverrides: {
      [`${SANDBOX_REACT_FOLDERS.JS}/${REACT_THUMBS_FILE_NAME}.${reactScriptExtension}`]:
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

export const ExampleCarouselThumbsSandboxes = () => {
  return <SandboxSelection sandboxes={SANDBOXES} />
}
