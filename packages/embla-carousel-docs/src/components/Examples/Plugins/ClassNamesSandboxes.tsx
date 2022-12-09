import React from 'react'
import docsPackageJson from 'embla-carousel-docs/package.json'
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
  CreateCodeSandboxForms,
  PropType as CreateCodeSandboxFormsPropType,
} from 'components/CodeSandbox/CreateCodeSandboxForms'

const SHARED_CONFIG = {
  slides: SLIDES,
  options: OPTIONS,
  styles: STYLES,
  id: ID,
  plugins: {
    'embla-carousel-class-names':
      docsPackageJson.dependencies['embla-carousel-class-names'],
  },
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

const SANDBOXES: CreateCodeSandboxFormsPropType['sandboxes'] =
  createSandboxFunctionsWithLabels({
    vanillaJs: sandboxVanillaJavaScript,
    vanillaTs: sandboxVanillaTypeScript,
    reactJs: sandboxReactJavaScript,
    reactTs: sandboxReactTypeScript,
  })

export const ExampleCarouselClassNamesSandboxes = () => {
  return <CreateCodeSandboxForms sandboxes={SANDBOXES} />
}
