import React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import { SANDBOX_VANILLA_FOLDERS } from 'components/CodeSandbox/Vanilla/sandboxVanillaFolders'
import { SANDBOX_REACT_FOLDERS } from 'components/CodeSandbox/React/sandboxReactFolders'
import CarouselIosPicker from 'components/CodeSandbox/React/SandboxFilesSrc/IosPicker/EmblaCarousel'
import { createSandboxVanilla } from 'components/CodeSandbox/Vanilla/createSandboxVanilla'
import { createSandboxReact } from 'components/CodeSandbox/React/createSandboxReact'
import { createSandboxFunctionsWithLabels } from 'components/CodeSandbox/createSandboxFunctionsWithLabels'
import { createSandboxReactIosPickerEntry } from 'components/CodeSandbox/React/createSandboxReactEntry'
import { loadPrettier } from 'utils/loadPrettier'
import { ID, STYLES } from 'components/Examples/Miscellaneous/IosPicker'
import {
  SelectCodeSandbox,
  PropType as SelectCodeSandboxPropType,
} from 'components/CodeSandbox/SelectCodeSandbox'

const SHARED_CONFIG = {
  slides: [],
  styles: STYLES,
  id: ID,
}

const VANILLA_IOS_PICKER_FILE_NAME = 'ios-picker'
const REACT_IOS_PICKER_FILE_NAME = 'EmblaCarouselIosPickerItem'

const sandboxVanillaJavaScript = async (loop: boolean): Promise<string> => {
  const { formatJs } = await loadPrettier()
  const [carousel, infiniteScroll] = await Promise.all([
    import(
      '!!raw-loader!components/CodeSandbox/Vanilla/SandboxFilesDist/IosPicker/EmblaCarousel.js'
    ),
    import(
      `!!raw-loader!components/CodeSandbox/Vanilla/SandboxFilesDist/IosPicker/ios-picker.js`
    ),
  ])

  return createSandboxVanilla({
    ...SHARED_CONFIG,
    options: { loop },
    carouselScript: carousel.default,
    carouselHtml: ReactDOMServer.renderToStaticMarkup(<CarouselIosPicker />),
    language: 'javascript',
    sandboxOverrides: {
      [`${SANDBOX_VANILLA_FOLDERS.JS}/${VANILLA_IOS_PICKER_FILE_NAME}.js`]: {
        isBinary: false,
        content: formatJs(infiniteScroll.default),
      },
    },
  })
}

const sandboxVanillaTypeScript = async (loop: boolean): Promise<string> => {
  const { formatTs } = await loadPrettier()
  const [carousel, infiniteScroll] = await Promise.all([
    import(
      '!!raw-loader!components/CodeSandbox/Vanilla/SandboxFilesDist/IosPicker/EmblaCarousel.ts'
    ),
    import(
      `!!raw-loader!components/CodeSandbox/Vanilla/SandboxFilesDist/IosPicker/ios-picker.ts`
    ),
  ])
  return createSandboxVanilla({
    ...SHARED_CONFIG,
    options: { loop },
    carouselScript: carousel.default,
    carouselHtml: ReactDOMServer.renderToStaticMarkup(<CarouselIosPicker />),
    language: 'typescript',
    sandboxOverrides: {
      [`${SANDBOX_VANILLA_FOLDERS.JS}/${VANILLA_IOS_PICKER_FILE_NAME}.ts`]: {
        isBinary: false,
        content: formatTs(infiniteScroll.default),
      },
    },
  })
}

const sandboxReactJavaScript = async (loop: boolean): Promise<string> => {
  const { formatJs } = await loadPrettier()
  const [entry, carousel, item] = await Promise.all([
    createSandboxReactIosPickerEntry('javascript', loop),
    import(
      `!!raw-loader!components/CodeSandbox/React/SandboxFilesDist/IosPicker/EmblaCarousel.jsx`
    ),
    import(
      `!!raw-loader!components/CodeSandbox/React/SandboxFilesDist/IosPicker/EmblaCarouselIosPickerItem.jsx`
    ),
  ])

  return createSandboxReact({
    ...SHARED_CONFIG,
    indexScript: entry,
    options: { loop },
    carouselScript: carousel.default,
    language: 'javascript',
    sandboxOverrides: {
      [`${SANDBOX_REACT_FOLDERS.JS}/${REACT_IOS_PICKER_FILE_NAME}.jsx`]: {
        isBinary: false,
        content: formatJs(item.default),
      },
    },
  })
}

const sandboxReactTypeScript = async (loop: boolean): Promise<string> => {
  const { formatTs } = await loadPrettier()
  const [entry, carousel, item] = await Promise.all([
    createSandboxReactIosPickerEntry('typescript', loop),
    import(
      `!!raw-loader!components/CodeSandbox/React/SandboxFilesDist/IosPicker/EmblaCarousel.tsx`
    ),
    import(
      `!!raw-loader!components/CodeSandbox/React/SandboxFilesDist/IosPicker/EmblaCarouselIosPickerItem.tsx`
    ),
  ])

  return createSandboxReact({
    ...SHARED_CONFIG,
    indexScript: entry,
    options: { loop },
    carouselScript: carousel.default,
    language: 'typescript',
    sandboxOverrides: {
      [`${SANDBOX_REACT_FOLDERS.JS}/${REACT_IOS_PICKER_FILE_NAME}.tsx`]: {
        isBinary: false,
        content: formatTs(item.default),
      },
    },
  })
}

const SANDBOXES_DEFAULT: SelectCodeSandboxPropType['sandboxes'] =
  createSandboxFunctionsWithLabels({
    vanillaJs: () => sandboxVanillaJavaScript(false),
    vanillaTs: () => sandboxVanillaTypeScript(false),
    reactJs: () => sandboxReactJavaScript(false),
    reactTs: () => sandboxReactTypeScript(false),
  })

const SANDBOXES_LOOP: SelectCodeSandboxPropType['sandboxes'] =
  createSandboxFunctionsWithLabels({
    vanillaJs: () => sandboxVanillaJavaScript(true),
    vanillaTs: () => sandboxVanillaTypeScript(true),
    reactJs: () => sandboxReactJavaScript(true),
    reactTs: () => sandboxReactTypeScript(true),
  })

export const ExampleCarouselIosPickerDefaultSandboxes = () => {
  return <SelectCodeSandbox sandboxes={SANDBOXES_DEFAULT} />
}

export const ExampleCarouselIosPickerLoopSandboxes = () => {
  return <SelectCodeSandbox sandboxes={SANDBOXES_LOOP} />
}
