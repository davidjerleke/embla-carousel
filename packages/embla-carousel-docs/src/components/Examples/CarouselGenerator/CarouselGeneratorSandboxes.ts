import { CarouselGeneratorFormDataType } from 'consts/carouselGenerator'
import { carouselGeneratorToggleFeatures } from 'components/CarouselGenerator/carouselGeneratorToggleFeatures'
import { createCarouselGeneratorStyles } from 'components/CarouselGenerator/createCarouselGeneratorStyles'
import { createCarouselGeneratorOptions } from 'components/CarouselGenerator/createCarouselGeneratorOptions'
import { createCarouselGeneratorPlugins } from 'components/CarouselGenerator/createCarouselGeneratorPlugins'
import { CONTEXT_DEFAULT_VALUE } from 'components/CarouselGenerator/CarouselGeneratorContext'
import { createSandboxReact } from 'components/Sandbox/React/createSandboxReact'
import { createSandboxVanilla } from 'components/Sandbox/Vanilla/createSandboxVanilla'
import { arrayFromNumber } from 'utils/arrayFromNumber'
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

const ID = 'embla-carousel-generator'
const DEFAULT_SETTINGS = CONTEXT_DEFAULT_VALUE.formData
const SLIDES = arrayFromNumber(5)

const VANILLA_ARROW_BUTTONS_FILE_NAME = 'arrow-buttons'
const VANILLA_DOT_BUTTON_FILE_NAME = 'dot-buttons'

const REACT_ARROW_BUTTONS_FILE_NAME = 'EmblaCarouselArrowButtons'
const REACT_DOT_BUTTON_FILE_NAME = 'EmblaCarouselDotButton'

const sandboxVanilla = async (
  settings: CarouselGeneratorFormDataType = DEFAULT_SETTINGS,
  language: SandboxLanguageType
): Promise<string> => {
  const { isTypeScript, vanillaScriptExtension, formatScript } =
    await sandboxLanguageUtils(language)
  let carouselScript: SandboxModuleType
  let arrowButtonsScript: SandboxModuleType
  let dotButtonScript: SandboxModuleType

  const carouselHtml = await import(
    '!!raw-loader!components/Sandbox/Vanilla/SandboxFilesDist/CarouselGenerator/embla-carousel.html'
  )

  if (isTypeScript) {
    carouselScript = await import(
      '!!raw-loader!components/Sandbox/Vanilla/SandboxFilesDist/CarouselGenerator/EmblaCarousel.ts'
    )
    arrowButtonsScript = await import(
      `!!raw-loader!components/Sandbox/Vanilla/SandboxFilesDist/CarouselGenerator/arrow-buttons.ts`
    )
    dotButtonScript = await import(
      `!!raw-loader!components/Sandbox/Vanilla/SandboxFilesDist/CarouselGenerator/dot-buttons.ts`
    )
  } else {
    carouselScript = await import(
      '!!raw-loader!components/Sandbox/Vanilla/SandboxFilesDist/CarouselGenerator/EmblaCarousel.js'
    )
    arrowButtonsScript = await import(
      `!!raw-loader!components/Sandbox/Vanilla/SandboxFilesDist/CarouselGenerator/arrow-buttons.js`
    )
    dotButtonScript = await import(
      `!!raw-loader!components/Sandbox/Vanilla/SandboxFilesDist/CarouselGenerator/dot-buttons.js`
    )
  }

  return createSandboxVanilla({
    id: ID,
    language,
    options: createCarouselGeneratorOptions(settings),
    styles: createCarouselGeneratorStyles(settings),
    carouselScript: carouselGeneratorToggleFeatures(carouselScript, settings),
    plugins: createCarouselGeneratorPlugins(settings),
    carouselHtml: carouselGeneratorToggleFeatures(carouselHtml, settings),
    sandboxOverrides: {
      ...(settings.navigationPrevNextButtons && {
        [`${SANDBOX_VANILLA_FOLDERS.JS}/${VANILLA_ARROW_BUTTONS_FILE_NAME}.${vanillaScriptExtension}`]:
          {
            isBinary: false,
            content: formatScript(
              carouselGeneratorToggleFeatures(arrowButtonsScript, settings)
            )
          }
      }),
      ...(settings.navigationDots && {
        [`${SANDBOX_VANILLA_FOLDERS.JS}/${VANILLA_DOT_BUTTON_FILE_NAME}.${vanillaScriptExtension}`]:
          {
            isBinary: false,
            content: formatScript(
              carouselGeneratorToggleFeatures(dotButtonScript, settings)
            )
          }
      })
    }
  })
}

