import React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import CarouselScale from 'components/CodeSandbox/React/SandboxFilesSrc/CarouselScale'
import { createSandboxVanilla } from 'components/CodeSandbox/Vanilla/createSandboxVanilla'
import { createSandboxReact } from 'components/CodeSandbox/React/createSandboxReact'
import { loadPrettier } from 'utils/loadPrettier'
import { renameImportPath } from 'components/CodeSandbox/sandboxUtils'
import { ID, SLIDES, OPTIONS, STYLES } from 'components/Examples/Tween/Scale'
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

const VANILLA_TWEEN_SCALE_FILE_NAME = 'tween-scale'
const renameVanillaScaleTweenImport = renameImportPath(
  'carouselScaleTween',
  `./${VANILLA_TWEEN_SCALE_FILE_NAME}`,
)

const sandboxVanillaJavaScript = async (): Promise<string> => {
  const { formatJs } = await loadPrettier()
  const [carousel, tween] = await Promise.all([
    import(
      '!!raw-loader!components/CodeSandbox/Vanilla/SandboxFilesDist/CarouselScale.js'
    ),
    import(
      `!!raw-loader!components/CodeSandbox/Vanilla/SandboxFilesDist/carouselScaleTween.js`
    ),
  ])
  return createSandboxVanilla({
    ...SHARED_CONFIG,
    carouselScript: renameVanillaScaleTweenImport(carousel.default),
    carouselHtml: ReactDOMServer.renderToStaticMarkup(
      <CarouselScale options={OPTIONS} slides={SLIDES} />,
    ),
    language: 'javascript',
    sandboxOverrides: {
      [`src/js/${VANILLA_TWEEN_SCALE_FILE_NAME}.js`]: {
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
      '!!raw-loader!components/CodeSandbox/Vanilla/SandboxFilesDist/CarouselScale.ts'
    ),
    import(
      `!!raw-loader!components/CodeSandbox/Vanilla/SandboxFilesDist/carouselScaleTween.ts`
    ),
  ])
  return createSandboxVanilla({
    ...SHARED_CONFIG,
    carouselScript: renameVanillaScaleTweenImport(carousel.default),
    carouselHtml: ReactDOMServer.renderToStaticMarkup(
      <CarouselScale options={OPTIONS} slides={SLIDES} />,
    ),
    language: 'typescript',
    sandboxOverrides: {
      [`src/js/${VANILLA_TWEEN_SCALE_FILE_NAME}.ts`]: {
        isBinary: false,
        content: formatTs(tween.default),
      },
    },
  })
}

const sandboxReactJavaScript = async (): Promise<string> => {
  const carousel = await import(
    `!!raw-loader!components/CodeSandbox/React/SandboxFilesDist/CarouselScale.jsx`
  )
  return createSandboxReact({
    ...SHARED_CONFIG,
    carouselScript: carousel.default,
    language: 'javascript',
  })
}

const sandboxReactTypeScript = async (): Promise<string> => {
  const carousel = await import(
    `!!raw-loader!components/CodeSandbox/React/SandboxFilesDist/CarouselScale.tsx`
  )
  return createSandboxReact({
    ...SHARED_CONFIG,
    carouselScript: carousel.default,
    language: 'typescript',
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

export const ExampleCarouselScaleSandboxes = () => {
  return <CreateCodeSandboxForms sandboxes={SANDBOXES} />
}
