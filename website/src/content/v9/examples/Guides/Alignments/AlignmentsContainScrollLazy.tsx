'use client'

import { EXAMPLES_WRAPPERS } from '@/content/v9/examples/examples-utils'
import { ExamplesLazy } from '@/content/v9/examples/ExamplesLazy'

export function ExampleAlignmentsContainScroll() {
  return (
    <ExamplesLazy
      wrapper={EXAMPLES_WRAPPERS.TWO_FORM_ROWS}
      loader={() => {
        return import(
          '@/content/v9/examples/Guides/Alignments/AlignmentsContainScroll'
        )
      }}
    />
  )
}
