'use client'

import { ExamplesLazy } from '@/content/v9/examples/ExamplesLazy'

export function ExampleSlideSizesVariableWidths() {
  return (
    <ExamplesLazy
      loader={() => {
        return import(
          '@/content/v9/examples/Guides/SlideSizes/SlideSizesVariableWidths'
        )
      }}
    />
  )
}
