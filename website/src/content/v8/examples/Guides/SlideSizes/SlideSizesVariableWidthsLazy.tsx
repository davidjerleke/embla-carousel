'use client'

import { ExamplesLazy } from '@/content/v8/examples/ExamplesLazy'

export function ExampleSlideSizesVariableWidths() {
  return (
    <ExamplesLazy
      loader={() => {
        return import(
          '@/content/v8/examples/Guides/SlideSizes/SlideSizesVariableWidths'
        )
      }}
    />
  )
}
