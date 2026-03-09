'use client'

import { ExamplesLazy } from '@/content/v8/examples/ExamplesLazy'
import { EXAMPLES_WRAPPERS } from '@/content/v8/examples/examples-utils'

export function ExampleThumbs() {
  return (
    <ExamplesLazy
      wrapper={EXAMPLES_WRAPPERS.THUMBS}
      loader={() => {
        return import('@/content/v8/examples/Predefined/Basic/Thumbs')
      }}
    />
  )
}
