import React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import CarouselArrowsDots from 'components/CodeSandbox/React/SandboxFilesSrc/CarouselArrowsDots'
import { createSandboxVanilla } from 'components/CodeSandbox/Vanilla/createSandboxVanilla'
import { createSandboxReact } from 'components/CodeSandbox/React/createSandboxReact'
import { loadPrettier } from 'utils/loadPrettier'
import { renameImportPath } from 'components/CodeSandbox/sandboxUtils'
import {
  ID,
  SLIDES,
  OPTIONS,
  STYLES,
} from 'components/Examples/Navigation/ArrowsDots'
import {
  CreateCodeSandboxForms,
  PropType as CreateCodeSandboxFormsPropType,
} from 'components/CodeSandbox/CreateCodeSandboxForms'

const SHARED_CONFIG = {
  slides: SLIDES,
  options: OPTIONS,
  styles: STYLES,
  id: ID,
}

const VANILLA_BUTTONS_FILE_NAME = 'arrows-dots-buttons'
const renameVanillaButtonsImport = renameImportPath(
  'carouselArrowsDotsButtons',
  `./${VANILLA_BUTTONS_FILE_NAME}`,
)

const REACT_BUTTONS_FILE_NAME = 'EmblaCarouselButtons'
const renameReactButtonsImport = renameImportPath(
  'CarouselArrowsDotsButtons',
  `./${REACT_BUTTONS_FILE_NAME}`,
)

const sandboxVanillaJavaScript = async (): Promise<string> => {
  const { formatJs } = await loadPrettier()
  const [carousel, tween] = await Promise.all([
    import(
      '!!raw-loader!components/CodeSandbox/Vanilla/SandboxFilesDist/CarouselArrowsDots.js'
    ),
    import(
      `!!raw-loader!components/CodeSandbox/Vanilla/SandboxFilesDist/carouselArrowsDotsButtons.js`
    ),
  ])
  return createSandboxVanilla({
    ...SHARED_CONFIG,
    carouselScript: renameVanillaButtonsImport(carousel.default),
    carouselHtml: ReactDOMServer.renderToStaticMarkup(
      <CarouselArrowsDots options={OPTIONS} slides={SLIDES} />,
    ),
    language: 'javascript',
    sandboxOverrides: {
      [`src/js/${VANILLA_BUTTONS_FILE_NAME}.js`]: {
        isBinary: false,
        content: formatJs(tween.default),
      },
    },
  })
}

const sandboxVanillaTypeScript = async (): Promise<string> => {
  const { formatTs } = await loadPrettier()
  const [carousel, tween] = await Promise.all([
    import(
      '!!raw-loader!components/CodeSandbox/Vanilla/SandboxFilesDist/CarouselArrowsDots.ts'
    ),
    import(
      `!!raw-loader!components/CodeSandbox/Vanilla/SandboxFilesDist/carouselArrowsDotsButtons.ts`
    ),
  ])
  return createSandboxVanilla({
    ...SHARED_CONFIG,
    carouselScript: renameVanillaButtonsImport(carousel.default),
    carouselHtml: ReactDOMServer.renderToStaticMarkup(
      <CarouselArrowsDots options={OPTIONS} slides={SLIDES} />,
    ),
    language: 'typescript',
    sandboxOverrides: {
      [`src/js/${VANILLA_BUTTONS_FILE_NAME}.ts`]: {
        isBinary: false,
        content: formatTs(tween.default),
      },
    },
  })
}

const sandboxReactJavaScript = async (): Promise<string> => {
  const { formatJs } = await loadPrettier()
  const [carousel, buttons] = await Promise.all([
    import(
      `!!raw-loader!components/CodeSandbox/React/SandboxFilesDist/CarouselArrowsDots.jsx`
    ),
    import(
      `!!raw-loader!components/CodeSandbox/React/SandboxFilesDist/CarouselArrowsDotsButtons.jsx`
    ),
  ])
  return createSandboxReact({
    ...SHARED_CONFIG,
    carouselScript: renameReactButtonsImport(carousel.default),
    language: 'javascript',
    sandboxOverrides: {
      [`src/js/${REACT_BUTTONS_FILE_NAME}.jsx`]: {
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
      `!!raw-loader!components/CodeSandbox/React/SandboxFilesDist/CarouselArrowsDots.tsx`
    ),
    import(
      `!!raw-loader!components/CodeSandbox/React/SandboxFilesDist/CarouselArrowsDotsButtons.tsx`
    ),
  ])
  return createSandboxReact({
    ...SHARED_CONFIG,
    carouselScript: renameReactButtonsImport(carousel.default),
    language: 'typescript',
    sandboxOverrides: {
      [`src/js/${REACT_BUTTONS_FILE_NAME}.tsx`]: {
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

export const ExampleCarouselArrowsDotsSandboxes = () => {
  return <CreateCodeSandboxForms sandboxes={SANDBOXES} />
}
