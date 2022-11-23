import React from 'react'
import { createSandboxReact } from 'components/CodeSandbox/React/createSandboxReact'
import {
  ID,
  SLIDES,
  OPTIONS,
  STYLES,
} from 'components/Examples/Basic/VariableWidths'
import {
  CreateCodeSandboxForms,
  PropType as CreateCodeSandboxFormsPropType,
} from 'components/CodeSandbox/CreateCodeSandboxForms'

const SHARED_CONFIG = {
  slides: SLIDES,
  options: OPTIONS,
  styles: STYLES,
  packageJsonOverrides: { name: ID },
}

const sandboxReactJavaScript = async (): Promise<string> => {
  const carousel = await import(
    `!!raw-loader!embla-carousel-react-sandboxes/src/SandboxFilesDist/CarouselDefault.jsx`
  )
  return createSandboxReact({
    ...SHARED_CONFIG,
    carouselScript: carousel.default,
    language: 'javascript',
  })
}

const sandboxReactTypeScript = async (): Promise<string> => {
  const carousel = await import(
    `!!raw-loader!embla-carousel-react-sandboxes/src/SandboxFilesDist/CarouselDefault.tsx`
  )
  return createSandboxReact({
    ...SHARED_CONFIG,
    carouselScript: carousel.default,
    language: 'typescript',
  })
}

const SANDBOXES: CreateCodeSandboxFormsPropType['sandboxes'] = [
  {
    label: 'React',
    createSandbox: sandboxReactJavaScript,
  },
  {
    label: 'React+TS',
    createSandbox: sandboxReactTypeScript,
  },
]

export const ExampleCarouselVariableWidthsSandboxes = () => {
  return <CreateCodeSandboxForms sandboxes={SANDBOXES} />
}
