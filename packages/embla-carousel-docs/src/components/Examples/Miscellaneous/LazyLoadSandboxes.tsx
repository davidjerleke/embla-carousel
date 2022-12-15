import React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import { SANDBOX_VANILLA_FOLDERS } from 'components/CodeSandbox/Vanilla/sandboxVanillaFolders'
import { SANDBOX_REACT_FOLDERS } from 'components/CodeSandbox/React/sandboxReactFolders'
import CarouselLazyLoad from 'components/CodeSandbox/React/SandboxFilesSrc/LazyLoad/EmblaCarousel'
import { createSandboxVanilla } from 'components/CodeSandbox/Vanilla/createSandboxVanilla'
import { createSandboxReact } from 'components/CodeSandbox/React/createSandboxReact'
import { createSandboxFunctionsWithLabels } from 'components/CodeSandbox/createSandboxFunctionsWithLabels'
import { loadPrettier } from 'utils/loadPrettier'
import {
  ID,
  SLIDES,
  OPTIONS,
  STYLES,
} from 'components/Examples/Miscellaneous/LazyLoad'
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

const VANILLA_LAZY_LOAD_FILE_NAME = 'lazy-load'
const REACT_LAZY_LOAD_FILE_NAME = 'EmblaCarouselLazyLoadImage'

const sandboxVanillaJavaScript = async (): Promise<string> => {
  const { formatJs } = await loadPrettier()
  const [carousel, lazyLoadImage] = await Promise.all([
    import(
      '!!raw-loader!components/CodeSandbox/Vanilla/SandboxFilesDist/LazyLoad/EmblaCarousel.js'
    ),
    import(
      `!!raw-loader!components/CodeSandbox/Vanilla/SandboxFilesDist/LazyLoad/lazy-load.js`
    ),
  ])
  return createSandboxVanilla({
    ...SHARED_CONFIG,
    carouselScript: carousel.default,
    carouselHtml: ReactDOMServer.renderToStaticMarkup(
      <CarouselLazyLoad options={OPTIONS} slides={SLIDES} />,
    ),
    language: 'javascript',
    sandboxOverrides: {
      [`${SANDBOX_VANILLA_FOLDERS.JS}/${VANILLA_LAZY_LOAD_FILE_NAME}.js`]: {
        isBinary: false,
        content: formatJs(lazyLoadImage.default),
      },
    },
  })
}

const sandboxVanillaTypeScript = async (): Promise<string> => {
  const { formatTs } = await loadPrettier()
  const [carousel, lazyLoadImage] = await Promise.all([
    import(
      '!!raw-loader!components/CodeSandbox/Vanilla/SandboxFilesDist/LazyLoad/EmblaCarousel.ts'
    ),
    import(
      `!!raw-loader!components/CodeSandbox/Vanilla/SandboxFilesDist/LazyLoad/lazy-load.ts`
    ),
  ])
  return createSandboxVanilla({
    ...SHARED_CONFIG,
    carouselScript: carousel.default,
    carouselHtml: ReactDOMServer.renderToStaticMarkup(
      <CarouselLazyLoad options={OPTIONS} slides={SLIDES} />,
    ),
    language: 'typescript',
    sandboxOverrides: {
      [`${SANDBOX_VANILLA_FOLDERS.JS}/${VANILLA_LAZY_LOAD_FILE_NAME}.ts`]: {
        isBinary: false,
        content: formatTs(lazyLoadImage.default),
      },
    },
  })
}

const sandboxReactJavaScript = async (): Promise<string> => {
  const { formatJs } = await loadPrettier()
  const [carousel, buttons] = await Promise.all([
    import(
      `!!raw-loader!components/CodeSandbox/React/SandboxFilesDist/LazyLoad/EmblaCarousel.jsx`
    ),
    import(
      `!!raw-loader!components/CodeSandbox/React/SandboxFilesDist/LazyLoad/EmblaCarouselLazyLoadImage.jsx`
    ),
  ])
  return createSandboxReact({
    ...SHARED_CONFIG,
    carouselScript: carousel.default,
    language: 'javascript',
    sandboxOverrides: {
      [`${SANDBOX_REACT_FOLDERS.JS}/${REACT_LAZY_LOAD_FILE_NAME}.jsx`]: {
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
      `!!raw-loader!components/CodeSandbox/React/SandboxFilesDist/LazyLoad/EmblaCarousel.tsx`
    ),
    import(
      `!!raw-loader!components/CodeSandbox/React/SandboxFilesDist/LazyLoad/EmblaCarouselLazyLoadImage.tsx`
    ),
  ])
  return createSandboxReact({
    ...SHARED_CONFIG,
    carouselScript: carousel.default,
    language: 'typescript',
    sandboxOverrides: {
      [`${SANDBOX_REACT_FOLDERS.JS}/${REACT_LAZY_LOAD_FILE_NAME}.tsx`]: {
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

export const ExampleCarouselLazyLoadSandboxes = () => {
  return <SelectCodeSandbox sandboxes={SANDBOXES} />
}
