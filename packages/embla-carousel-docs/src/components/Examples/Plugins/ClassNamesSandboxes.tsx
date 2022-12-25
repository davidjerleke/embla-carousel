import React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import CarouselClassNames from 'components/CodeSandbox/React/SandboxFilesSrc/ClassNames/EmblaCarousel'
import { createSandboxVanilla } from 'components/CodeSandbox/Vanilla/createSandboxVanilla'
import { createSandboxReact } from 'components/CodeSandbox/React/createSandboxReact'
import { createSandboxFunctionsWithLabels } from 'components/CodeSandbox/createSandboxFunctionsWithLabels'
import {
  ID,
  SLIDES,
  OPTIONS,
  STYLES,
} from 'components/Examples/Plugins/ClassNames'
import {
  SelectCodeSandbox,
  PropType as SelectCodeSandboxPropType,
} from 'components/CodeSandbox/SelectCodeSandbox'
import {
  addSandboxPlugins,
  SANDBOX_PLUGIN_CLASS_NAMES,
} from 'components/CodeSandbox/sandboxPlugins'

const SHARED_CONFIG = {
  slides: SLIDES,
  options: OPTIONS,
  styles: STYLES,
  id: ID,
  ...addSandboxPlugins(SANDBOX_PLUGIN_CLASS_NAMES),
}

const sandboxVanillaJavaScript = async (): Promise<string> => {
  const carousel = await import(
    '!!raw-loader!components/CodeSandbox/Vanilla/SandboxFilesDist/ClassNames/EmblaCarousel.js'
  )
  return createSandboxVanilla({
    ...SHARED_CONFIG,
    carouselScript: carousel.default,
    carouselHtml: ReactDOMServer.renderToStaticMarkup(
      <CarouselClassNames options={OPTIONS} slides={SLIDES} />,
    ),
    language: 'javascript',
  })
}

const sandboxVanillaTypeScript = async (): Promise<string> => {
  const carousel = await import(
    '!!raw-loader!components/CodeSandbox/Vanilla/SandboxFilesDist/ClassNames/EmblaCarousel.ts'
  )
  return createSandboxVanilla({
    ...SHARED_CONFIG,
    carouselScript: carousel.default,
    carouselHtml: ReactDOMServer.renderToStaticMarkup(
      <CarouselClassNames options={OPTIONS} slides={SLIDES} />,
    ),
    language: 'typescript',
  })
}

const sandboxReactJavaScript = async (): Promise<string> => {
  const carousel = await import(
    `!!raw-loader!components/CodeSandbox/React/SandboxFilesDist/ClassNames/EmblaCarousel.jsx`
  )
  return createSandboxReact({
    ...SHARED_CONFIG,
    carouselScript: carousel.default,
    language: 'javascript',
  })
}

const sandboxReactTypeScript = async (): Promise<string> => {
  const carousel = await import(
    `!!raw-loader!components/CodeSandbox/React/SandboxFilesDist/ClassNames/EmblaCarousel.tsx`
  )
  return createSandboxReact({
    ...SHARED_CONFIG,
    carouselScript: carousel.default,
    language: 'typescript',
  })
}

const SANDBOXES: SelectCodeSandboxPropType['sandboxes'] =
  createSandboxFunctionsWithLabels({
    VANILLA_JS: sandboxVanillaJavaScript,
    VANILLA_TS: sandboxVanillaTypeScript,
    REACT_JS: sandboxReactJavaScript,
    REACT_TS: sandboxReactTypeScript,
  })

export const ExampleCarouselClassNamesSandboxes = () => {
  return <SelectCodeSandbox sandboxes={SANDBOXES} />
}
