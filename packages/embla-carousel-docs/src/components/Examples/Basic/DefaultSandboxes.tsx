import React from 'react'
import { createSandboxReact } from 'components/CodeSandbox/React/createSandboxReact'
import { createSandboxReactPackageJson } from 'components/CodeSandbox/React/createSandboxReactPackageJson'
import { ID, SLIDES, OPTIONS, STYLES } from 'components/Examples/Basic/Default'
import {
  CreateCodeSandboxForms,
  PropType as CreateCodeSandboxFormsPropType,
} from 'components/CodeSandbox/CreateCodeSandboxForms'

const sandboxReactJavaScript = async (): Promise<string> => {
  const packageJson = createSandboxReactPackageJson({ name: ID })
  const carousel = await import(
    `!!raw-loader!embla-carousel-react-sandboxes/src/SandboxFilesDist/CarouselDefault.jsx`
  )
  return createSandboxReact(
    packageJson,
    carousel.default,
    SLIDES,
    OPTIONS,
    STYLES,
  )
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
    createSandbox: sandboxReactJavaScript,
  },
]

export const ExampleCarouselDefaultSandboxes = () => {
  return <CreateCodeSandboxForms sandboxes={SANDBOXES} />
}
