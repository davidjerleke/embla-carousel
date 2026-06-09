'use client'

import { ExamplesLazy } from '@/content/v8/examples/ExamplesLazy'
import { EXAMPLES_WRAPPERS } from '@/content/v8/examples/examples-utils'

export function ExampleScrollBar() {
  return (
    <ExamplesLazy
      wrapper={EXAMPLES_WRAPPERS.SCROLL_BAR}
      loader={() => {
        return import(
          '@/content/v8/examples/Predefined/Miscellaneous/ScrollBar'
        )
      }}
    />
  )
}
