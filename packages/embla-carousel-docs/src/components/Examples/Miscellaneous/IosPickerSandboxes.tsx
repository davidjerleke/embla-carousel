import React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import { SANDBOX_VANILLA_FOLDERS } from 'components/Sandbox/Vanilla/sandboxVanillaFolders'
import { SANDBOX_REACT_FOLDERS } from 'components/Sandbox/React/sandboxReactFolders'
import CarouselIosPicker from 'components/Sandbox/React/SandboxFilesSrc/IosPicker/EmblaCarousel'
import { createSandboxVanilla } from 'components/Sandbox/Vanilla/createSandboxVanilla'
import { createSandboxReact } from 'components/Sandbox/React/createSandboxReact'
import { SandboxSelection } from 'components/Sandbox/SandboxSelection'
import { createSandboxReactIosPickerEntry } from 'components/Sandbox/React/createSandboxReactEntry'
import { ID, STYLES } from 'components/Examples/Miscellaneous/IosPicker'
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
  slides: [],
  styles: STYLES,
  id: ID
}

const VANILLA_IOS_PICKER_FILE_NAME = 'ios-picker'
const REACT_IOS_PICKER_FILE_NAME = 'EmblaCarouselIosPickerItem'

const sandboxVanilla = async (
  language: SandboxLanguageType,
  loop: boolean
): Promise<string> => {
  const { isTypeScript, vanillaScriptExtension, formatScript } =
    await sandboxLanguageUtils(language)
  let carouselScript: SandboxModuleType
  let iosPickerScript: SandboxModuleType

  if (isTypeScript) {
    carouselScript = await import(
      '!!raw-loader!components/Sandbox/Vanilla/SandboxFilesDist/IosPicker/EmblaCarousel.ts'
    )
    iosPickerScript = await import(
      `!!raw-loader!components/Sandbox/Vanilla/SandboxFilesDist/IosPicker/ios-picker.ts`
    )
  } else {
    carouselScript = await import(
      '!!raw-loader!components/Sandbox/Vanilla/SandboxFilesDist/IosPicker/EmblaCarousel.js'
    )
    iosPickerScript = await import(
      `!!raw-loader!components/Sandbox/Vanilla/SandboxFilesDist/IosPicker/ios-picker.js`
    )
  }

  return createSandboxVanilla({
    ...SHARED_CONFIG,
    language,
    options: { loop },
    carouselScript: carouselScript.default,
    carouselHtml: ReactDOMServer.renderToStaticMarkup(<CarouselIosPicker />),
    sandboxOverrides: {
      [`${SANDBOX_VANILLA_FOLDERS.JS}/${VANILLA_IOS_PICKER_FILE_NAME}.${vanillaScriptExtension}`]:
        {
          isBinary: false,
          content: formatScript(iosPickerScript.default)
        }
    }
  })
}

const sandboxReact = async (
  language: SandboxLanguageType,
  loop: boolean
): Promise<string> => {
  const { isTypeScript, reactScriptExtension, formatScript } =
    await sandboxLanguageUtils(language)
  const indexScript = await createSandboxReactIosPickerEntry(isTypeScript, loop)
  let carouselScript: SandboxModuleType
  let itemScript: SandboxModuleType

  if (isTypeScript) {
    carouselScript = await import(
      `!!raw-loader!components/Sandbox/React/SandboxFilesDist/IosPicker/EmblaCarousel.tsx`
    )
    itemScript = await import(
      `!!raw-loader!components/Sandbox/React/SandboxFilesDist/IosPicker/EmblaCarouselIosPickerItem.tsx`
    )
  } else {
    carouselScript = await import(
      `!!raw-loader!components/Sandbox/React/SandboxFilesDist/IosPicker/EmblaCarousel.jsx`
    )
    itemScript = await import(
      `!!raw-loader!components/Sandbox/React/SandboxFilesDist/IosPicker/EmblaCarouselIosPickerItem.jsx`
    )
  }

  return createSandboxReact({
    ...SHARED_CONFIG,
    language,
    indexScript: indexScript,
    options: { loop },
    carouselScript: carouselScript.default,
    sandboxOverrides: {
      [`${SANDBOX_REACT_FOLDERS.JS}/${REACT_IOS_PICKER_FILE_NAME}.${reactScriptExtension}`]:
        {
          isBinary: false,
          content: formatScript(itemScript.default)
        }
    }
  })
}

const SANDBOXES_DEFAULT: SandboxSelectionType[] =
  createSandboxFunctionsWithLabels({
    VANILLA_JS: () => sandboxVanilla(SANDBOX_LANGUAGES.JAVASCRIPT, false),
    VANILLA_TS: () => sandboxVanilla(SANDBOX_LANGUAGES.TYPESCRIPT, false),
    REACT_JS: () => sandboxReact(SANDBOX_LANGUAGES.JAVASCRIPT, false),
    REACT_TS: () => sandboxReact(SANDBOX_LANGUAGES.TYPESCRIPT, false)
  })

const SANDBOXES_LOOP: SandboxSelectionType[] = createSandboxFunctionsWithLabels(
  {
    VANILLA_JS: () => sandboxVanilla(SANDBOX_LANGUAGES.JAVASCRIPT, true),
    VANILLA_TS: () => sandboxVanilla(SANDBOX_LANGUAGES.TYPESCRIPT, true),
    REACT_JS: () => sandboxReact(SANDBOX_LANGUAGES.JAVASCRIPT, true),
    REACT_TS: () => sandboxReact(SANDBOX_LANGUAGES.TYPESCRIPT, true)
  }
)

export const ExampleCarouselIosPickerDefaultSandboxes = () => {
  return <SandboxSelection sandboxes={SANDBOXES_DEFAULT} />
}

export const ExampleCarouselIosPickerLoopSandboxes = () => {
  return <SandboxSelection sandboxes={SANDBOXES_LOOP} />
}
