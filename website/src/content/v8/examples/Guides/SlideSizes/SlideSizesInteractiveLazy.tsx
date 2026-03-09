'use client'

import { EXAMPLES_WRAPPERS } from '@/content/v8/examples/examples-utils'
import { ExamplesLazy } from '@/content/v8/examples/ExamplesLazy'

export function ExampleSlideSizesInteractive() {
  return (
    <ExamplesLazy
      wrapper={EXAMPLES_WRAPPERS.ONE_FORM_ROW}
      loader={() => {
        return import(
          '@/content/v8/examples/Guides/SlideSizes/SlideSizesInteractive'
        )
      }}
    />
  )
}
