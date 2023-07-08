import React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import { SANDBOX_VANILLA_FOLDERS } from 'components/Sandbox/Vanilla/sandboxVanillaFolders'
import { SANDBOX_REACT_FOLDERS } from 'components/Sandbox/React/sandboxReactFolders'
import CarouselLazyLoad from 'components/Sandbox/React/SandboxFilesSrc/LazyLoad/EmblaCarousel'
import { createSandboxVanilla } from 'components/Sandbox/Vanilla/createSandboxVanilla'
import { createSandboxReact } from 'components/Sandbox/React/createSandboxReact'
import { SandboxSelection } from 'components/Sandbox/SandboxSelection'
import {
  ID,
  SLIDES,
  OPTIONS,
  STYLES
} from 'components/Examples/Miscellaneous/LazyLoad'
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

const VANILLA_LAZY_LOAD_FILE_NAME = 'lazy-load'
const REACT_LAZY_LOAD_FILE_NAME = 'EmblaCarouselLazyLoadImage'

const sandboxVanilla = async (
  language: SandboxLanguageType
): Promise<string> => {
  const { isTypeScript, vanillaScriptExtension, formatScript } =
    await sandboxLanguageUtils(language)
  let carouselScript: SandboxModuleType
  let lazyLoadScript: SandboxModuleType

  if (isTypeScript) {
    carouselScript = await import(
      '!!raw-loader!components/Sandbox/Vanilla/SandboxFilesDist/LazyLoad/EmblaCarousel.ts'
    )
    lazyLoadScript = await import(
      `!!raw-loader!components/Sandbox/Vanilla/SandboxFilesDist/LazyLoad/lazy-load.ts`
    )
  } else {
    carouselScript = await import(
      '!!raw-loader!components/Sandbox/Vanilla/SandboxFilesDist/LazyLoad/EmblaCarousel.js'
    )
    lazyLoadScript = await import(
      `!!raw-loader!components/Sandbox/Vanilla/SandboxFilesDist/LazyLoad/lazy-load.js`
    )
  }

  return createSandboxVanilla({
    ...SHARED_CONFIG,
    language,
    carouselScript: carouselScript.default,
    carouselHtml: ReactDOMServer.renderToStaticMarkup(
      <CarouselLazyLoad options={OPTIONS} slides={SLIDES} />
    ),
    sandboxOverrides: {
      [`${SANDBOX_VANILLA_FOLDERS.JS}/${VANILLA_LAZY_LOAD_FILE_NAME}.${vanillaScriptExtension}`]:
        {
          isBinary: false,
          content: formatScript(lazyLoadScript.default)
        }
    }
  })
}

const sandboxReact = async (language: SandboxLanguageType): Promise<string> => {
  const { isTypeScript, reactScriptExtension, formatScript } =
    await sandboxLanguageUtils(language)
  let carouselScript: SandboxModuleType
  let lazyLoadScript: SandboxModuleType

  if (isTypeScript) {
    carouselScript = await import(
      `!!raw-loader!components/Sandbox/React/SandboxFilesDist/LazyLoad/EmblaCarousel.tsx`
    )
    lazyLoadScript = await import(
      `!!raw-loader!components/Sandbox/React/SandboxFilesDist/LazyLoad/EmblaCarouselLazyLoadImage.tsx`
    )
  } else {
    carouselScript = await import(
      `!!raw-loader!components/Sandbox/React/SandboxFilesDist/LazyLoad/EmblaCarousel.jsx`
    )
    lazyLoadScript = await import(
      `!!raw-loader!components/Sandbox/React/SandboxFilesDist/LazyLoad/EmblaCarouselLazyLoadImage.jsx`
    )
  }

  return createSandboxReact({
    ...SHARED_CONFIG,
    language,
    carouselScript: carouselScript.default,
    sandboxOverrides: {
      [`${SANDBOX_REACT_FOLDERS.JS}/${REACT_LAZY_LOAD_FILE_NAME}.${reactScriptExtension}`]:
        {
          isBinary: false,
          content: formatScript(lazyLoadScript.default)
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
export const ExampleCarouselLazyLoadSandboxes = () => {
  return <SandboxSelection sandboxes={SANDBOXES} />
}
