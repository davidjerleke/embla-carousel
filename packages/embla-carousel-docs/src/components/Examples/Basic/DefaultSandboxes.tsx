import React from 'react'
import { createSandboxReact } from 'components/CodeSandbox/React/createSandboxReact'
import { ID, SLIDES, OPTIONS, STYLES } from 'components/Examples/Basic/Default'
import { PackageJsonType } from 'components/CodeSandbox/types'
import {
  CreateCodeSandboxForms,
  PropType as CreateCodeSandboxFormsPropType,
} from 'components/CodeSandbox/CreateCodeSandboxForms'

const PACKAGE_JSON_OVERRIDES: PackageJsonType = { name: ID }

const sandboxReactJavaScript = async (): Promise<string> => {
  const carousel = await import(
    `!!raw-loader!embla-carousel-react-sandboxes/src/SandboxFilesDist/CarouselDefault.jsx`
  )
  return createSandboxReact({
    carouselScript: carousel.default,
    slides: SLIDES,
    options: OPTIONS,
    packageJsonOverrides: PACKAGE_JSON_OVERRIDES,
    styles: STYLES,
  })
}

const sandboxReactTypeScript = async (): Promise<string> => {
  const carousel = await import(
    `!!raw-loader!embla-carousel-react-sandboxes/src/SandboxFilesDist/CarouselDefault.tsx`
  )
  return createSandboxReact({
    carouselScript: carousel.default,
    slides: SLIDES,
    options: OPTIONS,
    styles: STYLES,
    packageJsonOverrides: PACKAGE_JSON_OVERRIDES,
    language: 'typescript',
  })
}

const SANDBOXES: CreateCodeSandboxFormsPropType['sandboxes'] = [
  {
    label: 'Vanilla',
    createSandbox: sandboxReactJavaScript,
  },
  {
    label: 'Vanilla+TS',
    createSandbox: sandboxReactJavaScript,
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
