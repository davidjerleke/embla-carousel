import React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import CarouselIosPicker from 'components/CodeSandbox/React/SandboxFilesSrc/IosPicker/EmblaCarousel'
import { createSandboxVanilla } from 'components/CodeSandbox/Vanilla/createSandboxVanilla'
import { createSandboxReact } from 'components/CodeSandbox/React/createSandboxReact'
import { createSandboxReactIosPickerEntry } from 'components/CodeSandbox/React/createSandboxReactEntry'
import { loadPrettier } from 'utils/loadPrettier'
import { ID, STYLES } from 'components/Examples/Miscellaneous/IosPicker'
import {
  CreateCodeSandboxForms,
  PropType as CreateCodeSandboxFormsPropType,
} from 'components/CodeSandbox/CreateCodeSandboxForms'
import {
  createSandboxLabel,
  SANDBOX_LABELS,
} from 'components/CodeSandbox/sandboxLabels'

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
      [`src/js/${VANILLA_IOS_PICKER_FILE_NAME}.js`]: {
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
      [`src/js/${VANILLA_IOS_PICKER_FILE_NAME}.ts`]: {
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
      [`src/js/${REACT_IOS_PICKER_FILE_NAME}.jsx`]: {
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
      [`src/js/${REACT_IOS_PICKER_FILE_NAME}.tsx`]: {
        isBinary: false,
        content: formatTs(item.default),
      },
    },
  })
}

const SANDBOXES_DEFAULT: CreateCodeSandboxFormsPropType['sandboxes'] = [
  createSandboxLabel(SANDBOX_LABELS.VANILLA_JS, () =>
    sandboxVanillaJavaScript(false),
  ),
  createSandboxLabel(SANDBOX_LABELS.VANILLA_TS, () =>
    sandboxVanillaTypeScript(false),
  ),
  createSandboxLabel(SANDBOX_LABELS.REACT_JS, () =>
    sandboxReactJavaScript(false),
  ),
  createSandboxLabel(SANDBOX_LABELS.REACT_TS, () =>
    sandboxReactTypeScript(false),
  ),
]

const SANDBOXES_LOOP: CreateCodeSandboxFormsPropType['sandboxes'] = [
  createSandboxLabel(SANDBOX_LABELS.VANILLA_JS, () =>
    sandboxVanillaJavaScript(true),
  ),
  createSandboxLabel(SANDBOX_LABELS.VANILLA_TS, () =>
    sandboxVanillaTypeScript(true),
  ),
  createSandboxLabel(SANDBOX_LABELS.REACT_JS, () =>
    sandboxReactJavaScript(true),
  ),
  createSandboxLabel(SANDBOX_LABELS.REACT_TS, () =>
    sandboxReactTypeScript(true),
  ),
]

export const ExampleCarouselIosPickerDefaultSandboxes = () => {
  return <CreateCodeSandboxForms sandboxes={SANDBOXES_DEFAULT} />
}

export const ExampleCarouselIosPickerLoopSandboxes = () => {
  return <CreateCodeSandboxForms sandboxes={SANDBOXES_LOOP} />
}
