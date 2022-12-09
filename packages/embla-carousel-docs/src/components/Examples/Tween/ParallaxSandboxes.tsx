import React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import { SANDBOX_VANILLA_FOLDERS } from 'components/CodeSandbox/Vanilla/sandboxVanillaFolders'
import CarouselParallax from 'components/CodeSandbox/React/SandboxFilesSrc/Parallax/EmblaCarousel'
import { createSandboxVanilla } from 'components/CodeSandbox/Vanilla/createSandboxVanilla'
import { createSandboxReact } from 'components/CodeSandbox/React/createSandboxReact'
import { ID, SLIDES, OPTIONS, STYLES } from 'components/Examples/Tween/Parallax'
import { loadPrettier } from 'utils/loadPrettier'
import {
  CreateCodeSandboxForms,
  PropType as CreateCodeSandboxFormsPropType,
} from 'components/CodeSandbox/CreateCodeSandboxForms'
import {
  createSandboxLabel,
  SANDBOX_LABELS,
} from 'components/CodeSandbox/sandboxLabels'

const SHARED_CONFIG = {
  slides: SLIDES,
  options: OPTIONS,
  styles: STYLES,
  id: ID,
}

const VANILLA_TWEEN_FILE_NAME = 'tween-parallax'

const sandboxVanillaJavaScript = async (): Promise<string> => {
  const { formatJs } = await loadPrettier()
  const [carousel, tween] = await Promise.all([
    import(
      '!!raw-loader!components/CodeSandbox/Vanilla/SandboxFilesDist/Parallax/EmblaCarousel.js'
    ),
    import(
      `!!raw-loader!components/CodeSandbox/Vanilla/SandboxFilesDist/Parallax/tween-parallax.js`
    ),
  ])
  return createSandboxVanilla({
    ...SHARED_CONFIG,
    carouselScript: carousel.default,
    carouselHtml: ReactDOMServer.renderToStaticMarkup(
      <CarouselParallax options={OPTIONS} slides={SLIDES} />,
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
      '!!raw-loader!components/CodeSandbox/Vanilla/SandboxFilesDist/Parallax/EmblaCarousel.ts'
    ),
    import(
      `!!raw-loader!components/CodeSandbox/Vanilla/SandboxFilesDist/Parallax/tween-parallax.ts`
    ),
  ])
  return createSandboxVanilla({
    ...SHARED_CONFIG,
    carouselScript: carousel.default,
    carouselHtml: ReactDOMServer.renderToStaticMarkup(
      <CarouselParallax options={OPTIONS} slides={SLIDES} />,
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
    `!!raw-loader!components/CodeSandbox/React/SandboxFilesDist/Parallax/EmblaCarousel.jsx`
  )
  return createSandboxReact({
    ...SHARED_CONFIG,
    carouselScript: carousel.default,
    language: 'javascript',
  })
}

const sandboxReactTypeScript = async (): Promise<string> => {
  const carousel = await import(
    `!!raw-loader!components/CodeSandbox/React/SandboxFilesDist/Parallax/EmblaCarousel.tsx`
  )
  return createSandboxReact({
    ...SHARED_CONFIG,
    carouselScript: carousel.default,
    language: 'typescript',
  })
}

const SANDBOXES: CreateCodeSandboxFormsPropType['sandboxes'] = [
  createSandboxLabel(SANDBOX_LABELS.VANILLA_JS, sandboxVanillaJavaScript),
  createSandboxLabel(SANDBOX_LABELS.VANILLA_TS, sandboxVanillaTypeScript),
  createSandboxLabel(SANDBOX_LABELS.REACT_JS, sandboxReactJavaScript),
  createSandboxLabel(SANDBOX_LABELS.REACT_TS, sandboxReactTypeScript),
]

export const ExampleCarouselParallaxSandboxes = () => {
  return <CreateCodeSandboxForms sandboxes={SANDBOXES} />
}
