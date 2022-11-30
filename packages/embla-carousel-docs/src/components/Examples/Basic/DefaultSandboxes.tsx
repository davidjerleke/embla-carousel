import React from 'react'
import { createSandboxVanilla } from 'components/CodeSandbox/Vanilla/createSandboxVanilla'
import { createSandboxReact } from 'components/CodeSandbox/React/createSandboxReact'
import { ID, SLIDES, OPTIONS, STYLES } from 'components/Examples/Basic/Default'
import {
  CreateCodeSandboxForms,
  PropType as CreateCodeSandboxFormsPropType,
} from 'components/CodeSandbox/CreateCodeSandboxForms'

// Test
import * as ReactDOMServer from 'react-dom/server'

const SHARED_CONFIG = {
  slides: SLIDES,
  options: OPTIONS,
  styles: STYLES,
  id: ID,
}

const sandboxReactJavaScript = async (): Promise<string> => {
  const carousel = await import(
    `!!raw-loader!components/CodeSandbox/React/SandboxFilesDist/CarouselDefault.jsx`
  )
  return createSandboxReact({
    ...SHARED_CONFIG,
    carouselScript: carousel.default,
    language: 'javascript',
  })
}

const sandboxReactTypeScript = async (): Promise<string> => {
  const carousel = await import(
    `!!raw-loader!components/CodeSandbox/React/SandboxFilesDist/CarouselDefault.tsx`
  )
  return createSandboxReact({
    ...SHARED_CONFIG,
    carouselScript: carousel.default,
    language: 'typescript',
  })
}

const sandboxVanillaJavaScript = async (): Promise<string> => {
  const [carousel, html] = await Promise.all([
    import(
      '!!raw-loader!components/CodeSandbox/Vanilla/SandboxFilesDist/CarouselDefault.js'
    ),
    import(
      '!!raw-loader!components/CodeSandbox/Vanilla/SandboxFilesDist/CarouselDefault.html'
    ),
  ])
  return createSandboxVanilla({
    ...SHARED_CONFIG,
    carouselScript: carousel.default,
    carouselHtml: html.default,
    language: 'javascript',
  })
}

const sandboxVanillaTypeScript = async (): Promise<string> => {
  const [carousel, html] = await Promise.all([
    import(
      '!!raw-loader!components/CodeSandbox/Vanilla/SandboxFilesDist/CarouselDefault.js'
    ),
    import('components/CodeSandbox/React/SandboxFilesDist/CarouselDefault'),
  ])

  const Car = html.default

  const carouselHtml = ReactDOMServer.renderToStaticMarkup(
    <Car options={OPTIONS} slides={SLIDES} />,
  )

  return createSandboxVanilla({
    ...SHARED_CONFIG,
    carouselScript: carousel.default,
    carouselHtml: carouselHtml,
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

export const ExampleCarouselDefaultSandboxes = () => {
  return <CreateCodeSandboxForms sandboxes={SANDBOXES} />
}
