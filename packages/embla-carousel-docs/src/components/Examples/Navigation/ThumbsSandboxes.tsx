import React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import { SANDBOX_VANILLA_FOLDERS } from 'components/CodeSandbox/Vanilla/sandboxVanillaFolders'
import { SANDBOX_REACT_FOLDERS } from 'components/CodeSandbox/React/sandboxReactFolders'
import CarouselThumbs from 'components/CodeSandbox/React/SandboxFilesSrc/Thumbs/EmblaCarousel'
import { createSandboxVanilla } from 'components/CodeSandbox/Vanilla/createSandboxVanilla'
import { createSandboxReact } from 'components/CodeSandbox/React/createSandboxReact'
import { createSandboxFunctionsWithLabels } from 'components/CodeSandbox/createSandboxFunctionsWithLabels'
import { loadPrettier } from 'utils/loadPrettier'
import {
  ID,
  SLIDES,
  OPTIONS,
  STYLES,
} from 'components/Examples/Navigation/Thumbs'
import {
  SelectCodeSandbox,
  PropType as SelectCodeSandboxPropType,
} from 'components/CodeSandbox/SelectCodeSandbox'

const SHARED_CONFIG = {
  slides: SLIDES,
  options: OPTIONS,
  styles: STYLES,
  id: ID,
}

const VANILLA_THUMBS_FILE_NAME = 'thumb-buttons'
const REACT_THUMBS_FILE_NAME = 'EmblaCarouselThumbsButton'

const sandboxVanillaJavaScript = async (): Promise<string> => {
  const { formatJs } = await loadPrettier()
  const [carousel, thumbsButtons] = await Promise.all([
    import(
      '!!raw-loader!components/CodeSandbox/Vanilla/SandboxFilesDist/Thumbs/EmblaCarousel.js'
    ),
    import(
      `!!raw-loader!components/CodeSandbox/Vanilla/SandboxFilesDist/Thumbs/thumb-buttons.js`
    ),
  ])
  return createSandboxVanilla({
    ...SHARED_CONFIG,
    carouselScript: carousel.default,
    carouselHtml: ReactDOMServer.renderToStaticMarkup(
      <CarouselThumbs options={OPTIONS} slides={SLIDES} />,
    ),
    language: 'javascript',
    sandboxOverrides: {
      [`${SANDBOX_VANILLA_FOLDERS.JS}/${VANILLA_THUMBS_FILE_NAME}.js`]: {
        isBinary: false,
        content: formatJs(thumbsButtons.default),
      },
    },
  })
}

const sandboxVanillaTypeScript = async (): Promise<string> => {
  const { formatTs } = await loadPrettier()
  const [carousel, thumbsButtons] = await Promise.all([
    import(
      '!!raw-loader!components/CodeSandbox/Vanilla/SandboxFilesDist/Thumbs/EmblaCarousel.ts'
    ),
    import(
      `!!raw-loader!components/CodeSandbox/Vanilla/SandboxFilesDist/Thumbs/thumb-buttons.ts`
    ),
  ])
  return createSandboxVanilla({
    ...SHARED_CONFIG,
    carouselScript: carousel.default,
    carouselHtml: ReactDOMServer.renderToStaticMarkup(
      <CarouselThumbs options={OPTIONS} slides={SLIDES} />,
    ),
    language: 'typescript',
    sandboxOverrides: {
      [`${SANDBOX_VANILLA_FOLDERS.JS}/${VANILLA_THUMBS_FILE_NAME}.ts`]: {
        isBinary: false,
        content: formatTs(thumbsButtons.default),
      },
    },
  })
}

const sandboxReactJavaScript = async (): Promise<string> => {
  const { formatJs } = await loadPrettier()
  const [carousel, buttons] = await Promise.all([
    import(
      `!!raw-loader!components/CodeSandbox/React/SandboxFilesDist/Thumbs/EmblaCarousel.jsx`
    ),
    import(
      `!!raw-loader!components/CodeSandbox/React/SandboxFilesDist/Thumbs/EmblaCarouselThumbsButton.jsx`
    ),
  ])
  return createSandboxReact({
    ...SHARED_CONFIG,
    carouselScript: carousel.default,
    language: 'javascript',
    sandboxOverrides: {
      [`${SANDBOX_REACT_FOLDERS.JS}/${REACT_THUMBS_FILE_NAME}.jsx`]: {
        isBinary: false,
        content: formatJs(buttons.default),
      },
    },
  })
}

const sandboxReactTypeScript = async (): Promise<string> => {
  const { formatTs } = await loadPrettier()
  const [carousel, buttons] = await Promise.all([
    import(
      `!!raw-loader!components/CodeSandbox/React/SandboxFilesDist/Thumbs/EmblaCarousel.tsx`
    ),
    import(
      `!!raw-loader!components/CodeSandbox/React/SandboxFilesDist/Thumbs/EmblaCarouselThumbsButton.tsx`
    ),
  ])
  return createSandboxReact({
    ...SHARED_CONFIG,
    carouselScript: carousel.default,
    language: 'typescript',
    sandboxOverrides: {
      [`${SANDBOX_REACT_FOLDERS.JS}/${REACT_THUMBS_FILE_NAME}.tsx`]: {
        isBinary: false,
        content: formatTs(buttons.default),
      },
    },
  })
}

const SANDBOXES: SelectCodeSandboxPropType['sandboxes'] =
  createSandboxFunctionsWithLabels({
    vanillaJs: sandboxVanillaJavaScript,
    vanillaTs: sandboxVanillaTypeScript,
    reactJs: sandboxReactJavaScript,
    reactTs: sandboxReactTypeScript,
  })

export const ExampleCarouselThumbsSandboxes = () => {
  return <SelectCodeSandbox sandboxes={SANDBOXES} />
}