const sandboxReact = async (
  settings: CarouselGeneratorFormDataType = DEFAULT_SETTINGS,
  language: SandboxLanguageType
): Promise<string> => {
  const { isTypeScript, reactScriptExtension, formatScript } =
    await sandboxLanguageUtils(language)
  let carouselScript: SandboxModuleType
  let arrowButtonsScript: SandboxModuleType
  let dotButtonScript: SandboxModuleType

  if (isTypeScript) {
    carouselScript = await import(
      `!!raw-loader!components/Sandbox/React/SandboxFilesDist/CarouselGenerator/EmblaCarousel.tsx`
    )
    arrowButtonsScript = await import(
      `!!raw-loader!components/Sandbox/React/SandboxFilesDist/CarouselGenerator/EmblaCarouselArrowButtons.tsx`
    )
    dotButtonScript = await import(
      `!!raw-loader!components/Sandbox/React/SandboxFilesDist/CarouselGenerator/EmblaCarouselDotButton.tsx`
    )
  } else {
    carouselScript = await import(
      `!!raw-loader!components/Sandbox/React/SandboxFilesDist/CarouselGenerator/EmblaCarousel.jsx`
    )
    arrowButtonsScript = await import(
      `!!raw-loader!components/Sandbox/React/SandboxFilesDist/CarouselGenerator/EmblaCarouselArrowButtons.jsx`
    )
    dotButtonScript = await import(
      `!!raw-loader!components/Sandbox/React/SandboxFilesDist/CarouselGenerator/EmblaCarouselDotButton.jsx`
    )
  }

  return createSandboxReact({
    id: ID,
    language,
    slides: SLIDES,
    options: createCarouselGeneratorOptions(settings),
    styles: createCarouselGeneratorStyles(settings),
    carouselScript: carouselGeneratorToggleFeatures(carouselScript, settings),
    plugins: createCarouselGeneratorPlugins(settings),
    sandboxOverrides: {
      ...(settings.navigationPrevNextButtons && {
        [`${SANDBOX_REACT_FOLDERS.JS}/${REACT_ARROW_BUTTONS_FILE_NAME}.${reactScriptExtension}`]:
          {
            isBinary: false,
            content: formatScript(
              carouselGeneratorToggleFeatures(arrowButtonsScript, settings)
            )
          }
      }),
      ...(settings.navigationDots && {
        [`${SANDBOX_REACT_FOLDERS.JS}/${REACT_DOT_BUTTON_FILE_NAME}.${reactScriptExtension}`]:
          {
            isBinary: false,
            content: formatScript(
              carouselGeneratorToggleFeatures(dotButtonScript, settings)
            )
          }
      })
    }
  })
}

export const SANDBOXES: SandboxSelectionType<CarouselGeneratorFormDataType>[] =
  createSandboxFunctionsWithLabels({
    VANILLA_JS: (settings?: CarouselGeneratorFormDataType) =>
      sandboxVanilla(settings, SANDBOX_LANGUAGES.JAVASCRIPT),
    VANILLA_TS: (settings?: CarouselGeneratorFormDataType) =>
      sandboxVanilla(settings, SANDBOX_LANGUAGES.TYPESCRIPT),
    REACT_JS: (settings?: CarouselGeneratorFormDataType) =>
      sandboxReact(settings, SANDBOX_LANGUAGES.JAVASCRIPT),
    REACT_TS: (settings?: CarouselGeneratorFormDataType) =>
      sandboxReact(settings, SANDBOX_LANGUAGES.TYPESCRIPT)
  })
