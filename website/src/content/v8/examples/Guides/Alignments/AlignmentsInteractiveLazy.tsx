'use client'

import { EXAMPLES_WRAPPERS } from '@/content/v8/examples/examples-utils'
import { ExamplesLazy } from '@/content/v8/examples/ExamplesLazy'

export function ExampleAlignmentsInteractive() {
  return (
    <ExamplesLazy
      wrapper={EXAMPLES_WRAPPERS.TWO_FORM_ROWS}
      loader={() => {
        return import(
          '@/content/v8/examples/Guides/Alignments/AlignmentsInteractive'
        )
      }}
    />
  )
}
