import React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import CarouselLazyLoad from 'components/CodeSandbox/React/SandboxFilesSrc/CarouselLazyLoad'
import { createSandboxVanilla } from 'components/CodeSandbox/Vanilla/createSandboxVanilla'
import { createSandboxReact } from 'components/CodeSandbox/React/createSandboxReact'
import { loadPrettier } from 'utils/loadPrettier'
import { renameImportPath } from 'components/CodeSandbox/sandboxUtils'
import {
  ID,
  SLIDES,
  OPTIONS,
  STYLES,
} from 'components/Examples/Miscellaneous/LazyLoad'
import {
  CreateCodeSandboxForms,
  PropType as CreateCodeSandboxFormsPropType,
} from 'components/CodeSandbox/CreateCodeSandboxForms'

// TODO: Make slide numbers circles again
// TODO: Add sandbox form labels function to keep it dry
// TODO: Make sandbox lables like React, Vanilla a constant
// TODO: Remove emblaNode from vanilla example carousels
// TODO: Add fileStructureVanilla.ts and fileStructureReact.ts constants
// TODO: Add React.FC to all components!

const SHARED_CONFIG = {
  slides: SLIDES,
  options: OPTIONS,
  styles: STYLES,
  id: ID,
}

const VANILLA_LAZY_LOAD_FILE_NAME = 'lazy-load'
const renameVanillaLazyLoadImport = renameImportPath(
  'carouselLazyLoadImage',
  `./${VANILLA_LAZY_LOAD_FILE_NAME}`,
)

const REACT_LAZY_LOAD_FILE_NAME = 'EmblaCarouselLazyLoadImage'
const renameReactLazyLoadImport = renameImportPath(
  'CarouselLazyLoadImage',
  `./${REACT_LAZY_LOAD_FILE_NAME}`,
)

const sandboxVanillaJavaScript = async (): Promise<string> => {
  const { formatJs } = await loadPrettier()
  const [carousel, lazyLoadImage] = await Promise.all([
    import(
      '!!raw-loader!components/CodeSandbox/Vanilla/SandboxFilesDist/CarouselLazyLoad.js'
    ),
    import(
      `!!raw-loader!components/CodeSandbox/Vanilla/SandboxFilesDist/carouselLazyLoadImage.js`
    ),
  ])
  return createSandboxVanilla({
    ...SHARED_CONFIG,
    carouselScript: renameVanillaLazyLoadImport(carousel.default),
    carouselHtml: ReactDOMServer.renderToStaticMarkup(
      <CarouselLazyLoad options={OPTIONS} slides={SLIDES} />,
    ),
    language: 'javascript',
    sandboxOverrides: {
      [`src/js/${VANILLA_LAZY_LOAD_FILE_NAME}.js`]: {
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
      '!!raw-loader!components/CodeSandbox/Vanilla/SandboxFilesDist/CarouselLazyLoad.ts'
    ),
    import(
      `!!raw-loader!components/CodeSandbox/Vanilla/SandboxFilesDist/carouselLazyLoadImage.ts`
    ),
  ])
  return createSandboxVanilla({
    ...SHARED_CONFIG,
    carouselScript: renameVanillaLazyLoadImport(carousel.default),
    carouselHtml: ReactDOMServer.renderToStaticMarkup(
      <CarouselLazyLoad options={OPTIONS} slides={SLIDES} />,
    ),
    language: 'typescript',
    sandboxOverrides: {
      [`src/js/${VANILLA_LAZY_LOAD_FILE_NAME}.ts`]: {
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
      `!!raw-loader!components/CodeSandbox/React/SandboxFilesDist/CarouselLazyLoad.jsx`
    ),
    import(
      `!!raw-loader!components/CodeSandbox/React/SandboxFilesDist/CarouselLazyLoadImage.jsx`
    ),
  ])
  return createSandboxReact({
    ...SHARED_CONFIG,
    carouselScript: renameReactLazyLoadImport(carousel.default),
    language: 'javascript',
    sandboxOverrides: {
      [`src/js/${REACT_LAZY_LOAD_FILE_NAME}.jsx`]: {
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
      `!!raw-loader!components/CodeSandbox/React/SandboxFilesDist/CarouselLazyLoad.tsx`
    ),
    import(
      `!!raw-loader!components/CodeSandbox/React/SandboxFilesDist/CarouselLazyLoadImage.tsx`
    ),
  ])
  return createSandboxReact({
    ...SHARED_CONFIG,
    carouselScript: renameReactLazyLoadImport(carousel.default),
    language: 'typescript',
    sandboxOverrides: {
      [`src/js/${REACT_LAZY_LOAD_FILE_NAME}.tsx`]: {
        isBinary: false,
        content: formatTs(buttons.default),
      },
    },
  })
}

const SANDBOXES: CreateCodeSandboxFormsPropType['sandboxes'] = [
  {
    label: 'Vanilla',
    createSandbox: sandboxVanillaJavaScript,
  },
  {
    label: 'Vanilla+TS',
    createSandbox: sandboxVanillaTypeScript,
  },
  {
    label: 'React',
    createSandbox: sandboxReactJavaScript,
  },
  {
    label: 'React+TS',
    createSandbox: sandboxReactTypeScript,
  },
]

export const ExampleCarouselLazyLoadSandboxes = () => {
  return <CreateCodeSandboxForms sandboxes={SANDBOXES} />
}
