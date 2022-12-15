import React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import { SANDBOX_VANILLA_FOLDERS } from 'components/CodeSandbox/Vanilla/sandboxVanillaFolders'
import CarouselOpacity from 'components/CodeSandbox/React/SandboxFilesSrc/Opacity/EmblaCarousel'
import { createSandboxVanilla } from 'components/CodeSandbox/Vanilla/createSandboxVanilla'
import { createSandboxReact } from 'components/CodeSandbox/React/createSandboxReact'
import { createSandboxFunctionsWithLabels } from 'components/CodeSandbox/createSandboxFunctionsWithLabels'
import { loadPrettier } from 'utils/loadPrettier'
import { ID, SLIDES, OPTIONS, STYLES } from 'components/Examples/Tween/Opacity'
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

const VANILLA_TWEEN_FILE_NAME = 'tween-opacity'

const sandboxVanillaJavaScript = async (): Promise<string> => {
  const { formatJs } = await loadPrettier()
  const [carousel, tween] = await Promise.all([
    import(
      '!!raw-loader!components/CodeSandbox/Vanilla/SandboxFilesDist/Opacity/EmblaCarousel.js'
    ),
    import(
      `!!raw-loader!components/CodeSandbox/Vanilla/SandboxFilesDist/Opacity/tween-opacity.js`
    ),
  ])
  return createSandboxVanilla({
    ...SHARED_CONFIG,
    carouselScript: carousel.default,
    carouselHtml: ReactDOMServer.renderToStaticMarkup(
      <CarouselOpacity options={OPTIONS} slides={SLIDES} />,
    ),
    language: 'javascript',
    sandboxOverrides: {
      [`${SANDBOX_VANILLA_FOLDERS.JS}/${VANILLA_TWEEN_FILE_NAME}.js`]: {
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
      '!!raw-loader!components/CodeSandbox/Vanilla/SandboxFilesDist/Opacity/EmblaCarousel.ts'
    ),
    import(
      `!!raw-loader!components/CodeSandbox/Vanilla/SandboxFilesDist/Opacity/tween-opacity.ts`
    ),
  ])
  return createSandboxVanilla({
    ...SHARED_CONFIG,
    carouselScript: carousel.default,
    carouselHtml: ReactDOMServer.renderToStaticMarkup(
      <CarouselOpacity options={OPTIONS} slides={SLIDES} />,
    ),
    language: 'typescript',
    sandboxOverrides: {
      [`${SANDBOX_VANILLA_FOLDERS.JS}/${VANILLA_TWEEN_FILE_NAME}.ts`]: {
        isBinary: false,
        content: formatTs(tween.default),
      },
    },
  })
}

const sandboxReactJavaScript = async (): Promise<string> => {
  const carousel = await import(
    `!!raw-loader!components/CodeSandbox/React/SandboxFilesDist/Opacity/EmblaCarousel.jsx`
  )
  return createSandboxReact({
    ...SHARED_CONFIG,
    carouselScript: carousel.default,
    language: 'javascript',
  })
}

const sandboxReactTypeScript = async (): Promise<string> => {
  const carousel = await import(
    `!!raw-loader!components/CodeSandbox/React/SandboxFilesDist/Opacity/EmblaCarousel.tsx`
  )
  return createSandboxReact({
    ...SHARED_CONFIG,
    carouselScript: carousel.default,
    language: 'typescript',
  })
}

const SANDBOXES: SelectCodeSandboxPropType['sandboxes'] =
  createSandboxFunctionsWithLabels({
    vanillaJs: sandboxVanillaJavaScript,
    vanillaTs: sandboxVanillaTypeScript,
    reactJs: sandboxReactJavaScript,
    reactTs: sandboxReactTypeScript,
  })

export const ExampleCarouselOpacitySandboxes = () => {
  return <SelectCodeSandbox sandboxes={SANDBOXES} />
}
