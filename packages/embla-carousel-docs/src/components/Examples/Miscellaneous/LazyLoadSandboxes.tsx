import React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import CarouselLazyLoad from 'components/CodeSandbox/React/SandboxFilesSrc/LazyLoad/EmblaCarousel'
import { createSandboxVanilla } from 'components/CodeSandbox/Vanilla/createSandboxVanilla'
import { createSandboxReact } from 'components/CodeSandbox/React/createSandboxReact'
import { loadPrettier } from 'utils/loadPrettier'
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

// TODO: Add sandbox form labels function to keep it dry
// TODO: Make sandbox lables like React, Vanilla a constant
// TODO: Remove emblaNode from vanilla example carousels
// TODO: Add fileStructureVanilla.ts and fileStructureReact.ts constants
// TODO: Add React.FC to all components!
// TODO: Make plugins a constant
// TODO: Add try catch to prettier format so page doesn't crash
// TODO: Check if title can be added to each Example carousel instead of MDX

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
