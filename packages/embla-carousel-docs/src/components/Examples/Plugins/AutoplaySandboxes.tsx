import React from 'react'
import docsPackageJson from 'embla-carousel-docs/package.json'
import * as ReactDOMServer from 'react-dom/server'
import CarouselAutoplay from 'components/CodeSandbox/React/SandboxFilesSrc/Autoplay/EmblaCarousel'
import { createSandboxVanilla } from 'components/CodeSandbox/Vanilla/createSandboxVanilla'
import { createSandboxReact } from 'components/CodeSandbox/React/createSandboxReact'
import {
  ID,
  SLIDES,
  OPTIONS,
  STYLES,
} from 'components/Examples/Plugins/Autoplay'
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
  plugins: {
    'embla-carousel-autoplay':
      docsPackageJson.dependencies['embla-carousel-autoplay'],
  },
}

const sandboxVanillaJavaScript = async (): Promise<string> => {
  const carousel = await import(
    '!!raw-loader!components/CodeSandbox/Vanilla/SandboxFilesDist/Autoplay/EmblaCarousel.js'
  )
  return createSandboxVanilla({
    ...SHARED_CONFIG,
    carouselScript: carousel.default,
    carouselHtml: ReactDOMServer.renderToStaticMarkup(
      <CarouselAutoplay options={OPTIONS} slides={SLIDES} />,
    ),
    language: 'javascript',
  })
}

const sandboxVanillaTypeScript = async (): Promise<string> => {
  const carousel = await import(
    '!!raw-loader!components/CodeSandbox/Vanilla/SandboxFilesDist/Autoplay/EmblaCarousel.ts'
  )
  return createSandboxVanilla({
    ...SHARED_CONFIG,
    carouselScript: carousel.default,
    carouselHtml: ReactDOMServer.renderToStaticMarkup(
      <CarouselAutoplay options={OPTIONS} slides={SLIDES} />,
    ),
    language: 'typescript',
  })
}

const sandboxReactJavaScript = async (): Promise<string> => {
  const carousel = await import(
    `!!raw-loader!components/CodeSandbox/React/SandboxFilesDist/Autoplay/EmblaCarousel.jsx`
  )
  return createSandboxReact({
    ...SHARED_CONFIG,
    carouselScript: carousel.default,
    language: 'javascript',
  })
}

const sandboxReactTypeScript = async (): Promise<string> => {
  const carousel = await import(
    `!!raw-loader!components/CodeSandbox/React/SandboxFilesDist/Autoplay/EmblaCarousel.tsx`
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

export const ExampleCarouselAutoplaySandboxes = () => {
  return <CreateCodeSandboxForms sandboxes={SANDBOXES} />
}
