import React from 'react'
import { loadPrettier } from 'utils/loadPrettier'
import { createSandboxReact } from 'components/CodeSandbox/React/createSandboxReact'
import { createSandboxReactIosPickerEntry } from 'components/CodeSandbox/React/createSandboxReactEntry'
import { ID, STYLES } from 'components/Examples/Miscellaneous/IosPicker'
import {
  CreateCodeSandboxForms,
  PropType as CreateCodeSandboxFormsPropType,
} from 'components/CodeSandbox/CreateCodeSandboxForms'

const renameIosPickerItemImport = (rawFile: string): string =>
  rawFile.replace(REPLACE_IMPORT_REGEX, FILE_NAME)

const REPLACE_IMPORT_REGEX = /(?<=.\/)CarouselIosPickerItem/
const FILE_NAME = 'EmblaCarouselIosPickerItem'

const SHARED_CONFIG = {
  slides: [],
  styles: STYLES,
  id: ID,
}

const sandboxReactJavaScript = async (loop: boolean): Promise<string> => {
  const { formatJs } = await loadPrettier()
  console.log('loop', loop)
  const [entry, carousel, item] = await Promise.all([
    createSandboxReactIosPickerEntry('javascript', loop),
    import(
      `!!raw-loader!embla-carousel-react-sandboxes/src/SandboxFilesDist/CarouselIosPicker.jsx`
    ),
    import(
      `!!raw-loader!embla-carousel-react-sandboxes/src/SandboxFilesDist/CarouselIosPickerItem.jsx`
    ),
  ])

  return createSandboxReact({
    ...SHARED_CONFIG,
    indexScript: entry,
    options: { loop },
    carouselScript: renameIosPickerItemImport(carousel.default),
    language: 'javascript',
    sandboxOverrides: {
      [`src/js/${FILE_NAME}.jsx`]: {
        isBinary: false,
        content: formatJs(item.default),
      },
    },
  })
}

const sandboxReactTypeScript = async (loop: boolean): Promise<string> => {
  const { formatTs } = await loadPrettier()
  const [entry, carousel, item] = await Promise.all([
    createSandboxReactIosPickerEntry('typescript', loop),
    import(
      `!!raw-loader!embla-carousel-react-sandboxes/src/SandboxFilesDist/CarouselIosPicker.tsx`
    ),
    import(
      `!!raw-loader!embla-carousel-react-sandboxes/src/SandboxFilesDist/CarouselIosPickerItem.tsx`
    ),
  ])

  return createSandboxReact({
    ...SHARED_CONFIG,
    indexScript: entry,
    options: { loop },
    carouselScript: renameIosPickerItemImport(carousel.default),
    language: 'typescript',
    sandboxOverrides: {
      [`src/js/${FILE_NAME}.tsx`]: {
        isBinary: false,
        content: formatTs(item.default),
      },
    },
  })
}

const SANDBOXES_DEFAULT: CreateCodeSandboxFormsPropType['sandboxes'] = [
  {
    label: 'React',
    createSandbox: () => sandboxReactJavaScript(false),
  },
  {
    label: 'React+TS',
    createSandbox: () => sandboxReactTypeScript(false),
  },
]

const SANDBOXES_LOOP: CreateCodeSandboxFormsPropType['sandboxes'] = [
  {
    label: 'React',
    createSandbox: () => sandboxReactJavaScript(true),
  },
  {
    label: 'React+TS',
    createSandbox: () => sandboxReactTypeScript(true),
  },
]

export const ExampleCarouselIosPickerDefaultSandboxes = () => {
  return <CreateCodeSandboxForms sandboxes={SANDBOXES_DEFAULT} />
}

export const ExampleCarouselIosPickerLoopSandboxes = () => {
  return <CreateCodeSandboxForms sandboxes={SANDBOXES_LOOP} />
}
